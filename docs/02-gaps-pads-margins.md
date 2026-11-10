---
title: Gaps, Pads, Margins
description: Explains the classes and tokens for setting gaps, padding, and margin. Complement documentation for the gaps-pads-margins css file.
id: 2
---

This document explains the `gaps-pads-margins.css` file, which sets classes and tokens for gaps, padding, and margins in Fractalstyler. The properties these set are:

- gap
- row-gap
- column-gap
- padding
- padding-left
- padding-top
- padding-right
- padding-bottom
- padding-inline
- padding-block
- margin
- margin-left
- margin-top
- margin-right
- margin-bottom
- margin-inline
- margin-block

All classes are set using the `--space-*` tokens. Changing the values of these tokens changes values for all classes in gaps-pads-margins.css. Defaults:

| Token | Value |
|:--|:--|
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.50rem |
| `--space-md` | 0.75rem |
| `--space-bs` | 1.00rem |
| `--space-lg` | 1.50rem |
| `--space-xl` | 2.00rem |
| `--space-2xl` | 3.00rem |
| `--space-3xl` | 4.00rem |

## Gaps

Gap classes are `gap-*`, `rgap-*` and `cgap-*`, where `*` represents affixes from `xs` to `3xl` - xs, sm, md, bs, lg, xl, 2xl, 3xl.
`gap-*` sets column-gap and row-gap together, `rgap-*` sets row-gap, `cgap-*` sets column-gap.
Examples: `gap-bs`, `rgap-lg`, `rgap-bs cgap-sm`

3 class groups x 8 size steps = 24 classes.

## Padding

Padding classes are `pad-*`, `px-*`, `py-*`, `pl-*`, `pt-*`, `pr-*`, `pb-*`, with the step affixes.
`pad-*` sets padding, `px-*` sets padding-inline, `py-*` sets padding-block, `pl-*` sets padding-left, `pt-*` sets padding-top, `pr-*` sets padding-right, `pb-*` sets padding-bottom.

7 class groups x 8 size steps = 56 classes.

## Margin

Margins work in the same way as padding, using the classes `mar-*`, `mx-*`, `my-*`, `ml-*`, `mt-*`, `mr-*`, `mb-*`. 7 class groups x 8 size steps = 56 classes.

## Using Tokens Directly

When defining classes, to set the properties covered by these classes, use the `--space-*` tokens directly, ex -

```css
.hero-card {
	padding-inline: var(--space-xl);
}
```

*- for layout classes (flex, grid, positioning), see [Containers](./04-containers.md).
