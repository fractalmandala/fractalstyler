---
title: Custom
description: Explains the site-specific customizations in custom.css - logo motif, mascot with blink/bob/tilt and its WebGL variant.
id: 13
---

This document explains `custom.css`, the site-specific layer of the Fractalstyler site itself. Unlike the other style files it is not part of the generic system - it holds branding-specific styling you would replace with your own.

## Logo

- `.site-logomotif` - 48px tall, scales to 1.2 on hover with a `--transin2` ease
- `.logotype` - 28px tall wordmark
- `.project-circle` - 16px circle swatch with 24px radius

## Mascot

`.mascot` is an inline-block perspective stage for an SVG mascot; the parts animate via CSS variables an outer script (or pointer tracker) can drive:

- `.mascot-tilt` - rotates by `--mascot-rx` / `--mascot-ry` (3D tilt)
- `.mascot-pupil-l` / `.mascot-pupil-r` - pupils translate by `--mascot-plx/ply` / `--mascot-prx/pry` (parallax eyes)
- `.mascot-gloss` / `.mascot-shade` - light and shadow layers offset by `--mascot-gx/gy`
- `.mascot-overlay` / `.mascot-mask` / `.mascot-base` - positioning and masking plumbing

Behaviors:

- `.mascot-bobs` - the `.mascot-bob` layer bobs up and down on a 3.6s loop
- `.mascot-blinks` - the `.mascot-lid` layer blinks on a 5.2s loop

Both animations stop under `prefers-reduced-motion: reduce`, and tilt is reset to none.

## Mascot GL

`.mascotgl` is the WebGL-rendered variant: a canvas sized to 160% of the stage (130% with `.mascotgl-compact`), absolutely centered, faded in via `.mascotgl-ready`.

## Replacing this file

When using Fractalstyler in your own project, treat `custom.css` as the example slot for your branding layer - logotype treatment, mascot or illustration rig, and any one-off site decoration. Keep it separate from the token-driven files so upgrades to the system don't clobber your customizations.
