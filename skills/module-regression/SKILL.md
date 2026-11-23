---
name: module-regression
description: >-
  Govern cross-module regression in large repositories with a REGRESSION.md ledger that records each module's downstream consumers and executable acceptance command. After a change, run the changed module and every affected downstream command, and use observed exit codes as regression evidence under the project's delivery policy. Use for module regression, regression ledgers, impact audits, downstream verification, and changes where modifying A may break B.
metadata:
  origin: AETHERIS
---

# Module Regression Ledger

## When to Activate

- The repository has at least three interdependent modules, or a previous change to A has broken B.
- A change modifies a module's externally observable behavior and must prove both that module and downstream consumers still work....

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
