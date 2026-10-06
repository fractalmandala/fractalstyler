# Fractalstyler2 — Complete Class & Token Registry

Status: **LOCKED & CANONICAL**  
Updated: **2026-10-06**  
Architecture: **L0 (Tokens) $\rightarrow$ L1 (Dimensions) $\rightarrow$ L2 (Containers) $\rightarrow$ L3 (Layouts) $\rightarrow$ L4 (Shells) $\rightarrow$ L5 (Visuals & Interactions)**

This document is the **single, definitive, grepable master registry** for all CSS classes, tokens, modifiers, and canonical markup structures in `fractalstyler2`.

Every entry is a concrete class — the space families are expanded from the family maps in `_00_config.sass` across the eight steps `xs sm md bs lg xl 2xl 3xl`. There are no wildcard families, no literal ladders and no `-mob`/`-desk` bands.

---

## Quick Grep Cheatsheet

Format: `CLASS_NAME | LAYER | CSS PROPERTY / BEHAVIOR | FILE SOURCE | EXAMPLE`

```
.gap-xs                        | L1 | gap: var(--space-xs)                                               | _02_dimensions.sass    | <div class="gap-xs">
.gap-sm                        | L1 | gap: var(--space-sm)                                               | _02_dimensions.sass    | <div class="gap-sm">
.gap-md                        | L1 | gap: var(--space-md)                                               | _02_dimensions.sass    | <div class="gap-md">
.gap-bs                        | L1 | gap: var(--space-bs)                                               | _02_dimensions.sass    | <div class="gap-bs">
.gap-lg                        | L1 | gap: var(--space-lg)                                               | _02_dimensions.sass    | <div class="gap-lg">
.gap-xl                        | L1 | gap: var(--space-xl)                                               | _02_dimensions.sass    | <div class="gap-xl">
.gap-2xl                       | L1 | gap: var(--space-2xl)                                              | _02_dimensions.sass    | <div class="gap-2xl">
.gap-3xl                       | L1 | gap: var(--space-3xl)                                              | _02_dimensions.sass    | <div class="gap-3xl">
.rgap-xs                       | L1 | row-gap: var(--space-xs)                                           | _02_dimensions.sass    | <div class="rgap-xs">
.rgap-sm                       | L1 | row-gap: var(--space-sm)                                           | _02_dimensions.sass    | <div class="rgap-sm">
.rgap-md                       | L1 | row-gap: var(--space-md)                                           | _02_dimensions.sass    | <div class="rgap-md">
.rgap-bs                       | L1 | row-gap: var(--space-bs)                                           | _02_dimensions.sass    | <div class="rgap-bs">
.rgap-lg                       | L1 | row-gap: var(--space-lg)                                           | _02_dimensions.sass    | <div class="rgap-lg">
.rgap-xl                       | L1 | row-gap: var(--space-xl)                                           | _02_dimensions.sass    | <div class="rgap-xl">
.rgap-2xl                      | L1 | row-gap: var(--space-2xl)                                          | _02_dimensions.sass    | <div class="rgap-2xl">
.rgap-3xl                      | L1 | row-gap: var(--space-3xl)                                          | _02_dimensions.sass    | <div class="rgap-3xl">
.cgap-xs                       | L1 | column-gap: var(--space-xs)                                        | _02_dimensions.sass    | <div class="cgap-xs">
.cgap-sm                       | L1 | column-gap: var(--space-sm)                                        | _02_dimensions.sass    | <div class="cgap-sm">
.cgap-md                       | L1 | column-gap: var(--space-md)                                        | _02_dimensions.sass    | <div class="cgap-md">
.cgap-bs                       | L1 | column-gap: var(--space-bs)                                        | _02_dimensions.sass    | <div class="cgap-bs">
.cgap-lg                       | L1 | column-gap: var(--space-lg)                                        | _02_dimensions.sass    | <div class="cgap-lg">
.cgap-xl                       | L1 | column-gap: var(--space-xl)                                        | _02_dimensions.sass    | <div class="cgap-xl">
.cgap-2xl                      | L1 | column-gap: var(--space-2xl)                                       | _02_dimensions.sass    | <div class="cgap-2xl">
.cgap-3xl                      | L1 | column-gap: var(--space-3xl)                                       | _02_dimensions.sass    | <div class="cgap-3xl">
.pad-xs                        | L1 | padding: var(--space-xs)                                           | _02_dimensions.sass    | <div class="pad-xs">
.pad-sm                        | L1 | padding: var(--space-sm)                                           | _02_dimensions.sass    | <div class="pad-sm">
.pad-md                        | L1 | padding: var(--space-md)                                           | _02_dimensions.sass    | <div class="pad-md">
.pad-bs                        | L1 | padding: var(--space-bs)                                           | _02_dimensions.sass    | <div class="pad-bs">
.pad-lg                        | L1 | padding: var(--space-lg)                                           | _02_dimensions.sass    | <div class="pad-lg">
.pad-xl                        | L1 | padding: var(--space-xl)                                           | _02_dimensions.sass    | <div class="pad-xl">
.pad-2xl                       | L1 | padding: var(--space-2xl)                                          | _02_dimensions.sass    | <div class="pad-2xl">
.pad-3xl                       | L1 | padding: var(--space-3xl)                                          | _02_dimensions.sass    | <div class="pad-3xl">
.px-xs                         | L1 | padding-inline: var(--space-xs)                                    | _02_dimensions.sass    | <div class="px-xs">
.px-sm                         | L1 | padding-inline: var(--space-sm)                                    | _02_dimensions.sass    | <div class="px-sm">
.px-md                         | L1 | padding-inline: var(--space-md)                                    | _02_dimensions.sass    | <div class="px-md">
.px-bs                         | L1 | padding-inline: var(--space-bs)                                    | _02_dimensions.sass    | <div class="px-bs">
.px-lg                         | L1 | padding-inline: var(--space-lg)                                    | _02_dimensions.sass    | <div class="px-lg">
.px-xl                         | L1 | padding-inline: var(--space-xl)                                    | _02_dimensions.sass    | <div class="px-xl">
.px-2xl                        | L1 | padding-inline: var(--space-2xl)                                   | _02_dimensions.sass    | <div class="px-2xl">
.px-3xl                        | L1 | padding-inline: var(--space-3xl)                                   | _02_dimensions.sass    | <div class="px-3xl">
.py-xs                         | L1 | padding-block: var(--space-xs)                                     | _02_dimensions.sass    | <div class="py-xs">
.py-sm                         | L1 | padding-block: var(--space-sm)                                     | _02_dimensions.sass    | <div class="py-sm">
.py-md                         | L1 | padding-block: var(--space-md)                                     | _02_dimensions.sass    | <div class="py-md">
.py-bs                         | L1 | padding-block: var(--space-bs)                                     | _02_dimensions.sass    | <div class="py-bs">
.py-lg                         | L1 | padding-block: var(--space-lg)                                     | _02_dimensions.sass    | <div class="py-lg">
.py-xl                         | L1 | padding-block: var(--space-xl)                                     | _02_dimensions.sass    | <div class="py-xl">
.py-2xl                        | L1 | padding-block: var(--space-2xl)                                    | _02_dimensions.sass    | <div class="py-2xl">
.py-3xl                        | L1 | padding-block: var(--space-3xl)                                    | _02_dimensions.sass    | <div class="py-3xl">
.pt-xs                         | L1 | padding-top: var(--space-xs)                                       | _02_dimensions.sass    | <div class="pt-xs">
.pt-sm                         | L1 | padding-top: var(--space-sm)                                       | _02_dimensions.sass    | <div class="pt-sm">
.pt-md                         | L1 | padding-top: var(--space-md)                                       | _02_dimensions.sass    | <div class="pt-md">
.pt-bs                         | L1 | padding-top: var(--space-bs)                                       | _02_dimensions.sass    | <div class="pt-bs">
.pt-lg                         | L1 | padding-top: var(--space-lg)                                       | _02_dimensions.sass    | <div class="pt-lg">
.pt-xl                         | L1 | padding-top: var(--space-xl)                                       | _02_dimensions.sass    | <div class="pt-xl">
.pt-2xl                        | L1 | padding-top: var(--space-2xl)                                      | _02_dimensions.sass    | <div class="pt-2xl">
.pt-3xl                        | L1 | padding-top: var(--space-3xl)                                      | _02_dimensions.sass    | <div class="pt-3xl">
.pr-xs                         | L1 | padding-right: var(--space-xs)                                     | _02_dimensions.sass    | <div class="pr-xs">
.pr-sm                         | L1 | padding-right: var(--space-sm)                                     | _02_dimensions.sass    | <div class="pr-sm">
.pr-md                         | L1 | padding-right: var(--space-md)                                     | _02_dimensions.sass    | <div class="pr-md">
.pr-bs                         | L1 | padding-right: var(--space-bs)                                     | _02_dimensions.sass    | <div class="pr-bs">
.pr-lg                         | L1 | padding-right: var(--space-lg)                                     | _02_dimensions.sass    | <div class="pr-lg">
.pr-xl                         | L1 | padding-right: var(--space-xl)                                     | _02_dimensions.sass    | <div class="pr-xl">
.pr-2xl                        | L1 | padding-right: var(--space-2xl)                                    | _02_dimensions.sass    | <div class="pr-2xl">
.pr-3xl                        | L1 | padding-right: var(--space-3xl)                                    | _02_dimensions.sass    | <div class="pr-3xl">
.pb-xs                         | L1 | padding-bottom: var(--space-xs)                                    | _02_dimensions.sass    | <div class="pb-xs">
.pb-sm                         | L1 | padding-bottom: var(--space-sm)                                    | _02_dimensions.sass    | <div class="pb-sm">
.pb-md                         | L1 | padding-bottom: var(--space-md)                                    | _02_dimensions.sass    | <div class="pb-md">
.pb-bs                         | L1 | padding-bottom: var(--space-bs)                                    | _02_dimensions.sass    | <div class="pb-bs">
.pb-lg                         | L1 | padding-bottom: var(--space-lg)                                    | _02_dimensions.sass    | <div class="pb-lg">
.pb-xl                         | L1 | padding-bottom: var(--space-xl)                                    | _02_dimensions.sass    | <div class="pb-xl">
.pb-2xl                        | L1 | padding-bottom: var(--space-2xl)                                   | _02_dimensions.sass    | <div class="pb-2xl">
.pb-3xl                        | L1 | padding-bottom: var(--space-3xl)                                   | _02_dimensions.sass    | <div class="pb-3xl">
.pl-xs                         | L1 | padding-left: var(--space-xs)                                      | _02_dimensions.sass    | <div class="pl-xs">
.pl-sm                         | L1 | padding-left: var(--space-sm)                                      | _02_dimensions.sass    | <div class="pl-sm">
.pl-md                         | L1 | padding-left: var(--space-md)                                      | _02_dimensions.sass    | <div class="pl-md">
.pl-bs                         | L1 | padding-left: var(--space-bs)                                      | _02_dimensions.sass    | <div class="pl-bs">
.pl-lg                         | L1 | padding-left: var(--space-lg)                                      | _02_dimensions.sass    | <div class="pl-lg">
.pl-xl                         | L1 | padding-left: var(--space-xl)                                      | _02_dimensions.sass    | <div class="pl-xl">
.pl-2xl                        | L1 | padding-left: var(--space-2xl)                                     | _02_dimensions.sass    | <div class="pl-2xl">
.pl-3xl                        | L1 | padding-left: var(--space-3xl)                                     | _02_dimensions.sass    | <div class="pl-3xl">
.mar-xs                        | L1 | margin: var(--space-xs)                                            | _02_dimensions.sass    | <div class="mar-xs">
.mar-sm                        | L1 | margin: var(--space-sm)                                            | _02_dimensions.sass    | <div class="mar-sm">
.mar-md                        | L1 | margin: var(--space-md)                                            | _02_dimensions.sass    | <div class="mar-md">
.mar-bs                        | L1 | margin: var(--space-bs)                                            | _02_dimensions.sass    | <div class="mar-bs">
.mar-lg                        | L1 | margin: var(--space-lg)                                            | _02_dimensions.sass    | <div class="mar-lg">
.mar-xl                        | L1 | margin: var(--space-xl)                                            | _02_dimensions.sass    | <div class="mar-xl">
.mar-2xl                       | L1 | margin: var(--space-2xl)                                           | _02_dimensions.sass    | <div class="mar-2xl">
.mar-3xl                       | L1 | margin: var(--space-3xl)                                           | _02_dimensions.sass    | <div class="mar-3xl">
.mx-xs                         | L1 | margin-inline: var(--space-xs)                                     | _02_dimensions.sass    | <div class="mx-xs">
.mx-sm                         | L1 | margin-inline: var(--space-sm)                                     | _02_dimensions.sass    | <div class="mx-sm">
.mx-md                         | L1 | margin-inline: var(--space-md)                                     | _02_dimensions.sass    | <div class="mx-md">
.mx-bs                         | L1 | margin-inline: var(--space-bs)                                     | _02_dimensions.sass    | <div class="mx-bs">
.mx-lg                         | L1 | margin-inline: var(--space-lg)                                     | _02_dimensions.sass    | <div class="mx-lg">
.mx-xl                         | L1 | margin-inline: var(--space-xl)                                     | _02_dimensions.sass    | <div class="mx-xl">
.mx-2xl                        | L1 | margin-inline: var(--space-2xl)                                    | _02_dimensions.sass    | <div class="mx-2xl">
.mx-3xl                        | L1 | margin-inline: var(--space-3xl)                                    | _02_dimensions.sass    | <div class="mx-3xl">
.my-xs                         | L1 | margin-block: var(--space-xs)                                      | _02_dimensions.sass    | <div class="my-xs">
.my-sm                         | L1 | margin-block: var(--space-sm)                                      | _02_dimensions.sass    | <div class="my-sm">
.my-md                         | L1 | margin-block: var(--space-md)                                      | _02_dimensions.sass    | <div class="my-md">
.my-bs                         | L1 | margin-block: var(--space-bs)                                      | _02_dimensions.sass    | <div class="my-bs">
.my-lg                         | L1 | margin-block: var(--space-lg)                                      | _02_dimensions.sass    | <div class="my-lg">
.my-xl                         | L1 | margin-block: var(--space-xl)                                      | _02_dimensions.sass    | <div class="my-xl">
.my-2xl                        | L1 | margin-block: var(--space-2xl)                                     | _02_dimensions.sass    | <div class="my-2xl">
.my-3xl                        | L1 | margin-block: var(--space-3xl)                                     | _02_dimensions.sass    | <div class="my-3xl">
.mt-xs                         | L1 | margin-top: var(--space-xs)                                        | _02_dimensions.sass    | <div class="mt-xs">
.mt-sm                         | L1 | margin-top: var(--space-sm)                                        | _02_dimensions.sass    | <div class="mt-sm">
.mt-md                         | L1 | margin-top: var(--space-md)                                        | _02_dimensions.sass    | <div class="mt-md">
.mt-bs                         | L1 | margin-top: var(--space-bs)                                        | _02_dimensions.sass    | <div class="mt-bs">
.mt-lg                         | L1 | margin-top: var(--space-lg)                                        | _02_dimensions.sass    | <div class="mt-lg">
.mt-xl                         | L1 | margin-top: var(--space-xl)                                        | _02_dimensions.sass    | <div class="mt-xl">
.mt-2xl                        | L1 | margin-top: var(--space-2xl)                                       | _02_dimensions.sass    | <div class="mt-2xl">
.mt-3xl                        | L1 | margin-top: var(--space-3xl)                                       | _02_dimensions.sass    | <div class="mt-3xl">
.mr-xs                         | L1 | margin-right: var(--space-xs)                                      | _02_dimensions.sass    | <div class="mr-xs">
.mr-sm                         | L1 | margin-right: var(--space-sm)                                      | _02_dimensions.sass    | <div class="mr-sm">
.mr-md                         | L1 | margin-right: var(--space-md)                                      | _02_dimensions.sass    | <div class="mr-md">
.mr-bs                         | L1 | margin-right: var(--space-bs)                                      | _02_dimensions.sass    | <div class="mr-bs">
.mr-lg                         | L1 | margin-right: var(--space-lg)                                      | _02_dimensions.sass    | <div class="mr-lg">
.mr-xl                         | L1 | margin-right: var(--space-xl)                                      | _02_dimensions.sass    | <div class="mr-xl">
.mr-2xl                        | L1 | margin-right: var(--space-2xl)                                     | _02_dimensions.sass    | <div class="mr-2xl">
.mr-3xl                        | L1 | margin-right: var(--space-3xl)                                     | _02_dimensions.sass    | <div class="mr-3xl">
.mb-xs                         | L1 | margin-bottom: var(--space-xs)                                     | _02_dimensions.sass    | <div class="mb-xs">
.mb-sm                         | L1 | margin-bottom: var(--space-sm)                                     | _02_dimensions.sass    | <div class="mb-sm">
.mb-md                         | L1 | margin-bottom: var(--space-md)                                     | _02_dimensions.sass    | <div class="mb-md">
.mb-bs                         | L1 | margin-bottom: var(--space-bs)                                     | _02_dimensions.sass    | <div class="mb-bs">
.mb-lg                         | L1 | margin-bottom: var(--space-lg)                                     | _02_dimensions.sass    | <div class="mb-lg">
.mb-xl                         | L1 | margin-bottom: var(--space-xl)                                     | _02_dimensions.sass    | <div class="mb-xl">
.mb-2xl                        | L1 | margin-bottom: var(--space-2xl)                                    | _02_dimensions.sass    | <div class="mb-2xl">
.mb-3xl                        | L1 | margin-bottom: var(--space-3xl)                                    | _02_dimensions.sass    | <div class="mb-3xl">
.ml-xs                         | L1 | margin-left: var(--space-xs)                                       | _02_dimensions.sass    | <div class="ml-xs">
.ml-sm                         | L1 | margin-left: var(--space-sm)                                       | _02_dimensions.sass    | <div class="ml-sm">
.ml-md                         | L1 | margin-left: var(--space-md)                                       | _02_dimensions.sass    | <div class="ml-md">
.ml-bs                         | L1 | margin-left: var(--space-bs)                                       | _02_dimensions.sass    | <div class="ml-bs">
.ml-lg                         | L1 | margin-left: var(--space-lg)                                       | _02_dimensions.sass    | <div class="ml-lg">
.ml-xl                         | L1 | margin-left: var(--space-xl)                                       | _02_dimensions.sass    | <div class="ml-xl">
.ml-2xl                        | L1 | margin-left: var(--space-2xl)                                      | _02_dimensions.sass    | <div class="ml-2xl">
.ml-3xl                        | L1 | margin-left: var(--space-3xl)                                      | _02_dimensions.sass    | <div class="ml-3xl">
.frame-16-9                    | L3 | aspect-ratio: 16 / 9; overflow: hidden                             | _05_layouts.sass       | <div class="frame-16-9"><img …></div>
.frame-9-16                    | L3 | aspect-ratio: 9 / 16; overflow: hidden                             | _05_layouts.sass       | <div class="frame-9-16"><img …></div>
.frame-4-3                     | L3 | aspect-ratio: 4 / 3; overflow: hidden                              | _05_layouts.sass       | <div class="frame-4-3"><img …></div>
.frame-3-4                     | L3 | aspect-ratio: 3 / 4; overflow: hidden                              | _05_layouts.sass       | <div class="frame-3-4"><img …></div>
.frame-3-2                     | L3 | aspect-ratio: 3 / 2; overflow: hidden                              | _05_layouts.sass       | <div class="frame-3-2"><img …></div>
.frame-2-3                     | L3 | aspect-ratio: 2 / 3; overflow: hidden                              | _05_layouts.sass       | <div class="frame-2-3"><img …></div>
.frame-1-1                     | L3 | aspect-ratio: 1 / 1; overflow: hidden                              | _05_layouts.sass       | <div class="frame-1-1"><img …></div>
.bdr                           | L0 | border: 1px solid red                                              | _01_base.sass          | <div class="bdr">…</div>
.mode-wipe                     | L0 | animation: none                                                    | _01_base.sass          | <div class="mode-wipe">…</div>
.radius-xs                     | L1 | border-radius: var(--radius-xs)                                    | _02_dimensions.sass    | <div class="radius-xs">…</div>
.radius-sm                     | L1 | border-radius: var(--radius-sm)                                    | _02_dimensions.sass    | <div class="radius-sm">…</div>
.radius-md                     | L1 | border-radius: var(--radius-md)                                    | _02_dimensions.sass    | <div class="radius-md">…</div>
.radius-bs                     | L1 | border-radius: var(--radius-bs)                                    | _02_dimensions.sass    | <div class="radius-bs">…</div>
.radius-lg                     | L1 | border-radius: var(--radius-lg)                                    | _02_dimensions.sass    | <div class="radius-lg">…</div>
.radius-full                   | L1 | border-radius: var(--radius-full)                                  | _02_dimensions.sass    | <div class="radius-full">…</div>
.wfull                         | L1 | width: 100%                                                        | _02_dimensions.sass    | <div class="wfull">…</div>
.hfull                         | L1 | height: 100%                                                       | _02_dimensions.sass    | <div class="hfull">…</div>
.full                          | L1 | width: 100%; height: 100%                                          | _02_dimensions.sass    | <div class="full">…</div>
.minw0                         | L1 | min-width: 0                                                       | _02_dimensions.sass    | <div class="minw0">…</div>
.minh0                         | L1 | min-height: 0                                                      | _02_dimensions.sass    | <div class="minh0">…</div>
.min0                          | L1 | min-width: 0; min-height: 0                                        | _02_dimensions.sass    | <div class="min0">…</div>
.h-sm                          | L1 | height: var(--height-sm)                                           | _02_dimensions.sass    | <div class="h-sm">…</div>
.h-md                          | L1 | height: var(--height-md)                                           | _02_dimensions.sass    | <div class="h-md">…</div>
.h-bs                          | L1 | height: var(--height-bs)                                           | _02_dimensions.sass    | <div class="h-bs">…</div>
.h-lg                          | L1 | height: var(--height-lg)                                           | _02_dimensions.sass    | <div class="h-lg">…</div>
.hfull-vh                      | L1 | min-height: 100vh                                                  | _02_dimensions.sass    | <div class="hfull-vh">…</div>
.hfull-vh-fitted               | L1 | min-height: var(--fit-height)                                      | _02_dimensions.sass    | <div class="hfull-vh-fitted">…</div>
.text-xs                       | L5 | font-size: var(--text-xs)                                          | _03_typography.sass    | <div class="text-xs">…</div>
.text-sm                       | L5 | font-size: var(--text-sm)                                          | _03_typography.sass    | <div class="text-sm">…</div>
.text-md                       | L5 | font-size: var(--text-md)                                          | _03_typography.sass    | <div class="text-md">…</div>
.text-bs                       | L5 | font-size: var(--text-bs)                                          | _03_typography.sass    | <div class="text-bs">…</div>
.text-lg                       | L5 | font-size: var(--text-lg)                                          | _03_typography.sass    | <div class="text-lg">…</div>
.text-xl                       | L5 | font-size: var(--text-xl)                                          | _03_typography.sass    | <div class="text-xl">…</div>
.text-2xl                      | L5 | font-size: var(--text-2xl)                                         | _03_typography.sass    | <div class="text-2xl">…</div>
.text-3xl                      | L5 | font-size: var(--text-3xl)                                         | _03_typography.sass    | <div class="text-3xl">…</div>
.text-4xl                      | L5 | font-size: var(--text-4xl)                                         | _03_typography.sass    | <div class="text-4xl">…</div>
.text-5xl                      | L5 | font-size: var(--text-5xl)                                         | _03_typography.sass    | <div class="text-5xl">…</div>
.text-body                     | L5 | font-size: var(--text-bs); line-height: 1.5                        | _03_typography.sass    | <div class="text-body">…</div>
.text-body-lg                  | L5 | font-size: var(--text-lg); line-height: 1.5                        | _03_typography.sass    | <div class="text-body-lg">…</div>
.text-body-sm                  | L5 | font-size: var(--text-sm); line-height: 1.5                        | _03_typography.sass    | <div class="text-body-sm">…</div>
.page-title                    | L5 | font-size: var(--text-3xl); line-height: 1.1; font-weight: 700; …  | _03_typography.sass    | <div class="page-title">…</div>
.page-desc                     | L5 | font-size: var(--text-lg); line-height: 1.2                        | _03_typography.sass    | <div class="page-desc">…</div>
.page-heading-xl               | L5 | font-size: var(--text-xl); line-height: 1.1; font-weight: 600; …   | _03_typography.sass    | <div class="page-heading-xl">…</div>
.page-heading-lg               | L5 | font-size: var(--text-lg); line-height: 1.1; font-weight: 600; …   | _03_typography.sass    | <div class="page-heading-lg">…</div>
.page-heading-bs               | L5 | font-size: var(--text-bs); line-height: 1.1; font-weight: 600; …   | _03_typography.sass    | <div class="page-heading-bs">…</div>
.card-title                    | L5 | font-size: var(--text-lg); font-weight: 600; line-height: 1.2      | _03_typography.sass    | <div class="card-title">…</div>
.card-desc                     | L5 | font-size: var(--text-md); line-height: 1.2                        | _03_typography.sass    | <div class="card-desc">…</div>
.breadcrumb-link               | L5 | color: var(--text-muted); font-size: var(--text-xs); text-transform: uppercase | _03_typography.sass    | <div class="breadcrumb-link">…</div>
.breadcrumb-spacer             | L5 | color: var(--text-muted); font-size: var(--text-xs); text-transform: uppercase | _03_typography.sass    | <div class="breadcrumb-spacer">…</div>
.breadcrumb                    | L5 | display: flex; justify-content: flex-start; margin-left: -0.5rem   | _03_typography.sass    | <div class="breadcrumb">…</div>
.nav-link                      | L5 | font-size: var(--text-md); line-height: 1.2                        | _03_typography.sass    | <div class="nav-link">…</div>
.nav-link-sm                   | L5 | font-size: var(--text-sm); line-height: 1.2                        | _03_typography.sass    | <div class="nav-link-sm">…</div>
.nav-header                    | L5 | font-size: var(--text-sm); line-height: 1.1; font-weight: 500; …   | _03_typography.sass    | <div class="nav-header">…</div>
.header-nav                    | L5 | Header nav block — uppercased md links, theme color on hover       | _03_typography.sass    | <div class="header-nav">…</div>
.lh11                          | L5 | line-height: 1.1                                                   | _03_typography.sass    | <div class="lh11">…</div>
.lh12                          | L5 | line-height: 1.2                                                   | _03_typography.sass    | <div class="lh12">…</div>
.lh13                          | L5 | line-height: 1.3                                                   | _03_typography.sass    | <div class="lh13">…</div>
.lh14                          | L5 | line-height: 1.4                                                   | _03_typography.sass    | <div class="lh14">…</div>
.lh15                          | L5 | line-height: 1.5                                                   | _03_typography.sass    | <div class="lh15">…</div>
.lh16                          | L5 | line-height: 1.6                                                   | _03_typography.sass    | <div class="lh16">…</div>
.ls-tight-bs                   | L5 | letter-spacing: -0.01rem                                           | _03_typography.sass    | <div class="ls-tight-bs">…</div>
.ls-tight-lg                   | L5 | letter-spacing: -0.02rem                                           | _03_typography.sass    | <div class="ls-tight-lg">…</div>
.ls-tight-xl                   | L5 | letter-spacing: -0.03rem                                           | _03_typography.sass    | <div class="ls-tight-xl">…</div>
.ls-wide-bs                    | L5 | letter-spacing: 0.01rem                                            | _03_typography.sass    | <div class="ls-wide-bs">…</div>
.ls-wide-lg                    | L5 | letter-spacing: 0.02rem                                            | _03_typography.sass    | <div class="ls-wide-lg">…</div>
.ls-wide-xl                    | L5 | letter-spacing: 0.03rem                                            | _03_typography.sass    | <div class="ls-wide-xl">…</div>
.weight-300                    | L5 | font-weight: 300                                                   | _03_typography.sass    | <div class="weight-300">…</div>
.weight-400                    | L5 | font-weight: 400                                                   | _03_typography.sass    | <div class="weight-400">…</div>
.weight-500                    | L5 | font-weight: 500                                                   | _03_typography.sass    | <div class="weight-500">…</div>
.weight-600                    | L5 | font-weight: 600                                                   | _03_typography.sass    | <div class="weight-600">…</div>
.weight-700                    | L5 | font-weight: 700                                                   | _03_typography.sass    | <div class="weight-700">…</div>
.weight-800                    | L5 | font-weight: 800                                                   | _03_typography.sass    | <div class="weight-800">…</div>
.tt-u                          | L5 | text-transform: uppercase                                          | _03_typography.sass    | <div class="tt-u">…</div>
.tt-c                          | L5 | text-transform: capitalize                                         | _03_typography.sass    | <div class="tt-c">…</div>
.ta-c                          | L5 | text-align: center                                                 | _03_typography.sass    | <div class="ta-c">…</div>
.ta-c.mleft                    | L5 | @max-width:1024px: text-align: left                                | _03_typography.sass    | <div class="ta-c mleft">…</div>
.ta-l                          | L5 | text-align: left                                                   | _03_typography.sass    | <div class="ta-l">…</div>
.ta-r                          | L5 | text-align: right                                                  | _03_typography.sass    | <div class="ta-r">…</div>
.ta-r.mleft                    | L5 | @max-width:1024px: text-align: left                                | _03_typography.sass    | <div class="ta-r mleft">…</div>
.mono                          | L5 | font-family: var(--font-mono)                                      | _03_typography.sass    | <div class="mono">…</div>
.sans                          | L5 | font-family: var(--font-sans)                                      | _03_typography.sass    | <div class="sans">…</div>
.truncate                      | L5 | overflow: hidden; white-space: nowrap; text-overflow: ellipsis     | _03_typography.sass    | <div class="truncate">…</div>
.box                           | L2 | display: flex; flex-direction: column                              | _04_containers.sass    | <div class="box">…</div>
.box.xcenter                   | L2 | align-items: center; text-align: center                            | _04_containers.sass    | <div class="box xcenter">…</div>
.box.xleft                     | L2 | align-items: flex-start; text-align: left                          | _04_containers.sass    | <div class="box xleft">…</div>
.box.xright                    | L2 | align-items: flex-end; text-align: right                           | _04_containers.sass    | <div class="box xright">…</div>
.box.ycenter                   | L2 | justify-content: center                                            | _04_containers.sass    | <div class="box ycenter">…</div>
.box.ytop                      | L2 | justify-content: flex-start                                        | _04_containers.sass    | <div class="box ytop">…</div>
.box.ybot                      | L2 | justify-content: flex-end                                          | _04_containers.sass    | <div class="box ybot">…</div>
.box.ybetween                  | L2 | justify-content: space-between                                     | _04_containers.sass    | <div class="box ybetween">…</div>
.box.yevenly                   | L2 | justify-content: space-evenly                                      | _04_containers.sass    | <div class="box yevenly">…</div>
.box.yaround                   | L2 | justify-content: space-around                                      | _04_containers.sass    | <div class="box yaround">…</div>
.row                           | L2 | display: flex; flex-direction: row                                 | _04_containers.sass    | <div class="row">…</div>
.row.xleft                     | L2 | justify-content: flex-start                                        | _04_containers.sass    | <div class="row xleft">…</div>
.row.xcenter                   | L2 | justify-content: center                                            | _04_containers.sass    | <div class="row xcenter">…</div>
.row.xright                    | L2 | justify-content: flex-end                                          | _04_containers.sass    | <div class="row xright">…</div>
.row.xbetween                  | L2 | justify-content: space-between                                     | _04_containers.sass    | <div class="row xbetween">…</div>
.row.xevenly                   | L2 | justify-content: space-evenly                                      | _04_containers.sass    | <div class="row xevenly">…</div>
.row.xaround                   | L2 | justify-content: space-around                                      | _04_containers.sass    | <div class="row xaround">…</div>
.row.ycenter                   | L2 | align-items: center                                                | _04_containers.sass    | <div class="row ycenter">…</div>
.row.ytop                      | L2 | align-items: flex-start                                            | _04_containers.sass    | <div class="row ytop">…</div>
.row.ybot                      | L2 | align-items: flex-end                                              | _04_containers.sass    | <div class="row ybot">…</div>
.grid                          | L2 | display: grid                                                      | _04_containers.sass    | <div class="grid">…</div>
.grid.center                   | L2 | place-items: center                                                | _04_containers.sass    | <div class="grid center">…</div>
.grid.xcenter                  | L2 | justify-items: center; text-align: center                          | _04_containers.sass    | <div class="grid xcenter">…</div>
.grid.xleft                    | L2 | justify-items: start; text-align: left                             | _04_containers.sass    | <div class="grid xleft">…</div>
.grid.xright                   | L2 | justify-items: end; text-align: right                              | _04_containers.sass    | <div class="grid xright">…</div>
.grid.xstretch                 | L2 | justify-items: stretch                                             | _04_containers.sass    | <div class="grid xstretch">…</div>
.grid.ycenter                  | L2 | align-items: center                                                | _04_containers.sass    | <div class="grid ycenter">…</div>
.grid.ytop                     | L2 | align-items: start                                                 | _04_containers.sass    | <div class="grid ytop">…</div>
.grid.ybot                     | L2 | align-items: end                                                   | _04_containers.sass    | <div class="grid ybot">…</div>
.grid.ystretch                 | L2 | align-items: stretch                                               | _04_containers.sass    | <div class="grid ystretch">…</div>
.grid.xbetween                 | L2 | justify-content: space-between                                     | _04_containers.sass    | <div class="grid xbetween">…</div>
.grid.xevenly                  | L2 | justify-content: space-evenly                                      | _04_containers.sass    | <div class="grid xevenly">…</div>
.grid.xaround                  | L2 | justify-content: space-around                                      | _04_containers.sass    | <div class="grid xaround">…</div>
.grid.ybetween                 | L2 | align-content: space-between                                       | _04_containers.sass    | <div class="grid ybetween">…</div>
.grid.yevenly                  | L2 | align-content: space-evenly                                        | _04_containers.sass    | <div class="grid yevenly">…</div>
.grid.yaround                  | L2 | align-content: space-around                                        | _04_containers.sass    | <div class="grid yaround">…</div>
.wrap                          | L2 | flex-wrap: wrap                                                    | _04_containers.sass    | <div class="wrap">…</div>
.grow                          | L2 | flex: 1 1 0%                                                       | _04_containers.sass    | <div class="grow">…</div>
.shrink-0                      | L2 | flex-shrink: 0                                                     | _04_containers.sass    | <div class="shrink-0">…</div>
.relative                      | L2 | position: relative                                                 | _04_containers.sass    | <div class="relative">…</div>
.absolute                      | L2 | position: absolute                                                 | _04_containers.sass    | <div class="absolute">…</div>
.fixed                         | L2 | position: fixed                                                    | _04_containers.sass    | <div class="fixed">…</div>
.sticky                        | L2 | position: sticky                                                   | _04_containers.sass    | <div class="sticky">…</div>
.scroll-y                      | L2 | overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain | _04_containers.sass    | <div class="scroll-y">…</div>
.scroll-x                      | L2 | overflow-x: auto; overflow-y: hidden; overscroll-behavior: contain | _04_containers.sass    | <div class="scroll-x">…</div>
.card                          | L2 | padding: var(--space-bs); border: 1px solid var(--border); background: var(--bg-panel) | _04_containers.sass    | <div class="card">…</div>
.arrow                         | L2 | color: var(--theme-color); transition: transform var(--speed1) var(--transout1) | _04_containers.sass    | <div class="arrow">…</div>
.card[data-shape="modern"]     | L2 | border-radius: var(--radius-sm)                                    | _04_containers.sass    | <div class="card">…</div>
.chip                          | L2 | font-size: var(--text-xs); font-weight: 500; letter-spacing: 0.01rem; … | _04_containers.sass    | <div class="chip">…</div>
.prose-section                 | L2 | display: flex; flex-direction: column; gap: var(--space-lg)        | _04_containers.sass    | <div class="prose-section">…</div>
.nav-section                   | L2 | display: flex; flex-direction: column; gap: var(--space-xs)        | _04_containers.sass    | <div class="nav-section">…</div>
.page-header                   | L2 | display: flex; flex-direction: column; padding-bottom: var(--space-2xl); … | _04_containers.sass    | <div class="page-header">…</div>
.inputs-wrapper                | L2 | display: flex; gap: var(--space-xs)                                | _04_containers.sass    | <div class="inputs-wrapper">…</div>
.checkbox-wrapper              | L2 | display: flex; align-items: center; gap: var(--space-xs)           | _04_containers.sass    | <div class="checkbox-wrapper">…</div>
.grid-1                        | L3 | display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))    | _05_layouts.sass       | <div class="grid-1">…</div>
.grid-2                        | L3 | display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)) · @min-width:1025px: grid-template-columns: repeat(2, minmax(0, 1fr)) | _05_layouts.sass       | <div class="grid-2">…</div>
.grid-3                        | L3 | display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)) · @min-width:1025px: grid-template-columns: repeat(3, minmax(0, 1fr)) | _05_layouts.sass       | <div class="grid-3">…</div>
.grid-4                        | L3 | display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)) · @min-width:1025px: grid-template-columns: repeat(2, minmax(0, 1fr)) · @min-width:1281px: grid-templ… | _05_layouts.sass       | <div class="grid-4">…</div>
.grid-6                        | L3 | display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)) · @min-width:1025px: grid-template-columns: repeat(3, minmax(0, 1fr)) · @min-width:1281px: grid-templ… | _05_layouts.sass       | <div class="grid-6">…</div>
.cspan-1                       | L3 | grid-column: span 1                                                | _05_layouts.sass       | <div class="cspan-1">…</div>
.cspan-2                       | L3 | grid-column: span 2                                                | _05_layouts.sass       | <div class="cspan-2">…</div>
.cspan-3                       | L3 | grid-column: span 3                                                | _05_layouts.sass       | <div class="cspan-3">…</div>
.cspan-4                       | L3 | grid-column: span 4                                                | _05_layouts.sass       | <div class="cspan-4">…</div>
.cspan-5                       | L3 | grid-column: span 5                                                | _05_layouts.sass       | <div class="cspan-5">…</div>
.cspan-6                       | L3 | grid-column: span 6                                                | _05_layouts.sass       | <div class="cspan-6">…</div>
.cspan-7                       | L3 | grid-column: span 7                                                | _05_layouts.sass       | <div class="cspan-7">…</div>
.cspan-8                       | L3 | grid-column: span 8                                                | _05_layouts.sass       | <div class="cspan-8">…</div>
.card-grid                     | L3 | display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--card-min), 1… | _05_layouts.sass       | <div class="card-grid">…</div>
.prose                         | L3 | max-width: var(--prose-clamp); margin-inline: auto; display: flex; … | _05_layouts.sass       | <div class="prose">…</div>
.reel                          | L3 | display: flex; flex-direction: row; overflow-x: auto; …            | _05_layouts.sass       | <div class="reel">…</div>
.get                           | L4 | .get rule                                                          | _06_shells.sass        | <div class="get">…</div>
.app-shell                     | L4 | display: flex; flex-direction: column; position: relative; …       | _06_shells.sass        | <div class="app-shell">…</div>
.app-header                    | L4 | display: flex; flex-direction: row; align-items: center; …         | _06_shells.sass        | <div class="app-header">…</div>
.app-header.clamped            | L4 | width: var(--content-clamp); margin-inline: auto                   | _06_shells.sass        | <div class="app-header clamped">…</div>
.app-main                      | L4 | flex: 1 1 0%; min-width: 0; min-height: calc(100dvh - var(--fit-height)); … | _06_shells.sass        | <div class="app-main">…</div>
.app-main.clamped              | L4 | width: var(--content-clamp); margin-inline: auto                   | _06_shells.sass        | <div class="app-main clamped">…</div>
.main-section                  | L4 | flex: 1 1 0%; min-width: 0                                         | _06_shells.sass        | <div class="main-section">…</div>
.sidebar-left                  | L4 | display: none; flex-shrink: 0; position: sticky; …                 | _06_shells.sass        | <div class="sidebar-left">…</div>
.sidebar-right                 | L4 | display: none; flex-shrink: 0; position: sticky; …                 | _06_shells.sass        | <div class="sidebar-right">…</div>
.app-shell.open .sidebar-left  | L4 | display: block; position: fixed; left: 0; …                        | _06_shells.sass        | <div class="app-shell open"><div class="sidebar-left">…</div></div>
.app-footer                    | L4 | display: flex; flex-direction: row; align-items: center; …         | _06_shells.sass        | <div class="app-footer">…</div>
.content-section               | L4 | width: 100%; padding: var(--space-2xl) 0 · @min-width:769px: padding: var(--space-2xl) var(--space-bs) · @min-width:1025px: padding: var(--space-2xl) var(--space-bs) | _06_shells.sass        | <div class="content-section">…</div>
.content-section.null          | L4 | padding: 0 var(--space-bs)                                         | _06_shells.sass        | <div class="content-section null">…</div>
.content-section.narrow-half   | L4 | padding: var(--space-2xl) 0; width: 640px; margin-inline: auto     | _06_shells.sass        | <div class="content-section narrow-half">…</div>
.content-section.narrow-wide   | L4 | padding: var(--space-2xl) 0; width: 720px; margin-inline: auto     | _06_shells.sass        | <div class="content-section narrow-wide">…</div>
.content-section.narrow-full   | L4 | width: 640px; margin-inline: auto                                  | _06_shells.sass        | <div class="content-section narrow-full">…</div>
.input                         | L5 | display: block; width: 100%; height: var(--height-lg); …           | _07_interactions.sass  | <div class="input">…</div>
.input.small                   | L5 | height: var(--height-bs); font-size: var(--text-sm)                | _07_interactions.sass  | <div class="input small">…</div>
.select                        | L5 | display: block; width: 100%; height: var(--height-lg); …           | _07_interactions.sass  | <div class="select">…</div>
.select.small                  | L5 | height: var(--height-bs); font-size: var(--text-sm)                | _07_interactions.sass  | <div class="select small">…</div>
.link                          | L5 | color: var(--theme-color); text-decoration: none; transition: color var(--motionin1) | _07_interactions.sass  | <div class="link">…</div>
.link-plain                    | L5 | color: var(--text-primary); text-decoration: none; transition: color var(--motionin1) | _07_interactions.sass  | <div class="link-plain">…</div>
.link-parent                   | L5 | color: var(--text-primary); text-decoration: none                  | _07_interactions.sass  | <div class="link-parent">…</div>
.link-title                    | L5 | transition: color var(--motionin1)                                 | _07_interactions.sass  | <div class="link-title">…</div>
a.nav-link                     | L5 | padding: var(--space-sm); border-radius: var(--radius-sm)          | _07_interactions.sass  | <a class="nav-link" href="…">…</a>
button                         | L5 | display: flex; align-items: center; justify-content: center; …     | _07_interactions.sass  | <button>…</button>
button.icon                    | L5 | height: 24px; width: 24px; border: 1px solid transparent; …        | _07_interactions.sass  | <button class="icon">…</button>
button.modern                  | L5 | border-radius: var(--space-xs)                                     | _07_interactions.sass  | <button class="modern">…</button>
button.primary                 | L5 | background: var(--theme-color)                                     | _07_interactions.sass  | <button class="primary">…</button>
button[data-variant="primary"] | L5 | background: var(--theme-color); color: var(--white-fixed); border: 1px solid var(--theme-color) | _07_interactions.sass  | <button [data-variant="primary"]>…</button>
button[data-variant="secondary"] | L5 | background: var(--state-surface); color: var(--text-primary); border: 1px solid var(--border-strong) | _07_interactions.sass  | <button [data-variant="secondary"]>…</button>
button[data-variant="soft"]    | L5 | background: var(--theme-color-sub); color: var(--white-fixed); border: 1px solid var(--theme-color-sub) | _07_interactions.sass  | <button [data-variant="soft"]>…</button>
button[data-variant="outline"] | L5 | background: var(--bg); color: var(--text-primary); border: 1px solid var(--text-primary) | _07_interactions.sass  | <button [data-variant="outline"]>…</button>
button[data-variant="ghost"]   | L5 | background: transparent; color: var(--text-primary); border: none  | _07_interactions.sass  | <button [data-variant="ghost"]>…</button>
button[data-variant="link"]    | L5 | background: transparent; color: var(--theme-color); border: none   | _07_interactions.sass  | <button [data-variant="link"]>…</button>
button[data-variant="destructive"] | L5 | background: var(--danger); color: var(--white-fixed); border: 1px solid var(--danger) | _07_interactions.sass  | <button [data-variant="destructive"]>…</button>
button[data-shape="modern"]    | L5 | border-radius: var(--radius-sm)                                    | _07_interactions.sass  | <button [data-shape="modern"]>…</button>
button[data-shape="curved"]    | L5 | border-radius: var(--radius-md)                                    | _07_interactions.sass  | <button [data-shape="curved"]>…</button>
button[data-shape="round"]     | L5 | border-radius: var(--radius-full)                                  | _07_interactions.sass  | <button [data-shape="round"]>…</button>
button[data-size="sm"]         | L5 | height: var(--height-sm); font-size: var(--text-sm)                | _07_interactions.sass  | <button [data-size="sm"]>…</button>
button[data-size="md"]         | L5 | height: var(--height-md); font-size: var(--text-md)                | _07_interactions.sass  | <button [data-size="md"]>…</button>
button[data-size="bs"]         | L5 | height: var(--height-bs); font-size: var(--text-bs)                | _07_interactions.sass  | <button [data-size="bs"]>…</button>
button[data-size="lg"]         | L5 | height: var(--height-lg); font-size: var(--text-bs)                | _07_interactions.sass  | <button [data-size="lg"]>…</button>
a.primary                      | L5 | background: var(--theme-color); font-size: var(--text-lg); color: var(--white-fixed); … | _07_interactions.sass  | <a class="primary" href="…">…</a>
a.primary.modern               | L5 | border-radius: var(--space-xs)                                     | _07_interactions.sass  | <a class="primary modern" href="…">…</a>
a.outline                      | L5 | background: transparent; font-size: var(--text-lg); color: var(--text-primary); … | _07_interactions.sass  | <a class="outline" href="…">…</a>
a.outline.modern               | L5 | border-radius: var(--space-xs)                                     | _07_interactions.sass  | <a class="outline modern" href="…">…</a>
.bg                            | L5 | background: var(--bg)                                              | _08_visuals.sass       | <div class="bg">…</div>
.surface                       | L5 | background: var(--bg-surface)                                      | _08_visuals.sass       | <div class="surface">…</div>
.panel                         | L5 | background: var(--bg-panel)                                        | _08_visuals.sass       | <div class="panel">…</div>
.sunken                        | L5 | background: var(--bg-sunken)                                       | _08_visuals.sass       | <div class="sunken">…</div>
.raised                        | L5 | background: var(--bg-raised)                                       | _08_visuals.sass       | <div class="raised">…</div>
.extra                         | L5 | background: var(--bg-extra)                                        | _08_visuals.sass       | <div class="extra">…</div>
.text-primary                  | L5 | color: var(--text-primary)                                         | _08_visuals.sass       | <div class="text-primary">…</div>
.text-secondary                | L5 | color: var(--text-secondary)                                       | _08_visuals.sass       | <div class="text-secondary">…</div>
.text-muted                    | L5 | color: var(--text-muted)                                           | _08_visuals.sass       | <div class="text-muted">…</div>
.text-inverse                  | L5 | color: var(--text-inverse)                                         | _08_visuals.sass       | <div class="text-inverse">…</div>
.text-white                    | L5 | color: var(--white-fixed)                                          | _08_visuals.sass       | <div class="text-white">…</div>
.text-black                    | L5 | color: var(--black-fixed)                                          | _08_visuals.sass       | <div class="text-black">…</div>
.text-theme                    | L5 | color: var(--theme-color)                                          | _08_visuals.sass       | <div class="text-theme">…</div>
.text-success                  | L5 | color: var(--success)                                              | _08_visuals.sass       | <div class="text-success">…</div>
.text-warning                  | L5 | color: var(--warning)                                              | _08_visuals.sass       | <div class="text-warning">…</div>
.text-danger                   | L5 | color: var(--danger)                                               | _08_visuals.sass       | <div class="text-danger">…</div>
.text-info                     | L5 | color: var(--info)                                                 | _08_visuals.sass       | <div class="text-info">…</div>
.bg-success                    | L5 | background: var(--success)                                         | _08_visuals.sass       | <div class="bg-success">…</div>
.bg-warning                    | L5 | background: var(--warning)                                         | _08_visuals.sass       | <div class="bg-warning">…</div>
.bg-danger                     | L5 | background: var(--danger)                                          | _08_visuals.sass       | <div class="bg-danger">…</div>
.bg-info                       | L5 | background: var(--info)                                            | _08_visuals.sass       | <div class="bg-info">…</div>
.border                        | L5 | border: 1px solid var(--border)                                    | _08_visuals.sass       | <div class="border">…</div>
.border-subtle                 | L5 | border: 1px solid var(--border-subtle)                             | _08_visuals.sass       | <div class="border-subtle">…</div>
.border-strong                 | L5 | border: 1px solid var(--border-strong)                             | _08_visuals.sass       | <div class="border-strong">…</div>
.bt                            | L5 | border-top: 1px solid var(--border)                                | _08_visuals.sass       | <div class="bt">…</div>
.br                            | L5 | border-right: 1px solid var(--border)                              | _08_visuals.sass       | <div class="br">…</div>
.bb                            | L5 | border-bottom: 1px solid var(--border)                             | _08_visuals.sass       | <div class="bb">…</div>
.bl                            | L5 | border-left: 1px solid var(--border)                               | _08_visuals.sass       | <div class="bl">…</div>
.bt-str                        | L5 | border-top: 1px solid var(--border-strong)                         | _08_visuals.sass       | <div class="bt-str">…</div>
.br-str                        | L5 | border-right: 1px solid var(--border-strong)                       | _08_visuals.sass       | <div class="br-str">…</div>
.bb-str                        | L5 | border-bottom: 1px solid var(--border-strong)                      | _08_visuals.sass       | <div class="bb-str">…</div>
.bl-str                        | L5 | border-left: 1px solid var(--border-strong)                        | _08_visuals.sass       | <div class="bl-str">…</div>
.bt-sub                        | L5 | border-top: 1px solid var(--border-subtle)                         | _08_visuals.sass       | <div class="bt-sub">…</div>
.br-sub                        | L5 | border-right: 1px solid var(--border-subtle)                       | _08_visuals.sass       | <div class="br-sub">…</div>
.bb-sub                        | L5 | border-bottom: 1px solid var(--border-subtle)                      | _08_visuals.sass       | <div class="bb-sub">…</div>
.bl-sub                        | L5 | border-left: 1px solid var(--border-subtle)                        | _08_visuals.sass       | <div class="bl-sub">…</div>
.shadow-xs                     | L5 | box-shadow: var(--shadow-xs)                                       | _08_visuals.sass       | <div class="shadow-xs">…</div>
.shadow-sm                     | L5 | box-shadow: var(--shadow-sm)                                       | _08_visuals.sass       | <div class="shadow-sm">…</div>
.shadow-md                     | L5 | box-shadow: var(--shadow-md)                                       | _08_visuals.sass       | <div class="shadow-md">…</div>
.shadow-bs                     | L5 | box-shadow: var(--shadow-bs)                                       | _08_visuals.sass       | <div class="shadow-bs">…</div>
.shadow-lg                     | L5 | box-shadow: var(--shadow-lg)                                       | _08_visuals.sass       | <div class="shadow-lg">…</div>
.shadow-xl                     | L5 | box-shadow: var(--shadow-xl)                                       | _08_visuals.sass       | <div class="shadow-xl">…</div>
.shadow-2xl                    | L5 | box-shadow: var(--shadow-2xl)                                      | _08_visuals.sass       | <div class="shadow-2xl">…</div>
.shadow-3xl                    | L5 | box-shadow: var(--shadow-3xl)                                      | _08_visuals.sass       | <div class="shadow-3xl">…</div>
.hide-mobile                   | L5 | @max-width:1024px: display: none                                   | _08_visuals.sass       | <div class="hide-mobile">…</div>
.hide-desktop                  | L5 | @min-width:1025px: display: none                                   | _08_visuals.sass       | <div class="hide-desktop">…</div>
.orange1                       | L5 | color: var(--orangepop1)                                           | _08_visuals.sass       | <div class="orange1">…</div>
.orange2                       | L5 | color: var(--orangepop2)                                           | _08_visuals.sass       | <div class="orange2">…</div>
.orange3                       | L5 | color: var(--orangepop3)                                           | _08_visuals.sass       | <div class="orange3">…</div>
.orange4                       | L5 | color: var(--orangepop4)                                           | _08_visuals.sass       | <div class="orange4">…</div>
.orange5                       | L5 | color: var(--orangepop5)                                           | _08_visuals.sass       | <div class="orange5">…</div>
.orange6                       | L5 | color: var(--orangepop6)                                           | _08_visuals.sass       | <div class="orange6">…</div>
.site-logomotif                | Custom | height: 48px; transform-origin: center center; transition: transform 210ms var(--transin2) | _09_own.sass           | <div class="site-logomotif">…</div>
.logotype                      | Custom | height: 28px                                                       | _09_own.sass           | <div class="logotype">…</div>
.project-circle                | Custom | border-radius: 24px; width: 16px; height: 16px                     | _09_own.sass           | <div class="project-circle">…</div>
.mascot                        | Custom | display: inline-block; position: relative; flex: none; …           | _09_own.sass           | <div class="mascot">…</div>
.mascot-bob                    | Custom | display: block                                                     | _09_own.sass           | <div class="mascot-bob">…</div>
.mascot-tilt                   | Custom | display: block                                                     | _09_own.sass           | <div class="mascot-tilt">…</div>
.mascot-bobs .mascot-bob       | Custom | animation: mascot-bob 3.6s ease-in-out infinite alternate          | _09_own.sass           | <div class="mascot-bobs"><div class="mascot-bob">…</div></div>
.mascot-base                   | Custom | display: block; user-select: none; -webkit-user-drag: none         | _09_own.sass           | <div class="mascot-base">…</div>
.mascot-overlay                | Custom | position: absolute; inset: 0; width: 100%; …                       | _09_own.sass           | <div class="mascot-overlay">…</div>
.mascot-mask                   | Custom | mask-type: alpha                                                   | _09_own.sass           | <div class="mascot-mask">…</div>
.mascot-pupil-l                | Custom | transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mas… | _09_own.sass           | <div class="mascot-pupil-l">…</div>
.mascot-pupil-r                | Custom | transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mas… | _09_own.sass           | <div class="mascot-pupil-r">…</div>
.mascot-gloss                  | Custom | opacity: 0.42; transform: translate(calc(var(--mascot-gx, 400) * 1px), calc(var(--ma… | _09_own.sass           | <div class="mascot-gloss">…</div>
.mascot-shade                  | Custom | opacity: 0.55; transform: translate(calc((1024 - var(--mascot-gx, 400)) * 1px), calc… | _09_own.sass           | <div class="mascot-shade">…</div>
.mascot-blinks .mascot-lid     | Custom | animation: mascot-blink 5.2s ease-in-out infinite                  | _09_own.sass           | <div class="mascot-blinks"><div class="mascot-lid">…</div></div>
.mascotgl                      | Custom | display: inline-block; position: relative; flex: none; …           | _09_own.sass           | <div class="mascotgl">…</div>
.mascotgl-spacer               | Custom | display: block                                                     | _09_own.sass           | <div class="mascotgl-spacer">…</div>
.mascotgl-canvas               | Custom | position: absolute; left: 50%; top: 50%; …                         | _09_own.sass           | <div class="mascotgl-canvas">…</div>
.mascotgl-ready                | Custom | opacity: 1                                                         | _09_own.sass           | <div class="mascotgl-ready">…</div>
.mascotgl-compact .mascotgl-canvas | Custom | width: 130%; height: 130%                                          | _09_own.sass           | <div class="mascotgl-compact"><div class="mascotgl-canvas">…</div></div>
.hero-name                     | Custom | font-weight: 800; font-size: calc(var(--text-5xl) * 2); letter-spacing: -0.2rem | _09_own.sass           | <div class="hero-name">…</div>
.accordion                     | Custom | display: flex; flex-direction: column; gap: var(--space-xs)        | _09_own.sass           | <div class="accordion">…</div>
.accordion-item                | Custom | border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-surface) | _09_own.sass           | <div class="accordion-item">…</div>
.accordion-content             | Custom | display: grid; grid-template-rows: 0fr; padding: 0; …              | _09_own.sass           | <div class="accordion-content">…</div>
.accordion-panel               | Custom | overflow: hidden; min-height: 0                                    | _09_own.sass           | <div class="accordion-panel">…</div>
.accordion-item.open .accordion-content | Custom | grid-template-rows: 1fr; padding: var(--space-xs)                  | _09_own.sass           | <div class="accordion-item open"><div class="accordion-content">…</div></div>
.accordion-trigger             | Custom | display: flex; flex-direction: row; align-items: center; …         | _09_own.sass           | <div class="accordion-trigger">…</div>
```

---

## Semantic Token Variables

Light values are the marker-free default; `[data-mode='dark']` remaps them via `=dark-theme-tokens`.

```css
  --white-fixed: #FFFFFF; /* light */
  --black-fixed: #171717; /* light */
  --bg: #ffffff; /* light */
  --bg-surface: #FBFBF9; /* light */
  --bg-panel: #FBFBF9; /* light */
  --bg-sunken: #F7F6F0; /* light */
  --bg-raised: #F4F4F5; /* light */
  --bg-extra: rgb(247, 248, 249); /* light */
  --bg-input: #f8f9fa; /* light */
  --bg-button: #CED8D3; /* light */
  --text-primary: #262627; /* light */
  --text-secondary: #777777; /* light */
  --text-muted: #a3a4a7; /* light */
  --text-inverse: #ffffff; /* light */
  --state-surface: #F2EFE9; /* light */
  --state-hover: #ECE7DF; /* light */
  --state-selected: #E4DFD5; /* light */
  --border: #d8d8d8; /* light */
  --border-subtle: #eceaea; /* light */
  --border-strong: #cfcfcf; /* light */
  --theme-color: #ff4400; /* light */
  --theme-color-alt: #be2f00; /* light */
  --theme-color-sub: #feb18a; /* light */
  --success: #10B981; /* light */
  --success-hover: #059669; /* light */
  --warning: #F59E0B; /* light */
  --warning-hover: #D97706; /* light */
  --danger: #bf2a2a; /* light */
  --danger-hover: #DC2626; /* light */
  --info: #3B82F6; /* light */
  --info-hover: #2563EB; /* light */
  --ring: rgba(0, 127, 78, 0.35); /* light */
  --shadow-color: 15 13 42; /* light */
  --shadow-rim: transparent; /* light */
  --shadow-xs: 0 1px 2px rgb(var(--shadow-color) / 0.14); /* light */
  --shadow-sm: 0 1px 2px rgb(var(--shadow-color) / 0.10), 0 2px 4px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-md: 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 8px 16px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-bs: 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-lg: 0 4px 8px rgb(var(--shadow-color) / 0.06), 0 12px 24px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-xl: 0 8px 16px rgb(var(--shadow-color) / 0.06), 0 20px 36px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-2xl: 0 12px 24px rgb(var(--shadow-color) / 0.06), 0 28px 48px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-3xl: 0 16px 32px rgb(var(--shadow-color) / 0.06), 0 36px 64px rgb(var(--shadow-color) / 0.06); /* light */
  --shadow-umbra: rgb(0 0 0 / 0.50); /* dark */
  --font-sans: "Timeless Sans", sans-serif; /* root */
  --timeless-sans: "Timeless Sans", sans-serif; /* root */
  --timeless-grotesk: "Timeless Grotesk", sans-serif; /* root */
  --text-scaling: 1.25; /* root */
  --text-xs: 0.67rem; /* root */
  --text-sm: 0.75rem; /* root */
  --text-md: 0.875rem; /* root */
  --text-bs: 1rem; /* root */
  --text-lg: calc(var(--text-bs) * var(--text-scaling)); /* root */
  --text-xl: calc(var(--text-lg) * var(--text-scaling)); /* root */
  --text-2xl: calc(var(--text-xl) * var(--text-scaling)); /* root */
  --text-3xl: calc(var(--text-2xl) * var(--text-scaling)); /* root */
  --text-4xl: calc(var(--text-3xl) * var(--text-scaling)); /* root */
  --text-5xl: calc(var(--text-4xl) * var(--text-scaling)); /* root */
  --unit-space: 0.25rem; /* root */
  --space-xs: var(--unit-space); /* root */
  --space-sm: calc(var(--unit-space) * 2); /* root */
  --space-md: calc(var(--unit-space) * 3); /* root */
  --space-bs: calc(var(--unit-space) * 4); /* root */
  --space-lg: calc(var(--unit-space) * 6); /* root */
  --space-xl: calc(var(--unit-space) * 8); /* root */
  --space-2xl: calc(var(--unit-space) * 12); /* root */
  --space-3xl: calc(var(--unit-space) * 16); /* root */
  --radius-xs: 2px; /* root */
  --radius-sm: 4px; /* root */
  --radius-md: 8px; /* root */
  --radius-bs: 16px; /* root */
  --radius-lg: 32px; /* root */
  --radius-full: 9999px; /* root */
  --control-h-sm: 21px; /* root */
  --control-h-bs: 32px; /* root */
  --control-h-lg: 38px; /* root */
  --avatar-size: 32px; /* root */
  --switch-w: 40px; /* root */
  --switch-h: 22px; /* root */
  --switch-thumb: 16px; /* root */
  --transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715); /* root */
  --transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190); /* root */
  --transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060); /* root */
  --transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000); /* root */
  --transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000); /* root */
  --transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000); /* root */
  --speed0: 50ms; /* root */
  --speed1: 90ms; /* root */
  --speed2: 140ms; /* root */
  --speed3: 220ms; /* root */
  --motionin1: var(--speed0) var(--transin1); /* root */
  --motionout1: var(--speed1) var(--transout1); /* root */
  --motionin2: var(--speed2) var(--transin2); /* root */
  --motionout2: var(--speed2) var(--transout2); /* root */
  --motionin3: var(--speed3) var(--transin3); /* root */
  --motionout3: var(--speed3) var(--transout3); /* root */
  --header-height: 64px; /* root */
  --footer-height: 32px; /* root */
  --fit-height: calc(var(--header-height) + var(--footer-height)); /* root */
  --prose-clamp: 65ch; /* root */
  --content-clamp: 1600px; /* root */
  --app-inline: var(--space-lg); /* root */
  --card-min: 240px; /* root */
  --height-sm: 16px; /* root */
  --height-md: 20px; /* root */
  --height-bs: 27px; /* root */
  --height-lg: 32px; /* root */
  --sidebar-width: 280px; /* root */
  --sidebar-width-left: 280px; /* root */
  --sidebar-width-right: 280px; /* root */
  --z-sticky: 100; /* root */
  --z-raised: 200; /* root */
  --z-modal: 300; /* root */
  --z-toast: 500; /* root */
  --greenpop1: #70e000; /* root */
  --greenpop2: #00df89; /* root */
  --greenpop3: #69ff97; /* root */
  --greenpop4: #00e676; /* root */
  --orangepop1: #ff7700; /* root */
  --orangepop2: #ff4400; /* root */
  --orangepop3: #ff0055; /* root */
  --orangepop4: #ff5e36; /* root */
  --orangepop5: #ff9966; /* root */
  --orangepop6: #ff9f1c; /* root */
  --shade-xs: var(--shadow-rim), 0 1px 1px rgb(var(--shadow-color) / 0.14), 0 0px 0px rgb(var(--shadow-color) / 0.00); /* root */
  --shade-sm: var(--shadow-rim), 0 1px 2px rgb(var(--shadow-color) / 0.12), 0 1px 3px rgb(var(--shadow-color) / 0.02); /* root */
  --shade-md: var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.09), 0 3px 6px rgb(var(--shadow-color) / 0.04); /* root */
  --shade-bs: var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06); /* root */
  --shade-lg: var(--shadow-rim), 0 4px 8px rgb(var(--shadow-color) / 0.04), 0 12px 24px rgb(var(--shadow-color) / 0.08); /* root */
  --shade-xl: var(--shadow-rim), 0 6px 12px rgb(var(--shadow-color) / 0.03), 0 20px 36px rgb(var(--shadow-color) / 0.09); /* root */
  --shade-2xl: var(--shadow-rim), 0 8px 16px rgb(var(--shadow-color) / 0.02), 0 28px 48px rgb(var(--shadow-color) / 0.09); /* root */
  --shade-3xl: var(--shadow-rim), 0 12px 24px rgb(var(--shadow-color) / 0.02), 0 36px 64px rgb(var(--shadow-color) / 0.08); /* root */
```
