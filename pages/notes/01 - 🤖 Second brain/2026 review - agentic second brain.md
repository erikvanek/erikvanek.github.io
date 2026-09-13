---
type: note
created: 2026-09-07
tags:
  - second-brain
  - knowledge-management
  - workflow
  - ai-tools
---

# 2026 review: making this second brain agent-maintained

A review of how this vault is actually orchestrated today, against how the practice has moved in 2026 (Karpathy's LLM Wiki and what came after it). Written as a menu to pick from, not a plan to adopt wholesale.

## Part A: where the documented system and the real one have drifted

Found by reading [[Index]], [[Principles]], [[Processes]] and then measuring the vault against them.

| Documented | Actual |
|---|---|
| `00 - ⚙️ Processing` folder | does not exist |
| `03 - 🗑️ Dump` folder, with [[Dump processing]] routine | does not exist |
| (undocumented) | `05 - 🌱 Staging` exists |
| `11 - ⏳ interim knowledge` | empty, still linked from 3 notes |
| `99 - 📄 To process` holds notes to process gradually | no markdown left in it, 6 links point into it |
| Inbox notes move to `04 - 💽 RAW` after processing | book notes go to `10 - 🧠 Knowledge/3 - 📚 Resources/Book notes/[year]/` |
| Principle 3: knowledge base fully in English | Czech notes throughout (travel checklists, recipes, course notes) |

Other measurements:

- **Note sizes are bimodal.** Median note is 120 words, p90 is 571, but 14 notes exceed 900. The long tail of 1-3 line stubs is where the graph leaks: an empty `Interviews.md` was shadowing the real one and silently capturing every `[[Interviews]]` link in the vault.
- **The "auto-generate AI summaries over 1500 characters" rule in [[Processes]] produced a redundant layer.** Roughly ten notes carry an `## AI-assisted summary` block restating the note underneath it.
- **Frontmatter has no single schema.** `date_created` vs `created`, `type` present or absent, and six notes had their tags only in a `**Tags:** #a #b` footer where no query could reach them.
- **Template placeholders pollute link health.** Of 85 broken wikilinks, 72 were placeholders inside `Templates/` and `Routines/` (`[[Related note 1]]`, `[[Link to agenda]]`). Real breakage was 23, and nearly half of that was fallout from the private-repo split.
- **There are two skill homes.** `pages/skills/` holds the superseded `book-notes` and `deep-dive-notes`; the live `reading-notes` and `obsidian-connector` live in a separate skills repo. The project CLAUDE.md still points at the stale one.
- **Routines are prose, not programs.** `Routines/*.md` describe processes an agent must read and interpret each time, rather than skills it invokes.

## Part B: what changed in 2026

Karpathy published the **LLM Wiki** pattern in April 2026 ([gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)). Three layers:

- **raw/** immutable sources the model reads but never edits
- **wiki/** entity and concept pages the model writes and maintains
- **schema** (`CLAUDE.md`) that governs how it does so, co-evolving with the human

The argument that matters: *"The tedious part of maintaining a knowledge base is not the reading or the thinking, it's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored."* The human curates sources and asks questions; the agent does cross-referencing, consistency and repair.

Two mechanics carry most of the weight:

- **index.md** as a content catalog: every page with a link and a one-line summary, updated on every ingest.
- **log.md** as an append-only record with a fixed prefix (`## [2026-04-02] ingest | Article Title`) so it is parseable with plain unix tools.

Plus a **lint pass** the agent runs periodically: contradictions between pages, stale claims superseded by newer sources, orphan pages, missing cross-references.

A [follow-up](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2) adds lifecycle thinking: supersession rather than deletion (a contradicted claim is marked stale and linked to its replacement, preserving the reasoning history), typed entity relationships, and consolidation tiers. Its comment thread is worth as much as the gist: critics argue numeric confidence scores are false precision, that models "silently corrupt the graph" at scale, and that **"human-in-the-loop as a write gate is not backwardness, it is quality control"** when the writer is an LLM. That last point is [[Principles|Principle 2]] restated by strangers.

One [Obsidian adaptation](https://aimaker.substack.com/p/llm-wiki-obsidian-knowledge-base-andrej-karphaty) reduces the daily loop to three commands, `/ingest-url`, `/process-inbox`, `/lint-wiki`, and frames it as: *"Obsidian is the IDE, the LLM is the programmer, the wiki is the codebase."*

## Part C: the menu

Ordered by value per unit of effort. Each says what it costs and what it argues with.

### 1. A `/lint-vault` skill (highest value)

Every check run by hand this session should be a skill: broken wikilinks, short links that resolve ambiguously because two notes share a name, empty notes, notes whose only tags sit in a body footer, oversized notes, source-labelled sections that were appended rather than integrated, and frontmatter that does not match schema. Template placeholders excluded by a `type: template` marker.

This is exactly the bookkeeping Karpathy says humans abandon. It found five empty notes, six notes with unreachable tags and 23 real broken links today.

**Cost:** one skill. **Conflicts with:** nothing.

### 2. Turn `Index.md` into a real content catalog

Today it describes the folder structure. Karpathy's index lists every page with a one-line summary, which is what makes an agent able to orient without reading the whole vault. Generate it with the linter rather than maintaining it by hand.

**Cost:** generated file, needs a rule that it is generated and not hand-edited. **Conflicts with:** Principle 6 (keep it lean) if it grows unbounded. Cap it at Knowledge, skip RAW.

### 3. One frontmatter schema, enforced

`type`, `created`, `tags`, plus `source_type`/`title`/`author` for reading notes and `intent`/`sources` for provenance. Already the reading-notes schema. Migrate the rest and let the linter fail on drift.

**Cost:** one migration pass. **Conflicts with:** nothing, the older notes are already inconsistent with each other.

### 4. An append-only ingest log

You have `CHANGELOG.md`, `Progress-Log.md` and `Decision-Log.md` doing overlapping jobs. Converge on one with a fixed parseable prefix. It answers "when did this claim enter the vault and from what" without git archaeology.

**Cost:** consolidating three files. **Conflicts with:** nothing.

### 5. Move routines from prose to skills

`Routines/Inbox processing.md`, `Knowledge Rebalancing.md`, `MOC maintenance.md` and `Tagging.md` are instructions an agent must find and interpret. As skills they become invocable and testable. `Book Notes Extraction.md` is already superseded by the `reading-notes` skill and should say so.

**Cost:** real work, one routine at a time. **Conflicts with:** nothing, but do it lazily, only when a routine next gets used.

### 6. Supersession instead of silent overwrite

When new reading contradicts an existing claim, mark the old one stale and link the replacement rather than editing it away. Preserves why you believed the earlier thing.

**Cost:** discipline plus a convention. **Conflicts with:** Principle 6. Worth it only for claims you actually reason from, not for every bullet.

### 7. Fix the drift in Part A

Either create `00 - ⚙️ Processing` and `03 - 🗑️ Dump` or delete them from [[Index]] and [[Processes]]. Document `05 - 🌱 Staging`. Retire `11 - ⏳ interim knowledge`. Decide whether Principle 3 (English only) is a rule or an aspiration, because right now it is neither.

**Cost:** an hour. **Conflicts with:** nothing.

### 8. Retire the AI-summary layer

The over-1500-characters rule creates a block that restates the note. A summary earns its place on a long transcript, like a book note; on a 600-word concept note it is noise. Narrow the rule to `source_type: book` and delete the rest.

**Cost:** a pass over ~10 notes. **Conflicts with:** the current [[Processes]] rule, which would need editing.

## What not to adopt

- **Numeric confidence scores.** The v2 critics are right that a float on a claim is false precision. What you actually need is provenance, which the block-reference backlinks already give you.
- **Vector or hybrid retrieval.** At 238 notes in Knowledge, grep and wikilinks are faster and more legible than an embedding index. Revisit past roughly a thousand pages.
- **Fully autonomous writes into Knowledge.** The write gate is the thing that keeps this trustworthy, and it is already [[Principles|Principle 2]].

## Related notes

- [[Principles]]
- [[Processes]]
- [[Index]]
- [[Second Brain]]
- [[Knowledge]]
