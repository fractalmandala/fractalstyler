# Fractalstyler

A composition styling system — the class registry is the public API: compose
in markup, write no stylesheet. Ships as editable SASS and as plain compiled
CSS. MIT © [Fractal Mandala](https://github.com/fractalmandala)

**This library is a work in constant progress and breaking changes each bump.**

- Registry: [`docs/REGISTRY.api.md`](https://github.com/fractalmandala/fractalstyler/blob/main/docs/REGISTRY.api.md)
- Configuration: [`docs/references/configurations-api.md`](https://github.com/fractalmandala/fractalstyler/blob/main/docs/references/configurations-api.md)
- Agent skill: [`skills/fractalstyler/SKILL.md`](https://github.com/fractalmandala/fractalstyler/blob/main/skills/fractalstyler/SKILL.md)
- [VS Code Intellisense Extension](https://github.com/fractalmandala/fractalstyler/blob/main/fractalstyler-vscode/fractalstyler-0.4.1.vsix)
- [NPM](https://www.npmjs.com/package/@fractaldesign/fractalstyler)

## Using it in a project

Two ways to hold the styles, and an IDE layer you can add to either.

### 1. Install and use — track the package; upgrades come from npm

```sh
pnpm add -D @fractaldesign/fractalstyler
```

```sass
@use '@fractaldesign/fractalstyler/styles' as *
```

Plain CSS consumers need no SASS toolchain:

```js
import '@fractaldesign/fractalstyler/css'; // dist/css/fractalstyler.css
```

The classes are active once the import is in place. To keep the registry and
the configuration docs greppable inside your project, run:

```sh
npx @fractaldesign/fractalstyler init --track --docs
```

which places `REGISTRY.api.md` and
`references/configurations-api.md` into a `fractalstyler/` folder at your
project root (`--docs-dir` to choose another). Docs are snapshots — re-run
`init` after upgrading to refresh them.

### 2. Eject — the files become yours

Copies every styles layer, the palette modules and the registry builder into
your project, where you may edit them freely (including the `$`-variables in
`_00_config.sass`, in place):

```sh
npx @fractaldesign/fractalstyler eject
```

That leaves you `src/lib/styles/` (11 layers + a seeded `_09_own.sass`),
`src/lib/palette/`, and `scripts/build-registry.mjs`. Import your local tree,
regenerate your own registry after edits (`node scripts/build-registry.mjs`,
Node only), and the linter keeps enforcing the contract against your copy:

```sh
npx @fractaldesign/fractalstyler lint src/
```

Nothing existing is ever overwritten — on a name conflict your file is kept
and reported. Delete a kept file and re-run `eject` to re-place it.

> **Drift warning**: an ejected copy no longer tracks the package — upgrades
> stop coming from npm. This is the less advisable mode; it exists so a
> project that must own its styles can still start from the whole system.

### 3. Either mode, with or without the IDE extension

Both `init` and `eject` accept `--intellisense` / `--no-intellisense`. With it
on, the CLI writes `fractalstyler.stylesDirectory` to `.vscode/settings.json`
for the **Fractalstyler** VS Code extension (`fractaldesign.fractalstyler`) —
class completions and hovers inside `class="…"`, plus the sidebar/panel editor
for the styles files — pointing at wherever your styles now live
(`node_modules/…/dist/styles` in track mode, your local folder in eject mode).
It also checks the extension is installed and prints how to get it if not.

The setting is only a hint: the extension auto-detects the same folders and
works with no configuration at all. It picks the first of `src/lib/styles`,
`node_modules/@fractaldesign/fractalstyler/dist/styles`, `src/styles` or
`styles` that exists, so fractalstyler itself, an ejected copy, and an app
consuming the package from npm are all covered. Run **Fractalstyler: Pick
Styles Folder** to override it.

`npx @fractaldesign/fractalstyler init` with no flags asks the three questions
interactively; `--yes` takes the defaults (track + docs + intellisense).

Canonical props are defined at `/lib/types.ts`. Shared definition with Fractalsvelte UI components library.

#### Notes

- Everything is browser-only. The setters no-op during SSR, so calling them at
  module scope in a shared file is safe.
- A preset never overwrites an attribute your markup already declares — it only
  fills in what is missing. If an element says `data-pad="sm"`, the pad control
  will not touch it, and reading that element's attribute returns `sm`, not the
  selected preset.
- Every axis is class-qualified, so the sweep targets the axis classes:
  `data-variant` → `.el-variants`, `data-shape` → `.el-shape`, `data-size` →
  `.el-size`, `data-pad` → `.el-pad`. An element that carries none of them is
  never touched.
- Four axes, four setters. `presetState.variant` starts at `primary` and reads
  back `primary` until the variant preset is changed.

## Presets

The optional runtime layer. Presets are plain `data-*` attributes written onto
the page — no build step, no stylesheet of its own, safe to leave out entirely.

| Axis | Class | Attribute | Values |
|---|---|---|---|
| Size | `.el-size` | `data-size` | `sm` `md` `bs` `lg` `xl` |
| Shape | `.el-shape` | `data-shape` | `square` `min` `modern` `curved` `round` |
| Variant | `.el-variants` | `data-variant` | `primary` `secondary` `themed` `outline` `ghost` `link` `icon` |
| Padding | `.el-pad` | `data-pad` | `sm` `md` `bs` `lg` `xl` |

`setPresetSize`, `setPresetShape`, `setPresetPad`, `setPresetVariant` and
`resetPresets` are importable from the package root, and `PresetControls.svelte`
ships as a ready-made picker with one control per axis. Both paths are also
available as the subpath exports `./presets` and `./PresetControls`.
`presetState` is exported for reading current values — call `initPresets()`
first or you read the defaults, not the stored choice.

Choices persist to `localStorage` under `fractalstyler:presets`, and a
`MutationObserver` re-applies them to nodes added later.

## before release

- regenerate classes list and registry, to shake off tree and remove deprecated classes + add new few.
- all three files inside `packages/fractalstyler/skills/fractalstyler` to be modified to drop old class references.
- updated [configurations](docs/references/configurations-api.md) and [registry](docs/REGISTRY.api.md)
- re-audit mcp to ensure it is not out of date and is using current classes and status
- **update the VS Code extension** — `/Users/amrit/fractaldesign/vsix-and-zed-ext/fractalstyler-vscode` carries a bundled copy of the registry so completions work with no project set up. After any class change, refresh it and rebuild:
  ```sh
  npm --prefix fractalstyler-vscode run sync:registry   # copies registry.json into the extension
  npm --prefix fractalstyler-vscode run package        # rebuilds fractalstyler-<version>.vsix
  ```
- update AGENTS.md where needed, update README.md where needed

## 21st Oct changelog

Complete standardization and type definition of all props, shared surface with Fractalsvelte UI components library. Now no need to keep record of what props are for what styles and/or components. `_10_propped.sass` extends the classes `.el-variants`, `.el-shape`, `.el-size`, `.el-pad`, `.el-shadow`. Use these on buttons, inputs, cards - you decide. Canonical definitions will be set at the Fractalsvelte UI componenents level.

## 1.4.0 changelog

- **the attribute axes are class-qualified.** `_10_propped.sass` (layer L6) owns the axes: `.el-variants` answers `data-variant`, `.el-shape` answers `data-shape`, `.el-size` answers `data-size`, `.el-pad` answers `data-pad`, `.el-shadow` / `.el-shadow-hover` answer `data-shadow`, and `.el-vss` carries variant + shape + size in one class. The element name is never the qualifier — a bare `<button data-variant="primary">` paints nothing.
- the element-scoped rules are gone: `button[data-variant=…]`, `a.btn[data-variant=…]`, `.input[data-*]`, `.select[data-*]`, `.card[data-*]` and `.accordion-item[data-*]` no longer exist. 91 classes left the registry; 64 axis classes entered it. The registry holds **481** classes.
- the variant set is now `primary` `secondary` `themed` `outline` `ghost` `link` `icon` — `soft`, `destructive` and `iconbox` are gone, and `themed` (the `--theme-color` fill) is new. The shape set gained `min` and lost nothing; the size set gained `xl`.
- `.icon` is gone as a class. An icon-only button is `<button class="button el-variants el-size" data-variant="icon" data-size="sm">`.
- the presets runtime now sweeps the axis classes instead of element selectors, so the same four setters drive any element that opts in.
- `src/lib/libTypes.ts` is now `src/lib/types.ts`; the canonical unions (`VARIANTS`, `SIZES`, `SHAPES`, `PADS`, `SHADOWS`) live there and are shared with the Fractalsvelte UI components library.
- the layout partials were reorganised: `.grid-1`…`.grid-6`, `.cspan-*`, `.card-grid`, `.prose`, `.prose-left`, `.frame-*` and `.reel` now live in `_04_containers.sass`; `.card`, `.chip`, `.nav-section`, `.page-header`, `.inputs-wrapper` and `.checkbox-wrapper` in `_05_layouts.sass`. The layer map follows the classes, not the file.
- `_00_fonts.sass` is gone. The library still assigns `font-family: var(--font-sans)` to `body, html` — the token is the consumer's to define.

## 11th Oct changelog
- removed width 100% on input and select
- added data-size to button data-variant = iconbox
- added global presets for size, padding, height, variant, shape, and controls for it.

## CLI reference

```sh
npx @fractaldesign/fractalstyler init     # scaffold: mode, docs, intellisense
npx @fractaldesign/fractalstyler eject    # copy styles + palettes + builder
npx @fractaldesign/fractalstyler lint     # contract linter (self or <dir>)
npx @fractaldesign/fractalstyler help     # all options
```

| Option | Default | Meaning |
|---|---|---|
| `--track` / `--eject` | track | How the styles are held |
| `--docs` / `--no-docs` | docs | Copy registry + configuration docs |
| `--docs-dir <dir>` | `fractalstyler/` | Where docs land |
| `--styles-dir <dir>` | `src/lib/styles` | Eject target for the layers |
| `--palette-dir <dir>` | `src/lib/palette` | Eject target for the palettes |
| `--scripts-dir <dir>` | `scripts` | Eject target for the registry builder |
| `--intellisense` / `--no-intellisense` | ask | VS Code extension settings + check |
| `--yes` / `-y` | — | Non-interactive, take the defaults |

`lint` needs the Sass compiler (an optional peer of this package):
`pnpm add -D sass`. Its own flags (`--json`, `--own <file>`, `--registry <f>`)
pass through unchanged.

## MCP Server (Agent Co-pilot)

The package ships with a Model Context Protocol (MCP) server to guide AI coding agents:

```sh
npx @fractaldesign/fractalstyler mcp
```

Or configure in your MCP settings (Claude Desktop, Cursor, Antigravity):

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

Exposes 8 agent tools:
- `guide_styling`: Intent-driven design advisor (gap, typography, layout, cards, buttons).
- `search_classes`: Fast search and filter over the 481 canonical classes.
- `get_tokens`: Inspect space, typography, radius, shadow, and surface tokens.
- `snap_to_tokens`: Snaps raw pixel values to nearest canonical token utility classes.
- `get_recipes`: Verified copy-paste recipes (segmented controls, metrics grids, dialogs, etc.).
- `css_to_classes`: Translates raw CSS declarations into pure Fractalstyler markup.
- `lint_markup`: Validates markup against closed-world styling contracts.
- `get_system_rules`: Returns system constraints and architecture primer.

## Developing this package

```sh
pnpm registry   # regenerate registry.json, docs/REGISTRY.api.md, skill references
pnpm vocab      # regenerate docs/REGISTRY.api.md
pnpm browser    # regenerate docs/browser.html
pnpm lint       # contract linter (self mode)
pnpm check      # validate-deck + svelte-check
pnpm css        # rebuild dist/css
```

Architecture: **L0 (Tokens) → L1 (Dimensions) → L2 (Containers) → L3
(Layouts) → L4 (Shells) → L5 (Visuals & Interactions) → L6 (Element Axes)** — the
layer map and the definitions are in
[`docs/references/configurations-api.md`](docs/references/configurations-api.md).

## 9th Oct changelog
- removed heavy `.card` stylings, removed `_10_*`.sass file.
- also removed classes - width additional styling imposed by `_10_*.sass` like hardcoded padding.
- **the library no longer imports any font family at all. It ships a blank `_00_fonts.sass` file for user to fill and use**
- **library does not declare or set values for `--font-sans` and `--font-mono`. It assigns to body and html font-family: `var(--font-sans)`. Users have to suppply**

- data variant, data shape, and data size are now a typed canonical set applied to multiple classes- button, a.btn, .input, .select, and more. 
- factory agents should be given `packages/fractalstyler/src/lib/libTypes.ts` for the full map. 
- the raw forms of these classes (button, .input, ..) without `[data-variant="default"]` have been given minimal styling, left unstyled. Styling begins at variant primary. 
- text color has not been defined in any variant, to leave that choice at frontend side. `--text-primary`, `--text-secondary`, `--text-muted`
 remain the prime 3, along with accents.

- Accordion group has been styled with prefix `fsx-` in the names `packages/fractalstyler/src/lib/styles/_09_own.sass`.
- This is to leave the original `.accordion`, `.accordion-item` and other classes open for styling for now. 

- ** data-variant= `icon` condenses sizes also in its own definition, data-variants `icon-sm`, `icon-md`, `icon-bs`, and `icon-lg`.

## 1.1.0 changelog
- **global component presets are now a public export.** `setPresetSize`, `setPresetShape`, `setPresetPad`, `setPresetVariant` and `resetPresets` are importable from the package root, and `PresetControls.svelte` ships as a ready-made picker with one control per axis. Both paths live under [Presets](#presets); new subpath exports `./presets` and `./PresetControls` are available for consumers who prefer not to import from the root. `presetState` is exported for reading current values — call `initPresets()` first or you read the defaults, not the stored choice.
- **variant is a real preset axis now.** It starts at `primary`, is persisted, has a setter, and gets a picker. It is class-qualified: `data-variant` reaches only `input.input`, `select.select`, `button.button` and `a.btn`, so bare form controls are never stamped.
- **`.button` is now a real class.** `_07_interactions.sass` styles buttons as `button, .button`, so `<button class="button">` and a bare `<button>` are identical and answer the same axes. It is `(0,1,0)`, so ink utilities like `.text-danger` still win on it.
- `.card` padding moved from `data-size` to a dedicated **`data-pad`** axis (`sm` `md` `bs` `lg` `xl`), so card padding no longer collides with the size ladder used by buttons and inputs.
- `data-pad` is scoped to `.card` only — it is never written onto buttons, inputs or selects, which have no rule answering it.
- new tokens `--accent-orange`, `--accent-green`, `--yellowpop1..4`; `--theme-color` is now yellow.
- `data-variant` gained `iconbox` alongside `icon`.
- `.grid` shares its `display: grid` base with `.grid-2` … `.grid-6`.
- dropped the blanket `input, textarea, select { font-size: max(16px, 1rem) }` and the forced 100% width on inputs/selects — size is yours to set via `data-size`.
- **`data/recipes.json` was rewritten against real classes.** It shipped `.kbd`, `.dialog`, `.popover`, `.avatar`, `.active`, `.switch-track`, `.pad-x-*`, `.border-top`, `.pad-0` and `.square-6`, none of which exist — and `get_recipes` served it verbatim. `validate-deck.js` now checks every recipe class against the compiled stylesheet, so this cannot drift again silently.
- `docs/browser.html` regenerated; it still carried the pre-rename bare `.surface` / `.panel` / `.raised` background classes.