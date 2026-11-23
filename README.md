<p align="center">
  <img src="./assets/brand-logo.png" alt="Aetheris Logo" width="76" />
</p>

<h1 align="center">Aetheris v4.0 — Local-First AI Automation Platform</h1>

<p align="center">
  <strong>77 Specialized AI Agents · 328 Workflow Skills · 99 Slash Commands · 22 Rule Sets · Live Playground · 1-Click Client Bundles</strong><br/>
  Run your entire AI engineering &amp; business automation command center locally on <code>http://127.0.0.1:4820</code> — zero Docker, zero telemetry, zero monthly SaaS fees.
</p>

<p align="center">
  <a href="https://annoris.github.io/aetheris/"><strong>▶ Live Interactive Demo</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#quick-start-3-seconds"><strong>Quick Start</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#visual-panel-by-panel-tour"><strong>Visual Tour</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#unlock-full-private-repository-access-with-solana-sol"><strong>Unlock Full Repo (SOL)</strong></a>
</p>

<p align="center">
  <code>Node.js &gt;= 18</code> &nbsp;·&nbsp; <code>Zero External Requests</code> &nbsp;·&nbsp; <code>100% Local-First</code> &nbsp;·&nbsp; <code>Ollama / OpenAI / Anthropic Ready</code> &nbsp;·&nbsp; <code>SOL Licensed</code>
</p>

<p align="center">
  <a href="https://annoris.github.io/aetheris/">
    <img src="./assets/aetheris-demo.gif" alt="Aetheris v4.0 Live Product Demo" width="900" />
  </a>
</p>

---

## Why Aetheris?

Teams, AI agencies, and Small & Medium Businesses (SMBs) lose hours hunting for prompts across Notion docs, Slack threads, and scattered markdown files — or paying recurring monthly fees for locked cloud dashboards.

**Aetheris replaces that chaos with one fast, private, interactive Control Plane on your own machine:**
- **Instant launch (`npm start`)** — starts locally on `http://127.0.0.1:4820` with Node.js >= 18 and zero Docker containers.
- **Full prompt transparency & real disk CRUD** — inspect, create, edit, validate (`validate-agents.js`), and save agents directly to your repository.
- **Test before deploying** — run any of your 77 agents inside the built-in **Live Playground** using local Ollama, Anthropic, OpenAI, or the deterministic Dry-Run Inspector.
- **Deliver faster to clients** — package custom stacks of agents, skills, and rule sets into a portable `.aetheris.json` bundle in 1 click.

---

## Aetheris vs. The Old Way

| Dimension | Aetheris v4.0 (Local-First) | Cloud AI SaaS Dashboards | Raw Prompt Folders |
|---|---|---|---|
| **Cost** | One-time SOL license (no recurring seats) | Recurring monthly per-seat SaaS fees | Free, but high hidden maintenance cost |
| **Privacy & Telemetry** | **100% local (`127.0.0.1:4820`)**, zero telemetry | Prompts & context sent to vendor servers | Local, but unstructured & untracked |
| **Setup Time** | **`npm start` in 3 seconds** (zero Docker) | Account onboarding, billing, workspace setup | Manual copy-paste across repos & docs |
| **Live Playground** | Built-in (**Ollama**, **Anthropic**, **OpenAI**, **Dry-Run**) | Vendor-locked models & rate limits | None — switch tabs & copy-paste manually |
| **Client Packaging** | **1-Click `.aetheris.json` Bundle Builder** | Locked inside vendor workspaces | Manual zipping and broken file paths |
| **Ownership** | Plain Markdown & JSON in your own Git repo | Vendor lock-in & proprietary formats | Owned, but no UI, validation, or search |

---

## Architecture Overview

Aetheris runs as a self-contained local Control Plane on `http://127.0.0.1:4820`, reading and validating your plain-text disk assets directly and routing execution to the model provider you choose.

```mermaid
flowchart LR
    subgraph Disk["Local Disk Assets (Git-Native)"]
        A["77 Specialized Agents"]
        S["328 Workflow Skills"]
        C["99 Slash Commands"]
        R["22 Rule Sets"]
        M["MCP Configs & Hooks"]
    end

    CP["Aetheris Local Control Plane\nhttp://127.0.0.1:4820"]

    subgraph Modules["Interactive Workspace"]
        W["Prompt Workbench & Disk CRUD\n(validate-agents.js)"]
        B["Bundle Builder\n(.aetheris.json Export)"]
        P["Live Agent Playground\n(Token & Context Inspector)"]
    end

    subgraph Providers["Execution Targets"]
        O["Ollama (Local 127.0.0.1:11434)"]
        AN["Anthropic API"]
        OA["OpenAI API"]
        DR["Offline Dry-Run Inspector"]
    end

    A --> CP
    S --> CP
    C --> CP
    R --> CP
    M --> CP

    CP --> W
    CP --> B
    CP --> P

    P --> O
    P --> AN
    P --> OA
    P --> DR
```

---

## Visual Panel-by-Panel Tour

### 1. Command Hero & Live 60 FPS 3D Companion Avatar
The top Bento Hero gives you instant access to **Open Playground**, **`+ New Agent`**, and **Build Bundle**, paired with an interactive **60 FPS 3D-shaded companion mascot** that waves hello on load, tracks your cursor in 3D parallax, reacts to your actions, and keeps the workspace alive.

![Aetheris Hero and 60 FPS 3D Companion Avatar](./assets/screenshots/01-hero-3d-avatar.png)

---

### 2. 77 Specialized AI Agents Grid (Pin Favorites, Quick-Copy & `⌘K`)
Every agent is organized with category filters (`Design`, `Reviewers`, `Architects`, `Build`, `Security`), instant search (`⌘K`), model indicators (`opus`, `sonnet`, `haiku`), **★ Pin to Sidebar**, and **1-click Quick-Copy** of the full system prompt directly from any card.

![Aetheris 77 Specialized AI Agents Grid](./assets/screenshots/02-agents-grid.png)

---

### 3. Live Prompt Workbench & Real Disk CRUD
Click any agent, skill, or command to open the **Prompt Workbench**: inspect live **token, line, and character counts**, inject your **Task / Objective** and **Business / Stack Context**, edit the prompt inline, and save changes straight to disk with automatic schema validation (`validate-agents.js`).

![Aetheris Live Prompt Workbench and CRUD Editor](./assets/screenshots/03-prompt-workbench.png)

---

### 4. Built-in Live Agent Playground
Test any of your **77 agents** without leaving the page. Aetheris auto-detects **local Ollama (`127.0.0.1:11434`)**, **Anthropic**, or **OpenAI** from your environment — and includes a deterministic **Local Dry-Run Inspector** so you can verify prompt loading and token budgets offline.

![Aetheris Built-in Live Agent Playground](./assets/screenshots/04-agent-playground.png)

---

### 5. 1-Click Project & Client Bundle Builder
Building an AI automation setup for a clinic, e-commerce brand, agency, or engineering repo? Check the exact **Agents**, **Skills**, and **Rule Sets** you need, name your project, and export a clean, ready-to-deploy `.aetheris.json` package in one click.

![Aetheris Project and Client Bundle Builder](./assets/screenshots/05-bundle-builder.png)

---

### 6. Full License & Solana (`SOL`) Contribution Gate
In the **Public Preview Edition**, full prompts are redacted (`[LOCKED]`) and exports/edits are gated (`HTTP 402`). Clicking **Full License (`SOL`)** opens the built-in Solana contribution modal with one-click address copy and Solana Pay deep linking.

![Aetheris Full License Solana SOL Modal](./assets/screenshots/06-sol-license.png)

---

## Catalog Preview (77 Specialized Agents)

Explore key specialist roles included in the Aetheris catalog without scrolling through 77 files:

<details>
<summary><strong>Design &amp; Brand</strong> — UI/UX systems, accessibility, brand voice, and frontend craft</summary>

- `graphic-design-expert` — Minimalist Swiss/Linear/Vercel UI/UX systems, Bento grids, and design tokens
- `brand-identity-architect` — Brand positioning, visual identity architecture, and voice compliance
- `a11y-architect` — WCAG 2.2 accessibility architecture and component audits
- `react-reviewer` &amp; `react-build-resolver` — React/JSX hooks, state, and Vite/Next.js build fixes
- `vue-reviewer` — Vue.js Composition API, Pinia, and Nuxt reactivity reviews
- `flutter-reviewer` &amp; `swift-reviewer` — Cross-platform mobile UI and native iOS code reviews

</details>

<details>
<summary><strong>Prompting &amp; Growth</strong> — Prompt architecture, GitHub launches, SEO, and acquisition</summary>

- `prompt-engineering-expert` — High-precision system prompts, structured evals, and token optimization
- `github-trending-expert` — High-converting README architecture and organic open-source launch strategy
- `viral-digital-marketing-expert` — Platform-native distribution hooks and organic growth campaigns
- `marketing-agent` — Campaign planning, launch copy, and structured content calendars
- `seo-specialist` — Technical SEO audits, structured data, and Core Web Vitals optimization

</details>

<details>
<summary><strong>Architecture &amp; Code Review</strong> — Multi-language reviewers, planners, and ML/RAG pipelines</summary>

- `architect` &amp; `code-architect` — System scalability design and codebase-aligned feature blueprints
- `planner` &amp; `spec-miner` — Phased implementation plans and brownfield spec extraction
- `code-reviewer`, `typescript-reviewer`, `python-reviewer`, `go-reviewer`, `rust-reviewer`, `java-reviewer`, `csharp-reviewer`, `php-reviewer`, `ruby-reviewer`, `cpp-reviewer`, `kotlin-reviewer`, `fsharp-reviewer`, `django-reviewer`, `fastapi-reviewer`
- `database-reviewer` — PostgreSQL/Supabase schema design and query optimization
- `rag-pipeline-reviewer` &amp; `mle-reviewer` — Chunking, reranking, RAGAS coverage, and production ML pipelines
- `performance-optimizer`, `type-design-analyzer`, `code-explorer`, `code-simplifier`, `refactor-cleaner`

</details>

<details>
<summary><strong>Security &amp; Reliability</strong> — AppSec, TDD, E2E testing, clinical safety, and OSS sanitization</summary>

- `security-reviewer` — Vulnerability detection, auth checks, input validation, and secrets hygiene
- `tdd-guide` &amp; `e2e-runner` — Test-driven workflows (80%+ coverage) and Playwright E2E suites
- `silent-failure-hunter` &amp; `pr-test-analyzer` — Catching swallowed errors and PR test coverage gaps
- `healthcare-reviewer` — Clinical safety, PHI compliance, and CDSS accuracy reviews
- `network-config-reviewer` — Router/switch configuration security and correctness
- `opensource-sanitizer` &amp; `agent-evaluator` — Secret stripping before public release and 5-axis output scoring

</details>

<details>
<summary><strong>Operations &amp; Automation</strong> — Autonomous loops, harness tuning, networking, and OSS packaging</summary>

- `chief-of-staff` — Multi-channel communication triage and executive drafting
- `loop-operator` &amp; `harness-optimizer` — Safe autonomous loop execution, stall monitoring, and cost/throughput tuning
- `network-architect`, `homelab-architect`, &amp; `network-troubleshooter` — Multi-site networking and OSI-layer diagnosis
- `opensource-forker` &amp; `opensource-packager` — Forking, sanitizing, and packaging open-source releases
- `build-error-resolver` (+ Go, Rust, Java, C++, Kotlin, Swift, Dart, Django, PyTorch resolvers)
- `doc-updater`, `docs-lookup`, `comment-analyzer`, `commit-reviewer`, `conversation-analyzer`

</details>

> Try the live interactive catalog right now in your browser: **[https://annoris.github.io/aetheris/](https://annoris.github.io/aetheris/)**

---

## Quick Start (3 Seconds)

```bash
git clone https://github.com/annoris/aetheris.git
cd aetheris
npm start
```

Open **`http://127.0.0.1:4820`** in your browser.  
Press **`⌘K`** for the Command Palette, **`1`–`7`** to jump between tabs, or **`?`** for all keyboard shortcuts.

---

## Public Preview vs. Full Licensed Repository

| Capability | Public Preview (`aetheris`) | Full Licensed Edition (`aetheris-pro`) |
|---|---|---|
| Local Control Plane UI (`http://127.0.0.1:4820`) | Included | Included |
| Interactive 60 FPS 3D Companion Avatar | Included | Included |
| 77 Agents, 328 Skills, 99 Commands, 22 Rule Sets | Preview Snippets (`[LOCKED]`) | **100% Complete Untruncated Prompts** |
| Real CRUD (Create / Edit / Save / Delete to Disk) | Locked (`HTTP 402`) | **Fully Unlocked** |
| 1-Click Bundle Builder Export (`.aetheris.json`) | Locked (`HTTP 402`) | **Fully Unlocked** |
| Live Agent Playground & MCP/Hook Switches | Preview Mode | **Full Production Prompts** |
| Private GitHub Repository Download Access | No | **Yes — Full Private Repo Access** |

---

## Unlock Full Private Repository Access with Solana (`SOL`)

Contribute in **Solana (`SOL`)** to unlock **full access to the Private Repository (`aetheris-pro`)**, all **77 complete agents**, **328 full skills**, **Bundle Builder downloads**, and commercial usage rights:

<p align="center">
  <img src="./assets/sol-qr.png" alt="Receive SOL QR Code" width="210" />
</p>

- **Network:** Solana (`SOL`) only
- **Official SOL Wallet Address:**  
  `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`
- **Solana Pay Link:**  
  `solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License`

**Activation in 3 steps:**
1. Send your **SOL** contribution on the Solana network to `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`.
2. Keep your **Solana Transaction Signature (`TX Hash`)** and your **GitHub username**.
3. Once verified, your GitHub account is granted collaborator access to **`annoris/aetheris-pro`** for full download access.

---

## Roadmap

- **v4.0 (Live Now):** Local-first Control Plane (`127.0.0.1:4820`), 77 specialized agents, 328 skills, 99 commands, 22 rule sets, Prompt Workbench + Disk CRUD, Live Playground (`Ollama` / `Anthropic` / `OpenAI` / `Dry-Run`), 1-Click `.aetheris.json` Bundle Builder, and static GitHub Pages interactive preview.
- **v4.1 (Next):** Side-by-side prompt diffing in the Playground, saved multi-agent preset chains, and one-click `.aetheris.json` bundle import validation.
- **v4.2 (Planned):** Local evaluation runner with pass/fail scorecards per agent, expanded MCP server templates, and team Git-sync presets for agencies and SMBs.

---

## Documentation & Licensing

- **Live Interactive Demo:** [https://annoris.github.io/aetheris/](https://annoris.github.io/aetheris/)
- **Complete Technical & Operations Manual:** [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)
- **GitHub Trending 7-Day Launch Playbook:** [docs/GITHUB-TRENDING-PLAYBOOK.md](./docs/GITHUB-TRENDING-PLAYBOOK.md)
- **Dual-Edition License Terms:** [LICENSING.md](./LICENSING.md)
