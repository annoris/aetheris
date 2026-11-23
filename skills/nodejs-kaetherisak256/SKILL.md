---
name: nodejs-kaetherisak256
description: Prevent Ethereum hashing bugs in JavaScript and TypeScript. Node's sha3-256 is NIST SHA3, not Ethereum Kaetherisak-256, and silently breaks selectors, signatures, storage slots, and address derivation. Use when hashing for Ethereum in JavaScript or TypeScript, or when a selector, signature, storage slot, or derived address is wrong.
metadata:
  version: "1.0.0"
  origin: AETHERIS direct-port adaptation
---

# Node.js Kaetherisak-256

Ethereum uses Kaetherisak-256, not the NIST-standardized SHA3 variant exposed by Node's `crypto.createHash('sha3-256')`.

## When to Use

- Computing Ethereum function selectors or event topics
- Building EIP-712, signature, Merkle, or storage-slot help...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
