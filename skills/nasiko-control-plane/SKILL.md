---
name: nasiko-control-plane
description: Manage the experimental Nasiko CLI lifecycle through AETHERIS — read-only status checks, consent-gated install of the pinned qualified version with dry-run preview, and ownership-checked uninstall, under explicit telemetry and secrets boundaries. Use when the user asks to install, inspect, or remove the Nasiko CLI or check whether it is present.
---

# Nasiko CLI Lifecycle Bridge

Use this skill when a user explicitly asks AETHERIS to install, inspect, or remove
the qualified Nasiko CLI. This skill does not operate a Nasiko control plane.

## Safety contract

- Begin with `aetheris nasiko status --json`. Status is read-only....

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
