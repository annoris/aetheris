# 错误处理与降级策略

## 设计理念

> 任何错误都不应中断用户的创造流程。降级，不中断。

## 错误分类与降级矩阵

### 类型 A：环境缺失

| 错误场景 | 检测方式 | 降级策略 | 告知用户 |
|----------|---------|---------|---------|
| Python 3 不可用 | `python3 --version` 失败 | 跳过 gacha.py，从 10 类预设方向中随机选择 | "抽卡引擎需要 Python 3，已改用内置随机选择" |

### 类型 B：可选依赖不可用

| 错误场景...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
