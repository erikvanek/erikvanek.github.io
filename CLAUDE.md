# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Run Commands
- `yarn start`: Start development server with live reload (eleventy --serve)
- `yarn build`: Build the site (eleventy)
- `yarn debug:node`: Start server with Node.js warnings
- `yarn debug:eleventy`: Start server with Eleventy debug output
- `yarn format`: Check Markdown formatting with Prettier
- `yarn format:fix`: Fix Markdown formatting issues

## Code Style Guidelines
- **Formatting**: Use Prettier for Markdown files
- **Eleventy Templates**: Use Nunjucks (.njk) for templates
- **Eleventy Config**: Update .eleventy.js for new passthrough files or template formats
- **Structure**: Pages in /pages, built site in /docs
- **Markdown**: Use standard markdown with wiki-links [[page-name]] supported
- **Images**: Place in appropriate directories, reference with proper paths
- **Functions**: Use camelCase for function names
- **Error Handling**: Log errors with meaningful messages

Follow the existing patterns in the codebase when creating new components or modifying existing ones.
- make sure the progress in all relevant markdown docs

## Slidev decks and per-client theming
Slidev decks live under `pages/presentations/slidev/<deck-name>/slides.md`, built to `docs/presentations/slidev/<deck-name>/` via `yarn build:slides` (`scripts/build-slidev-decks.mjs`) - isolated from Eleventy and from the older reveal.js decks elsewhere under `pages/presentations/`. `yarn slides` runs the top-level scratch file for quick trying-out; it's excluded from the build on purpose (see the script's own header comment).
- **Where a deck publishes.** By default it lands at the same path it lives at, so `pages/presentations/slidev/foo/` serves from `/presentations/slidev/foo/`. A deck that wants a shorter public URL declares `publicPath: /sdw-26/I/` in its own headmatter, and the build script routes and rebases it there. **A publicPath must be at least two segments deep.** Every Eleventy page on this site routes through `permalink: /{{page.fileSlug}}/`, which can only ever produce one URL segment, so a two-segment path is structurally out of Eleventy's reach; a one-segment one would sit in the same namespace as those 50-odd pages, where Eleventy would silently overwrite the deck - and since CI runs Eleventy but not `yarn build:slides`, that would only ever surface on the live site.
- **Moving a deck means rebuilding it and leaving a redirect behind.** Slidev bakes `--base` into every asset URL, so a deck works at exactly one path and nowhere else. Old URLs get a stub from `pages/_data/redirects.json` (one entry, rendered by `pages/redirects.njk`). GitHub Pages has no redirect layer at all - no `_redirects`, no `.htaccess`, no per-path rules - so a stub page is the only option for a path inside this site.
- **This repo is public** - only brand themes that are fine to publish belong in `themes/<name>/` (e.g. `muni-arts`, built for the MUNI/KISK course SDW-26). A theme never stores proprietary assets (font files, source manuals) even when it's committed - it just references them by name/URL and lets the browser resolve or fall back; see `themes/muni-arts/README.md` for the pattern.
- **Confidential/client-specific branding** for other engagements lives entirely in other repos, used locally or as exported files (PDF/PPTX) - this repo doesn't stage or preview that content at all.

## Workflow skills (note processing)
Custom Claude skills for personal note workflows live in **`pages/skills/`** (they publish with the site). Because Claude Code only auto-discovers skills under `.claude/skills/`, this repo symlinks them there locally (`.claude/skills/` is gitignored, so re-create the symlinks per clone: `ln -sfn "$PWD/pages/skills/<name>" .claude/skills/<name>`). **If a skill isn't showing up, look in `pages/skills/` first.**

| Skill | Trigger phrase | Input | Routes when |
|-------|----------------|-------|-------------|
| `book-notes` | "process book notes" | PDF or images | Single book source, cohesive narrative, optional chapters |
| `deep-dive-notes` | "process deep dive notes" | PDF or images | Multi-source research notes |

Both read `pages/skills/shared/formatting-rules.md` for transcription conventions. The SKILL.md files were authored for an `obsidian-mcp-tools` MCP server; when that's not connected, operate on the vault as plain files instead - vault root is `pages/notes/`, inbox `pages/notes/02 - 📩 Inbox/`, quotes `pages/notes/10 - 🧠 Knowledge/3 - 📚 Resources/Learning/Quotes.md`. New skills go in their own folder under `pages/skills/` and get a row here.

## Privacy & content boundaries
- This repo is **public** and builds to www.erikvanek.com. Anything committed is world-readable.
- PARA **Projects** and **Archive** are **private** and live in a separate private repo - they are NOT part of this public second brain. Only Areas/Resources-type notes are published here.
- Never commit secrets, `.env`, `.obsidian/`, `.smart-env/`, or `.claude/` (enforced by the pre-commit hook in `.githooks/` + gitleaks; run `git config core.hooksPath .githooks` once per clone).
- Do not enumerate private file or client names in public config (`.gitignore`, hooks, commit messages) - that itself hints they exist. Protect by file *type*, and keep private content out of the repo entirely.

## Project lifecycle → continual publishing
A project may move from **Projects → Archive** only if one of these is true:
- a **case study is published** on the site (portfolio / case-studies page), or
- the project note carries an **explicit `no case study needed`** marker.

If neither holds, do not archive it - flag it so a case study gets written first. This keeps the public site continually updated with recent work.