#!/usr/bin/env node
// =============================================================================
// fractalstyler browser — interactive styling classes registry browser.
//
// Opens the class registry as a searchable, zero-dependency browser page.
// Usage:
//   node lint/browser.mts           # opens in default browser
//   node lint/browser.mts --out <f> # writes HTML to specific file
// =============================================================================

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderBrowserHtml } from '../scripts/class-vocab.ts';

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
