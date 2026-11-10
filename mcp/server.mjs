#!/usr/bin/env node
// The bin launcher — the server itself is mcp/server.ts.
import { run } from '../runtime/run.mjs';

await run(new URL('./server.ts', import.meta.url).href);
