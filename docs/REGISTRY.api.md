# Fractalstyler — Class API & Vocabulary Reference

> Comprehensive index of the canonical styling system classes, layers, and intent.
> Generated from `registry.json` via `scripts/class-vocab.js`.

**479** classes indexed across layers.

Every entry is a concrete class — the space families are expanded from the
family maps in `_00_config.sass` across the eight steps `xs sm md bs lg xl 2xl 3xl`.
There are no wildcard families, no literal ladders and no `-mob`/`-desk` bands.
Modifiers nest under their base (`.box.xcenter`), children carry their own name
(`.accordion-content`), and `element[...]` rows are attribute-driven variants.

---

## Layer L0

Tokens and Base resets. L0 defines the CSS custom properties for both color modes (via the =light-theme-tokens / =dark-theme-tokens mixins in _00_tokens.sass), the type/space/radius/motion scales, and native element resets. Never hardcode a raw hex or pixel literal that L0 covers.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.bdr` | `border: 1px solid red` | debug class |
| `.mode-wipe` | `animation: none` | On <html>: disables view-transition animations while a color-mode wipe runs |

## Layer L1

Dimensions. Loop-generated space families — .gap/.rgap/.cgap, .pad/.px/.py/.pt/.pr/.pb/.pl, .mar/.mx/.my/.mt/.mr/.mb/.ml — each across the eight steps (xs sm md bs lg xl 2xl 3xl), all token-routed through var(--space-*). Plus the six radius channels, full/zero sizing, control heights, and viewport heights. No literal ladder; no -mob/-desk bands.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.gap-xs` | `gap: var(--space-xs)` | Gap on both axes (flex/grid) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-sm` | `gap: var(--space-sm)` | Gap on both axes (flex/grid) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-md` | `gap: var(--space-md)` | Gap on both axes (flex/grid) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-bs` | `gap: var(--space-bs)` | Gap on both axes (flex/grid) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-lg` | `gap: var(--space-lg)` | Gap on both axes (flex/grid) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-xl` | `gap: var(--space-xl)` | Gap on both axes (flex/grid) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-2xl` | `gap: var(--space-2xl)` | Gap on both axes (flex/grid) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.gap-3xl` | `gap: var(--space-3xl)` | Gap on both axes (flex/grid) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-xs` | `row-gap: var(--space-xs)` | Row gap (block axis) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-sm` | `row-gap: var(--space-sm)` | Row gap (block axis) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-md` | `row-gap: var(--space-md)` | Row gap (block axis) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-bs` | `row-gap: var(--space-bs)` | Row gap (block axis) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-lg` | `row-gap: var(--space-lg)` | Row gap (block axis) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-xl` | `row-gap: var(--space-xl)` | Row gap (block axis) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-2xl` | `row-gap: var(--space-2xl)` | Row gap (block axis) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.rgap-3xl` | `row-gap: var(--space-3xl)` | Row gap (block axis) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-xs` | `column-gap: var(--space-xs)` | Column gap (inline axis) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-sm` | `column-gap: var(--space-sm)` | Column gap (inline axis) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-md` | `column-gap: var(--space-md)` | Column gap (inline axis) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-bs` | `column-gap: var(--space-bs)` | Column gap (inline axis) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-lg` | `column-gap: var(--space-lg)` | Column gap (inline axis) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-xl` | `column-gap: var(--space-xl)` | Column gap (inline axis) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-2xl` | `column-gap: var(--space-2xl)` | Column gap (inline axis) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.cgap-3xl` | `column-gap: var(--space-3xl)` | Column gap (inline axis) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) |
| `.pad-xs` | `padding: var(--space-xs)` | Padding, all four sides at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-sm` | `padding: var(--space-sm)` | Padding, all four sides at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-md` | `padding: var(--space-md)` | Padding, all four sides at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-bs` | `padding: var(--space-bs)` | Padding, all four sides at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-lg` | `padding: var(--space-lg)` | Padding, all four sides at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-xl` | `padding: var(--space-xl)` | Padding, all four sides at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-2xl` | `padding: var(--space-2xl)` | Padding, all four sides at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pad-3xl` | `padding: var(--space-3xl)` | Padding, all four sides at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-xs` | `padding-inline: var(--space-xs)` | Inline (horizontal) padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-sm` | `padding-inline: var(--space-sm)` | Inline (horizontal) padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-md` | `padding-inline: var(--space-md)` | Inline (horizontal) padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-bs` | `padding-inline: var(--space-bs)` | Inline (horizontal) padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-lg` | `padding-inline: var(--space-lg)` | Inline (horizontal) padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-xl` | `padding-inline: var(--space-xl)` | Inline (horizontal) padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-2xl` | `padding-inline: var(--space-2xl)` | Inline (horizontal) padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.px-3xl` | `padding-inline: var(--space-3xl)` | Inline (horizontal) padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-xs` | `padding-block: var(--space-xs)` | Block (vertical) padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-sm` | `padding-block: var(--space-sm)` | Block (vertical) padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-md` | `padding-block: var(--space-md)` | Block (vertical) padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-bs` | `padding-block: var(--space-bs)` | Block (vertical) padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-lg` | `padding-block: var(--space-lg)` | Block (vertical) padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-xl` | `padding-block: var(--space-xl)` | Block (vertical) padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-2xl` | `padding-block: var(--space-2xl)` | Block (vertical) padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.py-3xl` | `padding-block: var(--space-3xl)` | Block (vertical) padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-xs` | `padding-top: var(--space-xs)` | Top padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-sm` | `padding-top: var(--space-sm)` | Top padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-md` | `padding-top: var(--space-md)` | Top padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-bs` | `padding-top: var(--space-bs)` | Top padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-lg` | `padding-top: var(--space-lg)` | Top padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-xl` | `padding-top: var(--space-xl)` | Top padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-2xl` | `padding-top: var(--space-2xl)` | Top padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pt-3xl` | `padding-top: var(--space-3xl)` | Top padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-xs` | `padding-right: var(--space-xs)` | Right padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-sm` | `padding-right: var(--space-sm)` | Right padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-md` | `padding-right: var(--space-md)` | Right padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-bs` | `padding-right: var(--space-bs)` | Right padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-lg` | `padding-right: var(--space-lg)` | Right padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-xl` | `padding-right: var(--space-xl)` | Right padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-2xl` | `padding-right: var(--space-2xl)` | Right padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pr-3xl` | `padding-right: var(--space-3xl)` | Right padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-xs` | `padding-bottom: var(--space-xs)` | Bottom padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-sm` | `padding-bottom: var(--space-sm)` | Bottom padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-md` | `padding-bottom: var(--space-md)` | Bottom padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-bs` | `padding-bottom: var(--space-bs)` | Bottom padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-lg` | `padding-bottom: var(--space-lg)` | Bottom padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-xl` | `padding-bottom: var(--space-xl)` | Bottom padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-2xl` | `padding-bottom: var(--space-2xl)` | Bottom padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pb-3xl` | `padding-bottom: var(--space-3xl)` | Bottom padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-xs` | `padding-left: var(--space-xs)` | Left padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-sm` | `padding-left: var(--space-sm)` | Left padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-md` | `padding-left: var(--space-md)` | Left padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-bs` | `padding-left: var(--space-bs)` | Left padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-lg` | `padding-left: var(--space-lg)` | Left padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-xl` | `padding-left: var(--space-xl)` | Left padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-2xl` | `padding-left: var(--space-2xl)` | Left padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.pl-3xl` | `padding-left: var(--space-3xl)` | Left padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) |
| `.mar-xs` | `margin: var(--space-xs)` | Margin, all four sides at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-sm` | `margin: var(--space-sm)` | Margin, all four sides at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-md` | `margin: var(--space-md)` | Margin, all four sides at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-bs` | `margin: var(--space-bs)` | Margin, all four sides at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-lg` | `margin: var(--space-lg)` | Margin, all four sides at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-xl` | `margin: var(--space-xl)` | Margin, all four sides at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-2xl` | `margin: var(--space-2xl)` | Margin, all four sides at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mar-3xl` | `margin: var(--space-3xl)` | Margin, all four sides at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-xs` | `margin-inline: var(--space-xs)` | Inline (horizontal) margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-sm` | `margin-inline: var(--space-sm)` | Inline (horizontal) margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-md` | `margin-inline: var(--space-md)` | Inline (horizontal) margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-bs` | `margin-inline: var(--space-bs)` | Inline (horizontal) margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-lg` | `margin-inline: var(--space-lg)` | Inline (horizontal) margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-xl` | `margin-inline: var(--space-xl)` | Inline (horizontal) margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-2xl` | `margin-inline: var(--space-2xl)` | Inline (horizontal) margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mx-3xl` | `margin-inline: var(--space-3xl)` | Inline (horizontal) margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-xs` | `margin-block: var(--space-xs)` | Block (vertical) margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-sm` | `margin-block: var(--space-sm)` | Block (vertical) margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-md` | `margin-block: var(--space-md)` | Block (vertical) margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-bs` | `margin-block: var(--space-bs)` | Block (vertical) margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-lg` | `margin-block: var(--space-lg)` | Block (vertical) margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-xl` | `margin-block: var(--space-xl)` | Block (vertical) margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-2xl` | `margin-block: var(--space-2xl)` | Block (vertical) margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.my-3xl` | `margin-block: var(--space-3xl)` | Block (vertical) margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-xs` | `margin-top: var(--space-xs)` | Top margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-sm` | `margin-top: var(--space-sm)` | Top margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-md` | `margin-top: var(--space-md)` | Top margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-bs` | `margin-top: var(--space-bs)` | Top margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-lg` | `margin-top: var(--space-lg)` | Top margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-xl` | `margin-top: var(--space-xl)` | Top margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-2xl` | `margin-top: var(--space-2xl)` | Top margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mt-3xl` | `margin-top: var(--space-3xl)` | Top margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-xs` | `margin-right: var(--space-xs)` | Right margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-sm` | `margin-right: var(--space-sm)` | Right margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-md` | `margin-right: var(--space-md)` | Right margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-bs` | `margin-right: var(--space-bs)` | Right margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-lg` | `margin-right: var(--space-lg)` | Right margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-xl` | `margin-right: var(--space-xl)` | Right margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-2xl` | `margin-right: var(--space-2xl)` | Right margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mr-3xl` | `margin-right: var(--space-3xl)` | Right margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-xs` | `margin-bottom: var(--space-xs)` | Bottom margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-sm` | `margin-bottom: var(--space-sm)` | Bottom margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-md` | `margin-bottom: var(--space-md)` | Bottom margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-bs` | `margin-bottom: var(--space-bs)` | Bottom margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-lg` | `margin-bottom: var(--space-lg)` | Bottom margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-xl` | `margin-bottom: var(--space-xl)` | Bottom margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-2xl` | `margin-bottom: var(--space-2xl)` | Bottom margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.mb-3xl` | `margin-bottom: var(--space-3xl)` | Bottom margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-xs` | `margin-left: var(--space-xs)` | Left margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-sm` | `margin-left: var(--space-sm)` | Left margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-md` | `margin-left: var(--space-md)` | Left margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-bs` | `margin-left: var(--space-bs)` | Left margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-lg` | `margin-left: var(--space-lg)` | Left margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-xl` | `margin-left: var(--space-xl)` | Left margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-2xl` | `margin-left: var(--space-2xl)` | Left margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.ml-3xl` | `margin-left: var(--space-3xl)` | Left margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) |
| `.radius-xs` | `border-radius: var(--radius-xs)` | border-radius: var(--radius-xs) |
| `.radius-sm` | `border-radius: var(--radius-sm)` | border-radius: var(--radius-sm) |
| `.radius-md` | `border-radius: var(--radius-md)` | border-radius: var(--radius-md) |
| `.radius-bs` | `border-radius: var(--radius-bs)` | border-radius: var(--radius-bs) |
| `.radius-lg` | `border-radius: var(--radius-lg)` | border-radius: var(--radius-lg) |
| `.radius-full` | `border-radius: var(--radius-full)` | border-radius: var(--radius-full) |
| `.wfull` | `width: 100%` | Full width (100%) |
| `.hfull` | `height: 100%` | Full height (100%) |
| `.full` | `width: 100%; height: 100%` | Full width and height (100% both axes) |
| `.minw0` | `min-width: 0` | Zero min-width — lets a flex child shrink below its content |
| `.minh0` | `min-height: 0` | Zero min-height — lets a flex child shrink below its content |
| `.min0` | `min-width: 0; min-height: 0` | Zero min-width and min-height — prevents flex blowouts |
| `.h-sm` | `height: var(--height-sm)` | Control height step sm (var(--height-sm)) |
| `.h-md` | `height: var(--height-md)` | Control height step md (var(--height-md)) |
| `.h-bs` | `height: var(--height-bs)` | Control height step bs (var(--height-bs)) |
| `.h-lg` | `height: var(--height-lg)` | Control height step lg (var(--height-lg)) |
| `.h-xl` | `height: var(--height-xl)` | height: var(--height-xl) |
| `.h-2xl` | `height: var(--height-2xl)` | height: var(--height-2xl) |
| `.hfull-vh` | `min-height: 100vh` | Viewport heights |
| `.hfull-vh-fitted` | `min-height: calc(100vh - var(--fit-height))` | Viewport height fitted between header and footer (var(--fit-height)) |

## Layer L2

Containers and alignment universe. .box (flex-col), .row (flex-row), and .grid (css-grid) are the three structural foundations with strict physical axis modifiers (xcenter, ycenter, xbetween, etc.) nested under their base — never standalone. Positioning, stacking order (.z-sticky, .z-raised, .z-modal, .z-toast), scroll containers and the flex sizing helpers (.grow, .shrink-0, .min0, .wrap) live here too.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.box` | `display: flex; flex-direction: column` | Flex column container — the vertical structural foundation |
| `.box.xcenter` | `align-items: center; text-align: center` | align-items: center — modifier of .box |
| `.box.xleft` | `align-items: flex-start; text-align: left` | align-items: flex-start — modifier of .box |
| `.box.xright` | `align-items: flex-end; text-align: right` | align-items: flex-end — modifier of .box |
| `.box.ycenter` | `justify-content: center` | justify-content: center — modifier of .box |
| `.box.ytop` | `justify-content: flex-start` | justify-content: flex-start — modifier of .box |
| `.box.ybot` | `justify-content: flex-end` | justify-content: flex-end — modifier of .box |
| `.box.ybetween` | `justify-content: space-between` | justify-content: space-between — modifier of .box |
| `.box.yevenly` | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .box |
| `.box.yaround` | `justify-content: space-around` | justify-content: space-around — modifier of .box |
| `.row` | `display: flex; flex-direction: row` | Flex row container — the horizontal structural foundation |
| `.row.xleft` | `justify-content: flex-start` | justify-content: flex-start — modifier of .row |
| `.row.xcenter` | `justify-content: center` | justify-content: center — modifier of .row |
| `.row.xright` | `justify-content: flex-end` | justify-content: flex-end — modifier of .row |
| `.row.xbetween` | `justify-content: space-between` | justify-content: space-between — modifier of .row |
| `.row.xevenly` | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .row |
| `.row.xaround` | `justify-content: space-around` | justify-content: space-around — modifier of .row |
| `.row.ycenter` | `align-items: center` | align-items: center — modifier of .row |
| `.row.ytop` | `align-items: flex-start` | align-items: flex-start — modifier of .row |
| `.row.ybot` | `align-items: flex-end` | align-items: flex-end — modifier of .row |
| `.grid` | `display: grid` | CSS grid container (columns composed via .grid-N / alignment below) |
| `.grid.center` | `place-items: center` | place-items: center — modifier of .grid |
| `.grid.xcenter` | `justify-items: center; text-align: center` | justify-items: center — modifier of .grid |
| `.grid.xleft` | `justify-items: start; text-align: left` | justify-items: start — modifier of .grid |
| `.grid.xright` | `justify-items: end; text-align: right` | justify-items: end — modifier of .grid |
| `.grid.xstretch` | `justify-items: stretch` | justify-items: stretch — modifier of .grid |
| `.grid.ycenter` | `align-items: center` | align-items: center — modifier of .grid |
| `.grid.ytop` | `align-items: start` | align-items: start — modifier of .grid |
| `.grid.ybot` | `align-items: end` | align-items: end — modifier of .grid |
| `.grid.ystretch` | `align-items: stretch` | align-items: stretch — modifier of .grid |
| `.grid.xbetween` | `justify-content: space-between` | justify-content: space-between — modifier of .grid |
| `.grid.xevenly` | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .grid |
| `.grid.xaround` | `justify-content: space-around` | justify-content: space-around — modifier of .grid |
| `.grid.ybetween` | `align-content: space-between` | align-content: space-between — modifier of .grid |
| `.grid.yevenly` | `align-content: space-evenly` | align-content: space-evenly — modifier of .grid |
| `.grid.yaround` | `align-content: space-around` | align-content: space-around — modifier of .grid |
| `.wrap` | `flex-wrap: wrap` | Allow flex wrapping |
| `.grow` | `flex: 1 1 0%` | Flex grow — take remaining space (flex: 1 1 0%) |
| `.shrink-0` | `flex-shrink: 0` | Never shrink below content size |
| `.relative` | `position: relative` | position: relative (anchor for absolute children) |
| `.absolute` | `position: absolute` | position: absolute |
| `.fixed` | `position: fixed` | position: fixed |
| `.sticky` | `position: sticky` | position: sticky |
| `.z-sticky` | `z-index: var(--z-sticky)` | Stacking: sticky headers and rails (var(--z-sticky)) |
| `.z-raised` | `z-index: var(--z-raised)` | Stacking: dropdowns, menus and floating panels above sticky chrome (var(--z-raised)) |
| `.z-modal` | `z-index: var(--z-modal)` | Stacking: modal overlays and drawers (var(--z-modal)) |
| `.z-toast` | `z-index: var(--z-toast)` | Stacking: toasts and notifications, above modals (var(--z-toast)) |
| `.scroll-y` | `overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain` | Vertical scroll inside a bounded height; needs an .h-* or a constraining flex parent |
| `.scroll-x` | `overflow-x: auto; overflow-y: hidden; overscroll-behavior: contain` | Horizontal scroll inside a bounded width; .reel adds snap points |

## Layer L3

Layouts and page furniture. .grid-1/.grid-2/.grid-3/.grid-4/.grid-5/.grid-6 with divisor stepping (3→1, 4→2→1, 6→3→2→1), .cspan-* column spans, .card-grid (auto-fit), .prose (reading measure), .frame-* aspect-ratio boxes (from $frame-ratios), the .reel (scroll-snap rail), and the furniture partial: .card, .chip, .nav-section, .page-header, .inputs-wrapper, .checkbox-wrapper.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.frame-16-9` | `aspect-ratio: 16 / 9; overflow: hidden` | Aspect-ratio media frame (16/9) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-9-16` | `aspect-ratio: 9 / 16; overflow: hidden` | Aspect-ratio media frame (9/16) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-4-3` | `aspect-ratio: 4 / 3; overflow: hidden` | Aspect-ratio media frame (4/3) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-3-4` | `aspect-ratio: 3 / 4; overflow: hidden` | Aspect-ratio media frame (3/4) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-3-2` | `aspect-ratio: 3 / 2; overflow: hidden` | Aspect-ratio media frame (3/2) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-2-3` | `aspect-ratio: 2 / 3; overflow: hidden` | Aspect-ratio media frame (2/3) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.frame-1-1` | `aspect-ratio: 1 / 1; overflow: hidden` | Aspect-ratio media frame (1/1) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) |
| `.grid-2` | `display: grid` | Responsive 2-column grid: 1 → 2 columns at 1025px |
| `.grid-3` | `display: grid` | Responsive 3-column grid: 1 → 3 columns at 1025px (3→1 golden rule) |
| `.grid-4` | `display: grid` | Responsive 4-column grid: 1 → 2 → 4 columns (never 3+1) |
| `.grid-5` | `display: grid` | display: grid |
| `.grid-6` | `display: grid` | Responsive 6-column grid: 1 → 3 → 6 columns (both golden rules hold) |
| `.grid-1` | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Gridding golden rules: exactly 3 items → 3→1, never 2+1; count 4 or a |
| `.cspan-1` | `grid-column: span 1` | Span 1 grid column |
| `.cspan-2` | `grid-column: span 2` | Span 2 grid columns |
| `.cspan-3` | `grid-column: span 3` | Span 3 grid columns |
| `.cspan-4` | `grid-column: span 4` | Span 4 grid columns |
| `.cspan-5` | `grid-column: span 5` | Span 5 grid columns |
| `.cspan-6` | `grid-column: span 6` | Span 6 grid columns |
| `.cspan-7` | `grid-column: span 7` | Span 7 grid columns |
| `.cspan-8` | `grid-column: span 8` | Span 8 grid columns |
| `.card-grid` | `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--card-min), 1…` | Auto-fit repeatable cards — column count negotiable, min track from config. |
| `.prose` | `max-width: var(--prose-clamp); margin-inline: auto; display: flex; …` | Prose — the reading measure (≤ 760px) + typographic rhythm (rhythm authored). |
| `.prose-left` | `max-width: var(--prose-clamp); margin-right: auto; display: flex; …` | max-width: var(--prose-clamp) |
| `.reel` | `display: flex; flex-direction: row; overflow-x: auto; …` | Reel — the human-driven scroll-snap rail (filmstrip). Open for carousel duty. |
| `.card` | — | Panel card: padded, bordered, panel background; arrow svg and footer behaviors included |
| `.chip` | `font-size: var(--text-xs); font-weight: 500; letter-spacing: 0.01rem; …` | Small inline label — tag/badge duty (xs type, md radius) |
| `.nav-section` | `display: flex; flex-direction: column; gap: var(--space-xs)` | Vertical nav section (flex column, xs gap) |
| `.page-header` | `display: flex; flex-direction: column; padding-bottom: var(--space-2xl); …` | Page header block (flex column, sm gap, 2xl bottom pad) |
| `.inputs-wrapper` | `display: flex; gap: var(--space-xs)` | Form field group (flex row, xs gap; labels at sm muted) |
| `.checkbox-wrapper` | `display: flex; align-items: center; gap: var(--space-xs)` | Checkbox row (flex, centered, xs gap; span at sm weight 500) |

## Layer L4

Shells and canonical application markups. The .app-shell canon: .app-header, .app-main, .main-section (+.solo), the role-bound rails (.sidebar-left drawer, .sidebar-right TOC), .app-footer, and .content-section with its narrow width modes.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.get` | — | .get rule |
| `.app-shell` | `display: flex; flex-direction: column; position: relative; …` | Application shell root — flex column, 100vh, hosts header/main/footer and the drawer state |
| `.app-header` | `display: flex; flex-direction: row; align-items: center; …` | Sticky application header (var(--header-height)) |
| `.app-header.clamped` | `width: var(--content-clamp); margin-inline: auto` | width: var(--content-clamp) — modifier of .app-header |
| `.app-main` | `flex: 1 1 0%; min-width: 0; min-height: calc(100dvh - var(--fit-height)); …` | Main region between header and footer — flex row, fitted to 100dvh minus chrome |
| `.app-main.clamped` | `width: var(--content-clamp); margin-inline: auto` | width: var(--content-clamp) — modifier of .app-main |
| `.main-section` | `flex: 1 1 0%; min-width: 0` | Primary content column inside .app-main (flex: 1, min-width: 0) |
| `.main-section.solo` | `padding-inline: var(--app-inline)` | padding-inline: var(--app-inline) — modifier of .main-section |
| `.sidebar-left` | `display: none; flex-shrink: 0; position: sticky; …` | Left = nav: visible ≥ lg; below, .open on .app-shell resurrects it as an |
| `.sidebar-right` | `display: none; flex-shrink: 0; position: sticky; …` | Left = nav: visible ≥ lg; below, .open on .app-shell resurrects it as an |
| `.app-shell.open .sidebar-left` | `display: block; position: fixed; left: 0; …` | display: block — combination rule (app-shellopen sidebar-left) |
| `.app-footer` | `display: flex; flex-direction: row; align-items: center; …` | Application footer (var(--footer-height)) |
| `.content-section` | `width: 100% · @min-width:769px: padding-inline: var(--space-bs)` | Page content block — responsive padding and narrow width modes |
| `.content-section.null` | `padding-inline: 0 var(--space-bs)` | padding-inline: 0 var(--space-bs) — modifier of .content-section |
| `.content-section.narrow-half` | `width: 640px; margin-inline: auto` | width: 640px — modifier of .content-section |
| `.content-section.narrow-wide` | `width: 720px; margin-inline: auto` | width: 720px — modifier of .content-section |
| `.content-section.narrow-full` | `width: 640px; margin-inline: auto` | width: 640px — modifier of .content-section |
| `.sitedocs` | `display: flex; flex-direction: column; color: var(--text-primary); …` | display: flex |
| `.doc-element` | `margin-bottom: 1.5rem` | margin-bottom: 1.5rem — child of .sitedocs |

## Layer L5

Visuals and Interactions. Typography primitives and roles (_03), inputs, selects, links and the button quartet, surface fills, ink, the partition-law border set, elevation shadows, and responsive visibility (_08).

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.text-xs` | `font-size: var(--text-xs)` | primitives - they are simply class versions of the text tokens defined in tokens file |
| `.text-sm` | `font-size: var(--text-sm)` | font-size: var(--text-sm) |
| `.text-md` | `font-size: var(--text-md)` | font-size: var(--text-md) |
| `.text-bs` | `font-size: var(--text-bs)` | font-size: var(--text-bs) |
| `.text-lg` | `font-size: var(--text-lg)` | font-size: var(--text-lg) |
| `.text-xl` | `font-size: var(--text-xl)` | font-size: var(--text-xl) |
| `.text-2xl` | `font-size: var(--text-2xl)` | font-size: var(--text-2xl) |
| `.text-3xl` | `font-size: var(--text-3xl)` | font-size: var(--text-3xl) |
| `.text-4xl` | `font-size: var(--text-4xl)` | font-size: var(--text-4xl) |
| `.text-5xl` | `font-size: var(--text-5xl)` | font-size: var(--text-5xl) |
| `.text-body` | `font-size: var(--text-bs); line-height: 1.5` | semantics - definitions of what text to actually use where |
| `.text-body-lg` | `font-size: var(--text-lg); line-height: 1.5` | Body copy at large size (line-height 1.5) |
| `.text-body-sm` | `font-size: var(--text-sm); line-height: 1.5` | Body copy at small size (line-height 1.5) |
| `.page-title` | `font-size: var(--text-3xl); line-height: 1.1; font-weight: 700; …` | Page title — 3xl, 700, tight tracking |
| `.page-desc` | `font-size: var(--text-md)` | Page description — lg, airy |
| `.page-heading-xl` | `font-size: var(--text-xl); line-height: 1.1; font-weight: 600; …` | Page heading, xl rung — 600, tight tracking |
| `.page-heading-lg` | `font-size: var(--text-lg); line-height: 1.1; font-weight: 600; …` | Page heading, lg rung — 600, tight tracking |
| `.page-heading-bs` | `font-size: var(--text-bs); line-height: 1.1; font-weight: 600; …` | Page heading, base rung — 600, tight tracking |
| `.card-title` | `font-size: var(--text-lg); font-weight: 600; line-height: 1.2` | Card title — lg, 600 |
| `.card-desc` | `font-size: var(--text-md); line-height: 1.2` | Card description — md |
| `.breadcrumb-link` | `color: var(--text-muted); font-size: var(--text-xs); text-transform: uppercase` | Breadcrumb link — muted, uppercased, theme color on hover |
| `.breadcrumb-spacer` | `color: var(--text-muted); font-size: var(--text-xs); text-transform: uppercase` | Breadcrumb spacer (non-link segment, same type treatment) |
| `.breadcrumb` | `display: flex; justify-content: flex-start` | Breadcrumb rail (flex, offset -0.5rem) |
| `.nav-link` | `font-size: var(--text-md); line-height: 1.2` | navigation text in headers, sidebars, etc. |
| `.nav-link-sm` | `font-size: var(--text-sm); line-height: 1.2` | Nav link type, small rung |
| `.nav-header` | `font-size: var(--text-sm); line-height: 1.1; font-weight: 500; …` | Nav group header — sm, 500, padded |
| `.header-nav` | — | Header nav block — uppercased md links, theme color on hover |
| `.lh11` | `line-height: 1.1` | line height modifiers |
| `.lh12` | `line-height: 1.2` | line-height: 1.2 |
| `.lh13` | `line-height: 1.3` | line-height: 1.3 |
| `.lh14` | `line-height: 1.4` | line-height: 1.4 |
| `.lh15` | `line-height: 1.5` | line-height: 1.5 |
| `.lh16` | `line-height: 1.6` | line-height: 1.6 |
| `.ls-tight-bs` | `letter-spacing: -0.01rem` | letter-spacing modifiers |
| `.ls-tight-lg` | `letter-spacing: -0.02rem` | letter-spacing: -0.02rem |
| `.ls-tight-xl` | `letter-spacing: -0.03rem` | letter-spacing: -0.03rem |
| `.ls-wide-bs` | `letter-spacing: 0.01rem` | letter-spacing: 0.01rem |
| `.ls-wide-lg` | `letter-spacing: 0.02rem` | letter-spacing: 0.02rem |
| `.ls-wide-xl` | `letter-spacing: 0.03rem` | letter-spacing: 0.03rem |
| `.weight-300` | `font-weight: 300` | font weight modifiers |
| `.weight-400` | `font-weight: 400` | font-weight: 400 |
| `.weight-500` | `font-weight: 500` | font-weight: 500 |
| `.weight-600` | `font-weight: 600` | font-weight: 600 |
| `.weight-700` | `font-weight: 700` | font-weight: 700 |
| `.weight-800` | `font-weight: 800` | font-weight: 800 |
| `.tt-u` | `text-transform: uppercase` | text transformers and aligners |
| `.tt-c` | `text-transform: capitalize` | text-transform: capitalize |
| `.ta-c` | `text-align: center` | text-align: center |
| `.ta-c.mleft` | `@max-width:1024px: text-align: left` | text-align: left — modifier of .ta-c |
| `.ta-l` | `text-align: left` | text-align: left |
| `.ta-r` | `text-align: right` | text-align: right |
| `.ta-r.mleft` | `@max-width:1024px: text-align: left` | text-align: left — modifier of .ta-r |
| `.mono` | `font-family: var(--font-mono)` | font usage shorthands |
| `.sans` | `font-family: var(--font-sans)` | Sans font stack (var(--font-sans)) |
| `.truncate` | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` | One-line ellipsis truncation |
| `.input` | `display: block; padding-inline: var(--space-md); transition: background var(--motionin1), border-color var(--motionin1…` | Text input — themed field with focus ring |
| `.input.fitted` | `width: max-content` | width: max-content — modifier of .input |
| `.select` | `display: block; padding-inline: var(--space-bs); appearance: none; …` | Select dropdown — themed field with chevron and focus ring |
| `.select.fitted` | `width: max-content` | width: max-content — modifier of .select |
| `.link` | `color: var(--theme-color); text-decoration: none; transition: color var(--motionin1)` | Themed link — theme color, alt on hover |
| `.link-plain` | `color: var(--text-primary); text-decoration: none; transition: color var(--motionin1)` | Plain link — inherits ink, theme color on hover |
| `.link-parent` | `color: var(--text-primary); text-decoration: none` | Link block — hovers color its .link-title child instead of itself |
| `.link-title` | `transition: color var(--motionin1); text-decoration: none` | transition: color var(--motionin1) — child of .link-parent |
| `a.nav-link` | `padding: var(--space-sm); border-radius: var(--radius-sm)` | Interactive form of .nav-link — padded, curved, hover fill |
| `button` | `display: flex; align-items: center; justify-content: center; …` | Button root: flex centring, type, cursor, focus ring, disabled state. The axes ride the .el-* classes in _10_propped.sass. |
| `.button` | `display: flex; align-items: center; justify-content: center; …` | Button root: flex centring, type, cursor, focus ring, disabled state. The axes ride the .el-* classes in _10_propped.sass. |
| `.button-group` | `display: inline-flex; align-items: stretch; vertical-align: middle` | display: inline-flex |
| `.split-button` | `display: inline-flex; align-items: stretch; vertical-align: middle` | display: inline-flex |
| `.button-group.vertical` | `flex-direction: column` | flex-direction: column — modifier of .button-group |
| `.button-group:not(.vertical)` | `flex-direction: row` | flex-direction: row — modifier of .button-group |
| `a.btn` | `display: flex; align-items: center; justify-content: center; …` | Call-to-action anchor button — styled with data-variant, data-shape, and data-size axes |
| `a.button` | `display: flex; align-items: center; justify-content: center; …` | display: flex |
| `.accordion` | `display: flex; flex-direction: column; gap: var(--space-xs)` | Accordion group — vertical stack of .accordion-item |
| `.accordion-item` | — | Accordion item — bordered, styled shell hosting trigger and content |
| `.accordion-content` | `display: grid; grid-template-rows: 0fr; padding: 0; …` | Collapsible region of an .accordion-item — 0fr→1fr grid transition |
| `.accordion-panel` | `overflow: hidden; min-height: 0` | The panel is what collapses. It needs min-height: 0 so the grid row can |
| `.accordion-item.open` | — |  — modifier of .accordion-item |
| `.accordion-trigger` | `display: flex; flex-direction: row; align-items: center; …` | Accordion trigger button — full-width, hover/focus states |
| `.bg-main` | `background-color: var(--bg)` | Bare background — page base fill (var(--bg)) |
| `.bg` | `background-color: var(--bg)` | background-color: var(--bg) |
| `.bg-surface` | `background-color: var(--bg-surface)` | Bare background — surface fill (var(--bg-surface)) |
| `.bg-panel` | `background-color: var(--bg-panel)` | Bare background — panel fill (var(--bg-panel)) |
| `.bg-sunken` | `background-color: var(--bg-sunken)` | Bare background — sunken fill (var(--bg-sunken)) |
| `.bg-raised` | `background-color: var(--bg-raised)` | Bare background — raised fill (var(--bg-raised)) |
| `.bg-extra` | `background-color: var(--bg-extra)` | Bare background — extra fill (var(--bg-extra)) |
| `.text-primary` | `color: var(--text-primary)` | color: var(--text-primary) |
| `.text-secondary` | `color: var(--text-secondary)` | color: var(--text-secondary) |
| `.text-muted` | `color: var(--text-muted)` | color: var(--text-muted) |
| `.text-inverse` | `color: var(--text-inverse)` | color: var(--text-inverse) |
| `.text-white` | `color: var(--white-fixed)` | color: var(--white-fixed) |
| `.text-black` | `color: var(--black-fixed)` | color: var(--black-fixed) |
| `.text-theme` | `color: var(--theme-color)` | color: var(--theme-color) |
| `.text-theme-alt` | `color: var(--theme-color-alt)` | color: var(--theme-color-alt) |
| `.text-theme-sub` | `color: var(--theme-color-sub)` | color: var(--theme-color-sub) |
| `.text-success` | `color: var(--success)` | color: var(--success) |
| `.text-warning` | `color: var(--warning)` | color: var(--warning) |
| `.text-danger` | `color: var(--danger)` | color: var(--danger) |
| `.text-info` | `color: var(--info)` | color: var(--info) |
| `.bg-success` | `background-color: var(--success); transition: background var(--motionout2)` | Status fills, mirroring the status inks above. A dot or chip that carries the |
| `.bg-warning` | `background-color: var(--warning); transition: background var(--motionout2)` | background-color: var(--warning) |
| `.bg-danger` | `background-color: var(--danger); transition: background var(--motionout2)` | background-color: var(--danger) |
| `.bg-info` | `background-color: var(--info); transition: background var(--motionout2)` | background-color: var(--info) |
| `.border` | `border: 1px solid var(--border)` | Full border, standard weight (var(--border)) |
| `.border-subtle` | `border: 1px solid var(--border-subtle)` | Full border, subtle weight (var(--border-subtle)) |
| `.border-strong` | `border: 1px solid var(--border-strong)` | Full border, strong weight (var(--border-strong)) |
| `.bt` | `border-top: 1px solid var(--border)` | border-top: 1px solid var(--border) |
| `.br` | `border-right: 1px solid var(--border)` | border-right: 1px solid var(--border) |
| `.bb` | `border-bottom: 1px solid var(--border)` | border-bottom: 1px solid var(--border) |
| `.bl` | `border-left: 1px solid var(--border)` | border-left: 1px solid var(--border) |
| `.bt-str` | `border-top: 1px solid var(--border-strong)` | border-top: 1px solid var(--border-strong) |
| `.br-str` | `border-right: 1px solid var(--border-strong)` | border-right: 1px solid var(--border-strong) |
| `.bb-str` | `border-bottom: 1px solid var(--border-strong)` | border-bottom: 1px solid var(--border-strong) |
| `.bl-str` | `border-left: 1px solid var(--border-strong)` | border-left: 1px solid var(--border-strong) |
| `.bt-sub` | `border-top: 1px solid var(--border-subtle)` | border-top: 1px solid var(--border-subtle) |
| `.br-sub` | `border-right: 1px solid var(--border-subtle)` | border-right: 1px solid var(--border-subtle) |
| `.bb-sub` | `border-bottom: 1px solid var(--border-subtle)` | border-bottom: 1px solid var(--border-subtle) |
| `.bl-sub` | `border-left: 1px solid var(--border-subtle)` | border-left: 1px solid var(--border-subtle) |
| `.shadow-xs` | `box-shadow: var(--shadow-xs)` | box-shadow: var(--shadow-xs) |
| `.shadow-sm` | `box-shadow: var(--shadow-sm)` | box-shadow: var(--shadow-sm) |
| `.shadow-md` | `box-shadow: var(--shadow-md)` | box-shadow: var(--shadow-md) |
| `.shadow-bs` | `box-shadow: var(--shadow-bs)` | box-shadow: var(--shadow-bs) |
| `.shadow-lg` | `box-shadow: var(--shadow-lg)` | box-shadow: var(--shadow-lg) |
| `.shadow-xl` | `box-shadow: var(--shadow-xl)` | box-shadow: var(--shadow-xl) |
| `.shadow-2xl` | `box-shadow: var(--shadow-2xl)` | box-shadow: var(--shadow-2xl) |
| `.shadow-3xl` | `box-shadow: var(--shadow-3xl)` | box-shadow: var(--shadow-3xl) |
| `.hide-mobile` | `@max-width:1024px: display: none` | Display none at ≤1024px |
| `.hide-desktop` | `@min-width:1025px: display: none` | Display none at ≥1025px |
| `.orange1` | `color: var(--orangepop1)` | special color classes |
| `.orange2` | `color: var(--orangepop2)` | color: var(--orangepop2) |
| `.orange3` | `color: var(--orangepop3)` | color: var(--orangepop3) |
| `.orange4` | `color: var(--orangepop4)` | color: var(--orangepop4) |
| `.orange5` | `color: var(--orangepop5)` | color: var(--orangepop5) |
| `.orange6` | `color: var(--orangepop6)` | color: var(--orangepop6) |
| `.yellow1` | `color: var(--yellowpop1)` | color: var(--yellowpop1) |
| `.yellow2` | `color: var(--yellowpop2)` | color: var(--yellowpop2) |
| `.yellow3` | `color: var(--yellowpop3)` | color: var(--yellowpop3) |
| `.yellow4` | `color: var(--yellowpop4)` | color: var(--yellowpop4) |
| `.green1` | `color: var(--greenpop1)` | color: var(--greenpop1) |
| `.green2` | `color: var(--greenpop2)` | color: var(--greenpop2) |
| `.green3` | `color: var(--greenpop3)` | color: var(--greenpop3) |
| `.green4` | `color: var(--greenpop4)` | color: var(--greenpop4) |

## Layer L6

Element Axes (_10_propped). The orthogonal attribute axes, authored once and applied by class: .el-variants (data-variant), .el-shape (data-shape), .el-size (data-size), .el-pad (data-pad), .el-shadow / .el-shadow-hover (data-shadow) and .el-vss (variant + shape + size in one class). An element opts into an axis by carrying its class — the element name is never the qualifier, so a button, an input and a card answer the same axes.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.el-variant` | — | .el-variant rule |
| `.el-variant.primary` | `background-color: var(--state-surface); border: 1px solid var(--border)` | background-color: var(--state-surface) — modifier of .el-variant |
| `.el-variant.primary.selected` | `background-color: var(--state-selected); border: 1px solid var(--border-strong)` | background-color: var(--state-selected) — modifier of .el-variant.primary |
| `.el-variant.secondary` | `background-color: var(--bg-panel); border: 1px solid var(--border-subtle)` | background-color: var(--bg-panel) — modifier of .el-variant |
| `.el-variant.secondary.selected` | `background-color: var(--state-selected); border: 1px solid var(--border)` | background-color: var(--state-selected) — modifier of .el-variant.secondary |
| `.el-variant.themed` | `background-color: var(--theme-color); border: 1px solid var(--theme-color)` | background-color: var(--theme-color) — modifier of .el-variant |
| `.el-variant.themed.selected` | `background-color: var(--theme-color-alt); border: 1px solid var(--theme-color-alt)` | background-color: var(--theme-color-alt) — modifier of .el-variant.themed |
| `.el-variant.outline` | `background-color: transparent; color: var(--text-primary); border: 1px solid var(--text-primary)` | background-color: transparent — modifier of .el-variant |
| `.el-variant.outline.selected` | `color: var(--text-primary); background-color: var(--state-selected); border: 1px solid var(--border)` | color: var(--text-primary) — modifier of .el-variant.outline |
| `.el-variant.ghost` | `background-color: transparent; border: none` | background-color: transparent — modifier of .el-variant |
| `.el-variant.link` | `background-color: transparent; border: none; text-decoration: none` | background-color: transparent — modifier of .el-variant |
| `.el-variant.icon` | `background-color: var(--bg-extra); border: none; color: var(--text-primary)` | background-color: var(--bg-extra) — modifier of .el-variant |
| `.el-variant.icon.selected` | `background-color: var(--state-selected)` | background-color: var(--state-selected) — modifier of .el-variant.icon |
| `.el-variant.icon-ghost` | `background-color: none; border: none; color: var(--text-secondary)` | background-color: none — modifier of .el-variant |
| `.el-variant.icon-ghost.selected` | `color: var(--text-primary); background-color: var(--state-selected)` | color: var(--text-primary) — modifier of .el-variant.icon-ghost |
| `.el-variant.danger` | `background-color: var(--danger); color: #FFFFFF; border: none` | background-color: var(--danger) — modifier of .el-variant |
| `.el-variant.icon-danger` | `color: var(--danger)` | color: var(--danger) — modifier of .el-variant |
| `.el-shape` | — | .el-shape rule |
| `.el-shape.square` | `border-radius: 0` | border-radius: 0 — modifier of .el-shape |
| `.el-shape.min` | `border-radius: var(--radius-sm)` | border-radius: var(--radius-sm) — modifier of .el-shape |
| `.el-shape.modern` | `border-radius: var(--radius-md)` | border-radius: var(--radius-md) — modifier of .el-shape |
| `.el-shape.curved` | `border-radius: var(--radius-bs)` | border-radius: var(--radius-bs) — modifier of .el-shape |
| `.el-shape.round` | `border-radius: 9999px` | border-radius: 9999px — modifier of .el-shape |
| `.el-size` | — | .el-size rule |
| `.el-size.h-sm` | `height: var(--height-sm)` | height: var(--height-sm) — modifier of .el-size |
| `.el-size.h-md` | `height: var(--height-md)` | height: var(--height-md) — modifier of .el-size |
| `.el-size.h-bs` | `height: var(--height-bs)` | height: var(--height-bs) — modifier of .el-size |
| `.el-size.h-lg` | `height: var(--height-lg)` | height: var(--height-lg) — modifier of .el-size |
| `.shadow-hover-sm` | `box-shadow: var(--shadow-sm)` | box-shadow: var(--shadow-sm) |
| `.shadow-hover-bs` | `box-shadow: var(--shadow-bs)` | box-shadow: var(--shadow-bs) |
| `.shadow-hover-lg` | `box-shadow: var(--shadow-lg)` | box-shadow: var(--shadow-lg) |
| `.shadow-hover-xl` | `box-shadow: var(--shadow-xl)` | box-shadow: var(--shadow-xl) |
| `.shadow-hover-2xl` | `box-shadow: var(--shadow-2xl)` | box-shadow: var(--shadow-2xl) |
| `.el-vss` | — | .el-vss rule |
| `.el-vss.primary` | `background-color: var(--state-surface); border: 1px solid var(--border)` | background-color: var(--state-surface) — modifier of .el-vss |
| `.el-vss.primary.selected` | `background-color: var(--state-selected); border: 1px solid var(--border-strong)` | background-color: var(--state-selected) — modifier of .el-vss.primary |
| `.el-vss.secondary` | `background-color: var(--bg-panel); border: 1px solid var(--border-subtle)` | background-color: var(--bg-panel) — modifier of .el-vss |
| `.el-vss.secondary.selected` | `background-color: var(--state-selected); border: 1px solid var(--border)` | background-color: var(--state-selected) — modifier of .el-vss.secondary |
| `.el-vss.themed` | `background-color: var(--theme-color); border: 1px solid var(--theme-color)` | background-color: var(--theme-color) — modifier of .el-vss |
| `.el-vss.themed.selected` | `background-color: var(--theme-color-alt); border: 1px solid var(--theme-color-alt)` | background-color: var(--theme-color-alt) — modifier of .el-vss.themed |
| `.el-vss.outline` | `background-color: transparent; color: var(--text-primary); border: 1px solid var(--text-primary)` | background-color: transparent — modifier of .el-vss |
| `.el-vss.outline.selected` | `color: var(--text-primary); background-color: var(--state-selected); border: 1px solid var(--border)` | color: var(--text-primary) — modifier of .el-vss.outline |
| `.el-vss.ghost` | `background-color: transparent; border: none` | background-color: transparent — modifier of .el-vss |
| `.el-vss.link` | `background-color: transparent; border: none; text-decoration: none` | background-color: transparent — modifier of .el-vss |
| `.el-vss.icon` | `background-color: var(--bg-extra); border: none; color: var(--text-primary)` | background-color: var(--bg-extra) — modifier of .el-vss |
| `.el-vss.icon.selected` | `background-color: var(--state-selected)` | background-color: var(--state-selected) — modifier of .el-vss.icon |
| `.el-vss.icon-ghost` | `background-color: none; border: none; color: var(--text-secondary)` | background-color: none — modifier of .el-vss |
| `.el-vss.icon-ghost.selected` | `color: var(--text-primary); background-color: var(--state-selected)` | color: var(--text-primary) — modifier of .el-vss.icon-ghost |
| `.el-vss.danger` | `background-color: var(--danger); color: #FFFFFF; border: none` | background-color: var(--danger) — modifier of .el-vss |
| `.el-vss.icon-danger` | `color: var(--danger)` | color: var(--danger) — modifier of .el-vss |
| `.el-vss.square` | `border-radius: 0` | border-radius: 0 — modifier of .el-vss |
| `.el-vss.min` | `border-radius: var(--radius-sm)` | border-radius: var(--radius-sm) — modifier of .el-vss |
| `.el-vss.modern` | `border-radius: var(--radius-md)` | border-radius: var(--radius-md) — modifier of .el-vss |
| `.el-vss.curved` | `border-radius: var(--radius-bs)` | border-radius: var(--radius-bs) — modifier of .el-vss |
| `.el-vss.round` | `border-radius: 9999px` | border-radius: 9999px — modifier of .el-vss |
| `.el-vss.h-sm` | `height: var(--height-sm)` | height: var(--height-sm) — modifier of .el-vss |
| `.el-vss.h-md` | `height: var(--height-md)` | height: var(--height-md) — modifier of .el-vss |
| `.el-vss.h-bs` | `height: var(--height-bs)` | height: var(--height-bs) — modifier of .el-vss |
| `.el-vss.h-lg` | `height: var(--height-lg)` | height: var(--height-lg) — modifier of .el-vss |
| `.el-vss.h-xl` | `height: var(--height-xl)` | height: var(--height-xl) — modifier of .el-vss |

## Layer Custom

Sanctioned extension point (_09_own.sass). Contains project-specific overrides and third-party styling additions that cannot be expressed via canonical layers.

| Class | Property / Expansion | Description |
|:---|:---|:---|
| `.site-logomotif` | `height: 48px; transform-origin: center center; transition: transform 210ms var(--transin2)` | Site logo motif — 48px, scales 1.2 on hover |
| `.logotype` | `height: 28px` | Logotype — 28px wordmark |
| `.project-circle` | `border-radius: 24px; width: 16px; height: 16px` | Project dot — 16px circle |
| `.mascot` | `display: inline-block; position: relative; flex: none; …` | Mascot (src/lib/comps/Mascot.svelte): CSS-only "3D feel" logo. |
| `.mascot-bob` | `display: block` | display: block |
| `.mascot-tilt` | `display: block` | display: block |
| `.mascot-bobs .mascot-bob` | `animation: mascot-bob 3.6s ease-in-out infinite alternate` | animation: mascot-bob 3.6s ease-in-out infinite alternate — combination rule (mascot-bobs mascot-bob) |
| `.mascot-base` | `display: block; user-select: none; -webkit-user-drag: none` | display: block |
| `.mascot-overlay` | `position: absolute; inset: 0; width: 100%; …` | position: absolute |
| `.mascot-mask` | `mask-type: alpha` | mask-type: alpha |
| `.mascot-pupil-l` | `transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mas…` | transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mas… |
| `.mascot-pupil-r` | `transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mas…` | transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mas… |
| `.mascot-gloss` | `opacity: 0.42; transform: translate(calc(var(--mascot-gx, 400) * 1px), calc(var(--ma…` | opacity: 0.42 |
| `.mascot-shade` | `opacity: 0.55; transform: translate(calc((1024 - var(--mascot-gx, 400)) * 1px), calc…` | opacity: 0.55 |
| `.mascot-blinks .mascot-lid` | `animation: mascot-blink 5.2s ease-in-out infinite` | animation: mascot-blink 5.2s ease-in-out infinite — combination rule (mascot-blinks mascot-lid) |
| `.mascotgl` | `display: inline-block; position: relative; flex: none; …` | MascotGL (src/lib/comps/MascotGL.svelte): WebGL2 lab version of the mascot. |
| `.mascotgl-spacer` | `display: block` | display: block |
| `.mascotgl-canvas` | `position: absolute; left: 50%; top: 50%; …` | position: absolute |
| `.mascotgl-ready` | `opacity: 1` | opacity: 1 |
| `.mascotgl-compact .mascotgl-canvas` | `width: 130%; height: 130%` | Header-sized: 15% overhang per side (EXTENT_COMPACT = 0.65), still outside the layout box. |
| `.hero-name` | `font-weight: 800; font-size: calc(var(--text-5xl) * 2); letter-spacing: -0.2rem` | Hero display name — text-5xl doubled, 800, tight tracking |
