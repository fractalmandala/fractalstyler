import { presetApplication, VARIANTS, SHAPES, SIZES, PADS, type DataShape, type DataSize, type DataVariant, type DataPad } from '$lib/libTypes.js';

const STORAGE_KEY = 'fractalstyler:presets';

// Default variant, and the value the variant preset starts from. Written to
// form controls that do not declare their own data-variant, so an unstyled
// control still lands on a real paint rather than no paint at all.
const DEFAULT_VARIANT: DataVariant = 'primary';

// The variant axis is class-qualified, not element-qualified: only controls
// that opted into the system's own class receive a variant. Bare <input>,
// <select> and <button> are left alone — they are unstyled by design, and
// stamping a variant on them would silently invent styling the markup never
// asked for.
//
// NOTE: `button.button` requires class="button". This system styles buttons on
// the bare element, and `.button` is not a standalone class — it exists only as
// a grouping hook inside `.button-group`. See the note in README §4.
const VARIANT_TARGETS = 'input.input, select.select, button.button, a.btn';

// Only `.card` consumes `data-pad` (see `.card[data-pad]` in _04_containers.sass).
// The pad preset is therefore written to cards alone, so a global sweep can never
// stamp `data-pad` onto buttons, inputs or selects that have no rule to answer it.
const PAD_TARGETS = '.card';

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
		for (const selector of presetApplication) {
			for (const element of document.querySelectorAll(selector)) {
				const applied: Applied = this.#applied.get(element) ?? {};
				if (!element.hasAttribute('data-size')) {
					element.setAttribute('data-size', this.size);
					applied.size = this.size;
				}
				if (!element.hasAttribute('data-shape')) {
					element.setAttribute('data-shape', this.shape);
					applied.shape = this.shape;
				}
				// Card-only axis: markup that declares its own data-pad always wins.
				if (element.matches(PAD_TARGETS) && !element.hasAttribute('data-pad')) {
					element.setAttribute('data-pad', this.pad);
					applied.pad = this.pad;
				}
				if (element.matches(VARIANT_TARGETS) && !element.hasAttribute('data-variant')) {
					element.setAttribute('data-variant', this.variant);
					applied.variant = this.variant;
				}
				if (applied.size || applied.shape || applied.pad || applied.variant) this.#applied.set(element, applied);
			}
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
