---
tags:
  - process
  - knowledge-management
  - reading
  - second-brain
created: 2025-03-30
---
# Content Processing Guide

## Overview
This document outlines the process for processing various types of content (books, articles, podcasts, videos, course notes) and integrating them into the knowledge base.

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
  - YAML frontmatter for metadata and resources:
    ```yaml
    ---
    title: "Book Title"
    author: "Author Name"
    published: YYYY
    tags:
      - tag1
      - tag2
      - tag3
    resources:
      # Pouze zdroje zmíněné v textu poznámky
      - odkaz_z_obsahu_1
      - odkaz_z_obsahu_2
    ---
    ```
  - Core concept sections (H2)
  - Key points as bullet points
  - Any diagrams or frameworks explained

### 4. Thematic Integration and Note Reorganization
- Identify the most important insights and concepts from the book
- Search existing notes in the knowledge base for related topics
- Carefully enrich these existing notes with new insights from the book
- When adding to existing notes, consider overall reorganization for improved readability:
  - Evaluate whether the existing structure still makes sense after additions
  - Group related concepts together under logical headings
  - Consider creating a summary section at the beginning for long notes
  - Ensure the note flows well from general concepts to specific details
- Use Obsidian's `[[reference]]` links to properly connect resources:
  - Format as `[[Books/Book_Title|Book Title]]` for clean display
  - This creates a proper graph view that shows relationships between notes
  - Look for opportunities to add links to other relevant notes in your knowledge base
- Clearly attribute the source by adding "(from [[Books/Book_Title|Book Title]])" where appropriate
- Organize the new information under appropriate headers or create new sections if needed
- Focus on enhancing existing notes rather than creating new thematic notes when possible
- Only create new thematic notes for significant concepts that don't fit into any existing notes

### 5. Note Reconciliation
- After adding new content to existing notes, perform a reconciliation step:
  - Review the entire note for consistency and flow
  - Check for redundancies or contradictions between old and new information
  - Consolidate similar points and concepts
  - Ensure headings and subheadings reflect the updated content
  - Rewrite transitions between sections if necessary
  - Consider whether the note might benefit from being split if it has become too large
- This reconciliation step is essential for maintaining a useful second brain that remains accessible and coherent over time

### 6. Tagging Strategy
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

## Lecture/Presentation Notes Processing

### 1. Initial Capture
- Share lecture or presentation notes via text or images
- Specify that these are lecture notes that need processing
- Include the title, presenter, and context if available

### 2. Content Extraction and Structuring
- Correct the language so it's structured better for future reference
- Organize content into logical sections with clear headings
- Format bulleted lists for easy scanning
- Add a created date field to the frontmatter (for all entries)

### 3. Lecture Note Creation
- Create a dedicated note in `/Users/erik/dev/erikvanek.github.io/pages/notes/Lectures/`
- Use a clear naming convention: `Topic_Presenter.md` or `EventName_Topic.md`
- Structure each lecture note with:
  - YAML frontmatter for metadata:
    ```yaml
    ---
    title: "Lecture Title"
    type: lecture-notes
    presenter: "Presenter Name"
    event: "Event Name"
    created: YYYY-MM-DD
    tags:
      - tag1
      - tag2
      - tag3
    resources:
      # ONLY include actual URLs mentioned in the lecture, NOT keywords or note references
      - https://example.com/resource-1
      - https://example.com/resource-2
    ---
    ```
  - Key themes (H2)
  - Main points organized under topical sections (H3)
  - Insights and takeaways
  - Follow-up questions if applicable

### 4. Thematic Integration
- Use the same approach as books: enrich existing notes with new insights
- Make sure to link using standard markdown style, not `[[wiki-style]]` links in frontmatter
- Only use actual external URLs in the resources field, never internal note references

### 5. Note Reconciliation
- Use the same approach as books to maintain consistency throughout the knowledge base

## Course Notes Processing

### 1. Initial Capture
- Upload course materials, syllabus, or your lecture notes to a conversation with Claude
- Specify that these are course notes that need processing

### 2. Content Extraction and Structuring
- Organize key concepts, frameworks, and techniques from the course
- Group related concepts into modules or topics based on course structure
- Format bulleted lists for easy scanning

### 3. Course Note Creation
- Create a dedicated note for each course in `/Users/erik/dev/erikvanek.github.io/pages/notes/Knowledge/Courses/`
- Use a clear naming convention: `CourseCode_MainTopic.md` (e.g., `DESB42_Designove_experimenty.md`)
- Structure each course note with:
  - YAML frontmatter for metadata:
    ```yaml
    ---
    tags:
      - course
      - tag1
      - tag2
      - tag3
    resources:
      # Pouze zdroje zmíněné v textu poznámky
      - odkaz_z_obsahu_1
      - odkaz_z_obsahu_2
    ---
    ```
  - Course title (H1) including course code
  - Overview section summarizing main topics
  - Key concepts organized by modules or topics
  - Practical methods and techniques covered
  - Resources mentioned in the course materials

### 4. Thematic Integration
- Use same approach as books: enhance existing notes with Obsidian reference links
- Format as `[[Knowledge/Courses/CourseCode_MainTopic|Course Title]]` for clean display

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
