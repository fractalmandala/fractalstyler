// Single source of truth for Fractalstyler and Fractalsvelte UI props and variants


export const union = (values: readonly string[]): string =>
	values.map((v) => `'${v}'`).join(' | ');

// Used inline as `data-variant=`. The set is the one `_10_propped.sass` paints —
// a variant with no rule is a dead option in every picker.
export const VARIANTS = [
	'primary',
	'secondary',
	'themed',
	'outline',
	'ghost',
	'link',
	'icon',
] as const;
export type Variant = (typeof VARIANTS)[number];

// inline as `data-size=`
export const SIZES = ['sm', 'md', 'bs', 'lg', 'xl'] as const;
export type Size = (typeof SIZES)[number];

// inline as `data-shape=`
export const SHAPES = ['square', 'min', 'modern', 'curved', 'round'] as const;
export type Shape = (typeof SHAPES)[number];

// data-intent
export const INTENTS = ['info', 'success', 'warning', 'danger'] as const;
export type Intent = (typeof INTENTS)[number];

// data-action
export const ACTIONS = ['button', 'submit', 'reset'] as const;
export type Action = (typeof ACTIONS)[number];

// data-orientation
export const ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

// data-placements
export const PLACEMENTS = [
	'top',
	'top-start',
	'top-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'left-start',
	'left-end',
	'right',
	'right-start',
	'right-end'
] as const;
export type Placement = (typeof PLACEMENTS)[number];

// Alignment options
export const ALIGNS = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
export type Align = (typeof ALIGNS)[number];

// Justify options
export const JUSTIFIES = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
export type Justify = (typeof JUSTIFIES)[number];

// Spacing token scale
export const SPACES = ['none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type Space = (typeof SPACES)[number];

// Animation speed presets
export const SPEEDS = ['fast', 'normal', 'slow'] as const;
export type Speed = (typeof SPEEDS)[number];

// Shadow presets
export const SHADOWS = [ 'sm', 'bs', 'lg', 'xl', '2xl' ];
export type Shadow = (typeof SHADOWS)[number];

// padding
export const PADS = ["sm", 'md', 'bs', 'lg', 'xl'] as const;
export type Pad = (typeof PADS)[number];

// The `data-*` aliases the public API has always shipped under.
export type DataVariant = Variant;
export type DataSize = Size;
export type DataShape = Shape;
export type DataPad = Pad;

// The axes are class-qualified: an element opts into an axis by carrying the
// matching class from `_10_propped.sass`, and the preset runtime then writes
// the `data-*` value onto it. The element itself is not the qualifier.
export const VARIANT_TARGETS = '.el-variants';
export const SHAPE_TARGETS = '.el-shape';
export const SIZE_TARGETS = '.el-size';
export const PAD_TARGETS = '.el-pad';

export const presetApplication = [
	VARIANT_TARGETS,
	SHAPE_TARGETS,
	SIZE_TARGETS,
	PAD_TARGETS
] as const;

// Full theme tokens contract
export interface DesignTokens {
	// Backgrounds
	'--bg': string;
	'--bg-surface': string;
	'--bg-panel': string;
	'--bg-sunken': string;
	'--bg-raised': string;
	'--bg-extra': string;
	'--bg-input': string;
	'--bg-button': string;
	'--state-surface': string;
	'--state-hover': string;
	'--state-selected': string;

	// Typography
	'--text-primary': string;
	'--text-secondary': string;
	'--text-muted': string;
	'--text-inverse': string;

	// Borders & Rings
	'--border': string;
	'--border-subtle': string;
	'--border-strong': string;
	'--ring': string;

	// Brand / Primary
	'--theme-color': string;
	'--theme-color-alt': string;
	'--theme-color-sub': string;

	// Semantic Intents
	'--success': string;
	'--success-bg': string;
	'--success-text': string;
	'--warning': string;
	'--warning-bg': string;
	'--warning-text': string;
	'--danger': string;
	'--danger-bg': string;
	'--danger-text': string;
	'--info': string;
	'--info-bg': string;
	'--info-text': string;

	// Corner Radii
	'--radius-xs': string;
	'--radius-sm': string;
	'--radius-md': string;
	'--radius-bs': string;
	'--radius-lg': string;
	'--radius-full': string;

	// Shadows
	'--shadow-xs': string;
	'--shadow-sm': string;
	'--shadow-md': string;
	'--shadow-bs': string;
	'--shadow-lg': string;
	'--shadow-xl': string;
	'--shadow-2xl': string;
	'--shadow-3xl': string;

	// Heights
	'--height-xs': string;
	'--height-sm': string;
	'--height-md': string;
	'--height-bs': string;
	'--height-lg': string;
	'--height-xl': string;

	// Duration
	'--duration-sm': string;
	'--duration-md': string;
	'--duration-bs': string;
	'--duration-lg': string;

	// Easing
	'--transin1': string;
	'--transin2': string;
	'--transin3': string;
	'--transout1': string;
	'--transout2': string;
	'--transout3': string;

	// Dimensions
	'--header-height': string;
	'--footer-height': string;
	'--sidebar-width-left': string;
	'--sidebar-width-right': string;
	'--prose-clamp': string;

	'--text-xs': string;
	'--text-sm': string;
	'--text-md': string;
	'--text-bs': string;
	'--text-lg': string;
	'--text-xl': string;
	'--text-2xl': string;
	'--text-3xl': string;
	'--text-4xl': string;
	'--text-5xl': string;

	'--unit-space': string;
	'--space-xs': string;
	'--space-sm': string;
	'--space-md': string;
	'--space-bs': string;
	'--space-lg': string;
	'--space-xl': string;
	'--space-2xl': string;
	'--space-3xl': string;
}

/** The token contract under the name the package has always exported. */
export type FractalTokens = DesignTokens;
