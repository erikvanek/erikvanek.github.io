---
title: Second Brain Revival Strategy
created: 2026-03-04
status: active
type: strategy
---

# Second Brain Revival Strategy

This document is the master reference for the ongoing second brain reorganization. It was created through a dialogue with Claude on 2026-03-04. Any significant structural changes should be reflected here, and the [[Progress-Log]] should record what was done and when.

If you're picking this up mid-process: check [[Progress-Log]] first to see current state, then return here for the full plan.

---

## Why this exists

The vault accumulated three eras of content that never converged into the intended PARA structure. This strategy is the plan to fix that — gradually, with agent assistance, across multiple sessions — without losing anything and without getting stuck in yet another incomplete migration.

**Core principle**: structure first, content second, automation third. Migrating content into a broken structure just moves the mess.

---

## Definitive Target Structure

### Top-level folders

| Folder | Purpose |
|--------|---------|
| `01 - 🤖 Second brain` | System meta: strategy, decisions, routines, templates, scripts |
| `02 - 📩 Inbox` | True transit zone. Process within ~1 week. Nothing lives here permanently. |
| `04 - 💽 RAW` | Chronological storage of raw source materials (book notes, transcripts, article captures). Format: `YYYY/MM/DD/` |
| `05 - 🌱 Staging` | Incubation layer. Content that's interesting but not yet validated. Review after ~2–4 weeks. |
| `10 - 🧠 Knowledge` | The living PARA structure. This is the primary knowledge base. |
| `20 - ✨ Ephemeron` | Link/FOMO dump. Separate beast — revisit later. Leave untouched for now. |

**Folders to be eliminated** (absorbed into `10 - Knowledge`):
- `11 - ⏳ interim knowledge` — half-migrated PARA content, never completed. Absorb fully.
- `99 - 📄 To process` — pre-PARA backlog. Process with agent, nothing deleted without review.

### Areas (fixed structure)

The previous Areas were misaligned with actual professional life. New structure:

- `Product & Design practice` — primary professional domain, includes service design degree work
- `Teaching & Lecturing` — university lecturer role
- `Nonprofit design` — part-time nonprofit design work
- `Personal development` — learning, habits, self-improvement (replaces "Continuous improvement")
- `Cooking and fermentation` — keep as-is
- `Home` — keep as-is

### Staging layer (new)

`05 - 🌱 Staging` is a new folder. The graduation heuristic is simple: **"Would I actively use this in a project?"** — ask this after 2–4 weeks. If yes, migrate to Knowledge. If not, archive or discard.

No complex scoring system. Single question, human judgment.

---

## Migration Phases

### Phase 0 — Structure setup ⬜ Not started
*Estimated effort: 1 session*

1. Create `05 - 🌱 Staging` folder
2. Restructure `10 - Knowledge/2 - 🌱 Areas` to match new Areas above
3. Update this document and [[Decision-Log]] to reflect any deviations
4. Commit to git before starting Phase 1

**Do not touch content yet.**

---

### Phase 1 — Process Inbox ⬜ Not started
*Estimated effort: 1–2 sessions, agent-assisted*

**Goal**: Clear all 22 notes currently stuck in `02 - 📩 Inbox`. These are knowledge nuggets in the wrong place, not true inbox captures.

**Steps**:
1. Agent reviews each note in `02 - 📩 Inbox`
2. For each note, agent proposes: route to `Knowledge` subfolder, or hold in `Staging`, or flag for discard
3. Human approves routing for each note (quick pass)
4. Agent executes approved moves
5. Commit to git

**Rules**:
- Czech-language notes: do NOT discard. Add `#czech` tag. Flag in [[Progress-Log]] so human can review separately.
- Nothing is permanently deleted — git provides recovery
- After processing, Inbox should be genuinely empty

**This is also the weekly routine**: once cleared, the Inbox should stay processed within ~1 week of capture.

---

### Phase 2 — Absorb interim knowledge ⬜ Not started
*Estimated effort: 1 session, agent-assisted*

**Goal**: Eliminate `11 - ⏳ interim knowledge` by migrating content into `10 - Knowledge`.

**Contents of `11`**:
- `Design/` — Books, Concepts, Methods, UX_Customer_Experience, Design-MOC, Design Crit
- `Learning/`
- `ProductManagement/`
- `Productivity/`
- `Research/`

**Steps**:
1. Agent maps each subfolder/note to its target in `10 - Knowledge`
2. Check for duplication against existing `10 - Knowledge/3 - Resources` content (especially Design, which already has structure)
3. Human approves mapping
4. Agent executes moves, merges duplicates
5. Delete `11 - ⏳ interim knowledge` folder
6. Commit to git

---

### Phase 3 — Process the `99 - To process` backlog ⬜ Not started
*Estimated effort: 2–3 sessions, agent-assisted + human review pass*

**Goal**: Clear ~60 notes from `99 - 📄 To process`. This is the messiest layer — mix of gold content and genuine junk.

**Steps**:
1. Agent produces a triage list: title, proposed action (migrate/stage/discard), proposed destination, language flag
2. **Human reviews the triage list** — this is a required step, nothing is discarded without review
3. Human approves or overrides each decision
4. Agent executes approved actions
5. Czech notes: flagged with `#czech`, held in Staging or a dedicated `Czech` subfolder until human decides
6. Commit after each batch

**Expected outcome**: ~30–40% discarded (junk, outdated, redundant), remainder migrated to Knowledge or Staging.

**Czech handling**:
- All Czech notes preserved, tagged `#czech`
- Logged in [[Progress-Log]]
- Future: any new Czech content triggers a warning from agent ("This note appears to be in Czech — the vault uses English. Process in English or flag for translation.")

---

### Phase 4 — Build weekly routine ⬜ Not started
*Estimated effort: 1 setup session*

**Monday (15 min)**:
- Review Inbox. Agent suggests routing for captures from the past week. Human approves or redirects.

**Friday (20 min)**:
- Review Staging. Anything older than 3–4 weeks gets a decision: graduate to Knowledge or discard.
- Quick reflection note into relevant Area.

**Monthly (45 min)**:
- Rebalancing run. Agent analyzes Knowledge structure, surfaces orphaned notes, suggests connections. Human approves changes.
- Review [[Progress-Log]] and update status of phases.

Existing Routines documentation in `01 - 🤖 Second brain/Routines/` contains detailed procedures — these are the reference, not the agent prompts. Agent prompts (skills) are leaner versions.

---

### Phase 5 — Agent skills ⬜ Not started
*Estimated effort: 1–2 sessions*

Skills to build, in priority order:

1. **Inbox processing skill** — lean version of `Routines/Inbox processing.md`. Routes captures to Knowledge or Staging, flags Czech content.
2. **Project jumpstart skill** — given a project domain/brief, searches Knowledge + Areas, surfaces relevant notes, generates a starting context brief.
3. **Staleness tagger** — monthly sweep, flags notes with no links and no recent modification.
4. **Czech migration skill** — one-time pass, human-reviewed translation or discard decisions.

Defer: Ephemeron ranker (out of scope for now, revisit later).

---

## Language policy

- Vault language: **English**
- Czech notes already in vault: preserved, tagged `#czech`, held for human decision
- New Czech content: agent flags it immediately with a warning
- Target: fully English vault over time, no hard deadline

---

## Agent interaction principles

From `01 - 🤖 Second brain/Principles.md` — preserved and summarized here for agent context:

1. All content is human-created or human-curated. Agents assist, they don't author.
2. Agents help with metadata, routing, tagging, linking, and summarizing — not content creation.
3. Human is always in the loop for decisions about what stays and what goes.
4. Store RAW materials as-is. Enrich existing knowledge nodes rather than creating parallel ones.
5. Keep it lean. Avoid over-engineering.

---

## How to update this document

When a phase is completed:
1. Change its status marker from `⬜ Not started` / `🔄 In progress` to `✅ Complete`
2. Add a note under the phase with the completion date and any deviations
3. Add a [[Progress-Log]] entry
4. Commit to git

When a structural decision changes:
1. Update the relevant section here
2. Add a [[Decision-Log]] entry with date, what changed, and why
