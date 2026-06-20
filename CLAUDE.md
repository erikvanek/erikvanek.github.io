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