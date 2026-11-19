# Contract Lint

The mechanical half of the Verification Contract. `fractalstyler lint` checks markup and stylesheets against the closed-world rules and prints an agent-facing fix for every violation - it is the fastest way to prove a conversion did not drift, and it is what `pnpm check` runs inside the Fractalstyler package.

It lives in the Fractalstyler package at `lint/cli.ts` (source) and ships as the `fractalstyler-lint` bin. Every command and behaviour below was run against the package at `~/fractaldesign/packages/fractalstyler`; re-check with `--help` after an update.

## Running It

```bash
F=~/fractaldesign/packages/fractalstyler
node $F/lint/cli.ts /absolute/path/to/project          # audit a consuming project
node $F/lint/cli.ts /absolute/path/to/project --json   # machine-readable, for CI or yourself
node $F/lint/cli.ts                                    # self mode: audit the package itself
npx fractalstyler-lint /absolute/path/to/project       # via the published bin
```

Flags: `--json`, `--own <file>` (the project's extension stylesheet, default `<dir>/src/lib/styles/custom.css`), `--registry <file>` (registry override), `--help`.

**`"."` does not mean the current directory.** The CLI routes a target of `.` or nothing to *self mode*, which audits the Fractalstyler package - so `lint/cli.ts .` reports a clean bill of health for the wrong tree. Always pass an absolute path (or a real relative one like `./..`). This is the single easiest way to be fooled by this tool.

Exit codes: `0` clean or warnings only, `1` at least one error, `2` the linter itself crashed. Warnings never fail a run, so `exit 0` is not "nothing to improve" - read the output.

## What It Scans

A consumer run walks the whole target directory, skipping `node_modules`, `dist`, `.svelte-kit`, `.git`, `reserve` and any dot-directory, and lints:

- **`*.svelte`** - for style blocks, inline styles, and unknown classes.
- **`*.css` / `*.scss` / `*.sass`** - for token purity, Sass nesting, and hardcoded radius. `index.css` is skipped by design (it is the package's own composition).

The class allowlist is the package's `registry.json` **unioned with every selector harvested from your `custom.css`** - so anything you define there is allowed project-wide, not scoped to the file that uses it. Keep `custom.css` small and honest; a bloated one silences the unknown-class rule for its own mistakes.

Token validation accepts any custom property the registry knows **or** any property your own stylesheets declare (`--x: value` anywhere in the tree), so a theme file's tokens pass without registration.

## The Rules

| Rule | Severity | Catches |
|:---|:---|:---|
| `fs/no-in-component-styles` | error | a `<style>` block in a `.svelte` file |
| `fs/no-inline-styles` | error | a `style=` attribute in markup |
| `fs/unknown-class` | error | a class in markup that is in neither the registry nor `custom.css` |
| `fs/token-purity` | error | raw hex, any pixel literal above 2px, or a `var(--x)` that resolves nowhere |
| `fs/hardcoded-radius` | warning | a `border-radius` value that is not `0`, a keyword, or `var(--radius-*)` |
| `fs/sass-nesting` | **error** | `&` in a plain-CSS selector, which the browser never sees |

Each diagnostic carries the rule id, file, line, what was found, **why the system forbids it**, and a prescriptive fix. Read the rationale - it is the golden rules in the linter's own words, and it is the reason the tool is worth running rather than grepping.

The pixel budget is exactly as the golden rules say: `1px` and `2px` literals pass (hairlines, borders), `3px` and above fail.

## Reading Output

Human mode draws one box per violation with the fix inside it - good for a terminal, bad for parsing. `--json` is a flat array of `{ rule, severity, file, line, column?, found, rationale, suggestion }`, which is what you want when you intend to act on it in bulk:

```bash
node $F/lint/cli.ts /abs/project --json | node -e "
const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
const by={}; for (const x of d) by[x.rule]=(by[x.rule]??0)+1;
console.table(by);"
```

`fs/unknown-class` and unmapped-token diagnostics include fuzzy suggestions ("Did you mean `.lift`, `.tilt`, `.link`?") generated from the registry. They are *hints from a string-distance function, not valid classes by association* - confirm any suggestion you act against in `registry.md`.

## Known Blind Spots

Green does not mean compliant. These were verified against the tool, and they are the reason the Verification Contract also has visual checks:

- **`class={`…`}` is not scanned.** A template-literal class attribute slips through entirely - `class={`box wibble4`}` reported zero violations. Only `class="…"` and `class='…'` are harvested, plus `class:foo` directives.
- **`class:list=[…]` is reported as an unknown class `.list`.** A false positive on legitimate Svelte - the `class:` directive regex does not know about `class:list`. Rewrite the element with a quoted class attribute to clear it, or note it as tool noise in your report rather than "fixing" correct code.
- **Only the first `<style>` block and the first `style=` per file are reported.** One file can hide several.
- **Interpolated fragments are skipped** (`class="box {active ? 'on' : ''}"` checks `box`, not `on`), so conditional class strings need a human.
- **Plain `.html`, `.js` and `.ts` templates are not scanned at all** - markup inside a JS string is invisible to it.
- **Suffix escapes:** any class ending `-mob` or `-desk` is allowed without existing, as are registry *stems*, which can let a plausible near-miss through.
- **Registry freshness:** the allowlist comes from the *package's* `registry.json`. If the installed package is older than the classes in the project, current classes flag as unknown. Regenerate in the package (`pnpm registry`) or pass `--registry` at the right file before believing an `fs/unknown-class` wave.

## Using It In The Workflow

1. **Migration Phase 0** - run it on the untouched project and keep the count. That is the drift baseline; a conversion that ends higher than it started did not convert everything.
2. **After each phase** - run it again on the touched subtree, fix every error, and re-run until `0 errors`. Do not batch this to the end; each phase's mistakes are cheapest while that phase is still in working memory.
3. **Before claiming done** - one full run, and quote its result line ("Result: 0 violations", or what remains and why) in the report. A completion claim without the linter's output is unverified.
4. **`custom.css` discipline** - because everything in it is allowlisted globally, treat additions as review-worthy: run the linter with `--own /dev/null` to see what would fail without your extensions, and keep that set minimal and commented.
5. **Take warnings seriously, but verify them.** `fs/hardcoded-radius` is the only warning-level rule, so a run can exit 0 with it still naming corners the shape axis cannot reach. It has one known false positive: `border-radius: var(--radius-sm);` is flagged because the declaration's trailing `;` is captured with the value - a token-routed radius is exactly what the rule asks for, so confirm before "fixing" correct code.

Related: `./mcp-tools.md` for interactive class lookup, `./migration.md` for where these runs sit in a conversion, `./canonical-markups.md` for the structures the linter cannot judge.
