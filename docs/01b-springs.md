---
title: Springs
description: Explains the generated spring easing tokens in springs.css, and how to regenerate them.
id: springs
---

This document explains `springs.css`, which declares the `linear()` spring easings and their settle times. The file is generated — do not edit it by hand. Regenerate with `npm run gen:springs`, which is also the first step of `npm run tokens`.

Five presets ship, each as an easing and a settle time:

| Preset | Settle time | Typical use |
|:--|:--|:--|
| `--spring-gentle` / `--spring-gentle-ms` | 560ms | calm motion, view-transition groups |
| `--spring-snappy` / `--spring-snappy-ms` | 356ms | the default (`--spring` and `--spring-ms` point here) |
| `--spring-bouncy` / `--spring-bouncy-ms` | 690ms | playful motion |
| `--spring-stiff` / `--spring-stiff-ms` | 223ms | short, tight transitions |
| `--spring-slow` / `--spring-slow-ms` | 897ms | longer settles |

`--spring` and `--spring-ms` in [Configurations](./01-configurations.md) are the current spring. They default to snappy. Re-point them with a `.spring-*` class ([Motion and Animation](./09-motion-animation.md)) or with `data-motion="calm"` / `data-motion="playful"`. Durations should always multiply by `--motion-scale`, so reduced motion and `data-motion="off"` can silence them.

`springs.css` ships no classes — only these tokens.
