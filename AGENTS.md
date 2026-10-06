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
| Spacing, gaps, padding, dimensions, radii | `src/lib/styles/_02_dimensions.sass` | L1 Spacing ladders (`.gap-*`, `.pad-*`, `.pad-x-*`, `.pad-y-*`, `.w-*`, `.h-*`). |
| Text sizes, roles, weights, tracking | `src/lib/styles/_03_typography.sass` | L5 Text primitives (`.text-*`), roles (`.page-title`, `.nav-link`), modifiers (`.weight-*`, `.lh*`, `.ls-*`, `.tt-*`). |
| Containers & physical axis alignment | `src/lib/styles/_04_containers.sass` | L2 `.box` (col), `.row`, `.grid`. Physical modifiers (`.xcenter`, `.ycenter`, `.xbetween`). |
| Macro grid layouts & responsive columns | `src/lib/styles/_05_layouts.sass` | L3 Column stepping (`.grid-1`..`12`) and frame ratios. |
| Application shells, headers, frames, rails | `src/lib/styles/_06_shells.sass` | L4 `.app-shell`, `.app-header`, `.app-main`, `.app-footer`, drawer, tabs. |
| Interactive buttons, links, variants, states | `src/lib/styles/_07_interactions.sass` | L5 Orthogonal interactive axes: paint, metrics, corners (`.button`, `.primary`, `.ghost`, `.active`). |
| Backgrounds, ink, shadows, borders, pills | `src/lib/styles/_08_visuals.sass` | L5 Surface styling, status fills, elevation shadows, field, switch, kbd. |
| Project-specific third-party overrides | `src/lib/styles/_09_own.sass` | Sanctioned extension point for consumer extensions and third-party skins. |

---

## Canonical Recipes (`data/recipes.json`)

Consult `data/recipes.json` before inventing composite patterns. Canonical verified markups include:
- **Segmented Control**: `<div class="row ycenter shrink-0 pad-2 raised border radius-sm"><button class="button ghost text-xs active">...</button></div>`
- **Search Input Bar**: `<div class="row ycenter gap-xs pad-x-xs pad-y-2xs surface border radius-sm grow min0"><span class="text-muted text-xs">⌕</span><input class="input grow min0 text-sm" type="search" /><kbd class="kbd text-xs">⌘K</kbd></div>`
- **Responsive Metrics Grid**: `<div class="grid-4 gap-sm"><div class="card box ycenter xcenter gap-2xs pad-sm surface border">...</div></div>`
- **Settings Switch Row**: `<div class="row ycenter xbetween gap-md pad-y-sm border-bottom">...</div>`
- **Action Dialog**: `<dialog class="dialog pad-0 surface border radius-md">...`
- **Dropdown Action Menu**: `<div class="relative"><button class="button ghost" aria-expanded="true">...</button><div class="popover open box gap-2xs pad-2xs surface border shadow-md radius-sm">...</div></div>`

---

## Verification & Tooling

Before calling any fix or feature "Done", run the verification commands:

```bash
pnpm lint        # Runs contract linter (validates Svelte, Sass, token purity, zero style blocks)
pnpm check       # Validates documentation deck and compiles Sass fresh
pnpm registry    # Regenerates registry.json, REGISTRY.md, and skills references
pnpm vocab       # Updates docs/REGISTRY.api.md with class vocabulary decoders
pnpm browser     # (Optional) Opens interactive browser page to inspect registry classes
```

### Adding a Class to the System

1. **Put it in the partial that owns its layer**:
   - Do not invent new partials unless approved. Use `_00` to `_08` (or `_09_own.sass` for extensions).
2. **Document it on the selector line**:
   A trailing `// …` comment becomes the description in `registry.json`, `REGISTRY.md`, and the skill reference an agent greps:
   ```sass
   .scroll-y // Vertical scroll inside a bounded height; needs an .h-*
   	overflow-y: auto
   ```
3. **Run `pnpm registry`**:
   Discovers classes, variants, and updates `REGISTRY.md`, `docs/REGISTRY.md`, `registry.json`, `skills/fractal-styler/references/*.md`, and versions.
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
