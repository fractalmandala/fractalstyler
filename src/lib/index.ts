/**
 * fractalstyler — canonical styling system.
 * The class registry is the public API: compose in markup, write no stylesheet.
 *
 * The stylesheet itself is not imported here: add `@use '@fractaldesign/fractalstyler/styles'`
 * (or `import '@fractaldesign/fractalstyler/css'`) once in your entry file.
 */
export const name = 'fractalstyler';
export const version = '1.1.0';

// Global component presets — the optional runtime layer. Import the functions to
// drive presets from your own code, or mount `PresetControls` for ready-made pickers.
//   import { setPresetSize, PresetControls } from '@fractaldesign/fractalstyler';
export { default as PresetControls } from './ui/PresetControls.svelte';
export {
	presetState,
	initPresets,
	setPresetSize,
	setPresetShape,
	setPresetPad,
	setPresetVariant,
	resetPresets,
	type PresetState
} from './presets.svelte.js';

// The unions the presets are drawn from, so consumers can build their own pickers
// without re-listing values that the registry already owns.
export { SIZES, SHAPES, VARIANTS, PADS, union } from './libTypes.js';
export type { DataSize, DataShape, DataVariant, DataPad, FractalTokens } from './libTypes.js';