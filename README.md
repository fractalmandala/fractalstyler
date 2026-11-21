# Fractalstyler

<img style="height: 400px; width: 100%; object-fit: cover; margin-bottom: 1.5rem;" src="static/fractalstyler.png" alt="fractalstyler"/>

Fractalstyler is a lean styling system based on the idea of minimal classes, maximal customizability. It defines a tight set of dimensions, variables, containers, interactions, colors, typography, and layouts designed for consistent app and site designs, easy components, and custom themes. 

You can install and use Fractalstyler in the following ways:

1. Just copy the css files into your project - now they're yours, no dependency.
2. Install via a package manager 
	- 2.1 - install with registry and docs
	- 2.2 - install with registry, docs, and select css files
	- 2.3 - install registry, docs, css files
	- 2.4 - full install - registry, docs, css files, lint, mcp, scripts
3. Use Agent
	- Point your agent to the [Fractalstyler skill](./skills/fractalstyler-master/SKILL.md) and instruct 'use fractalstyler skill, setup the system and guide in my project.'

Read [documentation](./docs/introduction.md).
Read [developer's guide](./docs/14-development.md)


## Using it in a project

The system is plain CSS — the layers, imported in cascade order. There are
three ways to hold it, and they differ in who owns the file afterwards.

### Track the package (advised)

```sh
pnpm add -D @fractaldesign/fractalstyler
```

```js
// one import — your bundler inlines the layers, in cascade order
import '@fractaldesign/fractalstyler/styles';
```

Or a single layer, when you only want part of the system:

```js
import '@fractaldesign/fractalstyler/styles/typography.css';
```

**Theming.** Light and dark use `data-mode` on `<html>`. A named palette is `data-theme` — a preset of `--hue`, `--chroma`, and `--tint`. The default recipe, and `data-theme="fractalsvelte"`, is hue 40 / chroma 0.2 / tint 0.012; the other named presets (`aurora`, `ocean`, `ember`, `rose`, `lime`, `amber`, `mono`) keep their own hues. `themes/fsui-themes.css` ships 24 complete themes as literal light and dark token sets. `data-density` is the only implemented ladder axis — `data-radius` and `data-motion` have no rules in the current layers. Don't invent further theme attributes.

The styles stay in `node_modules`; upgrades come from npm.

**The cascade rule.** `@layer base, tokens, components, types;` — then every utility, unlayered.

| Cascade layer | What lives there |
|:---|:---|
| `base` | element resets, `.bare`, `[hidden]`, the `data-theme` painter |
| `tokens` | custom properties only |
| `components` | recipes — classes that bundle decisions across concerns or style their descendants: the shell and sections (`layout-shell.css`), the text roles (`.page-title`, `.card-title`, `.nav-link` …), the surfaces (`.elevated`, `.glass`, `.paneled`, `.overlayed`), `.prose`, `.prose-content`, the frames, `.reel`, the floating / dialog / layer family, `.caret`, `.collapse` |
| `types` | the data-* axes (`data-variant`, `data-size`, `data-tone` …) |
| *(unlayered)* | utilities — one decision on one concern: spacing, sizing, borders, shadows, colour, type steps, display, position |

An unlayered rule beats every layered rule, whatever its specificity or the order
the files load in. So **a utility on an element always wins** over a reset, a
recipe or a data-* type on the same element — `bare px-md` has inline padding,
`page-title text-2xl` is a 2xl title, `dialog pad-lg` has large padding,
`paneled shad-lg` has the large shadow. Inside a layer, and between utilities,
the usual cascade still applies: a modifier (`.box.xcenter`, `.rim.shad-lg`,
`.caret.open`) or a state (`:hover`, `:focus-visible`, `.state-*`) out-specifies
or outlasts its base. Two utilities that set the same property on one element
(`mx-md clamp-lg`, `vacant bg-panel`) are a contradiction in markup — pick one.

The `hidden` attribute and the band classes (`.md-only` … `.xl-hide`) are
`!important`, so they hide whatever display utility the element carries.

A consumer stylesheet loaded after fractalstyler: an unlayered class there sits
at the same level as the utilities and wins over every recipe. To make your own
component CSS lose to utilities the same way, put it in the layer:
`@layer components { … }`, or `@import 'your.css' layer(components);`.

### Eject — the files become yours

```sh
npx @fractaldesign/fractalstyler eject
```

Copies the layers into `src/lib/styles/`, seeds `custom.css` as your
extension point, and copies the registry builder into `scripts/`. Nothing is
ever overwritten — a file you already have is kept, and reported.

After any edit to your copy, regenerate its registry:

```sh
node scripts/build-registry.mjs
```

An ejected copy no longer tracks the package. You own the drift.

### Copy by hand

The same layers, copied wherever you like. No CLI, no dependency.

### The registry and the docs

[`registry.md`](./registry.md) is the index of every class: what it does,
which stylesheet declares it, and a piece of markup to copy.
[`registry.json`](./registry.json) is the same thing for machines — the linter
and the MCP server validate against it.

In a project that tracks the package, the registry and the documentation are a
snapshot you can pull in:

```sh
npx @fractaldesign/fractalstyler init --docs
```

### The vocabulary, in one screen

| | |
|:---|:---|
| Containers | `.box` (column), `.row` (horizontal), `.grid` — and their modifiers `.xcenter`, `.ycenter`, `.xbetween` |
| Spacing | `.gap-*`, `.pad-*`, `.px-*`, `.py-*`, `.mar-*` — eight steps: `xs sm md bs lg xl 2xl 3xl` |
| Type | `.text-xs` … `.text-5xl`, `.weight-*`, `.lh*`, `.ls-*`, `.truncate` |
| Colour | `.bg`, `.bg-surface`, `.text-primary`, `.text-muted`, `.border` — roles, never values |
| Variants | `.primary`, `.secondary`, `.themed`, `.outline`, `.ghost`, `.link` |
| Shape & height | `.rect`, `.mincurved`, `.modern`, `.curved`, `.round` · `.h-xs` … `.h-xl` · `.measure-*` / `.max-h-*` |
| Motion | `.spring`, `.spring-*`, `.lift`, `.press` |
| Themes | eight `data-theme` palettes in `colors-themes.css`; 24 full light + dark themes in `themes/fsui-themes.css` |

The full list is in [`registry.md`](./registry.md); the reasoning behind it is
in [the documentation](./docs/introduction.md).

### The shell

`layout-shell.css` is the skeleton: `.app-shell` → `.app-header` / `.app-main`
(with `.sidebar-left`, `.main-section`, `.sidebar-right`) / `.app-footer`, plus
the page wrappers and the overlay primitives. It is classes, not components —
the markup is the canonical markup.

See [Layout Shell](./docs/07-layout-shell.md) for the anatomy and
[Canonical Markups](./docs/fractalstyler-master/references/canonical-markups.md)
for the contracts.

## CLI reference

```sh
npx @fractaldesign/fractalstyler <command>
```

| Command | What it does |
|:---|:---|
| `init` | Scaffold a project — track the package or eject the styles, and copy the documentation |
| `eject` | Copy the style layers and the registry builder into the current project |
| `lint [dir]` | Check a project against the styling contract |
| `mcp` | Start the MCP server on stdio |
| `help` | The usage text |

### init and eject

| Flag | |
|:---|:---|
| `--track` | Keep the styles in `node_modules`; upgrades from npm (default) |
| `--eject` | Copy the styles into the project |
| `--docs` / `--no-docs` | Copy the documentation into the project (default: yes) |
| `--docs-dir <dir>` | Where the documentation lands (default: `fractalstyler/`) |
| `--yes`, `-y` | Non-interactive — take the defaults |
| `--styles-dir <dir>` | eject: where the layers land (default: `src/lib/styles`) |
| `--scripts-dir <dir>` | eject: where the registry builder lands (default: `scripts`) |

`init` with no flags asks the questions; `--yes` takes the defaults.

### lint

```sh
npx @fractaldesign/fractalstyler lint          # audit this project
npx @fractaldesign/fractalstyler lint src/     # audit a directory
```

| Flag | |
|:---|:---|
| `--json` | Machine-readable diagnostics, for CI and agents |
| `--own <file>` | The consumer's extension stylesheet (default: `src/lib/styles/custom.css`) |
| `--registry <file>` | A different `registry.json` |

What it enforces:

- no scoped `<style>` block and no inline `style="…"` — components are markup
  and logic only;
- every class in the markup exists in the registry;
- no raw hex, and no pixel value outside the 1–2px hairline budget;
- every `var(--token)` resolves to a real token;
- corners route through the radius ladder, so the shape axis can reach them.

## MCP Server (Agent Co-pilot)

An agent that knows the system does not have to guess a class name. The MCP
server exposes the registry, the tokens and the contract as tools — so an agent
can look up what exists, and can check its own markup before you read it.

```sh
npx @fractaldesign/fractalstyler mcp
```

Point your client at it:

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

### Tools

| Tool | What it does |
|:---|:---|
| `guide_styling` | The styling guidance for a stated intent — spacing, layout, type, colour |
| `search_classes` | Search the registry by name, description or CSS property |
| `get_tokens` | The token scales — space, type, radius, shadow, surfaces |
| `snap_to_tokens` | Snap a raw pixel value to the nearest canonical token and class |
| `css_to_classes` | The classes that produce a given piece of CSS |
| `lint_markup` | Check markup against the contract — unknown classes, inline styles, `<style>` blocks, raw hex |
| `get_system_rules` | The closed-world rules the system is built on |

### Prompts

| Prompt | |
|:---|:---|
| `design_component` | Plan and author a component from canonical classes only |
| `audit_markup` | Audit existing markup for contract compliance |

### Resources

`fractalstyler://registry` · `fractalstyler://tokens` · `fractalstyler://rules`


## Updating Package

The order matters: the registry is generated from the stylesheets, the
documentation is checked against the stylesheets, and the version is bumped
last — because the version is what the generated files get stamped with.

### 1. Make the change

| You are changing | Where |
|:---|:---|
| a class or a token | `src/lib/styles/*.css` |
| a whole new layer | a new file in `src/lib/styles/` — and one more place, below |
| the documentation | `docs/*.md` |
| the agent skill | `docs/fractalstyler-master/` — the source; `skills/fractalstyler-master/` is generated |

A new stylesheet has to be registered in one place:

1. `src/lib/styles/index.css` — the cascade. `styleFiles()` resolves it from
   the `@import` list, so the registry cannot disagree with what a browser
   loads. A layer that ships but stays out of the aggregate goes in
   `DETACHED_ORDER` in `scripts/update-registry.ts` instead — `custom.css` and
   `modular.css` live there today.

### 2. Regenerate the derived files

```bash
npm run registry   # registry.json, registry.md, then skills/fractalstyler-master/
npm run tokens     # src/lib/tokensRegistry.ts
```

Never edit those by hand — each carries a "Generated" banner, and the next run
overwrites it. The skill is generated too: edit `docs/fractalstyler-master/`,
never `skills/fractalstyler-master/`.

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
| `src/lib/styles/index.css` and `DETACHED_ORDER` | your hand — both, together |
| the `@layer base, tokens, components, types;` statement | your hand — the same line at the top of every stylesheet that uses a layer |
| `docs/*.md` | your hand — checked by `npm run validate:deck` |
