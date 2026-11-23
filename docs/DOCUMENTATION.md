# Aetheris v4.0 — Technical Documentation & Operations Manual

## 1. Architecture Overview

Aetheris runs as a zero-external-dependency, loopback-only Node.js application:

```text
scripts/
├── aetheris-web.js                 # CLI entry point (default http://127.0.0.1:4820)
└── aetheris/
    ├── lib.js                      # Loopback security guard, frontmatter parser, activity reader
    ├── loaders.js                  # Disk loaders for agents, skills, commands, rules, MCPs, hooks
    ├── actions.js                  # CRUD save/delete, MCP/Hook toggles, Bundle Builder, Playground
    ├── server.js                   # HTTP server, edition license gate (full vs preview), API routes
    ├── template.js                 # Modern minimalist UI, 60 FPS 3D mascot, Workbench, SOL modal
    └── build-public-preview.js     # Generates the locked Public Preview Edition (dist-public-preview/)

agents/                             # 75 specialized AI agent definitions (.md)
skills/                             # 328 domain workflow skills (SKILL.md)
commands/                           # 99 slash commands (.md)
rules/                              # 22 language/stack rule sets
hooks/                              # Event-driven automation hooks (hooks.json)
mcp-configs/ & .mcp.json            # MCP server connector configurations
assets/                             # brand-logo.png, sol-qr.png, aetheris-avatar.png
```

---

## 2. Core Platform Features

### A. Real CRUD (Create, Edit, Save, Delete)
- Click **`+ New Agent`** in the Hero to create a new agent directly in `agents/<slug>.md`.
- Open any agent detail page and click **`Edit`** → modify the prompt → click **`Save to Disk`**.
- Agent saves automatically execute `scripts/ci/validate-agents.js` and roll back cleanly if frontmatter validation fails.

### B. Live Agent Playground (`Workspace → Playground`)
- Select any of the **75 agents** and test its full system prompt live.
- **Auto-detect provider chain:**
  1. Local **Ollama** (`http://127.0.0.1:11434`)
  2. **Anthropic API** (`ANTHROPIC_API_KEY`)
  3. **OpenAI API** (`OPENAI_API_KEY`)
  4. **Local Dry-Run Inspector** (deterministic prompt verification fallback when no model key is active)

### C. MCP Connectors & Hook Flows Manager
- Toggle individual MCP servers (`Connectors`) or event hooks (`Flows`) **On / Off** directly from the UI.
- Disabled entries are safely preserved under `_disabledMcpServers` / `_disabledHooks` in their JSON files so nothing is ever lost.

### D. Project & Client Bundle Builder (`Workspace → Bundle Builder`)
- Select any combination of **Agents**, **Skills**, and **Rule Sets**, name the project, and click **`Export Bundle (.json)`** to download a ready-to-deploy `.aetheris.json` package.
- **Locked in Preview Edition:** Returns `HTTP 402` and prompts the **Solana (`SOL`) Full License** modal.

### E. Interactive 60 FPS 3D Mascot & Keyboard Shortcuts
- **60 FPS Canvas Companion:** Waves hello on load, tracks cursor in 3D parallax, blinks, talks with speech bubble, and responds to **`Wave Hi`**, **`Dance`**, **`Chat`**, and drag-and-drop.
- **Keyboard Shortcuts:** `⌘K` (Command Palette), `1`–`7` (Switch Tabs), `?` (Shortcuts Help), `ESC` (Close Modal / Back).

---

## 3. Local HTTP API Reference

| Method | Endpoint | Description | Preview Edition |
|---|---|---|---|
| `GET` | `/` | Renders Aetheris Control Plane UI | Allowed (Preview Mode) |
| `GET` | `/brand-logo.png` | Serves official Aetheris emblem | Allowed |
| `GET` | `/sol-qr.png` | Serves official Solana (SOL) QR code | Allowed |
| `GET` | `/api/data` | Returns agents, skills, commands, rules, MCPs, hooks | Redacted previews |
| `GET` | `/api/item?type=&name=` | Returns prompt content for an item | Redacted preview |
| `POST` | `/api/item/save` | Creates or updates an item on disk | **Locked (`402`)** |
| `POST` | `/api/item/delete` | Deletes an item from disk | **Locked (`402`)** |
| `POST` | `/api/mcps/toggle` | Enables/disables an MCP server | Allowed locally |
| `POST` | `/api/hooks/toggle` | Enables/disables a hook entry | Allowed locally |
| `POST` | `/api/bundle/export` | Exports a `.aetheris.json` project bundle | **Locked (`402`)** |
| `GET` | `/api/playground/status` | Checks Ollama / Anthropic / OpenAI availability | Allowed |
| `POST` | `/api/playground/run` | Runs an agent prompt against selected provider | Allowed |
| `GET` | `/api/activity` | Reads bounded 256KB tail of local tool usage log | Allowed |

---

## 4. Publishing Two GitHub Repositories (Public Preview + Private Full)

To protect your full codebase so only **SOL contributors** can download the complete repository:

1. **Create two repositories on GitHub:**
   - **Private repo (Full Licensed Edition):** `aetheris-pro` (**Visibility: Private**)
   - **Public repo (Preview Showcase):** `aetheris-preview` (**Visibility: Public**)
2. **Push the Full Private Repository (from the project root):**
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USER>/aetheris-pro.git
   git push -u origin main
   ```
3. **Build and push the Public Preview Repository:**
   ```bash
   node scripts/aetheris/build-public-preview.js
   cd dist-public-preview
   git remote add origin https://github.com/<YOUR_GITHUB_USER>/aetheris-preview.git
   git push -u origin main
   ```
4. **Granting Contributor Access:**
   - When a user contributes in **SOL** to `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm` and shares their Solana TX signature, add their GitHub username as a collaborator on your **Private `aetheris-pro`** repository so they can clone/download the full edition.
