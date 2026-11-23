#!/usr/bin/env node
'use strict';

/**
 * Aetheris Public Preview Builder
 * Generates a clean, locked public-preview repository in dist-public-preview/
 * where full prompts are redacted and downloads/exports require a full license.
 */

const fs = require('fs');
const path = require('path');

const { loadPlatformData } = require('./loaders');
const { renderHTML } = require('./template');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'dist-public-preview');
const SOL_ADDRESS = '3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm';

const LOCKED_FOOTER = [
  '',
  '---',
  '### [LOCKED — AETHERIS FULL LICENSE REQUIRED]',
  '',
  'This is the **Public Preview Edition** of Aetheris.',
  'Full system prompts, production workflows, and repository downloads are reserved for licensed contributors.',
  '',
  `- **Contribute with Solana (SOL):** \`${SOL_ADDRESS}\``,
  `- **Solana Pay:** \`solana:${SOL_ADDRESS}?label=Aetheris%20Full%20License\``,
  '- See `LICENSING.md` for full license activation & private repository access.',
  '',
].join('\n');

function redactMarkdown(raw, previewChars = 360) {
  const fmMatch = raw.match(/^---\n[\s\S]*?\n---\n*/);
  const fm = fmMatch ? fmMatch[0] : '';
  const body = raw.slice(fm.length).trim();
  const snippet = body.slice(0, previewChars).trim();
  return `${fm}${snippet}${body.length > previewChars ? '...\n' : '\n'}${LOCKED_FOOTER}`;
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest, transformFn = null) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    if (entry === 'node_modules' || entry === '.git') continue;
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) {
      copyDir(s, d, transformFn);
    } else if (transformFn && entry.endsWith('.md')) {
      const content = fs.readFileSync(s, 'utf8');
      fs.writeFileSync(d, transformFn(content, s), 'utf8');
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function buildPublicPreview() {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Copy core web platform (configured to boot in preview/locked mode by default)
  copyDir(path.join(ROOT, 'scripts', 'aetheris'), path.join(OUT, 'scripts', 'aetheris'));
  const entrySrc = fs.readFileSync(path.join(ROOT, 'scripts', 'aetheris-web.js'), 'utf8');
  const previewEntry = entrySrc.replace(
    "'use strict';",
    "'use strict';\nif (!process.env.AETHERIS_EDITION) process.env.AETHERIS_EDITION = 'preview';"
  );
  fs.writeFileSync(path.join(OUT, 'scripts', 'aetheris-web.js'), previewEntry, 'utf8');

  // 2. Copy brand & QR assets
  copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));

  // 3. Copy REDACTED/PREVIEW agents, skills, commands, and rules
  copyDir(path.join(ROOT, 'agents'), path.join(OUT, 'agents'), raw => redactMarkdown(raw, 340));
  copyDir(path.join(ROOT, 'skills'), path.join(OUT, 'skills'), raw => redactMarkdown(raw, 280));
  copyDir(path.join(ROOT, 'commands'), path.join(OUT, 'commands'), raw => redactMarkdown(raw, 220));
  copyDir(path.join(ROOT, 'rules'), path.join(OUT, 'rules'), raw => redactMarkdown(raw, 200));

  // 4. Copy minimal metadata, hooks preview, and documentation
  for (const file of ['README.md', 'LICENSING.md', 'VERSION', 'LICENSE', '.gitignore']) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) copyFile(src, path.join(OUT, file));
  }
  if (fs.existsSync(path.join(ROOT, 'docs', 'DOCUMENTATION.md'))) {
    copyFile(path.join(ROOT, 'docs', 'DOCUMENTATION.md'), path.join(OUT, 'docs', 'DOCUMENTATION.md'));
  }

  // 5. Write clean preview package.json
  const previewPkg = {
    name: 'aetheris-preview',
    version: '4.0.0',
    description: 'Aetheris — AI Automation Platform (Public Preview Edition). Contribute in SOL for Full Licensed Repository access.',
    license: 'SEE LICENSE IN LICENSING.md',
    scripts: {
      start: 'AETHERIS_EDITION=preview node scripts/aetheris-web.js',
      aetheris: 'AETHERIS_EDITION=preview node scripts/aetheris-web.js',
    },
    engines: { node: '>=18' },
  };
  fs.writeFileSync(path.join(OUT, 'package.json'), JSON.stringify(previewPkg, null, 2) + '\n', 'utf8');

  // 6. Generate static GitHub Pages index.html (live interactive Preview Edition!)
  const previewData = loadPlatformData(OUT);
  let staticHtml = renderHTML(previewData, { port: 4820, edition: 'preview' });
  staticHtml = staticHtml
    .replaceAll('src="/brand-logo.png"', 'src="./assets/brand-logo.png"')
    .replaceAll('src="/sol-qr.png"', 'src="./assets/sol-qr.png"')
    .replaceAll('src="/avatar.png"', 'src="./assets/aetheris-avatar.png"')
    // On static GitHub Pages (no Node backend), resolve /api/item & /api/playground/run locally from embedded preview data
    .replace(
      "fetch('/api/item?type=' + encodeURIComponent(type) + '&name=' + encodeURIComponent(name))",
      "Promise.resolve({ ok: true, json: () => Promise.resolve({ content: (type==='agents' ? (AGENTS.find(x=>(x.f===name||x.n===name))||{}).b : type==='skills' ? (SKILLS.find(x=>x.n===name)||{}).b : (COMMANDS.find(x=>(x.f===name||x.n==='/'+name))||{}).b) || 'Preview locked. Contribute in SOL for full prompt.' }) })"
    )
    .replace(
      "fetch('/api/playground/status')",
      "Promise.resolve({ ok: true, json: () => Promise.resolve({ ollama: { available: false, models: [] }, anthropic: { available: false }, openai: { available: false } }) })"
    )
    .replace(
      "fetch('/api/playground/run', {",
      "Promise.resolve({ ok: true, json: () => Promise.resolve({ provider: 'preview-mode', model: 'aetheris-preview', reply: 'Public Preview Mode (GitHub Pages):\\nSelected agent: ' + agentName + '\\nInput: ' + msg + '\\n\\nContribute in SOL (3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm) to unlock the Full Local Private Repository with live Ollama / OpenAI / Anthropic execution.' }) }); if (false) fetch('/api/playground/run', {"
    );
  fs.writeFileSync(path.join(OUT, 'index.html'), staticHtml, 'utf8');
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');

  console.log('[AETHERIS] Built Public Preview Edition + GitHub Pages index.html at:', OUT);
}

if (require.main === module) {
  buildPublicPreview();
}

module.exports = { buildPublicPreview, SOL_ADDRESS };
