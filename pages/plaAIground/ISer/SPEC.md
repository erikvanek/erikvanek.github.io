# Study Path Downloader - Browser Extension Spec

## Purpose
Download all materials from a university study path curriculum page into a structured zip file, including the curriculum content (as PDF) and all nested referenced resources.

## User Flow
1. User navigates to a study path curriculum page (IS MUNI)
2. User clicks browser extension icon
3. Extension scrapes current page, preserves content structure, identifies all referenced resources
4. Extension downloads curriculum as PDF and all referenced files (only internal university URLs)
5. Extension packages everything into a zip file
6. User receives: `[curriculum-title].zip`

## Output Structure
```
Curriculum-Title.zip
├── curriculum.pdf          # Visual PDF of the curriculum page (preserves layout)
└── resources/              # Folder containing all referenced materials
    ├── Smith2023.pdf
    ├── Chapter3-Notes.pdf
    └── Lecture-Slides.pdf
```

**File naming:**
- Zip file: Extracted from main page title/heading
- Resources: Named as they appear in curriculum references (link text or context), not URL filenames

## Technical Constraints
- **Vanilla JavaScript only** - no build tools, no bundlers
- **Manifest V3** browser extension (Chrome/Edge primary target)
- **Incremental development** - validate approach at each step
- **Minimal dependencies** - only include libraries when essential (JSZip for packaging)

## Core Functionality

### 1. Content Extraction
- Parse active tab DOM
- Extract main curriculum content
- Preserve structure (headings, lists, nested sections)
- Identify all resource links within content

### 2. Link Filtering
- Only process URLs pointing to university information system
- Exclude external domains (YouTube, third-party sites)
- Focus on document types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
- Use URL hostname/path patterns to identify internal resources

### 3. Resource Naming
- Extract meaningful names from link text
- If link text is generic ("here", "download", "attachment"), look at surrounding context:
  - Nearest heading
  - Parent list item text
  - Adjacent text nodes
- Fallback to filename from URL if no clear name exists
- Sanitize names for filesystem compatibility (remove special chars)

### 4. PDF Generation
- Generate visual PDF of curriculum page using browser print API
- Preserve layout, formatting, styling as seen in browser
- Handle collapsible sections (content should be visible when page is in "show all" state)

### 5. Download Orchestration
- Use existing browser session/cookies for authentication
- Download curriculum PDF first
- Download resources sequentially (to avoid rate limiting)
- Track progress for each file

### 6. Packaging
- Use JSZip library to create zip file
- Structure: curriculum.pdf at root, resources in subfolder
- Trigger browser download of final zip

## Error Handling
- Skip individual files that fail to download
- Log failures to browser console
- Continue with remaining files
- Show summary at completion: "Downloaded X of Y files, Z failed"
- Don't block entire process on single file failure

## Browser Extension Structure

### Manifest (manifest.json)
```json
{
  "manifest_version": 3,
  "name": "Study Path Downloader",
  "version": "1.0.0",
  "permissions": ["activeTab", "downloads", "scripting"],
  "host_permissions": ["*://*.muni.cz/*"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### Files
- `manifest.json` - Extension configuration
- `popup.html` - Simple UI (button to trigger download, progress indicator)
- `popup.js` - Popup logic
- `content.js` - Content script (injected into page to extract content)
- `background.js` - Service worker (orchestrates downloads, creates zip)
- `lib/jszip.min.js` - JSZip library (only external dependency)

## Permissions Required
- `activeTab` - Read current page content
- `downloads` - Trigger zip file download
- `scripting` - Inject content script
- Host permissions for `*.muni.cz` (university domain)

## Implementation Approach
See `IMPLEMENTATION.md` for step-by-step build plan.

## Future Enhancements (Post-MVP)
1. **Markdown output option** - Generate curriculum.md instead of PDF
2. **Batch download** - Multiple curriculum pages at once
3. **Settings panel** - Choose PDF vs markdown, naming patterns, file filters
4. **Progress persistence** - Resume interrupted downloads

## Tech Stack Evaluation Points
After implementing each step, evaluate:
- Is vanilla JS still manageable or are we fighting the browser?
- Do we need a build step yet? (probably not until complexity demands it)
- Are there browser API limitations we're hitting?
- Should we reconsider architecture if patterns become unwieldy?

The goal is to stay lean until the problem demands more tooling.
