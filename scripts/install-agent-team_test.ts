import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import {
  type InstallManifest,
  isIncluded,
  listInstallPaths,
  parseManifest,
} from "./install-manifest.ts";
import {
  DEFAULT_SOURCE,
  applyInstall,
  formatReport,
  githubArchiveUrl,
  isAllowedRemote,
  materializeSource,
  parseArgs,
  resolveUnder,
  sha256Hex,
  walkFiles,
} from "./install-agent-team.ts";

const manifestText = await Deno.readTextFile(
  new URL("./install-manifest.json", import.meta.url),
);
const manifest = parseManifest(manifestText);

function repoRoot(): string {
  return new URL("../", import.meta.url).pathname.replace(/\/$/, "");
}

Deno.test("manifest includes declared paths and excludes work and root context", () => {
  const files = [
    "docs/agent/guide.md",
    "docs/agent/team.md",
    "docs/roadmap.md",
    "docs/decisions/ADR-0001-adr-draft-location.md",
    ".codex/agents/rin.toml",
    ".agents/agents.md",
    ".claude/agents/rin.md",
    "scripts/run-plan.ts",
    "docs/work/current-task.md",
    "docs/notes/original-memo.md",
    "mission-room/package.json",
    "scripts/run-plan_test.ts",
    "AGENTS.md",
    "CLAUDE.md",
    ".claude/scheduled_tasks.lock",
    "docs/agent/.install-lock.json",
  ];
  const selected = listInstallPaths(files, manifest);
  assertEquals(selected.includes("docs/agent/guide.md"), true);
  assertEquals(selected.includes("scripts/run-plan.ts"), true);
  assertEquals(selected.includes("docs/work/current-task.md"), false);
  assertEquals(selected.includes("docs/notes/original-memo.md"), false);
  assertEquals(selected.includes("mission-room/package.json"), false);
  assertEquals(selected.includes("scripts/run-plan_test.ts"), false);
  assertEquals(selected.includes("AGENTS.md"), false);
  assertEquals(selected.includes("CLAUDE.md"), false);
  assertEquals(selected.includes(".claude/scheduled_tasks.lock"), false);
});

Deno.test("real checkout listing stays inside the declared set", async () => {
  const files = await walkFiles(repoRoot());
  const selected = listInstallPaths(files, manifest);
  assertEquals(selected.includes("docs/agent/guide.md"), true);
  assertEquals(selected.includes("docs/agent/safety.md"), true);
  assertEquals(selected.includes("scripts/run-plan.ts"), true);
  for (const path of selected) {
    assertEquals(isIncluded(path, manifest), true);
    assertEquals(path.startsWith("docs/work/"), false);
    assertEquals(path.startsWith("docs/notes/"), false);
    assertEquals(path.startsWith("mission-room/"), false);
    assertEquals(path === "AGENTS.md" || path === "CLAUDE.md", false);
  }
});

Deno.test("refuses parent paths", () => {
  assertThrows(() => resolveUnder("/tmp/target", "../etc/passwd"));
  assertThrows(() => resolveUnder("/tmp/target", "AGENTS.md"));
});

async function makeFixture(): Promise<{ source: string; target: string; manifest: InstallManifest }> {
  const source = await Deno.makeTempDir({ prefix: "agent-team-src-" });
  const target = await Deno.makeTempDir({ prefix: "agent-team-dst-" });
  const write = async (relative: string, text: string) => {
    const path = `${source}/${relative}`;
    await Deno.mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
    await Deno.writeTextFile(path, text);
  };
  await write("scripts/install-manifest.json", manifestText);
  await write("docs/agent/guide.md", "guide v1\n");
  await write("docs/agent/team.md", "team v1\n");
  await write("docs/roadmap.md", "roadmap v1\n");
  await write("docs/decisions/ADR-0001.md", "adr v1\n");
  await write(".codex/agents/rin.toml", "rin v1\n");
  await write(".agents/agents.md", "agents v1\n");
  await write(".claude/agents/rin.md", "claude rin v1\n");
  await write("scripts/run-plan.ts", "runner v1\n");
  await write("docs/work/secret.md", "should not copy\n");
  await write("AGENTS.md", "root agents\n");
  await write("mission-room/app.ts", "demo\n");
  return { source, target, manifest };
}

Deno.test("install copies only declared files and prints the read hint", async () => {
  const { source, target, manifest } = await makeFixture();
  const result = await applyInstall({
    sourceRoot: source,
    targetRoot: target,
    ref: "test-ref",
    manifest,
  });
  assertEquals(result.lock.ref, "test-ref");
  assertEquals(result.readHint, "MUST READ docs/agent/guide.md");
  assertEquals(result.skipped, []);
  assertEquals((await Deno.readTextFile(`${target}/docs/agent/guide.md`)), "guide v1\n");
  assertEquals((await Deno.readTextFile(`${target}/scripts/run-plan.ts`)), "runner v1\n");
  let workExists = true;
  try {
    await Deno.stat(`${target}/docs/work/secret.md`);
  } catch {
    workExists = false;
  }
  let agentsExists = true;
  try {
    await Deno.stat(`${target}/AGENTS.md`);
  } catch {
    agentsExists = false;
  }
  assertEquals(workExists, false);
  assertEquals(agentsExists, false);
  const report = formatReport(result);
  assertEquals(report.includes("MUST READ docs/agent/guide.md"), true);
  assertEquals(report.includes("ref test-ref"), true);
});

Deno.test("does not overwrite a different existing file", async () => {
  const { source, target, manifest } = await makeFixture();
  await Deno.mkdir(`${target}/docs/agent`, { recursive: true });
  await Deno.writeTextFile(`${target}/docs/agent/guide.md`, "local edit\n");
  const result = await applyInstall({
    sourceRoot: source,
    targetRoot: target,
    ref: "test-ref",
    manifest,
  });
  assertEquals(result.skipped.includes("docs/agent/guide.md"), true);
  assertEquals(await Deno.readTextFile(`${target}/docs/agent/guide.md`), "local edit\n");
});

Deno.test("updates a file that still matches the previous lock hash", async () => {
  const { source, target, manifest } = await makeFixture();
  await applyInstall({
    sourceRoot: source,
    targetRoot: target,
    ref: "v1",
    manifest,
  });
  await Deno.writeTextFile(`${source}/docs/agent/guide.md`, "guide v2\n");
  const result = await applyInstall({
    sourceRoot: source,
    targetRoot: target,
    ref: "v2",
    manifest,
  });
  assertEquals(result.written.includes("docs/agent/guide.md"), true);
  assertEquals(await Deno.readTextFile(`${target}/docs/agent/guide.md`), "guide v2\n");
  assertEquals(result.lock.ref, "v2");
});

Deno.test("hash helper is stable", async () => {
  const a = await sha256Hex(new TextEncoder().encode("abc"));
  const b = await sha256Hex(new TextEncoder().encode("abc"));
  assertEquals(a, b);
  assertEquals(a.length, 64);
});

Deno.test("defaults to the agent-team GitHub repository", () => {
  const parsed = parseArgs([]);
  assertEquals(parsed.source, DEFAULT_SOURCE);
  assertEquals(parsed.target, ".");
  assertEquals(parsed.ref, "main");
  assertEquals(isAllowedRemote(DEFAULT_SOURCE), true);
  assertEquals(isAllowedRemote("https://github.com/evil/other"), false);
  assertEquals(
    githubArchiveUrl(DEFAULT_SOURCE, "main"),
    "https://github.com/shun/agent-team/archive/refs/heads/main.tar.gz",
  );
});

Deno.test("rejects a remote source that is not this repository", async () => {
  try {
    await materializeSource("https://github.com/evil/other", "main");
    throw new Error("expected fail-closed");
  } catch (error) {
    assertEquals(
      error instanceof Error && error.message.includes("fail-closed"),
      true,
    );
  }
});

Deno.test("installs from a fetched archive without a local checkout path", async () => {
  const wrapper = await Deno.makeTempDir({ prefix: "agent-team-wrap-" });
  const inner = `${wrapper}/agent-team-main`;
  const write = async (relative: string, text: string) => {
    const path = `${inner}/${relative}`;
    await Deno.mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
    await Deno.writeTextFile(path, text);
  };
  await write("scripts/install-manifest.json", manifestText);
  await write("docs/agent/guide.md", "guide remote\n");
  await write("docs/agent/team.md", "team remote\n");
  await write("docs/roadmap.md", "roadmap remote\n");
  await write("docs/decisions/ADR-0001.md", "adr remote\n");
  await write(".codex/agents/rin.toml", "rin remote\n");
  await write(".agents/agents.md", "agents remote\n");
  await write(".claude/agents/rin.md", "claude remote\n");
  await write("scripts/run-plan.ts", "runner remote\n");
  const archiveDir = await Deno.makeTempDir({ prefix: "agent-team-arc-" });
  const archivePath = `${archiveDir}/source.tar.gz`;
  const packed = await new Deno.Command("tar", {
    args: ["-czf", archivePath, "-C", wrapper, "agent-team-main"],
  }).output();
  assertEquals(packed.code, 0);
  const bytes = await Deno.readFile(archivePath);
  const fetchImpl = () =>
    Promise.resolve(new Response(bytes, { status: 200 }));
  const materialized = await materializeSource(DEFAULT_SOURCE, "main", fetchImpl);
  assertEquals(materialized.label, DEFAULT_SOURCE);
  const target = await Deno.makeTempDir({ prefix: "agent-team-dst-" });
  const result = await applyInstall({
    sourceRoot: materialized.root,
    targetRoot: target,
    ref: "main",
    manifest,
    sourceLabel: materialized.label,
  });
  assertEquals(result.lock.source, DEFAULT_SOURCE);
  assertEquals(result.lock.ref, "main");
  assertEquals(await Deno.readTextFile(`${target}/docs/agent/guide.md`), "guide remote\n");
});
