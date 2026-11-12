# AGENTS

name - fractalstyler
description - A composition styling system, shipped as plain CSS. The class registry is the public API: compose in markup, write no stylesheet.
type - sveltekit
gitlink - https://github.com/fractalmandala/fractalstyler
npmlink - https://www.npmjs.com/package/@fractaldesign/fractalstyler
url - https://fractalsvelte.dev/fractalstyler

---

## What this package is

A **closed-world** styling system. It ships plain CSS layers, a generated
registry of every class, a linter, and an MCP server. There are no mixins, no
styling functions, and no "add your own CSS" — a project composes the system
from the classes that exist, and nothing else.

**The registry is the API.** If a class is not in the registry, it does not
exist, and using it is a bug — not a style choice.

## The rules

These are what the linter enforces, and what an agent must not break:

1. **Compose in markup.** Only classes from the registry. No new class names,
   ever — even for one element.
2. **No scoped `<style>` blocks** in components. Components are markup and
   logic only.
3. **No inline `style="…"` attributes.** Inline styles are invisible to the
   registry, unreachable by a theme switch, and unaccounted for.
4. **No raw hex colours.** Every colour resolves through a semantic token —
   `var(--bg)`, `var(--text-primary)`, `var(--border)`.
5. **No arbitrary pixels.** Only 1–2px (hairlines, borders) may be literal;
   everything else rides the `--space-*` ladder.
6. **Corners go through the radius ladder** — `var(--radius-*)`, never a
   literal `border-radius`.
7. **Every `var(--token)` must resolve** to a token that exists.
8. **Icons come from `fractalicons`** — never inline SVG, never unicode glyphs.

A class that does not exist yet is a **request for a new class**, not a
licence to invent one. See *When the system cannot express it* below.

## Where the truth lives

| | |
|:---|:---|
| **[`registry.md`](./registry.md)** | every class — what it does, what declares it, and a piece of markup to copy. **Read this before writing markup.** |
| [`registry.json`](./registry.json) | the same thing for machines; the linter and the MCP validate against it |
| [`docs/`](./docs/README.md) | one page per stylesheet — the reasoning, not just the list |
| [`docs/introduction.md`](./docs/introduction.md) | the mental model: containers, modifiers, the ladders, the vocabulary |
| [`skills/fractalstyler/SKILL.md`](./skills/fractalstyler/SKILL.md) | the agent skill — the rules in the form an agent should follow |
| [`docs/14-development.md`](./docs/14-development.md) | how the package itself is built, and how to publish an update |
| [`docs/16-layout.md`](./docs/16-layout.md) | the shell components (`AppShell`, `NavSection`, …) and the layout state |

The vocabulary, in one screen:

| | |
|:---|:---|
| Containers | `.box` (column), `.row` (horizontal), `.grid` — and their modifiers `.xcenter`, `.ycenter`, `.xbetween` |
| Spacing | `.gap-*`, `.pad-*`, `.px-*`, `.py-*`, `.mar-*` — eight steps: `xs sm md bs lg xl 2xl 3xl` |
| Type | `.text-xs` … `.text-5xl`, `.weight-*`, `.lh*`, `.ls-*`, `.truncate`, `.clamp-2` / `.clamp-3` |
| Colour | `.bg`, `.bg-surface`, `.text-primary`, `.text-muted`, `.border` — roles, never values |
| Variants | `.primary`, `.secondary`, `.themed`, `.outline`, `.ghost`, `.link` |
| Shape & height | `.rect`, `.mincurved`, `.modern`, `.curved`, `.round` · `.h-xs` … `.h-xl` · `.measure-*` / `.max-h-*` |
| Motion | `.spring`, `.spring-*`, `.enter-*`, `.pop`, `.lift`, `.press` |

**Modifiers are never standalone.** `.xcenter` resolves only on a container —
`.row.xcenter`, not a bare `.xcenter`.

## Using it in a project

```sh
pnpm add -D @fractaldesign/fractalstyler
```

```js
// one import — the bundler inlines the layers in cascade order
import '@fractaldesign/fractalstyler/styles';
```

**Theming.** Light and dark use `data-mode` on `<html>`. A named palette is `data-theme` — a preset of `--hue`, `--chroma`, and `--tint`. `data-radius`, `data-density`, and `data-motion` are optional axes that rewrite those token ladders. Don't invent further theme attributes.

Or a single layer, when only part of the system is wanted:

```js
import '@fractaldesign/fractalstyler/styles/typography.css';
```

The shell components are published too:

```js
import { AppShell, layoutState } from '@fractaldesign/fractalstyler/layout';
```

**Node 22.18 or newer** is required — the package ships TypeScript and runs it
through a launcher (`runtime/run.mjs`).

## The MCP server — an agent's co-pilot

An agent that knows the system does not have to guess a class name. The MCP
server exposes the registry, the tokens and the contract as tools.

```sh
npx @fractaldesign/fractalstyler mcp
```

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "npx",
      "args": ["-y", "@fractaldesign/fractalstyler", "mcp"]
    }
  }
}
```

| Tool | Use it for |
|:---|:---|
| `guide_styling` | the guidance for a stated intent — spacing, layout, type, colour |
| `search_classes` | finding the class that does the job — by name, description or property |
| `get_tokens` | the token scales — space, type, radius, shadow, surfaces |
| `snap_to_tokens` | snapping a raw pixel value (from a mockup) to the nearest token |
| `css_to_classes` | finding the classes that produce a given piece of CSS |
| `lint_markup` | checking markup before it ships |
| `get_system_rules` | the closed-world rules themselves |

Two prompts: `design_component` (plan and author a component) and
`audit_markup` (audit existing markup).

**The order that works:** `search_classes` → write the markup → `lint_markup`
→ ship. Never write markup from memory.

## The linter

```sh
npx @fractaldesign/fractalstyler lint          # audit this project
npx @fractaldesign/fractalstyler lint src/     # audit a directory
npx @fractaldesign/fractalstyler lint --json   # machine-readable, for CI
```

| Rule | Severity | What it catches |
|:---|:---|:---|
| `fs/no-in-component-styles` | error | a scoped `<style>` block |
| `fs/no-inline-styles` | error | a `style="…"` attribute |
| `fs/unknown-class` | error | a class that is not in the registry |
| `fs/token-purity` | error | a raw hex, a pixel outside the 1–2px budget, an unresolved `var()` |
| `fs/sass-nesting` | error | `&` in a plain `.css` file — the browser drops the whole rule |
| `fs/hardcoded-radius` | warning | a literal `border-radius` the shape axis cannot reach |

**Never silence the linter to make it pass.** An `unknown-class` error means
one of three things, and only one of them is a change to the system:

1. the class name is wrong → use the right one (`search_classes`);
2. the class is needed but missing → **add it to the system** (below);
3. the class belongs to the project → put it in `custom.css`, the sanctioned
   extension layer, and it joins the registry.

The linter reads `registry.json` and the stylesheets. If the registry is stale,
it is stale for the linter too — run `npm run registry` in the package.

## When the system cannot express it

Do not work around it. Work in the system:

1. Check whether an existing token and existing classes already compose what
   is needed — `search_classes`, `get_tokens`.
2. If a **new utility class** is genuinely needed, add it to the layer that
   owns it in `src/lib/styles/`, give it a name in the system's voice, and
   regenerate the registry.
3. If it is **project-specific** (branding, a mascot, a third-party skin), it
   belongs in `src/lib/styles/custom.css` — the sanctioned extension point.
   Every class there joins the registry.
4. If it is **missing from the design system itself**, that is a change to
   Fractalstyler, not to the project.

## The CLI

```sh
npx @fractaldesign/fractalstyler init     # scaffold: track the package or eject the styles
npx @fractaldesign/fractalstyler eject    # copy the styles + the registry builder into the project
npx @fractaldesign/fractalstyler lint     # the contract linter
npx @fractaldesign/fractalstyler mcp      # the MCP server
```

`init` with no flags asks; `--yes` takes the defaults. Nothing is ever
overwritten — a file you already have is kept and reported.

## Developing this package

```sh
npm run dev            # the demo site
npm run check          # type-check + validate the docs + lint the components
npm run build          # the publishable package
```

### The scripts, and when to run them

| You changed… | Run |
|:---|:---|
| a class in `src/lib/styles/*.css` | `npm run registry` |
| a token in `src/lib/styles/*.css` | `npm run tokens` (runs `gen:springs` first, then the token registry) |
| the docs, the skill, the README | `npm run validate:deck` |
| anything, before you commit | `npm run check` |
| a new stylesheet | `npm run registry` — and add it to `src/lib/styles/index.css` **and** to `FILE_ORDER` in `scripts/update-registry.ts`; the two must agree |
| nothing, publishing | `npm run build` |

`npm run registry` regenerates `registry.json`, `registry.md` and the two skill
references. `npm run tokens` regenerates `src/lib/tokensRegistry.ts`. Neither
file is ever edited by hand — they carry a "Generated" banner.

### The layout of the package

| | |
|:---|:---|
| `src/lib/styles/` | the layers — the system itself. Plain CSS, one file per concern. `springs.css` is generated (`npm run gen:springs`) |
| `src/lib/styles/index.css` | the cascade: the order the layers are imported in |
| `src/lib/styles/custom.css` | the sanctioned extension layer |
| `src/lib/layout/` | the shell components |
| `src/lib/components/` | the sveltemodular workspace app — **in progress, not part of the contract yet** |
| `scripts/` | the generator, the token generator, the parser, the doc validator |
| `lint/` | the contract linter |
| `mcp/` | the MCP server |
| `cli/` | the consumer-facing CLI |
| `runtime/run.mjs` | the launcher that lets Node run the shipped TypeScript |

## Before you update, and how to publish

**Before changing anything:**

1. Run `npm run check` — the tree must be clean.
2. If the change touches a stylesheet, a token or the docs, run the script
   from the table above and **commit the regenerated files with the change**.
3. Never edit `registry.json`, `registry.md`, `skills/fractalstyler/references/*`
   or `src/lib/tokensRegistry.ts` by hand — they are generated.

**To publish:**

```sh
npm version minor      # or patch — regenerates the registry and tokens, commits, tags
git push --follow-tags
npm publish            # prepack builds and validates; publint must pass
```

The version constant in `src/lib/index.ts` is hand-written — keep it in step
with `package.json`.

**Do not push or publish unless the user asks.** Committing and tagging is
step one of publishing, so the same rule applies.

## House rules

1. Every project must have `README.md`, `AGENTS.md`, and — where it applies —
   `DESIGN.md`, and a `LICENSE` when it is published.
2. The README of every project must open with: name, description, type, and
   where relevant gitlink, npmlink, url.
3. The README must carry the commands to run dev, build, and run the app.
4. When a project starts using Fractalstyler: add it to
   `/Users/amrit/ars-docs/alldocs/04canonicals/project-tracker.json`.
5. Do not initiate git or push to GitHub unless the user instructs it.
6. When developing, load and use poteto-mode —
   `/Users/amrit/ars-docs/alldocs/90skills/pstack/skills/poteto-mode`.

## Knowledge

- GPUI: `/Users/amrit/ars-docs/alldocs/04canonicals/gpui-wiki`
- Skills: `/Users/amrit/ars-docs/alldocs/90skills`
