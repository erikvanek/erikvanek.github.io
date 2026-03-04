---
title: Decision Log
created: 2026-03-04
status: active
type: log
---

# Decision Log

Chronological record of structural and strategic decisions. Whenever a significant decision is made — in dialogue with Claude or independently — log it here. The goal is to avoid re-litigating the same questions and to understand why things are the way they are.

Format: `DEC-XXX` with date, decision, rationale, and implications.

---

## DEC-001 — Areas structure
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Replace the existing 4 Areas with a new set that reflects actual professional life:
- Product & Design practice
- Teaching & Lecturing
- Nonprofit design
- Personal development
- Cooking and fermentation (kept)
- Home (kept)

**What changed**: Previous Areas were `Continuous improvement`, `Cooking and fermentation`, `Freelance design practice`, `Home`. These didn't reflect the actual scope of work.

**Rationale**: Areas should represent ongoing responsibilities with standards to maintain. The old Areas were either too generic ("Continuous improvement") or too narrow ("Freelance design practice") to serve as useful anchors for project and resource linking.

**Implications**: `Freelance design practice` folder will be renamed/restructured into `Product & Design practice`. `Continuous improvement` content will be reviewed and folded into `Personal development`. Two new Areas created: `Teaching & Lecturing`, `Nonprofit design`.

---

## DEC-002 — Service design degree placement
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Service design degree work lives inside `Product & Design practice`, not as a separate Area.

**Rationale**: The work is closely related to primary professional practice and doesn't need its own maintenance standard. It would add noise as a separate Area.

---

## DEC-003 — Staging layer
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Create `05 - 🌱 Staging` as a new top-level folder. This is an incubation zone for content that's interesting but not yet validated as worth keeping in Knowledge.

**Graduation heuristic**: After 2–4 weeks, ask "Would I actively use this in a project?" If yes → Knowledge. If no → archive or discard.

**Rationale**: The "interesting vs. valuable" problem. Curation at ingestion is hard because value is often retrospective. Staging gives content time to prove itself without cluttering the Knowledge base.

**Implications**: Inbox becomes a true short-term transit zone (days, not weeks). Staging holds content on a medium-term horizon. Removes the temptation to use Inbox as a holding area.

---

## DEC-004 — Ephemeron deferred
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: `20 - ✨ Ephemeron` is left untouched for now. The agent-ranking and project-scoring workflow it was designed for will be revisited in a later phase.

**Rationale**: It's a different beast from the knowledge management workflow. Scope control — tackle the core PARA structure first.

---

## DEC-005 — Eliminate `11 - ⏳ interim knowledge`
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: `11 - ⏳ interim knowledge` will be fully absorbed into `10 - 🧠 Knowledge` and the folder deleted.

**Rationale**: It exists as a half-completed migration from a previous attempt. Having two parallel quasi-PARA structures creates confusion and makes agent queries incomplete.

**Implications**: Content in `11` will be mapped to the correct `10 - Knowledge` subfolders during Phase 2. Duplicates with existing content in `10` will be merged, not duplicated.

---

## DEC-006 — Czech content handling
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Czech notes already in the vault are preserved but tagged with `#czech`. They are NOT silently discarded. They are listed in the [[Progress-Log]] so the human can make explicit decisions about each one. Future Czech captures are flagged by agents with a warning ("This appears to be in Czech — the vault uses English").

**Rationale**: The vault's English-only principle (from `Principles.md`) was already being violated. Rather than hard-deleting content that might be valuable, surface it explicitly for human decision.

**Implications**: During Phase 3 triage, all Czech notes will be flagged. A dedicated pass on Czech content may be needed after Phase 3.

---

## DEC-007 — Nothing deleted without human review
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: No content is permanently deleted by an agent without the human first reviewing a triage list and explicitly approving each discard. Agents propose, humans decide.

**Rationale**: Git provides recovery but requires knowing what to recover. Better to surface the decision explicitly than to rely on git archaeology later.

**Implications**: Phase 3 (99 - To process) requires a human review pass before any discards are executed.

---

## DEC-008 — `99 - To process` backlog handling
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Agent produces a full triage list for `99 - 📄 To process` (title, proposed action, proposed destination, language flag). Human reviews. Agent executes approved actions only.

**Expected split**: ~30–40% discard, remainder migrated to Knowledge or Staging.

---

## DEC-009 — Agent role definition
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: Agents assist with metadata, routing, tagging, linking, and summarizing. They do not author content. All content in the vault remains human-created or human-curated.

**Rationale**: From the existing `Principles.md`. Reaffirmed in the revival strategy. The point of the second brain is curated personal knowledge, not AI-generated filler.

---

## DEC-010 — Weekly routine structure
**Date**: 2026-03-04  
**Status**: Decided  

**Decision**: 
- Monday ~15 min: Inbox review with agent routing suggestions
- Friday ~20 min: Staging review (graduate or discard items 3–4 weeks old) + reflection note
- Monthly ~45 min: Rebalancing run (agent-assisted structure analysis + connection suggestions)

**Rationale**: Consistent with stated willingness to do start/end-of-week reviews. Kept lean to avoid the consistency failure mode of previous attempts.

---

*To add a new decision: copy the template below, increment the number, fill in the fields.*

```
## DEC-XXX — Short title
**Date**: YYYY-MM-DD  
**Status**: Decided / Under review / Superseded by DEC-XXX  

**Decision**: [What was decided]

**Rationale**: [Why]

**Implications**: [What changes as a result]
```
