# Step 5：头像风格 & 生图

所有龙虾头像**必须使用统一的视觉风格**，确保龙虾家族的风格一致性。
头像需传达 3 个信息：**物种形态 + 性格暗示 + 标志道具**

## 风格参考

亚当（Adam）—— 龙虾族创世神，本 Skill 的首个作品。

所有新生成的龙虾头像应与这一风格保持一致：复古未来主义、街机 UI 包边、强轮廓、可在 64x64 下辨识。

## 统一风格基底（STYLE_BASE）

**每次生成都必须包含这段基底**，不得修改或省略：

```
STYLE_BASE = """
Retro-futuristic...

---
### [LOCKED — AETHERIS FULL LICENSE REQUIRED]

This is the **Public Preview Edition** of Aetheris.
Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.

- **Contribute with Solana (SOL):** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay:** `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`
- See `LICENSING.md` for full license activation & private repository access.
