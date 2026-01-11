---
name: remarkable-notes
description: Transcribe handwritten notes from reMarkable PDF exports and save them to Obsidian. Trigger phrase "process remarkable notes". Handles multi-source research compilations (multiple sources per PDF) and single-source notes (book, article, podcast). Converts handwriting to markdown, applies formatting conventions, generates metadata, creates AI summaries, and appends quotes to a central quotes file. Notes may be in Czech or English.
---

# reMarkable Notes Processor

Transcribe handwritten reMarkable PDF exports into structured Obsidian notes.

## Trigger

User says "process remarkable notes" and provides a PDF file.

## Language

Notes may be in **Czech or English**. Preserve the original language throughout. Do not translate.

## Workflow

### 1. Convert and Transcribe

Convert PDF pages to images using pdf2image, then visually read and transcribe each page:

```python
from pdf2image import convert_from_path
images = convert_from_path('notes.pdf', dpi=150)
for i, img in enumerate(images):
    img.save(f'page_{i+1}.png', 'PNG')
```

### 2. Determine Source Type

Ask user: "Is this a multi-source research compilation or single-source notes (book/article/podcast)?"

- **Multi-source research**: Multiple H1 headings per PDF, each representing a different source
- **Single-source**: One source (book, article, podcast, random) — future implementation, ask user for details when encountered

### 3. Apply Formatting Rules

See `references/formatting-rules.md` for complete conventions. Key rules:

- `!` at bullet start → *italics*
- `!!!` at bullet start → **bold**
- Underscored words → **bold**
- Numbered sequences → numbered lists
- H1 (`#`) marks source titles
- Quotes: `Author: *"Quote text"*`

### 4. Collect Metadata

For research type, ask user for:
- Resources list (URLs to original sources)

Then query Obsidian for existing tags:
```
obsidian-mcp-tools:search_vault_simple with relevant keywords
```
Select 3-5 tags that match the vault's existing taxonomy.

### 5. Generate Summary

If transcribed content exceeds ~1 A4 of text, generate a 1-3 paragraph summary covering:
- Core tension or theme
- Key frameworks or approaches
- Critical questions or insights

Place summary after frontmatter, before raw transcription.

### 6. Build Frontmatter

```yaml
---
title: [Derived from content]
date_created: [YYYY-MM-DD]
source_type: research | book | article | podcast | random
tags:
  - [3-5 relevant tags from vault]
resources:  # Only for research type
  - [URL 1]
  - [URL 2]
author: [Only for book/article]
---
```

### 7. Handle Quotes

If transcription contains quotes (format: `Author: "Quote text"`):

In transcription:
```markdown
- Author: *"Quote text"*
```

Append to Obsidian quotes file `10 - 🧠 Knowledge/3 - 📚 Resources/Learning/Quotes.md`:
```markdown
- Author: "Quote text"
```

### 8. Save to Obsidian

Create file in inbox: `02 - 📩 Inbox/[Title].md`

Use `obsidian-mcp-tools:create_vault_file` with the complete markdown content.

### 9. Add Related Notes

Query Obsidian for related existing notes and add a `## Related notes` section with wiki-links at the end.

## Output Structure

```markdown
---
[frontmatter]
---

## Summary

[AI-generated summary if content is long enough]

---

# From "[Source 1]"

- [transcribed bullets with formatting]
- *important point*
- **very important point**
- Author: *"Quote text"*

# From "[Source 2]"

...

## Related notes

- [[Related Note 1]]
- [[Related Note 2]]
```
