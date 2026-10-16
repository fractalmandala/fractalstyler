// =============================================================================
// Registry loader — the source of truth for every class and token check.
//
// Reads registry.json and pairs it with compiled stylesheet verification
// so loop-generated wildcard families (.gap-*, .pad-*, .radius-*) and exact
// selectors are both known without guesswork.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import * as sass from 'sass';

/** A registry.json row in the flat array format (what scripts/update-registry emits). */
interface RegistryRow {
	class?: string;
	layer?: string;
	file?: string;
}

/** The layered registry format: { layers: [{ id, file, items }] }. */
interface RegistryLayer {
	id: string;
	file?: string;
	items?: { kind: string; name: string }[];
}

export interface LoadedRegistry {
	classes: Set<string>;
	tokens: Set<string>;
	ownLayerClasses: Set<string>;
	layerIds: Set<string>;
	layerOf: Map<string, string>;
	fileOfLayer: Map<string, string>;
	stems: string[];
}

/**
 * Loads the style registry for verification.
 * @param rootDir Root of the fractalstyler package or consumer project.
 * @param registryPath Path to registry.json override.
 */
export function loadRegistry(rootDir: string, registryPath?: string | null): LoadedRegistry {
	const defaultRegistry = path.join(rootDir, 'registry.json');
	const regFile = registryPath || (fs.existsSync(defaultRegistry) ? defaultRegistry : path.join(rootDir, 'src', 'lib', 'data', 'registry.json'));

	if (!fs.existsSync(regFile)) {
		throw new Error(`registry.json not found at ${regFile} — run "pnpm registry" first.`);
	}

	const data: RegistryRow[] | { layers?: RegistryLayer[] } = JSON.parse(fs.readFileSync(regFile, 'utf8'));
	const classes = new Set<string>();
	const tokens = new Set<string>();
	const ownLayerClasses = new Set<string>();
	const layerIds = new Set<string>();
	const layerOf = new Map<string, string>();
	const fileOfLayer = new Map<string, string>();
	const stems: string[] = [];

	// 1. Process registry.json (handles both array format and { layers: [...] } format)
	if (Array.isArray(data)) {
		for (const entry of data) {
			const rawClass = (entry.class || '').replace(/^\./, '').trim();
			if (!rawClass) continue;

			if (rawClass.includes('*')) {
				stems.push(rawClass.replace(/\*.*$/, ''));
			} else {
				classes.add(rawClass);
			}

			const layer = entry.layer || 'L0';
			layerIds.add(layer);
			layerOf.set(rawClass, layer);
			if (entry.file) fileOfLayer.set(layer, entry.file);

			if (layer.toLowerCase().includes('own') || (entry.file && entry.file.includes('own'))) {
				ownLayerClasses.add(rawClass);
			}
		}
	} else if (data.layers && Array.isArray(data.layers)) {
		for (const layer of data.layers) {
			const isOwn = /own/i.test(layer.id || '') || /own/i.test(layer.file || '');
			layerIds.add(layer.id);
			if (!fileOfLayer.has(layer.id)) fileOfLayer.set(layer.id, layer.file || layer.id);

			for (const item of layer.items || []) {
				if (item.kind === 'class') {
					const name = item.name.replace(/^\./, '');
					if (name.includes('*')) {
						stems.push(name.replace(/\*.*$/, ''));
					} else {
						classes.add(name);
					}
					if (!layerOf.has(name)) layerOf.set(name, layer.id);
					if (isOwn) ownLayerClasses.add(name);
				} else if (item.kind === 'token') {
					tokens.add(item.name);
				}
			}
		}
	}

	// 2. Also harvest compiled stylesheet if index.sass exists (for exact wildcard matches)
	const indexSass = path.join(rootDir, 'src', 'lib', 'styles', 'index.sass');
	if (fs.existsSync(indexSass)) {
		try {
			const compiled = sass.compile(indexSass, { style: 'expanded' }).css;
			for (const m of compiled.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
				classes.add(m[1]);
			}
			for (const m of compiled.matchAll(/(--[a-zA-Z0-9_-]+):/g)) {
				tokens.add(m[1]);
			}
		} catch (e) {
			// If standalone compile fails in consumer mode, fallback to registry.json
		}
	}

	// 3. Fallback token extraction from _00_tokens.sass if tokens set is empty
	if (tokens.size === 0) {
		const tokenFile = path.join(rootDir, 'src', 'lib', 'styles', '_00_tokens.sass');
		if (fs.existsSync(tokenFile)) {
			const tokenContent = fs.readFileSync(tokenFile, 'utf8');
			for (const m of tokenContent.matchAll(/(--[a-zA-Z0-9_-]+):/g)) {
				tokens.add(m[1]);
			}
		}
	}

	return { classes, tokens, ownLayerClasses, layerIds, layerOf, fileOfLayer, stems };
}
