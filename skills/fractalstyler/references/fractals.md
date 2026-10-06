# Fractalstyler2 — Class Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.js` from the
parsed stylesheet. 414 classes across 131 tokens.

**The classes below are the entire public API.** The system defines no
authoring mixins and no SASS functions — `+stack`, `+surface`, `space()` and
friends do not exist. Compose in markup.

Every class is concrete. Space families (`.gap` `.rgap` `.cgap` `.pad` `.px` `.py`
`.pt` `.pr` `.pb` `.pl` `.mar` `.mx` `.my` `.mt` `.mr` `.mb` `.ml`) each ride the
eight steps: `xs sm md bs lg xl 2xl 3xl`, token-routed through `var(--space-*)`.
Modifiers nest under their base (`.box.xcenter`), children carry their own
name (`.accordion-content`), and `Parent.Child` notation marks scoped children.


---

## L0 — Tokens & Base

Raw values and native resets. Never hardcode a literal a token covers.

| Class | Applies | Source |
|:---|:---|:---|
| `.bdr` | debug class | `_01_base.sass` |
| `.mode-wipe` | On <html>: disables view-transition animations while a color-mode wipe runs | `_01_base.sass` |

---

## L1 — Dimensions

Loop-generated space families (gap/rgap/cgap, pad/px/py/pt/pr/pb/pl, mar/mx/my/mt/mr/mb/ml × the eight steps), radius channels, full/zero sizing, viewport heights. All token-routed.

| Class | Applies | Source |
|:---|:---|:---|
| `.gap-xs` | Gap on both axes (flex/grid) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-sm` | Gap on both axes (flex/grid) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-md` | Gap on both axes (flex/grid) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-bs` | Gap on both axes (flex/grid) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-lg` | Gap on both axes (flex/grid) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-xl` | Gap on both axes (flex/grid) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-2xl` | Gap on both axes (flex/grid) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.gap-3xl` | Gap on both axes (flex/grid) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-xs` | Row gap (block axis) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-sm` | Row gap (block axis) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-md` | Row gap (block axis) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-bs` | Row gap (block axis) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-lg` | Row gap (block axis) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-xl` | Row gap (block axis) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-2xl` | Row gap (block axis) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.rgap-3xl` | Row gap (block axis) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-xs` | Column gap (inline axis) at the xs step — rides var(--space-xs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-sm` | Column gap (inline axis) at the sm step — rides var(--space-sm) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-md` | Column gap (inline axis) at the md step — rides var(--space-md) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-bs` | Column gap (inline axis) at the bs step — rides var(--space-bs) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-lg` | Column gap (inline axis) at the lg step — rides var(--space-lg) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-xl` | Column gap (inline axis) at the xl step — rides var(--space-xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-2xl` | Column gap (inline axis) at the 2xl step — rides var(--space-2xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.cgap-3xl` | Column gap (inline axis) at the 3xl step — rides var(--space-3xl) (generated from $gap-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-xs` | Padding, all four sides at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-sm` | Padding, all four sides at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-md` | Padding, all four sides at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-bs` | Padding, all four sides at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-lg` | Padding, all four sides at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-xl` | Padding, all four sides at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-2xl` | Padding, all four sides at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pad-3xl` | Padding, all four sides at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-xs` | Inline (horizontal) padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-sm` | Inline (horizontal) padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-md` | Inline (horizontal) padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-bs` | Inline (horizontal) padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-lg` | Inline (horizontal) padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-xl` | Inline (horizontal) padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-2xl` | Inline (horizontal) padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.px-3xl` | Inline (horizontal) padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-xs` | Block (vertical) padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-sm` | Block (vertical) padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-md` | Block (vertical) padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-bs` | Block (vertical) padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-lg` | Block (vertical) padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-xl` | Block (vertical) padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-2xl` | Block (vertical) padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.py-3xl` | Block (vertical) padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-xs` | Top padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-sm` | Top padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-md` | Top padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-bs` | Top padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-lg` | Top padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-xl` | Top padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-2xl` | Top padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pt-3xl` | Top padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-xs` | Right padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-sm` | Right padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-md` | Right padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-bs` | Right padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-lg` | Right padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-xl` | Right padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-2xl` | Right padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pr-3xl` | Right padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-xs` | Bottom padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-sm` | Bottom padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-md` | Bottom padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-bs` | Bottom padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-lg` | Bottom padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-xl` | Bottom padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-2xl` | Bottom padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pb-3xl` | Bottom padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-xs` | Left padding at the xs step — rides var(--space-xs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-sm` | Left padding at the sm step — rides var(--space-sm) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-md` | Left padding at the md step — rides var(--space-md) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-bs` | Left padding at the bs step — rides var(--space-bs) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-lg` | Left padding at the lg step — rides var(--space-lg) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-xl` | Left padding at the xl step — rides var(--space-xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-2xl` | Left padding at the 2xl step — rides var(--space-2xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.pl-3xl` | Left padding at the 3xl step — rides var(--space-3xl) (generated from $pad-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-xs` | Margin, all four sides at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-sm` | Margin, all four sides at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-md` | Margin, all four sides at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-bs` | Margin, all four sides at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-lg` | Margin, all four sides at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-xl` | Margin, all four sides at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-2xl` | Margin, all four sides at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mar-3xl` | Margin, all four sides at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-xs` | Inline (horizontal) margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-sm` | Inline (horizontal) margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-md` | Inline (horizontal) margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-bs` | Inline (horizontal) margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-lg` | Inline (horizontal) margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-xl` | Inline (horizontal) margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-2xl` | Inline (horizontal) margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mx-3xl` | Inline (horizontal) margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-xs` | Block (vertical) margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-sm` | Block (vertical) margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-md` | Block (vertical) margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-bs` | Block (vertical) margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-lg` | Block (vertical) margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-xl` | Block (vertical) margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-2xl` | Block (vertical) margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.my-3xl` | Block (vertical) margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-xs` | Top margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-sm` | Top margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-md` | Top margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-bs` | Top margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-lg` | Top margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-xl` | Top margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-2xl` | Top margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mt-3xl` | Top margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-xs` | Right margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-sm` | Right margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-md` | Right margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-bs` | Right margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-lg` | Right margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-xl` | Right margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-2xl` | Right margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mr-3xl` | Right margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-xs` | Bottom margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-sm` | Bottom margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-md` | Bottom margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-bs` | Bottom margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-lg` | Bottom margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-xl` | Bottom margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-2xl` | Bottom margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.mb-3xl` | Bottom margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-xs` | Left margin at the xs step — rides var(--space-xs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-sm` | Left margin at the sm step — rides var(--space-sm) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-md` | Left margin at the md step — rides var(--space-md) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-bs` | Left margin at the bs step — rides var(--space-bs) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-lg` | Left margin at the lg step — rides var(--space-lg) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-xl` | Left margin at the xl step — rides var(--space-xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-2xl` | Left margin at the 2xl step — rides var(--space-2xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.ml-3xl` | Left margin at the 3xl step — rides var(--space-3xl) (generated from $mar-families × $steps in _00_config.sass) | `_02_dimensions.sass` |
| `.radius-xs` | border-radius: var(--radius-xs) | `_02_dimensions.sass` |
| `.radius-sm` | border-radius: var(--radius-sm) | `_02_dimensions.sass` |
| `.radius-md` | border-radius: var(--radius-md) | `_02_dimensions.sass` |
| `.radius-bs` | border-radius: var(--radius-bs) | `_02_dimensions.sass` |
| `.radius-lg` | border-radius: var(--radius-lg) | `_02_dimensions.sass` |
| `.radius-full` | border-radius: var(--radius-full) | `_02_dimensions.sass` |
| `.wfull` | Full width (100%) | `_02_dimensions.sass` |
| `.hfull` | Full height (100%) | `_02_dimensions.sass` |
| `.full` | Full width and height (100% both axes) | `_02_dimensions.sass` |
| `.minw0` | Zero min-width — lets a flex child shrink below its content | `_02_dimensions.sass` |
| `.minh0` | Zero min-height — lets a flex child shrink below its content | `_02_dimensions.sass` |
| `.min0` | Zero min-width and min-height — prevents flex blowouts | `_02_dimensions.sass` |
| `.h-sm` | Control height step sm (var(--height-sm)) | `_02_dimensions.sass` |
| `.h-md` | Control height step md (var(--height-md)) | `_02_dimensions.sass` |
| `.h-bs` | Control height step bs (var(--height-bs)) | `_02_dimensions.sass` |
| `.h-lg` | Control height step lg (var(--height-lg)) | `_02_dimensions.sass` |
| `.hfull-vh` | Viewport heights | `_02_dimensions.sass` |
| `.hfull-vh-fitted` | Viewport height fitted between header and footer (var(--fit-height)) | `_02_dimensions.sass` |

---

## L2 — Containers

Flow and alignment. .box (flex column), .row (flex row), .grid — alignment modifiers nest under their base, never standalone. x* is ALWAYS the horizontal/inline axis, y* the vertical/block axis.

| Class | Applies | Source |
|:---|:---|:---|
| `.box` | Flex column container — the vertical structural foundation | `_04_containers.sass` |
| `.box.xcenter` | align-items: center — modifier of .box | `_04_containers.sass` |
| `.box.xleft` | align-items: flex-start — modifier of .box | `_04_containers.sass` |
| `.box.xright` | align-items: flex-end — modifier of .box | `_04_containers.sass` |
| `.box.ycenter` | justify-content: center — modifier of .box | `_04_containers.sass` |
| `.box.ytop` | justify-content: flex-start — modifier of .box | `_04_containers.sass` |
| `.box.ybot` | justify-content: flex-end — modifier of .box | `_04_containers.sass` |
| `.box.ybetween` | justify-content: space-between — modifier of .box | `_04_containers.sass` |
| `.box.yevenly` | justify-content: space-evenly — modifier of .box | `_04_containers.sass` |
| `.box.yaround` | justify-content: space-around — modifier of .box | `_04_containers.sass` |
| `.row` | Flex row container — the horizontal structural foundation | `_04_containers.sass` |
| `.row.xleft` | justify-content: flex-start — modifier of .row | `_04_containers.sass` |
| `.row.xcenter` | justify-content: center — modifier of .row | `_04_containers.sass` |
| `.row.xright` | justify-content: flex-end — modifier of .row | `_04_containers.sass` |
| `.row.xbetween` | justify-content: space-between — modifier of .row | `_04_containers.sass` |
| `.row.xevenly` | justify-content: space-evenly — modifier of .row | `_04_containers.sass` |
| `.row.xaround` | justify-content: space-around — modifier of .row | `_04_containers.sass` |
| `.row.ycenter` | align-items: center — modifier of .row | `_04_containers.sass` |
| `.row.ytop` | align-items: flex-start — modifier of .row | `_04_containers.sass` |
| `.row.ybot` | align-items: flex-end — modifier of .row | `_04_containers.sass` |
| `.grid` | CSS grid container (columns composed via .grid-N / alignment below) | `_04_containers.sass` |
| `.grid.center` | place-items: center — modifier of .grid | `_04_containers.sass` |
| `.grid.xcenter` | justify-items: center — modifier of .grid | `_04_containers.sass` |
| `.grid.xleft` | justify-items: start — modifier of .grid | `_04_containers.sass` |
| `.grid.xright` | justify-items: end — modifier of .grid | `_04_containers.sass` |
| `.grid.xstretch` | justify-items: stretch — modifier of .grid | `_04_containers.sass` |
| `.grid.ycenter` | align-items: center — modifier of .grid | `_04_containers.sass` |
| `.grid.ytop` | align-items: start — modifier of .grid | `_04_containers.sass` |
| `.grid.ybot` | align-items: end — modifier of .grid | `_04_containers.sass` |
| `.grid.ystretch` | align-items: stretch — modifier of .grid | `_04_containers.sass` |
| `.grid.xbetween` | justify-content: space-between — modifier of .grid | `_04_containers.sass` |
| `.grid.xevenly` | justify-content: space-evenly — modifier of .grid | `_04_containers.sass` |
| `.grid.xaround` | justify-content: space-around — modifier of .grid | `_04_containers.sass` |
| `.grid.ybetween` | align-content: space-between — modifier of .grid | `_04_containers.sass` |
| `.grid.yevenly` | align-content: space-evenly — modifier of .grid | `_04_containers.sass` |
| `.grid.yaround` | align-content: space-around — modifier of .grid | `_04_containers.sass` |
| `.wrap` | Allow flex wrapping | `_04_containers.sass` |
| `.grow` | Flex grow — take remaining space (flex: 1 1 0%) | `_04_containers.sass` |
| `.shrink-0` | Never shrink below content size | `_04_containers.sass` |
| `.relative` | position: relative (anchor for absolute children) | `_04_containers.sass` |
| `.absolute` | position: absolute | `_04_containers.sass` |
| `.fixed` | position: fixed | `_04_containers.sass` |
| `.sticky` | position: sticky | `_04_containers.sass` |
| `.scroll-y` | Vertical scroll inside a bounded height; needs an .h-* or a constraining flex parent | `_04_containers.sass` |
| `.scroll-x` | Horizontal scroll inside a bounded width; .reel adds snap points | `_04_containers.sass` |
| `.card` | Panel card: padded, bordered, panel background; arrow svg and footer behaviors included | `_04_containers.sass` |
| `.arrow` | color: var(--theme-color) — child of .card | `_04_containers.sass` |
| `.card[data-shape="modern"]` | border-radius: var(--radius-sm) — attribute variant of .card | `_04_containers.sass` |
| `.chip` | Small inline label — tag/badge duty (xs type, md radius) | `_04_containers.sass` |
| `.prose-section` | Vertical prose section (flex column, lg gap) | `_04_containers.sass` |
| `.nav-section` | Vertical nav section (flex column, xs gap) | `_04_containers.sass` |
| `.page-header` | Page header block (flex column, sm gap, 2xl bottom pad) | `_04_containers.sass` |
| `.inputs-wrapper` | Form field group (flex row, xs gap; labels at sm muted) | `_04_containers.sass` |
| `.checkbox-wrapper` | Checkbox row (flex, centered, xs gap; span at sm weight 500) | `_04_containers.sass` |

---

## L3 — Layouts

Grids that step only through divisors (3→1, 4→2→1, 6→3→2→1), column spans, card-grid, prose, frame ratios, the reel.

| Class | Applies | Source |
|:---|:---|:---|
| `.frame-16-9` | Aspect-ratio media frame (16/9) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-9-16` | Aspect-ratio media frame (9/16) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-4-3` | Aspect-ratio media frame (4/3) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-3-4` | Aspect-ratio media frame (3/4) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-3-2` | Aspect-ratio media frame (3/2) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-2-3` | Aspect-ratio media frame (2/3) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.frame-1-1` | Aspect-ratio media frame (1/1) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass) | `_05_layouts.sass` |
| `.grid-1` | Gridding golden rules: exactly 3 items → 3→1, never 2+1; count 4 or a | `_05_layouts.sass` |
| `.grid-2` | Responsive 2-column grid: 1 → 2 columns at 1025px | `_05_layouts.sass` |
| `.grid-3` | Responsive 3-column grid: 1 → 3 columns at 1025px (3→1 golden rule) | `_05_layouts.sass` |
| `.grid-4` | Responsive 4-column grid: 1 → 2 → 4 columns (never 3+1) | `_05_layouts.sass` |
| `.grid-6` | Responsive 6-column grid: 1 → 3 → 6 columns (both golden rules hold) | `_05_layouts.sass` |
| `.cspan-1` | Span 1 grid column | `_05_layouts.sass` |
| `.cspan-2` | Span 2 grid columns | `_05_layouts.sass` |
| `.cspan-3` | Span 3 grid columns | `_05_layouts.sass` |
| `.cspan-4` | Span 4 grid columns | `_05_layouts.sass` |
| `.cspan-5` | Span 5 grid columns | `_05_layouts.sass` |
| `.cspan-6` | Span 6 grid columns | `_05_layouts.sass` |
| `.cspan-7` | Span 7 grid columns | `_05_layouts.sass` |
| `.cspan-8` | Span 8 grid columns | `_05_layouts.sass` |
| `.card-grid` | Auto-fit repeatable cards — column count negotiable, min track from config. | `_05_layouts.sass` |
| `.prose` | Prose — the reading measure (≤ 760px) + typographic rhythm (rhythm authored). | `_05_layouts.sass` |
| `.reel` | Reel — the human-driven scroll-snap rail (filmstrip). Open for carousel duty. | `_05_layouts.sass` |

---

## L4 — Shells

Application scaffolding: the .app-shell canon, header, role-bound rails, footer, content sections.

| Class | Applies | Source |
|:---|:---|:---|
| `.get` | .get rule | `_06_shells.sass` |
| `.app-shell` | Application shell root — flex column, 100vh, hosts header/main/footer and the drawer state | `_06_shells.sass` |
| `.app-header` | Sticky application header (var(--header-height)) | `_06_shells.sass` |
| `.app-header.clamped` | width: var(--content-clamp) — modifier of .app-header | `_06_shells.sass` |
| `.app-main` | Main region between header and footer — flex row, fitted to 100dvh minus chrome | `_06_shells.sass` |
| `.app-main.clamped` | width: var(--content-clamp) — modifier of .app-main | `_06_shells.sass` |
| `.main-section` | Primary content column inside .app-main (flex: 1, min-width: 0) | `_06_shells.sass` |
| `.sidebar-left` | Left = nav: visible ≥ lg; below, .open on .app-shell resurrects it as an | `_06_shells.sass` |
| `.sidebar-right` | Left = nav: visible ≥ lg; below, .open on .app-shell resurrects it as an | `_06_shells.sass` |
| `.app-shell.open .sidebar-left` | display: block — combination rule (app-shellopen sidebar-left) | `_06_shells.sass` |
| `.app-footer` | Application footer (var(--footer-height)) | `_06_shells.sass` |
| `.content-section` | Page content block — responsive padding and narrow width modes | `_06_shells.sass` |
| `.content-section.null` | padding: 0 var(--space-bs) — modifier of .content-section | `_06_shells.sass` |
| `.content-section.narrow-half` | padding: var(--space-2xl) 0 — modifier of .content-section | `_06_shells.sass` |
| `.content-section.narrow-wide` | padding: var(--space-2xl) 0 — modifier of .content-section | `_06_shells.sass` |
| `.content-section.narrow-full` | width: 640px — modifier of .content-section | `_06_shells.sass` |

---

## L5 — Visuals & Interactions

Typography roles, inputs, links, the button quartet, surface fills, ink, borders, elevation shadows, visibility.

| Class | Applies | Source |
|:---|:---|:---|
| `.text-xs` | primitives - they are simply class versions of the text tokens defined in tokens file | `_03_typography.sass` |
| `.text-sm` | font-size: var(--text-sm) | `_03_typography.sass` |
| `.text-md` | font-size: var(--text-md) | `_03_typography.sass` |
| `.text-bs` | font-size: var(--text-bs) | `_03_typography.sass` |
| `.text-lg` | font-size: var(--text-lg) | `_03_typography.sass` |
| `.text-xl` | font-size: var(--text-xl) | `_03_typography.sass` |
| `.text-2xl` | font-size: var(--text-2xl) | `_03_typography.sass` |
| `.text-3xl` | font-size: var(--text-3xl) | `_03_typography.sass` |
| `.text-4xl` | font-size: var(--text-4xl) | `_03_typography.sass` |
| `.text-5xl` | font-size: var(--text-5xl) | `_03_typography.sass` |
| `.text-body` | semantics - definitions of what text to actually use where | `_03_typography.sass` |
| `.text-body-lg` | Body copy at large size (line-height 1.5) | `_03_typography.sass` |
| `.text-body-sm` | Body copy at small size (line-height 1.5) | `_03_typography.sass` |
| `.page-title` | Page title — 3xl, 700, tight tracking | `_03_typography.sass` |
| `.page-desc` | Page description — lg, airy | `_03_typography.sass` |
| `.page-heading-xl` | Page heading, xl rung — 600, tight tracking | `_03_typography.sass` |
| `.page-heading-lg` | Page heading, lg rung — 600, tight tracking | `_03_typography.sass` |
| `.page-heading-bs` | Page heading, base rung — 600, tight tracking | `_03_typography.sass` |
| `.card-title` | Card title — lg, 600 | `_03_typography.sass` |
| `.card-desc` | Card description — md | `_03_typography.sass` |
| `.breadcrumb-link` | Breadcrumb link — muted, uppercased, theme color on hover | `_03_typography.sass` |
| `.breadcrumb-spacer` | Breadcrumb spacer (non-link segment, same type treatment) | `_03_typography.sass` |
| `.breadcrumb` | Breadcrumb rail (flex, offset -0.5rem) | `_03_typography.sass` |
| `.nav-link` | navigation text in headers, sidebars, etc. | `_03_typography.sass` |
| `.nav-link-sm` | Nav link type, small rung | `_03_typography.sass` |
| `.nav-header` | Nav group header — sm, 500, padded | `_03_typography.sass` |
| `.header-nav` | Header nav block — uppercased md links, theme color on hover | `_03_typography.sass` |
| `.lh11` | line height modifiers | `_03_typography.sass` |
| `.lh12` | line-height: 1.2 | `_03_typography.sass` |
| `.lh13` | line-height: 1.3 | `_03_typography.sass` |
| `.lh14` | line-height: 1.4 | `_03_typography.sass` |
| `.lh15` | line-height: 1.5 | `_03_typography.sass` |
| `.lh16` | line-height: 1.6 | `_03_typography.sass` |
| `.ls-tight-bs` | letter-spacing modifiers | `_03_typography.sass` |
| `.ls-tight-lg` | letter-spacing: -0.02rem | `_03_typography.sass` |
| `.ls-tight-xl` | letter-spacing: -0.03rem | `_03_typography.sass` |
| `.ls-wide-bs` | letter-spacing: 0.01rem | `_03_typography.sass` |
| `.ls-wide-lg` | letter-spacing: 0.02rem | `_03_typography.sass` |
| `.ls-wide-xl` | letter-spacing: 0.03rem | `_03_typography.sass` |
| `.weight-300` | font weight modifiers | `_03_typography.sass` |
| `.weight-400` | font-weight: 400 | `_03_typography.sass` |
| `.weight-500` | font-weight: 500 | `_03_typography.sass` |
| `.weight-600` | font-weight: 600 | `_03_typography.sass` |
| `.weight-700` | font-weight: 700 | `_03_typography.sass` |
| `.weight-800` | font-weight: 800 | `_03_typography.sass` |
| `.tt-u` | text transformers and aligners | `_03_typography.sass` |
| `.tt-c` | text-transform: capitalize | `_03_typography.sass` |
| `.ta-c` | text-align: center | `_03_typography.sass` |
| `.ta-c.mleft` | text-align: left — modifier of .ta-c | `_03_typography.sass` |
| `.ta-l` | text-align: left | `_03_typography.sass` |
| `.ta-r` | text-align: right | `_03_typography.sass` |
| `.ta-r.mleft` | text-align: left — modifier of .ta-r | `_03_typography.sass` |
| `.mono` | font usage shorthands | `_03_typography.sass` |
| `.sans` | Sans font stack (var(--font-sans)) | `_03_typography.sass` |
| `.truncate` | One-line ellipsis truncation | `_03_typography.sass` |
| `.input` | Text input — themed field with focus ring | `_07_interactions.sass` |
| `.input.small` | height: var(--height-bs) — modifier of .input | `_07_interactions.sass` |
| `.select` | Select dropdown — themed field with chevron and focus ring | `_07_interactions.sass` |
| `.select.small` | height: var(--height-bs) — modifier of .select | `_07_interactions.sass` |
| `.link` | Themed link — theme color, alt on hover | `_07_interactions.sass` |
| `.link-plain` | Plain link — inherits ink, theme color on hover | `_07_interactions.sass` |
| `.link-parent` | Link block — hovers color its .link-title child instead of itself | `_07_interactions.sass` |
| `.link-title` | transition: color var(--motionin1) — child of .link-parent | `_07_interactions.sass` |
| `a.nav-link` | Interactive form of .nav-link — padded, curved, hover fill | `_07_interactions.sass` |
| `button` | Element base for every button — the quartet root (align, height, focus, disabled states) | `_07_interactions.sass` |
| `button.icon` | height: 24px — modifier of button | `_07_interactions.sass` |
| `button.modern` | border-radius: var(--space-xs) — modifier of button | `_07_interactions.sass` |
| `button.primary` | background: var(--theme-color) — modifier of button | `_07_interactions.sass` |
| `button[data-variant="primary"]` | background: var(--theme-color) — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="secondary"]` | background: var(--state-surface) — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="soft"]` | background: var(--theme-color-sub) — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="outline"]` | background: var(--bg) — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="ghost"]` | background: transparent — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="link"]` | background: transparent — attribute variant of button | `_07_interactions.sass` |
| `button[data-variant="destructive"]` | background: var(--danger) — attribute variant of button | `_07_interactions.sass` |
| `button[data-shape="modern"]` | border-radius: var(--radius-sm) — attribute variant of button | `_07_interactions.sass` |
| `button[data-shape="curved"]` | border-radius: var(--radius-md) — attribute variant of button | `_07_interactions.sass` |
| `button[data-shape="round"]` | border-radius: var(--radius-full) — attribute variant of button | `_07_interactions.sass` |
| `button[data-size="sm"]` | height: var(--height-sm) — attribute variant of button | `_07_interactions.sass` |
| `button[data-size="md"]` | height: var(--height-md) — attribute variant of button | `_07_interactions.sass` |
| `button[data-size="bs"]` | height: var(--height-bs) — attribute variant of button | `_07_interactions.sass` |
| `button[data-size="lg"]` | height: var(--height-lg) — attribute variant of button | `_07_interactions.sass` |
| `a.primary` | Primary call-to-action anchor — theme fill, sm elevation, modern corner optional | `_07_interactions.sass` |
| `a.primary.modern` | border-radius: var(--space-xs) — modifier of a.primary | `_07_interactions.sass` |
| `a.outline` | Outline call-to-action anchor — transparent fill, ink border, sm elevation | `_07_interactions.sass` |
| `a.outline.modern` | border-radius: var(--space-xs) — modifier of a.outline | `_07_interactions.sass` |
| `.bg` | Bare background — page base fill (var(--bg)) | `_08_visuals.sass` |
| `.surface` | Bare background — surface fill (var(--bg-surface)) | `_08_visuals.sass` |
| `.panel` | Bare background — panel fill (var(--bg-panel)) | `_08_visuals.sass` |
| `.sunken` | Bare background — sunken fill (var(--bg-sunken)) | `_08_visuals.sass` |
| `.raised` | Bare background — raised fill (var(--bg-raised)) | `_08_visuals.sass` |
| `.extra` | Bare background — extra fill (var(--bg-extra)) | `_08_visuals.sass` |
| `.text-primary` | color: var(--text-primary) | `_08_visuals.sass` |
| `.text-secondary` | color: var(--text-secondary) | `_08_visuals.sass` |
| `.text-muted` | color: var(--text-muted) | `_08_visuals.sass` |
| `.text-inverse` | color: var(--text-inverse) | `_08_visuals.sass` |
| `.text-white` | color: var(--white-fixed) | `_08_visuals.sass` |
| `.text-black` | color: var(--black-fixed) | `_08_visuals.sass` |
| `.text-theme` | color: var(--theme-color) | `_08_visuals.sass` |
| `.text-success` | color: var(--success) | `_08_visuals.sass` |
| `.text-warning` | color: var(--warning) | `_08_visuals.sass` |
| `.text-danger` | color: var(--danger) | `_08_visuals.sass` |
| `.text-info` | color: var(--info) | `_08_visuals.sass` |
| `.bg-success` | Status fills, mirroring the status inks above. A dot or chip that carries the | `_08_visuals.sass` |
| `.bg-warning` | background: var(--warning) | `_08_visuals.sass` |
| `.bg-danger` | background: var(--danger) | `_08_visuals.sass` |
| `.bg-info` | background: var(--info) | `_08_visuals.sass` |
| `.border` | Full border, standard weight (var(--border)) | `_08_visuals.sass` |
| `.border-subtle` | Full border, subtle weight (var(--border-subtle)) | `_08_visuals.sass` |
| `.border-strong` | Full border, strong weight (var(--border-strong)) | `_08_visuals.sass` |
| `.bt` | border-top: 1px solid var(--border) | `_08_visuals.sass` |
| `.br` | border-right: 1px solid var(--border) | `_08_visuals.sass` |
| `.bb` | border-bottom: 1px solid var(--border) | `_08_visuals.sass` |
| `.bl` | border-left: 1px solid var(--border) | `_08_visuals.sass` |
| `.bt-str` | border-top: 1px solid var(--border-strong) | `_08_visuals.sass` |
| `.br-str` | border-right: 1px solid var(--border-strong) | `_08_visuals.sass` |
| `.bb-str` | border-bottom: 1px solid var(--border-strong) | `_08_visuals.sass` |
| `.bl-str` | border-left: 1px solid var(--border-strong) | `_08_visuals.sass` |
| `.bt-sub` | border-top: 1px solid var(--border-subtle) | `_08_visuals.sass` |
| `.br-sub` | border-right: 1px solid var(--border-subtle) | `_08_visuals.sass` |
| `.bb-sub` | border-bottom: 1px solid var(--border-subtle) | `_08_visuals.sass` |
| `.bl-sub` | border-left: 1px solid var(--border-subtle) | `_08_visuals.sass` |
| `.shadow-xs` | box-shadow: var(--shadow-xs) | `_08_visuals.sass` |
| `.shadow-sm` | box-shadow: var(--shadow-sm) | `_08_visuals.sass` |
| `.shadow-md` | box-shadow: var(--shadow-md) | `_08_visuals.sass` |
| `.shadow-bs` | box-shadow: var(--shadow-bs) | `_08_visuals.sass` |
| `.shadow-lg` | box-shadow: var(--shadow-lg) | `_08_visuals.sass` |
| `.shadow-xl` | box-shadow: var(--shadow-xl) | `_08_visuals.sass` |
| `.shadow-2xl` | box-shadow: var(--shadow-2xl) | `_08_visuals.sass` |
| `.shadow-3xl` | box-shadow: var(--shadow-3xl) | `_08_visuals.sass` |
| `.hide-mobile` | Display none at ≤1024px | `_08_visuals.sass` |
| `.hide-desktop` | Display none at ≥1025px | `_08_visuals.sass` |
| `.orange1` | special color classes | `_08_visuals.sass` |
| `.orange2` | color: var(--orangepop2) | `_08_visuals.sass` |
| `.orange3` | color: var(--orangepop3) | `_08_visuals.sass` |
| `.orange4` | color: var(--orangepop4) | `_08_visuals.sass` |
| `.orange5` | color: var(--orangepop5) | `_08_visuals.sass` |
| `.orange6` | color: var(--orangepop6) | `_08_visuals.sass` |

---

## Custom — Own

Sanctioned extension point (_09_own.sass). Project-specific additions that cannot be expressed via canonical layers.

| Class | Applies | Source |
|:---|:---|:---|
| `.site-logomotif` | Site logo motif — 48px, scales 1.2 on hover | `_09_own.sass` |
| `.logotype` | Logotype — 28px wordmark | `_09_own.sass` |
| `.project-circle` | Project dot — 16px circle | `_09_own.sass` |
| `.mascot` | Mascot (src/lib/comps/Mascot.svelte): CSS-only "3D feel" logo. | `_09_own.sass` |
| `.mascot-bob` | display: block | `_09_own.sass` |
| `.mascot-tilt` | display: block | `_09_own.sass` |
| `.mascot-bobs .mascot-bob` | animation: mascot-bob 3.6s ease-in-out infinite alternate — combination rule (mascot-bobs mascot-bob) | `_09_own.sass` |
| `.mascot-base` | display: block | `_09_own.sass` |
| `.mascot-overlay` | position: absolute | `_09_own.sass` |
| `.mascot-mask` | mask-type: alpha | `_09_own.sass` |
| `.mascot-pupil-l` | transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mas… | `_09_own.sass` |
| `.mascot-pupil-r` | transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mas… | `_09_own.sass` |
| `.mascot-gloss` | opacity: 0.42 | `_09_own.sass` |
| `.mascot-shade` | opacity: 0.55 | `_09_own.sass` |
| `.mascot-blinks .mascot-lid` | animation: mascot-blink 5.2s ease-in-out infinite — combination rule (mascot-blinks mascot-lid) | `_09_own.sass` |
| `.mascotgl` | MascotGL (src/lib/comps/MascotGL.svelte): WebGL2 lab version of the mascot. | `_09_own.sass` |
| `.mascotgl-spacer` | display: block | `_09_own.sass` |
| `.mascotgl-canvas` | position: absolute | `_09_own.sass` |
| `.mascotgl-ready` | opacity: 1 | `_09_own.sass` |
| `.mascotgl-compact .mascotgl-canvas` | Header-sized: 15% overhang per side (EXTENT_COMPACT = 0.65), still outside the layout box. | `_09_own.sass` |
| `.hero-name` | Hero display name — text-5xl doubled, 800, tight tracking | `_09_own.sass` |
| `.accordion` | Accordion group — vertical stack of .accordion-item | `_09_own.sass` |
| `.accordion-item` | Accordion item — bordered, curved shell hosting trigger and content | `_09_own.sass` |
| `.accordion-content` | Collapsible region of an .accordion-item — 0fr→1fr grid transition | `_09_own.sass` |
| `.accordion-panel` | The panel is what collapses. It needs min-height: 0 so the grid row can | `_09_own.sass` |
| `.accordion-item.open .accordion-content` | grid-template-rows: 1fr — combination rule (accordion-itemopen accordion-content) | `_09_own.sass` |
| `.accordion-trigger` | Accordion trigger button — full-width, hover/focus states | `_09_own.sass` |

---

## Semantic Tokens

```css
  --white-fixed: #FFFFFF; /* light */
  --black-fixed: #171717; /* light */
  --bg: #ffffff; /* light */
  --bg-surface: #FBFBF9; /* light */
  --bg-panel: #FBFBF9; /* light */
  --bg-sunken: #F7F6F0; /* light */
  --bg-raised: #F4F4F5; /* light */
  --bg-extra: rgb(247, 248, 249); /* light */
  --bg-input: #f8f9fa; /* light */
  --bg-button: #CED8D3; /* light */
  --text-primary: #262627; /* light */
  --text-secondary: #777777; /* light */
  --text-muted: #a3a4a7; /* light */
  --text-inverse: #ffffff; /* light */
  --state-surface: #F2EFE9; /* light */
  --state-hover: #ECE7DF; /* light */
  --state-selected: #E4DFD5; /* light */
  --border: #d8d8d8; /* light */
  --border-subtle: #eceaea; /* light */
  --border-strong: #cfcfcf; /* light */
  --theme-color: #ff4400; /* light */
  --theme-color-alt: #be2f00; /* light */
  --theme-color-sub: #feb18a; /* light */
  --success: #10B981; /* light */
  --success-hover: #059669; /* light */
  --warning: #F59E0B; /* light */
  --warning-hover: #D97706; /* light */
  --danger: #bf2a2a; /* light */
  --danger-hover: #DC2626; /* light */
  --info: #3B82F6; /* light */
  --info-hover: #2563EB; /* light */
  --ring: rgba(0, 127, 78, 0.35); /* light */
  --shadow-color: 15 13 42; /* light */
  --shadow-rim: transparent; /* light */
  --shadow-xs: 0 1px 2px rgb(var(--shadow-color) / 0.14); /* light */
  --shadow-sm: 0 1px 2px rgb(var(--shadow-color) / 0.10), 0 2px 4px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-md: 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 8px 16px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-bs: 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-lg: 0 4px 8px rgb(var(--shadow-color) / 0.06), 0 12px 24px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-xl: 0 8px 16px rgb(var(--shadow-color) / 0.06), 0 20px 36px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-2xl: 0 12px 24px rgb(var(--shadow-color) / 0.06), 0 28px 48px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-3xl: 0 16px 32px rgb(var(--shadow-color) / 0.06), 0 36px 64px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-umbra: rgb(0 0 0 / 0.50); /* dark */
  --font-sans: "Timeless Sans", sans-serif; /* root */
  --timeless-sans: "Timeless Sans", sans-serif; /* root */
  --timeless-grotesk: "Timeless Grotesk", sans-serif; /* root */
  --text-scaling: 1.25; /* root */
  --text-xs: 0.67rem; /* root */
  --text-sm: 0.75rem; /* root */
  --text-md: 0.875rem; /* root */
  --text-bs: 1rem; /* root */
  --text-lg: calc(var(--text-bs) * var(--text-scaling)); /* root */
  --text-xl: calc(var(--text-lg) * var(--text-scaling)); /* root */
  --text-2xl: calc(var(--text-xl) * var(--text-scaling)); /* root */
  --text-3xl: calc(var(--text-2xl) * var(--text-scaling)); /* root */
  --text-4xl: calc(var(--text-3xl) * var(--text-scaling)); /* root */
  --text-5xl: calc(var(--text-4xl) * var(--text-scaling)); /* root */
  --unit-space: 0.25rem; /* root */
  --space-xs: var(--unit-space); /* root */
  --space-sm: calc(var(--unit-space) * 2); /* root */
  --space-md: calc(var(--unit-space) * 3); /* root */
  --space-bs: calc(var(--unit-space) * 4); /* root */
  --space-lg: calc(var(--unit-space) * 6); /* root */
  --space-xl: calc(var(--unit-space) * 8); /* root */
  --space-2xl: calc(var(--unit-space) * 12); /* root */
  --space-3xl: calc(var(--unit-space) * 16); /* root */
  --radius-xs: 2px; /* root */
  --radius-sm: 4px; /* root */
  --radius-md: 8px; /* root */
  --radius-bs: 16px; /* root */
  --radius-lg: 32px; /* root */
  --radius-full: 9999px; /* root */
  --control-h-sm: 21px; /* root */
  --control-h-bs: 32px; /* root */
  --control-h-lg: 38px; /* root */
  --avatar-size: 32px; /* root */
  --switch-w: 40px; /* root */
  --switch-h: 22px; /* root */
  --switch-thumb: 16px; /* root */
  --transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715); /* root */
  --transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190); /* root */
  --transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060); /* root */
  --transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000); /* root */
  --transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000); /* root */
  --transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000); /* root */
  --speed0: 50ms; /* root */
  --speed1: 90ms; /* root */
  --speed2: 140ms; /* root */
  --speed3: 220ms; /* root */
  --motionin1: var(--speed0) var(--transin1); /* root */
  --motionout1: var(--speed1) var(--transout1); /* root */
  --motionin2: var(--speed2) var(--transin2); /* root */
  --motionout2: var(--speed2) var(--transout2); /* root */
  --motionin3: var(--speed3) var(--transin3); /* root */
  --motionout3: var(--speed3) var(--transout3); /* root */
  --header-height: 64px; /* root */
  --footer-height: 32px; /* root */
  --fit-height: calc(var(--header-height) + var(--footer-height)); /* root */
  --prose-clamp: 65ch; /* root */
  --content-clamp: 1600px; /* root */
  --app-inline: var(--space-lg); /* root */
  --card-min: 240px; /* root */
  --height-sm: 16px; /* root */
  --height-md: 20px; /* root */
  --height-bs: 27px; /* root */
  --height-lg: 32px; /* root */
  --sidebar-width: 280px; /* root */
  --sidebar-width-left: 280px; /* root */
  --sidebar-width-right: 280px; /* root */
  --z-sticky: 100; /* root */
  --z-raised: 200; /* root */
  --z-modal: 300; /* root */
  --z-toast: 500; /* root */
  --greenpop1: #70e000; /* root */
  --greenpop2: #00df89; /* root */
  --greenpop3: #69ff97; /* root */
  --greenpop4: #00e676; /* root */
  --orangepop1: #ff7700; /* root */
  --orangepop2: #ff4400; /* root */
  --orangepop3: #ff0055; /* root */
  --orangepop4: #ff5e36; /* root */
  --orangepop5: #ff9966; /* root */
  --orangepop6: #ff9f1c; /* root */
  --shade-xs: var(--shadow-rim), 0 1px 1px rgb(var(--shadow-color) / 0.14), 0 0px 0px rgb(var(--shadow-color) / 0.00); /* root */
  --shade-sm: var(--shadow-rim), 0 1px 2px rgb(var(--shadow-color) / 0.12), 0 1px 3px rgb(var(--shadow-color) / 0.02); /* root */
  --shade-md: var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.09), 0 3px 6px rgb(var(--shadow-color) / 0.04); /* root */
  --shade-bs: var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06); /* root */
  --shade-lg: var(--shadow-rim), 0 4px 8px rgb(var(--shadow-color) / 0.04), 0 12px 24px rgb(var(--shadow-color) / 0.08); /* root */
  --shade-xl: var(--shadow-rim), 0 6px 12px rgb(var(--shadow-color) / 0.03), 0 20px 36px rgb(var(--shadow-color) / 0.09); /* root */
  --shade-2xl: var(--shadow-rim), 0 8px 16px rgb(var(--shadow-color) / 0.02), 0 28px 48px rgb(var(--shadow-color) / 0.09); /* root */
  --shade-3xl: var(--shadow-rim), 0 12px 24px rgb(var(--shadow-color) / 0.02), 0 36px 64px rgb(var(--shadow-color) / 0.08); /* root */
```
