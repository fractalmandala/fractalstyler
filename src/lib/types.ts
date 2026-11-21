export const VARIANTS = [
	'primary',
	'secondary',
	'themed',
	'outline',
	'ghost',
	'link',
	'info',
	'success',
	'warning',
	'danger',
	'neutral',
] as const;
export type Variant = (typeof VARIANTS)[number];

export const STEPS = ['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
export type Step = (typeof STEPS)[number];

export const SIZES = ['h-xs', 'h-sm', 'h-md', 'h-bs', 'h-lg', 'h-xl', 'h-2xl', 'h-3xl'] as const;
export type Size = (typeof SIZES)[number];
export const defaultSize: Size = 'h-lg';

export const GAPS = ['gap-xs', 'gap-sm', 'gap-md', 'gap-bs', 'gap-lg', 'gap-xl', 'gap-2xl', 'gap-3xl'] as const;
export type Gap = (typeof GAPS)[number];
export const defaultGap: Gap = 'gap-bs';

export const SHAPES = ['rect', 'mincurved', 'modern', 'curved', 'round'] as const;
export type Shape = (typeof SHAPES)[number];

export const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
export type Tone = (typeof TONES)[number];

export const MEASURES = ['measure-xs', 'measure-sm', 'measure-md', 'measure-bs', 'measure-lg', 'measure-xl', 'measure-2xl', 'measure-3xl', 'measure-4xl', 'measure-full'] as const;
export type Measure = (typeof MEASURES)[number];

export const WIDTHS = ['width-xs', 'width-sm', 'width-md', 'width-bs', 'width-lg', 'width-xl', 'width-2xl', 'width-3xl', 'width-4xl', 'width-full'] as const;
export type Width = (typeof WIDTHS)[number];

export const ALIGNS = ['left', 'center', 'right', 'between'] as const;
export type Align = (typeof ALIGNS)[number];

export const DENSITIES = ['compact', 'cozy', 'comfortable'] as const;
export type Density = (typeof DENSITIES)[number];

export const MOTIONS = ['off', 'calm', 'playful'] as const;
export type Motion = (typeof MOTIONS)[number];

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

export const SURFACES = [
	'elevated',
	'outlined',
	'vacant',
	'overlayed',
	'paneled',
	'glass'
] as const;
export type Surface = (typeof SURFACES)[number];

export const PADS = [ 'pad-xs', 'pad-sm', 'pad-md', 'pad-bs', 'pad-lg', 'pad-xl', 'pad-2xl'] as const;
export type Pad = (typeof PADS)[number];

export const ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export const TEXTSIZES = [
	'text-xs',
	'text-sm',
	'text-md',
	'text-bs',
	'text-lg',
	'text-xl',
	'text-2xl',
	'text-3xl'
] as const;
export type TextSize = (typeof TEXTSIZES)[number];