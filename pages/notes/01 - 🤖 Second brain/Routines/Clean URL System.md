# Clean URL System for Second Brain

## Overview
System for generating clean, SEO-friendly URLs that transform complex nested paths into simple, readable URLs.

**Goal:** `/notes/04%20-%20%F0%9F%92%BD%20RAW/2025/06/29/How_to_Speak_Machine/` → `/how-to-speak-machine/`

## URL Generation Rules

### Slug Generation Algorithm
```python
def generate_slug(title):
    # Remove common suffixes
    title = remove_suffix(title, ' - Reading Notes')
    title = remove_parenthetical(title)  # (MVP) → ''
    
    # Convert to clean slug
    slug = title.lower()
    slug = remove_special_chars(slug)     # Remove emojis & special chars
    slug = replace_spaces_with_hyphens(slug)
    slug = collapse_multiple_hyphens(slug)
    slug = strip_leading_trailing_hyphens(slug)
    
    return slug
```

### Examples
- `"How to Speak Machine - Reading Notes"` → `"how-to-speak-machine"`
- `"MVP (Minimum Viable Product)"` → `"mvp-minimum-viable-product"`
- `"Team Effectiveness"` → `"team-effectiveness"`

## URL Categories

| Category | URL Pattern | Example |
|----------|-------------|---------|
| Books | `/{slug}/` | `/how-to-speak-machine/` |
| Knowledge | `/{slug}/` | `/team-effectiveness/` |
| Areas | `/areas/{slug}/` | `/areas/continuous-improvement/` |

## Implementation

### 1. Frontmatter Structure
```yaml
---
title: "How to Speak Machine - Reading Notes"
slug: "how-to-speak-machine"
permalink: "/{{ slug }}/"
url_category: "book"
layout: note.njk
---
```

### 2. URL Registry (_data/url-registry.json)
Central registry prevents URL collisions and tracks all clean URLs:

```json
{
  "urls": {
    "how-to-speak-machine": {
      "title": "How to Speak Machine - Reading Notes",
      "file": "04 - 💽 RAW/2025/06/29/How_to_Speak_Machine.md",
      "category": "book",
      "created": "2025-06-29"
    }
  }
}
```

### 3. Collision Handling
When slug exists, automatically append increments:
- `team-effectiveness` → `team-effectiveness-2` → `team-effectiveness-3`

## Usage in Processing Workflow

### Book Notes Processing
Add to Step 2 (RAW File Creation):

```bash
# 1. Generate slug from title
python url_manager.py generate --title "How to Speak Machine - Reading Notes"

# 2. Add to registry
python url_manager.py add \
  --title "How to Speak Machine - Reading Notes" \
  --file "04 - 💽 RAW/2025/06/29/How_to_Speak_Machine.md" \
  --category "book"

# 3. Add to frontmatter
slug: how-to-speak-machine
permalink: "/{{ slug }}/"
url_category: book
```

### Knowledge Notes Processing
For existing knowledge notes:

```bash
# Generate slug for existing note
python url_manager.py add \
  --title "Team Effectiveness" \
  --file "10 - 🧠 Knowledge/3 - 📚 Resources/Team/Team Effectiveness.md" \
  --category "knowledge"
```

## Validation & Maintenance

### Registry Validation
```bash
# Check for collisions and broken file references
cd "01 - 🤖 Second brain/scripts/"
python url_manager.py validate --notes-dir "../../.."
```

### Integration with Existing Validation
Add to `validate_notes.py` workflow:
```bash
# Run both validations together
python validate_notes.py "../../.." --check-summaries
python url_manager.py validate --notes-dir "../../.."
```

## Benefits

### SEO & User Experience
- ✅ Clean, readable URLs: `/how-to-speak-machine/`
- ✅ Better search engine indexing
- ✅ Easy to share and remember
- ✅ Professional appearance

### Technical Benefits
- ✅ No URL encoding issues
- ✅ Consistent URL structure across all notes
- ✅ Automatic collision prevention
- ✅ Central registry for management

### Maintenance
- ✅ Automatic slug generation from titles
- ✅ Registry tracks all URLs
- ✅ Validation tools prevent issues
- ✅ Backward compatible with existing system

## Migration Strategy

### Phase 1: New Content (Current)
- All new book notes get clean URLs automatically
- Existing notes continue with current URLs

### Phase 2: High-Traffic Notes
- Add clean URLs to frequently accessed knowledge notes
- Implement redirects for SEO preservation

### Phase 3: Complete Migration
- Add clean URLs to all remaining notes
- Archive legacy URL structure

## Related Notes
- [[Book Notes Extraction]] - Integration with book processing
- [[Inbox processing]] - General note processing workflows
- [[validate_notes.py]] - Quality control and validation

## Scripts Reference

### url_manager.py Commands
```bash
# Generate slug from title (no registry update)
python url_manager.py generate --title "Your Note Title"

# Add new URL to registry
python url_manager.py add --title "Title" --file "path/to/file.md" --category "book"

# Validate registry
python url_manager.py validate --notes-dir "../../.."
```

### Integration Example
```yaml
# Book note frontmatter template
---
title: "[Book Title] - Reading Notes"
date: YYYY-MM-DD
tags: [book-notes, reading, [relevant-tags]]
source: "[Book Title by Author]"
type: raw-material
layout: note.njk
slug: "generated-slug"
permalink: "/{{ slug }}/"
url_category: "book"
---
```