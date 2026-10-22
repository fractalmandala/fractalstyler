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

| Token | Class | Value |
|:---|:---|:---|

## Space Scale

`--unit-space` (0.25rem) times a step multiplier. Every step feeds the
gap/pad/mar families in L1.

| Token | Class | Value |
|:---|:---|:---|

| Token | Class | Value |
|:---|:---|:---|

## Radius

Six channels. Compositions read the tokens, never a literal radius.

| Token | Class | Value |
|:---|:---|:---|

## Control & Component Metrics

Heights for inputs, selects and buttons; avatar and switch channels.

| Token | Class | Value |
|:---|:---|:---|

## Motion Language

Durations, easings and the composed `--motion*` channels every transition reads.

| Token | Class | Value |
|:---|:---|:---|

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

## Pop Colors

Named accent literals. The `.green1`…`.green4`, `.orange1`…`.orange6`, and `.yellow1`…`.yellow4` ink classes read them.

| Token | Class | Value |
|:---|:---|:---|

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
