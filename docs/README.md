# Fractalstyler Docs

Per-file documentation for the CSS in `src/lib/styles/`. Each doc maps 1:1 to a stylesheet. **New here? Read [Introduction](./introduction.md) first.**

- [Introduction](./introduction.md) - mental model, usage patterns, rules, dos and don'ts, keeping it lean

- [Configurations](./01-configurations.md) - global tokens (layout dims, z-index, fonts, motion channels, theme axes) and base resets
- [Springs](./01b-springs.md) - generated spring easing tokens (`springs.css`)
- [Gaps, Pads, Margins](./02-gaps-pads-margins.md) - the `--space-*` family: gap/padding/margin classes
- [Shapes and Sizes](./03-shapes-sizes.md) - radius and height tokens, fitment classes, the measure ladder
- [Containers](./04-containers.md) - flex/grid layouts, positioning, scrolling, aspect frames
- [Typography](./05-typography.md) - text size scales, semantic text classes, prose content, modifiers
- [Borders, Elevation and Focus](./06-border-elevation-focus.md) - border sides, shadow elevation classes, focus rings, glass, rim, glow
- [Layout Shell](./07-layout-shell.md) - app chrome: header, main, sidebars, footer, content widths, overlays
- [Colors and Themes](./08-colors-themes.md) - parametric colour recipe, light/dark modes, named palettes, status colors, and the `colorpacks.css` palettes
- [Motion and Animation](./09-motion-animation.md) - easing/speed tokens, springs, enter/pop, keyframe animations, view transitions
- [Components](./10-components.md) - buttons, inputs, links, avatars, tags, switches, checkboxes
- [Component Props](./11-component-props.md) - variant classes, control parts and tones consumed by Fractalsvelte UI components
- [Responsive](./12-responsive.md) - breakpoint bands and show/hide visibility classes
- [Custom](./13-custom.md) - the site-specific branding layer (example slot)
- [Modular](./15-modular.md) - the sveltemodular workspace chrome (a consumer of the system, not part of it)
- [Layout](./16-layout.md) - the Svelte components that render the application shell, and the layout state that fills it

Also: [registry.md](../registry.md) — the generated class API index, at the package root.

And for the people who change it: [Development](./14-development.md) — the scripts, the CLI, the linter and the MCP server.
