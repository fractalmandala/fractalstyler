---
title: Development
description: The support files — the scripts, the CLI, the linter and the MCP server — and how to update and publish the package.
---

## Tokens Registry

The canonical file for all tokens is `tokensRegistry.ts`. This is generated via script file `scripts/build-tokens-registry.ts` and should never be created/edited by hand. 

```bash
node scripts/build-tokens-registry.ts
# or
npm run tokens
# also wired into npm run build, so the shipped file is never stale
```

The build script applies the rule that a **custom property is a system token only when it is declared in a global scope**. The generator walks every `.css` file, tracks the selector stack, and keeps declarations from `:root`, `html`, `body` and `[data-mode='light'|'dark']`.

Types are inferred: a bare number is `number` (z-sticky, z-100…z-999), everything else is `string` (bp-sm: 769px is a string, --fit-height: calc(…) is a string).

## Parser - `scripts/css.ts`

A module the imported by other scripts. It knows how to read plain CSS. Change it only when the stylesheet grows a syntax the parsing does not understand. 

| Export | What it answers |
|:---|:---|
| `parseCss(css)` | What are the rules, the at-rules and the declarations? |
| `splitSelectorList(selector)` | Where does a selector list end? (brackets and parens nest) |
| `classesIn(selector)` | Which class names does this selector name? |
| `isGlobalSelector(selector)` | Is this `:root` / `html` / `body` / `[data-mode]`? |
| `collectGlobalTokens(css)` | Which custom properties are SYSTEM tokens? |
| `resolveCssLayers(entry)` | Which files does `index.css` pull in, in order? |

## Update Registry - `scripts/update-registry.ts`

Generates the current Fractalstyler registry. Must be run each time there is a change to the .css files - even addition/editing a single class/token. 

```bash
npm run registry
# or
node scripts/update-registry.ts
```

```
✔ Registry written: 482 classes, 137 tokens.
  Emit: registry.json, registry.md, skills/fractalstyler/references/{fractals,tokens}.md
```

The script reads every stylesheet in `src/lib/styles` and
works out which classes exist, what declares them, what they do and where they
live. The rules it follows:

- a class name is registered wherever it appears — in the subject (`.gap-xs`)
  or as an ancestor (`.prose-content` in `.prose-content p`);
- a class is one class, however many stylesheets mention it — the first
  mention in cascade order wins;
- a compound selector gives the extra class a parent (`.xcenter` → `.box`);
- a custom property is a system token only in a global scope.

It gives each class a description. Using either a curated map set within the script, or the understanding of family ladders, and declarations describing simply what is set by a class. Outputs the following canonical files:

| Output | What it is |
|:---|:---|
| `registry.json` | the machine API — the linter and the MCP server validate against it |
| `registry.md` | the human index, at the package root |
| `skills/…/fractals.md` | the class list an agent reads |
| `skills/…/tokens.md` | the token list an agent reads |

**Run it after every change to a stylesheet**, before you ship: a new class, a
renamed class, a deleted class. It is wired into `npm run build`, so the
published registry is never stale.

Use `--report` when a class is missing from the registry, or when you want to see the warnings:

```bash
node scripts/update-registry.ts --report
```

```
✔ Extracted 482 classes and 137 tokens.
  configurations.css             1
  gaps-pads-margins.css          136
  ...
  ⚠ component-props.css: Sass nesting in a plain CSS file — "&.variant-info"
```

The warning line matters: `&` is Sass nesting, and in a plain `.css` file the
browser drops the whole rule, so any class in that list is dead.

## Documentation - `scripts/validate-deck.ts`

Checks that the documentation never names a class that does not exist.

```bash
npm run validate:deck
# or: node scripts/validate-deck.ts
```

```
✓ validated 21 files — 20 class references, none invented, no phantom API, framing consistent
```

It validates — `docs/*.md`, `skills/**`, `README.md`, `AGENTS.md` — and checks:

| Check | What it catches |
|:---|:---|
| class references | a class in `class="…"` that the stylesheet does not define |
| phantom API | prose teaching `+stack`, `space()`, `@use 'fractals'` — the mixin API that never shipped |
| links and anchors | a markdown link whose target does not exist, and an `#anchor` that points at no heading |
| stated counts | a doc saying "31 colour tokens" when the CSS has 30 |
| framing | a surface describing the system as SASS-only |

**Run it before you commit** — it is part of `npm run check`, so it fails CI.

## The CLI - `cli/`

Two files. The command line, and the engine behind it.

### `cli/main.ts` — the commands

| Command | What it does |
|:---|:---|
| `init` | Scaffold a project: track the package or eject the styles, and copy the documentation |
| `eject` | Copy the style layers and the registry builder into the current project |
| `lint [dir]` | Delegate to the contract linter (`lint/cli.ts`) |
| `mcp` | Delegate to the MCP server (`mcp/server.ts`) |
| `help` | The usage text |

It is the only file that parses arguments, and it does one thing well: it
resolves the options and hands them to `scaffold.ts`, or spawns the linter or
the MCP server as a child process.

The sibling entry points are found by extension, so the same file works
whether it runs from the repository (`.ts`) or from `node_modules`.

### `cli/scaffold.ts` — the init/eject engine

Two ways a project can hold the styles:

- **track** — the package stays in `node_modules`; the stylesheet is imported
  from it; upgrades come from npm. Only the documentation is placed into the
  project.
- **eject** — the layers and the registry builder are copied into the project.

What `eject` copies:

| From | To |
|:---|:---|
| `src/lib/styles/*.css` (14 layers + `index.css`) | `src/lib/styles/` |
| a seeded `custom.css` — the sanctioned extension point | `src/lib/styles/custom.css` |
| `scripts/update-registry.ts`, `scripts/css.ts` | `scripts/` |
| `runtime/run.mjs` — the launcher that loads the TypeScript | `scripts/run.mjs` |
| a `build-registry.mjs` wrapper | `scripts/` |
| `docs/**` | the docs directory |

The builder is TypeScript, and `run.mjs` is copied with it: a consumer's
package.json may say `"type": "commonjs"` (npm init writes it), and then Node
would read a `.ts` file as CommonJS and fail on its first `import`. The
launcher loads it as ESM whatever the project says.

**Nothing is ever overwritten.** On a name conflict the existing file is kept
and reported — the copy never clobbers what the user already wrote.

**Change it when** the install flow changes: a new flag, a new file to copy, a
different default directory.

## The linter - `lint/`

Seven files: the command, and six that do the checking.

### `lint/cli.ts` — the command

Two modes:

| Mode | Command | What it audits |
|:---|:---|:---|
| self | `node lint/cli.ts` | this package — the components in `src/` |
| consumer | `node lint/cli.ts <dir>` | any project that uses fractalstyler |

In consumer mode the allowlist is the canonical registry **plus** the classes
the project declares in its own `custom.css`, so a project's extension layer
is legal and a hallucinated class is not.

| Flag | |
|:---|:---|
| `--json` | machine-readable diagnostics, for CI and agents |
| `--own <file>` | the consumer's extension stylesheet (default: `src/lib/styles/custom.css`) |
| `--registry <file>` | a different `registry.json` |

It exits non-zero when any diagnostic is an error.

### The rules

| Rule | File | Severity | What it catches |
|:---|:---|:---|:---|
| `fs/no-in-component-styles` | `svelte-linter.ts` | error | a scoped `<style>` block in a component |
| `fs/no-inline-styles` | `svelte-linter.ts` | error | a `style="…"` attribute |
| `fs/unknown-class` | `svelte-linter.ts` | error | a class that is not in the registry |
| `fs/token-purity` | `token-linter.ts` | error | a raw hex colour, a pixel value outside the 1–2px budget, a `var(--x)` that resolves to nothing |
| `fs/hardcoded-radius` | `css-linter.ts` | warning | a literal `border-radius` that the shape axis cannot reach |
| `fs/sass-nesting` | `css-linter.ts` | error | `&` in a plain `.css` file — the browser drops the whole rule |

### The library

| File | What it does |
|:---|:---|
| `lint/lib/registry.ts` | Loads `registry.json` and harvests the class and token names from the stylesheets — the source of truth for every check |
| `lint/lib/svelte-linter.ts` | The Svelte contract scanner — the three markup rules |
| `lint/lib/token-linter.ts` | Token purity for stylesheets |
| `lint/lib/css-linter.ts` | The stylesheet rules — the radius ladder, and Sass nesting in a CSS file |
| `lint/lib/fuzzy.ts` | Levenshtein distance — suggests the nearest registered class when a name is wrong |
| `lint/lib/agent-reporter.ts` | The `Diagnostic` type and the reporter — a box-drawn block per violation, each with a rationale and a prescriptive fix, or `--json` for machines |

## The launcher - `runtime/`

| File | What it does |
|:---|:---|
| `runtime/run.mjs` | Registers a load hook that strips the types from a `.ts` file, then imports it |

**Why it exists.** Node refuses to strip types for files under `node_modules`:

```
Error [ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING]:
Stripping types is currently unsupported for files under node_modules
```

So a package that ships TypeScript cannot be run by `node file.ts` once it is
installed. The three bins — `cli/main.mjs`, `lint/cli.mjs`, `mcp/server.mjs`
— are three-line launchers that register the hook and import the real entry:

```js
#!/usr/bin/env node
import { run } from '../runtime/run.mjs';

await run(new URL('./main.ts', import.meta.url).href);
```

That is the **only** JavaScript in the package. There is no compiled copy of
anything: the sources are the package.

The same launcher is copied into an ejected project, where the registry
builder is TypeScript too — and where the consumer's `package.json` may well
say `"type": "commonjs"`, which would otherwise make Node read the `.ts` file
as CommonJS.

## The MCP server - `mcp/`

| File | What it does |
|:---|:---|
| `mcp/server.ts` | The server: the tools, the prompts and the resources an agent reads |
| `mcp/mcp-settings.md` | The client configuration snippet |

It speaks MCP over stdio. Start it with `fractalstyler mcp`, or point a client
at `npx -y @fractaldesign/fractalstyler mcp`.

### The tools

| Tool | What it does |
|:---|:---|
| `guide_styling` | The styling guidance for a stated intent — spacing, layout, type, colour |
| `search_classes` | Search the registry by name, description or CSS property |
| `get_tokens` | The token scales — space, type, radius, shadow, surfaces |
| `snap_to_tokens` | Snap a raw pixel value to the nearest canonical token and class |
| `css_to_classes` | The classes that produce a given piece of CSS |
| `lint_markup` | Check markup against the contract |
| `get_system_rules` | The closed-world rules the system is built on |

### The prompts

| Prompt | |
|:---|:---|
| `design_component` | Plan and author a component from canonical classes only |
| `audit_markup` | Audit existing markup for contract compliance |

### The resources

`fractalstyler://registry` · `fractalstyler://tokens` · `fractalstyler://rules`

The server validates markup against `registry.json` — the same file the
linter uses. When the registry cannot be loaded it says so on stderr and skips
the class check, rather than reporting every class in a correct document as
unknown.

## The package entry - `src/lib/`

Three files sit at the root of `src/lib`, and they are the only ones a
consumer can import.

### `src/lib/index.ts` — the public entry

What `import { … } from '@fractaldesign/fractalstyler'` gives you:

| Export | What it is |
|:---|:---|
| `name` | the package name, for code that wants to check it |
| `version` | the version — **hand-written**, and it must be kept in step with `package.json` |
| `FractalstylerTokens` | the interface of every system token, generated by `npm run tokens` |
| `FractalstylerToken` | the union of every token name |

The stylesheet is deliberately **not** imported here. A consumer adds the
stylesheet once, in their entry file:

```js
import '@fractaldesign/fractalstyler/styles';
```

### `src/lib/asset.d.ts` — the stylesheet types

A side-effect stylesheet import has nothing to type:

```ts
import '@fractaldesign/fractalstyler/styles';
```

TypeScript resolves that through the `exports` map, finds a `.css` file, and
reports TS2882 — "cannot find a module". Vite's ambient `declare module
'*.css'` cannot help, because the specifier has no extension to match.

This file declares `*.css`, `*.sass` and `*.scss` as modules that export a
string, so the import type-checks. The `types` condition of each stylesheet
subpath in `package.json` points at the built copy of it (`dist/asset.d.ts`).

### `src/lib/types.ts` — the workspace types

The type surface of the **sveltemodular** workspace — the dockable,
splittable, tabbed window manager this package also ships. It is not the
design system's vocabulary; it is the contract between the workspace and the
components built on it.

| What | Where it is used |
|:---|:---|
| `ViewApi`, `WorkspaceHandle` | the handles a component gets from the workspace |
| `PLACEMENTS`, `Placement`, `PlacementRegion` | where a floating panel may be anchored |
| `DropZone`, `DragViewData` | the drop zones of the stage |
| `MenuItem`, `MenuEntry`, `MenuRequest`, `PanelMenuContext` | the context menu contract |
| `Command`, `Keymap`, `DEFAULT_KEYMAP` | the keyboard commands, and their default bindings |
| `formatCombo`, `matchesCombo` | reading and matching a key combination |
| `ViewRules`, `ViewInfo`, `OpenOptions` | how a view is opened and what it may contain |
| `Theme` | `light` \| `medium` \| `dark` \| `darker` \| `system` |
| `ViewTypeProps`, `SplitProps`, `PanelProps`, `ViewProps`, `StageProps`, `FloatingProps`, `WorkspaceProps` | the props of the workspace components |

The file carries a **DO NOT EDIT** banner at the top: it is the shared
contract, and the workspace components, the state layer and the utilities all
read from it.

### `src/lib/layout/` — the shell components

The Svelte components over `layout-shell.css`: `AppShell`, `AppHeader`,
`AppFooter`, `MainSection`, `ContentSection`, `NavSection`, `TocSection`, and
`layout.svelte.ts` — the `LayoutState` class and its `layoutState` singleton.

They are published under the `./layout` subpath, so a consumer writes:

```js
import { AppShell, layoutState } from '@fractaldesign/fractalstyler/layout';
```

`index.ts` is the barrel. See [Layout](./16-layout.md) for what each component
renders and how to use them.

## Which script, when

| You changed… | Run |
|:---|:---|
| a class in `src/lib/styles/*.css` | `npm run registry` |
| a token in `src/lib/styles/*.css` | `npm run tokens` |
| a class and a token | `npm run registry && npm run tokens` |
| the docs, the skill, the README | `npm run validate:deck` |
| anything, before you commit | `npm run check` |
| a new stylesheet | `npm run registry` — and add it to `FILE_ORDER` in `update-registry.ts` so it lands in the right cascade position |
| nothing, publishing | `npm run build` — runs registry, tokens and the package build |

`npm run check` is the one that matters: it type-checks, validates the
documentation and lints the components.


## Update Steps

The order matters: the registry is generated from the stylesheets, the
documentation is checked against the stylesheets, and the version is bumped
last — because the version is what the generated files get stamped with.

### 1. Make the change

| You are changing | Where |
|:---|:---|
| a class or a token | `src/lib/styles/*.css` |
| a whole new layer | a new file in `src/lib/styles/` — and two more places, below |
| the documentation | `docs/*.md` |
| the agent skill | `skills/fractalstyler/SKILL.md` |

A new stylesheet has to be registered in two places, and they must agree:

1. `src/lib/styles/index.css` — the cascade: the order the layers are
   concatenated in, and the order a consumer inherits;
2. `FILE_ORDER` in `scripts/update-registry.ts` — the order the registry reads
   them, so the class table and the cascade tell the same story.

A layer that is in one and not the other still works, but the registry and the
cascade disagree about what comes first.

### 2. Regenerate the derived files

```bash
npm run registry   # registry.json, registry.md, skills/fractalstyler/references/{fractals,tokens}.md
npm run tokens     # src/lib/tokensRegistry.ts
```

Never edit those by hand — each carries a "Generated" banner, and the next run
overwrites it.

### 3. Check

```bash
npm run check
```

Type-checks the package, validates the documentation and lints the components.
The documentation validator is the one that matters here: it catches a class
name in a doc that the stylesheet does not define — the failure mode that
ships a broken class into a consumer's project.

### 4. Bump the version

```bash
npm version patch     # or minor, or major
```

`npm version` runs the `version` script — `npm run registry && npm run tokens
&& git add -A` — so the generated files are regenerated and staged with the
commit. It then commits and tags.

Then update the version constant in `src/lib/index.ts` to match
`package.json`. It is hand-written, and `npm version` does not touch it.

| Bump | When |
|:---|:---|
| `patch` | a class or a token was added, a doc was fixed — nothing was removed or renamed |
| `minor` | a new stylesheet, a new feature in the CLI, the linter or the MCP |
| `major` | a class or a token was renamed or removed — consumer markup breaks |

### 5. Publish

```bash
npm publish --dry-run     # read the tarball first
npm publish
```

`prepack` runs `svelte-kit sync → svelte-package → publint`, so the package is
built and validated as it is published. If publint finds a problem, the publish
is aborted before anything leaves the machine.

**There is no compile step.** The package ships TypeScript. The one problem
that creates — Node refuses to strip types for files under `node_modules`
(`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`) — is solved by
`runtime/run.mjs`: the bins are three-line launchers that register a load hook
which strips the types and imports the real entry point.

### 6. After publishing

- Consumers who track the package get the new styles with
  `pnpm add -D @fractaldesign/fractalstyler`.
- Consumers who ejected keep their own copy — they do not get your change.
  They diff their `src/lib/styles/` against a fresh eject.
- The docs and the registry inside a consumer project are snapshots. They
  refresh with `npx fractalstyler init --docs`.

### Files that must stay in step

| File | Kept in step by |
|:---|:---|
| `package.json` — the version | `npm version` |
| `src/lib/index.ts` — the version constant | your hand |
| `registry.json`, `registry.md`, `skills/…/fractals.md`, `skills/…/tokens.md` | `npm run registry` |
| `src/lib/tokensRegistry.ts` | `npm run tokens` |
| `src/lib/styles/index.css` and `FILE_ORDER` | your hand — both, together |
| `docs/*.md` | your hand — checked by `npm run validate:deck` |
