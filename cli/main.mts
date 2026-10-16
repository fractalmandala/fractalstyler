#!/usr/bin/env node
// =============================================================================
// fractalstyler — the consumer-facing CLI.
//
//   npx @fractaldesign/fractalstyler init     scaffold: track or eject, docs,
//                                            intellisense (interactive, or flags)
//   npx @fractaldesign/fractalstyler eject    copy the styles + palettes +
//                                            registry builder into your project
//   npx @fractaldesign/fractalstyler lint     contract linter (self or <dir>)
//
// Zero dependencies beyond Node itself.
//
// Source is TypeScript (cli/main.mts, run directly on Node 24 in the repo);
// the published bin is the cli/main.mjs that `pnpm build:runtime` emits.
// ============================================================================

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInit, runEject, type ScaffoldOptions } from './scaffold.mts';

const HERE = fileURLToPath(import.meta.url);
const PKG_ROOT = join(dirname(HERE), '..');
// The sibling entry points share this file's extension: .mjs when compiled
// (the published package), .mts when run from source in the repo.
const EXT = extname(HERE);

const USAGE = `fractalstyler — the composition styling system, as a CLI

Usage:
  fractalstyler init [options]     Scaffold a project (default command)
  fractalstyler eject [options]    Copy the styles sources into your project
  fractalstyler lint [dir] [flags]  Contract linter (self mode, or a target dir)
  fractalstyler mcp               Start Model Context Protocol (MCP) server
  fractalstyler help               This message

init options:
  --track                 Track the package: styles stay in node_modules,
                          upgrades come from npm (default)
  --eject                 Eject: the style files become yours (see eject)
  --docs / --no-docs      Copy the registry + configurations docs into the
                          project (default: yes)
  --docs-dir <dir>        Where docs land (default: fractalstyler/)
  --intellisense / --no-intellisense
                          Write .vscode settings for the Fractalstyler
                          extension and check it is installed (default: ask;
                          --yes takes yes)
  --yes / -y              Non-interactive: take the defaults above

eject options (same docs/intellisense flags, plus):
  --styles-dir <dir>      Target for the style layers (default: src/lib/styles)
  --palette-dir <dir>     Target for the palette modules (default: src/lib/palette)
  --scripts-dir <dir>     Target for the registry builder (default: scripts)

Never overwrites an existing file: on a name conflict the existing file is
kept and yours is reported. Delete a kept file and re-run to re-place it.

How the styles activate:
  track:  pnpm add -D @fractaldesign/fractalstyler
          @use '@fractaldesign/fractalstyler/styles' as *
          (or plain CSS: import '@fractaldesign/fractalstyler/css')
  eject:  the copy lands in src/lib/styles/ — import it from your own tree and
          regenerate your registry after edits with node scripts/build-registry.mjs
          (Node only, no Sass needed).`;

function fail(message: string): never {
	console.error(`✕ ${message}\n`);
	console.error('Run `fractalstyler help` for usage.');
	process.exit(1);
}

const args = process.argv.slice(2);
const command = args[0] && !args[0].startsWith('-') ? args[0] : 'init';
const rest = args[0] && !args[0].startsWith('-') ? args.slice(1) : args;

type DirOption = 'docsDir' | 'stylesDir' | 'paletteDir' | 'scriptsDir';

function parseOptions(rest: string[]): ScaffoldOptions {
	const opts: ScaffoldOptions = {
		mode: null,
		docs: null,
		intellisense: null,
		docsDir: 'fractalstyler',
		stylesDir: 'src/lib/styles',
		paletteDir: 'src/lib/palette',
		scriptsDir: 'scripts',
		yes: false
	};
	for (let i = 0; i < rest.length; i++) {
		const arg = rest[i];
		switch (arg) {
			case '--track': opts.mode = 'track'; break;
			case '--eject': opts.mode = 'eject'; break;
			case '--docs': opts.docs = true; break;
			case '--no-docs': opts.docs = false; break;
			case '--intellisense': opts.intellisense = true; break;
			case '--no-intellisense': opts.intellisense = false; break;
			case '--yes': case '-y': opts.yes = true; break;
			case '--docs-dir': case '--styles-dir': case '--palette-dir': case '--scripts-dir': {
				const value = rest[++i];
				if (!value) fail(`${arg} needs a value.`);
				opts[(arg.slice(2, -4) + 'Dir') as DirOption] = value.replace(/[/\\]+$/, '');
				break;
			}
			default:
				fail(`unknown option: ${arg}`);
		}
	}
	return opts;
}

switch (command) {
	case 'init': {
		const opts = parseOptions(rest);
		await runInit(opts, PKG_ROOT);
		break;
	}
	case 'eject': {
		const opts = parseOptions(rest);
		opts.mode = 'eject';
		await runEject(opts, PKG_ROOT);
		break;
	}
	case 'lint': {
		// Delegate to the contract linter verbatim — it already understands
		// self mode (no args) and consumer mode (`lint <dir>`), plus its own
		// flags (--json, --own, --registry). The linter compiles the stylesheet
		// for exact matching, so it needs `sass` — an optional peer of this
		// package. Check up front and say how to get it, instead of letting the
		// consumer watch a module-resolution crash.
		const require = createRequire(import.meta.url);
		try {
			require.resolve('sass', { paths: [process.cwd(), PKG_ROOT] });
		} catch {
			console.error('✕ lint needs the Sass compiler, which is not installed here.');
			console.error('  It is an optional peer of this package — add it, then re-run:');
			console.error('    pnpm add -D sass      (or: npm i -D sass)');
			process.exit(1);
		}
		const lint = join(PKG_ROOT, 'lint', `cli${EXT}`);
		const result = spawnSync(process.execPath, [lint, ...rest], { stdio: 'inherit' });
		process.exit(result.status ?? 1);
		break;
	}
	case 'mcp': {
		const mcpServer = join(PKG_ROOT, 'mcp', `server${EXT}`);
		const result = spawnSync(process.execPath, [mcpServer, ...rest], { stdio: 'inherit' });
		process.exit(result.status ?? 0);
		break;
	}
	case 'help': case '--help': case '-h':
		console.log(USAGE);
		break;
	default:
		fail(`unknown command: ${command}`);
}
