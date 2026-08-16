import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import {
  appendOpenIssue,
  buildRunArgv,
  formatStatus,
  isReady,
  nextTask,
  parsePlan,
  main,
} from "./run-plan.ts";

const fixture = `# Plan

\`\`\`plan
id: sample-plan
status: in-progress
tasks:
  - id: T-001
    done: true
    depends: []
    runner: none
  - id: T-002
    done: false
    depends: [T-001]
    runner: deno
  - id: T-003
    done: false
    depends: [T-002]
    runner: codex
\`\`\`

## Open issues

- （なし）
`;

Deno.test("parses the plan fence and finds the next ready task", () => {
  const plan = parsePlan(fixture);
  assertEquals(plan.id, "sample-plan");
  assertEquals(nextTask(plan)?.id, "T-002");
  assertEquals(isReady(plan, plan.tasks[2]), false);
});

Deno.test("does not treat free text or unknown fields as executable", () => {
  assertThrows(() => parsePlan("# no fence\n"), Error, "missing ```plan");
  assertThrows(
    () =>
      parsePlan(`\`\`\`plan
id: bad
status: in-progress
tasks:
  - id: T-001
    done: false
    depends: []
    runner: /bin/rm
\`\`\``),
    Error,
    "unknown runner",
  );
});

Deno.test("builds argv from runner kind and task id only", () => {
  assertEquals(buildRunArgv("none", "T-001"), { kind: "no-cli" });
  assertEquals(buildRunArgv("codex", "T-003"), {
    kind: "argv",
    argv: ["codex", "exec", "T-003"],
  });
  assertEquals(buildRunArgv("agy", "T-003"), {
    kind: "argv",
    argv: ["agy", "-p", "T-003"],
  });
  assertEquals(buildRunArgv("cursor", "T-003"), {
    kind: "argv",
    argv: ["cursor-agent", "-p", "T-003"],
  });
  assertThrows(() => buildRunArgv("codex", "rm -rf /"), Error, "invalid task id");
});

Deno.test("status and next do not walk 1..N automatically", async () => {
  const status = await main(["--plan", "fixture.md", "status"], async () => fixture);
  assertEquals(status.includes("T-002 ready"), true);
  assertEquals(status.includes("T-003 blocked"), true);
  assertEquals(status.includes("next T-002"), true);
  const next = await main(["--plan", "fixture.md", "next"], async () => fixture);
  assertEquals(next, "T-002");
});

Deno.test("run refuses incomplete dependencies and does not commandize notes", async () => {
  await main(["--plan", "fixture.md", "run", "--task", "T-003"], async () => fixture)
    .then(() => {
      throw new Error("should fail");
    })
    .catch((error) => {
      assertEquals(String(error).includes("dependencies incomplete"), true);
    });
  const dry = await main(
    ["--plan", "fixture.md", "run", "--task", "T-002"],
    async () => fixture,
  );
  assertEquals(dry.startsWith("would-run deno run"), true);
  assertEquals(dry.includes("完了まで届く"), false);
});

Deno.test("issue appends a note without switching the current task", () => {
  const updated = appendOpenIssue(fixture, "OI-99 keep finishing T-002");
  assertEquals(updated.includes("- OI-99 keep finishing T-002\n"), true);
  assertEquals(updated.includes("- （なし）"), false);
  assertEquals(nextTask(parsePlan(updated))?.id, "T-002");
  assertThrows(() => appendOpenIssue(fixture, "bad\n```\nrm"), Error, "safe line");
});

Deno.test("accepts cursor as a plan runner kind", () => {
  const plan = parsePlan(`# Plan

\`\`\`plan
id: cursor-plan
status: in-progress
tasks:
  - id: T-010
    done: false
    depends: []
    runner: cursor
\`\`\`

## Open issues

- （なし）
`);
  assertEquals(plan.tasks[0].runner, "cursor");
  assertEquals(nextTask(plan)?.id, "T-010");
});

Deno.test("formatStatus lists every task once", () => {
  const text = formatStatus(parsePlan(fixture));
  assertEquals(text.split("\n").filter((line) => line.startsWith("T-")).length, 3);
});
