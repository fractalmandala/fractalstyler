// =============================================================================
// Agent-first diagnostic formatter.
//
// Box-drawing output is deliberate: it survives terminal piping and gives
// coding agents an unambiguous, self-describing block per violation, with a
// prescriptive fix.
// =============================================================================

const LABEL = 'FRACTALSTYLER';

export function reportDiagnostics(diagnostics, options = {}) {
	const { json = false, ok = 'All styling system contracts verified. 0 violations found.' } = options;

	if (json) {
		console.log(JSON.stringify(diagnostics, null, 2));
		return;
	}

	if (diagnostics.length === 0) {
		console.log(`\n\x1b[32m✔ ${ok}\x1b[0m\n`);
		return;
	}

	console.log(
		`\n\x1b[1m\x1b[31m[${LABEL}] Found ${diagnostics.length} system contract violation${diagnostics.length > 1 ? 's' : ''}:\x1b[0m\n`
	);

	for (const d of diagnostics) {
		const isError = d.severity === 'error';
		const badgeColor = isError ? '\x1b[31m' : '\x1b[33m';
		const loc = d.line ? `${d.file}:${d.line}${d.column ? `:${d.column}` : ''}` : d.file;

		console.log(`${badgeColor}┌─ [${LABEL} ${d.severity.toUpperCase()}: ${d.rule}] ─────────────────────────────────────────────\x1b[0m`);
		console.log(`│ \x1b[1mLocation:\x1b[0m ${loc}`);
		console.log(`│ \x1b[1mFound:\x1b[0m    \x1b[36m${d.found}\x1b[0m`);
		console.log(`├─ \x1b[1m[SYSTEM RATIONALE]\x1b[0m`);
		console.log(`│  ${d.rationale}`);
		console.log(`├─ \x1b[1m\x1b[32m[PRESCRIPTIVE AGENT FIX]\x1b[0m`);

		const suggestionLines = String(d.suggestion || '').split('\n');
		for (const sLine of suggestionLines) {
			console.log(`│  \x1b[32m${sLine}\x1b[0m`);
		}
		console.log(`${badgeColor}└─────────────────────────────────────────────────────────────────────────────────\x1b[0m\n`);
	}

	const errors = diagnostics.filter((d) => d.severity === 'error').length;
	const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

	console.log(`\x1b[1mResult: ${errors} error${errors === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}.\x1b[0m\n`);
}
