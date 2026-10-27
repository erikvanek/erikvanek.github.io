// Eleventy config for v2, the new site. It lives next to the legacy site
// (/.eleventy.js, pages/ -> docs/) and shares nothing with it.
//
//   yarn start:v2       dev server on http://localhost:8090
//   yarn build:v2       build into v2/_site/
//   SITE=v2 yarn build:deploy   build into _deploy/, as production would
//
// English lives at /, Czech at /cs/ (lang comes from _data/lang.json and
// cs/cs.11tydata.json). Every URL in the HTML gets the path prefix through
// the HTML base plugin, so previews under /pr-preview/pr-N/ work.

import path from "node:path";
import { HtmlBasePlugin } from "@11ty/eleventy";
import { vlna, vlnaDocument } from "./lib/vlna.mjs";
import { inlineImports } from "./lib/css.mjs";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(HtmlBasePlugin);

	// Only previews are built with a path prefix; they carry noindex.
	eleventyConfig.addGlobalData("preview", () => (eleventyConfig.pathPrefix || "/") !== "/");

	// The other language's version of a URL: /about/ <-> /cs/about/.
	// A page whose twin has another slug sets `twin` in its front matter.
	eleventyConfig.addFilter("twinUrl", (url, lang) =>
		lang === "cs" ? url.replace(/^\/cs\//, "/") : `/cs${url}`,
	);
	eleventyConfig.addFilter("hasUrl", (pages, url) => pages.some((p) => p.url === url));

	// Czech typography: non-breaking space after one-letter words. The
	// transform covers every page whose <html lang="cs">; the filter is for
	// Czech strings on a page in another language (the bilingual 404).
	eleventyConfig.addFilter("vlna", vlna);
	eleventyConfig.addTransform("vlna", function (content) {
		return (this.page.outputPath || "").endsWith(".html") ? vlnaDocument(content) : content;
	});

	// CSS: css/main.css lists the CUBE layers as @imports; they are inlined
	// into one file. Partials start with "_" and are not published on their own.
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile(inputContent, inputPath) {
			if (path.basename(inputPath).startsWith("_")) return;
			return () => inlineImports(inputContent, path.dirname(inputPath));
		},
	});

	eleventyConfig.addWatchTarget("v2/lib/");
	eleventyConfig.setServerOptions({ port: 8090 });

	return {
		dir: {
			input: "v2/src",
			output: "v2/_site",
			includes: "_includes",
			data: "_data",
		},
		templateFormats: ["njk", "md"],
		markdownTemplateEngine: "njk",
	};
}
