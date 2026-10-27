// Runs the two shipped language scripts in a bare VM context with stubbed
// browser globals, so the exact code that goes into the page is tested.
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

const read = (file) => readFileSync(new URL(`../src/_includes/js/${file}`, import.meta.url), "utf8");
const inferSource = read("lang-infer.js");
const saveSource = read("lang-save.js");

const ORIGIN = "https://www.erikvanek.com";

function memoryStorage(initial = {}) {
	const data = { ...initial };
	return {
		data,
		getItem: (key) => (key in data ? data[key] : null),
		setItem: (key, value) => {
			data[key] = String(value);
		},
	};
}

// Like a browser with site data blocked: touching localStorage throws.
function windowWith(storage, extra = {}) {
	const window = { ...extra };
	Object.defineProperty(window, "localStorage", {
		get() {
			if (storage === "blocked") throw new Error("SecurityError: access to storage is denied");
			return storage;
		},
	});
	return window;
}

function visitHome({
	languages = ["en-US", "en"],
	storage = memoryStorage(),
	referrer = "",
	csHref = "/cs/",
	search = "",
	hash = "",
} = {}) {
	let redirectedTo = null;
	const location = { origin: ORIGIN, search, hash, replace: (url) => (redirectedTo = url) };
	const context = {
		window: windowWith(storage, { location }),
		navigator: { languages, language: languages?.[0] },
		document: { referrer, currentScript: { getAttribute: (name) => (name === "data-cs" ? csHref : null) } },
		URL,
	};
	vm.runInNewContext(inferSource, context);
	return redirectedTo;
}

describe("first visit to /", () => {
	it("sends a browser that prefers Czech to /cs/", () => {
		expect(visitHome({ languages: ["cs-CZ", "cs", "en"] })).toBe("/cs/");
	});

	it("keeps a browser that prefers English on /", () => {
		expect(visitHome({ languages: ["en-GB", "cs"] })).toBe(null);
	});

	it("uses the first language the site offers, in the browser's order", () => {
		expect(visitHome({ languages: ["sk", "cs", "en"] })).toBe("/cs/");
		expect(visitHome({ languages: ["de", "en", "cs"] })).toBe(null);
		expect(visitHome({ languages: ["de"] })).toBe(null);
	});

	it("falls back to navigator.language", () => {
		const context = {
			window: windowWith(memoryStorage(), { location: { origin: ORIGIN, search: "", hash: "", replace: (u) => (context.to = u) } }),
			navigator: { language: "cs" },
			document: { referrer: "", currentScript: { getAttribute: () => "/cs/" } },
			URL,
		};
		vm.runInNewContext(inferSource, context);
		expect(context.to).toBe("/cs/");
	});

	it("keeps the path prefix, query and hash", () => {
		expect(visitHome({ languages: ["cs"], csHref: "/pr-preview/pr-7/cs/", search: "?a=1", hash: "#x" })).toBe(
			"/pr-preview/pr-7/cs/?a=1#x",
		);
	});

	it("remembers the visit, so inference happens only once", () => {
		const storage = memoryStorage();
		expect(visitHome({ languages: ["cs"], storage })).toBe("/cs/");
		expect(storage.data["ev:seen"]).toBe("1");
		expect(visitHome({ languages: ["cs"], storage })).toBe(null);
	});

	it("does not infer when the visitor came from another page of this site", () => {
		expect(visitHome({ languages: ["cs"], referrer: `${ORIGIN}/cs/` })).toBe(null);
		expect(visitHome({ languages: ["cs"], referrer: "https://www.google.com/" })).toBe("/cs/");
	});
});

describe("saved choice", () => {
	it("English stays on / even for a Czech browser", () => {
		expect(visitHome({ languages: ["cs"], storage: memoryStorage({ "ev:lang": "en" }) })).toBe(null);
	});

	it("Czech goes to /cs/ even for an English browser and on later visits", () => {
		const storage = memoryStorage({ "ev:lang": "cs", "ev:seen": "1" });
		expect(visitHome({ languages: ["en"], storage })).toBe("/cs/");
	});
});

describe("without storage", () => {
	it("still infers on arrival and does not throw", () => {
		expect(visitHome({ languages: ["cs"], storage: "blocked" })).toBe("/cs/");
	});

	it("does not bounce a visitor who clicked English back to /cs/", () => {
		expect(visitHome({ languages: ["cs"], storage: "blocked", referrer: `${ORIGIN}/cs/` })).toBe(null);
	});
});

describe("selector", () => {
	function clickWith(storage, target) {
		let handler;
		const context = {
			window: windowWith(storage),
			document: { addEventListener: (type, fn) => type === "click" && (handler = fn) },
		};
		vm.runInNewContext(saveSource, context);
		handler({ target });
	}

	const flag = (code) => ({
		closest: (selector) =>
			selector === "a[data-lang-choice]" ? { getAttribute: (name) => (name === "data-lang-choice" ? code : null) } : null,
	});

	it("saves the chosen language", () => {
		const storage = memoryStorage();
		clickWith(storage, flag("cs"));
		expect(storage.data["ev:lang"]).toBe("cs");
		clickWith(storage, flag("en"));
		expect(storage.data["ev:lang"]).toBe("en");
	});

	it("ignores clicks elsewhere", () => {
		const storage = memoryStorage();
		clickWith(storage, { closest: () => null });
		expect(storage.data).toEqual({});
	});

	it("does not throw when storage is blocked", () => {
		expect(() => clickWith("blocked", flag("cs"))).not.toThrow();
	});
});
