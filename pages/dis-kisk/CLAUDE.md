# CLAUDE.md — DIS KISK Portfolio

Working guide for Claude sessions on Erik's DIS KISK study portfolio (`pages/dis-kisk/`).
Inherits the repo-root [CLAUDE.md](../../CLAUDE.md). This file overrides where it conflicts.

---

## 1. What this is

Erik's study portfolio for the **DIS KISK** bachelor's program (Design informačních služeb, KISK FF MUNI).
Output of three years of study; this is his second attempt at the program (the first ended in dropout).

**Two deliverables:**

| Channel | Audience | Format | Source of truth |
|---|---|---|---|
| **Archiv IS MUNI** | examiners, public | single merged **PDF/A** with cover sheet, uploaded as *Příloha* | snapshot of online version |
| **Online portfolio** | clients, peers, future use | live Eleventy site at this path | this directory |

The online version is the **primary artifact** and will outlive the submission — Erik plans to use it professionally (LinkedIn link, client pitches). The PDF is generated from the online version on submission day.

---

## 2. Hard deadlines

| Date | Milestone |
|---|---|
| **2026-05-20** | Final upload to IS archive — portfolio + závěrečný projekt — for the **June 2026** state exam (Erik's target) |
| 2026-06-15 → -17 | June state exam (presentation + oral) |
| 2026-07-10 | Fallback upload deadline for the September term |
| 2026-09-02 → -04 | September state exam |
| ~~2026-03-31~~ | CZ + EN thesis title (already past — verify status) |

**Today is 2026-05-13** → 7 days to upload. Treat everything in this folder as time-critical.

---

## 3. Required portfolio components (from `portfolio-spec/`)

From `portfolio-archiv.md` and `instructions.md`. The spec is the source of truth — if anything below contradicts the spec, the spec wins.

**Mandatory in both online + archive PDF:**

- [ ] Homepage / domovská stránka
- [ ] Author intro (~150 words, can live on homepage)
- [ ] **Projekt I–V** (one per Praxe/Studijní seminář, semesters 1–5)
- [ ] Závěrečný projekt — uploaded **separately** to archive as *Plný text práce* in PDF/A

**Optional but expected:**

- [ ] Reflexe studijních cílů I–VI (`cile-*.md` — five exist; VI missing)
- [ ] Other outputs (articles, conference talks, course outputs, prototypes)

**Archive PDF formatting:**

- Cover page per `portfolio-spec/portfolio-archiv.md` Příloha 1 (jméno, KISK, Design informačních služeb, online URL, anotace, "Brno, 2026", FF logo)
- Single merged PDF — use Awesome Screenshot to capture web pages + ILovePDF to merge
- Watch for grammatical errors (publicly searchable on archiv.muni.cz)
- Annotation must exist in **CZ + EN**

---

## 4. Current inventory & gaps

### What exists

```
semestr-1/  cile-I, hackaton-I, motivacni-rozhovory, psychologie-pro-designery,
            infoveda, VR-I, design-is-a-job, stenatko
semestr-2/  cile-II, ostrovy-pozitivni-inovace (research project),
            the-ministry-of-the-cloud, tematicka-analyza, jbm-…(EXCLUDE), random
semestr-3/  cile-III, praxe-III (ideační workshopy),
            sxd/ (service design case study — Jarmilka)
semestr-4/  cile-IV, praxe-IV (tajemnický workshop), ucast-na-konferencich (ZDW)
semestr-5/  cile-V, praxe-V (KISKED19 course),
            BAU/ (Jarmilka presentation — likely the závěrečný projekt),
            DIS-public-design/ (public-design talk),
            jak-jit-spravne-sedet/ (VTOS guide — likely Praxe VI in progress),
            vtos-pruvodce.html, vibin/
semestr-6/  EMPTY
prilohy/    vhledy-jinag-workshop.pdf
```

### Gaps to close before 2026-05-20

| Gap | Severity | Notes |
|---|---|---|
| **Praxe I** has no standalone artifact | high | Either rename `hackaton-I.md` to function as Projekt I + add framing, or write a short Projekt I summary that links to it. |
| **Praxe II** has no standalone artifact | high | `ostrovy-pozitivni-inovace.md` is a stub; the kvali výzkum project was the substance. Needs a Projekt II writeup that ties research + Praxe II together. |
| **Praxe VI / Projekt VI** missing | high | `jak-jit-spravne-sedet/` looks like the practice, but no reflection write-up exists. |
| **Sem-6 reflexe** (cile-VI) missing | medium | Optional per spec, but Erik wrote one for every other semester. |
| **Závěrečný projekt** (bachelor thesis) status | high | Jarmilka presentation exists in `BAU/`; the thesis document itself (PDF/A) status unknown — verify with Erik. |
| **Author intro on homepage** | low | Bio exists in `index.html` but needs a tightened EN+CZ version per spec. |
| **CZ + EN annotation for archive** | medium | Not yet written. Deadline for *titles* already past — confirm submitted. |
| **`semestr-2/jbm-semestr-znovu-a-lepe.md`** | exclude | Erik wrote this when frustrated with the program. Drop from final submission (file can stay in repo, must not link from index). Also: ensure `index.html` no longer references it. |
| **Polish pass on language** | medium | A few semesters (esp. 4, 5) read raw / draft-y in places. Audit for grammar; submission is public. |

### Open questions for Erik

1. **Závěrečný projekt** — what's the thesis title in CZ + EN? Is the thesis document drafted already, or is `BAU/index.html` (Jarmilka deck) standing in for it for now?
2. **Praxe I / Praxe II** — was there official "Praxe I" / "Praxe II" content separate from what's in S1 (Hackaton) and S2 (Ostrovy/kvali výzkum)? Or do those activities count as the Praxe outputs and just need clearer labeling?
3. Was the **CZ + EN thesis title** submitted by the 2026-03-31 deadline?
4. For Sem 6 — what counts as the work to reflect on? (Bachelor thesis + Praxe VI = `jak-jit-spravne-sedet`?)

---

## 5. Voice & sentiment — how Erik writes

Erik's voice is consistent across all five semesters. Match it when generating or rewriting content.

**Core traits:**

- **Critical optimist.** Names problems, then offers a path or wraps in gratitude. Self-coined: "kritickej optimista" (index.html bio).
- **Sandwich critique.** When negative feedback appears, it's bookended with appreciation. Example: `jbm-…` ends "Hezký léto všem". Don't strip the bookends.
- **Process over results.** Explicit in `praxe-V.md` ending (Tao te ťing, "results oriented" from poker). Pervasive in earlier semesters too.
- **Self-deprecating but confident.** "Možná až otravně mlátím agilním manifestem", "kverulování", "trošku přechytralej" — coexists with "umím číst skupinu".
- **People are named, not referenced.** Petra Petráková, Josef Šlerka, Honza Soukup, Josef Kocurek, Jitka Bartošová, Matěj Káninský, Roman Hřebecký, Baru, Veru, Anežka, Petra, Franta, Johanka, Lukáš, Dana, Veronika. Preserve this.
- **Living language.** Czech with embedded English techspeak (*clumsy, pivot, multi-win, framing, wicked problem, results-oriented*). Don't sterilize either side.
- **Metaphors do real work.** mycelium, kreativní kohoutek, maják, regenerativní vs. extraktivní systémy, sendvič, klíčenka. Recurring; cross-referenced across texts.
- **External links are part of the voice.** Music (Midi Lidi, Schwarzprior, Prigl), articles, videos. Keep these; they're not decoration.
- **Emojis appear sparingly** (🔥, ❤️, 🙌, 🥲) — usually at section ends or for warmth. Keep when present; don't add new ones unless Erik asks.

**Anti-patterns to avoid when editing:**

- Don't make it more formal — it'll read fake.
- Don't strip personal asides (kombucha, hroch, hroznové buchty) — they're the texture.
- Don't generalize names ("díky všem v týmu") — name people.
- Don't pad with corporate-speak ("synergie", "leveraging", "stakeholder alignment" without irony).
- Don't soften the sandwiches — the critique-with-grace pattern is the point.

---

## 6. Content principles

**Confidence arc:** S1 ("škrábání po povrchu") → S5 ("Designerská praxe v 2026 vypadá jinak"). The arc is visible in his own words across `cile-*` files. No need to manufacture growth; just don't flatten it.

**People thread:** Erik considers "people I met" the biggest takeaway from the program. Acknowledge this somewhere visible but **don't overdo it** (Erik's own caution). One framing sentence + named dedications under projects is usually enough; a network/mycelium visualization is on the table but not committed.

**Starting point of the arc:** Solo practitioner with methodology gaps (per Erik's choice). Frame the opening accordingly.

**The story arc itself is not locked.** Three working candidates:
1. From learner to network orchestrator (mycelium motif)
2. From tools to systemic intervention
3. From methodology to own voice

Don't force one of these into copy yet. Pick the spine when Erik decides.

---

## 7. Visual & design direction

**Source of truth for the visual system:** [`portfolio-shaping/design-system.md`](./portfolio-shaping/design-system.md) — palette, type scale, accent rules, format decisions, Paper artboard inventory. Read this before generating any new design work.

**Format locked:** A4 portrait, **light theme** (cream `#F4EFE5` ground, ink `#1C1812`, deepened amber accent `#C26818`). The earlier A5 dark-theme exploration is archived but not the primary direction.

**Type pair finalists under evaluation:**
- 02 — DM Sans + DM Sans (humanist sans single-family)
- 08 — DM Serif Display + DM Sans (editorial magazine register)
- 10 — Newsreader + Newsreader (newspaper serif)
- 12 — EB Garamond + EB Garamond (classical book)

Comparison artboards live in the Paper file. Two articles (Praxe IV, Hackaton I) are being typeset in all four pairings for direct readability comparison.

**Tools and rules:**
- **Prototyping tool:** `paper.design` via its MCP server. **Has a weekly MCP rate limit (2-day reset).** Plan accordingly — batch operations (`update_styles` with many updates, `duplicate_nodes` with many sources, `set_text_content` batches) to minimize API calls.
- **Paper power moves** documented in [`portfolio-shaping/design-system.md`](./portfolio-shaping/design-system.md) section "Paper.design power moves used".
- **Paper session continuity:** [`portfolio-shaping/paper-session-state.md`](./portfolio-shaping/paper-session-state.md) tracks pause points and resume instructions when the rate limit blocks mid-build.
- **Multilingual-ready design:** content stays Czech-first; layouts must accommodate translation. Practical implications:
  - Separate content from templates (don't hardcode CZ strings in `.njk` chrome).
  - Generous whitespace — EN equivalents often run shorter; DE runs longer.
  - Avoid layouts that depend on fixed Czech word lengths.
- **Existing templates** live in `_includes/` at repo root; the current portfolio uses `dis-kisk.njk` layout. Extend or fork rather than replacing wholesale.
- **PDF generation** for archive: capture online pages with Awesome Screenshot per spec, then merge in ILovePDF. A **print stylesheet** (`@media print`) is on the roadmap — once a type pair is chosen, print CSS becomes the next deliverable.

---

## 8. Working norms for this directory

- **Conversation language:** English (Erik's explicit pref for this project, overrides the personal-account Czech default).
- **Content language in files:** Czech, as-is. Don't translate existing content unless asked.
- **Cadence:** bit by bit. Don't refactor the whole portfolio in one go; touch one section at a time and confirm.
- **The angry doc:** `semestr-2/jbm-semestr-znovu-a-lepe.md` is **excluded** from the final submission. File may stay in repo (history), but:
  - Remove its link from `index.html` (currently lines 113-115 reference it).
  - Don't include it in PDF assembly.
- **Story arc:** not yet decided — don't bake one into copy without checking.

---

## 9. Layout reference

```
pages/dis-kisk/
├── CLAUDE.md                  # this file
├── index.html                 # portfolio homepage (Nunjucks front-matter)
├── img/                       # all portfolio images
├── prilohy/                   # static attachments (PDFs)
├── portfolio-spec/            # official KISK requirements — source of truth
│   ├── instructions.md        # IS MUNI submission instructions
│   ├── portfolio-archiv.md    # archive format + cover page template
│   └── titulni-list.md        # state-exam logistics
├── semestr-1..6/              # per-semester content
└── video/                     # video assets
```

Built output goes to `docs/dis-kisk/` (Eleventy → GitHub Pages). Don't edit `docs/` directly.

---

## 10. Build & run

From the repo root (`/Users/erik/dev/erikvanek.github.io`):

- `yarn start` — Eleventy dev server with live reload
- `yarn build` — produce `docs/` for GitHub Pages
- `yarn format:fix` — Prettier on Markdown

**Do not** run global Vercel / Next.js skills against this project. It's an **Eleventy** site that publishes to GitHub Pages. The `pages/` path is Eleventy's source dir, not Next.js Pages Router — automated skill suggestions that match on `pages/**` are false positives here.

---

## 11. Out of scope / TBD

- **Type pair final pick** — narrowed to 4 (02, 08, 10, 12); awaiting Erik's decision after reading the article matrix.
- **Print CSS** — once type pair is chosen, write `@media print` stylesheet for the Eleventy site so the archive PDF can be generated directly from the live site.
- **Story arc** — three working candidates documented in [`portfolio-shaping/`](./portfolio-shaping/); Erik deferred the decision while we worked on form. Revisit once visual system is locked.
- **Network/mycelium visualization** — proposed but not committed.
- **`index.html` accordion** — whether to keep the per-semester expandable model or move to a sequential/chronological reader.

## 12. Pointers — `portfolio-shaping/`

Working notebook for shaping the portfolio. Read these when relevant:

| File | Purpose |
|---|---|
| [`design-system.md`](./portfolio-shaping/design-system.md) | Locked palette, type scale, accent rules, Paper artboard inventory, paper.design power moves |
| [`paper-session-state.md`](./portfolio-shaping/paper-session-state.md) | Resume instructions when paper.design rate limit pauses work mid-build |
| [`demo-story.md`](./portfolio-shaping/demo-story.md) | Draft narrative for an A5 booklet (archived direction — kept for content reference) |
