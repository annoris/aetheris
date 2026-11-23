---
name: prompt-caching-strategy
description: >-
  Optimize LLM prompt caching hit rate to reduce API costs and improve latency.
  Analyzes prompt structure, identifies cacheable vs non-cacheable content,
  and recommends restructuring to maximize cache reuse.
  TRIGGER when: user says "prompt cache", "cache hit rate", "reduce LLM cost",
  "optimize token usage", "cheaper LLM calls", or asks about prompt caching
  strategies for OpenAI/Anthropic/other providers.
  DO NOT TRIGGER when: user just wants to optimize a single prompt's quality
  (use prompt-optimizer instead), or asks about general caching infrastructure.
metadata:
  origin: community
  author: cyberspace-cs
  version: "1.0.0"
---

# Prompt Caching Strategy

Arrange reusable prompt content to improve cache reuse, then measure input cost
and latency. Savings depend on model, platform, cache eligibility, writes,
retention, reuse and output volume. Runtime cache hits and savings for this skill
are **unmeasured...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
