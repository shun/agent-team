---
name: team-plan
description: Review and finalize the repository's seven-agent planning policy. Use only for policy design and human approval before enabling task planning or execution.
---

# Team plan policy draft

Use this draft Skill only to complete the human decisions needed before the
repository enables a seven-agent planning workflow. It is not yet an execution
Skill and must not create, read, or update `tmp/PLAN.md`.

## Current process

Read `docs/work/team-plan-foundation/decision-brief.md` and return its unresolved
decisions to the human. Keep each answer atomic: identify the approved operation,
actor, scope, and expiry condition. Record a human decision in a new Markdown
artifact under `docs/work/team-plan-foundation/` before proposing any canonical
change.

Do not treat planning readiness as permission to execute a task. Do not parse
Markdown as shell code, enable automatic dispatch, or weaken the repository's
`tmp/` safety boundary while this draft is pending.

## Activation criteria

Enable the production workflow only after a human has explicitly decided the
following: the seven-role participation rule, material-unknown gate,
`tmp/PLAN.md` lifecycle, execution authorization, completion/check ownership,
parallel-state update rule, retry/stall rule, and Bash input boundary.

After approval, replace this draft with the operational workflow and validate it
against the approved acceptance criteria before using it for Mission Room work.
