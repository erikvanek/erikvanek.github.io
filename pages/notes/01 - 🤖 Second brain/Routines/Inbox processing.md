# 02 - 📩 Inbox
- Inbox contains notes that I have compiled by myself by learning from various sources - books, articles, videos

## Core Principles
* Preserve original content exactly as written - no expansions or embellishments
* Maintain the original brevity and structure of notes
* Never add AI-generated content to "improve" or "enhance" notes
* Focus on organization and connections, not content creation

## Processing Workflow
1. **Analyze First**: Review all inbox notes to understand their content and relationships
2. **Categorize**: Determine if each note is:
   * A RAW material (store in RAW folder)
   * A knowledge nugget (store in Knowledge folder)
   * A fragment that could be combined with another inbox note
   * Content that could enhance an existing knowledge note
3. **Process Appropriately**:
   * Move RAW materials to: `04 - 💽 RAW/[YEAR]/[MONTH]/[DAY]/[NOTE_TITLE].md`
   * Move knowledge nuggets to appropriate Knowledge subfolder
   * If combining notes, maintain all original content from both notes
   * If enhancing existing notes, append content verbatim - don't rewrite or expand it
4. **Structure Minimally**:
   * Add only essential metadata (title, creation date, tags)
   * Create simple linking structure to relevant notes
   * Keep original formatting whenever possible
5. **Connect**: Add bidirectional links to related notes where appropriate
6. **Cleanup**:
   * Delete processed inbox notes and any temporary files once processed
   * Git provides backup in case deletion needs to be reversed

## Note Combination Guidelines
* **When to Combine Notes**:
  * Notes that explicitly reference each other
  * Notes covering the same concept from different angles
  * Notes that would be more useful as a single cohesive unit
  * Fragments that naturally complement each other
* **How to Combine Notes**:
  * Preserve 100% of the original content from all combined notes
  * Interweave related content when it makes sense, rather than simply appending
  * Choose the most fitting title for the content, not necessarily a broader umbrella title
  * Restructure into logical sections that maintain the spirit of the original notes
  * Merge related bullet points that address the same concept
  * Combine all relevant bidirectional links in a single "Related notes" section
* **Absolute Requirements**:
  * Never paraphrase or alter the specific wording within bullet points
  * Never add explanatory text between original content points
  * Preserve the core concepts and ideas exactly as written
  * Don't add AI-generated transitions between combined elements
* **Cleanup After Combining**:
  * After creating the combined note, delete the original source notes
  * Any temporary or interim files should also be deleted

## Process
- Take a look at what is in a given note and assign 5 tags to it based on [[Tagging]] process
- Use appropriate templates from [[01 - 🤖 Second brain/Templates/note-template|Note Template]] for structured processing

## Related nodes
- Find 5 related nodes in my existing knowledge base (only in folders `10 - 🧠 Knowledge`) that this nugget is related to, create a section `Related notes` at the end of the file and link those related notes as bullet points
	- If you don't find enough related notes in those two subfolders, it's fine

## AI-assisted summary
- **!important** include summary only for notes longer than 1500 characters
	- if a note is longer than that create a section on top called `AI-assisted summary` with a concise summary of the main ideas
	  - Structure this summary into at least two paragraphs for better readability
	  - First paragraph should cover the core concept/main idea
	  - Second paragraph should expand on application, implications, or specific details
	  - Aim for 5-7 sentences length max, it should be like 8 lines of text at most
	  - then add horizontal line
  - if a note is shorter, ignore this

## Chunking
- For longer notes (over 500 characters), consider using the [[Chunking]] process to break them into more focused, interconnected notes

## Storage
- Inbox serves as the entrypoint to new knowledge
- **important workflow clarification** - Content type determines destination folder:
  1. **RAW materials** (book notes, interview transcripts, article summaries, attended lectures):
     - Store in `04 - 💽 RAW` following: `04 - 💽 RAW/[YEAR]/[MONTH]/[DAY]/[NOTE_TITLE].md`
     - Example: `04 - 💽 RAW/2025/04/06/Book_Notes.md`
  2. **Knowledge nuggets** (concepts, principles, methods, insights):
     - Store directly in relevant subfolder of `10 - 🧠 Knowledge` (typically under `3 - 📚 Resources`)
     - Example: `10 - 🧠 Knowledge/3 - 📚 Resources/Development/Technical_Debt.md`
  3. Always enhance with proper metadata, tags, AI summary (if needed), and related notes
  4. Delete original inbox notes after proper storage

## Absolute Restrictions
* Never expand bullet points into paragraphs
* Never add information not present in original notes
* Never reorganize the internal structure of notes
* Never change writing style or terminology
* Never "improve" note content with AI-generated material

# Typical information coming in
## Notes
- it is "passive" knowledge that I gathered somewhere
	- notes from books, articles, podcasts, attended lectures, conferences or classes
## Research artifacts
- Interview and workshop debriefs notes, post-mortems and learning
- Research plans, scripts and reports
## Serendipity moments
- "A-ha moments" in shower, toilet, while biking etc
- These are going to be pretty small
## Design artefacts
- prototypes, test results, boundary objects and results when doing some further research with them
## Reflections
- weekly or monthly recaps and learnings on what went well and what did not and maybe with some actionables