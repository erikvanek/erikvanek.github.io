#!/usr/bin/env node
// Switch which site production builds: rewrites the one-line SITE file.
//
//   node scripts/switch-site.mjs          prints the current site
//   node scripts/switch-site.mjs v2       switches to the new site
//   node scripts/switch-site.mjs legacy   switches back
//
// The switch only takes effect once the change to SITE is merged into
// master, so the flip is a PR Erik merges and the rollback is reverting it.
// Plain Node, no dependencies.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITES = ["legacy", "v2"];
const file = fileURLToPath(new URL("../SITE", import.meta.url));
const usage = `usage: node scripts/switch-site.mjs [${SITES.join("|")}]`;

const current = existsSync(file) ? readFileSync(file, "utf8").trim() : "(missing)";
const target = process.argv[2];

if (!target) {
	console.log(`SITE is ${current}`);
	console.log(usage);
	process.exit(0);
}

if (!SITES.includes(target)) {
	console.error(`unknown site "${target}"`);
	console.error(usage);
	process.exit(1);
}

if (target === current) {
	console.log(`SITE is already ${target}, nothing to change`);
	process.exit(0);
}

writeFileSync(file, `${target}\n`);
console.log(`SITE: ${current} -> ${target}`);
console.log("Commit this on a branch and open a PR; merging it switches production. Revert the PR to roll back.");
