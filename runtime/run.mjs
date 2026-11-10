// =============================================================================
// run — the launcher the bins use.
//
// Node refuses to strip types for files under node_modules
// (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING): a package that ships
// TypeScript cannot be run by `node file.ts` once it is installed.
//
// So the bins are three-line launchers that register a load hook which strips
// the types itself, and then import the real entry point. The package ships
// TypeScript only — there is no compiled copy of anything.
//
//   node --version   →  22.18 or newer (registerHooks, stripTypeScriptTypes)
// =============================================================================

import { registerHooks, stripTypeScriptTypes } from 'node:module';
import { readFileSync } from 'node:fs';

// The experimental warning is noise for the person running the CLI — but any
// other warning still gets through.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) => {
	const text = typeof warning === 'string' ? warning : (warning?.message ?? '');
	if (text.includes('stripTypeScriptTypes')) return;
	emitWarning.call(process, warning, ...rest);
};

registerHooks({
	load(url, context, nextLoad) {
		if (!url.endsWith('.ts')) return nextLoad(url, context);
		const source = readFileSync(new URL(url), 'utf8');
		return {
			format: 'module',
			source: stripTypeScriptTypes(source, { mode: 'strip' }),
			shortCircuit: true
		};
	}
});

/** Load a TypeScript module, given its URL, and return what it exports. */
export async function run(url) {
	return import(url);
}
