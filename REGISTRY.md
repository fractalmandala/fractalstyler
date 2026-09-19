# Fractalstyler2 — Complete Class & Token Registry

Status: **LOCKED & CANONICAL**  
Updated: **2026-09-19**  
Architecture: **L0 (Tokens) $\rightarrow$ L1 (Dimensions) $\rightarrow$ L2 (Containers) $\rightarrow$ L3 (Layouts) $\rightarrow$ L4 (Shells) $\rightarrow$ L5 (Visuals & Interactions)**

This document is the **single, definitive, grepable master registry** for all CSS classes, tokens, modifiers, and canonical markup structures in `fractalstyler2`.

---

## Quick Grep Cheatsheet

Format: `CLASS_NAME | LAYER | CSS PROPERTY / BEHAVIOR | FILE SOURCE | EXAMPLE`

```
.gap-*                   | L1 | gap: calc(var(--space-*) * var(--gap-scale)) | {N}px       | _02_dimensions.sass    | <div class="gap-*">
.rgap-*                  | L1 | row-gap: calc(var(--space-*) * var(--gap-scale)) | {N}px   | _02_dimensions.sass    | <div class="rgap-*">
.cgap-*                  | L1 | column-gap: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="cgap-*">
.pad-*                   | L1 | padding: calc(var(--space-*) * var(--pad-scale)) | {N}px   | _02_dimensions.sass    | <div class="pad-*">
.pad-x-*                 | L1 | padding-inline: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-x-*">
.pad-y-*                 | L1 | padding-block: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-y-*">
.pad-top-*               | L1 | padding-top: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-top-*">
.pad-right-*             | L1 | padding-right: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-right-*">
.pad-bottom-*            | L1 | padding-bottom: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-bottom-*">
.pad-left-*              | L1 | padding-left: calc(var(--space-*) * var(--pad-scale)) | {N}px | _02_dimensions.sass    | <div class="pad-left-*">
.marg-*                  | L1 | margin: calc(var(--space-*) * var(--gap-scale)) | {N}px    | _02_dimensions.sass    | <div class="marg-*">
.marg--*                 | L1 | margin: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px | _02_dimensions.sass    | <div class="marg--*">
.marg-x-*                | L1 | margin-inline: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-x-*">
.marg-y-*                | L1 | margin-block: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-y-*">
.marg-top-*              | L1 | margin-top: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-top-*">
.marg-top--*             | L1 | margin-top: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px | _02_dimensions.sass    | <div class="marg-top--*">
.marg-bottom-*           | L1 | margin-bottom: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-bottom-*">
.marg-bottom--*          | L1 | margin-bottom: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px | _02_dimensions.sass    | <div class="marg-bottom--*">
.marg-left-*             | L1 | margin-left: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-left-*">
.marg-right-*            | L1 | margin-right: calc(var(--space-*) * var(--gap-scale)) | {N}px | _02_dimensions.sass    | <div class="marg-right-*">
.radius-*                | L1 | border-radius: {N}px                                       | _02_dimensions.sass    | <div class="radius-*">
.radius-full             | L1 | border-radius: var(--radius-full)                          | _02_dimensions.sass    | <div class="radius-full">
.w-*                     | L1 | width: {N}px                                               | _02_dimensions.sass    | <div class="w-*">
.h-*                     | L1 | height: {N}px                                              | _02_dimensions.sass    | <div class="h-*">
.square-*                | L1 | width: {N}px; height: {N}px                                | _02_dimensions.sass    | <div class="square-*">
.min0                    | L1 | min-width: 0; min-height: 0                                | _02_dimensions.sass    | <div class="min0">
.wfull                   | L1 | width: 100%                                                | _02_dimensions.sass    | <div class="wfull">
.hfull                   | L1 | height: 100%                                               | _02_dimensions.sass    | <div class="hfull">
.full                    | L1 | width: 100%; height: 100%                                  | _02_dimensions.sass    | <div class="full">
.hfull-vh                | L1 | min-height: 100vh                                          | _02_dimensions.sass    | <div class="hfull-vh">
.hfull-vh-fitted         | L1 | min-height: calc(100vh - var(--header-height) - var(--footer-height)) | _02_dimensions.sass    | <div class="hfull-vh-fitted">
.bdr                     | L0 | border: 1px solid red                                      | _01_base.sass          | <div class="bdr">
.frame-16-9              | L3 | aspect-ratio: 16 / 9                                       | _04_layouts.sass       | <div class="frame-16-9">
.frame-9-16              | L3 | aspect-ratio: 9 / 16                                       | _04_layouts.sass       | <div class="frame-9-16">
.frame-4-3               | L3 | aspect-ratio: 4 / 3                                        | _04_layouts.sass       | <div class="frame-4-3">
.frame-3-4               | L3 | aspect-ratio: 3 / 4                                        | _04_layouts.sass       | <div class="frame-3-4">
.frame-3-2               | L3 | aspect-ratio: 3 / 2                                        | _04_layouts.sass       | <div class="frame-3-2">
.frame-2-3               | L3 | aspect-ratio: 2 / 3                                        | _04_layouts.sass       | <div class="frame-2-3">
.frame-1-1               | L3 | aspect-ratio: 1 / 1                                        | _04_layouts.sass       | <div class="frame-1-1">
.radius-xs               | L1 | .radius-xs component / container                           | _02_dimensions.sass    | <div class="radius-xs">
.radius-sm               | L1 | .radius-sm component / container                           | _02_dimensions.sass    | <div class="radius-sm">
.radius-md               | L1 | .radius-md component / container                           | _02_dimensions.sass    | <div class="radius-md">
.radius-bs               | L1 | .radius-bs component / container                           | _02_dimensions.sass    | <div class="radius-bs">
.radius-lg               | L1 | .radius-lg component / container                           | _02_dimensions.sass    | <div class="radius-lg">
.minw0                   | L1 | .minw0 component / container                               | _02_dimensions.sass    | <div class="minw0">
.minh0                   | L1 | .minh0 component / container                               | _02_dimensions.sass    | <div class="minh0">
.h-sm                    | L1 | .h-sm component / container                                | _02_dimensions.sass    | <div class="h-sm">
.h-md                    | L1 | .h-md component / container                                | _02_dimensions.sass    | <div class="h-md">
.h-bs                    | L1 | .h-bs component / container                                | _02_dimensions.sass    | <div class="h-bs">
.h-lg                    | L1 | .h-lg component / container                                | _02_dimensions.sass    | <div class="h-lg">
.box                     | L2 | .box component / container                                 | _03_containers.sass    | <div class="box">
.box.xcenter             | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.xcenter">
.box.xleft               | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.xleft">
.box.xright              | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.xright">
.box.ycenter             | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.ycenter">
.box.ytop                | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.ytop">
.box.ybot                | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.ybot">
.box.ybetween            | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.ybetween">
.box.yevenly             | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.yevenly">
.box.yaround             | L2 | Modifier for .box                                          | _03_containers.sass    | <div class="box.yaround">
.row                     | L2 | .row component / container                                 | _03_containers.sass    | <div class="row">
.row.xleft               | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xleft">
.row.xcenter             | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xcenter">
.row.xright              | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xright">
.row.xbetween            | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xbetween">
.row.xevenly             | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xevenly">
.row.xaround             | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.xaround">
.row.ycenter             | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.ycenter">
.row.ytop                | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.ytop">
.row.ybot                | L2 | Modifier for .row                                          | _03_containers.sass    | <div class="row.ybot">
.grid                    | L2 | .grid component / container                                | _03_containers.sass    | <div class="grid">
.grid.center             | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.center">
.grid.xcenter            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xcenter">
.grid.xleft              | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xleft">
.grid.xright             | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xright">
.grid.xstretch           | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xstretch">
.grid.ycenter            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.ycenter">
.grid.ytop               | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.ytop">
.grid.ybot               | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.ybot">
.grid.ystretch           | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.ystretch">
.grid.xbetween           | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xbetween">
.grid.xevenly            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xevenly">
.grid.xaround            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.xaround">
.grid.ybetween           | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.ybetween">
.grid.yevenly            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.yevenly">
.grid.yaround            | L2 | Modifier for .grid                                         | _03_containers.sass    | <div class="grid.yaround">
.wrap                    | L2 | .wrap component / container                                | _03_containers.sass    | <div class="wrap">
.grow                    | L2 | .grow component / container                                | _03_containers.sass    | <div class="grow">
.shrink-0                | L2 | .shrink-0 component / container                            | _03_containers.sass    | <div class="shrink-0">
.relative                | L2 | .relative component / container                            | _03_containers.sass    | <div class="relative">
.absolute                | L2 | .absolute component / container                            | _03_containers.sass    | <div class="absolute">
.fixed                   | L2 | .fixed component / container                               | _03_containers.sass    | <div class="fixed">
.sticky                  | L2 | .sticky component / container                              | _03_containers.sass    | <div class="sticky">
.scroll-y                | L2 | Vertical scroll inside a bounded height; needs an .h-* or a constraining flex parent | _03_containers.sass    | <div class="scroll-y">
.scroll-x                | L2 | Horizontal scroll inside a bounded width; .reel adds snap points | _03_containers.sass    | <div class="scroll-x">
.grid-1                  | L3 | .grid-1 component / container                              | _04_layouts.sass       | <div class="grid-1">
.grid-2                  | L3 | .grid-2 component / container                              | _04_layouts.sass       | <div class="grid-2">
.grid-3                  | L3 | .grid-3 component / container                              | _04_layouts.sass       | <div class="grid-3">
.grid-4                  | L3 | .grid-4 component / container                              | _04_layouts.sass       | <div class="grid-4">
.grid-6                  | L3 | .grid-6 component / container                              | _04_layouts.sass       | <div class="grid-6">
.card-grid               | L3 | .card-grid component / container                           | _04_layouts.sass       | <div class="card-grid">
.prose                   | L3 | .prose component / container                               | _04_layouts.sass       | <div class="prose">
.reel                    | L3 | .reel component / container                                | _04_layouts.sass       | <div class="reel">
.app-shell               | L4 | .app-shell component / container                           | _05_shells.sass        | <div class="app-shell">
.app-header              | L4 | .app-header component / container                          | _05_shells.sass        | <div class="app-header">
.app-main                | L4 | .app-main component / container                            | _05_shells.sass        | <div class="app-main">
.main-section            | L4 | .main-section component / container                        | _05_shells.sass        | <div class="main-section">
.sidebar-left            | L4 | ,                                                          | _05_shells.sass        | <div class="sidebar-left">
.sidebar-right           | L4 | .sidebar-right component / container                       | _05_shells.sass        | <div class="sidebar-right">
.app-footer              | L4 | .app-footer component / container                          | _05_shells.sass        | <div class="app-footer">
.bg                      | L5 | .bg component / container                                  | _06_visuals.sass       | <div class="bg">
.surface                 | L5 | .surface component / container                             | _06_visuals.sass       | <div class="surface">
.panel                   | L5 | .panel component / container                               | _06_visuals.sass       | <div class="panel">
.sunken                  | L5 | .sunken component / container                              | _06_visuals.sass       | <div class="sunken">
.raised                  | L5 | .raised component / container                              | _06_visuals.sass       | <div class="raised">
.extra                   | L5 | .extra component / container                               | _06_visuals.sass       | <div class="extra">
.text-primary            | L5 | .text-primary component / container                        | _06_visuals.sass       | <div class="text-primary">
.text-secondary          | L5 | .text-secondary component / container                      | _06_visuals.sass       | <div class="text-secondary">
.text-muted              | L5 | .text-muted component / container                          | _06_visuals.sass       | <div class="text-muted">
.text-inverse            | L5 | .text-inverse component / container                        | _06_visuals.sass       | <div class="text-inverse">
.text-white              | L5 | .text-white component / container                          | _06_visuals.sass       | <div class="text-white">
.text-black              | L5 | .text-black component / container                          | _06_visuals.sass       | <div class="text-black">
.text-theme              | L5 | .text-theme component / container                          | _06_visuals.sass       | <div class="text-theme">
.text-success            | L5 | .text-success component / container                        | _06_visuals.sass       | <div class="text-success">
.text-warning            | L5 | .text-warning component / container                        | _06_visuals.sass       | <div class="text-warning">
.text-danger             | L5 | .text-danger component / container                         | _06_visuals.sass       | <div class="text-danger">
.text-info               | L5 | .text-info component / container                           | _06_visuals.sass       | <div class="text-info">
.bg-success              | L5 | .bg-success component / container                          | _06_visuals.sass       | <div class="bg-success">
.bg-warning              | L5 | .bg-warning component / container                          | _06_visuals.sass       | <div class="bg-warning">
.bg-danger               | L5 | .bg-danger component / container                           | _06_visuals.sass       | <div class="bg-danger">
.bg-info                 | L5 | .bg-info component / container                             | _06_visuals.sass       | <div class="bg-info">
.border                  | L5 | .border component / container                              | _06_visuals.sass       | <div class="border">
.border-subtle           | L5 | .border-subtle component / container                       | _06_visuals.sass       | <div class="border-subtle">
.border-strong           | L5 | .border-strong component / container                       | _06_visuals.sass       | <div class="border-strong">
.bt                      | L5 | .bt component / container                                  | _06_visuals.sass       | <div class="bt">
.br                      | L5 | .br component / container                                  | _06_visuals.sass       | <div class="br">
.bb                      | L5 | .bb component / container                                  | _06_visuals.sass       | <div class="bb">
.bl                      | L5 | .bl component / container                                  | _06_visuals.sass       | <div class="bl">
.bt-str                  | L5 | .bt-str component / container                              | _06_visuals.sass       | <div class="bt-str">
.br-str                  | L5 | .br-str component / container                              | _06_visuals.sass       | <div class="br-str">
.bb-str                  | L5 | .bb-str component / container                              | _06_visuals.sass       | <div class="bb-str">
.bl-str                  | L5 | .bl-str component / container                              | _06_visuals.sass       | <div class="bl-str">
.bt-sub                  | L5 | .bt-sub component / container                              | _06_visuals.sass       | <div class="bt-sub">
.br-sub                  | L5 | .br-sub component / container                              | _06_visuals.sass       | <div class="br-sub">
.bb-sub                  | L5 | .bb-sub component / container                              | _06_visuals.sass       | <div class="bb-sub">
.bl-sub                  | L5 | .bl-sub component / container                              | _06_visuals.sass       | <div class="bl-sub">
.text-xs                 | L5 | .text-xs component / container                             | _06_visuals.sass       | <div class="text-xs">
.text-sm                 | L5 | .text-sm component / container                             | _06_visuals.sass       | <div class="text-sm">
.text-md                 | L5 | .text-md component / container                             | _06_visuals.sass       | <div class="text-md">
.text-bs                 | L5 | .text-bs component / container                             | _06_visuals.sass       | <div class="text-bs">
.text-lg                 | L5 | .text-lg component / container                             | _06_visuals.sass       | <div class="text-lg">
.text-xl                 | L5 | .text-xl component / container                             | _06_visuals.sass       | <div class="text-xl">
.text-2xl                | L5 | .text-2xl component / container                            | _06_visuals.sass       | <div class="text-2xl">
.text-3xl                | L5 | .text-3xl component / container                            | _06_visuals.sass       | <div class="text-3xl">
.text-4xl                | L5 | .text-4xl component / container                            | _06_visuals.sass       | <div class="text-4xl">
.text-5xl                | L5 | .text-5xl component / container                            | _06_visuals.sass       | <div class="text-5xl">
.ls-tight-bs             | L5 | .ls-tight-bs component / container                         | _06_visuals.sass       | <div class="ls-tight-bs">
.ls-tight-lg             | L5 | .ls-tight-lg component / container                         | _06_visuals.sass       | <div class="ls-tight-lg">
.ls-tight-xl             | L5 | .ls-tight-xl component / container                         | _06_visuals.sass       | <div class="ls-tight-xl">
.ls-wide-bs              | L5 | .ls-wide-bs component / container                          | _06_visuals.sass       | <div class="ls-wide-bs">
.ls-wide-lg              | L5 | .ls-wide-lg component / container                          | _06_visuals.sass       | <div class="ls-wide-lg">
.ls-wide-xl              | L5 | .ls-wide-xl component / container                          | _06_visuals.sass       | <div class="ls-wide-xl">
.weight-300              | L5 | .weight-300 component / container                          | _06_visuals.sass       | <div class="weight-300">
.weight-400              | L5 | .weight-400 component / container                          | _06_visuals.sass       | <div class="weight-400">
.weight-500              | L5 | .weight-500 component / container                          | _06_visuals.sass       | <div class="weight-500">
.weight-600              | L5 | .weight-600 component / container                          | _06_visuals.sass       | <div class="weight-600">
.weight-700              | L5 | .weight-700 component / container                          | _06_visuals.sass       | <div class="weight-700">
.weight-800              | L5 | .weight-800 component / container                          | _06_visuals.sass       | <div class="weight-800">
.mono                    | L5 | .mono component / container                                | _06_visuals.sass       | <div class="mono">
.sans                    | L5 | .sans component / container                                | _06_visuals.sass       | <div class="sans">
.tt-u                    | L5 | .tt-u component / container                                | _06_visuals.sass       | <div class="tt-u">
.tt-c                    | L5 | .tt-c component / container                                | _06_visuals.sass       | <div class="tt-c">
.ta-c                    | L5 | .ta-c component / container                                | _06_visuals.sass       | <div class="ta-c">
.ta-l                    | L5 | .ta-l component / container                                | _06_visuals.sass       | <div class="ta-l">
.truncate                | L5 | .truncate component / container                            | _06_visuals.sass       | <div class="truncate">
.hide-mobile             | L5 | .hide-mobile component / container                         | _06_visuals.sass       | <div class="hide-mobile">
.hide-desktop            | L5 | .hide-desktop component / container                        | _06_visuals.sass       | <div class="hide-desktop">
.shadow-sm               | L5 | .shadow-sm component / container                           | _06_visuals.sass       | <div class="shadow-sm">
.shadow-md               | L5 | .shadow-md component / container                           | _06_visuals.sass       | <div class="shadow-md">
.shadow-bs               | L5 | .shadow-bs component / container                           | _06_visuals.sass       | <div class="shadow-bs">
.input                   | L5 | .input component / container                               | _07_interactions.sass  | <div class="input">
.input.small             | L5 | Modifier for .input                                        | _07_interactions.sass  | <div class="input.small">
.select                  | L5 | .select component / container                              | _07_interactions.sass  | <div class="select">
.select.small            | L5 | Modifier for .select                                       | _07_interactions.sass  | <div class="select.small">
.link                    | L5 | .link component / container                                | _07_interactions.sass  | <div class="link">
.link-plain              | L5 | .link-plain component / container                          | _07_interactions.sass  | <div class="link-plain">
.link-parent             | L5 | .link-parent component / container                         | _07_interactions.sass  | <div class="link-parent">
.link-parent.primary     | L5 | Modifier for .link-parent                                  | _07_interactions.sass  | <div class="link-parent.primary">
.link-parent.ghost       | L5 | Modifier for .link-parent                                  | _07_interactions.sass  | <div class="link-parent.ghost">
.link-parent.is-icon     | L5 | Modifier for .link-parent                                  | _07_interactions.sass  | <div class="link-parent.is-icon">
.link-parent.outline     | L5 | Modifier for .link-parent                                  | _07_interactions.sass  | <div class="link-parent.outline">
.link-parent.small       | L5 | Modifier for .link-parent                                  | _07_interactions.sass  | <div class="link-parent.small">
```

---

## Semantic Token Variables

```css
:root {
  --white-fixed: #FFFFFF;
  --black-fixed: #171717;
  --bg: #ffffff;
  --bg-surface: #FAFAFA;
  --bg-panel: #FBFBF9;
  --bg-sunken: #F7F6F0;
  --bg-raised: #F4F4F5;
  --bg-extra: #F7F8F9;
  --bg-input: #FAF7F7;
  --bg-button: #CED8D3;
  --text-primary: #262627;
  --text-secondary: #777777;
  --text-muted: #a3a4a7;
  --text-inverse: #ffffff;
  --state-surface: #F2EFE9;
  --state-hover: #ECE7DF;
  --state-selected: #E4DFD5;
  --border: #d8d8d8;
  --border-subtle: #eceaea;
  --border-strong: #cfcfcf;
  --theme-color: #2F9E44;
  --theme-color-alt: #2d9206;
  --success: #10B981;
  --success-hover: #059669;
  --warning: #F59E0B;
  --warning-hover: #D97706;
  --danger: #EF4444;
  --danger-hover: #DC2626;
  --info: #3B82F6;
  --info-hover: #2563EB;
  --ring: rgba(0, 127, 78, 0.35);
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-bs: 0 12px 32px rgba(15, 23, 42, 0.12);
  --font-sans: system-ui, sans-serif;
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  --text-xs: 0.67rem;
  --text-sm: 0.75rem;
  --text-md: 0.875rem;
  --text-bs: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 2.75rem;
  --unit-space: 0.25rem;
  --space-xs: var(--unit-space);
  --space-sm: calc(var(--unit-space) * 2);
  --space-md: calc(var(--unit-space) * 3);
  --space-bs: calc(var(--unit-space) * 4);
  --space-lg: calc(var(--unit-space) * 6);
  --space-xl: calc(var(--unit-space) * 8);
  --space-2xl: calc(var(--unit-space) * 12);
  --space-3xl: calc(var(--unit-space) * 16);
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-bs: 16px;
  --radius-lg: 32px;
  --radius-full: 9999px;
  --control-h-sm: 21px;
  --control-h-bs: 32px;
  --control-h-lg: 38px;
  --avatar-size: 32px;
  --switch-w: 40px;
  --switch-h: 22px;
  --switch-thumb: 16px;
  --transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715);
  --transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  --transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  --transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000);
  --transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  --transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000);
  --speed1: 90ms;
  --speed2: 140ms;
  --speed3: 220ms;
  --motionin1: var(--speed1) var(--transin1);
  --motionout1: var(--speed1) var(--transout1);
  --motionin2: var(--speed2) var(--transin2);
  --motionout2: var(--speed2) var(--transout2);
  --motionin3: var(--speed3) var(--transin3);
  --motionout3: var(--speed3) var(--transout3);
  --header-height: 48px;
  --footer-height: 32px;
  --fit-height: calc(var(--header-height) + var(--footer-height));
  --prose-clamp: 65ch;
  --content-clamp: 1280px;
  --app-inline: var(--space-lg);
  --card-min: 240px;
  --height-sm: 16px;
  --height-md: 20px;
  --height-bs: 24px;
  --height-lg: 32px;
  --sidebar-width: 280px;
  --sidebar-width-left: 280px;
  --sidebar-width-right: 280px;
  --z-sticky: 100;
  --z-raised: 200;
  --z-modal: 300;
}
```
