---
title: Motion and Animation
description: Explains the easing, speed and composite motion tokens, view-transition defaults, and animation classes in motion-animation.css.
id: 9
---

This document explains `motion-animation.css`, which defines the motion vocabulary every transition in Fractalstyler consumes, plus the built-in keyframe animations.

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

## Animations

Four keyframes ship with the system, exposed as classes:

```css
.anim-spin { animation: spin 1s linear infinite; }
.anim-pulse { animation: pulse 2s ease-in-out infinite; }
.anim-fade-in { animation: fade-in var(--speed3) var(--transout3); }
.anim-fade-out { animation: fade-out var(--speed3) var(--transout3); }
```

- `.anim-spin` - continuous rotation (loading indicators, icons)
- `.anim-pulse` - gentle opacity pulsing (live/recording indicators)
- `.anim-fade-in` / `.anim-fade-out` - one-shot fades at `--speed3` with the `--transout3` easing

`.anim-spin` and `.anim-pulse` stop automatically under `prefers-reduced-motion: reduce`.

The keyframes themselves (`spin`, `pulse`, `fade-in`, `fade-out`) are reusable in your own CSS. There is also a `vibrating` keyframe used by `components.css` for feedback pops.

## View Transitions

View-transition snapshots are neutralized by default (no animation, normal blend mode), and `html.mode-wipe` keeps them off during a color-mode switch. Add `.mode-wipe` to `<html>` while toggling `data-mode` to avoid the default cross-fade flash on theme change.
