// Single source of truth for component prop unions.
//
// Every union is declared as a runtime `as const` array first and the type is
// derived from it. That matters because TypeScript types are erased: a demo
// that needs to *enumerate* a union's members at runtime (option pickers, "show
// all variants" grids) otherwise has to re-list the members by hand and silently
// drifts when the union changes. With this shape there is exactly one list, and
// it serves the compiler and the browser alike.
//
// Convention: `export const XS = [...] as const; export type X = (typeof XS)[number];`
// Consumers that only need the type should still `import type { X }` from here —
// never redeclare the union locally.

/**
 * Formats a values array as a documentation union string — `'a' | 'b'`.
 * Used by the catalogue so a prop's documented type expands from the same array
 * the type is derived from, instead of being hand-copied.
 */
export const union = (values: readonly string[]): string => values.map((value) => `'${value}'`).join(' | ');

// Base Element Look Variant
export const VARIANTS = [
	'primary',
	'secondary',
	'soft',
	'outline',
	'ghost',
	'link',
	'destructive',
	'icon',
	'iconbox'
] as const;
export type DataVariant = (typeof VARIANTS)[number];

export const SIZES = ['sm', 'md', 'bs', 'lg'] as const;
export type DataSize = (typeof SIZES)[number];

export const SHAPES = ['square', 'modern', 'curved', 'round'] as const;
export type DataShape = (typeof SHAPES)[number];

export const ALERTVARIANTS = ['info', 'success', 'warning', 'danger'] as const;
export type AlertVariant = (typeof ALERTVARIANTS)[number];

export const PADS = ["sm", 'md', 'bs', 'lg', 'xl'] as const;
export type DataPad = (typeof PADS)[number];

export const presetApplication = [
	'button', 'input', 'select', 'input.input', 'select.select', '.card', 'a.btn'
] as const;

export interface FractalTokens {
	"bg": string;
	"bg-surface": string;
	"bg-panel": string;
	"bg-sunken": string;
	"bg-raised": string;
	"bg-extra": string;
	"bg-input": string;
	"bg-button": string;
	"text-primary": string;
	"text-secondary": string;
	"text-muted": string;
	"text-inverse": string;
	"state-surface": string;
	"state-hover": string;
	"state-selected": string;
	"border": string;
	"border-subtle": string;
	"border-strong": string;
	"theme-color": string;
	"theme-color-alt": string;
	"theme-color-sub": string;
	"ring": string;
	"white-fixed": string;
	"black-fixed": string;
	"danger": string;
	"danger-hover": string;
	"success": string;
	"success-hover": string;
	"info": string;
	"info-hover": string;
	"warning": string;
	"warning-hover": string;
}