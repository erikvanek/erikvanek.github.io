# Chunking Process

> **Important**: Do not chunk RAW items stored in the RAW storage folders. These should be preserved in their original form and only processed by adding metadata and possibly a summary.

Chunking is the process of breaking down larger notes into smaller, interconnected nuggets of knowledge. This AI-assisted process helps with:
- Clearer thinking and organization
- More granular linking between related concepts
- Improved discoverability and reuse of information
- Easier integration of new knowledge with existing content

## When to Use Chunking
- When processing notes longer than one A4 page (approximately 2500-3000 characters)
- When a note covers multiple distinct concepts or ideas
- When adding information to an already large note
- During knowledge base reviews to optimize note structure

## AI-Assisted Chunking Process
1. **Identify Distinct Concepts**: When asking Claude to chunk your notes, provide the full content and request identification of natural divisions based on:
   - Topic shifts
   - Conceptual boundaries
   - Unique ideas that could stand alone

2. **Create New Notes**: Ask Claude to:
   - Propose clear, descriptive titles for each chunk
   - Extract relevant content for each new note
   - Format according to the standard note template
   - Add appropriate frontmatter and tags

3. **Create Connections**: Request Claude to:
   - Suggest bidirectional links between related chunks
   - Identify existing notes that should link to these new chunks
   - Recommend MOC updates if applicable

4. **Create an Overview Note** (if needed):
   - Ask Claude to draft an overview note that links to all chunks
   - This should provide context for how the chunks relate to each other
   - This can serve as a mini-MOC for that specific topic

## Chunking Guidelines for Claude
- When providing instructions to Claude, specify:
  - Each chunk should focus on a single concept or idea
  - Chunks should be self-contained but interconnected
  - Aim for notes about half an A4 page in length (approximately 1000-1500 characters)
  - Each chunk must have appropriate tags and links to related notes
  - Use descriptive titles that clearly indicate the note's content

## Sample Prompt for Claude
```
Help me chunk this note into smaller, interconnected pieces:

[PASTE NOTE CONTENT]

Please:
1. Identify natural divisions in this content
2. Create separate notes for each chunk following my note template
3. Suggest bidirectional links between chunks
4. Create an overview note if appropriate
5. Keep each chunk focused on a single concept (half A4 page / 1000-1500 characters)
```