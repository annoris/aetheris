'use strict';

const { DEFAULT_PORT, PLATFORM_VERSION } = require('./lib');

const LANG = {
  en: {
    name: 'English',
    brand: 'Aetheris',
    workspace: 'AI Platform',
    heroTitle: 'Frictionless business automation.',
    heroSub: 'Orchestrate autonomous agents, 24/7 customer support, lead qualification, appointment booking, and sales workflows for modern businesses.',
    ctaPrimary: 'Explore agents',
    ctaSecondary: 'Live activity',
    search: 'Search Aetheris...',
    agents: 'Agents',
    skills: 'Skills',
    commands: 'Commands',
    rules: 'Rules',
    mcps: 'Connectors',
    hooks: 'Flows',
    activity: 'Activity',
    live: 'Live',
    all: 'All',
    designBrand: 'Design',
    reviewers: 'Reviewers',
    architects: 'Architects',
    buildResolvers: 'Build',
    security: 'Security',
    testing: 'Testing',
    patterns: 'Patterns',
    research: 'Research',
    data: 'Data',
    agent: 'Agents',
    devops: 'DevOps',
    description: 'Overview',
    details: 'Documentation',
    tools: 'Tools',
    copied: 'Copied',
    noMcps: 'No connectors configured',
    noHooks: 'No flows configured',
    recentlyViewed: 'Recent',
    clearHistory: 'Clear',
    ruleFiles: 'files',
    more: 'more',
    servers: 'servers',
    skill: 'Skill Module',
    event: 'Event',
    matcher: 'Matcher',
    id: 'Identifier',
    systemOnline: 'System online',
    navMain: 'Platform',
    navOps: 'Operations',
  },
};

const LANG_KEYS = Object.keys(LANG);

const MODERN_SVG_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="16" fill="#09090B"/>
  <path d="M32 13L50 49H41.8L32 29.2L22.2 49H14L32 13Z" fill="#FAFAFA"/>
  <path d="M26 42L38 42L35 48H29L26 42Z" fill="#6366F1"/>
</svg>`;

function renderHTML(data, { port = DEFAULT_PORT, edition = 'full' } = {}) {
  const ag = JSON.stringify(data.agents || []).replace(/</g, '\\u003c');
  const sk = JSON.stringify(data.skills || []).replace(/</g, '\\u003c');
  const co = JSON.stringify(data.commands || []).replace(/</g, '\\u003c');
  const ru = JSON.stringify(data.rules || []).replace(/</g, '\\u003c');
  const mc = JSON.stringify(data.mcps || []).replace(/</g, '\\u003c');
  const ho = JSON.stringify(data.hooks || []).replace(/</g, '\\u003c');
  const ll = JSON.stringify(LANG).replace(/</g, '\\u003c');
  const lc = JSON.stringify(LANG_KEYS);
  const ed = JSON.stringify(edition);

  /* eslint-disable no-useless-escape */
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aetheris — AI Automation Platform</title>
<style>
  :root {
    --bg: #09090B;
    --bg-subtle: #0D0D10;
    --surface: #111114;
    --surface-hover: #17171C;
    --surface-elevated: #18181D;
    --border: rgba(255, 255, 255, 0.075);
    --border-hover: rgba(255, 255, 255, 0.16);
    --text: #FAFAFA;
    --text-2: #A1A1AA;
    --text-3: #63636E;
    --accent: #6366F1;
    --accent-soft: rgba(99, 102, 241, 0.14);
    --emerald: #10B981;
    --emerald-soft: rgba(16, 185, 129, 0.12);
    --violet: #A78BFA;
    --sky: #38BDF8;
    --btn-primary-bg: #FAFAFA;
    --btn-primary-text: #09090B;
    --radius-lg: 16px;
    --radius-md: 12px;
    --radius-sm: 8px;
    --font: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    --shadow-modal: 0 24px 80px rgba(0, 0, 0, 0.72);
  }
  [data-theme="light"] {
    --bg: #FAFAFA;
    --bg-subtle: #F4F4F5;
    --surface: #FFFFFF;
    --surface-hover: #F8F8FA;
    --surface-elevated: #FFFFFF;
    --border: rgba(9, 9, 11, 0.08);
    --border-hover: rgba(9, 9, 11, 0.18);
    --text: #09090B;
    --text-2: #52525B;
    --text-3: #A1A1AA;
    --accent: #4F46E5;
    --accent-soft: rgba(79, 70, 229, 0.10);
    --emerald: #059669;
    --emerald-soft: rgba(5, 150, 105, 0.10);
    --violet: #7C3AED;
    --sky: #0284C7;
    --btn-primary-bg: #09090B;
    --btn-primary-text: #FAFAFA;
    --shadow-modal: 0 24px 70px rgba(9, 9, 11, 0.14);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }

  ::selection { background: var(--accent); color: #fff; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 999px; }

  .layout {
    display: grid;
    grid-template-columns: 248px minmax(0, 1fr);
    min-height: 100vh;
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    background: var(--bg-subtle);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 18px 14px;
    gap: 18px;
    overflow-y: auto;
  }
  .brand-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px;
    cursor: pointer;
    user-select: none;
  }
  .brand-left { display: flex; align-items: center; gap: 10px; }
  .brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border-hover);
    flex-shrink: 0;
    background: #09090B;
  }
  .brand-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .brand-title { font-size: 14.5px; font-weight: 600; letter-spacing: -0.02em; color: var(--text); }
  .brand-ver {
    font-size: 10.5px;
    font-family: var(--mono);
    color: var(--text-3);
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid var(--border);
  }

  .cmd-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 9px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-2);
    font-size: 12.5px;
    font-family: var(--font);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .cmd-trigger:hover { border-color: var(--border-hover); color: var(--text); }
  .cmd-trigger-left { display: flex; align-items: center; gap: 8px; }
  .cmd-trigger svg { width: 14px; height: 14px; color: var(--text-3); }
  .kbd {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-3);
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    padding: 1px 5px;
    border-radius: 5px;
  }

  .nav-group { display: flex; flex-direction: column; gap: 2px; }
  .nav-label {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-3);
    padding: 6px 10px 6px;
  }
  .nav-it {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-2);
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .nav-it-l { display: flex; align-items: center; gap: 9px; }
  .nav-it svg { width: 15px; height: 15px; opacity: 0.72; flex-shrink: 0; }
  .nav-it:hover { background: var(--surface); color: var(--text); }
  .nav-it.active {
    background: var(--surface-elevated);
    color: var(--text);
    border-color: var(--border);
  }
  .nav-it.active svg { opacity: 1; color: var(--text); }
  .nav-it .ct {
    font-size: 11px;
    font-family: var(--mono);
    font-variant-numeric: tabular-nums;
    color: var(--text-3);
  }
  .nav-it.active .ct { color: var(--text-2); }
  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
    font-weight: 600;
    color: var(--emerald);
  }
  .dot-live {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--emerald);
    box-shadow: 0 0 8px var(--emerald);
  }

  .sidebar-footer {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .status-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11.5px;
    color: var(--text-2);
    padding: 0 4px;
  }
  .status-line-l { display: flex; align-items: center; gap: 7px; }
  .sidebar-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .mini-btn {
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-2);
    font-size: 11.5px;
    font-weight: 500;
    font-family: var(--font);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.14s;
  }
  .mini-btn:hover { border-color: var(--border-hover); color: var(--text); }
  .mini-btn svg { width: 13px; height: 13px; }

  .canvas {
    position: relative;
    min-width: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  [data-theme="light"] .canvas {
    background-image: radial-gradient(rgba(9, 9, 11, 0.05) 1px, transparent 1px);
  }
  .canvas-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 380px;
    background:
      radial-gradient(ellipse 60% 95% at 45% -15%, rgba(99, 102, 241, 0.16), transparent 70%),
      radial-gradient(ellipse 45% 75% at 75% -10%, rgba(56, 189, 248, 0.10), transparent 68%);
    pointer-events: none;
    animation: ambientDrift 12s ease-in-out infinite alternate;
  }
  @keyframes ambientDrift {
    0% { opacity: 0.78; transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 1; transform: translate3d(1.5%, 6px, 0) scale(1.03); }
  }
  @keyframes pulseRing {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
    70% { box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  @keyframes cardRise {
    from { opacity: 0; transform: translateY(10px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes modalPop {
    from { opacity: 0; transform: translateY(-10px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmerBorder {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  .dot-live {
    animation: pulseRing 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }
  .bento-hero {
    position: relative;
    overflow: hidden;
    animation: cardRise 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .bento-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.65), rgba(56, 189, 248, 0.55), transparent);
    background-size: 200% 100%;
    animation: shimmerBorder 6s linear infinite;
  }
  .kpi {
    animation: cardRise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
  }
  .kpi:nth-child(1) { animation-delay: 0.03s; }
  .kpi:nth-child(2) { animation-delay: 0.06s; }
  .kpi:nth-child(3) { animation-delay: 0.09s; }
  .kpi:nth-child(4) { animation-delay: 0.12s; }
  .kpi:nth-child(5) { animation-delay: 0.15s; }
  .kpi:nth-child(6) { animation-delay: 0.18s; }
  .kpi:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px -12px rgba(99, 102, 241, 0.28);
  }
  .card {
    position: relative;
    overflow: hidden;
    animation: cardRise 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
  }
  .card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), rgba(99, 102, 241, 0.11), transparent 65%);
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
  .card:hover::after { opacity: 1; }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px -14px rgba(0, 0, 0, 0.55);
  }
  .modal-backdrop.show .cmd-modal {
    animation: modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .btn-primary, .btn-ghost, .nav-it {
    transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .btn-primary:active, .btn-ghost:active { transform: scale(0.97); }
  /* Productivity: Pinned Favorites, Quick Actions, Workbench, Skeletons */
  .pin-list { display: flex; flex-direction: column; gap: 2px; }
  .pin-row {
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    padding: 6px 10px; border-radius: 7px; font-size: 12.5px; color: var(--text-2);
    cursor: pointer; transition: background 0.14s, color 0.14s;
  }
  .pin-row:hover { background: var(--surface); color: var(--text); }
  .pin-row-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pin-row-type { font-family: var(--mono); font-size: 10px; color: var(--text-3); }
  .card-actions {
    display: flex; align-items: center; gap: 4px; opacity: 0.72;
    transition: opacity 0.16s ease;
  }
  .card:hover .card-actions { opacity: 1; }
  .ic-action {
    width: 26px; height: 26px; border-radius: 7px;
    border: 1px solid var(--border); background: var(--bg-subtle);
    color: var(--text-3); cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ic-action svg { width: 13px; height: 13px; pointer-events: none; }
  .ic-action:hover { border-color: var(--border-hover); color: var(--text); transform: scale(1.08); }
  .ic-action.pinned { color: #F59E0B; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); }
  .ic-action.pop { animation: starPop 0.32s cubic-bezier(0.16, 1, 0.3, 1); }
  .ic-action.done { color: var(--emerald); border-color: var(--emerald); background: var(--emerald-soft); }
  @keyframes starPop {
    0% { transform: scale(1); }
    45% { transform: scale(1.32) rotate(-10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  .workbench-bar {
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    padding: 12px 16px; border-radius: 11px;
    background: var(--bg-subtle); border: 1px solid var(--border); margin-top: 18px;
  }
  .wb-stats { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 11.5px; color: var(--text-2); }
  .wb-stat strong { color: var(--text); font-weight: 600; }
  .wb-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .wb-panel {
    margin-top: 14px; padding: 16px 18px; border-radius: 12px;
    background: var(--bg-subtle); border: 1px solid var(--border-hover);
    display: none; flex-direction: column; gap: 12px;
    animation: cardRise 0.24s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .wb-panel.open { display: flex; }
  .wb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .wb-field label { display: block; font-size: 11px; font-weight: 600; color: var(--text-2); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
  .wb-field input, .wb-field textarea {
    width: 100%; padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--surface);
    color: var(--text); font-size: 13px; font-family: var(--font); outline: none;
    transition: border-color 0.14s;
  }
  .wb-field input:focus, .wb-field textarea:focus { border-color: var(--accent); }
  .skeleton {
    height: 140px; border-radius: 10px;
    background: linear-gradient(90deg, var(--bg-subtle) 25%, var(--surface-hover) 50%, var(--bg-subtle) 75%);
    background-size: 200% 100%; animation: shimmerBorder 1.4s infinite linear;
  }
  .shortcut-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 14px 16px 18px; }
  .sc-item {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 8px 10px; border-radius: 8px; background: var(--bg-subtle); border: 1px solid var(--border);
    font-size: 12.5px; color: var(--text-2);
  }
  /* Real 60FPS Articulated 3D Canvas Mascot */
  .bento-hero-grid { display: grid; grid-template-columns: 1fr 240px; gap: 20px; align-items: center; }
  .avatar-stage {
    position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; padding: 14px 12px 12px; border-radius: 16px;
    background: radial-gradient(circle at 50% 42%, rgba(99, 102, 241, 0.2), rgba(14, 14, 18, 0.98) 74%);
    border: 1px solid var(--border-hover); cursor: grab; user-select: none; touch-action: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .avatar-stage:active { cursor: grabbing; }
  .avatar-stage:hover { border-color: rgba(99, 102, 241, 0.6); box-shadow: 0 14px 36px -12px rgba(99, 102, 241, 0.4); }
  .speech-bubble {
    position: relative;
    background: var(--surface-elevated);
    border: 1px solid rgba(99, 102, 241, 0.45);
    color: var(--text);
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    white-space: nowrap;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
  }
  .speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--surface-elevated);
    border-right: 1px solid rgba(99, 102, 241, 0.45);
    border-bottom: 1px solid rgba(99, 102, 241, 0.45);
  }
  .mascot-canvas { width: 176px; height: 176px; display: block; pointer-events: none; }
  .avatar-btns { display: flex; gap: 5px; }
  .av-btn {
    padding: 4px 9px; border-radius: 7px; border: 1px solid var(--border);
    background: var(--bg-subtle); color: var(--text-2); font-size: 11px; font-weight: 600;
    font-family: var(--font); cursor: pointer; transition: all 0.14s;
  }
  .av-btn:hover { border-color: var(--accent); color: var(--text); background: var(--accent-soft); }
  /* Toggle Switch */
  .switch {
    position: relative; display: inline-flex; width: 34px; height: 19px; flex-shrink: 0;
  }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider {
    position: absolute; cursor: pointer; inset: 0; border-radius: 999px;
    background: var(--bg-subtle); border: 1px solid var(--border-hover);
    transition: background 0.18s, border-color 0.18s;
  }
  .slider::before {
    content: ''; position: absolute; height: 13px; width: 13px; left: 2px; top: 2px;
    border-radius: 50%; background: var(--text-2);
    transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background 0.18s;
  }
  .switch input:checked + .slider { background: var(--emerald-soft); border-color: var(--emerald); }
  .switch input:checked + .slider::before { transform: translateX(15px); background: var(--emerald); }
  /* Playground & Bundle Builder */
  .pg-shell { display: grid; grid-template-columns: 290px 1fr; gap: 14px; }
  .pg-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-md); padding: 18px; display: flex; flex-direction: column; gap: 12px;
  }
  .pg-chat { min-height: 430px; display: flex; flex-direction: column; }
  .pg-messages { flex: 1; overflow-y: auto; max-height: 420px; display: flex; flex-direction: column; gap: 10px; padding-bottom: 12px; }
  .msg {
    padding: 12px 14px; border-radius: 11px; font-size: 13px; line-height: 1.6;
    white-space: pre-wrap; word-break: break-word; animation: cardRise 0.2s ease both;
  }
  .msg.user { background: var(--accent-soft); border: 1px solid rgba(99, 102, 241, 0.3); align-self: flex-end; max-width: 82%; }
  .msg.bot { background: var(--bg-subtle); border: 1px solid var(--border); align-self: flex-start; max-width: 92%; font-family: var(--mono); font-size: 12px; }
  .pg-input-row { display: flex; gap: 8px; padding-top: 10px; border-top: 1px solid var(--border); }
  .pg-input-row input, .pg-card select, .pg-card input:not([type="checkbox"]), .pg-card textarea {
    width: 100%; padding: 9px 11px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--bg-subtle);
    color: var(--text); font-size: 13px; font-family: var(--font); outline: none;
  }
  .bundle-chk input[type="checkbox"] { width: 15px; height: 15px; flex-shrink: 0; accent-color: var(--accent); }
  .pg-input-row input:focus, .pg-card select:focus, .pg-card input:focus, .pg-card textarea:focus { border-color: var(--accent); }
  .bundle-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
  .bundle-list { max-height: 360px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
  .bundle-chk {
    display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 7px;
    font-size: 12.5px; color: var(--text-2); cursor: pointer; transition: background 0.12s;
  }
  .bundle-chk:hover { background: var(--bg-subtle); color: var(--text); }
  .btn-danger {
    padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(244, 63, 94, 0.35);
    background: rgba(244, 63, 94, 0.1); color: #FB7185; font-size: 12px; font-weight: 600;
    font-family: var(--font); cursor: pointer;
  }
  .btn-danger:hover { background: rgba(244, 63, 94, 0.2); }
  .edit-area {
    width: 100%; min-height: 320px; padding: 14px; border-radius: 10px;
    border: 1px solid var(--accent); background: var(--bg-subtle); color: var(--text);
    font-family: var(--mono); font-size: 12.5px; line-height: 1.6; outline: none; resize: vertical;
  }
  @media (max-width: 900px) {
    .bento-hero-grid, .pg-shell, .bundle-cols { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) { .wb-grid, .shortcut-grid { grid-template-columns: 1fr; } }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }
  .canvas-inner {
    position: relative;
    z-index: 1;
    max-width: 1240px;
    margin: 0 auto;
    padding: 32px 36px 64px;
  }

  .bento {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 14px;
    margin-bottom: 28px;
  }
  .bento-hero {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 500;
    color: var(--text-2);
    margin-bottom: 10px;
  }
  .eyebrow-pill {
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--accent);
    background: var(--accent-soft);
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 600;
  }
  .bento-hero h1 {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.035em;
    line-height: 1.15;
    color: var(--text);
    margin-bottom: 10px;
  }
  .bento-hero p {
    font-size: 14px;
    color: var(--text-2);
    max-width: 520px;
    line-height: 1.6;
  }
  .hero-cta-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .btn-primary {
    height: 38px;
    padding: 0 16px;
    border-radius: 9px;
    border: none;
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: opacity 0.14s, transform 0.14s;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-ghost {
    height: 38px;
    padding: 0 15px;
    border-radius: 9px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: border-color 0.14s, background 0.14s;
  }
  .btn-ghost:hover { border-color: var(--border-hover); background: var(--surface-hover); }

  .bento-kpis {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 16px 18px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 14px;
    transition: border-color 0.15s, background 0.15s, transform 0.15s;
  }
  .kpi:hover { border-color: var(--border-hover); background: var(--surface-hover); transform: translateY(-1px); }
  .kpi-lbl {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .kpi-lbl svg { width: 14px; height: 14px; color: var(--text-3); }
  .kpi-val {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: var(--text);
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .filters {
    display: inline-flex;
    gap: 4px;
    flex-wrap: wrap;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    padding: 4px;
    border-radius: 10px;
  }
  .filters button {
    font-size: 12.5px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 7px;
    border: none;
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition: all 0.13s;
    font-family: var(--font);
  }
  .filters button:hover { color: var(--text); }
  .filters button.active {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    font-weight: 600;
  }

  .inline-search {
    position: relative;
    width: 240px;
  }
  .inline-search svg {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    color: var(--text-3);
    pointer-events: none;
  }
  .inline-search input {
    width: 100%;
    height: 36px;
    padding: 0 12px 0 32px;
    border-radius: 9px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 12.5px;
    font-family: var(--font);
    outline: none;
    transition: border-color 0.14s;
  }
  .inline-search input:focus { border-color: var(--border-hover); }
  .inline-search input::placeholder { color: var(--text-3); }

  .panel { display: none; animation: fadeIn 0.16s ease; }
  .panel.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 18px 20px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.15s;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .card:hover {
    border-color: var(--border-hover);
    background: var(--surface-hover);
    transform: translateY(-1px);
  }
  .card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .card-title-wrap { display: flex; align-items: center; gap: 9px; min-width: 0; }
  .card-ic {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-2);
    flex-shrink: 0;
  }
  .card-ic svg { width: 14px; height: 14px; }
  .card:hover .card-ic { color: var(--text); border-color: var(--border-hover); }
  .nm {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .model-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--mono);
    font-size: 10.5px;
    font-weight: 500;
    color: var(--text-2);
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    flex-shrink: 0;
  }
  .m-dot { width: 6px; height: 6px; border-radius: 50%; }
  .m-dot.opus { background: var(--violet); }
  .m-dot.sonnet { background: var(--sky); }
  .m-dot.haiku { background: var(--emerald); }
  .desc {
    font-size: 13px;
    color: var(--text-2);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; padding-top: 4px; }
  .tags .t {
    font-family: var(--mono);
    font-size: 10.5px;
    padding: 2px 7px;
    border-radius: 5px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    color: var(--text-3);
  }

  .cmd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 8px; }
  .cmd-it {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.14s, background 0.14s;
  }
  .cmd-it:hover { border-color: var(--border-hover); background: var(--surface-hover); }
  .cmd-it .cl { flex: 1; min-width: 0; }
  .cmd-it .cn { font-family: var(--mono); font-size: 12.5px; font-weight: 600; color: var(--text); }
  .cmd-it .cd { font-size: 12px; color: var(--text-2); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .cmd-it .cc { font-size: 10.5px; color: var(--text-3); margin-top: 3px; }
  .cmd-it .cpy {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    color: var(--text-2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cmd-it .cpy:hover { border-color: var(--border-hover); color: var(--text); }
  .cmd-it .cpy.done { color: var(--emerald); border-color: var(--emerald); }
  .cmd-it .cpy svg { width: 13px; height: 13px; pointer-events: none; }

  .rules-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 10px; }
  .rule-cd {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 16px;
    cursor: pointer;
    transition: border-color 0.14s, background 0.14s;
  }
  .rule-cd:hover { border-color: var(--border-hover); background: var(--surface-hover); }
  .rule-cd h3 { font-size: 13.5px; font-weight: 600; text-transform: capitalize; margin-bottom: 8px; }
  .rule-cd .rf { font-size: 12px; color: var(--text-2); padding: 2px 0; font-family: var(--mono); }

  .mcp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 12px; }
  .mcp-cd {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 18px;
    cursor: pointer;
    transition: border-color 0.14s, background 0.14s;
  }
  .mcp-cd:hover { border-color: var(--border-hover); background: var(--surface-hover); }
  .mcp-cd h3 { font-size: 13.5px; font-weight: 600; margin-bottom: 10px; font-family: var(--mono); }
  .mcp-cd .st {
    display: inline-block;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 6px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    color: var(--text-2);
    margin: 2px;
    font-family: var(--mono);
  }

  .hw { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--surface); }
  .ht { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .ht th {
    text-align: left;
    font-weight: 500;
    color: var(--text-3);
    padding: 11px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--bg-subtle);
  }
  .ht td { padding: 11px 16px; border-bottom: 1px solid var(--border); cursor: pointer; color: var(--text-2); }
  .ht tr:last-child td { border-bottom: none; }
  .ht tr:hover td { background: var(--surface-hover); color: var(--text); }
  .ht .ev { color: var(--text); font-weight: 600; font-family: var(--mono); font-size: 11.5px; }
  .ht .mt { font-family: var(--mono); font-size: 11px; background: var(--bg-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 5px; }

  .act-summary-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 12px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    margin-bottom: 12px;
    font-size: 12.5px;
    color: var(--text-2);
  }
  .act-pill { padding: 2px 8px; border-radius: 999px; font-size: 11px; font-family: var(--mono); border: 1px solid var(--border); color: var(--text); }
  .act-feed { display: flex; flex-direction: column; gap: 4px; font-family: var(--mono); font-size: 12px; }
  .act-row {
    display: grid;
    grid-template-columns: 95px 100px 1fr 90px;
    gap: 12px;
    padding: 9px 14px;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    align-items: center;
  }
  .act-empty { padding: 40px 20px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text-2); font-size: 13px; }

  .page {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 32px;
    animation: fadeIn 0.16s ease;
  }
  .page .back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    color: var(--text-2);
    cursor: pointer;
    font-size: 12.5px;
    font-weight: 500;
    margin-bottom: 20px;
    font-family: var(--font);
  }
  .page .back:hover { color: var(--text); border-color: var(--border-hover); }
  .page h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.03em; margin-bottom: 6px; }
  .page .sub { font-size: 13px; color: var(--text-2); margin-bottom: 22px; display: flex; align-items: center; gap: 10px; }
  .page .sec { margin-top: 22px; }
  .page .sec h3 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); margin-bottom: 8px; }
  .page .sec p { font-size: 14px; color: var(--text-2); line-height: 1.65; }
  .page .sec .tt { display: inline-block; font-size: 11.5px; padding: 3px 9px; border-radius: 6px; background: var(--bg-subtle); border: 1px solid var(--border); color: var(--text); margin: 3px; font-family: var(--mono); }
  .page .sec-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .page .sec-head h3 { margin-bottom: 0; }
  .page .sec pre.pb { background: var(--bg-subtle); border: 1px solid var(--border); padding: 18px 20px; border-radius: 10px; font-family: var(--mono); font-size: 12.5px; line-height: 1.65; color: var(--text-2); max-height: 70vh; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }
  .page .copy-btn { padding: 7px 13px; border-radius: 8px; border: 1px solid var(--border-hover); background: var(--btn-primary-bg); color: var(--btn-primary-text); font-size: 12px; font-weight: 600; font-family: var(--font); cursor: pointer; transition: opacity 0.14s; }
  .page .copy-btn:hover { opacity: 0.88; }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.58);
    backdrop-filter: blur(8px);
    z-index: 400;
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding-top: 12vh;
  }
  .modal-backdrop.show { display: flex; }
  .cmd-modal {
    width: 100%;
    max-width: 580px;
    background: var(--surface-elevated);
    border: 1px solid var(--border-hover);
    border-radius: 14px;
    box-shadow: var(--shadow-modal);
    overflow: hidden;
    margin: 0 16px;
  }
  .cmd-modal-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
  }
  .cmd-modal-head svg { width: 16px; height: 16px; color: var(--text-3); }
  .cmd-modal-head input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 14.5px;
    font-family: var(--font);
  }
  .cmd-results { max-height: 360px; overflow-y: auto; padding: 8px; }
  .cmd-group-lbl { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); padding: 8px 10px 4px; }
  .cmd-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
  }
  .cmd-row:hover, .cmd-row.active { background: var(--surface-hover); }
  .cmd-row-name { font-weight: 500; color: var(--text); }
  .cmd-row-desc { font-size: 12px; color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 300px; }

  .toast {
    position: fixed;
    bottom: 22px;
    right: 22px;
    background: var(--surface-elevated);
    border: 1px solid var(--border-hover);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--text);
    box-shadow: var(--shadow-modal);
    z-index: 500;
    opacity: 0;
    transform: translateY(16px);
    transition: all 0.2s ease;
    pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }

  @media (max-width: 1024px) {
    .bento { grid-template-columns: 1fr; }
    .canvas-inner { padding: 24px 24px 48px; }
  }
  @media (max-width: 820px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { position: static; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
    .bento-kpis { grid-template-columns: repeat(2, 1fr); }
    .canvas-inner { padding: 20px 16px 40px; }
  }
</style>
</head>
<body>
<div class="layout">
  <aside class="sidebar">
    <div class="brand-row" onclick="location.hash=''">
      <div class="brand-left">
        <div class="brand-mark"><img src="/brand-logo.png" alt="Aetheris"></div>
        <span class="brand-title" id="t-brand">Aetheris</span>
      </div>
      <span class="brand-ver">v${PLATFORM_VERSION}</span>
    </div>

    <button class="cmd-trigger" onclick="openPalette()">
      <span class="cmd-trigger-left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/></svg>
        <span id="t-search-lbl">Search Aetheris...</span>
      </span>
      <span class="kbd">⌘K</span>
    </button>

    <div class="nav-group">
      <div class="nav-label" id="t-nav-main">Platform</div>
      <button class="nav-it active" data-tab="agents" onclick="showTab('agents',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M9 13v2"/><path d="M15 13v2"/></svg><span id="nav-agents">Agents</span></span>
        <span class="ct" id="nav-ct-agents"></span>
      </button>
      <button class="nav-it" data-tab="skills" onclick="showTab('skills',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg><span id="nav-skills">Skills</span></span>
        <span class="ct" id="nav-ct-skills"></span>
      </button>
      <button class="nav-it" data-tab="commands" onclick="showTab('commands',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg><span id="nav-commands">Commands</span></span>
        <span class="ct" id="nav-ct-commands"></span>
      </button>
    </div>

    <div class="nav-group">
      <div class="nav-label" id="t-nav-ops">Operations</div>
      <button class="nav-it" data-tab="rules" onclick="showTab('rules',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span id="nav-rules">Rules</span></span>
        <span class="ct" id="nav-ct-rules"></span>
      </button>
      <button class="nav-it" data-tab="mcps" onclick="showTab('mcps',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><path d="M6.5 10v3.5a2 2 0 0 0 2 2H14"/></svg><span id="nav-mcps">Connectors</span></span>
        <span class="ct" id="nav-ct-mcps"></span>
      </button>
      <button class="nav-it" data-tab="hooks" onclick="showTab('hooks',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg><span id="nav-hooks">Flows</span></span>
        <span class="ct" id="nav-ct-hooks"></span>
      </button>
      <button class="nav-it" data-tab="activity" onclick="showTab('activity',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span id="nav-activity">Activity</span></span>
        <span class="live-badge"><span class="dot-live"></span><span id="t-live">Live</span></span>
      </button>
    </div>

    <div class="nav-group">
      <div class="nav-label">Workspace</div>
      <button class="nav-it" data-tab="playground" onclick="showTab('playground',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="6 3 20 12 6 21 6 3"/></svg><span>Playground</span></span>
        <span class="ct">AI</span>
      </button>
      <button class="nav-it" data-tab="bundle" onclick="showTab('bundle',this)">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg><span>Bundle Builder</span></span>
        <span class="ct">ZIP</span>
      </button>
      <button class="nav-it" onclick="openLicenseModal()">
        <span class="nav-it-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span>Full License</span></span>
        <span class="ct" style="color:var(--accent)">SOL</span>
      </button>
    </div>

    <div class="nav-group" id="pins-group" style="display:none">
      <div class="nav-label">Pinned</div>
      <div class="pin-list" id="pin-list"></div>
    </div>

    <div class="sidebar-footer">
      <div class="status-line">
        <span class="status-line-l"><span class="dot-live"></span><span id="t-online">System online</span></span>
        <span style="font-family:var(--mono);font-size:10.5px;color:var(--text-3)">:${port}</span>
      </div>
      <div class="sidebar-controls">
        <button class="mini-btn" onclick="toggleTheme()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2"/></svg>
          <span>Theme</span>
        </button>
        <button class="mini-btn" onclick="openShortcuts()">
          <span class="kbd" style="border:none;padding:0;background:transparent">?</span>
          <span>Shortcuts</span>
        </button>
      </div>
    </div>
  </aside>

  <div class="canvas">
    <div class="canvas-glow"></div>
    <main class="canvas-inner" id="app"></main>
  </div>
</div>

<div class="modal-backdrop" id="palette-bg" onclick="if(event.target===this)closePalette()">
  <div class="cmd-modal">
    <div class="cmd-modal-head">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/></svg>
      <input type="text" id="palette-input" placeholder="Search agents, skills, commands..." oninput="renderPalette(this.value)" onkeydown="onPaletteKey(event)" autocomplete="off">
      <span class="kbd">ESC</span>
    </div>
    <div class="cmd-results" id="palette-results"></div>
  </div>
</div>

<div class="modal-backdrop" id="shortcuts-bg" onclick="if(event.target===this)closeShortcuts()">
  <div class="cmd-modal" style="max-width:480px">
    <div class="cmd-modal-head">
      <span style="font-size:13.5px;font-weight:600;flex:1">Keyboard Shortcuts</span>
      <span class="kbd">ESC</span>
    </div>
    <div class="shortcut-grid">
      <div class="sc-item"><span>Command Palette</span><span class="kbd">⌘K</span></div>
      <div class="sc-item"><span>Shortcuts Help</span><span class="kbd">?</span></div>
      <div class="sc-item"><span>Agents Tab</span><span class="kbd">1</span></div>
      <div class="sc-item"><span>Skills Tab</span><span class="kbd">2</span></div>
      <div class="sc-item"><span>Commands Tab</span><span class="kbd">3</span></div>
      <div class="sc-item"><span>Rules / MCP / Flows</span><span class="kbd">4-6</span></div>
      <div class="sc-item"><span>Live Activity</span><span class="kbd">7</span></div>
      <div class="sc-item"><span>Back to Dashboard</span><span class="kbd">ESC</span></div>
    </div>
  </div>
</div>

<div class="modal-backdrop" id="create-bg" onclick="if(event.target===this)closeCreateModal()">
  <div class="cmd-modal" style="max-width:600px">
    <div class="cmd-modal-head">
      <span style="font-size:14px;font-weight:600;flex:1" id="create-title">Create New Agent</span>
      <span class="kbd">ESC</span>
    </div>
    <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
      <div class="wb-grid">
        <div class="wb-field"><label>Slug Name</label><input id="cr-name" placeholder="e.g., sales-closer-expert"></div>
        <div class="wb-field" id="cr-model-wrap"><label>Model</label><select id="cr-model" style="width:100%;padding:9px 12px;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-size:13px"><option value="opus">opus</option><option value="sonnet" selected>sonnet</option><option value="haiku">haiku</option></select></div>
      </div>
      <div class="wb-field"><label>Description</label><input id="cr-desc" placeholder="Short description of what this item does..."></div>
      <div class="wb-field" id="cr-tools-wrap"><label>Tools (comma-separated)</label><input id="cr-tools" value="Read, Write, Edit, Grep, Glob"></div>
      <div class="wb-field"><label>Prompt / Instructions</label><textarea id="cr-body" rows="8" placeholder="Write the full system prompt or instructions..."></textarea></div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button class="btn-ghost" onclick="closeCreateModal()">Cancel</button>
        <button class="btn-primary" id="cr-save-btn" onclick="submitCreateItem()">Save to Disk</button>
      </div>
    </div>
  </div>
</div>

<div class="modal-backdrop" id="license-bg" onclick="if(event.target===this)closeLicenseModal()">
  <div class="cmd-modal" style="max-width:520px">
    <div class="cmd-modal-head">
      <span style="font-size:14px;font-weight:600;flex:1">Aetheris Full License — Contribute with Solana (SOL)</span>
      <span class="kbd">ESC</span>
    </div>
    <div style="padding:18px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">
      <div style="font-size:12.5px;color:var(--text-2);line-height:1.55">
        Unlock the <strong>Full Private Repository</strong>, all <strong>75 untruncated AI agents</strong>, <strong>328 complete skills</strong>, <strong>Bundle Builder exports</strong>, and commercial usage rights by contributing in <strong>SOL (Solana network)</strong>.
      </div>
      <div style="background:#FFFFFF;padding:10px;border-radius:14px;border:1px solid var(--border-hover)">
        <img src="/sol-qr.png" alt="Solana SOL Receive QR" style="width:176px;height:176px;object-fit:contain;display:block;border-radius:8px">
      </div>
      <div style="width:100%;background:var(--bg-subtle);border:1px solid var(--border);border-radius:10px;padding:10px 12px;font-family:var(--mono);font-size:11.5px;word-break:break-all;color:var(--text)">
        3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%">
        <button class="btn-primary" onclick="copy('3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm',this)">Copy SOL Address</button>
        <a class="btn-ghost" style="text-decoration:none" href="solana:3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm?label=Aetheris%20Full%20License">Open in Solana Wallet</a>
      </div>
      <div style="font-size:11px;color:var(--text-3)">
        Only send <strong>SOL</strong> on the <strong>Solana network</strong>. After contributing, share your TX signature to receive Private GitHub Repository access.
      </div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
const AGENTS = ${ag};
const SKILLS = ${sk};
const COMMANDS = ${co};
const RULES = ${ru};
const MCPS = ${mc};
const HOOKS = ${ho};
const L = ${ll};
const LANG_KEYS = ${lc};
const EDITION = ${ed};
const SOL_WALLET = '3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm';

function openLicenseModal() { document.getElementById('license-bg').classList.add('show'); }
function closeLicenseModal() { document.getElementById('license-bg').classList.remove('show'); }

let lang = 'en';
let palIdx = -1;

const ICON_BOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M9 13v2"/><path d="M15 13v2"/></svg>';
const ICON_SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>';
const ICON_TERM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>';
const ICON_SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><path d="M6.5 10v3.5a2 2 0 0 0 2 2H14"/></svg>';
const ICON_ZAP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

function t(key) { return (L.en && L.en[key]) || key; }
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function copy(text, btn) {
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => {});
  else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.exaetherisommand('copy');
    document.body.removeChild(ta);
  }
  toast(t('copied') + ': ' + (text.length > 48 ? text.slice(0, 48) + '…' : text));
  if (btn) { btn.classList.add('done'); setTimeout(() => btn.classList.remove('done'), 1000); }
}

function aType(name) {
  if (name.includes('prompt') || name.includes('design') || name.includes('brand') || name.includes('a11y')) return 'design';
  if (name.includes('reviewer') || name.includes('-review')) return 'reviewer';
  if (name.includes('build') || name.includes('resolver')) return 'builder';
  if (name.includes('architect')) return 'architect';
  if (name.includes('security')) return 'security';
  return 'other';
}

function applyLang() {
  document.getElementById('t-search-lbl').textContent = t('search');
  document.getElementById('t-nav-main').textContent = t('navMain');
  document.getElementById('t-nav-ops').textContent = t('navOps');
  document.getElementById('t-online').textContent = t('systemOnline');
  document.getElementById('t-live').textContent = t('live');
  document.getElementById('nav-agents').textContent = t('agents');
  document.getElementById('nav-skills').textContent = t('skills');
  document.getElementById('nav-commands').textContent = t('commands');
  document.getElementById('nav-rules').textContent = t('rules');
  document.getElementById('nav-mcps').textContent = t('mcps');
  document.getElementById('nav-hooks').textContent = t('hooks');
  document.getElementById('nav-activity').textContent = t('activity');
  document.getElementById('nav-ct-agents').textContent = AGENTS.length;
  document.getElementById('nav-ct-skills').textContent = SKILLS.length;
  document.getElementById('nav-ct-commands').textContent = COMMANDS.length;
  document.getElementById('nav-ct-rules').textContent = RULES.length;
  document.getElementById('nav-ct-mcps').textContent = MCPS.length;
  document.getElementById('nav-ct-hooks').textContent = HOOKS.length;
}

function toggleTheme() {
  const h = document.documentElement;
  h.dataset.theme = h.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('aetheris-theme', h.dataset.theme);
}
if (localStorage.getItem('aetheris-theme')) document.documentElement.dataset.theme = localStorage.getItem('aetheris-theme');

function handleRoute() {
  const hash = location.hash.slice(1);
  if (!hash || hash === '/') { renderMain(); return; }
  const parts = hash.split('/').filter(Boolean);
  if (parts.length < 2) { renderMain(); return; }
  renderPage(parts[0], decodeURIComponent(parts.slice(1).join('/')));
}
window.addEventListener('hashchange', handleRoute);

function goTab(name) {
  showTab(name, document.querySelector('.nav-it[data-tab="' + name + '"]'));
}

function renderMain() {
  const app = document.getElementById('app');
  const kpis = [
    { tab: 'agents', num: AGENTS.length, lbl: t('agents'), ic: ICON_BOT },
    { tab: 'skills', num: SKILLS.length, lbl: t('skills'), ic: ICON_SPARK },
    { tab: 'commands', num: COMMANDS.length, lbl: t('commands'), ic: ICON_TERM },
    { tab: 'rules', num: RULES.length, lbl: t('rules'), ic: ICON_SHIELD },
    { tab: 'mcps', num: MCPS.length, lbl: t('mcps'), ic: ICON_LINK },
    { tab: 'hooks', num: HOOKS.length, lbl: t('hooks'), ic: ICON_ZAP },
  ];

  app.innerHTML =
    '<section class="bento">' +
      '<div class="bento-hero">' +
        '<div class="bento-hero-grid">' +
          '<div style="display:flex;flex-direction:column;justify-content:space-between;gap:18px">' +
            '<div>' +
              '<div class="eyebrow"><span class="eyebrow-pill">Aetheris v${PLATFORM_VERSION}</span><span>SMB &amp; Enterprise AI Automation</span></div>' +
              '<h1>' + esc(t('heroTitle')) + '</h1>' +
              '<p>' + esc(t('heroSub')) + '</p>' +
            '</div>' +
            '<div class="hero-cta-row">' +
              '<button class="btn-primary" onclick="goTab(\\'playground\\')">Open Playground →</button>' +
              '<button class="btn-ghost" onclick="openCreateModal(\\'agents\\')">+ New Agent</button>' +
              '<button class="btn-ghost" onclick="goTab(\\'bundle\\')">Build Bundle</button>' +
            '</div>' +
          '</div>' +
          '<div class="avatar-stage" id="aetheris-avatar">' +
            '<div class="speech-bubble" id="avatar-mood">Hi! Welcome to Aetheris!</div>' +
            '<canvas class="mascot-canvas" id="mascot-canvas" width="352" height="352"></canvas>' +
            '<div class="avatar-btns">' +
              '<button class="av-btn" onclick="event.stopPropagation();triggerMascotAction(\\'wave\\')">Wave Hi</button>' +
              '<button class="av-btn" onclick="event.stopPropagation();triggerMascotAction(\\'dance\\')">Dance</button>' +
              '<button class="av-btn" onclick="event.stopPropagation();goTab(\\'playground\\')">Chat</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bento-kpis">' +
        kpis.map(k =>
          '<div class="kpi" onclick="goTab(\\'' + k.tab + '\\')">' +
            '<div class="kpi-lbl"><span>' + esc(k.lbl) + '</span>' + k.ic + '</div>' +
            '<div class="kpi-val">' + k.num + '</div>' +
          '</div>'
        ).join('') +
      '</div>' +
    '</section>' +
    '<div class="panel active" id="panel-agents"></div>' +
    '<div class="panel" id="panel-skills"></div>' +
    '<div class="panel" id="panel-commands"></div>' +
    '<div class="panel" id="panel-rules"></div>' +
    '<div class="panel" id="panel-mcps"></div>' +
    '<div class="panel" id="panel-hooks"></div>' +
    '<div class="panel" id="panel-activity"></div>' +
    '<div class="panel" id="panel-playground"></div>' +
    '<div class="panel" id="panel-bundle"></div>';

  document.querySelectorAll('.nav-it').forEach(n => n.classList.toggle('active', n.dataset.tab === 'agents'));
  renderAgents(AGENTS);
  renderSkills(SKILLS);
  renderCommands(COMMANDS);
  renderRules(RULES);
  renderMcps(MCPS);
  renderHooks(HOOKS);
  renderPlayground();
  renderBundleBuilder();
  animateKpis();
  startMascotEngine();
}

function animateKpis() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.kpi-val').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target) || target <= 0) return;
    const duration = 520;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* 60FPS Real Articulated 3D-Shaded Cyber-Fox Mascot Engine */
const MASCOT_STATE = {
  lookX: 0, lookY: 0, targetX: 0, targetY: 0,
  dragX: 0, dragY: 0, dragging: false, startX: 0, startY: 0,
  waveUntil: performance.now() + 3600,
  danceUntil: 0,
  talkUntil: performance.now() + 3600,
  thinking: false,
  rafId: null,
};

function triggerMascotAction(action) {
  const now = performance.now();
  if (action === 'wave') {
    MASCOT_STATE.waveUntil = now + 2600;
    MASCOT_STATE.talkUntil = now + 2600;
    setAvatarMood('Hi there! Ready to build!', false);
  } else if (action === 'dance') {
    MASCOT_STATE.danceUntil = now + 3000;
    MASCOT_STATE.waveUntil = now + 3000;
    MASCOT_STATE.talkUntil = now + 3000;
    setAvatarMood('Let us automate everything!', false);
  }
}

function setAvatarMood(text, thinking) {
  const mood = document.getElementById('avatar-mood');
  if (mood) mood.textContent = text;
  MASCOT_STATE.thinking = Boolean(thinking);
  MASCOT_STATE.talkUntil = performance.now() + (thinking ? 6000 : 2400);
}

document.addEventListener('pointerdown', e => {
  const stage = e.target && e.target.closest ? e.target.closest('#aetheris-avatar') : null;
  if (!stage || (e.target && e.target.tagName === 'BUTTON')) return;
  MASCOT_STATE.dragging = true;
  MASCOT_STATE.startX = e.clientX;
  MASCOT_STATE.startY = e.clientY;
  triggerMascotAction('wave');
});

document.addEventListener('pointerup', () => {
  MASCOT_STATE.dragging = false;
});

document.addEventListener('pointermove', e => {
  const card = e.target && e.target.closest ? e.target.closest('.card') : null;
  if (card) {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  const stage = document.getElementById('aetheris-avatar');
  if (!stage) return;
  const r = stage.getBoundingClientRect();
  MASCOT_STATE.targetX = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 240));
  MASCOT_STATE.targetY = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 220));
  if (MASCOT_STATE.dragging) {
    MASCOT_STATE.dragX = Math.max(-34, Math.min(34, (e.clientX - MASCOT_STATE.startX) * 0.7));
    MASCOT_STATE.dragY = Math.max(-24, Math.min(24, (e.clientY - MASCOT_STATE.startY) * 0.7));
  }
}, { passive: true });

function drawSphere(ctx, x, y, rx, ry, lightColor, midColor, darkColor) {
  const g = ctx.createRadialGradient(x - rx * 0.3, y - ry * 0.35, rx * 0.1, x, y, Math.max(rx, ry) * 1.15);
  g.addColorStop(0, lightColor);
  g.addColorStop(0.55, midColor);
  g.addColorStop(1, darkColor);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function startMascotEngine() {
  if (MASCOT_STATE.rafId) cancelAnimationFrame(MASCOT_STATE.rafId);
  const canvas = document.getElementById('mascot-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function frame(now) {
    const c = document.getElementById('mascot-canvas');
    if (!c) return;
    const t = now * 0.001;
    MASCOT_STATE.lookX += (MASCOT_STATE.targetX - MASCOT_STATE.lookX) * 0.12;
    MASCOT_STATE.lookY += (MASCOT_STATE.targetY - MASCOT_STATE.lookY) * 0.12;
    if (!MASCOT_STATE.dragging) {
      MASCOT_STATE.dragX *= 0.86;
      MASCOT_STATE.dragY *= 0.86;
    }

    const waving = now < MASCOT_STATE.waveUntil || MASCOT_STATE.thinking;
    const dancing = now < MASCOT_STATE.danceUntil;
    const talking = now < MASCOT_STATE.talkUntil;
    const blinkCycle = t % 4.2;
    const blink = blinkCycle > 4.02 ? 0.12 : 1;

    ctx.clearRect(0, 0, 352, 352);

    const cx = 176 + MASCOT_STATE.dragX + (dancing ? Math.sin(t * 10) * 14 : 0);
    const bob = dancing ? Math.abs(Math.sin(t * 9)) * -22 : Math.sin(t * 2.8) * 6;
    const cy = 192 + bob + MASCOT_STATE.dragY;
    const lx = MASCOT_STATE.lookX;
    const ly = MASCOT_STATE.lookY;

    // Floor shadow
    ctx.save();
    const shScale = 1 - Math.abs(bob) * 0.012;
    const shGrad = ctx.createRadialGradient(cx, 316, 8, cx, 316, 76 * shScale);
    shGrad.addColorStop(0, 'rgba(0,0,0,0.65)');
    shGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shGrad;
    ctx.beginPath();
    ctx.ellipse(cx, 316, 76 * shScale, 15 * shScale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Wagging fluffy tail behind body
    ctx.save();
    ctx.translate(cx + 38, cy + 52);
    ctx.rotate(Math.sin(t * (dancing ? 12 : 4.2)) * 0.28 + 0.35);
    drawSphere(ctx, 26, -12, 34, 22, '#94A3B8', '#475569', '#1E293B');
    drawSphere(ctx, 44, -22, 16, 12, '#E2E8F0', '#94A3B8', '#475569');
    ctx.restore();

    // Feet (3D plush paws)
    const footLiftL = dancing ? Math.max(0, Math.sin(t * 10)) * 12 : 0;
    const footLiftR = dancing ? Math.max(0, -Math.sin(t * 10)) * 12 : 0;
    drawSphere(ctx, cx - 24, cy + 94 - footLiftL, 20, 14, '#64748B', '#334155', '#0F172A');
    drawSphere(ctx, cx + 24, cy + 94 - footLiftR, 20, 14, '#64748B', '#334155', '#0F172A');

    // Left arm (resting / balancing)
    ctx.save();
    ctx.translate(cx - 46, cy + 22);
    ctx.rotate(dancing ? Math.sin(t * 10) * 0.55 - 0.3 : Math.sin(t * 2.8) * 0.08 + 0.25);
    drawSphere(ctx, -10, 24, 15, 30, '#3F3F46', '#18181B', '#09090B');
    drawSphere(ctx, -12, 46, 13, 12, '#94A3B8', '#475569', '#1E293B');
    ctx.restore();

    // Right arm (ACTUALLY RAISES UP & WAVES HELLO!)
    ctx.save();
    ctx.translate(cx + 46, cy + 20);
    const waveAngle = waving
      ? -2.35 + Math.sin(t * 15) * 0.42
      : -0.25 + Math.sin(t * 2.8) * 0.08;
    ctx.rotate(waveAngle);
    drawSphere(ctx, 10, 24, 15, 30, '#3F3F46', '#18181B', '#09090B');
    drawSphere(ctx, 12, 48, 14, 13, '#CBD5E1', '#64748B', '#1E293B');
    ctx.restore();

    // Torso (Matte-black 3D tech hoodie + glowing indigo prism)
    drawSphere(ctx, cx, cy + 44, 50, 56, '#3F3F46', '#18181B', '#09090B');
    // Hoodie collar highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy + 12, 34, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // Glowing Aetheris chest prism
    ctx.save();
    ctx.shadowColor = '#6366F1';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#818CF8';
    ctx.beginPath();
    ctx.moveTo(cx + lx * 4, cy + 34);
    ctx.lineTo(cx + 10 + lx * 4, cy + 50);
    ctx.lineTo(cx - 10 + lx * 4, cy + 50);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Head group (3D parallax turn toward cursor!)
    const hx = cx + lx * 10;
    const hy = cy - 42 + ly * 6;
    const headTilt = lx * 0.14 + (dancing ? Math.sin(t * 10) * 0.12 : Math.sin(t * 2.1) * 0.04);

    ctx.save();
    ctx.translate(hx, hy);
    ctx.rotate(headTilt);

    // Tall Fuzzy Ears (independently twitching!)
    const earTwitchL = Math.sin(t * 3.1) * 0.05 + (waving ? -0.14 : 0);
    const earTwitchR = Math.cos(t * 2.7) * 0.05 + (waving ? 0.16 : 0);

    ctx.save();
    ctx.translate(-34, -46);
    ctx.rotate(-0.24 + earTwitchL);
    drawSphere(ctx, 0, -28, 20, 44, '#94A3B8', '#475569', '#1E293B');
    drawSphere(ctx, 2, -26, 11, 30, '#818CF8', '#6366F1', '#312E81');
    ctx.restore();

    ctx.save();
    ctx.translate(34, -46);
    ctx.rotate(0.24 + earTwitchR);
    drawSphere(ctx, 0, -28, 20, 44, '#94A3B8', '#475569', '#1E293B');
    drawSphere(ctx, -2, -26, 11, 30, '#818CF8', '#6366F1', '#312E81');
    ctx.restore();

    // 3D Head sphere (plush charcoal-silver gradient + rim light)
    drawSphere(ctx, 0, 0, 66, 58, '#94A3B8', '#475569', '#1E293B');
    // Soft cheek tufts
    drawSphere(ctx, -44 + lx * 4, 16, 20, 14, '#CBD5E1', '#64748B', '#334155');
    drawSphere(ctx, 44 + lx * 4, 16, 20, 14, '#CBD5E1', '#64748B', '#334155');
    // Lighter vinyl face plate
    drawSphere(ctx, lx * 8, 6 + ly * 5, 48, 39, '#F1F5F9', '#CBD5E1', '#94A3B8');

    // Glossy 3D Dark-Glass Eyes tracking cursor + blinking
    const exOff = lx * 11;
    const eyOff = ly * 7;
    [-20, 20].forEach(side => {
      const ex = side + exOff;
      const ey = 0 + eyOff;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.scale(1, blink);
      drawSphere(ctx, 0, 0, 13, 15, '#334155', '#09090B', '#020617');
      // Cyan starlight iris glow
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(lx * 3, ly * 2 + 2, 4.5, 0, Math.PI * 2);
      ctx.fill();
      // Glossy specular catchlights
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-4 + lx * 1.5, -5 + ly * 1.5, 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4, 4, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Rosy subtle cheeks
    ctx.fillStyle = 'rgba(129, 140, 248, 0.28)';
    ctx.beginPath(); ctx.ellipse(-30 + exOff, 14 + eyOff, 8, 4.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(30 + exOff, 14 + eyOff, 8, 4.5, 0, 0, Math.PI * 2); ctx.fill();

    // Cute nose
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.ellipse(exOff, 11 + eyOff, 4.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Animated Talking / Smiling Mouth
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    if (talking) {
      const mouthOpen = 3 + Math.abs(Math.sin(t * 14)) * 7;
      ctx.fillStyle = '#1E1B4B';
      ctx.beginPath();
      ctx.ellipse(exOff, 22 + eyOff, 9, mouthOpen, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(exOff, 16 + eyOff, 10, 0.22 * Math.PI, 0.78 * Math.PI);
      ctx.stroke();
    }

    ctx.restore();

    MASCOT_STATE.rafId = requestAnimationFrame(frame);
  }

  MASCOT_STATE.rafId = requestAnimationFrame(frame);
}

function showTab(name, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-it').forEach(n => n.classList.remove('active'));
  const p = document.getElementById('panel-' + name);
  if (p) p.classList.add('active');
  if (btn) btn.classList.add('active');
  location.hash = '';
}

const ICON_STAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>';

function getPins() { try { return JSON.parse(localStorage.getItem('aetheris-pins') || '[]'); } catch { return []; } }
function isPinned(type, name) { return getPins().some(p => p.t === type && p.n === name); }
function togglePin(type, name, btn, ev) {
  if (ev) ev.stopPropagation();
  let pins = getPins();
  const exists = pins.some(p => p.t === type && p.n === name);
  if (exists) pins = pins.filter(p => !(p.t === type && p.n === name));
  else pins.unshift({ t: type, n: name });
  if (pins.length > 8) pins = pins.slice(0, 8);
  try { localStorage.setItem('aetheris-pins', JSON.stringify(pins)); } catch {}
  if (btn) {
    btn.classList.toggle('pinned', !exists);
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
  }
  renderPins();
  toast(exists ? 'Unpinned ' + name : 'Pinned ' + name);
}
function renderPins() {
  const grp = document.getElementById('pins-group');
  const box = document.getElementById('pin-list');
  if (!grp || !box) return;
  const pins = getPins();
  if (!pins.length) { grp.style.display = 'none'; return; }
  grp.style.display = 'flex';
  box.innerHTML = pins.map(p =>
    '<div class="pin-row" onclick="location.hash=\\'#/' + encodeURIComponent(p.t) + '/' + encodeURIComponent(p.n) + '\\'">' +
      '<span class="pin-row-name">' + esc(p.n) + '</span>' +
      '<span class="pin-row-type">' + esc(p.t.slice(0, 2)) + '</span>' +
    '</div>'
  ).join('');
}
function quickCopyItem(type, fileOrName, btn, ev) {
  if (ev) ev.stopPropagation();
  fetch('/api/item?type=' + encodeURIComponent(type) + '&name=' + encodeURIComponent(fileOrName))
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || !data.content) return;
      copy(data.content, btn);
      if (btn) {
        btn.innerHTML = ICON_CHECK;
        setTimeout(() => { btn.innerHTML = ICON_COPY; }, 1200);
      }
    })
    .catch(() => toast('Failed to copy prompt'));
}
function openShortcuts() { document.getElementById('shortcuts-bg').classList.add('show'); }
function closeShortcuts() { document.getElementById('shortcuts-bg').classList.remove('show'); }

function renderAgents(list) {
  const el = document.getElementById('panel-agents');
  if (!el) return;
  const cats = ['all', 'design', 'reviewer', 'architect', 'builder', 'security'];
  const lbls = [t('all'), t('designBrand'), t('reviewers'), t('architects'), t('buildResolvers'), t('security')];
  el.innerHTML =
    '<div class="toolbar">' +
      '<div class="filters" id="af">' + cats.map((c, i) =>
        '<button' + (i === 0 ? ' class="active"' : '') + ' onclick="filterAgents(\\'' + c + '\\',this)">' + esc(lbls[i]) + '</button>'
      ).join('') + '</div>' +
      '<div class="inline-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/></svg><input type="text" placeholder="Filter agents..." oninput="quickFilter(\\'ag\\',this.value)"></div>' +
    '</div>' +
    '<div class="grid" id="ag">' + list.map((a, idx) => {
      const m = (a.m || '').toLowerCase();
      const tier = m.includes('opus') ? 'opus' : m.includes('sonnet') ? 'sonnet' : m.includes('haiku') ? 'haiku' : '';
      const tag = aType(a.n);
      const delay = idx < 12 ? ' style="animation-delay:' + (idx * 24) + 'ms"' : '';
      const pinCls = isPinned('agents', a.n) ? ' pinned' : '';
      const safeN = esc(a.n).replace(/'/g, '&#39;');
      const safeF = esc(a.f || (a.n + '.md')).replace(/'/g, '&#39;');
      return '<div class="card"' + delay + ' data-tag="' + tag + '" onclick="location.hash=\\'#/agents/' + encodeURIComponent(a.n) + '\\'">' +
        '<div class="card-head"><div class="card-title-wrap"><div class="card-ic">' + ICON_BOT + '</div><span class="nm">' + esc(a.n) + '</span></div>' +
        '<div class="card-actions">' +
          (tier ? '<span class="model-tag"><span class="m-dot ' + tier + '"></span>' + esc(a.m) + '</span>' : '') +
          '<button class="ic-action' + pinCls + '" title="Pin favorite" onclick="togglePin(\\'agents\\',\\'' + safeN + '\\',this,event)">' + ICON_STAR + '</button>' +
          '<button class="ic-action" title="Quick copy full prompt" onclick="quickCopyItem(\\'agents\\',\\'' + safeF + '\\',this,event)">' + ICON_COPY + '</button>' +
        '</div></div>' +
        '<div class="desc">' + esc((a.d || '').slice(0, 150)) + '</div>' +
        '<div class="tags">' + (a.t || []).slice(0, 5).map(tool => '<span class="t">' + esc(tool) + '</span>').join('') + '</div></div>';
    }).join('') + '</div>';
}

function renderSkills(list) {
  const el = document.getElementById('panel-skills');
  if (!el) return;
  const keys = ['all', 'design', 'sec', 'test', 'pattern', 'research', 'data', 'agent', 'devops'];
  const lbls = [t('all'), t('designBrand'), t('security'), t('testing'), t('patterns'), t('research'), t('data'), t('agent'), t('devops')];
  el.innerHTML =
    '<div class="toolbar">' +
      '<div class="filters" id="sf">' + keys.map((c, i) =>
        '<button' + (i === 0 ? ' class="active"' : '') + ' onclick="filterSkills(\\'' + c + '\\',this)">' + esc(lbls[i]) + '</button>'
      ).join('') + '</div>' +
      '<div class="inline-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/></svg><input type="text" placeholder="Filter skills..." oninput="quickFilter(\\'sg\\',this.value)"></div>' +
    '</div>' +
    '<div class="grid" id="sg">' + list.map((s, idx) => {
      const delay = idx < 12 ? ' style="animation-delay:' + (idx * 20) + 'ms"' : '';
      const pinCls = isPinned('skills', s.n) ? ' pinned' : '';
      const safeN = esc(s.n).replace(/'/g, '&#39;');
      return '<div class="card"' + delay + ' onclick="location.hash=\\'#/skills/' + encodeURIComponent(s.n) + '\\'">' +
        '<div class="card-head"><div class="card-title-wrap"><div class="card-ic">' + ICON_SPARK + '</div><span class="nm">' + esc(s.n) + '</span></div>' +
        '<div class="card-actions">' +
          '<button class="ic-action' + pinCls + '" title="Pin favorite" onclick="togglePin(\\'skills\\',\\'' + safeN + '\\',this,event)">' + ICON_STAR + '</button>' +
          '<button class="ic-action" title="Quick copy full skill" onclick="quickCopyItem(\\'skills\\',\\'' + safeN + '\\',this,event)">' + ICON_COPY + '</button>' +
        '</div></div>' +
        '<div class="desc">' + esc(s.d || '—') + '</div></div>';
    }).join('') + '</div>';
}

function renderCommands(list) {
  const el = document.getElementById('panel-commands');
  if (!el) return;
  const cats = [...new Set(list.map(c => c.c))];
  el.innerHTML = '<div class="toolbar"><div class="filters" id="cf"></div></div><div class="cmd-grid" id="cg"></div>';
  const filters = el.querySelector('#cf');
  const allBtn = document.createElement('button');
  allBtn.className = 'active';
  allBtn.textContent = t('all');
  allBtn.onclick = () => filterCommands('all', allBtn);
  filters.appendChild(allBtn);
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => filterCommands(cat, btn);
    filters.appendChild(btn);
  });
  const grid = el.querySelector('#cg');
  list.forEach(c => {
    const div = document.createElement('div');
    div.className = 'cmd-it';
    div.onclick = () => { location.hash = '#/commands/' + encodeURIComponent(c.n.replace('/', '')); };
    div.innerHTML = '<div class="cl"><div class="cn">' + esc(c.n) + '</div><div class="cd">' + esc(c.d || '—') + '</div><div class="cc">' + esc(c.c) + '</div></div>' +
      '<button class="cpy" title="Copy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>';
    div.querySelector('.cpy').onclick = (e) => { e.stopPropagation(); copy(c.n, e.currentTarget); };
    grid.appendChild(div);
  });
}

function renderRules(list) {
  const el = document.getElementById('panel-rules');
  if (!el) return;
  el.innerHTML = '<div class="rules-grid">' + list.map(r =>
    '<div class="rule-cd" onclick="location.hash=\\'#/rules/' + encodeURIComponent(r.l) + '\\'"><h3>' + esc(r.l) + '</h3>' +
    r.f.slice(0, 7).map(f => '<div class="rf">' + esc(f) + '</div>').join('') +
    (r.f.length > 7 ? '<div class="rf" style="color:var(--text-3)">+' + (r.f.length - 7) + ' ' + esc(t('more')) + '</div>' : '') +
    '</div>'
  ).join('') + '</div>';
}

function renderMcps(list) {
  const el = document.getElementById('panel-mcps');
  if (!el) return;
  if (!list.length) { el.innerHTML = '<div class="act-empty">' + esc(t('noMcps')) + '</div>'; return; }
  el.innerHTML = '<div class="mcp-grid">' + list.map(m =>
    '<div class="mcp-cd"><h3 style="margin-bottom:12px">' + esc(m.f) + '</h3>' +
    m.s.map(s =>
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid var(--border)">' +
        '<div style="min-width:0"><div style="font-family:var(--mono);font-size:12px;font-weight:600;color:var(--text)">' + esc(s.n) + '</div><div style="font-family:var(--mono);font-size:10.5px;color:var(--text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(s.cmd || s.type) + '</div></div>' +
        '<label class="switch" onclick="event.stopPropagation()"><input type="checkbox"' + (s.enabled !== false ? ' checked' : '') + ' onchange="toggleMcpUI(\\'' + esc(m.f) + '\\',\\'' + esc(s.n) + '\\',this.checked)"><span class="slider"></span></label>' +
      '</div>'
    ).join('') + '</div>'
  ).join('') + '</div>';
}

function renderHooks(list) {
  const el = document.getElementById('panel-hooks');
  if (!el) return;
  if (!list.length) { el.innerHTML = '<div class="act-empty">' + esc(t('noHooks')) + '</div>'; return; }
  el.innerHTML = '<div class="hw"><table class="ht"><thead><tr><th>Active</th><th>' + esc(t('event')) + '</th><th>' + esc(t('matcher')) + '</th><th>' + esc(t('description')) + '</th><th>' + esc(t('id')) + '</th></tr></thead><tbody>' +
    list.map(h =>
      '<tr><td><label class="switch" onclick="event.stopPropagation()"><input type="checkbox"' + (h.enabled !== false ? ' checked' : '') + ' onchange="toggleHookUI(\\'' + esc(h.id) + '\\',this.checked)"><span class="slider"></span></label></td>' +
      '<td class="ev" onclick="location.hash=\\'#/hooks/' + encodeURIComponent(h.id) + '\\'">' + esc(h.ev) + '</td><td><span class="mt">' + esc(h.m) + '</span></td><td>' + esc(h.d) + '</td><td style="font-family:var(--mono);font-size:11px;color:var(--text-3)">' + esc(h.id) + '</td></tr>'
    ).join('') + '</tbody></table></div>';
}

function toggleMcpUI(file, serverName, enabled) {
  fetch('/api/mcps/toggle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file, serverName, enabled }) })
    .then(r => r.json())
    .then(d => {
      if (d.error) throw new Error(d.error);
      toast((enabled ? 'Enabled ' : 'Disabled ') + serverName);
      setAvatarMood('MCP updated', false);
    })
    .catch(err => toast('Error: ' + err.message));
}

function toggleHookUI(id, enabled) {
  fetch('/api/hooks/toggle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, enabled }) })
    .then(r => r.json())
    .then(d => {
      if (d.error) throw new Error(d.error);
      toast((enabled ? 'Enabled ' : 'Disabled ') + id);
      setAvatarMood('Hook updated', false);
    })
    .catch(err => toast('Error: ' + err.message));
}

/* CRUD Create / Edit / Delete */
let createType = 'agents';
function openCreateModal(type) {
  createType = type || 'agents';
  document.getElementById('create-title').textContent = 'Create New ' + (createType === 'agents' ? 'Agent' : createType === 'skills' ? 'Skill' : 'Command');
  document.getElementById('cr-model-wrap').style.display = createType === 'agents' ? '' : 'none';
  document.getElementById('cr-tools-wrap').style.display = createType === 'agents' ? '' : 'none';
  document.getElementById('cr-name').value = '';
  document.getElementById('cr-desc').value = '';
  document.getElementById('cr-body').value = '';
  document.getElementById('create-bg').classList.add('show');
  setTimeout(() => document.getElementById('cr-name').focus(), 20);
}
function closeCreateModal() { document.getElementById('create-bg').classList.remove('show'); }
function submitCreateItem() {
  const payload = {
    type: createType,
    name: document.getElementById('cr-name').value.trim(),
    description: document.getElementById('cr-desc').value.trim(),
    model: document.getElementById('cr-model').value,
    tools: document.getElementById('cr-tools').value,
    body: document.getElementById('cr-body').value,
  };
  if (!payload.name) { toast('Enter a valid slug name'); return; }
  setAvatarMood('Saving & validating...', true);
  fetch('/api/item/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    .then(r => r.json())
    .then(d => {
      if (d.error) throw new Error(d.error);
      closeCreateModal();
      toast('Saved ' + d.file);
      setAvatarMood('Saved & validated!', false);
      setTimeout(() => location.reload(), 500);
    })
    .catch(err => { setAvatarMood('Validation error', false); toast('Error: ' + err.message); });
}

/* Live Agent Playground */
function renderPlayground(preselectAgent) {
  const el = document.getElementById('panel-playground');
  if (!el) return;
  const selected = preselectAgent || (AGENTS[0] ? AGENTS[0].n : '');
  el.innerHTML =
    '<div class="pg-shell">' +
      '<div class="pg-card">' +
        '<div style="font-size:14px;font-weight:600">Agent Playground</div>' +
        '<div style="font-size:12px;color:var(--text-2)">Run any of your ' + AGENTS.length + ' agents against local Ollama, OpenAI, Anthropic, or Dry-Run Inspector.</div>' +
        '<div class="wb-field"><label>Agent</label><select id="pg-agent">' + AGENTS.map(a => '<option value="' + esc(a.n) + '"' + (a.n === selected ? ' selected' : '') + '>' + esc(a.n) + ' (' + esc(a.m) + ')</option>').join('') + '</select></div>' +
        '<div class="wb-field"><label>Provider</label><select id="pg-provider"><option value="auto">Auto-detect (Ollama / API / Dry-Run)</option><option value="ollama">Local Ollama (127.0.0.1:11434)</option><option value="anthropic">Anthropic API</option><option value="openai">OpenAI API</option><option value="simulate">Local Dry-Run Inspector</option></select></div>' +
        '<div class="wb-field"><label>Model Override (optional)</label><input id="pg-model" placeholder="e.g., llama3.2, gpt-4o-mini"></div>' +
        '<div id="pg-status" style="font-family:var(--mono);font-size:11px;color:var(--text-3);padding:8px 10px;border-radius:8px;background:var(--bg-subtle);border:1px solid var(--border)">Checking providers...</div>' +
      '</div>' +
      '<div class="pg-card pg-chat">' +
        '<div class="pg-messages" id="pg-messages"><div class="msg bot">Select an agent and send a task below to test its prompt live.</div></div>' +
        '<div class="pg-input-row">' +
          '<input id="pg-input" placeholder="Send a task to the selected agent..." onkeydown="if(event.key===\\'Enter\\')sendPlayground()">' +
          '<button class="btn-primary" onclick="sendPlayground()">Run →</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  fetch('/api/playground/status').then(r => r.json()).then(st => {
    const box = document.getElementById('pg-status');
    if (!box) return;
    box.innerHTML =
      'Ollama: <strong>' + (st.ollama && st.ollama.available ? 'Online (' + st.ollama.models.length + ' models)' : 'Offline') + '</strong><br>' +
      'Anthropic: <strong>' + (st.anthropic && st.anthropic.available ? 'API Key Ready' : 'Not set') + '</strong><br>' +
      'OpenAI: <strong>' + (st.openai && st.openai.available ? 'API Key Ready' : 'Not set') + '</strong>';
  }).catch(() => {});
}

function sendPlayground() {
  const inp = document.getElementById('pg-input');
  const box = document.getElementById('pg-messages');
  const msg = (inp ? inp.value : '').trim();
  if (!msg || !box) return;
  const agentName = document.getElementById('pg-agent').value;
  const provider = document.getElementById('pg-provider').value;
  const model = document.getElementById('pg-model').value.trim();
  inp.value = '';
  box.innerHTML += '<div class="msg user">' + esc(msg) + '</div>';
  const waitId = 'wait-' + Date.now();
  box.innerHTML += '<div class="msg bot" id="' + waitId + '">Running ' + esc(agentName) + '...</div>';
  box.scrollTop = box.scrollHeight;
  setAvatarMood('Running ' + agentName + '...', true);
  fetch('/api/playground/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentName, userMessage: msg, provider, model }),
  })
    .then(r => r.json())
    .then(d => {
      const el = document.getElementById(waitId);
      if (d.error) throw new Error(d.error);
      if (el) el.textContent = '[' + d.provider + ' · ' + d.model + ']\\n\\n' + d.reply;
      box.scrollTop = box.scrollHeight;
      setAvatarMood('Response ready', false);
    })
    .catch(err => {
      const el = document.getElementById(waitId);
      if (el) el.textContent = 'Error: ' + err.message;
      setAvatarMood('Error occurred', false);
    });
}

/* Bundle Builder */
function renderBundleBuilder() {
  const el = document.getElementById('panel-bundle');
  if (!el) return;
  el.innerHTML =
    '<div class="pg-card">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
        '<div><div style="font-size:15px;font-weight:600">Project &amp; Client Bundle Builder</div><div style="font-size:12.5px;color:var(--text-2)">Select Agents, Skills, and Rule Sets to export a ready-to-deploy Aetheris package.</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center"><input id="bn-name" value="client-automation-bundle" style="width:220px"><button class="btn-primary" onclick="exportClientBundle()">Export Bundle (.json)</button></div>' +
      '</div>' +
      '<div class="bundle-cols">' +
        '<div><div style="font-size:12px;font-weight:600;color:var(--text-2)">Agents (' + AGENTS.length + ')</div><div class="bundle-list">' + AGENTS.map(a => '<label class="bundle-chk"><input type="checkbox" class="bn-ag" value="' + esc(a.n) + '"><span>' + esc(a.n) + '</span></label>').join('') + '</div></div>' +
        '<div><div style="font-size:12px;font-weight:600;color:var(--text-2)">Skills (' + SKILLS.length + ')</div><div class="bundle-list">' + SKILLS.slice(0, 80).map(s => '<label class="bundle-chk"><input type="checkbox" class="bn-sk" value="' + esc(s.n) + '"><span>' + esc(s.n) + '</span></label>').join('') + '</div></div>' +
        '<div><div style="font-size:12px;font-weight:600;color:var(--text-2)">Rule Sets (' + RULES.length + ')</div><div class="bundle-list">' + RULES.map(r => '<label class="bundle-chk"><input type="checkbox" class="bn-ru" value="' + esc(r.l) + '"><span>' + esc(r.l) + ' (' + r.f.length + ')</span></label>').join('') + '</div></div>' +
      '</div>' +
    '</div>';
}

function exportClientBundle() {
  if (EDITION === 'preview') {
    toast('Full License required to download bundles');
    openLicenseModal();
    return;
  }
  const projectName = (document.getElementById('bn-name').value || 'aetheris-bundle').trim();
  const agents = [...document.querySelectorAll('.bn-ag:checked')].map(i => i.value);
  const skills = [...document.querySelectorAll('.bn-sk:checked')].map(i => i.value);
  const rules = [...document.querySelectorAll('.bn-ru:checked')].map(i => i.value);
  if (!agents.length && !skills.length && !rules.length) { toast('Select at least 1 agent, skill, or rule'); return; }
  setAvatarMood('Building bundle...', true);
  fetch('/api/bundle/export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectName, agents, skills, rules }) })
    .then(r => r.json())
    .then(bundle => {
      if (bundle.error) throw new Error(bundle.error);
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = projectName.replace(/[^a-z0-9_-]/gi, '-') + '.aetheris.json';
      a.click();
      URL.revokeObjectURL(a.href);
      toast('Exported ' + bundle.counts.agents + ' agents, ' + bundle.counts.skills + ' skills, ' + bundle.counts.rules + ' rules');
      setAvatarMood('Bundle exported!', false);
    })
    .catch(err => { setAvatarMood('Export error', false); toast('Error: ' + err.message); });
}

let activePromptRaw = '';
function updateWorkbenchMetrics(text) {
  const chars = text.length;
  const lines = text ? text.split('\\n').length : 0;
  const tokens = Math.max(1, Math.round(chars / 4));
  const el = document.getElementById('wb-metrics');
  if (el) el.innerHTML = '<span class="wb-stat"><strong>~' + tokens.toLocaleString() + '</strong> tokens</span><span class="wb-stat"><strong>' + lines + '</strong> lines</span><span class="wb-stat"><strong>' + chars.toLocaleString() + '</strong> chars</span>';
}
function composeReadyPrompt() {
  const task = (document.getElementById('wb-task') ? document.getElementById('wb-task').value : '').trim();
  const ctx = (document.getElementById('wb-context') ? document.getElementById('wb-context').value : '').trim();
  let out = activePromptRaw;
  if (ctx) out += '\\n\\n## Active Context\\n' + ctx;
  if (task) out += '\\n\\n## Current Task\\n' + task;
  const pre = document.getElementById('full-prompt-box');
  if (pre) pre.textContent = out;
  updateWorkbenchMetrics(out);
  return out;
}
function toggleWorkbench() {
  const p = document.getElementById('wb-panel');
  if (p) p.classList.toggle('open');
}

function loadFullPrompt(type, name, preId) {
  const pre = document.getElementById(preId);
  if (pre) pre.innerHTML = '<div class="skeleton"></div>';
  fetch('/api/item?type=' + encodeURIComponent(type) + '&name=' + encodeURIComponent(name))
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || typeof data.content !== 'string') return;
      activePromptRaw = data.content;
      if (pre) pre.textContent = data.content;
      updateWorkbenchMetrics(data.content);
      const btn = document.getElementById('copy-full-btn');
      if (btn) btn.onclick = () => {
        const finalTxt = composeReadyPrompt();
        copy(finalTxt, btn);
        btn.textContent = '✓ Copied';
        setTimeout(() => { btn.textContent = 'Copy ready prompt'; }, 1300);
      };
    })
    .catch(() => {});
}

let activeItemMeta = null;
function toggleEditPrompt() {
  const pre = document.getElementById('full-prompt-box');
  const ed = document.getElementById('edit-prompt-box');
  const saveBtn = document.getElementById('save-disk-btn');
  if (!pre || !ed || !saveBtn) return;
  const editing = ed.style.display !== 'none';
  if (!editing) {
    ed.value = activePromptRaw;
    pre.style.display = 'none';
    ed.style.display = 'block';
    saveBtn.style.display = 'inline-flex';
  } else {
    pre.style.display = 'block';
    ed.style.display = 'none';
    saveBtn.style.display = 'none';
  }
}
function saveActivePrompt() {
  if (!activeItemMeta) return;
  const ed = document.getElementById('edit-prompt-box');
  if (!ed) return;
  fetch('/api/item/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...activeItemMeta, body: ed.value }),
  })
    .then(r => r.json())
    .then(d => {
      if (d.error) throw new Error(d.error);
      activePromptRaw = ed.value;
      const pre = document.getElementById('full-prompt-box');
      if (pre) pre.textContent = ed.value;
      updateWorkbenchMetrics(ed.value);
      toggleEditPrompt();
      toast('Saved ' + d.file + (d.validation && d.validation.validated ? ' (validated)' : ''));
    })
    .catch(err => toast('Save error: ' + err.message));
}
function deleteActiveItem() {
  if (!activeItemMeta) return;
  if (!confirm('Delete ' + activeItemMeta.name + ' from disk?')) return;
  fetch('/api/item/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: activeItemMeta.type, name: activeItemMeta.name }),
  })
    .then(r => r.json())
    .then(d => {
      if (d.error) throw new Error(d.error);
      toast('Deleted ' + activeItemMeta.name);
      location.hash = '';
      setTimeout(() => location.reload(), 400);
    })
    .catch(err => toast('Delete error: ' + err.message));
}

function renderPage(type, name) {
  const app = document.getElementById('app');
  let html = '';
  let fetchFull = null;
  activeItemMeta = null;
  if (type === 'agents') {
    const a = AGENTS.find(x => x.n === name);
    if (!a) { app.innerHTML = '<div class="act-empty">Agent not found</div>'; return; }
    fetchFull = { type: 'agents', name: a.f || (a.n + '.md') };
    activeItemMeta = { type: 'agents', name: a.n, description: a.d, model: a.m, tools: a.t };
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('agents')) + '</button><h2>' + esc(a.n) + '</h2>' +
      '<div class="sub"><span>' + esc(a.m) + '</span><span>•</span><span>' + a.t.length + ' ' + esc(t('tools')) + '</span></div>' +
      '<div class="sec"><h3>' + esc(t('description')) + '</h3><p>' + esc(a.d) + '</p></div>' +
      (a.t.length ? '<div class="sec"><h3>' + esc(t('tools')) + '</h3>' + a.t.map(tool => '<span class="tt">' + esc(tool) + '</span>').join('') + '</div>' : '') +
      '<div class="workbench-bar"><div class="wb-stats" id="wb-metrics"><span>Analyzing prompt...</span></div><div class="wb-controls"><button class="btn-ghost" style="height:32px;font-size:12px" onclick="toggleWorkbench()">Workbench</button><button class="btn-ghost" style="height:32px;font-size:12px" onclick="toggleEditPrompt()">Edit</button><button class="btn-primary" id="save-disk-btn" style="height:32px;font-size:12px;display:none" onclick="saveActivePrompt()">Save to Disk</button><button class="copy-btn" id="copy-full-btn">Copy ready prompt</button><button class="btn-danger" onclick="deleteActiveItem()">Delete</button></div></div>' +
      '<div class="wb-panel" id="wb-panel"><div class="wb-grid"><div class="wb-field"><label>Task / Objective</label><input id="wb-task" placeholder="e.g., Audit checkout flow for silent errors..." oninput="composeReadyPrompt()"></div><div class="wb-field"><label>Business / Stack Context</label><input id="wb-context" placeholder="e.g., Node.js API, SMB booking clinic..." oninput="composeReadyPrompt()"></div></div></div>' +
      '<div class="sec"><div class="sec-head"><h3>' + esc(t('details')) + '</h3></div><textarea class="edit-area" id="edit-prompt-box" style="display:none"></textarea><pre class="pb" id="full-prompt-box">' + esc(a.b || 'Loading...') + '</pre></div></div>';
  } else if (type === 'skills') {
    const s = SKILLS.find(x => x.n === name);
    if (!s) { app.innerHTML = '<div class="act-empty">Skill not found</div>'; return; }
    fetchFull = { type: 'skills', name: s.n };
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('skills')) + '</button><h2>' + esc(s.n) + '</h2><div class="sub">' + esc(t('skill')) + '</div>' +
      '<div class="sec"><h3>' + esc(t('description')) + '</h3><p>' + esc(s.d || '—') + '</p></div>' +
      '<div class="sec"><div class="sec-head"><h3>' + esc(t('details')) + '</h3><button class="copy-btn" id="copy-full-btn">Copy full prompt</button></div><pre class="pb" id="full-prompt-box">' + esc(s.b || 'Loading...') + '</pre></div></div>';
  } else if (type === 'commands') {
    const c = COMMANDS.find(x => x.n === '/' + name);
    if (!c) { app.innerHTML = '<div class="act-empty">Command not found</div>'; return; }
    fetchFull = { type: 'commands', name: c.f || (name + '.md') };
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('commands')) + '</button><h2>' + esc(c.n) + '</h2><div class="sub">' + esc(c.c) + '</div>' +
      '<div class="sec"><h3>' + esc(t('description')) + '</h3><p>' + esc(c.d || '—') + '</p></div>' +
      '<div class="sec"><button class="copy-btn" data-cmd="' + esc(c.n) + '">Copy ' + esc(c.n) + '</button></div>' +
      '<div class="sec"><div class="sec-head"><h3>' + esc(t('details')) + '</h3><button class="copy-btn" id="copy-full-btn">Copy full prompt</button></div><pre class="pb" id="full-prompt-box">' + esc(c.b || 'Loading...') + '</pre></div></div>';
  } else if (type === 'rules') {
    const r = RULES.find(x => x.l === name);
    if (!r) { app.innerHTML = '<div class="act-empty">Rules not found</div>'; return; }
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('rules')) + '</button><h2>' + esc(r.l) + '</h2><div class="sub">' + r.f.length + ' ' + esc(t('ruleFiles')) + '</div>' +
      '<div class="sec">' + r.f.map(f => '<div class="rf" style="padding:4px 0;font-size:13px">' + esc(f) + '</div>').join('') + '</div></div>';
  } else if (type === 'mcps') {
    const m = MCPS.find(x => x.f === name);
    if (!m) { app.innerHTML = '<div class="act-empty">Connector not found</div>'; return; }
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('mcps')) + '</button><h2>' + esc(m.f) + '</h2><div class="sub">' + m.s.length + ' ' + esc(t('servers')) + '</div>' +
      '<div class="sec">' + m.s.map(s => '<div style="padding:10px 0;border-bottom:1px solid var(--border)"><strong>' + esc(s.n) + '</strong><div style="font-family:var(--mono);font-size:12px;color:var(--text-3);margin-top:3px">' + esc(s.cmd || '') + '</div></div>').join('') + '</div></div>';
  } else if (type === 'hooks') {
    const h = HOOKS.find(x => x.id === name);
    if (!h) { app.innerHTML = '<div class="act-empty">Flow not found</div>'; return; }
    html = '<div class="page"><button class="back" onclick="location.hash=\\'\\'">← ' + esc(t('hooks')) + '</button><h2 style="font-family:var(--mono);font-size:18px">' + esc(h.id) + '</h2><div class="sub">' + esc(h.ev) + ' · ' + esc(h.m) + '</div><div class="sec"><p>' + esc(h.d) + '</p></div></div>';
  }
  app.innerHTML = html;
  app.querySelectorAll('.copy-btn[data-cmd]').forEach(btn => {
    btn.onclick = () => copy(btn.getAttribute('data-cmd'), btn);
  });
  if (fetchFull) loadFullPrompt(fetchFull.type, fetchFull.name, 'full-prompt-box');
}

function quickFilter(gridId, q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll('#' + gridId + ' .card').forEach(c => {
    c.style.display = (!q || c.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
}
function filterAgents(tag, btn) {
  document.querySelectorAll('#af .active').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#ag .card').forEach(c => { c.style.display = (tag === 'all' || c.dataset.tag === tag) ? '' : 'none'; });
}
function filterSkills(tag, btn) {
  document.querySelectorAll('#sf .active').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#sg .card').forEach(c => {
    c.style.display = (tag === 'all' || c.textContent.toLowerCase().includes(tag)) ? '' : 'none';
  });
}
function filterCommands(cat, btn) {
  document.querySelectorAll('#cf .active').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#cg .cmd-it').forEach(c => { c.style.display = (cat === 'all' || c.querySelector('.cc').textContent === cat) ? '' : 'none'; });
}

function openPalette() {
  document.getElementById('palette-bg').classList.add('show');
  const inp = document.getElementById('palette-input');
  inp.value = '';
  renderPalette('');
  setTimeout(() => inp.focus(), 10);
}
function closePalette() { document.getElementById('palette-bg').classList.remove('show'); }
function renderPalette(q) {
  q = q.toLowerCase().trim();
  const box = document.getElementById('palette-results');
  const items = [];
  AGENTS.filter(a => !q || a.n.toLowerCase().includes(q) || a.d.toLowerCase().includes(q)).slice(0, 5).forEach(a => items.push({ t: 'agents', n: a.n, d: a.d.slice(0, 60) }));
  SKILLS.filter(s => !q || s.n.toLowerCase().includes(q) || s.d.toLowerCase().includes(q)).slice(0, 4).forEach(s => items.push({ t: 'skills', n: s.n, d: s.d.slice(0, 60) }));
  COMMANDS.filter(c => !q || c.n.toLowerCase().includes(q) || c.d.toLowerCase().includes(q)).slice(0, 4).forEach(c => items.push({ t: 'commands', n: c.n, d: c.d.slice(0, 60) }));
  const groups = {};
  items.forEach(r => { if (!groups[r.t]) groups[r.t] = []; groups[r.t].push(r); });
  box.innerHTML = Object.entries(groups).map(([type, list]) =>
    '<div class="cmd-group-lbl">' + esc(t(type)) + '</div>' +
    list.map(r => '<div class="cmd-row" onclick="closePalette();location.hash=\\'#/' + r.t + '/' + encodeURIComponent(r.n.replace(/^\\//, '')) + '\\'">' +
      '<span class="cmd-row-name">' + esc(r.n) + '</span><span class="cmd-row-desc">' + esc(r.d) + '</span></div>'
    ).join('')
  ).join('') || '<div class="act-empty" style="border:none">No results</div>';
  palIdx = -1;
}
function onPaletteKey(e) {
  const rows = document.querySelectorAll('#palette-results .cmd-row');
  if (e.key === 'ArrowDown') { e.preventDefault(); palIdx = Math.min(palIdx + 1, rows.length - 1); rows.forEach((r, i) => r.classList.toggle('active', i === palIdx)); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); palIdx = Math.max(palIdx - 1, 0); rows.forEach((r, i) => r.classList.toggle('active', i === palIdx)); }
  else if (e.key === 'Enter' && palIdx >= 0 && rows[palIdx]) rows[palIdx].click();
  else if (e.key === 'Escape') closePalette();
}

document.addEventListener('keydown', e => {
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
  if (e.key === 'Escape') {
    const pOpen = document.getElementById('palette-bg').classList.contains('show');
    const sOpen = document.getElementById('shortcuts-bg').classList.contains('show');
    const lOpen = document.getElementById('license-bg').classList.contains('show');
    const cOpen = document.getElementById('create-bg').classList.contains('show');
    if (pOpen) closePalette();
    else if (sOpen) closeShortcuts();
    else if (lOpen) closeLicenseModal();
    else if (cOpen) closeCreateModal();
    else if (location.hash) location.hash = '';
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '?') { e.preventDefault(); openShortcuts(); return; }
  const tabMap = { '1': 'agents', '2': 'skills', '3': 'commands', '4': 'rules', '5': 'mcps', '6': 'hooks', '7': 'activity' };
  if (tabMap[e.key]) {
    const tab = tabMap[e.key];
    showTab(tab, document.querySelector('.nav-it[data-tab="' + tab + '"]'));
  }
});

applyLang();
renderPins();
handleRoute();
</script>
<script>
(function () {
  var timer = null;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function renderActivity() {
    var panel = document.getElementById('panel-activity');
    if (!panel) return;
    fetch('/api/activity')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        var entries = (data && data.entries) || [];
        var summary = '<div class="act-summary-bar"><span>Last ' + entries.length + ' tool calls</span><span class="act-pill">Live</span></div>';
        if (!entries.length) {
          panel.innerHTML = summary + '<div class="act-empty">No tool executions recorded in the active session yet.</div>';
          return;
        }
        panel.innerHTML = summary + '<div class="act-feed">' + entries.map(e => {
          var tm = ''; try { tm = new Date(e.timestamp).toLocaleTimeString(); } catch {}
          return '<div class="act-row"><span>' + esc(tm) + '</span><span style="font-weight:600">' + esc(e.tool_name) + '</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(e.input_summary) + '</span><span style="text-align:right;color:var(--text-3)">' + esc((e.session_id || '').slice(0, 8)) + '</span></div>';
        }).join('') + '</div>';
      })
      .catch(() => { panel.innerHTML = '<div class="act-empty">Could not load activity feed.</div>'; });
  }
  var origShowTab = window.showTab;
  window.showTab = function (name, btn) {
    origShowTab(name, btn);
    if (name === 'activity') {
      renderActivity();
      if (timer) clearInterval(timer);
      timer = setInterval(renderActivity, 3000);
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };
})();
</script>
</body>
</html>`;
  /* eslint-enable no-useless-escape */
}

module.exports = {
  LANG,
  LANG_KEYS,
  MODERN_SVG_LOGO,
  renderHTML,
};
