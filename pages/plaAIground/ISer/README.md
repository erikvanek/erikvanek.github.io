# Study Path Downloader - Quick Start

## What This Is
Browser extension that downloads university curriculum pages (IS MUNI) as PDF plus all referenced resources into a structured zip file, ready for reMarkable.

## Spec Files
- **SPEC.md** - Full specification, architecture, requirements
- **IMPLEMENTATION.md** - Step-by-step build plan (10 phases)
- **TECHNICAL_NOTES.md** - Design decisions, pitfalls, evaluation points

## Tech Stack
- Vanilla JavaScript (no build tools)
- Manifest V3 browser extension
- JSZip library (only dependency)
- html2pdf.js (for PDF generation)

## Getting Started

### 1. Prepare Sample Markup
Before implementation, provide:
- HTML markup from a typical curriculum page
- Markup from a complex page (many resources, nested structure)
- Screenshots showing resource naming in context

This validates the reference detection logic before building the full extension.

### 2. Follow Implementation Plan
Build in order (IMPLEMENTATION.md):
- **Phase 1:** Content extraction & reference detection (Steps 1-3)
- **Phase 2:** PDF generation (Step 4)
- **Phase 3:** Download orchestration (Steps 5-6)
- **Phase 4:** Packaging & delivery (Steps 7-8)
- **Phase 5:** UI & polish (Steps 9-10)

### 3. Evaluate at Checkpoints
After Steps 3, 4, 6, and 10:
- Review technical approach (still vanilla JS? Still working well?)
- Check for emerging patterns (need utilities? frameworks?)
- Validate output quality (PDFs, naming, structure)

## Handoff to CLI Tool
For each step:
```
1. State current step number and goal
2. Provide existing code files
3. Include relevant context (sample markup, edge cases)
4. Let tool implement step
5. Review, test, evaluate
6. Continue to next step or adjust plan
```

## Key Constraints
- No npm, no bundlers, no build step (unless complexity demands it)
- Chrome/Edge target (Manifest V3)
- Internal university URLs only (no external resources)
- Sequential downloads (avoid rate limiting)

## Expected Behavior
**Input:** User clicks extension on curriculum page  
**Output:** `Curriculum-Title.zip` containing:
```
├── curriculum.pdf
└── resources/
    ├── Smith2023.pdf
    ├── Chapter3-Notes.pdf
    └── ...
```

## Next Step
Provide sample curriculum page markup to validate reference detection approach before starting Phase 1 implementation.
