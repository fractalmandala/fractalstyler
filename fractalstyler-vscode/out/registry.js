"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRegistry = void 0;
exports.tokenFor = tokenFor;
exports.findRegistryUpward = findRegistryUpward;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Reduce a registry selector to a class-attribute token, or null when the
 * selector is not something you would ever type in a class attribute.
 *
 *   .card                              -> card
 *   .gap-xs                            -> gap-xs
 *   .row.xcenter                       -> xcenter        (modifier of .row)
 *   a.btn                              -> btn            (element + class)
 *   button                             -> null           (bare element)
 *   .card[data-variant="primary"]      -> null           (attribute variant)
 *   .app-shell.open .sidebar-left      -> null           (compound/descendant)
 */
function tokenFor(selector) {
    // Descendant or compound chains ("A B") are never a single class token.
    if (/\s/.test(selector)) {
        return null;
    }
    // Attribute variants are set by the presets, not typed.
    if (selector.includes('[')) {
        return null;
    }
    // Pseudo-classes/states carry no completion value.
    if (selector.includes(':')) {
        return null;
    }
    const parts = selector.split('.');
    // Drop the first segment: it is '' for a pure class, or an element name for
    // `a.btn` / `button.icon` / `button`.
    const classes = parts.slice(1);
    if (classes.length === 0) {
        // Bare element like `button`.
        return null;
    }
    // `.row.xcenter`, `button.icon`, `a.primary.modern` — the trailing segment is
    // what you type last and what a user means to reach for.
    return classes[classes.length - 1];
}
/** Layer label -> human reading, for the completion detail. */
function layerName(layer) {
    const map = {
        L0: 'L0 tokens & base',
        L1: 'L1 dimensions',
        L2: 'L2 containers',
        L3: 'L3 layouts',
        L4: 'L4 shells',
        L5: 'L5 visuals & interactions',
        Custom: 'custom'
    };
    return map[layer] ?? layer;
}
/**
 * Walk up from the styles folder looking for registry.json. Covers the three
 * layouts we care about:
 *   src/lib/styles              -> up 3 = package root
 *   node_modules/@fractaldesign/fractalstyler/dist/styles -> up 2 = pkg root
 *   an ejected copy              -> project root, if the user regenerated it
 */
function findRegistryUpward(dir) {
    let current = dir;
    for (let depth = 0; depth < 5 && current; depth++) {
        const candidate = path.join(current, 'registry.json');
        if (fs.existsSync(candidate)) {
            return candidate;
        }
        const parent = path.dirname(current);
        if (parent === current) {
            break;
        }
        current = parent;
    }
    return null;
}
class ClassRegistry {
    entries = new Map();
    loadedFrom = '';
    classCount = 0;
    /** Where the registry was read from — shown in the hover/status. */
    get source() {
        return this.loadedFrom;
    }
    get size() {
        return this.classCount;
    }
    all() {
        return [...this.entries.values()];
    }
    get(name) {
        return this.entries.get(name);
    }
    has(name) {
        return this.entries.has(name);
    }
    /**
     * Load the registry, preferring a project-local copy over the bundled one.
     *
     * The bundled copy is refreshed by `npm run sync:registry` at release time,
     * so it is correct for the package version the user installed. A registry.json
     * found next to the project's styles folder is newer still (an ejected copy
     * being edited in place) and wins.
     */
    load(extensionUri, stylesDir) {
        const local = stylesDir ? findRegistryUpward(stylesDir) : null;
        const bundled = path.join(extensionUri.fsPath, 'media', 'registry.json');
        const chosen = local ?? (fs.existsSync(bundled) ? bundled : null);
        if (!chosen) {
            return false;
        }
        try {
            const rows = JSON.parse(fs.readFileSync(chosen, 'utf8'));
            this.ingest(Array.isArray(rows) ? rows : []);
            this.loadedFrom = local ? `${chosen} (project)` : `${chosen} (bundled)`;
            return true;
        }
        catch {
            return false;
        }
    }
    ingest(rows) {
        this.entries.clear();
        this.classCount = 0;
        for (const row of rows) {
            const selector = row?.class ?? '';
            const token = tokenFor(selector);
            if (!token) {
                continue;
            }
            const description = row?.description ?? '';
            // The registry falls back to echoing the first declaration when a class
            // has no `// description` comment — that is not worth showing on hover.
            const useful = description && description !== row?.property && !/^\s*[a-z-]+:/.test(description)
                ? description
                : '';
            const entry = {
                name: token,
                selector,
                kind: row?.kind ?? 'class',
                layer: row?.layer ?? '',
                file: row?.file ?? '',
                property: row?.property ?? '',
                description: useful,
                example: row?.example ?? ''
            };
            const existing = this.entries.get(token);
            // Keep the richest row: one with a real description wins.
            if (!existing || (!existing.description && entry.description)) {
                this.entries.set(token, entry);
            }
        }
        this.classCount = this.entries.size;
    }
}
exports.ClassRegistry = ClassRegistry;
//# sourceMappingURL=registry.js.map