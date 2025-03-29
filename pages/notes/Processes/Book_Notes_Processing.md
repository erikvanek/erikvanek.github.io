# Book Notes Processing

tags: #process #knowledge-management #reading

## Overview
This document outlines the process for processing book notes and integrating them into the knowledge base.

## Process Steps

### 1. Initial Capture
- Upload PDF or image files of book notes to a conversation with Claude
- Specify that these are book notes that need processing
- Indicate whether there is handwritten text to be ignored

### 2. Note Cleanup and Structuring
- Correct any OCR-related typos or imperfections
- Ignore handwritten text
- Organize content into logical sections with headers
- Format bulleted lists for easy scanning

### 3. Book Note Creation
- Create a dedicated note for each book in `/Users/erik/dev/erikvanek.github.io/pages/notes/Books/`
- Use a clear naming convention: `Book_Title.md`
- Structure each book note with:
  - Title (H1)
  - Tags (3 relevant tags)
  - Core concept sections (H2)
  - Key points as bullet points
  - Any diagrams or frameworks explained

### 4. Thematic Integration
- Identify the most important insights and concepts from the book
- Search existing notes in the knowledge base for related topics
- Carefully enrich these existing notes with new insights from the book
- Clearly attribute the source by adding "(from [Book Title])" where appropriate
- Organize the new information under appropriate headers or create new sections if needed
- Focus on enhancing existing notes rather than creating new thematic notes when possible
- Only create new thematic notes for significant concepts that don't fit into any existing notes

### 5. Tagging Strategy
- Use 3 tags per book for high-level categorization
- Consider using tags for:
  - Subject area (e.g., #ProductStrategy, #CustomerResearch)
  - Methodology type (e.g., #OutcomesDriven, #UserInterviews)
  - Application context (e.g., #BusinessResults, #ProductDevelopment)

## Example
- Book: "The Mom Test" → Tags: #CustomerResearch #UserInterviews #ProductDevelopment
- Book: "Outcomes over Output" → Tags: #OutcomesDriven #ProductStrategy #BusinessResults

## Templates

### Book Note Template
```markdown
# [Book Title]

tags: #tag1 #tag2 #tag3

## Core Principles
- [Key principle 1]
- [Key principle 2]

## [Topic Section]
- [Point 1]
- [Point 2]

## [Another Topic Section]
- [Point 1]
- [Point 2]
```

### Thematic Note Template
```markdown
# [Theme]

## Key Principles (from [Book])
- [Principle 1]
- [Principle 2]

## [Aspect of Theme]
- [Point from Book A]
- [Related point from Book B]

## [Another Aspect]
- [Point from Book C]
- [Synthesis of ideas from multiple sources]
```

---

Next time you can simply say "process last two books" and this process will be followed automatically.

## Recent Implementation Examples (March 2025)

### Books Processed
- "The Mom Test" - Notes focused on effective customer interviewing techniques
- "Outcomes over Output" - Notes focused on outcome-driven product strategy

### Notes Enhanced
- **Product discovery.md**: Added sections on outcome-driven discovery and discovery interviewing techniques from both books
- **Qualitative research.md**: Added section on interview best practices from The Mom Test
- **Interview intro.md**: Added effective interviewing techniques to use when starting conversations
- **research.md**: Added detailed sections on customer interviews and outcome-based research

The focus was on enriching existing notes rather than creating many new thematic entries, ensuring that the knowledge from these books enhances and complements the existing knowledge structure.
