import { describe, expect, it } from "vitest";
import { vlna, vlnaDocument } from "../lib/vlna.mjs";

const NBSP = " ";
const show = (s) => s.replaceAll(NBSP, "~");

describe("vlna", () => {
	it("binds every one-letter preposition and conjunction to the next word", () => {
		for (const letter of ["k", "s", "v", "z", "o", "u", "a", "i"]) {
			expect(show(vlna(`slovo ${letter} slovo`))).toBe(`slovo ${letter}~slovo`);
		}
	});

	it("handles capitals, the start of the text and runs of one-letter words", () => {
		expect(show(vlna("V lese a v poli"))).toBe("V~lese a~v~poli");
		expect(show(vlna("K tomu i s nimi"))).toBe("K~tomu i~s~nimi");
	});

	it("works after brackets and Czech opening quotes", () => {
		expect(show(vlna("(v lese) „a pak“"))).toBe("(v~lese) „a~pak“");
	});

	it("leaves longer words and other letters alone", () => {
		expect(vlna("na kole, do lesa, x y")).toBe("na kole, do lesa, x y");
		expect(vlna("Praha s.r.o.")).toBe("Praha s.r.o.");
	});

	it("touches text between tags but not tags, attributes or code", () => {
		const html = '<p title="a b">Jdu <em>k řece</em> a dál</p><code>a b</code><script>var a = 1; if (a) i = 2;</script>';
		expect(show(vlna(html))).toBe(
			'<p title="a b">Jdu <em>k~řece</em> a~dál</p><code>a b</code><script>var a = 1; if (a) i = 2;</script>',
		);
	});

	it("passes empty values through", () => {
		expect(vlna("")).toBe("");
		expect(vlna(undefined)).toBe(undefined);
	});
});

describe("vlnaDocument", () => {
	it("only changes documents whose root language is Czech", () => {
		expect(show(vlnaDocument('<html lang="cs"><p>a b</p></html>'))).toBe('<html lang="cs"><p>a~b</p></html>');
		expect(vlnaDocument('<html lang="en"><p>a b</p></html>')).toBe('<html lang="en"><p>a b</p></html>');
	});
});
