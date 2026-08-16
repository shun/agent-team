#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

export type RunnerKind = "none" | "aira" | "deno" | "codex" | "agy" | "cursor";

export type Task = {
  id: string;
  done: boolean;
  depends: string[];
  runner: RunnerKind;
};

export type Plan = {
  id: string;
  status: string;
  tasks: Task[];
};

export type RunArgv =
  | { kind: "no-cli" }
  | { kind: "argv"; argv: [string, ...string[]] };

const TASK_ID = /^T-[A-Z0-9][A-Z0-9-]*$/;
const PLAN_ID = /^[a-z0-9][a-z0-9-]*$/;
const RUNNERS = new Set<RunnerKind>(["none", "aira", "deno", "codex", "agy", "cursor"]);

export function parsePlan(markdown: string): Plan {
  const fence = markdown.match(/```plan\n([\s\S]*?)\n```/);
  if (!fence) throw new Error("fail-closed: missing ```plan fence");
  const lines = fence[1].split("\n");
  let id = "";
  let status = "";
  const tasks: Task[] = [];
  let current: Partial<Task> | null = null;

  const flush = () => {
    if (!current) return;
    if (!current.id || !TASK_ID.test(current.id)) {
      throw new Error("fail-closed: invalid task id");
    }
    if (current.done === undefined || !current.depends || !current.runner) {
      throw new Error(`fail-closed: incomplete task ${current.id}`);
    }
    if (!RUNNERS.has(current.runner)) {
      throw new Error(`fail-closed: unknown runner ${current.runner}`);
    }
    tasks.push({
      id: current.id,
      done: current.done,
      depends: current.depends,
      runner: current.runner,
    });
    current = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/\t/g, "  ");
    if (line.startsWith("id: ")) {
      id = line.slice(4).trim();
      if (!PLAN_ID.test(id)) throw new Error("fail-closed: invalid plan id");
      continue;
    }
    if (line.startsWith("status: ")) {
      status = line.slice(8).trim();
      if (!/^[a-z0-9-]+$/.test(status)) {
        throw new Error("fail-closed: invalid status");
      }
      continue;
    }
    if (line.trim() === "tasks:") continue;
    if (line.match(/^  - id: /)) {
      flush();
      current = { id: line.replace(/^  - id: /, "").trim(), depends: [] };
      continue;
    }
    if (!current) {
      if (line.trim() === "") continue;
      throw new Error(`fail-closed: unexpected line: ${line}`);
    }
    if (line.match(/^    done: /)) {
      const value = line.slice(10).trim();
      if (value !== "true" && value !== "false") {
        throw new Error("fail-closed: done must be true or false");
      }
      current.done = value === "true";
      continue;
    }
    if (line.match(/^    depends: \[\]$/)) {
      current.depends = [];
      continue;
    }
    if (line.match(/^    depends: \[[^\]]+\]$/)) {
      const inner = line.slice(line.indexOf("[") + 1, line.lastIndexOf("]"));
      const depends = inner.split(",").map((part) => part.trim());
      if (depends.some((item) => !TASK_ID.test(item))) {
        throw new Error("fail-closed: invalid dependency id");
      }
      current.depends = depends;
      continue;
    }
    if (line.match(/^    runner: /)) {
      current.runner = line.slice(12).trim() as RunnerKind;
      continue;
    }
    throw new Error(`fail-closed: unexpected task field: ${line}`);
  }
  flush();
  if (!id || !status || tasks.length === 0) {
    throw new Error("fail-closed: plan missing id, status, or tasks");
  }
  const ids = new Set(tasks.map((task) => task.id));
  if (ids.size !== tasks.length) throw new Error("fail-closed: duplicate task id");
  for (const task of tasks) {
    for (const dep of task.depends) {
      if (!ids.has(dep)) throw new Error(`fail-closed: missing dependency ${dep}`);
      if (dep === task.id) throw new Error("fail-closed: self dependency");
    }
  }
  return { id, status, tasks };
}

export function isReady(plan: Plan, task: Task): boolean {
  if (task.done) return false;
  const done = new Set(plan.tasks.filter((item) => item.done).map((item) => item.id));
  return task.depends.every((id) => done.has(id));
}

export function nextTask(plan: Plan): Task | null {
  return plan.tasks.find((task) => isReady(plan, task)) ?? null;
}

export function buildRunArgv(runner: RunnerKind, taskId: string): RunArgv {
  if (!TASK_ID.test(taskId)) throw new Error("fail-closed: invalid task id");
  if (runner === "none" || runner === "aira") return { kind: "no-cli" };
  if (runner === "codex") return { kind: "argv", argv: ["codex", "exec", taskId] };
  if (runner === "agy") return { kind: "argv", argv: ["agy", "-p", taskId] };
  if (runner === "cursor") return { kind: "argv", argv: ["cursor-agent", "-p", taskId] };
  return { kind: "argv", argv: ["deno", "run", "--allow-read", "scripts/run-plan.ts", "status"] };
}

export function appendOpenIssue(markdown: string, note: string): string {
  if (note.includes("\n") || note.includes("```") || note.includes("$(")) {
    throw new Error("fail-closed: issue note must be a single safe line");
  }
  const marker = "## Open issues\n";
  const index = markdown.indexOf(marker);
  if (index < 0) throw new Error("fail-closed: missing Open issues section");
  const none = "- （なし）\n";
  const noneIndex = markdown.indexOf(none, index);
  const item = `- ${note}\n`;
  if (noneIndex >= 0) {
    return markdown.slice(0, noneIndex) + item + markdown.slice(noneIndex + none.length);
  }
  return markdown.endsWith("\n") ? `${markdown}${item}` : `${markdown}\n${item}`;
}

export function formatStatus(plan: Plan): string {
  const next = nextTask(plan);
  const lines = [
    `plan ${plan.id}`,
    `status ${plan.status}`,
    ...plan.tasks.map((task) => {
      const state = task.done ? "done" : isReady(plan, task) ? "ready" : "blocked";
      return `${task.id} ${state} runner=${task.runner} depends=${task.depends.join(",") || "none"}`;
    }),
    `next ${next ? next.id : "none"}`,
  ];
  return lines.join("\n");
}

function parseArgs(args: string[]): {
  planPath: string;
  command: "status" | "next" | "run" | "issue";
  taskId: string | null;
  note: string | null;
  execute: boolean;
} {
  let planPath = "tmp/PLAN.md";
  let command: "status" | "next" | "run" | "issue" | null = null;
  let taskId: string | null = null;
  let note: string | null = null;
  let execute = false;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--plan") {
      planPath = args[++i] ?? "";
      continue;
    }
    if (arg === "--task") {
      taskId = args[++i] ?? null;
      continue;
    }
    if (arg === "--note") {
      note = args[++i] ?? null;
      continue;
    }
    if (arg === "--execute") {
      execute = true;
      continue;
    }
    if (arg === "status" || arg === "next" || arg === "run" || arg === "issue") {
      if (command) throw new Error("fail-closed: only one command");
      command = arg;
      continue;
    }
    throw new Error(`fail-closed: unknown argument ${arg}`);
  }
  if (!command) throw new Error("fail-closed: command required");
  if (!planPath.endsWith(".md") || planPath.includes("..")) {
    throw new Error("fail-closed: invalid plan path");
  }
  return { planPath, command, taskId, note, execute };
}

export async function main(args: string[], readFile: (path: string) => Promise<string>, writeFile?: (path: string, text: string) => Promise<void>, spawn?: (argv: string[]) => Promise<number>): Promise<string> {
  const parsed = parseArgs(args);
  const markdown = await readFile(parsed.planPath);
  const plan = parsePlan(markdown);
  if (parsed.command === "status") return formatStatus(plan);
  if (parsed.command === "next") {
    const next = nextTask(plan);
    return next ? next.id : "none";
  }
  if (parsed.command === "issue") {
    if (!parsed.note) throw new Error("fail-closed: --note required");
    if (!writeFile) throw new Error("fail-closed: write not available");
    await writeFile(parsed.planPath, appendOpenIssue(markdown, parsed.note));
    return `recorded issue: ${parsed.note}`;
  }
  if (!parsed.taskId) throw new Error("fail-closed: --task required");
  const task = plan.tasks.find((item) => item.id === parsed.taskId);
  if (!task) throw new Error("fail-closed: unknown task");
  if (task.done) throw new Error("fail-closed: task already done");
  if (!isReady(plan, task)) throw new Error("fail-closed: dependencies incomplete");
  const run = buildRunArgv(task.runner, task.id);
  if (run.kind === "no-cli") {
    return `${task.id} runner=${task.runner} no-cli`;
  }
  const printed = run.argv.join(" ");
  if (!parsed.execute) return `would-run ${printed}`;
  if (!spawn) throw new Error("fail-closed: spawn not available");
  const code = await spawn(run.argv);
  return `ran ${printed} exit=${code}`;
}

if (import.meta.main) {
  const readFile = (path: string) => Deno.readTextFile(path);
  const writeFile = (path: string, text: string) => Deno.writeTextFile(path, text);
  const spawn = async (argv: string[]) => {
    const command = new Deno.Command(argv[0], { args: argv.slice(1) });
    const result = await command.output();
    return result.code;
  };
  try {
    const output = await main(Deno.args, readFile, writeFile, spawn);
    console.log(output);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  }
}
