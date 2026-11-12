# Fractalstyler — Token Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts` from the
custom properties declared in a global scope in `src/lib/styles/*.css`.

Every `--space-*` step is a class family: if `--space-md` exists, so do
`.gap-md`, `.pad-md` and `.mar-md` (plus the `.px`/`.py`/`.pt` sides).
There is no second vocabulary to learn.


## Space Scale

Every step feeds the gap, pad and margin families.

| Token | Value |
|:---|:---|
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.50rem` |
| `--space-md` | `0.75rem` |
| `--space-bs` | `1.00rem` |
| `--space-lg` | `1.50rem` |
| `--space-xl` | `2.00rem` |
| `--space-2xl` | `3.00rem` |
| `--space-3xl` | `4.00rem` |

## Type Scale

Fixed sizes up to base, then fluid (clamped) sizes above it.

| Token | Value |
|:---|:---|
| `--text-static-md` | `0.80rem` |
| `--text-static-bs` | `0.95rem` |
| `--text-static-lg` | `1.12rem` |
| `--text-static-xl` | `1.31rem` |
| `--text-static-2xl` | `1.54rem` |
| `--text-static-3xl` | `1.80rem` |
| `--text-static-4xl` | `2.10rem` |
| `--text-static-5xl` | `2.45rem` |
| `--text-fluid-md` | `clamp(0.8333rem, 0.8061rem + 0.1212vw, 0.9rem)` |
| `--text-fluid-bs` | `clamp(1rem, 0.9489rem + 0.2273vw, 1rem)` |
| `--text-fluid-lg` | `clamp(1.2rem, 1.1156rem + 0.375vw, 1.4063rem)` |
| `--text-fluid-xl` | `clamp(1.44rem, 1.31rem + 0.5778vw, 1.7578rem)` |
| `--text-fluid-2xl` | `clamp(1.728rem, 1.536rem + 0.8532vw, 2.1973rem)` |
| `--text-fluid-3xl` | `clamp(2.0736rem, 1.7983rem + 1.2236vw, 2.7466rem)` |
| `--text-fluid-4xl` | `clamp(2.4883rem, 2.1018rem + 1.718vw, 3.4332rem)` |
| `--text-fluid-5xl` | `clamp(2.986rem, 2.4519rem + 2.3737vw, 4.2915rem)` |
| `--text-xs` | `0.67rem` |
| `--text-sm` | `0.75rem` |
| `--text-md` | `var(--text-static-md)` |
| `--text-bs` | `var(--text-static-bs)` |
| `--text-lg` | `var(--text-static-lg)` |
| `--text-xl` | `var(--text-static-xl)` |
| `--text-2xl` | `var(--text-static-2xl)` |
| `--text-3xl` | `var(--text-static-3xl)` |
| `--text-4xl` | `var(--text-static-4xl)` |
| `--text-5xl` | `var(--text-static-5xl)` |
| `--text-primary` | `oklch(0.18 var(--tint) var(--hue))` |
| `--text-secondary` | `oklch(0.42 var(--tint) var(--hue))` |
| `--text-muted` | `oklch(0.58 var(--tint) var(--hue))` |
| `--text-inverse` | `oklch(0.99 0 0)` |

## Radius

Six channels. Compositions read the tokens, never a literal radius.

| Token | Value |
|:---|:---|
| `--radius-xs` | `2px` |
| `--radius-sm` | `3px` |
| `--radius-md` | `6px` |
| `--radius-bs` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-full` | `999px` |

## Control Heights

Heights for inputs, selects and buttons.

| Token | Value |
|:---|:---|
| `--h-xs` | `12px` |
| `--h-sm` | `16px` |
| `--h-md` | `20px` |
| `--h-bs` | `27px` |
| `--h-lg` | `32px` |
| `--h-xl` | `40px` |
| `--h-2xl` | `48px` |
| `--h-3xl` | `64px` |

## Motion Language

Durations, easings and the composed channels every transition reads.

| Token | Value |
|:---|:---|
| `--motion-scale` | `1` |
| `--transin1` | `cubic-bezier(0.470, 0.000, 0.745, 0.715)` |
| `--transin2` | `cubic-bezier(0.550, 0.055, 0.675, 0.190)` |
| `--transin3` | `cubic-bezier(0.755, 0.050, 0.855, 0.060)` |
| `--transout1` | `cubic-bezier(0.390, 0.575, 0.565, 1.000)` |
| `--transout2` | `cubic-bezier(0.215, 0.610, 0.355, 1.000)` |
| `--transout3` | `cubic-bezier(0.230, 1.000, 0.320, 1.000)` |
| `--speed0` | `50ms` |
| `--speed1` | `90ms` |
| `--speed2` | `140ms` |
| `--speed3` | `220ms` |
| `--motionin1` | `var(--speed0) var(--transin1)` |
| `--motionout1` | `var(--speed1) var(--transout1)` |
| `--motionin2` | `var(--speed2) var(--transin2)` |
| `--motionout2` | `var(--speed2) var(--transout2)` |
| `--motionin3` | `var(--speed3) var(--transin3)` |
| `--motionout3` | `var(--speed3) var(--transout3)` |

## Colour Roles

Name the role, never the value. Values shown are the light default; `[data-mode='dark']` remaps them.

| Token | Value |
|:---|:---|
| `--white-fixed` | `oklch(1 0 0)` |
| `--black-fixed` | `oklch(0.210 0.006 285.9)` |
| `--bg` | `oklch(0.995 calc(var(--tint) * 0.3) var(--hue))` |
| `--bg-surface` | `oklch(0.975 calc(var(--tint) * 0.5) var(--hue))` |
| `--bg-panel` | `oklch(0.96 calc(var(--tint) * 0.6) var(--hue))` |
| `--bg-overlay` | `oklch(1 0 0)` |
| `--bg-button` | `oklch(0.2 var(--tint) var(--hue))` |
| `--bg-button-hover` | `oklch(0.29 var(--tint) var(--hue))` |
| `--bg-button-active` | `oklch(0.14 var(--tint) var(--hue))` |
| `--bg-button-secondary` | `oklch(0.93 calc(var(--tint) * 0.6) var(--hue))` |
| `--bg-button-secondary-hover` | `oklch(0.9 calc(var(--tint) * 0.6) var(--hue))` |
| `--bg-button-secondary-active` | `oklch(0.87 calc(var(--tint) * 0.6) var(--hue))` |
| `--bg-input` | `oklch(0.985 calc(var(--tint) * 0.4) var(--hue))` |
| `--state-hover` | `oklch(0 0 0 / 0.045)` |
| `--state-selected` | `oklch(0 0 0 / 0.08)` |
| `--border` | `oklch(0.91 calc(var(--tint) * 0.6) var(--hue))` |
| `--border-strong` | `oklch(0.82 calc(var(--tint) * 0.8) var(--hue))` |
| `--border-subtle` | `oklch(0.945 calc(var(--tint) * 0.5) var(--hue))` |
| `--theme-color` | `oklch(0.34 var(--chroma) var(--hue))` |
| `--theme-color-up` | `oklch(0.66 var(--chroma) var(--hue))` |
| `--theme-color-down` | `oklch(0.47 var(--chroma) var(--hue))` |
| `--success` | `oklch(0.65 0.200 138)` |
| `--success-hover` | `oklch(0.55 0.200 138)` |
| `--warning` | `oklch(0.85 0.180 92)` |
| `--warning-hover` | `oklch(0.80 0.180 92)` |
| `--danger` | `oklch(0.60 0.250 25)` |
| `--danger-hover` | `oklch(0.50 0.250 25)` |
| `--info` | `oklch(0.50 0.220 260)` |
| `--info-hover` | `oklch(0.40 0.220 260)` |
| `--ring` | `oklch(0.55 var(--chroma) var(--hue) / 0.4)` |
| `--success-00` | `oklch(0.98 0.070 138)` |
| `--success-25` | `oklch(0.82 0.150 138)` |
| `--success-50` | `oklch(0.65 0.200 138)` |
| `--success-75` | `oklch(0.45 0.200 138)` |
| `--success-100` | `oklch(0.25 0.200 138)` |
| `--warning-00` | `oklch(0.95 0.100 92)` |
| `--warning-25` | `oklch(0.90 0.140 92)` |
| `--warning-50` | `oklch(0.85 0.180 92)` |
| `--warning-75` | `oklch(0.70 0.180 92)` |
| `--warning-100` | `oklch(0.55 0.180 92)` |
| `--danger-00` | `oklch(0.95 0.150 25)` |
| `--danger-25` | `oklch(0.76 0.150 25)` |
| `--danger-50` | `oklch(0.60 0.250 25)` |
| `--danger-75` | `oklch(0.40 0.250 25)` |
| `--danger-100` | `oklch(0.20 0.250 25)` |
| `--info-00` | `oklch(0.95 0.050 260)` |
| `--info-25` | `oklch(0.70 0.150 260)` |
| `--info-50` | `oklch(0.50 0.220 260)` |
| `--info-75` | `oklch(0.35 0.220 260)` |
| `--info-100` | `oklch(0.20 0.120 260)` |

## Elevation

The shadow channels the `.shad-*` classes read.

| Token | Value |
|:---|:---|
| `--shadow-color` | `0 0 0` |
| `--shadow-rim` | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |
| `--shadow-xs` | `0 1px 2px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-sm` | `0 1px 2px rgb(var(--shadow-color) / 0.1), 0 2px 4px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-md` | `0 2px 4px rgb(var(--shadow-color) / 0.1), 0 8px 16px rgb(var(--shadow-color) / 0.2)` |
| `--shadow-bs` | `0 2px 4px rgb(var(--shadow-color) / 0.1), 0 6px 14px rgb(var(--shadow-color) / 0.2)` |
| `--shadow-lg` | `0 4px 8px rgb(var(--shadow-color) / 0.1), 0 12px 24px rgb(var(--shadow-color) / 0.2)` |
| `--shadow-xl` | `0 8px 16px rgb(var(--shadow-color) / 0.1), 0 20px 36px rgb(var(--shadow-color) / 0.2)` |
| `--shadow-2xl` | `0 12px 24px rgb(var(--shadow-color) / 0.1), 0 28px 48px rgb(var(--shadow-color) / 0.2)` |
| `--shadow-3xl` | `0 16px 32px rgb(var(--shadow-color) / 0.1), 0 36px 64px rgb(var(--shadow-color) / 0.2)` |

## Breakpoints

Reference values — CSS media queries cannot consume custom properties, so the bands are written as literals to match.

| Token | Value |
|:---|:---|
| `--bp-sm` | `769px` |
| `--bp-md` | `1025px` |
| `--bp-lg` | `1281px` |
| `--bp-xl` | `1441px` |

## Measure

The width (and max-height) ladder for panels, dialogs, popovers and the shell.

| Token | Value |
|:---|:---|
| `--measure-xs` | `14rem` |
| `--measure-sm` | `20rem` |
| `--measure-md` | `28rem` |
| `--measure-lg` | `36rem` |
| `--measure-xl` | `48rem` |
| `--measure-2xl` | `64rem` |
| `--measure-3xl` | `80rem` |
| `--measure-4xl` | `100rem` |

## Layout & Chrome

Font stacks plus the page geometry the shells read.

| Token | Value |
|:---|:---|
| `--prose-clamp` | `65ch` |
| `--content-clamp` | `var(--measure-4xl)` |
| `--app-inline` | `var(--space-lg)` |
| `--card-min` | `15rem` |
| `--content-aside` | `7.5rem` |
| `--sidebar-width` | `16rem` |
| `--sidebar-width-left` | `16rem` |
| `--sidebar-width-right` | `16rem` |
| `--sidebar-width-collapsed` | `3.5rem` |
| `--z-sticky` | `100` |
| `--z-raised` | `200` |
| `--z-modal` | `300` |
| `--z-toast` | `500` |
| `--z-100` | `100` |
| `--z-200` | `200` |
| `--z-300` | `300` |
| `--z-400` | `400` |
| `--z-500` | `500` |
| `--z-600` | `600` |
| `--z-700` | `700` |
| `--z-800` | `800` |
| `--z-900` | `900` |
| `--z-999` | `999` |
| `--font-sans` | `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| `--header-height` | `4rem` |
| `--footer-height` | `2rem` |
| `--fit-height` | `calc(var(--header-height) + var(--footer-height))` |
