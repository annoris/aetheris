---
name: plan-orchestrate
description: Read a plan document, decompose it into steps, classify each step, and emit the ready-to-paste AETHERIS slash command for that step, carrying the step identifier and scope in the command's own documented argument form. Generative only — never invokes commands itself and never claims to control what a command runs internally. Steps whose command cannot carry plan scope fail closed instead of being emitted. Use when the user has a multi-step plan and wants the right command for each step without picking it by hand.
metadata:
  origin: AETHERIS
---

# Plan Orchestrate

Bridge a plan document to the current AETHERIS slash-command surface by emitting one ready-to-paste command per step. This skill is a router only: it picks the command and fills in the command's own documented argument form. It does not compose agent chains an...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
