---
name: fractalstyler
description: Build, compose, modify, or audit UI interfaces using the closed Fractalstyler composition styling system. Use whenever authoring HTML, Svelte, Sass, CSS, or TS/JS components where new ad-hoc classes, scoped style blocks, inline styles, custom properties, or arbitrary CSS are strictly forbidden.
---

# Fractalstyler Styling System & Style Guard

Operate within the `fractalstyler` registry as a **closed world**. Never invent a class or styling definition, even when the requested design is not immediately obvious.

## Mandatory Agent Workflow

1. **Consult the Registry First**:
   Read `docs/REGISTRY.api.md` or `references/fractals.md`. Search for existing utility classes, container bases, layouts, and shells before writing any markup.
2. **Review Recipes**:
   Check `data/recipes.json` for verified canonical compositions (segmented controls, search input bars, metrics grids, action rows, switches, modals).
3. **Compose Only from Verified Classes**:
   - Containers: `.box` (column), `.row` (horizontal), `.grid` (CSS grid).
   - Physical Alignment: `.xcenter`, `.ycenter`, `.xbetween`, `.xright`, `.ytop`.
   - Dimensions & Spacing: `.gap-*`, `.pad-*`, `.pad-x-*`, `.pad-y-*`, `.w-*`, `.h-*`.
   - Visuals: `.bg-main`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`, `.border`, `.border-bottom`, `.radius-*`, `.shadow-*`.
   - Typography: `.text-xs` .. `.text-5xl`, `.weight-500`, `.weight-600`, `.truncate`.
   - Interactions: `button`, `a.btn`, `.input`, `.select`, `data-variant` (`primary`, `secondary`, `soft`, `outline`, `ghost`, `link`, `destructive`), `data-shape` (`square`, `modern`, `curved`, `round`), `data-size` (`sm`, `md`, `bs`, `lg`).
4. **Hard Boundaries**:
   - **NO in-component `<style>` blocks**: Components must remain pure markup and logic.
   - **NO inline `style="..."` attributes**: Inline styles are unconstrained ad-hoc CSS.
   - **NO raw hex colors (`#hex`)**: Every color must resolve through semantic tokens (`var(--bg)`, `var(--text-primary)`, `var(--border)`, etc.).
   - **NO arbitrary pixel dimensions (>2px)**: Literal pixels bypass the dimension ladder. Only 1-2px (borders, hairlines) may be literal.
   - **NO child combinators**: Selectors are plain descendants (`> *` is forbidden).
5. **Mandatory Verification**:
   Before claiming task completion, always execute:
   ```bash
   pnpm lint
   pnpm check
   ```
   Both checks must pass with 0 errors.

## Progressive Discovery Index

| Styling Task | File to Inspect | Responsibility |
|:---|:---|:---|
| Active files and cascade order | `src/lib/styles/index.sass` | Master composition contract. |
| Colors, semantic tokens, dark mode | `src/lib/styles/_00_tokens.sass` | Design token source of truth. |
| Global resets and typography defaults | `src/lib/styles/_01_base.sass` | Low-specificity element defaults. |
| Spacing, gaps, padding, dimensions | `src/lib/styles/_02_dimensions.sass` | L1 spacing & dimension ladders. |
| Text sizes, roles, weights, tracking | `src/lib/styles/_03_typography.sass` | L5 typography primitives, roles, and modifiers. |
| Flex/grid containers & axis alignment | `src/lib/styles/_04_containers.sass` | L2 structural layout containers. |
| Macro grid layouts & responsive columns | `src/lib/styles/_05_layouts.sass` | L3 column stepping (.grid-1..12). |
| Page frames, headers, sidebars, rails | `src/lib/styles/_06_shells.sass` | L4 application shell hierarchy. |
| Buttons, links, pills, states | `src/lib/styles/_07_interactions.sass` | L5 orthogonal interactive axes. |
| Backgrounds, ink, shadows, borders | `src/lib/styles/_08_visuals.sass` | L5 surface styling & decorative treatments. |
| Project-specific third-party overrides | `src/lib/styles/_09_own.sass` | Sanctioned extension point. |

## Handling Coverage Gaps

If a visual requirement cannot be expressed with existing canonical classes:
1. Do NOT write an ad-hoc inline style or component `<style>` block.
2. Check if an existing token in `_00_tokens.sass` can be composed.
3. If genuine new utility or shell class is required, add it to the designated layer partial in `src/lib/styles` with a trailing `// description` comment and run `pnpm registry`.
4. If it is a project-specific extension, declare it in `_09_own.sass`.
