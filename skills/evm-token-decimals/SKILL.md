---
name: evm-token-decimals
description: Prevent silent decimal mismatch bugs across EVM chains. Covers runtime decimal lookup, chain-aware caching, bridged-token precision drift, and safe normalization for bots, dashboards, and DeFi tools. Use when handling token amounts across EVM chains, or when a balance, price, or transfer amount is off by orders of magnitude.
metadata:
  version: "1.0.0"
  origin: AETHERIS direct-port adaptation
---

# EVM Token Decimals

Silent decimal mismatches are one of the easiest ways to ship balances or USD values that are off by orders of magnitude without throwing an error.

## When to Use

- Reading ERC-20 balances in Python, TypeScript, or Solidity
- Calculating fiat values from o...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
