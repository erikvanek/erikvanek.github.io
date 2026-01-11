# Formatting Rules for reMarkable Transcription

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
