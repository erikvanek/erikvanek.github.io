#!/usr/bin/env node
// yarn build:deploy - writes the site that should go live into _deploy/.
//
// Which site is chosen by the one-line SITE file at the repo root:
//   legacy  the committed docs/ folder, exactly what is live today
//   v2      the new Eleventy site in v2/, built fresh
// The SITE environment variable overrides the file for one run, so a PR
// preview can build v2 while production still serves legacy:
//   SITE=v2 PATH_PREFIX=/pr-preview/pr-12/ yarn build:deploy
//
// PATH_PREFIX (default "/") is the folder the site is served from. Only v2
// honours it; legacy uses absolute paths and is copied as it is.
//
// Flip production with `node scripts/switch-site.mjs v2` in a PR; revert
// that PR to roll back.

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITES = ["legacy", "v2"];
const root = fileURLToPath(new URL("..", import.meta.url));
const out = path.join(root, "_deploy");

function readSite() {
	if (process.env.SITE) return process.env.SITE.trim();
	const file = path.join(root, "SITE");
	if (!existsSync(file)) fail(`missing ${file}; it should hold one of: ${SITES.join(", ")}`);
	return readFileSync(file, "utf8").trim();
}

function normalisePrefix(prefix = "/") {
	const trimmed = prefix.trim().replace(/^\/+|\/+$/g, "");
	return trimmed ? `/${trimmed}/` : "/";
}

function fail(message) {
	console.error(`build:deploy: ${message}`);
	process.exit(1);
}

function buildLegacy(prefix) {
	if (prefix !== "/") {
		console.warn(`build:deploy: legacy ignores PATH_PREFIX ${prefix} (it uses absolute paths)`);
	}
	cpSync(path.join(root, "docs"), out, { recursive: true });
}

function buildV2(prefix) {
	// Through the CLI on purpose: there --input/--output beat the config's own
	// dir settings, while the programmatic API lets the config win.
	const eleventy = path.join(root, "node_modules/.bin/eleventy");
	const args = [
		"--config=v2/eleventy.config.mjs",
		"--input=v2/src",
		"--output=_deploy",
		`--pathprefix=${prefix}`,
	];
	const result = spawnSync(eleventy, args, { cwd: root, stdio: "inherit" });
	if (result.error) throw result.error;
	if (result.status !== 0) fail(`eleventy exited with status ${result.status}`);
}

const site = readSite();
if (!SITES.includes(site)) fail(`unknown site "${site}"; expected one of: ${SITES.join(", ")}`);
const prefix = normalisePrefix(process.env.PATH_PREFIX);

rmSync(out, { recursive: true, force: true });
console.log(`build:deploy: building ${site} into _deploy/ (path prefix ${prefix})`);

try {
	if (site === "legacy") buildLegacy(prefix);
	else buildV2(prefix);
} catch (error) {
	fail(error.stack || String(error));
}

if (!existsSync(path.join(out, "index.html"))) fail("_deploy/index.html was not written");
console.log(`build:deploy: done, ${site} is in _deploy/`);
