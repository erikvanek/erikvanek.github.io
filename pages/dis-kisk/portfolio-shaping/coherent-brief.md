---
captured: 2026-05-20
sources:
  - /Users/erik/dev/erikvanek.github.io/pages/dis-kisk/portfolio-spec/portfolio-archiv.md  # KISK official
  - /Users/erik/dev/erikvanek.github.io/pages/dis-kisk/portfolio-spec/instructions.md     # KISK course page
  - /Users/erik/dev/erikvanek.github.io/pages/dis-kisk/portfolio-spec/titulni-list.md     # SZZ logistics
  - /Users/erik/dev/erikvanek.github.io/pages/dis-kisk/CLAUDE.md                          # Erik's working guide
  - /Users/erik/dev/Bachelor's thesis/Thesis/Final notes for portfoilo and thesis.md     # IS MUNI DESB60 snapshot, 2026-05-20
  - /Users/erik/dev/Bachelor's thesis/Thesis/Call k závěrečnému paperu a portfoliu — processed.md  # 2026-05-15 call synth (thesis-heavy, portfolio-light)
---

# DIS KISK portfolio — coherent brief

Synthesis of every instruction source for the final portfolio. Source of truth where this conflicts with anything older: **`portfolio-spec/portfolio-archiv.md`** > KISK course pages > Erik's own notes.

---

## 1. What it is

Two physical artifacts, one logical portfolio:

| Channel | Audience | Format | Upload slot |
|---|---|---|---|
| **Online portfolio** | clients, peers, future use | live Eleventy site at `pages/dis-kisk/` → GitHub Pages | n/a (lives on the web) |
| **Archiv IS MUNI** | examiners, public IS archive | single merged **PDF** with cover sheet | as *Příloha* on the thesis archive record |

Online version is the primary artifact (will outlive the submission, used professionally). The archive PDF is a snapshot generated from it on submission day.

**Separate file** in the same archive record: the thesis itself (`Plný text práce`, PDF/A). That one is the bachelor thesis on Jarmilka, not portfolio content.

---

## 2. Hard deadlines

| Date | Milestone |
|---|---|
| **2026-05-20** (today) | Archive upload deadline for **June** state exam — portfolio + thesis |
| 2026-06-15 → 17 | June state exam |
| 2026-07-10 | Fallback upload deadline for **September** state exam |
| 2026-09-02 → 04 | September state exam |
| 2026-03-31 | CZ + EN thesis title (already past — verify it was submitted) |

> Today **is** the June deadline. If we slip, the next window is the September term (upload by 2026-07-10).

---

## 3. Mandatory content (per `portfolio-archiv.md`)

In **both** the online site and the archive PDF:

- **Homepage / domovská stránka**
- **Author intro** (~150 words; can live on the homepage)
- **Projekt I–V** — one per Praxe / Studijní seminář, semesters 1–5
- **Závěrečný projekt** — short intro + link or embedded PDF in the online portfolio. **Uploaded separately** to the archive as *Plný text práce* (PDF/A); inside the portfolio it appears only as a teaser + link.

Optional but expected:

- **Reflexe Studijních seminářů I–VI** (`cile-*.md`)
- Other outputs: articles, conference talks, course outputs, prototypes, 3D, video, …

---

## 4. Archive PDF — format rules

- **Cover page** per `portfolio-archiv.md` Příloha 1:
  ```
  Závěrečné portfolio
  Erik Vaněk
  Pracoviště: Katedra informačních studií a knihovnictví
  Program: Design informačních služeb
  Adresa portfolia (online URL)
  Stručná anotace portfolia (CZ + EN, per IS MUNI guidance)
  Brno, 2026
  FILOZOFICKÁ FAKULTA (logo)
  ```
- **Single merged PDF** — recommended toolchain:
  - **Awesome Screenshot** to capture each web page
  - **ILovePDF** to merge the per-page PDFs
- **Upload slot:** *Příloha* on the thesis archive record (not *Plný text práce* — that slot is the thesis).
- **Watch out:** "Pozor na gramatické chyby! (bude to veřejně dohledatelný výstup)" — the archive is publicly searchable. Final language pass is non-negotiable.

---

## 5. State exam structure (so the portfolio earns its keep on the day)

From `titulni-list.md`:

- **Public, morning:** Prezentace závěrečného projektu — 20 min. (The Jarmilka thesis.)
- **Closed, afternoon:**
  1. Prezentace e-portfolia + diskuse nad závěrečným projektem i e-portfoliem (20 min)
  2. Znalostní část (20 min)
  3. Porada komise

Implication for the portfolio: it must support a 20-minute walk-through with discussion. A scannable homepage + jump-to-section navigation matters; everything has to read well to people who have not been in Erik's head all year.

Commission: Ladislava Zbiejczuk Suchá, Simona Kramosilová, Roman Sellner Novotný, Roman Hřebecký, Tereza Kosnarová Venerová, Petr Kosnar, Michaela Štětiarová.

---

## 6. Voice & tone (preserve when generating or editing)

From `CLAUDE.md`, observed across all five existing semesters:

- **Critical optimist** — name the problem, then offer a path or wrap in gratitude. Self-coined: *kritickej optimista*.
- **Sandwich critique** — negative feedback bookended with appreciation. Don't strip the bookends.
- **Process over results** — explicit in `praxe-V.md` (Tao te ťing). Pervasive earlier.
- **Self-deprecating but confident** — "kverulování", "trošku přechytralej" alongside "umím číst skupinu".
- **Name people** — Petra Petráková, Josef Šlerka, Honza Soukup, Matěj Káninský, … Don't generalize to "tým".
- **Living language** — Czech with embedded English techspeak (*clumsy, pivot, multi-win, framing, wicked problem*). Don't sterilize either side.
- **Metaphors do work** — mycelium, kreativní kohoutek, maják, regenerativní vs. extraktivní, sendvič, klíčenka. Recurring.
- **External links are content** — music, articles, videos. Not decoration.
- **Sparse emojis** — 🔥 ❤️ 🙌 🥲 at section ends or for warmth. Keep present ones; don't add new.

Anti-patterns: don't make it more formal, don't strip personal asides (kombucha, hroch, hroznové buchty), don't pad with corporate-speak, don't soften the sandwiches.

---

## 7. Visual & design

Source of truth: [`portfolio-shaping/design-system.md`](./design-system.md) (currently empty — needs to be populated when type pair is locked).

Locked decisions (from `CLAUDE.md`):

- **Format:** A4 portrait, **light theme**
- **Palette:** cream `#F4EFE5` ground, ink `#1C1812`, deepened amber `#C26818` accent
- **Multilingual-ready:** Czech-first content, layouts must accommodate EN translation (separate content from `.njk` chrome; generous whitespace; avoid fixed-word-length dependencies)
- **Print stylesheet** (`@media print`) is the next deliverable once the type pair is locked, so the archive PDF can be generated from the live site (instead of screenshot-merging)

Open decision — **type pair finalists:**

| # | Body | Display |
|---|---|---|
| 02 | DM Sans | DM Sans (single humanist sans) |
| 08 | DM Sans | DM Serif Display (editorial magazine) |
| 10 | Newsreader | Newsreader (newspaper serif) |
| 12 | EB Garamond | EB Garamond (classical book) |

Comparison artboards exist in `paper.design`. Erik is reading two articles (Praxe IV, Hackaton I) in all four pairings for direct readability.

---

## 8. Current state — what exists vs. what the spec requires

Snapshot of `pages/dis-kisk/` as of 2026-05-20:

```
semestr-1/   ✅ cile-I, hackaton-I, motivacni-rozhovory, psychologie-pro-designery,
                infoveda, VR-I, design-is-a-job, stenatko
semestr-2/   ✅ cile-II, ostrovy-pozitivni-inovace (stub), the-ministry-of-the-cloud,
                tematicka-analyza, random
             ⛔ jbm-semestr-znovu-a-lepe.md — EXCLUDE from final (the angry doc)
semestr-3/   ✅ cile-III, praxe-III, sxd/ (Jarmilka service design case)
semestr-4/   ✅ cile-IV, praxe-IV, ucast-na-konferencich
semestr-5/   ✅ cile-V, praxe-V, BAU/, DIS-public-design/, jak-jit-spravne-sedet/,
                vibin/, vtos-pruvodce.html, Reflexe-5-sem.pdf
semestr-6/   🟡 cile-VI.md exists, ux-monday-braindump.md exists, no Projekt VI write-up
prilohy/     🟡 vhledy-jinag-workshop.pdf
index.html   🟡 exists, needs final pass (currently links jbm- doc, needs author intro 150w)
```

Open gaps vs. mandatory spec:

| Gap | Severity | Action |
|---|---|---|
| **Projekt I** has no standalone artifact | high | Promote `hackaton-I.md` to Projekt I + framing wrapper |
| **Projekt II** has no standalone artifact | high | Stitch `ostrovy-pozitivni-inovace` (stub) + `tematicka-analyza` into a Projekt II write-up |
| **Projekt VI** missing | high | Use `jak-jit-spravne-sedet/` (Praxe VI) + write the reflection |
| **Author intro (~150 w)** on homepage | high | Tighten bio in `index.html`; produce **CZ + EN** versions |
| **CZ + EN annotation** for archive cover | high | Write today |
| **`jbm-semestr-znovu-a-lepe.md` exclusion** | high | Remove link from `index.html` (lines 113–115 per CLAUDE.md); file may stay in repo |
| **Závěrečný projekt teaser** in portfolio | high | Short intro + link to the live Jarmilka deck (`BAU/`) + link to PDF/A thesis |
| **Print CSS or screenshot workflow** | high | Either ship `@media print` OR commit to Awesome Screenshot + ILovePDF today |
| **Polish pass on language** | medium | Semesters 4–5 have draft-y patches; submission is public |
| **Sem-6 reflexe (`cile-VI.md`)** | medium | Already exists — needs a review pass to match the others |

---

## 9. Open decisions that are blocking final output

1. **Type pair pick** — narrowed to 4 (02 / 08 / 10 / 12). No final pick yet.
2. **Story arc** — three candidates (learner → network orchestrator / tools → systemic / methodology → own voice). Currently deferred.
3. **Index layout** — keep accordion-per-semester or switch to sequential reader.
4. **Archive PDF generation path** — print stylesheet vs. screenshot-merge. The screenshot path is unambiguously workable today; the print-CSS path is nicer but requires type-pair lock first.
5. **CZ + EN thesis title** — was it submitted by 2026-03-31? If not, raise with studijní oddělení immediately.

---

## 10. Minimum viable submission (if we're racing the clock)

If everything else has to wait, the **archive PDF** has to ship today (or we accept slipping to the September term). MVP path:

1. Fix `index.html` — pull the `jbm-` link, write a 150-word author intro in CZ + EN, polish homepage copy.
2. Decide one of the four type pairs (any of them is professional; perfect is the enemy here).
3. Write CZ + EN annotation for the cover sheet.
4. Promote `hackaton-I.md` → Projekt I; write the missing Projekt II and VI write-ups (short — half a page each is acceptable per spec).
5. Generate the cover sheet (one-page PDF) per Příloha 1 of `portfolio-archiv.md`.
6. Awesome Screenshot every published page → ILovePDF merge → upload as *Příloha* on the thesis archive record.
7. Verify the Jarmilka thesis PDF/A is uploaded as *Plný text práce*.

Anything beyond MVP (print CSS, story arc lockdown, network/mycelium visualization, design-system.md fill-in) is post-September-term work or pre-LinkedIn polishing.

---

## 11. What this brief is for

This file is the synthesis Erik asked for on 2026-05-20. It folds together every instruction source (KISK course pages, the `portfolio-spec/` files, the 2026-05-15 call, the IS MUNI snapshot, Erik's own working CLAUDE.md). Future sessions should treat it as the entry point — read it first, then go to the source files only when something contradicts or is missing here.

**Where conflicts exist:** the KISK spec (`portfolio-archiv.md`) wins on what must be in the portfolio. Erik's `CLAUDE.md` wins on voice, current state, and visual direction.
