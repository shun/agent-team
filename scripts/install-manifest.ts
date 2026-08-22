export type DestMapRule = {
  prefix: string;
  dest: string;
};

export type InstallManifest = {
  include: string[];
  exclude: string[];
  neverWrite: string[];
  lockPath: string;
  readHint: string;
  destMap: DestMapRule[];
};

export const MANIFEST_PATH = "scripts/install-manifest.json";

function isSafeRelative(path: string): boolean {
  return Boolean(path) && !path.includes("..") && !path.startsWith("/") &&
    !path.includes("\\");
}

export function parseManifest(text: string): InstallManifest {
  const data = JSON.parse(text) as InstallManifest;
  if (!Array.isArray(data.include) || data.include.length === 0) {
    throw new Error("fail-closed: manifest include is empty");
  }
  if (!Array.isArray(data.exclude) || !Array.isArray(data.neverWrite)) {
    throw new Error("fail-closed: manifest exclude/neverWrite missing");
  }
  if (!data.lockPath.endsWith(".json") || !isSafeRelative(data.lockPath)) {
    throw new Error("fail-closed: invalid lock path");
  }
  if (!data.readHint) throw new Error("fail-closed: readHint missing");
  if (!Array.isArray(data.destMap)) {
    throw new Error("fail-closed: manifest destMap missing");
  }
  for (const rule of data.destMap) {
    if (!rule || !isSafeRelative(rule.prefix) || !isSafeRelative(rule.dest)) {
      throw new Error("fail-closed: invalid destMap rule");
    }
    if (!rule.prefix.endsWith("/")) {
      throw new Error("fail-closed: destMap prefix must end with /");
    }
    if (!rule.dest.endsWith("/")) {
      throw new Error("fail-closed: destMap dest must end with /");
    }
  }
  return data;
}

export function matchesPrefix(path: string, rule: string): boolean {
  if (rule.endsWith("/")) return path === rule.slice(0, -1) || path.startsWith(rule);
  return path === rule;
}

export function isExcluded(path: string, manifest: InstallManifest): boolean {
  if (manifest.neverWrite.includes(path)) return true;
  return manifest.exclude.some((rule) => matchesPrefix(path, rule));
}

export function isIncluded(path: string, manifest: InstallManifest): boolean {
  if (isExcluded(path, manifest)) return false;
  return manifest.include.some((rule) => matchesPrefix(path, rule));
}

export function listInstallPaths(relativeFiles: string[], manifest: InstallManifest): string[] {
  const paths = relativeFiles.filter((path) => {
    if (path.includes("..") || path.startsWith("/")) return false;
    return isIncluded(path, manifest);
  });
  return [...new Set(paths)].sort();
}

export function mapDestPath(sourcePath: string, manifest: InstallManifest): string {
  const rules = [...manifest.destMap].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const rule of rules) {
    if (sourcePath === rule.prefix.slice(0, -1) || sourcePath.startsWith(rule.prefix)) {
      return `${rule.dest}${sourcePath.slice(rule.prefix.length)}`;
    }
  }
  return sourcePath;
}

export function rewriteInstalledText(text: string, manifest: InstallManifest): string {
  const rules = [...manifest.destMap].sort((a, b) => b.prefix.length - a.prefix.length);
  let result = text;
  const sentinels = rules.map((rule, index) => {
    const sentinel = `\u0000DESTMAP${index}\u0000`;
    result = result.split(rule.dest).join(sentinel);
    return { sentinel, dest: rule.dest };
  });
  for (const rule of rules) {
    result = result.split(rule.prefix).join(rule.dest);
  }
  for (const { sentinel, dest } of sentinels) {
    result = result.split(sentinel).join(dest);
  }
  return result;
}

export function rewriteInstalledBytes(
  bytes: Uint8Array,
  manifest: InstallManifest,
): Uint8Array {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return new TextEncoder().encode(rewriteInstalledText(text, manifest));
}
