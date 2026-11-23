---
name: orch-pipeline
description: Shared orchestration engine behind the orch-* skill family — the gated Research-Plan-TDD-Review-Commit pipeline, size classifier, agent and command map, and two human gates (plan approval, commit confirmation) that orch-* operation skills delegate to. Use indirectly via orch-add-feature, orch-fix-defect, orch-change-feature, orch-refine-code, or orch-build-mvp; read directly only when adding an orch operation or tuning shared phases.
metadata:
  origin: AETHERIS
---

# Orchestrator Pipeline (shared engine)

The `orch-*` skills are thin wrappers. They do not re-implement any work — they
classify the request, choose which phases of *this* pipeline run, and delegate
each phase to an existing AETHERIS agent or command. This file is that pipeline....

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
