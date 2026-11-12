---
title: Motion and Animation
description: Explains the easing, speed, spring and enter tokens, view-transition classes, and animation classes in motion-animation.css.
id: 9
---

This document explains `motion-animation.css`, which defines the motion vocabulary every transition in Fractalstyler consumes, plus the built-in keyframe animations, springs, enter/exit and view transitions. Spring easings themselves are declared in [Springs](./01b-springs.md); `--motion-scale`, `--stagger` and the registered motion channels are declared in [Configurations](./01-configurations.md).

## Tokens

Three "in" easings (accelerating, easeIn family) and three "out" easings (decelerating, easeOut family):

```css
--transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715);
--transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190);
--transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060);
--transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000);
--transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000);
--transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000);
```

Four speeds, from instant feedback to noticeable:

```css
--speed0: 50ms;
--speed1: 90ms;
--speed2: 140ms;
--speed3: 220ms;
```

The composite tokens pair them, and are what the rest of the system uses (`transition: background var(--motionin1)` etc.):

```css
--motionin1: var(--speed0) var(--transin1);
--motionout1: var(--speed1) var(--transout1);
--motionin2: var(--speed2) var(--transin2);
--motionout2: var(--speed2) var(--transout2);
--motionin3: var(--speed3) var(--transin3);
--motionout3: var(--speed3) var(--transout3);
```

`--motionout2` is the common choice for color/feedback transitions (see `.bg-*:hover` in [Colors and Themes](./08-colors-themes.md)); `--motionin1` for interactive elements like buttons and inputs in [Components](./10-components.md).

Spring-timed motion multiplies its duration by `--motion-scale`. Under `prefers-reduced-motion: reduce`, and with `data-motion="off"`, that scale is 0.

## Springs

`.spring` is a spring-timed transition on the common animating properties (translate, scale, rotate, transform, opacity, colours, box-shadow, filter, width, height, and grid-template rows/columns). Duration is `calc(var(--spring-ms) * var(--motion-scale))`, easing is `var(--spring)`.

`.spring-gentle`, `.spring-snappy`, `.spring-bouncy`, `.spring-stiff` and `.spring-slow` re-point `--spring` and `--spring-ms` at that preset. `data-motion="calm"` / `"playful"` do the same at the document (or subtree) level — see [Configurations](./01-configurations.md).

## Motion channels

JavaScript writes the registered custom properties; these classes own the CSS properties that read them:

- `.motion` — `translate` from `--mx`/`--my` (CSS pixels), `scale` from `--ms`, `rotate` from `--mr` (degrees), `opacity` from `--mo`
- `.tilt` — a perspective rotateX/rotateY from `--rx`/`--ry` (degrees)

## Enter, pop and reveal

For anything that opens — a popover, a dialog, or an element toggling `.open`. `.enter-*` sets where it comes from, as tokens (`--enter-scale`, `--enter-x`, `--enter-y`, `--enter-blur`). `.pop` consumes those tokens: it starts hidden (opacity 0, scaled/translated/blurred) and springs in when `:popover-open`, `[open]`, or `.open` is on. `@starting-style` keeps the first-open animation.

| Class | What it sets |
|:--|:--|
| `.enter-scale` | scale 0.96, no travel |
| `.enter-fade` | scale 1, no travel (opacity only) |
| `.enter-up` / `.enter-down` / `.enter-left` / `.enter-right` | a `--space-md` travel on that axis |
| `.enter-blur` | `--enter-blur: 0.5rem` (combine with another `.enter-*`) |
| `.enter-edge-top` / `.enter-edge-right` / `.enter-edge-bottom` / `.enter-edge-left` | a 100% travel, for edge-docked sheets |

`.reveal` is the in-flow equivalent: it starts hidden and an in-view helper adds `.in` to show it. Both `.anim-in` and `.reveal` stagger with `calc(var(--i) * var(--stagger) * var(--motion-scale))`.

## Hover and press

- `.lift` — on hover, the surface rises 2px and takes `--shadow-lg`, spring-timed
- `.press` — on `:active`, the surface scales to 0.97, spring-timed

These are for any surface. They are distinct from the built-in `button` / `.button` press scale (0.98, opted out with `.no-scaling`).

## Animations

Four original keyframes, plus the enter and indicator set, exposed as classes:

```css
.anim-spin { animation: spin 1s linear infinite; }
.anim-pulse { animation: pulse 2s ease-in-out infinite; }
.anim-fade-in { animation: fade-in var(--speed3) var(--transout3); }
.anim-fade-out { animation: fade-out var(--speed3) var(--transout3); }
```

- `.anim-spin` - continuous rotation (loading indicators, icons)
- `.anim-pulse` - gentle opacity pulsing (live/recording indicators)
- `.anim-fade-in` / `.anim-fade-out` - one-shot fades at `--speed3` with the `--transout3` easing
- `.anim-in` - a keyframed entrance that reads the same `.enter-*` tokens, delayed by `--i` × `--stagger`
- `.anim-ping` - a scale-out pulse
- `.anim-blink` - a stepped opacity blink
- `.anim-shimmer` - a moving highlight, for skeletons, using `--state-hover`
- `.anim-wave` / `.anim-stretch` - looping scale pulses, staggered by `--i` (for a row of dots or bars)
- `.anim-slide` - a bar that travels across its box

`.anim-spin`, `.anim-pulse`, and the looping set (`.anim-in`, `.anim-ping`, `.anim-blink`, `.anim-shimmer`, `.anim-wave`, `.anim-stretch`, `.anim-slide`) stop automatically under `prefers-reduced-motion: reduce`.

The keyframes themselves (`spin`, `pulse`, `fade-in`, `fade-out`, and the others in this file) are reusable in your own CSS. There is also a `vibrating` keyframe used by `components.css` for feedback pops.

## View Transitions

View-transition snapshots are neutralized by default (no animation, normal blend mode), and `html.mode-wipe` keeps them off during a color-mode switch. Add `.mode-wipe` to `<html>` while toggling `data-mode` to avoid the default cross-fade flash on theme change.

A helper tags `<html>` with a `.vt-*` class to pick a root transition. Durations multiply by `--motion-scale`.

- `.vt-name` — sets `view-transition-name: var(--vt-name)` on an element
- `html.vt-fade` — old fades out, new fades in
- `html.vt-slide` — old exits left, new enters from the right
- `html.vt-slide-back` — the reverse
- `html.vt-scale` — old scales down, new scales in
- `html.vt-reveal` — new is clipped open as a circle at `--vt-x` / `--vt-y` with radius `--vt-r`

Groups use the gentle spring for their duration and easing.
