# Implementation Plan

## Development Strategy
Build incrementally, testing each piece before moving forward. After each step, evaluate whether the current approach still makes sense.

## Prerequisites
- Chrome/Edge browser for testing
- Access to a live curriculum page (IS MUNI)
- Sample curriculum markup for initial testing

---

## Phase 1: Content Extraction & Reference Detection

### Step 1: Extract Page Content
**Goal:** Get the main curriculum content from the active tab.

**Tasks:**
- Create basic extension structure (manifest.json, popup.html)
- Inject content script into active tab
- Identify the main content container in the DOM
- Extract innerHTML of curriculum content
- Log extracted content to console for verification

**Validation:**
- Does it capture all visible content?
- Are collapsible sections included when expanded?
- Is nested structure preserved?

**Checkpoint:** Review extracted HTML structure before proceeding.

---

### Step 2: Identify Referenced Resources
**Goal:** Find all links to downloadable resources in the curriculum content.

**Tasks:**
- Parse extracted content for `<a>` tags
- Filter links by URL pattern (internal university URLs only)
- Filter by file extension (PDF, DOC, DOCX, PPT, etc.)
- Create list of resource objects: `{ url, name, element }`
- Log resource list to console

**Validation:**
- Are all document links captured?
- Are external links correctly excluded?
- Test with sample markup provided by user

**Checkpoint:** Confirm resource detection accuracy with real page.

---

### Step 3: Resource Naming Logic
**Goal:** Extract meaningful names for each resource.

**Tasks:**
- Implement name extraction algorithm:
  1. Try link text first
  2. If generic, check parent element text
  3. If still generic, check nearest heading
  4. Fallback to URL filename
- Sanitize names (remove special chars, limit length)
- Add name deduplication (append numbers if duplicates)
- Update resource objects with extracted names

**Validation:**
- Do names match how resources are referenced in text?
- Are there any naming collisions?
- Test edge cases: empty link text, images as links, etc.

**Checkpoint:** Verify naming makes sense for reMarkable reading experience.

---

## Phase 2: PDF Generation

### Step 4: Generate Curriculum PDF
**Goal:** Convert curriculum page content to PDF preserving visual layout.

**Tasks:**
- Research browser print APIs: `window.print()` or html2pdf.js library
- Implement PDF generation of curriculum content
- Test different approaches:
  - Native browser print to PDF (if accessible via extension)
  - html2pdf.js library (if native approach limited)
- Save generated PDF to temporary location
- Verify PDF quality and layout preservation

**Validation:**
- Does PDF preserve layout as seen in browser?
- Are fonts, spacing, images intact?
- Is file size reasonable?

**Tech Stack Checkpoint:**
- Can we use native APIs or do we need a library?
- If library is needed, is vanilla JS + library still manageable?
- Are there browser limitations we need to work around?

---

## Phase 3: Download Orchestration

### Step 5: Download Single Resource
**Goal:** Download one resource file using existing auth session.

**Tasks:**
- Implement fetch() or XMLHttpRequest to download file
- Use blob response type to handle binary files
- Verify cookies/auth are passed correctly
- Handle CORS if needed
- Test with one PDF from real curriculum page

**Validation:**
- Does download succeed with user's session?
- Is file content intact?
- What error cases exist? (404, 403, timeout)

---

### Step 6: Batch Download Resources
**Goal:** Download all identified resources sequentially.

**Tasks:**
- Implement download queue/loop
- Add delays between requests (500ms-1s) to avoid rate limiting
- Track download progress (completed, failed, pending)
- Store downloaded files as blobs with names
- Implement error handling: skip failed files, continue process
- Send progress updates to popup UI

**Validation:**
- Can it handle 10+ files without failures?
- Does error handling work correctly?
- Is rate limiting avoided?

**Checkpoint:** Test with curriculum page that has many resources.

---

## Phase 4: Packaging & Delivery

### Step 7: Create Zip File
**Goal:** Package curriculum PDF and resources into structured zip.

**Tasks:**
- Integrate JSZip library
- Create zip with structure: `curriculum.pdf` at root, `resources/` folder
- Add curriculum PDF to zip
- Add each resource to `resources/` folder with extracted name
- Generate zip blob

**Validation:**
- Does zip structure match spec?
- Can user extract and read files?
- Are filenames correct?

---

### Step 8: Trigger Browser Download
**Goal:** Deliver zip file to user.

**Tasks:**
- Extract curriculum title from page (main heading, page title)
- Sanitize title for use as filename
- Use `chrome.downloads.download()` API to trigger download
- Set filename as `[curriculum-title].zip`
- Show completion message in popup

**Validation:**
- Does download trigger correctly?
- Is filename meaningful?
- Where does file land (Downloads folder)?

---

## Phase 5: UI & Polish

### Step 9: Build Popup UI
**Goal:** Create simple, functional interface.

**Tasks:**
- Design minimal popup:
  - "Download Materials" button
  - Progress indicator (X of Y files)
  - Status messages (starting, downloading, complete)
  - Error summary if applicable
- Wire up popup.js to trigger download flow
- Send messages between popup and background script
- Handle loading states

**Validation:**
- Is UI clear and functional?
- Does progress update in real-time?
- Are errors communicated clearly?

---

### Step 10: Testing & Refinement
**Goal:** Validate on real curriculum pages, fix edge cases.

**Tasks:**
- Test on multiple curriculum pages (different structures)
- Test edge cases:
  - No resources found
  - All resources fail to download
  - Very long resource list
  - Special characters in filenames
  - Large files (slow downloads)
- Fix bugs discovered during testing
- Optimize performance if needed

---

## Tech Stack Evaluation Schedule

**After Step 3:** Evaluate DOM parsing and naming logic
- Is vanilla JS sufficient for complex DOM traversal?
- Are there patterns emerging that would benefit from a framework?

**After Step 4:** Evaluate PDF generation approach
- Did native APIs work or did we need a library?
- Is PDF quality acceptable?

**After Step 6:** Evaluate download orchestration
- Is sequential downloading performant enough?
- Do we need worker threads or parallel downloads?
- Is error handling robust?

**After Step 10:** Final architecture review
- Did vanilla JS + minimal dependencies work?
- What would we change for v2?
- Are there performance bottlenecks?

---

## Handoff to CLI Tool (Claude Code / Gemini CLI)

Each step can be implemented by providing:
1. Current state of codebase
2. Step number and goal
3. Relevant context (e.g., sample markup for Step 2)
4. Specific requirements from this document

The CLI tool should implement the step, run basic validation, and return code for review before proceeding to next step.
