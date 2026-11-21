# Fractalstyler — Class Registry

> GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts` from the
> stylesheets in `src/lib/styles`.

**596 classes** across **12 stylesheets**, riding **475 tokens**.

These classes are the entire public API. There is no authoring mixin and no
styling function — `+stack`, `+surface`, `space()` and their friends do not
exist. Compose in markup.

Every class is concrete: the space families (`.gap` `.rgap` `.cgap` `.pad`
`.px` `.py` `.pt` `.pr` `.pb` `.pl` `.mar` `.mx` `.my` `.mt` `.mr` `.mb` `.ml`)
each run the eight steps `xs sm md bs lg xl 2xl 3xl`, token-routed through
`var(--space-*)`. A modifier rides its base (`.box.xcenter`); a child carries
its own name and names its parent (`.avatar-more` inside `.avatar-group`).

## The cascade rule

`@layer base, tokens, components, types;` — then utilities, unlayered.

The **Cascade** column says where each class sits. `base` holds resets and
element defaults, `components` holds recipes (shells, sections, text roles,
surfaces, prose, frames, floating/dialog/layer, caret, collapse), `types` holds
the data-* axes, and `utility` means unlayered. An unlayered rule beats every
layered one, so a utility always wins over a reset, recipe or type on the same
element, whatever the load order. Two utilities that set the same property are
a contradiction in markup — pick one; the later stylesheet wins, and within a
family a modifier (`.box.xcenter`) or a state (`:hover`) out-specifies its base.


---

## configurations.css

Global tokens and base resets — layout dimensions, z-index bands, font stacks, breakpoint bands, the band-based visibility classes and the element resets every page starts from. Declares the cascade: `@layer base, tokens, components, types;`, then utilities unlayered. The resets, `.bare` and `[hidden]` sit in `base`, so any utility on the same element wins.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.bare` | base | `appearance: none; -webkit-appearance: none; background: none; border: none; padding: 0; margin: 0; font: inherit; color: inherit; outline: none; min-width: 0` | appearance: none |
| `.bdr` | utility | `border: 1px solid red` | Debug outline — flags an element on screen with a border |
| `.md-only` | utility | `display: none !important` | Visible from the md band up (1025px) |
| `.lg-only` | utility | `display: none !important` | Visible from the lg band up (1281px) |
| `.xl-only` | utility | `display: none !important` | Visible from the xl band up (1441px) |
| `.md-hide` | utility | `display: none !important` | Hidden from the md band up (1025px) |
| `.lg-hide` | utility | `display: none !important` | Hidden from the lg band up (1281px) |
| `.xl-hide` | utility | `display: none !important` | Hidden from the xl band up (1441px) |

---

## gaps-pads-margins.css

The space ladder. Every family runs the eight steps xs sm md bs lg xl 2xl 3xl and rides var(--space-*).

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.gap-xs` | utility | `gap: var(--space-xs)` | Gap on both axes (flex/grid) at the xs step — rides --space-xs |
| `.gap-sm` | utility | `gap: var(--space-sm)` | Gap on both axes (flex/grid) at the sm step — rides --space-sm |
| `.gap-md` | utility | `gap: var(--space-md)` | Gap on both axes (flex/grid) at the md step — rides --space-md |
| `.gap-bs` | utility | `gap: var(--space-bs)` | Gap on both axes (flex/grid) at the bs step — rides --space-bs |
| `.gap-lg` | utility | `gap: var(--space-lg)` | Gap on both axes (flex/grid) at the lg step — rides --space-lg |
| `.gap-xl` | utility | `gap: var(--space-xl)` | Gap on both axes (flex/grid) at the xl step — rides --space-xl |
| `.gap-2xl` | utility | `gap: var(--space-2xl)` | Gap on both axes (flex/grid) at the 2xl step — rides --space-2xl |
| `.gap-3xl` | utility | `gap: var(--space-3xl)` | Gap on both axes (flex/grid) at the 3xl step — rides --space-3xl |
| `.rgap-xs` | utility | `row-gap: var(--space-xs)` | Row gap (block axis) at the xs step — rides --space-xs |
| `.rgap-sm` | utility | `row-gap: var(--space-sm)` | Row gap (block axis) at the sm step — rides --space-sm |
| `.rgap-md` | utility | `row-gap: var(--space-md)` | Row gap (block axis) at the md step — rides --space-md |
| `.rgap-bs` | utility | `row-gap: var(--space-bs)` | Row gap (block axis) at the bs step — rides --space-bs |
| `.rgap-lg` | utility | `row-gap: var(--space-lg)` | Row gap (block axis) at the lg step — rides --space-lg |
| `.rgap-xl` | utility | `row-gap: var(--space-xl)` | Row gap (block axis) at the xl step — rides --space-xl |
| `.rgap-2xl` | utility | `row-gap: var(--space-2xl)` | Row gap (block axis) at the 2xl step — rides --space-2xl |
| `.rgap-3xl` | utility | `row-gap: var(--space-3xl)` | Row gap (block axis) at the 3xl step — rides --space-3xl |
| `.cgap-xs` | utility | `column-gap: var(--space-xs)` | Column gap (inline axis) at the xs step — rides --space-xs |
| `.cgap-sm` | utility | `column-gap: var(--space-sm)` | Column gap (inline axis) at the sm step — rides --space-sm |
| `.cgap-md` | utility | `column-gap: var(--space-md)` | Column gap (inline axis) at the md step — rides --space-md |
| `.cgap-bs` | utility | `column-gap: var(--space-bs)` | Column gap (inline axis) at the bs step — rides --space-bs |
| `.cgap-lg` | utility | `column-gap: var(--space-lg)` | Column gap (inline axis) at the lg step — rides --space-lg |
| `.cgap-xl` | utility | `column-gap: var(--space-xl)` | Column gap (inline axis) at the xl step — rides --space-xl |
| `.cgap-2xl` | utility | `column-gap: var(--space-2xl)` | Column gap (inline axis) at the 2xl step — rides --space-2xl |
| `.cgap-3xl` | utility | `column-gap: var(--space-3xl)` | Column gap (inline axis) at the 3xl step — rides --space-3xl |
| `.pad-xs` | utility | `padding: var(--space-xs)` | Padding on all four sides at the xs step — rides --space-xs |
| `.pad-sm` | utility | `padding: var(--space-sm)` | Padding on all four sides at the sm step — rides --space-sm |
| `.pad-md` | utility | `padding: var(--space-md)` | Padding on all four sides at the md step — rides --space-md |
| `.pad-bs` | utility | `padding: var(--space-bs)` | Padding on all four sides at the bs step — rides --space-bs |
| `.pad-lg` | utility | `padding: var(--space-lg)` | Padding on all four sides at the lg step — rides --space-lg |
| `.pad-xl` | utility | `padding: var(--space-xl)` | Padding on all four sides at the xl step — rides --space-xl |
| `.pad-2xl` | utility | `padding: var(--space-2xl)` | Padding on all four sides at the 2xl step — rides --space-2xl |
| `.pad-3xl` | utility | `padding: var(--space-3xl)` | Padding on all four sides at the 3xl step — rides --space-3xl |
| `.pad-none` | utility | `padding: 0` | No padding — clears what an element brings with it |
| `.px-xs` | utility | `padding-inline: var(--space-xs)` | Inline (horizontal) padding at the xs step — rides --space-xs |
| `.px-sm` | utility | `padding-inline: var(--space-sm)` | Inline (horizontal) padding at the sm step — rides --space-sm |
| `.px-md` | utility | `padding-inline: var(--space-md)` | Inline (horizontal) padding at the md step — rides --space-md |
| `.px-bs` | utility | `padding-inline: var(--space-bs)` | Inline (horizontal) padding at the bs step — rides --space-bs |
| `.px-lg` | utility | `padding-inline: var(--space-lg)` | Inline (horizontal) padding at the lg step — rides --space-lg |
| `.px-xl` | utility | `padding-inline: var(--space-xl)` | Inline (horizontal) padding at the xl step — rides --space-xl |
| `.px-2xl` | utility | `padding-inline: var(--space-2xl)` | Inline (horizontal) padding at the 2xl step — rides --space-2xl |
| `.px-3xl` | utility | `padding-inline: var(--space-3xl)` | Inline (horizontal) padding at the 3xl step — rides --space-3xl |
| `.py-xs` | utility | `padding-block: var(--space-xs)` | Block (vertical) padding at the xs step — rides --space-xs |
| `.py-sm` | utility | `padding-block: var(--space-sm)` | Block (vertical) padding at the sm step — rides --space-sm |
| `.py-md` | utility | `padding-block: var(--space-md)` | Block (vertical) padding at the md step — rides --space-md |
| `.py-bs` | utility | `padding-block: var(--space-bs)` | Block (vertical) padding at the bs step — rides --space-bs |
| `.py-lg` | utility | `padding-block: var(--space-lg)` | Block (vertical) padding at the lg step — rides --space-lg |
| `.py-xl` | utility | `padding-block: var(--space-xl)` | Block (vertical) padding at the xl step — rides --space-xl |
| `.py-2xl` | utility | `padding-block: var(--space-2xl)` | Block (vertical) padding at the 2xl step — rides --space-2xl |
| `.py-3xl` | utility | `padding-block: var(--space-3xl)` | Block (vertical) padding at the 3xl step — rides --space-3xl |
| `.pt-xs` | utility | `padding-top: var(--space-xs)` | Top padding at the xs step — rides --space-xs |
| `.pt-sm` | utility | `padding-top: var(--space-sm)` | Top padding at the sm step — rides --space-sm |
| `.pt-md` | utility | `padding-top: var(--space-md)` | Top padding at the md step — rides --space-md |
| `.pt-bs` | utility | `padding-top: var(--space-bs)` | Top padding at the bs step — rides --space-bs |
| `.pt-lg` | utility | `padding-top: var(--space-lg)` | Top padding at the lg step — rides --space-lg |
| `.pt-xl` | utility | `padding-top: var(--space-xl)` | Top padding at the xl step — rides --space-xl |
| `.pt-2xl` | utility | `padding-top: var(--space-2xl)` | Top padding at the 2xl step — rides --space-2xl |
| `.pt-3xl` | utility | `padding-top: var(--space-3xl)` | Top padding at the 3xl step — rides --space-3xl |
| `.pr-xs` | utility | `padding-right: var(--space-xs)` | Right padding at the xs step — rides --space-xs |
| `.pr-sm` | utility | `padding-right: var(--space-sm)` | Right padding at the sm step — rides --space-sm |
| `.pr-md` | utility | `padding-right: var(--space-md)` | Right padding at the md step — rides --space-md |
| `.pr-bs` | utility | `padding-right: var(--space-bs)` | Right padding at the bs step — rides --space-bs |
| `.pr-lg` | utility | `padding-right: var(--space-lg)` | Right padding at the lg step — rides --space-lg |
| `.pr-xl` | utility | `padding-right: var(--space-xl)` | Right padding at the xl step — rides --space-xl |
| `.pr-2xl` | utility | `padding-right: var(--space-2xl)` | Right padding at the 2xl step — rides --space-2xl |
| `.pr-3xl` | utility | `padding-right: var(--space-3xl)` | Right padding at the 3xl step — rides --space-3xl |
| `.pb-xs` | utility | `padding-bottom: var(--space-xs)` | Bottom padding at the xs step — rides --space-xs |
| `.pb-sm` | utility | `padding-bottom: var(--space-sm)` | Bottom padding at the sm step — rides --space-sm |
| `.pb-md` | utility | `padding-bottom: var(--space-md)` | Bottom padding at the md step — rides --space-md |
| `.pb-bs` | utility | `padding-bottom: var(--space-bs)` | Bottom padding at the bs step — rides --space-bs |
| `.pb-lg` | utility | `padding-bottom: var(--space-lg)` | Bottom padding at the lg step — rides --space-lg |
| `.pb-xl` | utility | `padding-bottom: var(--space-xl)` | Bottom padding at the xl step — rides --space-xl |
| `.pb-2xl` | utility | `padding-bottom: var(--space-2xl)` | Bottom padding at the 2xl step — rides --space-2xl |
| `.pb-3xl` | utility | `padding-bottom: var(--space-3xl)` | Bottom padding at the 3xl step — rides --space-3xl |
| `.pl-xs` | utility | `padding-left: var(--space-xs)` | Left padding at the xs step — rides --space-xs |
| `.pl-sm` | utility | `padding-left: var(--space-sm)` | Left padding at the sm step — rides --space-sm |
| `.pl-md` | utility | `padding-left: var(--space-md)` | Left padding at the md step — rides --space-md |
| `.pl-bs` | utility | `padding-left: var(--space-bs)` | Left padding at the bs step — rides --space-bs |
| `.pl-lg` | utility | `padding-left: var(--space-lg)` | Left padding at the lg step — rides --space-lg |
| `.pl-xl` | utility | `padding-left: var(--space-xl)` | Left padding at the xl step — rides --space-xl |
| `.pl-2xl` | utility | `padding-left: var(--space-2xl)` | Left padding at the 2xl step — rides --space-2xl |
| `.pl-3xl` | utility | `padding-left: var(--space-3xl)` | Left padding at the 3xl step — rides --space-3xl |
| `.mar-xs` | utility | `margin: var(--space-xs)` | Margin on all four sides at the xs step — rides --space-xs |
| `.mar-sm` | utility | `margin: var(--space-sm)` | Margin on all four sides at the sm step — rides --space-sm |
| `.mar-md` | utility | `margin: var(--space-md)` | Margin on all four sides at the md step — rides --space-md |
| `.mar-bs` | utility | `margin: var(--space-bs)` | Margin on all four sides at the bs step — rides --space-bs |
| `.mar-lg` | utility | `margin: var(--space-lg)` | Margin on all four sides at the lg step — rides --space-lg |
| `.mar-xl` | utility | `margin: var(--space-xl)` | Margin on all four sides at the xl step — rides --space-xl |
| `.mar-2xl` | utility | `margin: var(--space-2xl)` | Margin on all four sides at the 2xl step — rides --space-2xl |
| `.mar-3xl` | utility | `margin: var(--space-3xl)` | Margin on all four sides at the 3xl step — rides --space-3xl |
| `.mx-xs` | utility | `margin-inline: var(--space-xs)` | Inline (horizontal) margin at the xs step — rides --space-xs |
| `.mx-sm` | utility | `margin-inline: var(--space-sm)` | Inline (horizontal) margin at the sm step — rides --space-sm |
| `.mx-md` | utility | `margin-inline: var(--space-md)` | Inline (horizontal) margin at the md step — rides --space-md |
| `.mx-bs` | utility | `margin-inline: var(--space-bs)` | Inline (horizontal) margin at the bs step — rides --space-bs |
| `.mx-lg` | utility | `margin-inline: var(--space-lg)` | Inline (horizontal) margin at the lg step — rides --space-lg |
| `.mx-xl` | utility | `margin-inline: var(--space-xl)` | Inline (horizontal) margin at the xl step — rides --space-xl |
| `.mx-2xl` | utility | `margin-inline: var(--space-2xl)` | Inline (horizontal) margin at the 2xl step — rides --space-2xl |
| `.mx-3xl` | utility | `margin-inline: var(--space-3xl)` | Inline (horizontal) margin at the 3xl step — rides --space-3xl |
| `.my-xs` | utility | `margin-block: var(--space-xs)` | Block (vertical) margin at the xs step — rides --space-xs |
| `.my-sm` | utility | `margin-block: var(--space-sm)` | Block (vertical) margin at the sm step — rides --space-sm |
| `.my-md` | utility | `margin-block: var(--space-md)` | Block (vertical) margin at the md step — rides --space-md |
| `.my-bs` | utility | `margin-block: var(--space-bs)` | Block (vertical) margin at the bs step — rides --space-bs |
| `.my-lg` | utility | `margin-block: var(--space-lg)` | Block (vertical) margin at the lg step — rides --space-lg |
| `.my-xl` | utility | `margin-block: var(--space-xl)` | Block (vertical) margin at the xl step — rides --space-xl |
| `.my-2xl` | utility | `margin-block: var(--space-2xl)` | Block (vertical) margin at the 2xl step — rides --space-2xl |
| `.my-3xl` | utility | `margin-block: var(--space-3xl)` | Block (vertical) margin at the 3xl step — rides --space-3xl |
| `.mt-xs` | utility | `margin-top: var(--space-xs)` | Top margin at the xs step — rides --space-xs |
| `.mt-sm` | utility | `margin-top: var(--space-sm)` | Top margin at the sm step — rides --space-sm |
| `.mt-md` | utility | `margin-top: var(--space-md)` | Top margin at the md step — rides --space-md |
| `.mt-bs` | utility | `margin-top: var(--space-bs)` | Top margin at the bs step — rides --space-bs |
| `.mt-lg` | utility | `margin-top: var(--space-lg)` | Top margin at the lg step — rides --space-lg |
| `.mt-xl` | utility | `margin-top: var(--space-xl)` | Top margin at the xl step — rides --space-xl |
| `.mt-2xl` | utility | `margin-top: var(--space-2xl)` | Top margin at the 2xl step — rides --space-2xl |
| `.mt-3xl` | utility | `margin-top: var(--space-3xl)` | Top margin at the 3xl step — rides --space-3xl |
| `.mr-xs` | utility | `margin-right: var(--space-xs)` | Right margin at the xs step — rides --space-xs |
| `.mr-sm` | utility | `margin-right: var(--space-sm)` | Right margin at the sm step — rides --space-sm |
| `.mr-md` | utility | `margin-right: var(--space-md)` | Right margin at the md step — rides --space-md |
| `.mr-bs` | utility | `margin-right: var(--space-bs)` | Right margin at the bs step — rides --space-bs |
| `.mr-lg` | utility | `margin-right: var(--space-lg)` | Right margin at the lg step — rides --space-lg |
| `.mr-xl` | utility | `margin-right: var(--space-xl)` | Right margin at the xl step — rides --space-xl |
| `.mr-2xl` | utility | `margin-right: var(--space-2xl)` | Right margin at the 2xl step — rides --space-2xl |
| `.mr-3xl` | utility | `margin-right: var(--space-3xl)` | Right margin at the 3xl step — rides --space-3xl |
| `.mb-xs` | utility | `margin-bottom: var(--space-xs)` | Bottom margin at the xs step — rides --space-xs |
| `.mb-sm` | utility | `margin-bottom: var(--space-sm)` | Bottom margin at the sm step — rides --space-sm |
| `.mb-md` | utility | `margin-bottom: var(--space-md)` | Bottom margin at the md step — rides --space-md |
| `.mb-bs` | utility | `margin-bottom: var(--space-bs)` | Bottom margin at the bs step — rides --space-bs |
| `.mb-lg` | utility | `margin-bottom: var(--space-lg)` | Bottom margin at the lg step — rides --space-lg |
| `.mb-xl` | utility | `margin-bottom: var(--space-xl)` | Bottom margin at the xl step — rides --space-xl |
| `.mb-2xl` | utility | `margin-bottom: var(--space-2xl)` | Bottom margin at the 2xl step — rides --space-2xl |
| `.mb-3xl` | utility | `margin-bottom: var(--space-3xl)` | Bottom margin at the 3xl step — rides --space-3xl |
| `.ml-xs` | utility | `margin-left: var(--space-xs)` | Left margin at the xs step — rides --space-xs |
| `.ml-sm` | utility | `margin-left: var(--space-sm)` | Left margin at the sm step — rides --space-sm |
| `.ml-md` | utility | `margin-left: var(--space-md)` | Left margin at the md step — rides --space-md |
| `.ml-bs` | utility | `margin-left: var(--space-bs)` | Left margin at the bs step — rides --space-bs |
| `.ml-lg` | utility | `margin-left: var(--space-lg)` | Left margin at the lg step — rides --space-lg |
| `.ml-xl` | utility | `margin-left: var(--space-xl)` | Left margin at the xl step — rides --space-xl |
| `.ml-2xl` | utility | `margin-left: var(--space-2xl)` | Left margin at the 2xl step — rides --space-2xl |
| `.ml-3xl` | utility | `margin-left: var(--space-3xl)` | Left margin at the 3xl step — rides --space-3xl |

---

## shapes-sizes.css

Radius and control-height ladders, the measures and clamps, plus the sizing utilities (full, min0, fitted). All utilities; the single-property sizing classes come last, so `.measure-lg.wmax` resolves to `wmax`.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.rect` | utility | `border-radius: 0` | Shape prop — square corners |
| `.mincurved` | utility | `border-radius: var(--radius-sm)` | Shape prop — a small radius |
| `.modern` | utility | `border-radius: var(--radius-md)` | Shape prop — the default radius |
| `.curved` | utility | `border-radius: var(--radius-bs)` | Shape prop — a large radius |
| `.round` | utility | `border-radius: var(--radius-full)` | Shape prop — fully round |
| `.radius-xs` | utility | `border-radius: var(--radius-xs)` | Corner radius at the xs step — rides --radius-xs |
| `.radius-sm` | utility | `border-radius: var(--radius-sm)` | Corner radius at the sm step — rides --radius-sm |
| `.radius-md` | utility | `border-radius: var(--radius-md)` | Corner radius at the md step — rides --radius-md |
| `.radius-bs` | utility | `border-radius: var(--radius-bs)` | Corner radius at the bs step — rides --radius-bs |
| `.radius-lg` | utility | `border-radius: var(--radius-lg)` | Corner radius at the lg step — rides --radius-lg |
| `.radius-full` | utility | `border-radius: var(--radius-full)` | Corner radius at the full step — rides --radius-full |
| `.h-xs` | utility | `height: var(--h-xs)` | Control height at the xs step — rides --h-xs |
| `.h-sm` | utility | `height: var(--h-sm)` | Control height at the sm step — rides --h-sm |
| `.h-md` | utility | `height: var(--h-md)` | Control height at the md step — rides --h-md |
| `.h-bs` | utility | `height: var(--h-bs)` | Control height at the bs step — rides --h-bs |
| `.h-lg` | utility | `height: var(--h-lg)` | Control height at the lg step — rides --h-lg |
| `.h-xl` | utility | `height: var(--h-xl)` | Control height at the xl step — rides --h-xl |
| `.h-2xl` | utility | `height: var(--h-2xl)` | Control height at the 2xl step — rides --h-2xl |
| `.h-3xl` | utility | `height: var(--h-3xl)` | Control height at the 3xl step — rides --h-3xl |
| `.measure-xs` | utility | `width: 100%; max-width: var(--measure-xs)` | width: 100% |
| `.measure-sm` | utility | `width: 100%; max-width: var(--measure-sm)` | width: 100% |
| `.measure-md` | utility | `width: 100%; max-width: var(--measure-md)` | width: 100% |
| `.measure-bs` | utility | `width: 100%; max-width: var(--measure-bs)` | width: 100% |
| `.measure-lg` | utility | `width: 100%; max-width: var(--measure-lg)` | width: 100% |
| `.measure-xl` | utility | `width: 100%; max-width: var(--measure-xl)` | width: 100% |
| `.measure-2xl` | utility | `width: 100%; max-width: var(--measure-2xl)` | width: 100% |
| `.measure-3xl` | utility | `width: 100%; max-width: var(--measure-3xl)` | width: 100% |
| `.measure-4xl` | utility | `width: 100%; max-width: var(--measure-4xl)` | width: 100% |
| `.width-xs` | utility | `width: 100%; max-width: var(--measure-xs)` | width: 100% |
| `.width-sm` | utility | `width: 100%; max-width: var(--measure-sm)` | width: 100% |
| `.width-md` | utility | `width: 100%; max-width: var(--measure-md)` | width: 100% |
| `.width-bs` | utility | `width: 100%; max-width: var(--measure-bs)` | width: 100% |
| `.width-lg` | utility | `width: 100%; max-width: var(--measure-lg)` | width: 100% |
| `.width-xl` | utility | `width: 100%; max-width: var(--measure-xl)` | width: 100% |
| `.width-2xl` | utility | `width: 100%; max-width: var(--measure-2xl)` | width: 100% |
| `.width-3xl` | utility | `width: 100%; max-width: var(--measure-3xl)` | width: 100% |
| `.width-4xl` | utility | `width: 100%; max-width: var(--measure-4xl)` | width: 100% |
| `.max-h-xs` | utility | `max-height: var(--measure-xs)` | max-height: var(--measure-xs) |
| `.max-h-sm` | utility | `max-height: var(--measure-sm)` | max-height: var(--measure-sm) |
| `.max-h-md` | utility | `max-height: var(--measure-md)` | max-height: var(--measure-md) |
| `.max-h-bs` | utility | `max-height: var(--measure-bs)` | max-height: var(--measure-bs) |
| `.max-h-lg` | utility | `max-height: var(--measure-lg)` | max-height: var(--measure-lg) |
| `.max-h-xl` | utility | `max-height: var(--measure-xl)` | max-height: var(--measure-xl) |
| `.max-h-2xl` | utility | `max-height: var(--measure-2xl)` | max-height: var(--measure-2xl) |
| `.max-h-3xl` | utility | `max-height: var(--measure-3xl)` | max-height: var(--measure-3xl) |
| `.max-h-4xl` | utility | `max-height: var(--measure-4xl)` | max-height: var(--measure-4xl) |
| `.clamp-xs` | utility | `max-width: var(--measure-xs); margin-inline: auto` | max-width: var(--measure-xs) |
| `.clamp-sm` | utility | `max-width: var(--measure-sm); margin-inline: auto` | max-width: var(--measure-sm) |
| `.clamp-md` | utility | `max-width: var(--measure-md); margin-inline: auto` | max-width: var(--measure-md) |
| `.clamp-bs` | utility | `max-width: var(--measure-bs); margin-inline: auto` | max-width: var(--measure-bs) |
| `.clamp-lg` | utility | `max-width: var(--measure-lg); margin-inline: auto` | max-width: var(--measure-lg) |
| `.clamp-xl` | utility | `max-width: var(--measure-xl); margin-inline: auto` | max-width: var(--measure-xl) |
| `.clamp-2xl` | utility | `max-width: var(--measure-2xl); margin-inline: auto` | max-width: var(--measure-2xl) |
| `.clamp-3xl` | utility | `max-width: var(--measure-3xl); margin-inline: auto` | max-width: var(--measure-3xl) |
| `.clamp-4xl` | utility | `max-width: var(--measure-4xl); margin-inline: auto` | max-width: var(--measure-4xl) |
| `.wfull` | utility | `width: 100%` | Full width |
| `.hfull` | utility | `height: 100%` | Full height |
| `.wmax` | utility | `width: max-content` | Max width |
| `.hmax` | utility | `height: max-content` | Max height |
| `.full` | utility | `width: 100%; height: 100%` | Full width and height |
| `.wmin0` | utility | `min-width: 0` | Zero min-width |
| `.hmin0` | utility | `min-height: 0` | Zero min-height |
| `.min0` | utility | `min-width: 0; min-height: 0` | Zero min-width and min-height |
| `.hfull-dvh` | utility | `min-height: 100dvh` | Full viewport height |
| `.hfull-fitted` | utility | `min-height: calc(100dvh - var(--header-height) - var(--footer-height))` | Full viewport height, fitted between the header and the footer |

---

## containers.css

The structural foundations — .box, .row and .grid with their axis modifiers — plus positioning, scrolling, grid steps and frames. The prose columns, frames and the reel style their children and sit in the `components` layer; everything else is a utility.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.box` | utility | `display: flex; flex-direction: column` | Flex column container — the vertical structural foundation |
| `.column` | utility | `display: flex; flex-direction: column` | Flex column container — the vertical structural foundation |
| `.xcenter` | utility | `align-items: center; text-align: center` | align-items: center — modifier of .box |
| `.xleft` | utility | `align-items: flex-start; text-align: left` | align-items: flex-start — modifier of .box |
| `.xright` | utility | `align-items: flex-end; text-align: right` | align-items: flex-end — modifier of .box |
| `.ycenter` | utility | `justify-content: center` | justify-content: center — modifier of .box |
| `.ytop` | utility | `justify-content: flex-start` | justify-content: flex-start — modifier of .box |
| `.ybot` | utility | `justify-content: flex-end` | justify-content: flex-end — modifier of .box |
| `.ybetween` | utility | `justify-content: space-between` | justify-content: space-between — modifier of .box |
| `.yevenly` | utility | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .box |
| `.yaround` | utility | `justify-content: space-around` | justify-content: space-around — modifier of .box |
| `.yinherit` | utility | `justify-content: inherit` | Take the parent container's alignment on the y axis |
| `.xinherit` | utility | `align-items: inherit` | Take the parent container's alignment on the x axis |
| `.row` | utility | `display: flex; flex-direction: row` | Flex row container — the horizontal structural foundation |
| `.xbetween` | utility | `justify-content: space-between` | justify-content: space-between — modifier of .row |
| `.xevenly` | utility | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .row |
| `.xaround` | utility | `justify-content: space-around` | justify-content: space-around — modifier of .row |
| `.grid` | utility | `display: grid` | CSS grid container — the third structural foundation |
| `.grid-1` | utility | `display: grid` | Grid with 1 columns |
| `.grid-2` | utility | `display: grid` | Grid with 2 columns |
| `.grid-3` | utility | `display: grid` | Grid with 3 columns |
| `.grid-4` | utility | `display: grid` | Grid with 4 columns |
| `.grid-5` | utility | `display: grid` | Grid with 5 columns |
| `.grid-6` | utility | `display: grid` | Grid with 6 columns |
| `.grid-7` | utility | `display: grid` | Grid with 7 columns |
| `.center` | utility | `place-items: center` | place-items: center — modifier of .grid |
| `.xstretch` | utility | `justify-items: stretch` | justify-items: stretch — modifier of .grid |
| `.ystretch` | utility | `align-items: stretch` | align-items: stretch — modifier of .grid |
| `.grid-8` | utility | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 8 columns |
| `.grid-9` | utility | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 9 columns |
| `.grid-10` | utility | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 10 columns |
| `.grid-11` | utility | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 11 columns |
| `.grid-12` | utility | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 12 columns |
| `.cspan-1` | utility | `grid-column: span 1` | Span 1 grid columns |
| `.cspan-2` | utility | `grid-column: span 2` | Span 2 grid columns |
| `.cspan-3` | utility | `grid-column: span 3` | Span 3 grid columns |
| `.cspan-4` | utility | `grid-column: span 4` | Span 4 grid columns |
| `.cspan-5` | utility | `grid-column: span 5` | Span 5 grid columns |
| `.cspan-6` | utility | `grid-column: span 6` | Span 6 grid columns |
| `.cspan-7` | utility | `grid-column: span 7` | Span 7 grid columns |
| `.cspan-8` | utility | `grid-column: span 8` | Span 8 grid columns |
| `.cspan-9` | utility | `grid-column: span 9` | Span 9 grid columns |
| `.cspan-10` | utility | `grid-column: span 10` | Span 10 grid columns |
| `.cspan-11` | utility | `grid-column: span 11` | Span 11 grid columns |
| `.cspan-12` | utility | `grid-column: span 12` | Span 12 grid columns |
| `.card-grid` | utility | `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--card-min), 100%), 1fr))` | Auto-fit card grid — the column count negotiates the width |
| `.wrap` | utility | `flex-wrap: wrap` | Allow flex wrapping |
| `.grow` | utility | `flex: 1 1 0%` | Flex grow — take the remaining space (flex: 1 1 0%) |
| `.shrink-0` | utility | `flex-shrink: 0` | Never shrink below the content size |
| `.relative` | utility | `position: relative` | position: relative — the anchor for absolute children |
| `.absolute` | utility | `position: absolute` | position: absolute |
| `.cover` | utility | `position: absolute; inset: 0` | Fill the containing block |
| `.fixed` | utility | `position: fixed` | position: fixed |
| `.sticky` | utility | `position: sticky` | position: sticky |
| `.z-sticky` | utility | `z-index: var(--z-sticky)` | z-index: var(--z-sticky) |
| `.z-raised` | utility | `z-index: var(--z-raised)` | z-index: var(--z-raised) |
| `.z-modal` | utility | `z-index: var(--z-modal)` | z-index: var(--z-modal) |
| `.z-toast` | utility | `z-index: var(--z-toast)` | z-index: var(--z-toast) |
| `.scroll-y` | utility | `overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain` | Scroll vertically |
| `.scroll-x` | utility | `overflow-x: auto; overflow-y: hidden; overscroll-behavior: contain` | Scroll horizontally |
| `.scroll-menu` | utility | `max-height: 16rem; overflow-y: auto; overscroll-behavior: contain` | A list that scrolls past 16rem — dropdown and option lists |
| `.scroll-pad` | utility | `scroll-padding-block: var(--space-xl)` | scroll-padding-block: var(--space-xl) |
| `.scroll-thin` | utility | `scrollbar-width: thin; scrollbar-color: var(--border-strong) transparent` | A thin scrollbar in the border colour |
| `.scroll-hidden` | utility | `scrollbar-width: none` | Hide the scrollbar |
| `.pointer` | utility | `cursor: pointer` | Pointer cursor for clickable rows and labels that are not buttons |
| `.pointer-none` | utility | `pointer-events: none` | Ignore pointer events |
| `.pointer-auto` | utility | `pointer-events: auto` | Restore pointer events |
| `.select-none` | utility | `user-select: none; -webkit-user-select: none` | Disable text selection |
| `.square` | utility | `aspect-ratio: 1` | A 1:1 box — unlike .frame-1-1, it does not crop or position |
| `.dim` | utility | `opacity: 0.5` | Fade the surface to half opacity |
| `.touch-none` | utility | `touch-action: none` | No touch scrolling — for drag surfaces like sliders and pads |
| `.fit-cover` | utility | `object-fit: cover` | object-fit: cover — media fills and crops |
| `.fit-contain` | utility | `object-fit: contain` | object-fit: contain — media fits whole, letterboxed |
| `.fit-fill` | utility | `object-fit: fill` | object-fit: fill — media stretches to the box |
| `.fit-scale-down` | utility | `object-fit: scale-down` | object-fit: scale-down — never larger than its natural size |
| `.pin-tl` | utility | `position: absolute; z-index: var(--z-raised)` | Pinned to the top-left corner of the nearest positioned parent |
| `.pin-tr` | utility | `position: absolute; z-index: var(--z-raised)` | Pinned to the top-right corner of the nearest positioned parent |
| `.pin-bl` | utility | `position: absolute; z-index: var(--z-raised)` | Pinned to the bottom-left corner of the nearest positioned parent |
| `.pin-br` | utility | `position: absolute; z-index: var(--z-raised)` | Pinned to the bottom-right corner of the nearest positioned parent |
| `.sr-only` | utility | `position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0` | Visually hidden, still focusable and read by screen readers |
| `.prose` | components | `max-width: var(--prose-clamp); margin-inline: auto; display: flex; flex-direction: column; gap: var(--space-bs)` | Reading measure — a clamped content width |
| `.prose-left` | components | `max-width: var(--prose-clamp); margin-right: auto; display: flex; flex-direction: column; gap: var(--space-sm)` | Reading measure, aligned to the start edge |
| `.frame-16-9` | components | `aspect-ratio: 16 / 9; overflow: hidden; position: relative` | aspect-ratio: 16 / 9 |
| `.frame-9-16` | components | `aspect-ratio: 9 / 16; overflow: hidden; position: relative` | aspect-ratio: 9 / 16 |
| `.frame-4-3` | components | `aspect-ratio: 4 / 3; overflow: hidden; position: relative` | aspect-ratio: 4 / 3 |
| `.frame-3-4` | components | `aspect-ratio: 3 / 4; overflow: hidden; position: relative` | aspect-ratio: 3 / 4 |
| `.frame-3-2` | components | `aspect-ratio: 3 / 2; overflow: hidden; position: relative` | aspect-ratio: 3 / 2 |
| `.frame-2-3` | components | `aspect-ratio: 2 / 3; overflow: hidden; position: relative` | aspect-ratio: 2 / 3 |
| `.frame-1-1` | components | `aspect-ratio: 1 / 1; overflow: hidden; position: relative` | aspect-ratio: 1 / 1 |
| `.reel` | components | `display: flex; flex-direction: row; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: inline mandatory` | Scroll-snap rail — the children snap to the rail |
| `.inline` | utility | `display: inline` | display: inline |
| `.block` | utility | `display: block` | display: block |
| `.inline-block` | utility | `display: inline-block` | display: inline-block |
| `.inline-flex` | utility | `display: inline-flex` | display: inline-flex |
| `.contents` | utility | `display: contents` | display: contents — the box disappears, the children remain |
| `.inline-grid` | utility | `display: inline-grid` | display: inline-grid |
| `.table` | utility | `display: table` | display: table |
| `.display-none` | utility | `display: none` | display: none |
| `.overflow-hidden` | utility | `overflow: hidden` | Clip the overflow |
| `.overflow-visible` | utility | `overflow: visible` | Let the overflow show |
| `.isolate` | utility | `isolation: isolate` | Create a stacking context |
| `.flex-shrink` | utility | `flex-shrink: 1` | Allow shrinking again — undoes .shrink-0 |
| `.shrink` | utility | `flex-shrink: 1` | flex-shrink: 1 |

---

## typography.css

Type scale, semantic text roles, weight, line height, letter spacing and alignment. The text roles (`.page-title`, `.card-title`, `.nav-link` …) and the long-form descendant rules sit in the `components` layer, so `text-*`, `weight-*`, `lh*` and `ls-*` utilities override them.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.text-xs` | utility | `font-size: var(--text-xs)` | Text size at the xs step — rides --text-xs |
| `.text-sm` | utility | `font-size: var(--text-sm)` | Text size at the sm step — rides --text-sm |
| `.text-md` | utility | `font-size: var(--text-md)` | Text size at the md step — rides --text-md |
| `.text-bs` | utility | `font-size: var(--text-bs)` | Text size at the bs step — rides --text-bs |
| `.text-lg` | utility | `font-size: var(--text-lg)` | Text size at the lg step — rides --text-lg |
| `.text-xl` | utility | `font-size: var(--text-xl)` | Text size at the xl step — rides --text-xl |
| `.text-2xl` | utility | `font-size: var(--text-2xl)` | Text size at the 2xl step — rides --text-2xl |
| `.text-3xl` | utility | `font-size: var(--text-3xl)` | Text size at the 3xl step — rides --text-3xl |
| `.text-4xl` | utility | `font-size: var(--text-4xl)` | Text size at the 4xl step — rides --text-4xl |
| `.text-5xl` | utility | `font-size: var(--text-5xl)` | Text size at the 5xl step — rides --text-5xl |
| `.text-body` | components | `font-size: var(--text-bs); line-height: 1.55` | Body copy at the base size |
| `.text-body-lg` | components | `font-size: var(--text-lg); line-height: 1.5` | Body copy at the large size |
| `.text-body-sm` | components | `font-size: var(--text-md); line-height: 1.5` | Body copy at the small size |
| `.page-title` | components | `font-size: var(--text-3xl); line-height: 1.1; font-weight: 600; letter-spacing: -0.02rem` | Page title — the largest type on the page |
| `.page-desc` | components | `font-size: var(--text-md); line-height: 1.5` | Page description — large and airy |
| `.page-heading-xl` | components | `font-size: var(--text-xl); line-height: 1.1; font-weight: 600; letter-spacing: -0.01rem` | Page heading, xl rung |
| `.page-heading-lg` | components | `font-size: var(--text-lg); line-height: 1.1; font-weight: 600; letter-spacing: -0.01rem` | Page heading, lg rung |
| `.page-heading-bs` | components | `font-size: var(--text-bs); line-height: 1.1; font-weight: 600; letter-spacing: -0.01rem` | Page heading, base rung |
| `.page-heading` | components | `font-size: var(--text-bs); line-height: 1.1; font-weight: 600; letter-spacing: -0.01rem` | font-size: var(--text-bs) |
| `.card-title` | components | `font-size: var(--text-bs); font-weight: 600; line-height: 1.2` | Card title |
| `.card-desc` | components | `font-size: var(--text-md); line-height: 1.2` | Card description |
| `.nav-link` | components | `font-size: var(--text-md); line-height: 1.2; letter-spacing: 0.01rem` | Nav link — padded, curved, filled on hover |
| `.toc-link` | components | `font-size: var(--text-md); line-height: 1.2; letter-spacing: 0.01rem` | font-size: var(--text-md) |
| `.nav-link-sm` | components | `font-size: var(--text-sm); line-height: 1.2` | font-size: var(--text-sm) |
| `.toc-link-sm` | components | `font-size: var(--text-sm); line-height: 1.2` | font-size: var(--text-sm) |
| `.nav-header` | components | `font-size: var(--text-sm); line-height: 1.1; font-weight: 500; padding: var(--space-sm)` | Nav group header |
| `.toc-header` | components | `font-size: var(--text-sm); line-height: 1.1; font-weight: 500; padding: var(--space-sm)` | font-size: var(--text-sm) |
| `.lh11` | utility | `line-height: 1.1` | Line height 1.1 |
| `.lh12` | utility | `line-height: 1.2` | Line height 1.2 |
| `.lh13` | utility | `line-height: 1.3` | Line height 1.3 |
| `.lh14` | utility | `line-height: 1.4` | Line height 1.4 |
| `.lh15` | utility | `line-height: 1.5` | Line height 1.5 |
| `.lh16` | utility | `line-height: 1.6` | Line height 1.6 |
| `.ls-tight-bs` | utility | `letter-spacing: -0.01rem` | Tight letter spacing at the bs step |
| `.ls-tight-lg` | utility | `letter-spacing: -0.02rem` | Tight letter spacing at the lg step |
| `.ls-tight-xl` | utility | `letter-spacing: -0.03rem` | Tight letter spacing at the xl step |
| `.ls-wide-bs` | utility | `letter-spacing: 0.01rem` | Wide letter spacing at the bs step |
| `.ls-wide-lg` | utility | `letter-spacing: 0.02rem` | Wide letter spacing at the lg step |
| `.ls-wide-xl` | utility | `letter-spacing: 0.03rem` | Wide letter spacing at the xl step |
| `.weight-300` | utility | `font-weight: 300` | Font weight 300 |
| `.weight-400` | utility | `font-weight: 400` | Font weight 400 |
| `.weight-500` | utility | `font-weight: 500` | Font weight 500 |
| `.weight-600` | utility | `font-weight: 600` | Font weight 600 |
| `.weight-700` | utility | `font-weight: 700` | Font weight 700 |
| `.weight-800` | utility | `font-weight: 800` | Font weight 800 |
| `.tt-u` | utility | `text-transform: uppercase` | Text transform — uppercase |
| `.tt-c` | utility | `text-transform: capitalize` | Text transform — capitalize |
| `.ta-c` | utility | `text-align: center` | Text align — centre |
| `.ta-l` | utility | `text-align: left` | Text align — left |
| `.ta-r` | utility | `text-align: right` | Text align — right |
| `.mleft` | utility | `text-align: left` | Keep the reading measure on the left when the text is centred |
| `.truncate` | utility | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` | One-line ellipsis truncation |
| `.font-sans` | utility | `font-family: var(--font-sans)` | The sans font stack |
| `.font-mono` | utility | `font-family: var(--font-mono)` | The monospace font stack |
| `.doc-element` | components | `margin-bottom: 1.5rem` | An element inside prose content |
| `.prose-content` | components | — | Prose content — the reading measure of a long text |
| `.tabular-nums` | utility | `font-variant-numeric: tabular-nums` | font-variant-numeric: tabular-nums |
| `.header-nav` | components | — | .header-nav rule |
| `.page-header` | components | — | A page's title block — flex column for the breadcrumb, title and description |
| `.code-in-p` | components | — | .code-in-p rule |

---

## border-elevation-focus.css

The partition-law border set (per side, three weights), elevation steps, the surfaces and the focus rings. The bundled surfaces (`.elevated`, `.glass`, `.paneled`, `.overlayed`) sit in the `components` layer; borders, shadows, `.outlined` and `.vacant` are utilities and win over them.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.border` | utility | `border: 1px solid var(--border)` | Full border at the standard weight |
| `.border-subtle` | utility | `border: 1px solid var(--border-subtle)` | Full border at the subtle weight |
| `.border-strong` | utility | `border: 1px solid var(--border-strong)` | Full border at the strong weight |
| `.border-dashed` | utility | `border: 1px dashed var(--border)` | border: 1px dashed var(--border) |
| `.border-none` | utility | `border: none` | border: none |
| `.bt` | utility | `border-top: 1px solid var(--border)` | border-top: 1px solid var(--border) |
| `.br` | utility | `border-right: 1px solid var(--border)` | border-right: 1px solid var(--border) |
| `.bb` | utility | `border-bottom: 1px solid var(--border)` | border-bottom: 1px solid var(--border) |
| `.bl` | utility | `border-left: 1px solid var(--border)` | border-left: 1px solid var(--border) |
| `.bt-str` | utility | `border-top: 1px solid var(--border-strong)` | border-top: 1px solid var(--border-strong) |
| `.br-str` | utility | `border-right: 1px solid var(--border-strong)` | border-right: 1px solid var(--border-strong) |
| `.bb-str` | utility | `border-bottom: 1px solid var(--border-strong)` | border-bottom: 1px solid var(--border-strong) |
| `.bl-str` | utility | `border-left: 1px solid var(--border-strong)` | border-left: 1px solid var(--border-strong) |
| `.bt-sub` | utility | `border-top: 1px solid var(--border-subtle)` | border-top: 1px solid var(--border-subtle) |
| `.br-sub` | utility | `border-right: 1px solid var(--border-subtle)` | border-right: 1px solid var(--border-subtle) |
| `.bb-sub` | utility | `border-bottom: 1px solid var(--border-subtle)` | border-bottom: 1px solid var(--border-subtle) |
| `.bl-sub` | utility | `border-left: 1px solid var(--border-subtle)` | border-left: 1px solid var(--border-subtle) |
| `.bt-dash` | utility | `border-top: 1px dashed var(--border)` | border-top: 1px dashed var(--border) |
| `.br-dash` | utility | `border-right: 1px dashed var(--border)` | border-right: 1px dashed var(--border) |
| `.bb-dash` | utility | `border-bottom: 1px dashed var(--border)` | border-bottom: 1px dashed var(--border) |
| `.bl-dash` | utility | `border-left: 1px dashed var(--border)` | border-left: 1px dashed var(--border) |
| `.shad-none` | utility | `box-shadow: none` | box-shadow: none |
| `.shad-xs` | utility | `box-shadow: var(--shadow-xs)` | Elevation at the xs step — rides --shadow-xs |
| `.shad-sm` | utility | `box-shadow: var(--shadow-sm)` | Elevation at the sm step — rides --shadow-sm |
| `.shad-md` | utility | `box-shadow: var(--shadow-md)` | Elevation at the md step — rides --shadow-md |
| `.shad-bs` | utility | `box-shadow: var(--shadow-bs)` | Elevation at the bs step — rides --shadow-bs |
| `.shad-lg` | utility | `box-shadow: var(--shadow-lg)` | Elevation at the lg step — rides --shadow-lg |
| `.shad-xl` | utility | `box-shadow: var(--shadow-xl)` | Elevation at the xl step — rides --shadow-xl |
| `.shad-2xl` | utility | `box-shadow: var(--shadow-2xl)` | Elevation at the 2xl step — rides --shadow-2xl |
| `.shad-3xl` | utility | `box-shadow: var(--shadow-3xl)` | Elevation at the 3xl step — rides --shadow-3xl |
| `.shad-hover-xs` | utility | `box-shadow: var(--shadow-xs)` | Elevation on hover at the xs step — rides --shadow-xs |
| `.shad-hover-sm` | utility | `box-shadow: var(--shadow-sm)` | Elevation on hover at the sm step — rides --shadow-sm |
| `.shad-hover-md` | utility | `box-shadow: var(--shadow-md)` | Elevation on hover at the md step — rides --shadow-md |
| `.shad-hover-bs` | utility | `box-shadow: var(--shadow-bs)` | Elevation on hover at the bs step — rides --shadow-bs |
| `.shad-hover-lg` | utility | `box-shadow: var(--shadow-lg)` | Elevation on hover at the lg step — rides --shadow-lg |
| `.shad-hover-xl` | utility | `box-shadow: var(--shadow-xl)` | Elevation on hover at the xl step — rides --shadow-xl |
| `.shad-hover-2xl` | utility | `box-shadow: var(--shadow-2xl)` | Elevation on hover at the 2xl step — rides --shadow-2xl |
| `.shad-hover-3xl` | utility | `box-shadow: var(--shadow-3xl)` | Elevation on hover at the 3xl step — rides --shadow-3xl |
| `.focus-ring` | utility | `outline: 2px solid var(--ring); outline-offset: 1px` | The default focus ring |
| `.focus-theme` | utility | `outline: 2px solid var(--theme-color); outline-offset: 2px` | A focus ring in the theme colour |
| `.focus-none` | utility | `outline: none` | No focus ring |
| `.elevated` | components | `background-color: var(--bg-surface); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-rim), var(--shadow-md)` | background-color: var(--bg-surface) |
| `.glass` | components | `border: 1px solid var(--border); box-shadow: var(--shadow-rim), var(--shadow-md); background-color: color-mix(in oklab, var(--bg-overlay) var(--glass-alpha), transpa…` | border: 1px solid var(--border) |
| `.paneled` | components | `background-color: var(--bg-panel); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-rim), var(--shadow-md)` | background-color: var(--bg-panel) |
| `.overlayed` | components | `background-color: var(--bg-overlay); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-rim), var(--shadow-md)` | background-color: var(--bg-overlay) |
| `.outlined` | utility | `border: 1px solid var(--border)` | border: 1px solid var(--border) |
| `.vacant` | utility | `background-color: transparent` | background-color: transparent |
| `.backdrop-blur` | utility | `backdrop-filter: blur(0.25rem); -webkit-backdrop-filter: blur(0.25rem)` | backdrop-filter: blur(0.25rem) |
| `.field` | utility | `transition: border-color var(--motionin1), box-shadow var(--motionin1)` | A framed control — the frame shows focus for the input inside it |
| `.rim` | utility | `box-shadow: var(--shadow-rim)` | box-shadow: var(--shadow-rim) |
| `.glow` | utility | `box-shadow: 0 0 0 1px color-mix(in oklab, var(--theme-color) 45%, transparent), 0 0 2rem -0.5rem var(--theme-color)` | box-shadow: 0 0 0 1px color-mix(in oklab, var(--theme-color) 45%, transparent), 0 0 2rem -0.5rem var(--theme-color) |

---

## layout-shell.css

Application chrome — header, main, sidebars, footer, the content widths and the floating / dialog / layer family. The whole file sits in the `components` layer: a utility on the same element always wins.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.app-shell` | components | `display: flex; flex-direction: column; position: relative` | Application shell root — flex column, full height, hosts the header, main and footer |
| `.app-header` | components | `display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: var(--space-bs); position: sticky; top: 0; z-index: var(--z-sticky); he…` | Sticky application header |
| `.clamped` | components | `width: var(--content-clamp); margin-inline: auto` | Clamp to the content width and centre |
| `.app-main` | components | `flex: 1 1 0%; min-width: 0; min-height: calc(100dvh - var(--fit-height)); display: flex; flex-direction: row` | Main region between header and footer — flex row, fitted to the viewport |
| `.main-section` | components | `flex: 1 1 0%; min-width: 0` | Primary content column inside .app-main |
| `.solo` | components | `padding-inline: var(--app-inline)` | The main section is the only column |
| `.sidebar-left` | components | `display: none; position: sticky; top: var(--header-height); height: calc(100dvh - var(--fit-height)); overflow-y: auto; scrollbar-color: oklch(0.95 0.001 50) var(--bg)` | Left rail — nav role; off-canvas drawer on narrow screens |
| `.sidebar-right` | components | `display: none; position: sticky; top: var(--header-height); height: calc(100dvh - var(--fit-height)); overflow-y: auto; scrollbar-color: oklch(0.95 0.001 50) var(--bg)` | Right rail — table of contents |
| `.open` | components | — | Open state |
| `.app-footer` | components | `display: flex; flex-direction: row; align-items: center; padding-inline: var(--app-inline); min-height: var(--footer-height); justify-content: space-between; gap: va…` | Application footer |
| `.content-section` | components | `width: 100%; display: flex; flex-direction: column; gap: var(--space-bs)` | Page content block — responsive padding and narrow width modes |
| `.null` | components | `padding-inline: 0 var(--space-bs)` | No width constraint |
| `.narrow-half` | components | `width: var(--measure-lg); margin-inline: auto` | Half the content width |
| `.narrow-wide` | components | `width: var(--measure-xl); margin-inline: auto` | Wide content width |
| `.narrow-full` | components | `width: var(--measure-lg); margin-inline: auto` | Full content width |
| `.nav-section` | components | `display: flex; flex-direction: column` | display: flex |
| `.logo-link` | components | `display: inline-flex; align-items: center; text-decoration: none; color: inherit` | display: inline-flex |
| `.toc-section` | components | `display: flex; flex-direction: column` | display: flex |
| `.anchor` | components | `anchor-name: var(--anchor)` | anchor-name: var(--anchor) |
| `.floating` | components | `position: fixed; position-anchor: var(--anchor); inset: auto; max-height: calc(100dvh - var(--space-lg)); position-try-fallbacks: flip-block, flip-inline, flip-block…` | position: fixed |
| `.at-top` | components | `position-area: top; margin-bottom: var(--offset); transform-origin: bottom` | position-area: top — modifier of .floating |
| `.at-top-start` | components | `position-area: top span-right; margin-bottom: var(--offset); transform-origin: bottom left` | position-area: top span-right — modifier of .floating |
| `.at-top-end` | components | `position-area: top span-left; margin-bottom: var(--offset); transform-origin: bottom right` | position-area: top span-left — modifier of .floating |
| `.at-bottom` | components | `position-area: bottom; margin-top: var(--offset); transform-origin: top` | position-area: bottom — modifier of .floating |
| `.at-bottom-start` | components | `position-area: bottom span-right; margin-top: var(--offset); transform-origin: top left` | position-area: bottom span-right — modifier of .floating |
| `.at-bottom-end` | components | `position-area: bottom span-left; margin-top: var(--offset); transform-origin: top right` | position-area: bottom span-left — modifier of .floating |
| `.at-left` | components | `position-area: left; margin-right: var(--offset); transform-origin: right` | position-area: left — modifier of .floating |
| `.at-right` | components | `position-area: right; margin-left: var(--offset); transform-origin: left` | position-area: right — modifier of .floating |
| `.at-right-start` | components | `position-area: right span-bottom; margin-left: var(--offset); transform-origin: top left` | position-area: right span-bottom — modifier of .floating |
| `.at-left-start` | components | `position-area: left span-bottom; margin-right: var(--offset); transform-origin: top right` | position-area: left span-bottom — modifier of .floating |
| `.at-left-end` | components | `position-area: left span-top; margin-right: var(--offset); transform-origin: bottom right` | position-area: left span-top — modifier of .floating |
| `.at-right-end` | components | `position-area: right span-top; margin-left: var(--offset); transform-origin: bottom left` | position-area: right span-top — modifier of .floating |
| `.match-anchor` | components | `min-width: anchor-size(width)` | min-width: anchor-size(width) — modifier of .floating |
| `.at-pointer` | components | `position: fixed; left: calc(var(--px, 0) * 1px); top: calc(var(--py, 0) * 1px); width: 0; height: 0; pointer-events: none; anchor-name: var(--anchor)` | position: fixed |
| `.dialog` | components | `margin: auto; max-width: calc(100vw - var(--space-xl)); max-height: calc(100dvh - var(--space-xl))` | margin: auto |
| `.modal-pos` | components | `position: fixed; inset: 0; margin: auto; height: fit-content; width: calc(100vw - var(--space-xl)); max-height: calc(100dvh - var(--space-xl))` | position: fixed |
| `.sheet` | components | `margin: 0; max-width: 100vw; max-height: 100dvh` | margin: 0 — modifier of .dialog |
| `.fullscreen` | components | `width: 100%; height: 100%; max-width: none; max-height: none` | width: 100% — modifier of .dialog |
| `.open-column` | components | `display: flex; flex-direction: column` | display: flex — attribute variant |
| `.sized` | components | `width: var(--size, auto)` | width: var(--size, auto) |
| `.layer` | components | `position: fixed; inset: auto` | position: fixed |
| `.page-section` | components | `display: flex; flex-direction: column; padding-bottom: var(--space-2xl); padding-top: var(--space-xs)` | display: flex |
| `.page-content` | components | `display: flex; flex-direction: column; gap: var(--space-bs)` | display: flex |

---

## colors-themes.css

Colour roles. Name the role, never the value; the theme remaps the token. The parametric --hue / --chroma / --tint recipe and the named data-theme palettes live here (tokens in the `tokens` layer, the data-theme painter in `base`). The `.state-*` fills come after every resting `bg-*`, so a state paints over it.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.bg-main` | utility | `background-color: var(--bg)` | The page background |
| `.bg` | utility | `background-color: var(--bg)` | The page background |
| `.bg-surface` | utility | `background-color: var(--bg-surface)` | Surface fill — cards, panels, inputs |
| `.bg-panel` | utility | `background-color: var(--bg-panel)` | Panel fill — one step below the surface |
| `.bg-overlay` | utility | `background-color: var(--bg-overlay)` | Overlay fill — opaque, for menus, popovers, dialogs and drawers |
| `.bg-scrim` | utility | `background-color: var(--scrim)` | background-color: var(--scrim) |
| `.bg-theme` | utility | `background-color: var(--theme-color)` | background-color: var(--theme-color) |
| `.bg-none` | utility | `background: transparent` | No background |
| `.bg-black` | utility | `background-color: var(--black-fixed)` | Fixed black fill |
| `.bg-white` | utility | `background-color: var(--white-fixed)` | background-color: var(--white-fixed) |
| `.bg-input` | utility | `background-color: var(--bg-input)` | Input fill |
| `.bg-button` | utility | `background-color: var(--bg-button)` | Button fill |
| `.bg-button-secondary` | utility | `background-color: var(--bg-button-secondary)` | Secondary button fill |
| `.text-primary` | utility | `color: var(--text-primary)` | Primary ink |
| `.text-secondary` | utility | `color: var(--text-secondary)` | Secondary ink |
| `.text-muted` | utility | `color: var(--text-muted)` | Muted ink |
| `.text-inverse` | utility | `color: var(--text-inverse)` | Ink for a filled surface |
| `.text-white` | utility | `color: var(--white-fixed)` | Fixed white ink |
| `.text-black` | utility | `color: var(--black-fixed)` | Fixed black ink |
| `.text-theme` | utility | `color: var(--theme-color)` | Theme colour ink |
| `.text-theme-up` | utility | `color: var(--theme-color-up)` | Theme colour, one step up |
| `.text-theme-down` | utility | `color: var(--theme-color-down)` | Theme colour, one step down |
| `.text-success` | utility | `color: var(--success)` | Success ink |
| `.text-warning` | utility | `color: var(--warning)` | Warning ink |
| `.text-danger` | utility | `color: var(--danger)` | Danger ink |
| `.text-info` | utility | `color: var(--info)` | Info ink |
| `.text-neutral` | utility | `color: var(--neutral)` | color: var(--neutral) |
| `.bg-success` | utility | `background-color: var(--success); transition: background-color var(--motionout2)` | Success fill |
| `.bg-warning` | utility | `background-color: var(--warning); transition: background-color var(--motionout2)` | Warning fill |
| `.bg-danger` | utility | `background-color: var(--danger); transition: background-color var(--motionout2)` | Danger fill |
| `.bg-info` | utility | `background-color: var(--info); transition: background-color var(--motionout2)` | Info fill |
| `.bg-neutral` | utility | `background-color: var(--neutral); transition: background-color var(--motionout2)` | background-color: var(--neutral) |
| `.state-hover` | utility | `background-color: var(--state-hover)` | The hover fill |
| `.state-selected` | utility | `background-color: var(--state-selected)` | The selected fill |

---

## motion-animation.css

Motion language — easings, durations, the spring tokens, the keyframe animations and the view transitions. `.caret` and `.collapse` are disclosure recipes in the `components` layer.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.mode-wipe` | utility | `animation: none` | On <html> — disables view transitions while a colour-mode wipe runs |
| `.anim-spin` | utility | `animation: spin 1s linear infinite` | Spin — a continuous rotation |
| `.anim-pulse` | utility | `animation: pulse 2s ease-in-out infinite` | Pulse — a fade in and out |
| `.anim-fade-in` | utility | `animation: fade-in var(--speed3) var(--transout3)` | Fade in |
| `.anim-fade-out` | utility | `animation: fade-out var(--speed3) var(--transout3)` | Fade out |
| `.anim-in` | utility | `animation: none` | animation: none |
| `.anim-ping` | utility | `animation: none` | animation: none |
| `.anim-blink` | utility | `animation: none` | animation: none |
| `.anim-shimmer` | utility | `animation: none` | animation: none |
| `.anim-wave` | utility | `animation: none` | animation: none |
| `.anim-stretch` | utility | `animation: none` | animation: none |
| `.anim-slide` | utility | `animation: none` | animation: none |
| `.spring` | utility | `transition-property: translate, scale, rotate, transform, opacity, background-color, border-color, color, box-shadow, filter, width, height, grid-template-rows, grid…` | transition-property: translate, scale, rotate, transform, opacity, background-color, border-color, color, box-shadow, filter, width, height, grid-template-rows, grid… |
| `.spring-gentle` | utility | — | .spring-gentle rule |
| `.spring-snappy` | utility | — | .spring-snappy rule |
| `.spring-bouncy` | utility | — | .spring-bouncy rule |
| `.spring-stiff` | utility | — | .spring-stiff rule |
| `.spring-slow` | utility | — | .spring-slow rule |
| `.motion` | utility | `translate: calc(var(--mx, 0) * 1px) calc(var(--my, 0) * 1px); scale: var(--ms, 1); rotate: calc(var(--mr, 0) * 1deg); opacity: var(--mo, 1)` | translate: calc(var(--mx, 0) * 1px) calc(var(--my, 0) * 1px) |
| `.tilt` | utility | `transform: perspective(50rem) rotateX(calc(var(--rx, 0) * 1deg)) rotateY(calc(var(--ry, 0) * 1deg)); transform-style: preserve-3d` | transform: perspective(50rem) rotateX(calc(var(--rx, 0) * 1deg)) rotateY(calc(var(--ry, 0) * 1deg)) |
| `.lift` | utility | `transition: translate calc(var(--spring-ms) * var(--motion-scale)) var(--spring), box-shadow var(--motionout3)` | Hover lifts the surface a hair and raises its shadow |
| `.press` | utility | `transition: scale calc(var(--spring-ms) * var(--motion-scale)) var(--spring)` | Active press scales the surface in, spring-timed |
| `.vt-name` | utility | `view-transition-name: var(--vt-name)` | view-transition-name: var(--vt-name) |
| `.vt-fade` | utility | `animation: fade-out calc(var(--speed3) * var(--motion-scale)) var(--transout2) both` | animation: fade-out calc(var(--speed3) * var(--motion-scale)) var(--transout2) both |
| `.vt-slide` | utility | `animation: vt-out-left calc(var(--speed3) * var(--motion-scale)) var(--transin1) both` | animation: vt-out-left calc(var(--speed3) * var(--motion-scale)) var(--transin1) both |
| `.vt-slide-back` | utility | `animation: vt-out-right calc(var(--speed3) * var(--motion-scale)) var(--transin1) both` | animation: vt-out-right calc(var(--speed3) * var(--motion-scale)) var(--transin1) both |
| `.vt-scale` | utility | `animation: vt-out-scale calc(var(--speed3) * var(--motion-scale)) var(--transin1) both` | animation: vt-out-scale calc(var(--speed3) * var(--motion-scale)) var(--transin1) both |
| `.vt-reveal` | utility | `animation: none; z-index: 0` | animation: none |
| `.caret` | components | `flex: none; transition: rotate calc(var(--spring-ms) * var(--motion-scale)) var(--spring)` | flex: none |
| `.quarter` | components | `rotate: 90deg` | rotate: 90deg — modifier of .caret |
| `.collapse` | components | `display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--motionout3)` | Opens and closes by height — add .open to open |

---

## types.css

The same axes as data attributes, for components that own their own markup: data-variant, data-shape, data-size, data-gap, data-pad, data-tone, data-text-size, data-measure, data-align, data-surface, data-orientation, data-placement, plus the state twins (data-selected, data-disabled, data-checked, data-highlighted, data-pressed, data-current, data-invalid, data-readonly, data-pending, data-open). Sits in the `types` layer: a data-* variant beats a recipe, a utility beats both. Carries no classes.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.selected` | types | `background-color: var(--bg-button-active); border: 1px solid var(--bg-button-active)` | Selected state — the current item in a set |

---

## custom.css

The sanctioned extension layer — branding, the mascot, and anything a project owns. Shipped, but not part of index.css: import it on purpose.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.site-logomotif` | utility | `height: 48px; transform-origin: center center; transition: transform 210ms var(--transin2)` | Site logo motif — scales on hover |
| `.logotype` | utility | `height: 16px` | Logotype — the wordmark |
| `.project-circle` | utility | `border-radius: 24px; width: 16px; height: 16px` | Project dot |
| `.mascot` | utility | `display: inline-block; position: relative; flex: none; line-height: 0; perspective: var(--mascot-persp, 400px)` | The mascot — the site character |
| `.mascot-bob` | utility | `display: block` | The mascot bobs |
| `.mascot-tilt` | utility | `display: block` | The mascot tilts |
| `.mascot-bobs` | utility | — | .mascot-bobs rule |
| `.mascot-base` | utility | `display: block; user-select: none; -webkit-user-drag: none` | The mascot body |
| `.mascot-overlay` | utility | `position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none` | The mascot overlay |
| `.mascot-mask` | utility | `mask-type: alpha` | The mascot mask |
| `.mascot-pupil-l` | utility | `transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mascot-ply, 0) * 1px))` | The mascot left pupil |
| `.mascot-pupil-r` | utility | `transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mascot-pry, 0) * 1px))` | The mascot right pupil |
| `.mascot-gloss` | utility | `opacity: 0.42; transform: translate(calc(var(--mascot-gx, 400) * 1px), calc(var(--mascot-gy, 400) * 1px))` | The mascot gloss |
| `.mascot-shade` | utility | `opacity: 0.55; transform: translate(calc((1024 - var(--mascot-gx, 400)) * 1px), calc((1120 - var(--mascot-gy, 400)) * 1px))` | The mascot shade |
| `.mascot-lid` | utility | `animation: mascot-blink 5.2s ease-in-out infinite` | The mascot eyelid |
| `.mascot-blinks` | utility | — | .mascot-blinks rule |
| `.mascotgl` | utility | `display: inline-block; position: relative; flex: none; line-height: 0` | display: inline-block |
| `.mascotgl-spacer` | utility | `display: block` | display: block |
| `.mascotgl-canvas` | utility | `position: absolute; left: 50%; top: 50%; width: 160%; height: 160%; transform: translate(-50%, -50%); pointer-events: none; opacity: 0` | position: absolute |
| `.mascotgl-ready` | utility | `opacity: 1` | opacity: 1 |
| `.mascotgl-compact` | utility | — | .mascotgl-compact rule |

---

## modular.css

The sveltemodular workspace chrome. Shipped, but not part of index.css: import it on purpose.

| Class | Cascade | Property | Description |
|:---|:---|:---|:---|
| `.modular` | utility | — | .modular rule |
| `.modular-root` | utility | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; display: flex; overflow: hidden` | position: relative |
| `.modular-split` | utility | `display: flex; flex: 1 1 0%; min-width: 0; min-height: 0; width: 100%; height: 100%; overflow: hidden; gap: 0` | display: flex |
| `.modular-split-child` | utility | `position: relative; display: flex; min-width: 0; min-height: 0; overflow: hidden` | position: relative |
| `.modular-divider` | utility | `position: relative; flex: 0 0 var(--modular-gap); background: transparent; transition: background 120ms ease; z-index: 2; touch-action: none` | position: relative |
| `.active` | utility | `background: var(--theme-color)` | Active state |
| `.modular-split-ratio-pill` | utility | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border-…` | position: absolute |
| `.modular-panel` | utility | `position: relative; display: flex; flex-direction: column; flex: 1 1 0%; min-width: 0; min-height: 0; background: var(--bg-panel); border-radius: var(--radius-sm); b…` | position: relative |
| `.modular-tabbar` | utility | `display: flex; align-items: center; height: var(--modular-tabbar-height); background: var(--bg-extra); border-bottom: 1px solid var(--border); padding: 0 4px; gap: 2…` | display: flex |
| `.modular-tab` | utility | `position: relative; display: flex; align-items: center; gap: 6px; height: calc(var(--modular-tabbar-height) - 4px); max-width: var(--modular-tab-max-width); padding:…` | position: relative |
| `.modular-tab-title` | utility | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | overflow: hidden |
| `.modular-badge` | utility | `display: inline-flex; align-items: center; justify-content: center; padding: 0 4px; min-width: 14px; height: 14px; border-radius: 7px; background: var(--theme-color)…` | display: inline-flex |
| `.modular-tab-close` | utility | `display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; padding: 0; margin-left: 2px; border: none; border-radius: 2px; backgr…` | display: inline-flex — child of :where(.modular) |
| `.modular-tab-accessory` | utility | `flex: 1 1 0%; display: flex; align-items: center; min-width: 8px` | flex: 1 1 0% |
| `.modular-tab-actions` | utility | `display: flex; align-items: center; gap: 2px` | display: flex |
| `.modular-action-button` | utility | `display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: var(--radius-sm); background:…` | display: inline-flex — child of :where(.modular) |
| `.modular-menu-button` | utility | `display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: var(--radius-sm); background:…` | display: inline-flex — child of :where(.modular) |
| `.modular-panel-body` | utility | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; display: flex; overflow: hidden` | position: relative |
| `.modular-view` | utility | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; width: 100%; height: 100%; overflow: auto` | position: relative |
| `.modular-drop-overlay` | utility | `position: absolute; inset: 0; pointer-events: none; z-index: 50; transition: all 120ms ease` | position: absolute |
| `.modular-drop-indicator` | utility | `position: absolute; background: rgba(34, 197, 94, 0.16); border: 2px dashed var(--theme-color); border-radius: var(--radius-sm); transition: all 100ms ease` | position: absolute |
| `.modular-maximized` | utility | `position: absolute; inset: 0; z-index: 80; display: flex; flex-direction: column; background: var(--bg-panel); border: 1px solid var(--border)` | position: absolute |
| `.modular-maximized-bar` | utility | `display: flex; align-items: center; justify-content: space-between; height: var(--modular-tabbar-height); background: var(--bg-extra); border-bottom: 1px solid var(-…` | display: flex |
| `.modular-maximized-title` | utility | `font-weight: 600` | font-weight: 600 |
| `.modular-maximized-body` | utility | `flex: 1 1 0%; overflow: auto` | flex: 1 1 0% |
| `.modular-floating` | utility | `position: absolute; border-radius: var(--radius-sm); box-shadow: var(--shadow-bs); overflow: hidden; display: flex` | position: absolute |
| `.modular-tabbar-drag` | utility | `cursor: grab` | cursor: grab |
| `.modular-floating-resize` | utility | `position: absolute; right: 0; bottom: 0; width: 14px; height: 14px; cursor: nwse-resize; background: linear-gradient( 135deg, transparent 0 50%, var(--text-muted) 50…` | position: absolute |
| `.modular-hidden-tray` | utility | `position: absolute; right: 8px; bottom: 8px; z-index: 120` | position: absolute |
| `.modular-hidden-button` | utility | `padding: 4px 8px; font: inherit; color: var(--text-muted); background: var(--bg-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); curs…` | padding: 4px 8px |
| `.modular-stage` | utility | `position: relative; flex: 1 1 0%; display: flex; min-width: 0; min-height: 0; overflow: hidden` | position: relative |
| `.modular-stage-child` | utility | `position: relative; flex: 1 1 0%; display: flex; min-width: 0; min-height: 0; z-index: 1` | position: relative |
| `.modular-stage-backdrop` | utility | `position: absolute; inset: 0; pointer-events: none; z-index: 0` | position: absolute |
| `.modular-stage-empty` | utility | `flex: 1 1 0%; display: flex; align-items: center; justify-content: center; color: var(--text-primary)` | flex: 1 1 0% |
| `.modular-empty` | utility | `flex: 1 1 0%; display: flex; align-items: center; justify-content: center; color: var(--text-primary)` | flex: 1 1 0% |
| `.modular-chrome` | utility | `position: absolute; inset: 0; pointer-events: none; z-index: 100` | position: absolute |
| `.modular-menu` | utility | `position: fixed; inset: auto; margin: 0; padding: 4px; background: var(--bg-extra); color: var(--text-primary); border: 1px solid var(--border-strong); border-radius…` | position: fixed |
| `.modular-menu-item` | utility | `display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 4px 8px; border: none; border-radius: var(--radius-sm); background: transpa…` | display: flex — child of :where(dialog.modular-menu) |
| `.danger` | utility | `color: var(--danger, #ef4444)` | Status variant — the danger colour |
| `.modular-menu-separator` | utility | `height: 1px; background: var(--border); margin: 4px 0` | height: 1px |
| `.modular-popout-body` | utility | `margin: 0; padding: 0; width: 100vw; height: 100vh; display: flex; overflow: hidden` | margin: 0 |
| `.modular-popout-view` | utility | `width: 100%; height: 100%; display: flex` | width: 100% |
