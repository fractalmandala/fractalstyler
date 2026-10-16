// =============================================================================
// Levenshtein distance & fuzzy match suggestions.
// Zero dependencies. Used to suggest closest registered classes/tokens to agents.
// =============================================================================

function levenshtein(a: string, b: string): number {
	const m = a.length;
	const n = b.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));

	for (let i = 0; i <= m; i++) dp[i][0] = i;
	for (let j = 0; j <= n; j++) dp[0][j] = j;

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,      // deletion
				dp[i][j - 1] + 1,      // insertion
				dp[i - 1][j - 1] + cost // substitution
			);
		}
	}
	return dp[m][n];
}

/** Finds closest matches in a candidates set or array. */
export function findClosestMatches(
	target: string,
	candidates: Iterable<string>,
	maxResults = 3,
	maxDistance = 4
): string[] {
	const scored: { cand: string; dist: number }[] = [];
	for (const cand of candidates) {
		const dist = levenshtein(target, cand);
		if (dist <= maxDistance) {
			scored.push({ cand, dist });
		}
	}
	scored.sort((a, b) => a.dist - b.dist);
	return scored.slice(0, maxResults).map((s) => s.cand);
}
