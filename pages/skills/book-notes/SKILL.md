---
name: book-notes
description: Transcribe handwritten book notes from reMarkable PDFs or paper photos. Trigger phrase "process book notes". Handles single-source book notes with optional chapter structure. Converts handwriting to markdown, applies formatting conventions, generates metadata, creates AI summaries, and appends quotes to a central quotes file. Notes may be in Czech or English.
---

# Book Notes Processor

Transcribe handwritten book notes into structured Obsidian notes.

## Trigger

User says "process book notes" and provides either:
- A PDF file (reMarkable export)
- Multiple image files (photos of paper notes)

## Language

Notes may be in **Czech or English**. Preserve the original language throughout. Do not translate.

## Workflow

### 1. Convert and Transcribe

**For PDF input:**
```python
from pdf2image import convert_from_path
images = convert_from_path('notes.pdf', dpi=150)
for i, img in enumerate(images):
    img.save(f'page_{i+1}.png', 'PNG')
```

**For image input:**
Accept images directly and process in order.

Then visually read and transcribe each page.

### 2. Verify Content Type

Book notes typically have:
- Single book source
- Optional chapter/section structure (H2 headings)
- Cohesive narrative around one text

If user provides multi-source research notes, suggest: "This looks like multi-source research notes. Should I use 'process deep dive notes' instead?"

### 3. Apply Formatting Rules

See `../shared/formatting-rules.md` for complete conventions. Key rules:

- `!` at bullet start → *italics*
- `!!!` at bullet start → **bold**
- Underscored words → **bold**
- Numbered sequences → numbered lists
- H1 (`#`) marks book title
- H2 (`##`) marks chapters/sections if present
- Quotes: `Author: *"Quote text"*`

### 4. Collect Metadata

Ask user for:
- **Book title** (if not clear from notes)
- **Author**

Then query Obsidian for existing tags:
```
obsidian-mcp-tools:search_vault_simple with relevant keywords
```
Select 3-5 tags that match the vault's existing taxonomy.

### 5. Generate Summary

If transcribed content exceeds ~1 A4 of text, generate a 1-3 paragraph summary covering:
- Core argument or thesis
- Key concepts or frameworks
- Personal insights or applications

Place summary after frontmatter, before raw transcription.

### 6. Build Frontmatter

```yaml
---
title: [Book title]
author: [Author name]
date_created: [YYYY-MM-DD]
source_type: book
tags:
  - [3-5 relevant tags from vault]
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

Create file in inbox: `02 - 📩 Inbox/[Book Title].md`

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

# [Book Title]

- [transcribed bullets with formatting]
- *important point*
- **very important point**
- Author: *"Quote text"*

## [Chapter/Section Name] (if applicable)

- [chapter-specific notes]

## Related notes

- [[Related Note 1]]
- [[Related Note 2]]
```
