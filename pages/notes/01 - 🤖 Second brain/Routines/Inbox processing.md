# 02 - 📩 Inbox Processing

Inbox contains notes that I have compiled by myself by learning from various sources - books, articles, videos, classes.

## **📍 Processing Scope**
When asked to process second brain inbox, **focus specifically on content in the `02 - 📩 Inbox` folder**.

## Special Processing for 'Random' Notes
- 'Random' notes contain weekly collections of bullet points from different sources
- Process each bullet point separately
- For each point:
  - Find an appropriate existing node in the knowledge base to append to
  - If no appropriate node exists, create a new one
  - Be aware that multiple bullet points may relate to one common topic
  - Group related bullet points together when creating or updating nodes
- **Preventing Duplication**:
  - Before creating a new node, check if the concept is already captured in an existing node
  - If a concept appears to deserve its own node but is closely related to an existing one (e.g., "Psychological Safety" vs "Team Effectiveness"), choose the broader concept as the main node and incorporate the more specific concept within it
  - Add appropriate tags to ensure the incorporated concepts are still discoverable
  - When in doubt, favor enhancing existing nodes rather than creating highly overlapping new ones

## **📖 Book Processing Workflow**

### **Input Format:**
- A5 pages with handwritten bullet points
- Pages numbered with Roman numerals (I, II, III...) in top corner
- First page contains book title as first bullet point
- Photos provided page by page

### **Processing Steps:**

#### **1. Transcription Phase**
- Transcribe handwritten text from each page photo to digital text
- **Preserve hierarchical indentation structure** - if bullet points are indented under other points, maintain that relationship using proper markdown indentation
- **Preserve emphasis formatting**:
  - If text is underlined in handwriting, use *emphasized text* in markdown
  - If line starts an exclamation mark (!), **bold the entire line**
- Compile all pages into single continuous note (no page breaks in final RAW file)
- Keep all content verbatim (following core principle of no expansions/embellishments)

#### **2. RAW File Creation**
- **Storage Location**: `04 - 💽 RAW/[YEAR]/[MONTH]/[DAY]/[BOOK_TITLE].md`
  - **File naming**: Use clean book title without suffixes like "_Notes" or volume numbers like "_I"
  - Example: "How_to_Speak_Machine.md" not "How_to_Speak_Machine_I_Notes.md"
- **Structure**:
  ```markdown
  ---
  title: "[Book Title] - Reading Notes"
  date: YYYY-MM-DD
  tags: [book-notes, reading, [relevant-tags]]
  source: "[Book Title by Author]"
  type: raw-material
  layout: note.njk
  ---
  
  # [Book Title] - Reading Notes
  
  ## AI-assisted Summary
  [Brief 2-paragraph summary of main themes and insights]
  
  ## Raw notes
  
  [All transcribed bullet points compiled together]
  
  ## Related notes
  [Links to enriched/created knowledge nodes]
  ```

#### **3. Summary Creation**
- **Always create AI-assisted summary** for book notes (regardless of character count - exception to normal rule)
- Follow existing format: 2 paragraphs, 5-7 sentences max
- First paragraph: Core themes/main ideas from the book
- Second paragraph: Key applications/implications/specific insights

#### **4. Insight Distillation & Knowledge Enrichment**
- **Identify 3-5 most insightful concepts** from the book notes
  - there's a high chance that some of those concepets will be those that are marked out with an asterisk in handwritten notes
- **Search existing knowledge base** in `10 - 🧠 Knowledge/2 - 🌱 Areas` and `10 - 🧠 Knowledge/3 - 📚 Resources`
- **Extract inspirational quotes**: If notes contain quotes attributed to specific people, add them to `10 - 🧠 Knowledge/3 - 📚 Resources/Learning/Inspirational Quotes.md`
- **For each key insight**:
  - Find the most relevant existing knowledge node
  - If perfect match exists: Append insight to existing node (preserving exact wording)
  - If no match: Create new knowledge nugget in appropriate subfolder
  - Add reference back to the RAW book notes
  - Update related notes connections bidirectionally

#### **5. Enhanced Linking**
- **In RAW book notes**: Add "Related notes" section linking to any enriched/created knowledge nodes
- **In enriched knowledge nodes**: Add back-reference to the book notes in RAW folder
- **Use clean link format**: Use simple note names `[[Note Name]]` rather than full paths `[[10 - 🧠 Knowledge/3 - 📚 Resources/...]]`
  - Good: `[[MVP]]`, `[[Team Effectiveness]]`, `[[Innovation]]`
  - Bad: `[[10 - 🧠 Knowledge/3 - 📚 Resources/Development/MVP]]`
- **Follow existing validation rules**: Verify all links exist before adding

#### **6. Cleanup**
- Move any intermediate processing files to `03 - 🗑️ Dump/YYYY-MM-DD/`
- Keep final RAW book notes in RAW folder
- Keep enriched knowledge nodes in Knowledge folders
- **Run validation**: Use `validate_notes.py --check-summaries` to verify all links are valid
  ```bash
  cd "01 - 🤖 Second brain/scripts/"
  python validate_notes.py "../../.." --check-summaries
  ```

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
   * **REQUIRED: Place YAML frontmatter metadata at the very top of each file**
   * Add only essential metadata (title, creation date, tags)
   * Create simple linking structure to relevant notes
   * Keep original formatting whenever possible
5. **Connect**: Add bidirectional links to related notes where appropriate
6. **Cleanup**:
   * Move processed inbox notes to the Dump folder with today's date: `03 - 🗑️ Dump/YYYY-MM-DD/`
   * Include both the original notes and any intermediate processing files
   * Use descriptive filenames (e.g., append "-original" to original files)
   * Git provides backup in case recovery is needed

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
  * After creating the combined note, move the original source notes to the Dump folder following the cleanup process
  * Any temporary or interim files should also be moved to the Dump folder

## Process
- Take a look at what is in a given note and assign 5 tags to it based on [[Tagging]] process
- Use appropriate templates from [[01 - 🤖 Second brain/Templates/note-template|Note Template]] for structured processing

## **🔗 Related Notes Validation (CRITICAL)**
Find 5 related nodes in my existing knowledge base **ONLY** from these specific folders:
- `10 - 🧠 Knowledge/2 - 🌱 Areas` 
- `10 - 🧠 Knowledge/3 - 📚 Resources`

**VALIDATION REQUIREMENTS:**
1. **Verify existence**: Before adding any link to "Related notes", you MUST confirm the linked note actually exists in one of the above folders
2. **No Projects folder links**: NEVER link to files in `10 - 🧠 Knowledge/1 - 🚀 Projects` folder in "Related notes" section
3. **No RAW links in Related notes**: NEVER link to files in `04 - 💽 RAW` folder in "Related notes" section
4. **No processing links in Related notes**: NEVER link to files in `99 - 📄 To process` folder in "Related notes" section
5. **No made-up links**: NEVER create links to notes that don't exist
6. **Search first**: Use the knowledge base search to find actual existing notes before creating links
7. **Quality over quantity**: It's better to have 2-3 real, relevant links than 5 links with some being fictional
8. **RAW references OK in content**: It's perfectly fine to reference RAW or other folders within note content, just not in "Related notes" section

**Link Format**: Create a section `Related notes` at the end of the file and link exactly 5 related notes as bullet points:
```markdown
## Related notes
- [[Actual Note Title]]
- [[Another Real Note]]
- [[Third Existing Note]]
- [[Fourth Real Note]]
- [[Fifth Existing Note]]
```

If you cannot find enough related notes in the valid folders, search more broadly or use loosely related concepts rather than creating fake links.

## **📏 AI-assisted Summary Logic (Updated)**

### For NEW notes:
- **Include summary only for notes longer than 1500 characters**
  - If a note is longer than that, create a section on top called `AI-assisted summary` with a concise summary of the main ideas
  - Structure this summary into at least two paragraphs for better readability
  - First paragraph should cover the core concept/main idea
  - Second paragraph should expand on application, implications, or specific details
  - Aim for 5-7 sentences length max, it should be like 8 lines of text at most
  - Then add horizontal line
- If a note is shorter, ignore this
- **Exception for book notes**: Always create AI-assisted summary regardless of character count

### **For UPDATED/EXPANDED notes (NEW REQUIREMENT):**
- **After adding content to an existing note**, check the total character count of the final note
- **If the updated note now exceeds 1500 characters AND doesn't already have an AI-assisted summary:**
  - Generate a new `AI-assisted summary` section at the top of the note
  - Follow the same formatting and length guidelines as for new notes
  - The summary should cover the entire note content (original + newly added)
- **If the note already has an AI-assisted summary and new content was added:**
  - Update the existing summary to reflect the expanded content
  - Maintain the same format and length constraints
- **If the updated note is still under 1500 characters:**
  - Do not add an AI-assisted summary

## Chunking
- For longer notes (over 500 characters), consider using the [[Chunking]] process to break them into more focused, interconnected notes

## Storage
- Inbox serves as the entrypoint to new knowledge
- **Important workflow clarification** - Content type determines destination folder:
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
* **Never create fictional links in "Related notes" sections**
* **Never link to RAW, "To process", or Projects folders in "Related notes"**

# Typical Information Coming In
## Notes
- It is "passive" knowledge that I gathered somewhere
  - Notes from books, articles, podcasts, attended lectures, conferences or classes
## Research Artifacts
- Interview and workshop debriefs notes, post-mortems and learning
- Research plans, scripts and reports
## Serendipity Moments
- "A-ha moments" in shower, toilet, while biking etc
- These are going to be pretty small
## Design Artifacts
- Prototypes, test results, boundary objects and results when doing some further research with them
## Reflections
- Weekly or monthly recaps and learnings on what went well and what did not and maybe with some actionables
