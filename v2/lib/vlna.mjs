// Czech "vlna": a non-breaking space after a one-letter preposition or
// conjunction, so it never ends a line on its own ("v lese" -> "v lese").
// Named after the TeX tool by Petr Olšák that does the same.
//
// Works on plain text and on HTML: only text between tags is touched, and
// nothing inside <script>, <style>, <pre>, <code> or <textarea>.

const NBSP = " ";

// A one-letter word (any case) at the start of the text or after whitespace or
// an opening bracket or quote, followed by ordinary whitespace.
const ONE_LETTER = /(?<=^|[\s (\[{„‚“‘"'])([ksvzouai])[ \t\r\n]+/giu;

const SKIP_TAG = /^<(script|style|pre|code|textarea)\b/i;

export function vlnaText(text) {
	return text.replace(ONE_LETTER, `$1${NBSP}`);
}

export function vlna(input) {
	if (input === undefined || input === null) return input;
	const parts = String(input).split(/(<[^>]*>)/);
	let skipping = null;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const isTag = i % 2 === 1;
		if (isTag) {
			if (skipping) {
				if (new RegExp(`^</${skipping}\\s*>`, "i").test(part)) skipping = null;
			} else {
				const match = SKIP_TAG.exec(part);
				if (match && !part.endsWith("/>")) skipping = match[1].toLowerCase();
			}
		} else if (!skipping && part) {
			parts[i] = vlnaText(part);
		}
	}
	return parts.join("");
}

// Applies vlna to a whole HTML document when its root element is Czech.
export function vlnaDocument(html) {
	return /<html[^>]*\slang="cs"/i.test(html) ? vlna(html) : html;
}
