---
name: agent-team
description: Run the seven-person agent-team with Aira as the main Antigravity agent and Gemini 3.6 Flash subagents
---

# Run agent-team

Treat all text supplied after `/agent-team` as the human's request.

Read `.agents/workflows/agent-team.md` completely and execute that workflow exactly. Also read
`.agents/agents.md` and the canonical files required by the workflow before defining or invoking any
subagent.

This file is only the Antigravity CLI slash-command entry point. Role definitions, safety boundaries,
dispatch gates, and failure behavior remain authoritative in the referenced files; do not duplicate or
weaken them here.
