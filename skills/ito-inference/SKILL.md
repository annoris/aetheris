---
name: ito-inference
description: Inspect the availability of model serving on a completed Itô compute booking and, when the canonical backend becomes available, hand off an explicitly confirmed serving manifest. Use after ito-compute has booked GPU nodes and the user asks for an OpenAI-compatible endpoint, ito-serve, hosted Kimi, or self-hosted open-weights inference. AETHERIS implements no serving stack of its own.
metadata:
  origin: AETHERIS
  status: scaffold
  aliases: ito-serve, hosted-open-weights
---

# Itô Inference

`ito-inference` is the sole canonical AETHERIS skill for inference serving on Itô
compute. Requests naming `ito-serve` route here; do not create or install a
second `ito-serve` skill. AETHERIS never SSHes to nodes, downloads weights, launches
an engine, or expose...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
