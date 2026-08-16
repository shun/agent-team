#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-run

import {
  type InstallManifest,
  MANIFEST_PATH,
  isIncluded,
  listInstallPaths,
  parseManifest,
} from "./install-manifest.ts";

export type InstallLock = {
  source: string;
  ref: string;
  files: Record<string, string>;
};

export type InstallResult = {
  written: string[];
  skipped: string[];
  unchanged: string[];
  lock: InstallLock;
  readHint: string;
};

const FORBIDDEN_ROOT = new Set(["AGENTS.md", "CLAUDE.md"]);
export const DEFAULT_SOURCE = "https://github.com/shun/agent-team";
export const DEFAULT_REF = "main";

export function isAllowedRemote(source: string): boolean {
  return source === DEFAULT_SOURCE || source === `${DEFAULT_SOURCE}.git`;
}

export function githubArchiveUrl(source: string, ref: string): string {
  if (!isAllowedRemote(source)) {
    throw new Error("fail-closed: remote source is not the agent-team repository");
  }
  if (/^[0-9a-f]{40}$/i.test(ref)) {
    return `${DEFAULT_SOURCE}/archive/${ref}.tar.gz`;
  }
  return `${DEFAULT_SOURCE}/archive/refs/heads/${encodeURIComponent(ref)}.tar.gz`;
}

export async function findExtractedRoot(dest: string): Promise<string> {
  try {
    await Deno.stat(`${dest}/${MANIFEST_PATH}`);
    return dest;
  } catch {
    // GitHub archives wrap files in one top-level directory.
  }
  const entries = [];
  for await (const entry of Deno.readDir(dest)) {
    if (entry.name.startsWith(".")) continue;
    entries.push(entry);
  }
  if (entries.length === 1 && entries[0].isDirectory) {
    return `${dest}/${entries[0].name}`;
  }
  throw new Error("fail-closed: extracted source is missing the install manifest");
}

export async function extractArchive(archivePath: string, dest: string): Promise<string> {
  await Deno.mkdir(dest, { recursive: true });
  const command = new Deno.Command("tar", {
    args: ["-xzf", archivePath, "-C", dest],
  });
  const result = await command.output();
  if (result.code !== 0) {
    throw new Error("fail-closed: archive extract failed");
  }
  return await findExtractedRoot(dest);
}

export async function materializeSource(
  source: string,
  ref: string,
  fetchImpl: typeof fetch = fetch,
): Promise<{ root: string; label: string }> {
  try {
    const stat = await Deno.stat(source);
    if (stat.isDirectory) return { root: source, label: source };
  } catch {
    // Remote or missing local path.
  }
  if (!isAllowedRemote(source)) {
    throw new Error("fail-closed: source must be a local path or the agent-team GitHub URL");
  }
  const tmp = await Deno.makeTempDir({ prefix: "agent-team-fetch-" });
  const archivePath = `${tmp}/source.tar.gz`;
  const urls = /^[0-9a-f]{40}$/i.test(ref)
    ? [githubArchiveUrl(source, ref)]
    : [
      githubArchiveUrl(source, ref),
      `${DEFAULT_SOURCE}/archive/refs/tags/${encodeURIComponent(ref)}.tar.gz`,
    ];
  let response: Response | null = null;
  for (const url of urls) {
    const candidate = await fetchImpl(url);
    if (candidate.ok) {
      response = candidate;
      break;
    }
  }
  if (!response) {
    throw new Error("fail-closed: fetch failed");
  }
  await Deno.writeFile(archivePath, new Uint8Array(await response.arrayBuffer()));
  const root = await extractArchive(archivePath, `${tmp}/tree`);
  return { root, label: DEFAULT_SOURCE };
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes);
  const hash = await crypto.subtle.digest("SHA-256", copy);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function resolveUnder(root: string, relative: string): string {
  if (relative.includes("..") || relative.startsWith("/") || FORBIDDEN_ROOT.has(relative)) {
    throw new Error(`fail-closed: refused path ${relative}`);
  }
  const base = root.endsWith("/") ? root : `${root}/`;
  return `${base}${relative}`;
}

export async function walkFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  const pending = [root];
  while (pending.length > 0) {
    const dir = pending.pop()!;
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory) {
        pending.push(path);
        continue;
      }
      if (entry.isFile) files.push(path.slice(root.length + 1));
    }
  }
  return files.sort();
}

export async function loadManifest(sourceRoot: string): Promise<InstallManifest> {
  const text = await Deno.readTextFile(`${sourceRoot}/${MANIFEST_PATH}`);
  return parseManifest(text);
}

export async function readLock(targetRoot: string, lockPath: string): Promise<InstallLock | null> {
  try {
    const text = await Deno.readTextFile(resolveUnder(targetRoot, lockPath));
    return JSON.parse(text) as InstallLock;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return null;
    throw error;
  }
}

export async function applyInstall(options: {
  sourceRoot: string;
  targetRoot: string;
  ref: string;
  manifest: InstallManifest;
  sourceLabel?: string;
}): Promise<InstallResult> {
  const { sourceRoot, targetRoot, ref, manifest, sourceLabel } = options;
  if (sourceRoot.includes("..") || targetRoot.includes("..")) {
    throw new Error("fail-closed: invalid root");
  }
  const sourceFiles = await walkFiles(sourceRoot);
  const selected = listInstallPaths(sourceFiles, manifest);
  const previous = await readLock(targetRoot, manifest.lockPath);
  const files: Record<string, string> = {};
  const written: string[] = [];
  const skipped: string[] = [];
  const unchanged: string[] = [];

  for (const relative of selected) {
    if (FORBIDDEN_ROOT.has(relative) || !isIncluded(relative, manifest)) {
      throw new Error(`fail-closed: refused ${relative}`);
    }
    const sourceBytes = await Deno.readFile(resolveUnder(sourceRoot, relative));
    const sourceHash = await sha256Hex(sourceBytes);
    const targetPath = resolveUnder(targetRoot, relative);
    let existing: Uint8Array | null = null;
    try {
      existing = await Deno.readFile(targetPath);
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) throw error;
    }
    if (existing) {
      const existingHash = await sha256Hex(existing);
      if (existingHash === sourceHash) {
        files[relative] = sourceHash;
        unchanged.push(relative);
        continue;
      }
      const previousHash = previous?.files[relative];
      if (previousHash && existingHash === previousHash) {
        await Deno.mkdir(targetPath.slice(0, targetPath.lastIndexOf("/")), { recursive: true });
        await Deno.writeFile(targetPath, sourceBytes);
        files[relative] = sourceHash;
        written.push(relative);
        continue;
      }
      skipped.push(relative);
      files[relative] = existingHash;
      continue;
    }
    await Deno.mkdir(targetPath.slice(0, targetPath.lastIndexOf("/")), { recursive: true });
    await Deno.writeFile(targetPath, sourceBytes);
    files[relative] = sourceHash;
    written.push(relative);
  }

  const lock: InstallLock = { source: sourceLabel ?? sourceRoot, ref, files };
  const lockPath = resolveUnder(targetRoot, manifest.lockPath);
  await Deno.mkdir(lockPath.slice(0, lockPath.lastIndexOf("/")), { recursive: true });
  await Deno.writeTextFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  return { written, skipped, unchanged, lock, readHint: manifest.readHint };
}

export function parseArgs(args: string[]): {
  source: string;
  target: string;
  ref: string;
} {
  let source = DEFAULT_SOURCE;
  let target = ".";
  let ref = DEFAULT_REF;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--source") {
      source = args[++i] ?? "";
      continue;
    }
    if (arg === "--target") {
      target = args[++i] ?? "";
      continue;
    }
    if (arg === "--ref") {
      ref = args[++i] ?? "";
      continue;
    }
    throw new Error(`fail-closed: unknown argument ${arg}`);
  }
  if (!source || !target) throw new Error("fail-closed: --source and --target required");
  if (target.includes("..") || (source.includes("..") && !source.startsWith("https://"))) {
    throw new Error("fail-closed: invalid path");
  }
  if (!ref || ref.includes("..") || ref.startsWith("/") || ref.includes("\\")) {
    throw new Error("fail-closed: invalid ref");
  }
  return { source, target, ref };
}

export function formatReport(result: InstallResult): string {
  return [
    `written ${result.written.length}`,
    `unchanged ${result.unchanged.length}`,
    `skipped ${result.skipped.length}`,
    `ref ${result.lock.ref}`,
    result.readHint,
    ...result.skipped.map((path) => `skip ${path}`),
  ].join("\n");
}

if (import.meta.main) {
  try {
    const parsed = parseArgs(Deno.args);
    const materialized = await materializeSource(parsed.source, parsed.ref);
    const manifest = await loadManifest(materialized.root);
    const result = await applyInstall({
      sourceRoot: materialized.root,
      targetRoot: parsed.target === "." ? Deno.cwd() : parsed.target,
      ref: parsed.ref,
      manifest,
      sourceLabel: materialized.label,
    });
    console.log(formatReport(result));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  }
}
