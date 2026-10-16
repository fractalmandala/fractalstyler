---
title: Agent Instructions
description: Master rules, styling constraints, ecosystem contracts, and guidelines for AI agents working in fractalstyler.
type: fractalstyler
---

> **The Closed-World Styling Law**: You cannot add ad-hoc CSS anywhere. Styles are added ONLY inside the system's designated files (`src/lib/styles`), always via fractal composition and existing tokens. No scoped `<style>` blocks anywhere, including components. No inline `style="..."` attributes.

> All colors, spacing, radii, and shadows resolve from the shared token vocabulary. Source of truth: `_00_tokens.sass` for the contract. Never invent token names, never hardcode a value a token covers (raw hex colors `#fff` and arbitrary pixels `>2px` are strictly forbidden).

**You MUST understand and use the `fractalstyler` styling system — it ships as SASS, so assume a preprocessor.**

If you find existing violations of these rules, drop a comment to the user. The project is in flux and they might be known, temporary violations. The project is part of a core set that should always be in sync. You are never working in any one of these projects alone. You are working in a WIP ecosystem.

---

## Progressive Discovery Index

When beginning any styling task, inspect the designated file first rather than guessing or reading unrelated files:

| Styling Task | File to Inspect | Layer & Responsibility |
|:---|:---|:---|
| Determine active files or cascade order | `src/lib/styles/index.sass` | Master composition contract. Loads all partials in order. |
| Change colors, semantic tokens, dark mode | `src/lib/styles/_00_tokens.sass` | L0 Token source of truth. Fluid behavior lives in `--text-*` and `--space-*`. |
| Element resets, typography rhythm, tags | `src/lib/styles/_01_base.sass` | L0 Low-specificity defaults (`html`, `body`, `h1`-`h6`, `p`, `button`). |
| Spacing, gaps, padding, dimensions, radii | `src/lib/styles/_02_dimensions.sass` | L1 Spacing ladders (`.gap-*`, `.pad-*`, `.px-*`/`.py-*`, `.h-*`), radii, sizing. There is no `.pad-x-*`, `.pad-y-*` or `.w-*`. |
| Text sizes, roles, weights, tracking | `src/lib/styles/_03_typography.sass` | L5 Text primitives (`.text-*`), roles (`.page-title`, `.nav-link`), modifiers (`.weight-*`, `.lh*`, `.ls-*`, `.tt-*`). |
| Containers & physical axis alignment | `src/lib/styles/_04_containers.sass` | L2 `.box` (col), `.row`, `.grid`. Physical modifiers (`.xcenter`, `.ycenter`, `.xbetween`). |
| Macro grid layouts & responsive columns | `src/lib/styles/_05_layouts.sass` | L3 Column stepping (`.grid-1`..`6`) and frame ratios. |
| Application shells, headers, frames, rails | `src/lib/styles/_06_shells.sass` | L4 `.app-shell`, `.app-header`, `.app-main`, `.app-footer`, drawer, tabs. |
| Interactive buttons, links, variants, states | `src/lib/styles/_07_interactions.sass` | L5 Orthogonal interactive axes: paint, metrics, corners (`button` / `.button`, `a.btn`, `.input`, `.select`). |
| Backgrounds, ink, shadows, borders, pills | `src/lib/styles/_08_visuals.sass` | L5 Surface styling, status fills, elevation shadows, pop-colour inks. There is no `.kbd` or switch component. |
| Project-specific third-party overrides | `src/lib/styles/_09_own.sass` | Sanctioned extension point for consumer extensions and third-party skins. |

---

## Canonical Recipes (`data/recipes.json`)

Consult `data/recipes.json` before inventing composite patterns. Canonical verified markups include:
- **Segmented Control**: `<div class="row ycenter shrink-0 pad-xs bg-raised border radius-sm"><button data-variant="primary" data-size="sm" aria-pressed="true">View</button><button data-variant="ghost" data-size="sm" aria-pressed="false">Split</button></div>`
- **Search Input Bar**: `<div class="row ycenter gap-xs px-xs py-xs bg-surface border radius-sm grow min0"><span class="text-muted text-xs">⌕</span><input class="input grow min0 text-sm" data-variant="ghost" type="search" /><span class="text-xs text-muted shrink-0">⌘K</span></div>`
- **Responsive Metrics Grid**: `<div class="grid-4 gap-sm"><div class="card box ycenter xcenter gap-xs" data-variant="primary" data-pad="sm">...</div></div>`
- **Settings Switch Row**: `<div class="row ycenter xbetween gap-md py-sm bb">...<label class="checkbox-wrapper"><input type="checkbox" checked /><span>On</span></label></div>`
- **Action Dialog**: `<dialog class="bg-surface border radius-md">...`
- **Dropdown Action Menu**: `<div class="relative"><button data-variant="ghost" aria-expanded="true">Actions</button><div class="absolute box gap-xs pad-xs bg-surface border shadow-md radius-md" role="menu">...</div></div>`

Every class in `data/recipes.json` is checked against the compiled stylesheet by
`pnpm check`, so a recipe that stops resolving fails the build. Keep it that way.

---

## Verification & Tooling

Before calling any fix or feature "Done", run the verification commands:

```bash
pnpm lint        # Runs contract linter (validates Svelte, Sass, token purity, zero style blocks)
pnpm check       # Validates documentation deck and compiles Sass fresh
pnpm registry    # Regenerates registry.json, docs/REGISTRY.api.md, and skills references
pnpm vocab       # Updates docs/REGISTRY.api.md with class vocabulary decoders
pnpm browser     # (Optional) Opens interactive browser page to inspect registry classes
```

### Adding a Class to the System

1. **Put it in the partial that owns its layer**:
   - Do not invent new partials unless approved. Use `_00` to `_08` (or `_09_own.sass`).
2. **Document it on the selector line**:
   A trailing `// …` comment becomes the description in `registry.json`, `docs/REGISTRY.api.md`, and the skill reference an agent greps:
   ```sass
   .scroll-y // Vertical scroll inside a bounded height; needs an .h-*
   	overflow-y: auto
   ```
3. **Run `pnpm registry`**:
   Discovers classes, variants, and updates `registry.json`, `docs/REGISTRY.api.md`, `skills/fractalstyler/references/*.md`, and versions.
4. **Run `pnpm vocab`**:
   Generates updated `docs/REGISTRY.api.md`.
5. **Run `pnpm lint && pnpm check`**:
   Guarantees zero contract regressions, syntax violations, or broken links.

---

## Dev Servers & Environment Rules

- Always first check with user if they have a dev server active before starting your own. If they do, use that. Always kill servers that you have started when done. Do not leave them running in the background.
- All documentation files should have structured YAML frontmatter:
  ```yaml
  ---
  title: ...
  description: ...
  type: fractalstyler
  ---
  ```
- **"Done"** always means: docs updated, registry regenerated (`pnpm registry`), vocab regenerated (`pnpm vocab`), and the build passes cleanly (`pnpm lint && pnpm check && pnpm build`).

### Framing & Architecture Constraints

1. **This is a SASS system**: It ships as editable SASS from one source.
2. **There are no authoring mixins**: `+stack`, `+surface`, `space()` do not exist.
3. **No child combinators**: `> *` and relatives are forbidden; selectors are plain descendants.
4. **Icons**: For any icons, use `fractalicons` from NPM.
5. **Ecosystem**: If you find yourself needing styling not in `fractalstyler`, or components not in `fractalsvelte-ui`, notify the user for feature requests rather than hacking local styles.

### Button root: `button, .button`

`_07_interactions.sass` styles buttons as `button, .button` — one selector list,
so `<button>` and `<button class="button">` are identical and answer the same
axes. Prefer the bare element.

`.button` is `(0,1,0)`, the same as ink utilities like `.text-danger`, so source
order decides and `_08_visuals` loading after `_07_interactions` means the ink
utility wins. Do **not** change this to `button.button` — that is `(0,1,1)` and
silently outranks every `(0,1,0)` utility, swallowing `.text-danger`,
`.text-muted` and `.text-secondary` on any button carrying the class.

The registry files the whole button tree under the bare element name `"button"`,
so `.button[data-variant="ghost"]` has no row of its own — look up
`button[data-variant="ghost"]`.

### Global presets (optional runtime)

`presets.svelte.ts` + `PresetControls.svelte` write `data-*` onto live markup.
Exported: `setPresetSize`, `setPresetShape`, `setPresetPad`, `setPresetVariant`,
`resetPresets`, `initPresets`, `presetState`. Each setter calls `init()` itself;
**reading** `presetState` does not, so call `initPresets()` first or you get the
defaults rather than the stored choice.

Scope is deliberately narrow and differs per axis: shape sweeps
`presetApplication` (which includes `.card`), size sweeps the same minus
`.card` (a card has no `data-size` rule), `data-pad` sweeps `.card` only, and
`data-variant` is class-qualified to `input.input`, `select.select`,
`button.button`, `a.btn` plus `.card`. A preset never overwrites an attribute
the markup already declares.

Prefer explicit attributes in authored markup. The preset layer is for the
values you do not want to hand-write, and for driving a running app.


## After every update

- should not be any references to a registry.md or .json in the root folder
- update AGENTS.md where needed
- if new classes/files have been added, if classes definitions have changed here and there, etc, then CLI update: update files `/Users/amrit/fractaldesign/packages/fractalstyler/cli/main.mjs` and `/Users/amrit/fractaldesign/packages/fractalstyler/cli/scaffold.mjs` .
- run `/Users/amrit/fractaldesign/packages/fractalstyler/scripts/update-registry.js` to create registry again
- update `/Users/amrit/fractaldesign/packages/fractalstyler/docs/REGISTRY.api.md`
- update `/Users/amrit/fractaldesign/packages/fractalstyler/docs/references/configurations-api.md`
- update README, update package.json, bump version (if applicable)