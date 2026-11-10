#!/usr/bin/env node
// The bin launcher — the linter itself is lint/cli.ts.
import { run } from '../runtime/run.mjs';

await run(new URL('./cli.ts', import.meta.url).href);
