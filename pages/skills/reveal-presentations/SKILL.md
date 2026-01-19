---
name: reveal-presentations
description: Create high-quality reveal.js presentations with progressive disclosure, fragments, and pedagogical structure. Trigger when user asks to create or improve a presentation, slides, lecture content, workshop materials, or case study deck. Supports university teaching, workshop facilitation, case studies, and conference talks. Outputs HTML compatible with 11ty/Nunjucks templating.
---

# Reveal.js Presentation Skill

Build reveal.js presentations that are pedagogically sound, visually clean, and leverage advanced features systematically.

## Workflow

### 1. Identify Presentation Type

Ask user which type (or infer from context):

| Type | Key Characteristics | Reference |
|------|---------------------|-----------|
| **Teaching** | Course content, learning objectives, progressive concept building | [teaching.md](references/teaching.md) |
| **Workshop** | Timed activities, facilitator notes, group exercises | [workshop.md](references/workshop.md) |
| **Case Study** | Project narrative, methods, outcomes, lessons | [case-study.md](references/case-study.md) |
| **Talk** | Personal intro, project showcase, engagement | [talk.md](references/talk.md) |

Read the appropriate reference file before drafting.

### 2. Gather Content Requirements

Ask about:
- **Topic and audience** – what level of familiarity?
- **Duration** – how many slides roughly?
- **Key messages** – what 3-5 things must audience remember?
- **Activities** – any interactive elements?
- **Existing content** – reuse from documents, notes, outlines?

### 3. Draft Structure

Before writing HTML, propose a slide outline:
```
1. Title + context
2. Agenda/roadmap
3-N. Core content (grouped by theme)
N+1. Summary/takeaways
N+2. Q&A/contact
```

Get user approval on structure before proceeding.

### 4. Apply Power User Patterns

Read [patterns.md](references/patterns.md) for implementation details. Key patterns to consider:

- **Fragments** for progressive disclosure (don't reveal everything at once)
- **Vertical slides** for optional depth (main concept horizontal, details vertical)
- **Speaker notes** for teaching prompts and timing
- **Two-column layouts** for comparisons
- **Background images/iframes** for context
- **r-fit-text** for emphasis slides

### 5. Generate HTML

Use this frontmatter structure:
```yaml
---
title: Presentation Title
date: YYYY-MM-DD
layout: presentation-jinag.njk
permalink: /{{page.fileSlug}}/
eleventyExcludeFromCollections: true
description: Subtitle or description
---
```

Follow code patterns in [examples.md](references/examples.md).

### 6. Review Checklist

Before delivering:
- [ ] No slide has more than 6 bullet points
- [ ] Key concepts use fragments for pacing
- [ ] Comparison slides use two-column layout
- [ ] Speaker notes on complex slides
- [ ] Question slides before major transitions
- [ ] Closing slide with contact/resources

## Output Location

Save presentations to `/Users/erik/dev/erikvanek.github.io/pages/presentations/` in the appropriate subdirectory, or create a new one if needed.

## Language

Default to Czech unless user specifies otherwise. Technical terms may remain in English with Czech explanation.

## Quick Reference

### Essential Classes
- `r-fit-text` – auto-scale text to fit
- `fragment` – progressive reveal
- `equal-columns` – two-column grid layout
- `text-shadow-black` – text shadow for readability over images

### Essential Attributes
- `data-background-image` – full-bleed background
- `data-background-color` – solid background
- `data-fragment-index` – control fragment order
- `data-auto-animate` – smooth element transitions

### Keyboard Shortcuts (for user)
- `S` – speaker notes view
- `O` – overview mode
- `B` – blank screen
- `F` – fullscreen
