/**
 * fractalstyler — the canonical styling system.
 *
 * The stylesheet is not imported here: add
 * `import '@fractaldesign/fractalstyler/styles'` (or the compiled
 * `@fractaldesign/fractalstyler/css`) once in your entry file.
 *
 * This module carries the vocabulary: the variant sets and the token names,
 * so a consumer can build its own controls without re-listing what the
 * system already owns.
 */
export const name = 'fractalstyler';

// Keep in step with package.json — the release checklist regenerates it.
export const version = '1.5.0';

export * from './layout/index.js';

export type { FractalstylerTokens, FractalstylerToken } from './tokensRegistry.js';

