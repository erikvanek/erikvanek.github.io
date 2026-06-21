# Formatting Rules for Handwritten Note Transcription

## Language

Notes may be in **Czech or English**. Preserve the original language. Do not translate.

## Emphasis Markers

| Handwritten | Markdown Output |
|-------------|-----------------|
| `- ! text` | `- *text*` (italics) |
| `- !!! text` | `- **text**` (bold) |
| `- !! text` | `- **text**` (treat as !!!) |
| underscored word | **word** (bold) |

## Structure

| Handwritten | Markdown Output |
|-------------|-----------------|
| `# Title` | `# From "Title"` |
| `- bullet` | `- bullet` |
| numbered items (1. 2. 3.) | numbered list |

## Quotes

Quotes appear as: `Author: "Quote text"`

Output in transcription:
```markdown
- Author: *"Quote text"*
```

Also append to Quotes.md:
```markdown
- Author: "Quote text"
```

## Lists

When encountering numbered sequences in prose (e.g., "4 practices: 1. first 2. second"):

```markdown
- 4 practices that prove valuable:
    1. first item
    2. second item
    3. third item
    4. fourth item
```

## Page Headers

Each page typically starts with `# Source Title`. These become H1 headings in the transcription:

```markdown
# From "Source Title"
```

## Personal Notes

Preserve personal notes/todos in their original language (Czech or English).

## Block anchors & backlinks (for cross-pollination)

When a transcribed line is reused to enrich another note, make the link traceable both ways with Obsidian block references:

- In the **source transcript**, append a block anchor to the reused line: `- the line text  ^short-id` (lowercase, hyphenated, unique within the file; prefix with a short book slug, e.g. `^hthat-vision-keeper`).
- In the **enriched note**, reference it: `[[Book Title#^short-id]]`.

Anchors render invisibly in Obsidian preview, so only add them to lines that are actually reused - don't anchor every bullet.

## Uncertain or illegible readings

Handwriting will sometimes be ambiguous. Never silently guess.

1. **Try to resolve it first.** Re-render the specific region at higher resolution before flagging. For a tall single-page scroll, crop just that band at 300 dpi:
   ```bash
   # page is W x H px at the chosen dpi; -x -y -W -H crop in those pixels
   pdftoppm -png -r 300 -x 0 -y <top> -W <pageWidth> -H <bandHeight> input.pdf zoom
   ```
   Use surrounding context and the book's known facts (names, dates, terms) to disambiguate.
2. **If still unsure, mark it inline** in the transcription so it is visibly uncertain - e.g. `word [?]` for a doubtful word, or `[illegible]` for something unreadable. Do not invent text to fill a gap.
3. **Report a short "Needs your eyes" list to the user** at the end: each uncertain item, your best guess, and why. Resolved-by-zoom items can be mentioned briefly so the user knows what was checked.
