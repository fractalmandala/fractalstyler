#!/usr/bin/env node
// =============================================================================
// fractalstyler browser — interactive styling classes registry browser.
//
// Opens the class registry as a searchable, zero-dependency browser page.
// Usage:
//   node lint/browser.ts           # opens in default browser
//   node lint/browser.ts --out <f> # writes HTML to specific file
// =============================================================================

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = path.join(PKG_ROOT, 'registry.json');

function usage() {
	console.log(`Usage:
  fractalstyler browser [dir]     # open registry browser
Options:
  --registry <f>  registry.json override
  --out <file>    write HTML to file instead of opening`);
}

function openInBrowser(file: string): boolean {
	const opener =
		process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
	const args = process.platform === 'win32' ? ['/c', 'start', '', file] : [file];
	try {
		execFileSync(opener, args, { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const args = process.argv.slice(2);
	let out: string | undefined;
	let registryOverride: string | undefined;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--out') out = args[++i];
		else if (args[i] === '--registry') registryOverride = args[++i];
		else if (args[i] === '--help' || args[i] === '-h') {
			usage();
			process.exit(0);
		}
	}

	const regFile = registryOverride ? path.resolve(registryOverride) : REGISTRY_PATH;
	if (!fs.existsSync(regFile)) {
		console.error(`Registry file not found at: ${regFile}. Run "pnpm registry" first.`);
		process.exit(1);
	}

	const data = JSON.parse(fs.readFileSync(regFile, 'utf8'));
	const html = renderBrowserHtml(data);

	const target = out ? path.resolve(out) : path.join(os.tmpdir(), `fractalstyler-browser-${process.pid}.html`);
	fs.writeFileSync(target, html, 'utf8');

	if (out) {
		console.log(`✔ Registry browser page written to: ${target}`);
		return;
	}

	console.log(`✔ Registry: ${regFile}`);
	console.log(`✔ Opening browser page: ${target}`);
	if (!openInBrowser(target)) {
		console.log(`Open file in your browser: file://${target}`);
	}
}

main();

/** A registry row, as the browser page reads it. */
interface BrowserRow {
	class: string;
	file: string;
	property?: string;
	description?: string;
}

/** The registry browser page — a searchable view of the same rows. */
function renderBrowserHtml(entries: unknown): string {
	const rows: BrowserRow[] = Array.isArray(entries) ? (entries as BrowserRow[]) : [];
	const layers = [...new Set(rows.map((row) => row.file))];

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fractalstyler — Class Registry Browser</title>
<style>
	:root { color-scheme: light dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; }
	body { margin: 0; padding: 24px; background: Canvas; color: CanvasText; }
	header { max-width: 1200px; margin: 0 auto 16px; }
	h1 { font-size: 20px; margin: 0 0 6px; letter-spacing: 0.04em; }
	.sub { opacity: .75; font-size: 13px; margin-bottom: 12px; }
	.controls { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
	input, select { font: inherit; padding: 6px 12px; border: 1px solid color-mix(in oklab, CanvasText 20%, Canvas); border-radius: 6px; background: Canvas; color: CanvasText; font-size: 13px; }
	input { flex: 1; min-width: 260px; font-family: ui-monospace, monospace; }
	table { width: 100%; max-width: 1200px; margin: 0 auto; border-collapse: collapse; font-size: 13px; }
	th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid color-mix(in oklab, CanvasText 12%, Canvas); vertical-align: top; }
	th { position: sticky; top: 0; background: Canvas; font-weight: 600; }
	code { font-family: ui-monospace, monospace; font-weight: 600; color: #059669; }
	.file { font-family: ui-monospace, monospace; font-size: 11px; opacity: .7; }
	.desc { opacity: .9; }
	.prop { font-family: ui-monospace, monospace; font-size: 11px; opacity: .7; margin-top: 2px; }
	.empty { opacity: .6; padding: 32px 0; text-align: center; }
</style>
</head>
<body>
<header>
	<h1>FRACTALSTYLER REGISTRY BROWSER</h1>
	<div class="sub" id="totals">Loading...</div>
	<div class="controls">
		<input id="q" type="search" placeholder="Search class name, description, or property..." autofocus>
		<select id="fileFilter">
			<option value="">All stylesheets</option>
${layers.map((file) => `\t\t\t<option value="${file}">${file}</option>`).join('\n')}
		</select>
	</div>
</header>
<table>
	<thead>
		<tr>
			<th style="width: 22%">Class</th>
			<th style="width: 18%">Stylesheet</th>
			<th>Description &amp; Property</th>
		</tr>
	</thead>
	<tbody id="rows"></tbody>
</table>
<div class="empty" id="empty" hidden>No matching classes found.</div>

<script>
const DATA = ${JSON.stringify(rows)};
const rows = document.getElementById('rows');
const empty = document.getElementById('empty');
const q = document.getElementById('q');
const fileFilter = document.getElementById('fileFilter');
const totals = document.getElementById('totals');

totals.textContent = \`\${DATA.length} canonical classes indexed from the system stylesheets\`;

function render() {
	const needle = q.value.trim().toLowerCase();
	const file = fileFilter.value;
	const out = [];

	for (const item of DATA) {
		if (file && item.file !== file) continue;
		const name = (item.class || '').toLowerCase();
		const desc = (item.description || '').toLowerCase();
		const prop = (item.property || '').toLowerCase();
		if (needle && !(name.includes(needle) || desc.includes(needle) || prop.includes(needle))) continue;

		out.push(\`<tr>
			<td><code>\${item.class}</code></td>
			<td><span class="file">\${item.file}</span></td>
			<td>
				<div class="desc">\${item.description || '—'}</div>
				\${item.property ? \`<div class="prop">\${item.property}</div>\` : ''}
			</td>
		</tr>\`);
	}

	rows.innerHTML = out.join('');
	empty.hidden = out.length > 0;
}

q.addEventListener('input', render);
fileFilter.addEventListener('change', render);
render();
</script>
</body>
</html>
`;
}
