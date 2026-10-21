# Fractalstyler — Token Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts`
from `_00_tokens.sass` (light/dark mixins + `:root`) and the shadow specs in
`_00_config.sass`.

Every `--space-*` step is a class family: if `--space-md` exists, so do
`.gap-md`, `.pad-md` and `.mar-md` (plus the `.px`/`.py`/`.pt`… sides).
There is no second vocabulary to learn.

## Type Scale

Fixed rem rungs up to base, then compounded by `--text-scaling` (1.25).

| Token | Class | Value |
|:---|:---|:---|
| `--text-xs` | `.text-xs` | `0.67rem` |
| `--text-sm` | `.text-sm` | `0.75rem` |
| `--text-md` | `.text-md` | `clamp(0.8333rem, 0.8061rem + 0.1212vw, 0.9rem)` |
| `--text-bs` | `.text-bs` | `clamp(1rem, 0.9489rem + 0.2273vw, 1rem)` |
| `--text-lg` | `.text-lg` | `clamp(1.2rem, 1.1156rem + 0.375vw, 1.4063rem)` |
| `--text-xl` | `.text-xl` | `clamp(1.44rem, 1.31rem + 0.5778vw, 1.7578rem)` |
| `--text-2xl` | `.text-2xl` | `clamp(1.728rem, 1.536rem + 0.8532vw, 2.1973rem)` |
| `--text-3xl` | `.text-3xl` | `clamp(2.0736rem, 1.7983rem + 1.2236vw, 2.7466rem)` |
| `--text-4xl` | `.text-4xl` | `clamp(2.4883rem, 2.1018rem + 1.718vw, 3.4332rem)` |
| `--text-5xl` | `.text-5xl` | `clamp(2.986rem, 2.4519rem + 2.3737vw, 4.2915rem)` |

| Token | Class | Value |
|:---|:---|:---|
| `--text-scaling` | — | `1.25` |

## Space Scale

`--unit-space` (0.25rem) times a step multiplier. Every step feeds the
gap/pad/mar families in L1.

| Token | Class | Value |
|:---|:---|:---|
| `--unit-space` | — | `0.25rem` |

| Token | Class | Value |
|:---|:---|:---|
| `--space-xs` | `.gap-xs` `.pad-xs` `.mar-xs` + sides | `var(--unit-space)` |
| `--space-sm` | `.gap-sm` `.pad-sm` `.mar-sm` + sides | `calc(var(--unit-space) * 2)` |
| `--space-md` | `.gap-md` `.pad-md` `.mar-md` + sides | `calc(var(--unit-space) * 3)` |
| `--space-bs` | `.gap-bs` `.pad-bs` `.mar-bs` + sides | `calc(var(--unit-space) * 4)` |
| `--space-lg` | `.gap-lg` `.pad-lg` `.mar-lg` + sides | `calc(var(--unit-space) * 6)` |
| `--space-xl` | `.gap-xl` `.pad-xl` `.mar-xl` + sides | `calc(var(--unit-space) * 8)` |
| `--space-2xl` | `.gap-2xl` `.pad-2xl` `.mar-2xl` + sides | `calc(var(--unit-space) * 12)` |
| `--space-3xl` | `.gap-3xl` `.pad-3xl` `.mar-3xl` + sides | `calc(var(--unit-space) * 16)` |

## Radius

Six channels. Compositions read the tokens, never a literal radius.

| Token | Class | Value |
|:---|:---|:---|
| `--radius-xs` | `.radius-xs` | `2px` |
| `--radius-sm` | `.radius-sm` | `4px` |
| `--radius-md` | `.radius-md` | `8px` |
| `--radius-bs` | `.radius-bs` | `16px` |
| `--radius-lg` | `.radius-lg` | `32px` |
| `--radius-full` | `.radius-full` | `9999px` |

## Control & Component Metrics

Heights for inputs, selects and buttons; avatar and switch channels.

| Token | Class | Value |
|:---|:---|:---|
| `--avatar-size` | — | `32px` |
| `--switch-w` | — | `40px` |
| `--switch-h` | — | `22px` |
| `--switch-thumb` | — | `16px` |
| `--height-sm` | `.h-sm` | `20px` |
| `--height-md` | `.h-md` | `24px` |
| `--height-bs` | `.h-bs` | `28px` |
| `--height-lg` | `.h-lg` | `32px` |
| `--height-xl` | `.h-xl` | `40px` |
| `--height-2xl` | `.h-2xl` | `48px` |

## Motion Language

Durations, easings and the composed `--motion*` channels every transition reads.

| Token | Class | Value |
|:---|:---|:---|
| `--transin1` | — | `cubic-bezier(0.470, 0.000, 0.745, 0.715)` |
| `--transin2` | — | `cubic-bezier(0.550, 0.055, 0.675, 0.190)` |
| `--transin3` | — | `cubic-bezier(0.755, 0.050, 0.855, 0.060)` |
| `--transout1` | — | `cubic-bezier(0.390, 0.575, 0.565, 1.000)` |
| `--transout2` | — | `cubic-bezier(0.215, 0.610, 0.355, 1.000)` |
| `--transout3` | — | `cubic-bezier(0.230, 1.000, 0.320, 1.000)` |
| `--speed0` | — | `50ms` |
| `--speed1` | — | `90ms` |
| `--speed2` | — | `140ms` |
| `--speed3` | — | `220ms` |
| `--motionin1` | — | `var(--speed0) var(--transin1)` |
| `--motionout1` | — | `var(--speed1) var(--transout1)` |
| `--motionin2` | — | `var(--speed2) var(--transin2)` |
| `--motionout2` | — | `var(--speed2) var(--transout2)` |
| `--motionin3` | — | `var(--speed3) var(--transin3)` |
| `--motionout3` | — | `var(--speed3) var(--transout3)` |

## Colour Roles

Name the role, never the hex. Values shown are the light default;
`[data-mode='dark']` remaps them via `=dark-theme-tokens`.

| Token | Class | Value |
|:---|:---|:---|
| `--white-fixed` | `.text-white` | `#FFFFFF` |
| `--black-fixed` | `.text-black` | `#18181B` |
| `--bg` | `.bg-main` | `#FFFFFF` |
| `--bg-surface` | `.bg-surface` | `#F4F3EE` |
| `--bg-panel` | `.bg-panel` | `#F5F4EF` |
| `--bg-sunken` | `.bg-sunken` | `#F6F6F6` |
| `--bg-raised` | `.bg-raised` | `#FCFDFD` |
| `--bg-extra` | `.bg-extra` | `#F5F7F9` |
| `--bg-input` | — | `#F4F3EE` |
| `--bg-button` | — | `#6f6f6e` |
| `--text-primary` | .text-primary | `#1c1c1d` |
| `--text-secondary` | .text-secondary | `#808182` |
| `--text-muted` | .text-muted | `#aaacaf` |
| `--text-inverse` | .text-inverse | `#FFFFFF` |
| `--state-surface` | — | `#F4F4F6` |
| `--state-hover` | — | `#E4E5E8` |
| `--state-selected` | — | `#7c7c7a` |
| `--border` | — | `#E5E7EB` |
| `--border-subtle` | — | `#F0F1F3` |
| `--border-strong` | — | `#D1D5DB` |
| `--theme-color` | `.text-theme` | `#22c55e` |
| `--theme-color-alt` | `.text-theme-alt` | `#00df89` |
| `--theme-color-sub` | `.text-theme-sub` | `#10b981` |
| `--accent-orange` | — | `#FF7A00` |
| `--accent-green` | — | `#10B981` |
| `--success` | `.text-success` `.bg-success` | `#10B981` |
| `--success-hover` | — | `#059669` |
| `--warning` | `.text-warning` `.bg-warning` | `#FFD000` |
| `--warning-hover` | — | `#E5B800` |
| `--danger` | `.text-danger` `.bg-danger` | `#EF4444` |
| `--danger-hover` | — | `#DC2626` |
| `--info` | `.text-info` `.bg-info` | `#3B82F6` |
| `--info-hover` | — | `#2563EB` |
| `--ring` | — | `rgba(255, 208, 0, 0.4)` |

## Elevation

`--shadow-*` channels are what the `.shadow-*` classes read; `--shade-*` are
loop-generated from `$shadow-specs` in `_00_config.sass` (rim + key + ambient).

| Token | Class | Value |
|:---|:---|:---|
| `--shadow-color` | — | `0 0 0` |
| `--shadow-rim` | — | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |
| `--shadow-xs` | `.shadow-xs` | `0 1px 2px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-sm` | `.shadow-sm` | `0 1px 2px rgb(var(--shadow-color) / 0.06), 0 2px 4px rgb(var(--shadow-color) / 0.04)` |
| `--shadow-md` | `.shadow-md` | `0 2px 4px rgb(var(--shadow-color) / 0.05), 0 8px 16px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-bs` | `.shadow-bs` | `0 2px 4px rgb(var(--shadow-color) / 0.05), 0 6px 14px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-lg` | `.shadow-lg` | `0 4px 8px rgb(var(--shadow-color) / 0.06), 0 12px 24px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-xl` | `.shadow-xl` | `0 8px 16px rgb(var(--shadow-color) / 0.07), 0 20px 36px rgb(var(--shadow-color) / 0.07)` |
| `--shadow-2xl` | `.shadow-2xl` | `0 12px 24px rgb(var(--shadow-color) / 0.08), 0 28px 48px rgb(var(--shadow-color) / 0.08)` |
| `--shadow-3xl` | `.shadow-3xl` | `0 16px 32px rgb(var(--shadow-color) / 0.10), 0 36px 64px rgb(var(--shadow-color) / 0.10)` |
| `--shadow-umbra` | — | `rgb(0 0 0 / 0.60)` |
| `--shade-xs` | — | `var(--shadow-rim), 0 1px 1px rgb(var(--shadow-color) / 0.14), 0 0px 0px rgb(var(--shadow-color) / 0.00)` |
| `--shade-sm` | — | `var(--shadow-rim), 0 1px 2px rgb(var(--shadow-color) / 0.12), 0 1px 3px rgb(var(--shadow-color) / 0.02)` |
| `--shade-md` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.09), 0 3px 6px rgb(var(--shadow-color) / 0.04)` |
| `--shade-bs` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06)` |
| `--shade-lg` | — | `var(--shadow-rim), 0 4px 8px rgb(var(--shadow-color) / 0.04), 0 12px 24px rgb(var(--shadow-color) / 0.08)` |
| `--shade-xl` | — | `var(--shadow-rim), 0 6px 12px rgb(var(--shadow-color) / 0.03), 0 20px 36px rgb(var(--shadow-color) / 0.09)` |
| `--shade-2xl` | — | `var(--shadow-rim), 0 8px 16px rgb(var(--shadow-color) / 0.02), 0 28px 48px rgb(var(--shadow-color) / 0.09)` |
| `--shade-3xl` | — | `var(--shadow-rim), 0 12px 24px rgb(var(--shadow-color) / 0.02), 0 36px 64px rgb(var(--shadow-color) / 0.08)` |
| `--shadow-color` | — | `0 0 0` |
| `--shadow-rim` | — | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |

## Fonts, Layout Constants & Page Chrome

Font stacks plus the page geometry the shells and viewport classes read.

| Token | Class | Value |
|:---|:---|:---|
| `--header-height` | — | `64px` |
| `--footer-height` | — | `32px` |
| `--fit-height` | — | `calc(var(--header-height) + var(--footer-height))` |
| `--prose-clamp` | — | `65ch` |
| `--content-clamp` | — | `1600px` |
| `--app-inline` | — | `var(--space-lg)` |
| `--card-min` | — | `240px` |
| `--sidebar-width` | — | `280px` |
| `--sidebar-width-left` | — | `280px` |
| `--sidebar-width-right` | — | `280px` |
| `--z-sticky` | `.z-sticky` | `100` |
| `--z-raised` | `.z-raised` | `200` |
| `--z-modal` | `.z-modal` | `300` |
| `--z-toast` | `.z-toast` | `500` |

## Pop Colors

Named accent literals. The `.green1`…`.green4`, `.orange1`…`.orange6`, and `.yellow1`…`.yellow4` ink classes read them.

| Token | Class | Value |
|:---|:---|:---|
| `--greenpop1` | `.green1` | `#10b981` |
| `--greenpop2` | `.green2` | `#22c55e` |
| `--greenpop3` | `.green3` | `#00df89` |
| `--greenpop4` | `.green4` | `#00e676` |
| `--orangepop1` | `.orange1` | `#ff7a00` |
| `--orangepop2` | `.orange2` | `#f97316` |
| `--orangepop3` | `.orange3` | `#ea580c` |
| `--orangepop4` | `.orange4` | `#ff5e36` |
| `--orangepop5` | `.orange5` | `#ff9966` |
| `--orangepop6` | `.orange6` | `#ff9f1c` |
| `--yellowpop1` | `.yellow1` | `#ffd000` |
| `--yellowpop2` | `.yellow2` | `#facc15` |
| `--yellowpop3` | `.yellow3` | `#fbbf24` |
| `--yellowpop4` | `.yellow4` | `#eab308` |

## Modes & Attribute Axes

`data-mode` on the root selects the token mixin: `light` (default) or `dark`.

The other axes are class-qualified: an element opts into an axis by carrying the
class that answers it, and the element name is never the qualifier. A bare
`<button data-variant="primary">` paints nothing.

| Axis class | Attribute | Values | Effect |
|:---|:---|:---|:---|
| `data-mode` | `<html>` | `light` \| `dark` | Swaps `=light-theme-tokens` / `=dark-theme-tokens` |
| `.el-variants` | `data-variant` | `primary` \| `secondary` \| `themed` \| `outline` \| `ghost` \| `link` \| `icon` | Visual paint variant |
| `.el-shape` | `data-shape` | `square` \| `min` \| `modern` \| `curved` \| `round` | Corner treatment of the component |
| `.el-size` | `data-size` | `sm` \| `md` \| `bs` \| `lg` \| `xl` | Metrics / scale variant (height + type) |
| `.el-pad` | `data-pad` | `sm` \| `md` \| `bs` \| `lg` \| `xl` | Padding from `--space-*` |
| `.el-shadow` / `.el-shadow-hover` | `data-shadow` | `sm` \| `bs` \| `lg` \| `xl` \| `2xl` | Elevation from `--shadow-*` |
| `.el-vss` | `data-variant` + `data-shape` + `data-size` | as above | Variant, shape and size in one class |
