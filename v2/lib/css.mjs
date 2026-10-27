// Inlines local `@import "file.css" layer(name);` rules at build time, so the
// browser gets one stylesheet while the source stays split by CUBE layer.
// An import with layer(name) is wrapped in `@layer name { ... }`.

import { readFileSync } from "node:fs";
import path from "node:path";

const IMPORT = /@import\s+(?:url\(\s*)?["']([^"']+)["']\s*\)?\s*(?:layer\(\s*([\w-]+)\s*\))?\s*;/g;

export function inlineImports(css, dir) {
	return css.replace(IMPORT, (_rule, file, layer) => {
		const full = path.join(dir, file);
		const body = inlineImports(readFileSync(full, "utf8"), path.dirname(full)).trim();
		return layer ? `@layer ${layer} {\n${body}\n}` : body;
	});
}
