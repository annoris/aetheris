---
name: terminal-opener
description: Open an executable and its argument array in a visible terminal window through a reusable, shell-free launch plan with dry-run, JSON, capability detection, detached fallback, and standalone recovery modes. Use when Codex needs to open an interactive CLI, SSH session, local development process, sandbox, or other argv-based command in a new host terminal; diagnose whether a supported terminal is available; or provide an actionable plan when the requested terminal is unsupported.
---

# Terminal Opener

Use `scripts/open-terminal.js` to preserve an executable and every argument as
separate process entries. Never interpolate a shell command string. Keep every
spawn on `shell: false`. Default to a non-launching plan. Use `--launch` only
after the user explicitly...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
