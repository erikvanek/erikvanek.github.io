---
title: Progress Log
created: 2026-03-04
status: active
type: log
---

# Progress Log

Running log of what was done, when, and by whom. Append entries at the top (newest first). Check this first when resuming after a break — it tells you where things stand without having to re-read everything.

See [[Revival-Strategy]] for the full plan and [[Decision-Log]] for structural decisions.

---

## Current State (update this section when resuming)

**Last active**: 2026-03-05  
**Current phase**: Phase 3 complete. Phase 4 (weekly routine) ready to start.  
**Blocking**: 9 binary files in `99 - 📄 To process` need manual moves in Finder (see below).  
**Next action**: Manually move binary files, git commit, then begin Phase 4.

---

## Log Entries

### 2026-03-05 — Phase 3 complete: 99 backlog processed
**By**: Claude (session with Erik)

**What happened**:
All markdown content in `99 - 📄 To process` has been triaged and migrated. The folder now contains only binary files (PDFs, PNGs, XLSX) that cannot be moved via MCP — these need manual handling in Finder.

**Subfolders processed**:
- `design/` (~35 files) — fully reconciled against `Resources/Design/`; 17 migrated, 11 discarded (stubs/empty/superseded), 2 links merged into existing Prototyping.md
- `JTBD/` (7 md + 5 PNGs) — all markdown migrated to `Resources/Product/JTBD/`; 5 images remain (manual move needed)
- `Tools 1/` (7 md + scoresheet folder) — all markdown migrated to `Resources/Design/Tools/`; scoresheet XLSX+PDF remain (manual move needed)
- `Knowledge/Design/Tools/` — only Nesta Playbook PDF remains (manual move needed)
- All other subfolders (Lectures/, Planning/, Product Management/, Themes/, tools/) — fully processed

**Root-level files** (35 files): all processed — ~25 migrated, ~10 discarded (empty/stub/stale/duplicate)

**Key destinations**:
- `Resources/Design/Concepts/` — Ability, Boundary objects, Buzzwords, Cone of possibilities, Design Thinking, Glossary, Humans, Indexing, Memory, Speculative design
- `Resources/Design/Discovery/` — Calendly, Codebook, Customer research synthesis, Fake door tests, Interview Reflections/, Recruiting for research, Selective coding, Trauma informed research, Usability goals
- `Resources/Design/Tools/` — Business model canvas, Business analysis, Design brief, Design tools, Journey maps, Persona, Service blueprint, System maps, Three horizons
- `Resources/Design/` — Agencies, AI, AI-native design, Design checklist, Design competence, Design conferences, Design portfolios, Education, Institutions, People, Random finds, Reference links, Research through design, Service design, Working with clients
- `Resources/Design/Activities/` — Design activities, Workshops
- `Resources/Product/` — Agile, Navigating the corporate maze, Product risk taxonomy, Product teams, Risk management
- `Resources/Product/JTBD/` — Activity-centered design, Competition, Growth, Measuring, Motivation, Value, Value proposition
- `Resources/Technology/` — Human in the loop, MCP, Tools 2024
- `Resources/Team/` — Company culture, Debriefing
- `Resources/Personal Development/` — Learning techniques, Mindset, Personal effectiveness, Reflection
- `Areas/Home/Recipes/` — Kuře (Czech recipe)
- `Areas/Personal development/` — previously migrated in Phase 3 earlier (resume, experiences, travel)
- `Resources/Learning/Courses/` — DESB42 Czech course notes

**Discarded** (stub/empty/duplicate/stale):
- design/: Design.md, Human-centered design.md, Double diamond.md, Ideation.md, VUCA world.md, Implementation.md, Good design.md, Social design.md, Design for public.md, Treninky.md, Design methods stubs, Walkthroughs (empty)
- Root: Freelancing.md, Problem statements.md, Prompt engineering.md, Remote.md, System-Integration-README.md, feature.md
- Product Management/: Navigating_Corporate_Maze.md + PM_Challenges_and_Strategies.md (duplicates of Lectures/ version)
- Themes/: Measuring_Business_Value.md + Outcome_Driven_Product_Strategy.md (superseded by richer existing notes)

**Binary files requiring manual move** (Finder):
| File | Current location | Suggested destination |
|------|-----------------|----------------------|
| AFA Workshop Templates.pdf | `99/design/` | `Resources/Design/Tools/` |
| Nesta Playbook.pdf | `99/Knowledge/Design/Tools/` | `Resources/Design/Tools/` |
| TheMoment-ServiceDesignScorecard-Worksheet-V2.xlsx | `99/Tools 1/Design tools/Service design scoresheet/` | `Resources/Design/Tools/Service design scoresheet/` |
| themoment_ServiceDesignScoresheetGuide_FINAL-1.pdf | `99/Tools 1/Design tools/Service design scoresheet/` | `Resources/Design/Tools/Service design scoresheet/` |
| Pasted image 20241225133343.png | `99/JTBD/` | `Resources/Product/JTBD/` |
| Pasted image 20241225134006.png | `99/JTBD/` | `Resources/Product/JTBD/` |
| Pasted image 20241225134148.png | `99/JTBD/` | `Resources/Product/JTBD/` |
| Pasted image 20241225134219.png | `99/JTBD/` | `Resources/Product/JTBD/` |
| Pasted image 20241225134243.png | `99/JTBD/` | `Resources/Product/JTBD/` |

**Vault changes**: ~100 files deleted from `99 - 📄 To process`, ~80 files created across Knowledge and Areas  
**Git commit**: Not yet — commit after manual binary file moves  
**Czech flags**: Workshops.md migrated as-is in Czech (workshop prep notes, minimal); Kuře.md migrated as Czech recipe to Areas/Home/Recipes/

---

### 2026-03-05 — Phase 2 complete: interim knowledge absorbed
**By**: Claude (session with Erik)  
**What happened**:
- Triaged all 20 notes in `11 - ⏳ interim knowledge`
- 14 notes migrated to `10 - 🧠 Knowledge`
- 1 Czech note staged with flag (UX Customer Experience.md)
- 5 stale MOC files discarded (Design-MOC, Learning-MOC, ProductManagement-MOC, Productivity-MOC, Research-MOC — all had broken links to old paths)
- `11 - ⏳ interim knowledge` folder is now empty and removed

**File routing — migrated**:
- `Design/Books/Hooked.md` → `Resources/Design/`
- `Design/Books/TISDD.md` → `Resources/Design/`
- `Design/Concepts/Prototyping.md` → `Resources/Design/Delivery/`
- `Design/Methods/Lo-Fi_Prototyping_Methods.md` → `Resources/Design/Delivery/`
- `Design/Design Crit.md` → `Resources/Design/Activities/`
- `Learning/Learning.md` → `Resources/Learning/`
- `ProductManagement/Books/Outcomes_over_Output.md` → `Resources/Product/`
- `ProductManagement/Measuring Business Value.md` → `Resources/Product/`
- `ProductManagement/Product Discovery.md` → `Resources/Design/Discovery/`
- `Productivity/Eisenhower Matrix.md` → `Resources/Personal Development/`
- `Productivity/Productivity.md` → `Resources/Personal Development/`
- `Productivity/Second Brain.md` → `Resources/Personal Development/`
- `Research/Books/The_Mom_Test.md` → `Resources/Design/Discovery/`
- `Research/Qualitative Research.md` → `Resources/Design/Discovery/`

**File routing — staged**:
- `Design/UX_Customer_Experience.md` → `05 - 🌱 Staging/` (Czech — translate before migrating)

**Vault changes**: 20 files deleted from interim knowledge, 14 files created in Knowledge, 1 file staged  
**Git commit**: Not yet

---

### 2026-03-04 — Phase 1 complete: Inbox cleared
**By**: Claude (session with Erik)  
**What happened**:
- Triaged all 22 notes in `02 - 📩 Inbox`
- 15 notes migrated to `10 - 🧠 Knowledge`
- 1 note staged in `05 - 🌱 Staging` (Facilitation.md)
- 1 Czech note staged with flag (Krkonose-list.md)
- 4 notes discarded (Jobs to be done, Product vision, Tldraw canvas, Untitled.base)
- `Systemic design.md` merged into `System dynamics.md`, then discarded

**File routing — migrated**: Ethics in design, Manifestos, Random design insights, The Story Is Everything, Business case, Design research goals, Value proposition canvas, Iteration, System dynamics (+ Systemic design merged), Hyperfocus, Liminal Thinking, Evals, New product, Busy culture, Product market fit

**Vault changes**: 22 files deleted from Inbox, 17 files created across Knowledge + Staging  
**Git commit**: Not yet

---

### 2026-03-04 — Phase 0 complete: structure set up
**By**: Claude (session with Erik)  
**What happened**:
- Created `05 - 🌱 Staging/README.md`
- Restructured `10 - 🧠 Knowledge/2 - 🌱 Areas`: created Product & Design practice, Personal development, Teaching & Lecturing, Nonprofit design; deleted Continuous improvement and Freelance design practice

**Vault changes**: 2 folders removed, 4 folders created, 14 files relocated, 1 new top-level folder  
**Git commit**: Committed by Erik after Phase 0

---

### 2026-03-04 — Strategy and documentation created
**By**: Claude (dialogue with Erik)  
**What happened**:
- Full vault analysis, agreed on Areas structure (DEC-001 through DEC-010)
- Created Revival-Strategy, Decision-Log, Progress-Log

**Vault changes**: 3 new files in `01 - 🤖 Second brain/`  
**Git commit**: Clean baseline committed by Erik

---

## Phase Status Overview

| Phase | Name | Status | Last touched |
|-------|------|--------|-------------|
| 0 | Structure setup | ✅ Complete | 2026-03-04 |
| 1 | Process Inbox | ✅ Complete | 2026-03-04 |
| 2 | Absorb interim knowledge | ✅ Complete | 2026-03-05 |
| 3 | Process 99 backlog | ✅ Complete (9 binary files need manual move) | 2026-03-05 |
| 4 | Build weekly routine | ⬜ Not started | — |
| 5 | Build agent skills | ⬜ Not started | — |

---

## Czech Content Tracker

| File | Location | Proposed action | Decision |
|------|----------|----------------|---------|
| Krkonose-list.md | `05 - 🌱 Staging/` | Translate or keep as-is in personal checklists | Pending |
| UX Customer Experience.md | `05 - 🌱 Staging/` | Translate + migrate to `Resources/Design/` | Pending |
| Workshops.md | `Resources/Design/Activities/` | Minimal Czech prep notes — translate when expanding | Pending |
| Kuře.md | `Areas/Home/Recipes/` | Czech recipe — keep as-is | Done |

---

## Template for new entries

```
### YYYY-MM-DD — Short description
**By**: [Claude / Erik / Agent]  
**What happened**:
- [bullet list of what was done]

**Vault changes**: [what files were moved/created/deleted]  
**Git commit**: [commit hash or "not yet"]
**Czech flags**: [any Czech notes found]
```
