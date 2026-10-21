import {
	presetApplication,
	VARIANTS,
	SHAPES,
	SIZES,
	PADS,
	VARIANT_TARGETS,
	SHAPE_TARGETS,
	SIZE_TARGETS,
	PAD_TARGETS,
	type DataShape,
	type DataSize,
	type DataVariant,
	type DataPad
} from '$lib/types.js';

const STORAGE_KEY = 'fractalstyler:presets';

// Default variant, and the value the variant preset starts from. Written to
// elements that do not declare their own data-variant, so an unstyled
// element still lands on a real paint rather than no paint at all.
const DEFAULT_VARIANT: DataVariant = 'primary';

// Every axis is class-qualified. `_10_propped.sass` defines the axes as
// standalone classes — `.el-variants`, `.el-shape`, `.el-size`, `.el-pad` —
// and each one answers its `data-*` attribute. An element opts into an axis by
// carrying that class; the element name is never the qualifier. A bare
// <button> or <input> therefore stays unstyled by design, and stamping a
// variant on it would invent styling the markup never asked for.
//
// The four target lists come from `types.ts` so the runtime and the type
// contract cannot drift apart.

// The pad axis has its own class, so a card that carries `.el-pad` is the only
// thing the pad sweep can reach.
export { VARIANT_TARGETS, SHAPE_TARGETS, SIZE_TARGETS, PAD_TARGETS };

type Applied = { size?: string; shape?: string; variant?: string; pad?: string };

export class PresetState {
	size = $state<DataSize>('bs');
	shape = $state<DataShape>('modern');
    pad = $state<DataPad>('md')
    variant = $state<DataVariant>(DEFAULT_VARIANT);
	initialized = $state(false);
	#observer: MutationObserver | undefined;
	#applied = new WeakMap<Element, Applied>();

	init() {
		if (this.initialized || typeof window === 'undefined') return;
		this.initialized = true;
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
			if (SIZES.includes(saved.size)) this.size = saved.size;
			if (SHAPES.includes(saved.shape)) this.shape = saved.shape;
            if (PADS.includes(saved.pad)) this.pad = saved.pad
            if (VARIANTS.includes(saved.variant)) this.variant = saved.variant
		} catch {
			// Invalid or unavailable storage falls back to the built-in defaults.
		}
		this.apply();
		this.#observer = new MutationObserver(() => this.apply());
		this.#observer.observe(document.documentElement, { childList: true, subtree: true });
	}

	setSize(size: DataSize) {
		this.size = size;
		this.persist();
		this.apply();
	}

	setShape(shape: DataShape) {
		this.shape = shape;
		this.persist();
		this.apply();
	}

    setPad(pad: DataPad) {
        this.pad = pad;
        this.persist();
        this.apply();
    }

    setVariant(variant: DataVariant) {
        this.variant = variant;
        this.persist();
        this.apply();
    }

	reset() {
		this.size = 'bs';
		this.shape = 'modern';
        this.pad = 'md';
        this.variant = DEFAULT_VARIANT;
		this.persist();
		this.apply();
	}

	private persist() {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ size: this.size, shape: this.shape, pad: this.pad, variant: this.variant }));
		} catch {}
	}

	// Removes only the attributes this system added. Attributes that the markup
	// declared itself were never recorded, so they are never removed.
	private clearApplied() {
		for (const selector of presetApplication) {
			for (const element of document.querySelectorAll(selector)) {
				const applied = this.#applied.get(element);
				if (!applied) continue;
				if (applied.size && element.getAttribute('data-size') === applied.size) element.removeAttribute('data-size');
				if (applied.shape && element.getAttribute('data-shape') === applied.shape) element.removeAttribute('data-shape');
				if (applied.variant && element.getAttribute('data-variant') === applied.variant) element.removeAttribute('data-variant');
				if (applied.pad && element.getAttribute('data-pad') === applied.pad) element.removeAttribute('data-pad');
				this.#applied.delete(element);
			}
		}
	}

	private apply() {
		if (typeof document === 'undefined') return;
		this.clearApplied();
		this.sweep('data-variant', VARIANT_TARGETS, this.variant, 'variant');
		this.sweep('data-shape', SHAPE_TARGETS, this.shape, 'shape');
		this.sweep('data-size', SIZE_TARGETS, this.size, 'size');
		this.sweep('data-pad', PAD_TARGETS, this.pad, 'pad');
	}

	// One axis, one target list. Markup that declares its own attribute always
	// wins — the sweep only fills in what is missing.
	private sweep(attribute: string, selector: string, value: string, key: keyof Applied) {
		for (const element of document.querySelectorAll(selector)) {
			if (element.hasAttribute(attribute)) continue;
			element.setAttribute(attribute, value);
			const applied: Applied = this.#applied.get(element) ?? {};
			applied[key] = value;
			this.#applied.set(element, applied);
		}
	}
}

export const presetState = new PresetState();

// Free-function façade over `presetState`, so consumers can drive the presets
// without ever mounting `PresetControls.svelte`.
//
// Each entry point calls `init()` first. Without it the sweep would run once and
// then never again — the MutationObserver that re-applies on new markup lives in
// `init()`. `init()` is idempotent, so calling it up front is free, and it also
// guarantees stored values are hydrated before your value is applied on top.
export function initPresets() {
	presetState.init();
}

export function setPresetSize(size: DataSize) {
	presetState.init();
	presetState.setSize(size);
}

export function setPresetShape(shape: DataShape) {
	presetState.init();
	presetState.setShape(shape);
}

export function setPresetPad(pad: DataPad) {
	presetState.init();
	presetState.setPad(pad);
}

export function setPresetVariant(variant: DataVariant) {
	presetState.init();
	presetState.setVariant(variant);
}

export function resetPresets() {
	presetState.init();
	presetState.reset();
}
