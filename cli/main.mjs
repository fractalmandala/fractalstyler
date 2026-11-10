#!/usr/bin/env node
// The bin launcher — the CLI itself is cli/main.ts.
import { run } from '../runtime/run.mjs';

await run(new URL('./main.ts', import.meta.url).href);
