---
tags:
  - process
  - knowledge-management
  - reading
---
# Content Processing Guide

## Overview
This document outlines the process for processing various types of content (books, articles, podcasts, videos) and integrating them into the knowledge base.

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
  - YAML frontmatter for metadata:
    ```yaml
    ---
    title: "Book Title"
    author: "Author Name"
    published: YYYY
    tags:
      - tag1
      - tag2
      - tag3
    ---
    ```
  - Core concept sections (H2)
  - Key points as bullet points
  - Any diagrams or frameworks explained

### 4. Thematic Integration
- Identify the most important insights and concepts from the book
- Search existing notes in the knowledge base for related topics
- Carefully enrich these existing notes with new insights from the book
- Use Obsidian's `[[reference]]` links to properly connect resources:
  - Format as `[[Books/Book_Title|Book Title]]` for clean display
  - This creates a proper graph view that shows relationships between notes
- Clearly attribute the source by adding "(from [[Books/Book_Title|Book Title]])" where appropriate
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
---
tags:
  - tag1
  - tag2
  - tag3
---
# [Book Title]

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
---
tags:
  - theme
  - relevantTag1
  - relevantTag2
---
# [Theme]

## Key Principles (from [[Books/Book_Title|Book Title]])
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

# Additional Content Types

The process described above can be adapted for other content types as follows:

## Article Processing

### 1. Initial Capture
- Share article links or upload article PDFs to a conversation with Claude
- Specify that these are articles that need processing

### 2. Content Extraction and Structuring
- Extract key points, insights, and quotes from the articles
- Organize content into logical sections with headers
- Format bulleted lists for easy scanning

### 3. Article Note Creation
- Create a dedicated note for each article in `/Users/erik/dev/erikvanek.github.io/pages/notes/Articles/`
- Use a clear naming convention: `Author_Year_Title.md`
- Structure each article note with:
  - YAML frontmatter for metadata:
    ```yaml
    ---
    title: "Article Title"
    author: "Author Name"
    publication: "Publication Name"
    date: YYYY-MM-DD
    url: "https://example.com/article"
    tags:
      - tag1
      - tag2
      - tag3
    ---
    ```
  - Key points and insights
  - Notable quotes
  - Personal reflections (if any)

### 4. Thematic Integration
- Use same approach as books: enhance existing notes with Obsidian reference links
- Format as `[[Articles/Author_Year_Title|Article Title]]` for clean display

## Podcast Processing

### 1. Initial Capture
- Share podcast episodes via links or notes from listening sessions
- Note important timestamps if available

### 2. Content Extraction and Structuring
- Organize key insights, concepts, and quotes from the podcast
- Include timestamps when possible for easy reference

### 3. Podcast Note Creation
- Create a dedicated note for each podcast episode in `/Users/erik/dev/erikvanek.github.io/pages/notes/Podcasts/`
- Use a clear naming convention: `Podcast_Ep#_Title.md`
- Structure each podcast note with:
  - YAML frontmatter for metadata:
    ```yaml
    ---
    title: "Episode Title"
    podcast: "Podcast Name"
    episode: 123
    host: "Host Name"
    guest: "Guest Name"
    date: YYYY-MM-DD
    url: "https://example.com/podcast-episode"
    tags:
      - tag1
      - tag2
      - tag3
    ---
    ```
  - Key discussion points with timestamps
  - Notable quotes
  - Resources mentioned during the episode

### 4. Thematic Integration
- Use same approach as books: enhance existing notes with Obsidian reference links
- Format as `[[Podcasts/Podcast_Ep#_Title|Episode Title]]` for clean display

## Video/Course Processing

### 1. Initial Capture
- Share notes from videos or courses via summary points or screenshots
- Include timestamps for important concepts

### 2. Content Extraction and Structuring
- Organize key lessons, frameworks, and techniques from the video/course
- Group related concepts into modules or sections

### 3. Video/Course Note Creation
- Create a dedicated note for videos/courses in `/Users/erik/dev/erikvanek.github.io/pages/notes/Courses/`
- Use a clear naming convention: `Creator_Title.md` or `Platform_CourseName.md`
- Structure each note with:
  - YAML frontmatter for metadata:
    ```yaml
    ---
    title: "Course/Video Title"
    creator: "Creator Name"
    platform: "Platform Name"
    date: YYYY-MM-DD
    url: "https://example.com/course"
    tags:
      - tag1
      - tag2
      - tag3
    ---
    ```
  - Key lessons organized by modules or topics
  - Practical exercises or techniques to try
  - Resources mentioned in the video/course

### 4. Thematic Integration
- Use same approach as books: enhance existing notes with Obsidian reference links
- Format as `[[Courses/Creator_Title|Course Title]]` for clean display

# Recent Implementation Examples (March 2025)

## Books Processed
- "The Mom Test" - Notes focused on effective customer interviewing techniques
- "Outcomes over Output" - Notes focused on outcome-driven product strategy

## Notes Enhanced
- **Product discovery.md**: Added sections on outcome-driven discovery and discovery interviewing techniques from both books
- **Qualitative research.md**: Added section on interview best practices from The Mom Test
- **Interview intro.md**: Added effective interviewing techniques to use when starting conversations
- **research.md**: Added detailed sections on customer interviews and outcome-based research

The focus was on enriching existing notes rather than creating many new thematic entries, ensuring that the knowledge from these books enhances and complements the existing knowledge structure.
