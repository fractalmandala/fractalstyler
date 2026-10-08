# Fractalstyler — Token Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.js`
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
| `--text-md` | `.text-md` | `0.875rem` |
| `--text-bs` | `.text-bs` | `1rem` |
| `--text-lg` | `.text-lg` | `calc(var(--text-bs) * var(--text-scaling))` |
| `--text-xl` | `.text-xl` | `calc(var(--text-lg) * var(--text-scaling))` |
| `--text-2xl` | `.text-2xl` | `calc(var(--text-xl) * var(--text-scaling))` |
| `--text-3xl` | `.text-3xl` | `calc(var(--text-2xl) * var(--text-scaling))` |
| `--text-4xl` | `.text-4xl` | `calc(var(--text-3xl) * var(--text-scaling))` |
| `--text-5xl` | `.text-5xl` | `calc(var(--text-4xl) * var(--text-scaling))` |

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
| `--height-xl` | `.h-xl` | `40` |

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
| `--black-fixed` | `.text-black` | `#171717` |
| `--bg` | `.bg-main` | `#ffffff` |
| `--bg-surface` | `.bg-surface` | `#FBFBF9` |
| `--bg-panel` | `.bg-panel` | `#FBFBF9` |
| `--bg-sunken` | `.bg-sunken` | `#F7F6F0` |
| `--bg-raised` | `.bg-raised` | `#F4F4F5` |
| `--bg-extra` | `.bg-extra` | `rgb(247, 248, 249)` |
| `--bg-input` | — | `#f8f9fa` |
| `--bg-button` | — | `#CED8D3` |
| `--text-primary` | .text-primary | `#262627` |
| `--text-secondary` | .text-secondary | `#777777` |
| `--text-muted` | .text-muted | `#bac8f3` |
| `--text-inverse` | .text-inverse | `#ffffff` |
| `--state-surface` | — | `#F2EFE9` |
| `--state-hover` | — | `#ECE7DF` |
| `--state-selected` | — | `#E4DFD5` |
| `--border` | — | `#d8d8d8` |
| `--border-subtle` | — | `#eceaea` |
| `--border-strong` | — | `#cfcfcf` |
| `--theme-color` | `.text-theme` | `#0dc02e` |
| `--theme-color-alt` | `.text-theme-alt` | `#317b14` |
| `--theme-color-sub` | `.text-theme-sub` | `#2b571a` |
| `--success` | `.text-success` `.bg-success` | `#10B981` |
| `--success-hover` | — | `#059669` |
| `--warning` | `.text-warning` `.bg-warning` | `#F59E0B` |
| `--warning-hover` | — | `#D97706` |
| `--danger` | `.text-danger` `.bg-danger` | `#bf2a2a` |
| `--danger-hover` | — | `#DC2626` |
| `--info` | `.text-info` `.bg-info` | `#3B82F6` |
| `--info-hover` | — | `#2563EB` |
| `--ring` | — | `rgba(0, 127, 78, 0.35)` |

## Elevation

`--shadow-*` channels are what the `.shadow-*` classes read; `--shade-*` are
loop-generated from `$shadow-specs` in `_00_config.sass` (rim + key + ambient).

| Token | Class | Value |
|:---|:---|:---|
| `--shadow-color` | — | `15 13 42` |
| `--shadow-rim` | — | `transparent` |
| `--shadow-xs` | `.shadow-xs` | `0 1px 2px rgb(var(--shadow-color) / 0.14)` |
| `--shadow-sm` | `.shadow-sm` | `0 1px 2px rgb(var(--shadow-color) / 0.10), 0 2px 4px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-md` | `.shadow-md` | `0 2px 4px rgb(var(--shadow-color) / 0.06), 0 8px 16px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-bs` | `.shadow-bs` | `0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-lg` | `.shadow-lg` | `0 4px 8px rgb(var(--shadow-color) / 0.06), 0 12px 24px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-xl` | `.shadow-xl` | `0 8px 16px rgb(var(--shadow-color) / 0.06), 0 20px 36px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-2xl` | `.shadow-2xl` | `0 12px 24px rgb(var(--shadow-color) / 0.06), 0 28px 48px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-3xl` | `.shadow-3xl` | `0 16px 32px rgb(var(--shadow-color) / 0.06), 0 36px 64px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-umbra` | — | `rgb(0 0 0 / 0.50)` |
| `--shade-xs` | — | `var(--shadow-rim), 0 1px 1px rgb(var(--shadow-color) / 0.14), 0 0px 0px rgb(var(--shadow-color) / 0.00)` |
| `--shade-sm` | — | `var(--shadow-rim), 0 1px 2px rgb(var(--shadow-color) / 0.12), 0 1px 3px rgb(var(--shadow-color) / 0.02)` |
| `--shade-md` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.09), 0 3px 6px rgb(var(--shadow-color) / 0.04)` |
| `--shade-bs` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06)` |
| `--shade-lg` | — | `var(--shadow-rim), 0 4px 8px rgb(var(--shadow-color) / 0.04), 0 12px 24px rgb(var(--shadow-color) / 0.08)` |
| `--shade-xl` | — | `var(--shadow-rim), 0 6px 12px rgb(var(--shadow-color) / 0.03), 0 20px 36px rgb(var(--shadow-color) / 0.09)` |
| `--shade-2xl` | — | `var(--shadow-rim), 0 8px 16px rgb(var(--shadow-color) / 0.02), 0 28px 48px rgb(var(--shadow-color) / 0.09)` |
| `--shade-3xl` | — | `var(--shadow-rim), 0 12px 24px rgb(var(--shadow-color) / 0.02), 0 36px 64px rgb(var(--shadow-color) / 0.08)` |
| `--shadow-color` | — | `15 13 42` |
| `--shadow-rim` | — | `transparent` |

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
| `--z-sticky` | — | `100` |
| `--z-raised` | — | `200` |
| `--z-modal` | — | `300` |
| `--z-toast` | — | `500` |

## Pop Colors

Named accent literals. The `.orange1`…`.orange6` ink classes read
`--orangepop*`; the green set is reserved for future use.

| Token | Class | Value |
|:---|:---|:---|
| `--greenpop1` | — | `#70e000` |
| `--greenpop2` | — | `#00df89` |
| `--greenpop3` | — | `#69ff97` |
| `--greenpop4` | — | `#00e676` |
| `--orangepop1` | `.orange1` | `#ff7700` |
| `--orangepop2` | `.orange2` | `#ff4400` |
| `--orangepop3` | `.orange3` | `#ff0055` |
| `--orangepop4` | `.orange4` | `#ff5e36` |
| `--orangepop5` | `.orange5` | `#ff9966` |
| `--orangepop6` | `.orange6` | `#ff9f1c` |

## Modes & Attribute Axes

`data-mode` on the root selects the token mixin: `light` (default) or `dark`.

| Attribute | Where | Values | Effect |
|:---|:---|:---|:---|
| `data-mode` | `<html>` | `light` \| `dark` | Swaps `=light-theme-tokens` / `=dark-theme-tokens` |
| `data-shape` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `square` \| `modern` \| `curved` \| `round` | Corner treatment of the component |
| `data-variant` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `primary` \| `secondary` \| `soft` \| `outline` \| `ghost` \| `link` \| `destructive` | Visual paint variant |
| `data-size` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `sm` \| `md` \| `bs` \| `lg` | Metrics / scale variant |
