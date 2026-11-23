---
name: ito-training
description: Inspect the availability of ML training on a completed Itô compute booking and, when the canonical backend becomes available, hand off an explicitly confirmed training manifest. Use after ito-compute has booked GPU nodes and the user wants pre-training, fine-tuning, or RL on that metal. AETHERIS implements no training stack of its own.
metadata:
  origin: AETHERIS
  status: scaffold
---

# Itô Training

`ito-training` is the canonical AETHERIS skill for training on Itô compute. AETHERIS
never runs a trainer, scheduler, or data pipeline of its own; it never books,
reserves, or spends. This skill chains off a **completed booking** from
`ito-compute`.

## Current pr...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
