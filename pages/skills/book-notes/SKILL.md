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

**reMarkable exports are often one very tall single page** (an infinite vertical scroll). Render with `pdftoppm -png -r 150 input.pdf out`, then slice the tall PNG into overlapping page-height bands (e.g. 2200px tall, 200px overlap) with PIL so no line is cut mid-stroke and detail survives.

**Flag what you can't read.** Do not silently guess ambiguous handwriting - re-render the region at higher DPI to resolve it, mark anything still uncertain inline (`word [?]` / `[illegible]`), and give the user a short "Needs your eyes" list at the end with your best guess and reasoning. See `../shared/formatting-rules.md` → "Uncertain or illegible readings".

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

**Section long transcriptions.** If the transcription runs longer than ~1.5 A4 of text, divide it into meaningful thematic `##` sections, each ≤1-2 A4. Use the book's own chapter structure if the notes carry it; otherwise group by theme. This keeps the note skimmable and gives the enrichment step (below) coherent units to work from.

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
date_created: [YYYY-MM-DD]   # the processing date - also keys the Book notes/[YEAR]/ folder and chronological browsing
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

### 10. Cross-pollinate the second brain

Once the transcript is saved, mine it for the parts that clearly mattered to the reader and graft them into existing notes so the knowledge lives where it gets used - not just in an inbox file.

- **Signal of what mattered.** Prioritise in this order: `!!!` (bold) → underlined/highlighted → `!` (italic) → other strong standalone insights. A rich, lengthy set of notes usually means the book landed - mine it harder; a thin set, lighter.
- **Coverage.** As a rule of thumb (not a quota), aim for **~20%+ of the content** to end up enriching an existing note.
- **Find the home.** For each selected item, locate the single best-matching existing node (mature notes only - Areas/Resources, not inbox/drafts). If nothing genuinely fits, skip it - do not create new nodes or force a weak match.
- **Enrich verbatim.** Paste the item's **exact text** (keep emphasis) into the target node. Placement is mixed per node: weave inline where there's an obvious natural home; otherwise append under a labeled `## ...` section that names the source book.
- **Backlink to the originator.** Give each reused bullet in the transcript an Obsidian block anchor (` ^short-id` at end of the line) and, in the enriched node, point back with a block reference: `[[Book Title#^short-id]]`. This makes traceability bidirectional - the reader can jump from the node to the originating note, and the transcript's backlinks pane shows every node that reused a line.
- **Report a manifest** of item → node edits at the end.

### 11. File the note out of the inbox

The inbox is a processing bay, not a home. Once transcription, summary, quotes, related notes, and cross-pollination are all complete, move the finished note to its permanent location:

- **Book notes** → `10 - 🧠 Knowledge/3 - 📚 Resources/Book notes/[YEAR]/`, where `[YEAR]` is the year of `date_created` (create the year subfolder if it doesn't exist). Book notes are their own first-class collection - one home, divided by year, browsable chronologically by `date_created`.

The cross-pollination backlinks use short-form wiki-links (`[[Book Title#^id]]`), which resolve by name and survive the move - but verify nothing breaks. Once the transcription is verified, remove the source export (PDF/photos) from the inbox too (or keep it as an attachment if the reader prefers); don't leave raw sources cluttering the inbox.

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
