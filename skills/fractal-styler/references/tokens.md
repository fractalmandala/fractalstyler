# Fractalstyler2 — Token Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.js`
from `_00_tokens.sass`.

Every token is also a class. If `--space-md` exists, so do `.gap-md`,
`.pad-md` and `.marg-md`. There is no second vocabulary to learn.

## Fluid Type Scale

Interpolates smoothly between 360px and 1240px. No breakpoints.

| Token | Class | Value |
|:---|:---|:---|
| `--text-xs` | `.text-xs` | `0.67rem` |
| `--text-sm` | `.text-sm` | `0.75rem` |
| `--text-md` | `.text-md` | `0.875rem` |
| `--text-lg` | `.text-lg` | `1.125rem` |
| `--text-xl` | `.text-xl` | `1.25rem` |
| `--text-2xl` | `.text-2xl` | `1.5rem` |
| `--text-3xl` | `.text-3xl` | `1.875rem` |
| `--text-4xl` | `.text-4xl` | `2.25rem` |

## Fluid Space Scale

Gaps and margins scale by `--gap-scale`; paddings by `--pad-scale`.
The two move at different rates under the layout preset.

| Token | Class | Value |
|:---|:---|:---|
| `--space-xs` | `.gap-xs` `.pad-xs` | `var(--unit-space)` |
| `--space-sm` | `.gap-sm` `.pad-sm` | `calc(var(--unit-space) * 2)` |
| `--space-md` | `.gap-md` `.pad-md` | `calc(var(--unit-space) * 3)` |
| `--space-bs` | `.gap-bs` `.pad-bs` | `calc(var(--unit-space) * 4)` |
| `--space-lg` | `.gap-lg` `.pad-lg` | `calc(var(--unit-space) * 6)` |
| `--space-xl` | `.gap-xl` `.pad-xl` | `calc(var(--unit-space) * 8)` |
| `--space-2xl` | `.gap-2xl` `.pad-2xl` | `calc(var(--unit-space) * 12)` |
| `--space-3xl` | `.gap-3xl` `.pad-3xl` | `calc(var(--unit-space) * 16)` |

## Radius

The `-sm/-md/-lg` channels are what compositions read; shape presets remap them.

| Token | Class | Value |
|:---|:---|:---|
| `--radius-xs` | — | `2px` |
| `--radius-sm` | — | `4px` |
| `--radius-md` | — | `8px` |
| `--radius-bs` | — | `16px` |
| `--radius-lg` | — | `32px` |
| `--radius-full` | — | `9999px` |

## Colour Roles

Name the role, never the hex. Values shown are the light default;
`[data-mode="dark"]` and the colour presets remap them.

| Token | Class | Value |
|:---|:---|:---|
| `--bg` | — | `#ffffff` |
| `--bg-surface` | — | `#FAFAFA` |
| `--bg-panel` | — | `#FBFBF9` |
| `--bg-sunken` | — | `#F7F6F0` |
| `--bg-raised` | — | `#F4F4F5` |
| `--bg-extra` | — | `#F7F8F9` |
| `--bg-input` | — | `#FAF7F7` |
| `--bg-button` | — | `#CED8D3` |
| `--text-primary` | — | `#262627` |
| `--text-secondary` | `.text-secondary` | `#777777` |
| `--text-muted` | `.text-muted` | `#a3a4a7` |
| `--text-inverse` | `.text-inverse` | `#ffffff` |
| `--state-surface` | — | `#F2EFE9` |
| `--state-hover` | — | `#ECE7DF` |
| `--state-selected` | — | `#E4DFD5` |
| `--border` | — | `#d8d8d8` |
| `--border-subtle` | — | `#eceaea` |
| `--border-strong` | — | `#cfcfcf` |
| `--theme-color` | — | `#2F9E44` |
| `--theme-color-alt` | — | `#2d9206` |
| `--success` | — | `#10B981` |
| `--success-hover` | — | `#059669` |
| `--warning` | — | `#F59E0B` |
| `--warning-hover` | — | `#D97706` |
| `--danger` | — | `#EF4444` |
| `--danger-hover` | — | `#DC2626` |
| `--info` | — | `#3B82F6` |
| `--info-hover` | — | `#2563EB` |
| `--ring` | — | `rgba(0, 127, 78, 0.35)` |

## Preset Axes

Stamped as attributes. An absent attribute means that axis's default.

| Attribute | Values | Default |
|:---|:---|:---|
| `data-layout` | tight · comfortable · sprawling | comfortable |
| `data-shape` | round · curved · pro · sharp | curved |
| `data-color` | clean · general · vibrant | general |
| `data-motion` | reduced · active · heavy · springy | active |
| `data-mode` | light · dark | follows prefers-color-scheme |
