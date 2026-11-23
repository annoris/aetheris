# Aetheris v4.0 — Organic 7-Day GitHub Trending Launch Playbook

**Repository:** `https://github.com/annoris/aetheris`  
**Live Interactive Demo:** `https://annoris.github.io/aetheris/`  
**Official SOL License Wallet:** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`

---

## 1. How GitHub Trending Actually Works (No Myths)

GitHub Trending is **not** a leaderboard of total lifetime stars. It is driven primarily by **24-hour normalized star velocity**:

1. **Normalized 24h Star Velocity:** GitHub measures how many *legitimate, active GitHub accounts* star a repository within a rolling 24-hour window, weighted against the repository's existing baseline. A newer repository earning a concentrated wave of real developer stars in 6–12 hours can outrank a massive legacy repo gaining the same number of stars passively.
2. **Synchronized Organic Bursts > Slow Trickles:** Posting on Reddit on Monday, Hacker News on Thursday, and Dev.to the following week spreads your conversions across separate 24-hour windows and rarely triggers Trending. Concentrating authentic distribution into a **single coordinated Launch Day window** compounds referral traffic, GitHub feed visibility ("X starred annoris/aetheris"), and secondary discovery.
3. **Conversion Rate on the README Is the Multiplier:** Traffic alone does not create stars. Developers decide within **5–10 seconds** whether to star a repo based on:
   - Immediate visual proof above the fold (Live Demo link + product GIF)
   - Clear architectural differentiation (local-first `127.0.0.1:4820`, zero Docker, zero telemetry)
   - Frictionless trial (`https://annoris.github.io/aetheris/` in 1 click, or `npm start` in 3 seconds)
4. **Zero Gaming Rule:** Never buy stars, use engagement pods, or fabricate star/user counts. GitHub's anti-abuse systems filter anomalous accounts from Trending calculations and can shadow-suppress the repository.

---

## 2. Day-by-Day 7-Day Launch Schedule

### Day 0 (Pre-Launch Prep — 24 to 48 Hours Before Launch)
Complete every item before posting a single link:

- [ ] **GitHub Repository About Box:** Set description to:  
  `Local-first AI automation Control Plane (127.0.0.1:4820) — 77 specialized agents, 328 skills, 99 commands, Live Playground (Ollama/Anthropic/OpenAI), zero Docker.`
- [ ] **Website Field:** Set to `https://annoris.github.io/aetheris/`
- [ ] **Repository Topics:** Add `ai-agents`, `local-first`, `ollama`, `llm`, `prompt-engineering`, `developer-tools`, `mcp`, `self-hosted`, `nodejs`, `automation`
- [ ] **Social Preview Image:** Upload a crisp 1280x640 preview image in **Settings → General → Social preview** so links on X, Reddit, and Slack render cleanly.
- [ ] **Clean-Clone Smoke Test:** Run a fresh `git clone https://github.com/annoris/aetheris.git && cd aetheris && npm start` and verify `http://127.0.0.1:4820` loads cleanly with zero errors.
- [ ] **Live Demo Verification:** Open `https://annoris.github.io/aetheris/` in an incognito window on desktop and mobile; verify `⌘K`, tabs, Playground Dry-Run, and SOL modal.
- [ ] **CI Validation Check:** Confirm `node scripts/ci/validate-agents.js` exits `0` (`Validated 77 agent files`).
- [ ] **Create a GitHub Release (`v4.0.0`):** Tag the launch commit with concise release notes and a link to the Live Demo.

---

### Day 1 — Launch Day (Tuesday or Wednesday, Starting 08:30 EST)

> **Why Tuesday or Wednesday at 08:30 EST?** US East Coast developers are starting their workday, Europe is mid-afternoon, and US West Coast joins 3 hours later — maximizing sustained 24-hour velocity without weekend traffic drops.

| Time (EST) | Channel | Angle / Focus | Action |
|---|---|---|---|
| **08:30** | **Hacker News (`Show HN`)** | Local-first architecture, zero Docker, transparent markdown/JSON disk assets, offline Dry-Run | Submit link to `https://github.com/annoris/aetheris` and immediately post the Founder First Comment (template below). |
| **09:00** | **X / Twitter** | Visual hook with `assets/aetheris-demo.gif` + Live Demo link | Post 1-tweet demo + 3-tweet technical thread. Reply with repo & demo links. |
| **09:30** | **r/LocalLLaMA** | Local Ollama (`127.0.0.1:11434`) Playground + offline Dry-Run token inspector + zero telemetry | Post text+demo walkthrough tailored to local LLM builders. |
| **10:30** | **r/selfhosted** | Zero-Docker Node.js Control Plane on `127.0.0.1:4820`, plain files on disk, full ownership | Post self-hosted comparison & setup guide (no marketing fluff). |
| **11:30** | **r/SideProject** | Builder story + interactive GitHub Pages preview (`https://annoris.github.io/aetheris/`) | Post honest breakdown of Public Preview vs. Full Licensed Repo (SOL). |
| **13:00** | **r/webdev** | Fast local Control Plane UI, `⌘K` Command Palette, 60 FPS 3D companion avatar, keyboard-first UX | Share technical UX & Node.js local server architecture. |
| **14:30** | **Dev.to** | Deep-dive tutorial with Mermaid diagram and panel screenshots | Publish technical article linking to both the Live Demo and GitHub repo. |

**Launch Day Golden Rule:** Stay online for **4+ hours after 08:30 EST**. Reply to every technical question honestly, admit trade-offs openly (including the Public Preview vs. Full SOL repo split), and fix any valid bug reports immediately.

---

### Days 2–7 — Follow-Up Waves & Community Reply Strategy

- **Day 2 (Momentum & Fast Iteration):**
  - Answer all overnight comments on HN, Reddit, Dev.to, and GitHub Issues.
  - Ship a real `v4.0.1` polish commit addressing the #1 piece of developer feedback from Day 1 (e.g., keyboard shortcut tweak, Ollama detection improvement, or docs clarification).
  - Post a short reply on your Day 1 X thread showing what you shipped based on community feedback.

- **Day 3 (Workflow Deep-Dive Wave):**
  - Record a 45-second screen capture showing: pick an agent → inspect tokens in **Prompt Workbench** → run in **Playground** with local **Ollama** or **Dry-Run**.
  - Share the workflow clip on X and LinkedIn targeting solo developers, AI agencies, and SMB operators.
  - Share in relevant Discord/Slack developer communities **only** inside designated `#show-and-tell` or `#showcase` channels.

- **Day 4 (Bundle Builder & Agency Use Case):**
  - Publish a short visual walkthrough on X/LinkedIn explaining how **Bundle Builder** packages custom Agents + Skills + Rule Sets into a single portable `.aetheris.json` file for client handoffs (clinics, e-commerce, agencies, engineering repos).
  - Link directly to `https://annoris.github.io/aetheris/` so readers can click through the Bundle Builder without installing anything.

- **Day 5 (Open-Source Contribution & Release Wave):**
  - Open 2–3 well-scoped `good first issue` tickets on `annoris/aetheris` (e.g., additional Dry-Run test fixtures, UI accessibility improvements, or documentation enhancements).
  - Tag `v4.0.2` if meaningful improvements landed; active commits and releases keep returning visitors engaged.

- **Day 6 (Weekend Technical Essay):**
  - Cross-post a refined technical article to Hashnode / Medium (with canonical URL pointing to Dev.to): *"Why We Built a Zero-Docker Local AI Control Plane on `127.0.0.1:4820` Instead of Another Cloud Dashboard."*

- **Day 7 (Honest Launch-Week Retrospective):**
  - Write a candid recap thread on X and a short GitHub Discussion summarizing real community questions, shipped fixes, and what is coming in `v4.1` (side-by-side Playground prompt diffing, preset chains, and `.aetheris.json` import validation). Never inflate numbers — report only real, verifiable learnings.

---

## 3. Ready-to-Paste Community Post Templates

> **Important:** Always read each subreddit's current sidebar rules before posting (e.g., flair requirements, self-promotion ratio, or "Showoff Saturday" schedules). Never post identical copy across communities.

### A. Hacker News (`Show HN`)

- **URL:** `https://github.com/annoris/aetheris`
- **Title:** `Show HN: Aetheris – Local-first AI agent Control Plane (127.0.0.1:4820), zero Docker`

**Founder First Comment (post within 60 seconds of submitting):**
> Hi HN, I built Aetheris because I was tired of managing system prompts, workflow skills, and rule sets across scattered markdown folders and paid cloud dashboards.
>
> Aetheris runs locally on `http://127.0.0.1:4820` with Node.js >= 18, zero Docker, and zero telemetry. It organizes 77 specialized agents, 328 workflow skills, 99 slash commands, and 22 rule sets as plain markdown/JSON files on disk, paired with:
> - A **Prompt Workbench** with live token/line/character counts and schema validation (`validate-agents.js`)
> - A built-in **Live Playground** that auto-detects local Ollama (`127.0.0.1:11434`), Anthropic, or OpenAI, plus an offline deterministic Dry-Run Inspector
> - A **1-Click Bundle Builder** that packages selected agents, skills, and rules into a portable `.aetheris.json` file
>
> You can click through the static interactive preview in the browser here without installing anything: https://annoris.github.io/aetheris/
>
> **Transparency note on licensing:** `aetheris` is a public preview edition — the full local UI, 3D companion, navigation, and preview snippets work locally, while untruncated prompts, disk CRUD saves, and `.aetheris.json` exports are gated (`HTTP 402`) and unlocked via the full private repository (`aetheris-pro`).
>
> I'd appreciate technical feedback on the local-first architecture, the Ollama/Dry-Run Playground flow, and what you'd want in a local prompt/agent Control Plane.

---

### B. `r/LocalLLaMA`

- **Title:** `I built a local-first AI agent Control Plane (127.0.0.1:4820) with built-in Ollama Playground and offline Dry-Run token inspector`
- **Body:**
> If you run local models with Ollama and keep dozens of system prompts scattered across folders, you might find this useful.
>
> I built **Aetheris v4.0**, a zero-Docker, zero-telemetry Node.js Control Plane that runs on `http://127.0.0.1:4820` and treats your local repository as the source of truth for **77 specialized agents, 328 skills, 99 commands, and 22 rule sets**.
>
> **Why it fits a local-LLM workflow:**
> - **Auto-detects local Ollama (`127.0.0.1:11434`)** directly inside the built-in Playground (also supports Anthropic & OpenAI if you want to compare outputs).
> - **Offline Dry-Run Inspector:** Test prompt assembly, context injection, and token/character budgets completely offline before spending compute or API credits.
> - **Keyboard-first UX:** `⌘K` Command Palette, `1`–`7` tab switching, pin favorites to the sidebar, and 1-click prompt copy.
> - **Zero cloud lock-in:** Plain Markdown & JSON on disk with schema validation (`node scripts/ci/validate-agents.js`).
>
> - **Live Interactive Demo (no install):** https://annoris.github.io/aetheris/
> - **GitHub Repo (`aetheris`):** https://github.com/annoris/aetheris
>
> *(Full disclosure: the public repo is a Public Preview edition with redacted full prompts and gated exports/CRUD; the full untruncated catalog lives in the licensed private repo. Happy to answer any technical questions on the local Ollama bridge and Dry-Run inspector!)*

---

### C. `r/selfhosted`

- **Title:** `Aetheris v4.0 – Self-hosted, zero-Docker AI agent & prompt Control Plane on 127.0.0.1:4820`
- **Body:**
> Most AI workflow dashboards force you into a cloud SaaS account or a heavy multi-container Docker stack. I wanted something that launches in 3 seconds with just `Node.js >= 18`, makes zero external requests by default, and stores everything as readable files on disk.
>
> **Aetheris v4.0** gives you a local Control Plane on `http://127.0.0.1:4820`:
> - `git clone https://github.com/annoris/aetheris.git && cd aetheris && npm start`
> - Browse and search 77 specialized agents, 328 workflow skills, 99 commands, and 22 rule sets
> - Live Playground connecting to your local Ollama instance (`127.0.0.1:11434`), OpenAI, Anthropic, or an offline Dry-Run Inspector
> - 1-Click `.aetheris.json` Bundle Builder for packaging custom stacks
>
> **Try the static interactive preview:** https://annoris.github.io/aetheris/  
> **GitHub Repository:** https://github.com/annoris/aetheris
>
> Note: This public repo is the Preview Edition (UI, local server, and Dry-Run preview included; full untruncated prompts and write/export endpoints are in the licensed full repo). Feedback on the local-first setup and self-hosting ergonomics is welcome!

---

### D. `r/SideProject`

- **Title:** `I built a local-first AI Automation Control Plane (77 agents, 328 skills, Live Playground) — try the interactive demo in your browser`
- **Body:**
> Over the past few months I built **Aetheris v4.0** to solve a problem I kept running into while building automations for agencies and small businesses: prompts and agent specs end up scattered across Notion, Slack, and random repos with no fast way to test or package them.
>
> **What it does:**
> - Runs locally on `http://127.0.0.1:4820` via `npm start` (zero Docker, zero telemetry)
> - Organizes 77 agents, 328 skills, 99 commands, and 22 rule sets with `⌘K` search and favorites
> - Includes a **Prompt Workbench** (live token/line/char counts), a **Live Playground** (Ollama, Anthropic, OpenAI, Dry-Run), and a **1-Click `.aetheris.json` Bundle Builder**
> - Features a lightweight 60 FPS 3D-shaded companion avatar in the hero panel
>
> You can test the interactive UI right now on GitHub Pages without cloning anything:  
> **Live Demo:** https://annoris.github.io/aetheris/  
> **GitHub:** https://github.com/annoris/aetheris
>
> I'm using a dual-edition model: the public repo lets anyone run the full Control Plane locally in Preview Mode, and contributors can unlock the full private repo (`aetheris-pro`) with untruncated prompts, disk CRUD, and bundle exports. Would love your honest critique on the UX and positioning!

---

### E. `r/webdev`

- **Title:** `Built a zero-Docker local Node.js Control Plane (127.0.0.1:4820) with ⌘K palette, keyboard navigation, and a 60 FPS 3D companion avatar`
- **Body:**
> Wanted to share a local developer tool I built with Node.js >= 18 that skips heavy frameworks and Docker entirely so it starts in under a second on `http://127.0.0.1:4820`.
>
> **Aetheris v4.0** is a local-first Control Plane for managing and testing 77 AI agents, 328 workflow skills, 99 commands, and 22 rule sets directly from disk:
> - **Fast local UI:** `⌘K` Command Palette, `1`–`7` numeric tab jumps, `?` shortcut overlay, and pinned favorites
> - **Interactive 60 FPS 3D-shaded companion avatar:** cursor parallax tracking and action reactions without bloating the bundle
> - **Prompt Workbench & Live Playground:** live token/line/char inspection + auto-detection for local Ollama (`127.0.0.1:11434`), Anthropic, OpenAI, or an offline Dry-Run mode
> - **Bundle Builder:** select agents/skills/rules and export a portable `.aetheris.json` manifest
>
> **Interactive Browser Demo:** https://annoris.github.io/aetheris/  
> **Source (Public Preview):** https://github.com/annoris/aetheris
>
> Curious what other web devs think about building fast, local-first `127.0.0.1` developer UIs vs. shipping everything as a cloud SaaS app.

---

### F. X / Twitter Launch Thread

**Tweet 1 (Attach `./assets/aetheris-demo.gif`):**
> Stop hunting for AI prompts across Notion docs and paying monthly for locked cloud dashboards.
>
> Introducing **Aetheris v4.0** — a local-first AI Automation Control Plane that runs on `http://127.0.0.1:4820` in 3 seconds.
>
> - 77 specialized agents + 328 skills
> - Built-in Ollama / Anthropic / OpenAI / Dry-Run Playground
> - 1-click `.aetheris.json` client bundles
> - Zero Docker. Zero telemetry.
>
> Try the live interactive demo 👇

**Tweet 2 (Links + Quick Start):**
> Live Interactive Demo (no install): https://annoris.github.io/aetheris/
>
> GitHub Repository: https://github.com/annoris/aetheris
>
> Run locally in 3 seconds:
> ```
> git clone https://github.com/annoris/aetheris.git
> cd aetheris
> npm start
> ```

**Tweet 3 (Developer UX highlight — attach `./assets/screenshots/04-agent-playground.png`):**
> Every agent, skill, command, and rule set lives as plain Markdown/JSON on your own disk.
>
> Open the Prompt Workbench to check live token budgets, test directly against local Ollama (`127.0.0.1:11434`) or offline Dry-Run, and package client stacks in 1 click.

---

### G. Dev.to Article Template

- **Title:** `Aetheris v4.0: Building a Zero-Docker, Local-First AI Agent Control Plane on 127.0.0.1:4820`
- **Tags:** `ai`, `opensource`, `nodejs`, `webdev`
- **Opening Hook & Structure:**
  1. **The Problem:** Prompt sprawl across repos, Notion pages, and recurring cloud SaaS lock-in.
  2. **The Local-First Architecture:** Embed the Mermaid diagram from `README.md` showing Disk Assets (`77 Agents`, `328 Skills`, `99 Commands`, `22 Rules`, `MCP/Hooks`) → Local Control Plane (`127.0.0.1:4820`) → Prompt Workbench / Bundle Builder / Live Playground (`Ollama`, `Anthropic`, `OpenAI`, `Dry-Run`).
  3. **Panel-by-Panel Walkthrough:** Include `./assets/aetheris-demo.gif` and 2–3 key screenshots (`02-agents-grid.png`, `04-agent-playground.png`, `05-bundle-builder.png`).
  4. **Try It Now:** Link to both `https://annoris.github.io/aetheris/` and `https://github.com/annoris/aetheris` with the 3-line Quick Start.

---

## 4. Community Reply Principles (Maximize Star Conversion)

1. **Lead with engineering honesty:** If someone asks about the Public Preview vs. Full Licensed (`SOL`) split, answer directly and link to `LICENSING.md` — developers respect transparency and reject evasive marketing.
2. **Turn feedback into commits:** When a commenter spots an edge case or UX improvement, open an issue or push a fix the same day and reply with the commit link.
3. **Never ask for stars explicitly on HN or Reddit:** Asking for upvotes or stars violates community norms and hurts trust. Let the Live Demo (`https://annoris.github.io/aetheris/`) and the 3-second local setup earn the star organically.
