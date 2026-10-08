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
	'iconbox',
	'icon-sm',
	'icon-md',
	'icon-bs',
	'icon-lg'
] as const;
export type DataVariant = (typeof VARIANTS)[number];

export const SIZES = ['sm', 'md', 'bs', 'lg'] as const;
export type DataSize = (typeof SIZES)[number];

export const SHAPES = ['square', 'modern', 'curved', 'round'] as const;
export type DataShape = (typeof SHAPES)[number];

export const ALERTVARIANTS = ['info', 'success', 'warning', 'danger'] as const;
export type AlertVariant = (typeof ALERTVARIANTS)[number];