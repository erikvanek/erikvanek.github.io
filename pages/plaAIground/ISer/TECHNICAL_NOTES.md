# Technical Notes & Decision Rationale

## Architecture Decisions

### Vanilla JavaScript + Minimal Dependencies
**Why:**
- Avoids build step complexity for MVP
- Faster iteration during development
- Easier to debug in browser DevTools
- Less abstraction = clearer understanding of browser APIs

**Watch for:**
- DOM manipulation becoming unwieldy
- Repetitive patterns that would benefit from utility functions
- Callback hell or promise chain complexity

**Pivot if:** Code becomes harder to reason about than the tooling would be.

---

### Manifest V3
**Why:**
- Chrome/Edge default, Manifest V2 being deprecated
- Service workers instead of background pages (better resource usage)

**Constraints:**
- Service workers can be terminated by browser (must handle state carefully)
- No persistent background page means downloads must complete in one session
- Some APIs work differently than Manifest V2

**Mitigations:**
- Keep download process in single service worker invocation
- Store minimal state, reconstruct from messages if needed

---

### Sequential Downloads (Not Parallel)
**Why:**
- Simpler error handling
- Avoids rate limiting
- Easier to track progress
- Most curriculum pages have <20 resources, speed not critical

**Watch for:**
- User frustration with long download times
- Rate limiting even with delays

**Pivot if:** Pages consistently have 50+ resources and users complain about speed.

---

## Key Technical Challenges

### Challenge 1: PDF Generation
**Problem:** How to convert curriculum page to PDF while preserving layout?

**Options:**
1. **Native browser print API** (`window.print()`)
   - Pros: No dependencies, uses browser's own rendering
   - Cons: Limited control, requires user interaction (?)
   
2. **html2pdf.js / jsPDF + html2canvas**
   - Pros: Programmatic, no user interaction
   - Cons: Adds dependency (~300KB), rendering may differ from browser

3. **Headless Chrome via API** (future consideration)
   - Pros: Perfect rendering
   - Cons: Requires backend service, overkill for MVP

**Recommendation:** Start with html2pdf.js. It's the pragmatic choice for automated PDF generation with decent quality. Re-evaluate if rendering quality is poor.

---

### Challenge 2: Authentication & Cookies
**Problem:** Downloads need to work with user's authenticated session.

**Solution:**
- Content script runs in context of page (has access to cookies)
- Use `fetch()` with `credentials: 'include'` to pass cookies
- Verify same-origin policy doesn't block requests

**Watch for:**
- CORS issues if resources are on different subdomains
- Session expiration during long download processes

---

### Challenge 3: Resource Name Extraction
**Problem:** Links may have generic text like "Download", "here", "PDF", etc.

**Strategy:**
```
1. Check link text (e.g., "Smith2023.pdf")
   └─> If meaningful → use it

2. Check parent element text
   └─> e.g., <li>Chapter 3 Notes <a>download</a></li>
   └─> Extract "Chapter 3 Notes"

3. Check nearest heading
   └─> <h3>Week 1: Introduction</h3>
   └─> <a>lecture slides</a>
   └─> Extract "Week 1 Introduction - lecture slides"

4. Fallback to URL filename
   └─> Extract from URL path
```

**Edge cases:**
- Multiple resources with same name → append numbers
- Special characters in names → sanitize for filesystem
- Empty link text with image → use image alt text

---

### Challenge 4: Large Files & Timeouts
**Problem:** Some resources may be large (multi-MB PDFs), download takes time.

**Mitigations:**
- Set reasonable fetch timeout (30-60 seconds)
- Show progress per file, not just overall count
- Allow individual file failures without blocking process

**Watch for:**
- Browser memory issues with many large files in memory
- Service worker termination during long downloads

**Pivot if:** Need to implement streaming downloads or chunk processing.

---

## Browser API Considerations

### Content Scripts vs Background Service Worker
**What runs where:**

**Content Script** (`content.js`):
- Injected into curriculum page
- Has access to page DOM
- Can read page content, extract links
- Shares page's security context (cookies, origin)

**Service Worker** (`background.js`):
- Runs in extension context (isolated)
- No DOM access
- Orchestrates downloads
- Creates zip file
- Triggers browser downloads

**Communication:** Use `chrome.runtime.sendMessage()` for content → background messages.

---

### Download API Behavior
`chrome.downloads.download()` triggers browser's native download manager:
- File goes to user's default Downloads folder
- User sees browser download progress indicator
- Can be interrupted/cancelled by user

**Alternatives considered:**
- Generate blob URL and use `<a download>` - less reliable, no progress
- File System API - requires user permission, more complex

**Chosen approach:** Use native download API for simplicity and user familiarity.

---

## Common Pitfalls

### Pitfall 1: Service Worker Lifecycle
Service workers can be terminated by browser after ~30 seconds of inactivity.

**Solution:** Keep download process active by continuously sending messages or use `chrome.runtime.onMessage` with long-lived connections.

**Alternatively:** Complete entire download in one invocation (reasonable for <50 files).

---

### Pitfall 2: CORS & Cross-Origin Resources
If resources are hosted on different domain than curriculum page, CORS may block fetch.

**Check:** Look at actual resource URLs in sample markup.

**Solutions:**
- Request `host_permissions` for resource domains in manifest
- Use `mode: 'no-cors'` (but can't read response then - not viable)
- If unfixable: Document limitation and skip cross-origin resources

---

### Pitfall 3: File Name Sanitization
Filesystem-illegal characters in extracted names: `/ \ : * ? " < > |`

**Solution:** Sanitize with regex, replace with underscores or hyphens.

**Also watch for:**
- Extremely long names (>255 chars) - truncate
- Names starting with dots (hidden files on Unix) - prepend underscore
- Reserved names on Windows (CON, PRN, AUX) - handle specially

---

### Pitfall 4: Zip File Size
If curriculum has many large resources, zip file can be huge (100+ MB).

**Considerations:**
- JSZip works in-memory (browser RAM limit)
- Large downloads take time
- User may not expect giant file

**Mitigation:**
- For MVP, document limitation (works best for <50MB total)
- Future: Stream zip creation, add progress bar for zip generation

---

## Testing Strategy

### Unit Testing (Manual for MVP)
Test each function in isolation using browser console:
- Resource extraction with various markup patterns
- Name sanitization with edge case strings
- URL filtering with different domain patterns

### Integration Testing
Test complete flow on real curriculum pages:
- Simple page (few resources, clean markup)
- Complex page (many resources, nested structure)
- Edge case page (no resources, all external links)

### Browser Compatibility
Primary: Chrome/Edge (Manifest V3 support)
Secondary: Firefox (requires minor manifest tweaks)

**Don't support:** Safari (extension model too different), older browsers

---

## Performance Expectations

### Baseline Performance (Rough Estimates)
- Content extraction: <100ms
- Resource detection: <200ms
- PDF generation: 1-3 seconds (depends on page complexity)
- Download per file: 0.5-5 seconds (depends on size, network)
- Zip creation: 0.5-2 seconds (depends on file count/size)

**Total time for typical page (10 resources):** 10-30 seconds

**Acceptable:** <1 minute for most curriculum pages
**Needs optimization:** >2 minutes

---

## Future Optimization Opportunities

### If Performance Becomes Issue
1. **Parallel downloads** - download 3-5 files concurrently
2. **Worker threads** - offload zip creation to worker
3. **Incremental zip** - stream files into zip as downloaded
4. **Caching** - remember already-downloaded resources across sessions

### If Complexity Grows
1. **TypeScript** - type safety for message passing, data structures
2. **Build step** - Webpack/Rollup for code splitting, tree shaking
3. **State management** - Redux-like pattern for service worker state
4. **Testing framework** - Jest/Vitest for automated tests

**Rule of thumb:** Only add complexity when pain of not having it exceeds pain of adding it.

---

## Handoff Context for CLI Tools

When handing steps to Claude Code or Gemini CLI, provide:

1. **Current file state** - all relevant code files
2. **Step goal** - from IMPLEMENTATION.md
3. **Context** - sample markup, known edge cases
4. **Success criteria** - how to verify step is complete
5. **Constraints** - must use vanilla JS, no npm packages except JSZip

After each step:
- Review generated code
- Test in browser
- Check this document's "Watch for" sections
- Decide if current approach still makes sense
- Adjust plan if needed before next step
