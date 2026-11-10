#!/usr/bin/env node
// =============================================================================
// fractalstyler — the consumer-facing CLI.
//
//   npx @fractaldesign/fractalstyler init     scaffold: track or eject, docs
//                                            (interactive, or flags)
//   npx @fractaldesign/fractalstyler eject    copy the styles + palettes +
//                                            registry builder into your project
//   npx @fractaldesign/fractalstyler lint     contract linter (self or <dir>)
//
// Zero dependencies beyond Node itself.
//
// Source is TypeScript (cli/main.ts, run directly on Node 22.18+ in the repo);
// the published bin is the cli/main.mjs that `pnpm build:runtime` emits.
// ============================================================================

import { spawnSync } from 'node:child_process';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInit, runEject, type ScaffoldOptions } from './scaffold.ts';

const HERE = fileURLToPath(import.meta.url);
const PKG_ROOT = join(dirname(HERE), '..');
// The sibling entry points share this file's extension — .ts everywhere.
const EXT = extname(HERE);

const USAGE = `fractalstyler — the composition styling system, as a CLI

Usage:
  fractalstyler init [options]     Scaffold a project (default command)
  fractalstyler eject [options]    Copy the styles + registry builder into your project
  fractalstyler lint [dir] [flags]  Contract linter (self mode, or a target dir)
  fractalstyler mcp               Start Model Context Protocol (MCP) server
  fractalstyler help               This message

init options:
  --track                 Track the package: styles stay in node_modules,
                          upgrades come from npm (default)
  --eject                 Eject: the style files become yours (see eject)
  --docs / --no-docs      Copy the documentation into the project
                          (default: yes)
  --docs-dir <dir>        Where docs land (default: fractalstyler/)
  --yes / -y              Non-interactive: take the defaults above

eject options (the same docs flag, plus):
  --styles-dir <dir>      Target for the style layers (default: src/lib/styles)
  --scripts-dir <dir>     Target for the registry builder (default: scripts)

Never overwrites an existing file: on a name conflict the existing file is
kept and yours is reported. Delete a kept file and re-run to re-place it.

How the styles activate:
  track:  pnpm add -D @fractaldesign/fractalstyler
          import '@fractaldesign/fractalstyler/styles'
  eject:  the copy lands in src/lib/styles/ — import it from your own tree and
          regenerate your registry after edits with node scripts/build-registry.mjs
          (Node only, no CSS toolchain needed).`;

function fail(message: string): never {
	console.error(`✕ ${message}\n`);
	console.error('Run `fractalstyler help` for usage.');
	process.exit(1);
}

const args = process.argv.slice(2);
const command = args[0] && !args[0].startsWith('-') ? args[0] : 'init';
const rest = args[0] && !args[0].startsWith('-') ? args.slice(1) : args;

type DirOption = 'docsDir' | 'stylesDir' | 'scriptsDir';

function parseOptions(rest: string[]): ScaffoldOptions {
	const opts: ScaffoldOptions = {
		mode: null,
		docs: null,
		docsDir: 'fractalstyler',
		stylesDir: 'src/lib/styles',
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
			case '--yes': case '-y': opts.yes = true; break;
			case '--docs-dir': case '--styles-dir': case '--scripts-dir': {
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
		// flags (--json, --own, --registry).
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
