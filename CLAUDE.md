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