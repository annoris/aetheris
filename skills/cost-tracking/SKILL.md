---
name: cost-tracking
description: Track and report Claude Code token usage, spending, and budgets from the local AETHERIS cost-tracker metrics log. Use when the user asks about costs, spending, usage, tokens, budgets, or cost breakdowns by model, session, or date.
metadata:
  origin: community
---

# Cost Tracking

Use this skill to analyze Claude Code cost and usage history from the metrics log
that AETHERIS's `stop:cost-tracker` hook writes.

## Where the data lives

The tracker appends one JSON object per session-stop to
`~/.claude/metrics/costs.jsonl`. Each row is a **c...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
