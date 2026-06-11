# Content audit — `cesta/` tiles vs. source articles

*Target location: `pages/dis-kisk/portfolio-shaping/content-audit.md`*
*Status: v1 (2026-06-10) — audit of the 16 tiles in `cesta/index.html` (`INITIATIVES`) against legacy articles + braindumps. Purpose: let Erik edit exact textual/visual content per tile, see which tiles share a story, and decide on one end-to-end master article.*

Method: read every tile in the `INITIATIVES` array, then every candidate backing article (`semestr-1…6/`), then grepped the whole repo for the load-bearing claims (Adam, Fléda, medaile, Jarmilka, prepenitenciár). Findings below.

---

## TL;DR — the four things that need your decision

1. **Write the end-to-end master article.** Your instinct is right, and `cile-VI.md` is already 70 % of it (it explicitly reviews the whole arc, not just S6). Recommendation in §4: lift cile-VI into a standalone *Cesta* narrative that threads all four beats with concrete outcomes. It becomes the single source the tiles point back to **and** your exam script. All the net-new prose below gets written **once**, there.
2. **The "Adam" tile has no backing anywhere on the site.** `hackaton-I.md` is about the *školní pavučina vyspělosti* maturity model tested with an **unnamed** school rep — the "guest → ran for school director → won" story exists only in braindumps. The tile's whole hook is unwritten. (Already on the plan's net-new list, but worth stressing — it's tile #1 of the journey.)
3. **The medal is probably misattributed.** Your own UX Monday braindump says the medal was for the **childcare-service** project (pre-study MPSV gig), not "Ministerstvo vnitra." No article anywhere mentions a Ministry-of-Interior medal. This is the canonical swag piece and it's both unsourced and possibly pinned to the wrong project *and* the wrong semester. Verify before it ships — it's publicly searchable.
4. **One name + two attributions to verify** (cheap, do in one pass): `Matěj Káninský` (semester files) vs `Kalinský` (shaping docs); `Lukáš Němec` (article) vs `Lukáš Jan Němec`; who moderated *your* Design Kantýna panel (article only credits Baru moderating the *Miro* panel; shaping notes say David Severa).

**Good news:** the "pan nejvyšší" identity is **resolved** — `praxe-IV.md` names him: **Jindřich Fryč, nejvyšší tajemník pro státní službu**. The S4 tajemnický beat, the Design Kantýna beat, the teaching beat, and the UX Monday beat are all strongly backed.

---

## 1. Tile-by-tile audit

Legend — **Backing**: 🟢 strong (a finished article on-site) · 🟡 partial (mentioned but the hook isn't written, or only external/deck) · 🔴 net-new (nothing published; lives in braindumps or future) · ⬛ placeholder by design.

| # | Tile (`title`) | Sem | Backing | Source article(s) / asset | What's solid vs. what you still need to write |
|---|---|---|---|---|---|
| 1 | **Erik 2023 — neohrabaný praktik** | I | 🟡 | `cile-VI.md` intro line; Infarm/hydroponics + GPT-3 motivák only in UX-Monday braindump | Bookend. The *phrase* exists ("neohrabaný praktik s inženýrským základem, díry v metodologii"). The Infarm-death + GPT-3-letter texture is unwritten prose. Photo `i-me-melon.jpeg` ✓. |
| 2 | **Erik 2026 — designér, který učí** | VI | 🟢 | `cile-VI.md` "Co si odnáším" | Strong. ⚠️ the bike/swamp quote in the tile reads like a draft — confirm it's your words or swap for a real cile-VI line. |
| 3 | **Hackathon — testování s Adamem** 🎯 | I | 🔴 | `hackaton-I.md` (does NOT contain Adam) | **Biggest gap.** Article = maturity-model tested with an unnamed rep. The "Adam: usability guest → ran for ředitel → won" payoff is unwritten (braindumps qs-19/qs-21/ctx-3/ctx-18). Photo `i-hackathon-adam.jpg` ✓ but caption asserts a story the site never tells. Write the Adam outcome. |
| 4 | **Přihláška na KISK** ✍️ | I | 🔴 | none (braindumps + UX-Monday only) | Narrative bridge tile. Infarm→KISK + GPT-3 motivák. The actual motivák scan is an asset hunt. Net-new micro-copy. |
| 5 | **Studie inovativních týmů ve státní správě** 📊 | II | 🟡 | `ostrovy-pozitivni-inovace.md` (stub, "Detaily TBD"); **published external report** `inovacnitymystatnispravy.cz`; referenced in `cile-II`, `praxe-IV` | The *project* is real and published; the on-site article is a stub. The 3 participant quotes in the tile read authentic — confirm they're cleared (the stub literally says authorization pending). Depth-link should go to the external report, not the stub. Photo `ii-report-tymy.png` ✓. |
| 6 | **Fléda — service design** 🛠️ | III | 🟡 | `semestr-3/sxd/_readme.md` (opaque index, persona "Tereza"); `presentations/kisk/sxd-25.html` | SXD case study = Fléda (confirmed: `sxd/_readme` + sxd-25 deck). The 3 customer quotes are real survey voices (kept verbatim incl. no-diacritics + Slovak). **The hook — cold email → implemented improvements → CEO callback — is unwritten prose** (braindumps only). Photo `iii-fleda.png` ✓. |
| 7 | **Papírové prototypy — IxD** ✏️ | III | 🟡 | `cile-III.md` (IxD = "nejlepší kurz studia", no paper-proto detail); photo from `jarmilka/proces/design-crit.jpg` | Texture/craft tile. Course reflection exists; no dedicated writeup and no specific paper-prototype story. Low stakes — keep as visual or fold into the thesis tile. |
| 8 | **JINAG → bakalářka** 📕 | III | 🟡 | `praxe-III.md` (Access4all/JINAG workshops, links jinag.eu); `case-studies/jarmilka.html`; `BAU/index.html` (thesis deck) | **Pointer tile by design** (plan §1: "JINAG = pointer, not re-narrated"). Thesis = **Jarmilka** (distinct project from Fléda — don't let the two S3 "service design" tiles blur). Backing is scattered across a deck + a case-study page; no portfolio article. |
| 9 | **Retrospektiva workshopu** 🛠️ | III | 🟡 | `praxe-III.md` (DIS KISK program retro, co-org Baru + Veru); `cile-III.md` (end-of-semester program workshop) | **Contradicts landing-collage** ("není v poznámkách") — it *is* in praxe-III, just briefly. Photo `retro.jpg` now exists. Chip links it forward to Design cirkus (#14). Needs one or two real sentences, not a hunt. |
| 10 | **Workshop s panem nejvyšším** 🏛️ | IV | 🟢 | `praxe-IV.md` (full article) | **Strongest beat.** Resolves identity: **Jindřich Fryč**, 5.5.2025, Hotel Spiritka, World Café, tajemnictvo most ministries. Photo `iv-tajemnicky.jpg` ✓. Depth-link `/praxe-IV/`. |
| 11 | **Podcast Design KANTÝNA — ZDW** 🎙️ | IV | 🟢 | `ucast-na-konferencich.md` (full article) | Strong. Panel o designu inovací ve veř. sektoru, ZDW (7.–13. 5. 2025), co-host **Lukáš Němec**. ⚠️ verify "Jan" middle name + who moderated. Direct episode link still an asset hunt. Photos `iv-design-kantyna.jpg` + `zdw-25/rozprava.png` ✓. |
| 12 | **🎖️ Medaile Ministerstva vnitra** | IV | 🔴 | **none** — and braindump contradicts it | **Verify/fix.** No article mentions it. UX-Monday braindump (your words): medal was for the **childcare service** (pre-study MPSV). Likely wrong body and wrong semester. Canonical swag piece — must be precise (publicly searchable). |
| 13 | **Učím — tři kurzy** 🧑‍🏫 | V (II–V) | 🟢 | DM&L `cile-I`/`infoveda` + `praxe-V`; Service Design Workshop `cile-IV`/`praxe-IV`; KISKED19 `praxe-V`/`cile-V` | Compiled tile (3 courses → 1 card, plan §1.9). Strong, multi-source. ⚠️ DM&L co-teacher spelling: semester files say **Káninský**, shaping docs say Kalinský. Photo `v-urednici.jpg` ✓. |
| 14 | **Design cirkus** 🎪 — srpen 2026 | VI | 🔴 | none (future event) | Forward "co dál" tile, follow-up to #9. Braindumps only. Photo `cerych.jpg` ✓. Net-new micro-copy. |
| 15 | **Etika v designu — výstupy** 🧭 | ? | ⬛ | none (`missing:true`) | Placeholder by design. Needs semester + a concrete output from you. Intended link: the "No křoví. Ever." refusal mindset (ctx-16/qs-17). |
| 16 | **UX Monday — mluvím o tom, jak pracuju** 🎤 | VI | 🟢 | `cile-VI.md` (UX Monday section) + `ux-monday-braindump.md` + `presentations/ux-monday-26` + LLM-workflow SVG | Strongest-documented item in the whole set. Depth-links: `/cile-vi/`, `/ux-monday-26/`, `/ux-monday-braindump/`. Photo `vi-ux-monday.jpg` ✓. |

---

## 2. Where multiple tiles tell ONE story (you asked specifically)

**Thread A — the public-administration arc (Beat 3). Four tiles, one continuous story, already cross-linked in the source articles:**
- #5 Studie týmů → #10 tajemnický workshop → #11 Design Kantýna → #13 KISKED19 (Učím).
- This isn't a coincidence of topic: `praxe-IV` opens on the S2 study, `ucast-na-konferencich` references *both* the study and the tajemnický workshop, and `praxe-V` references *both* again. The research **is** the origin; the workshop, the podcast invite, and the teaching course are all "because of" it. → In the master article this is one sweep ("from facilitating the leaders to teaching the ground"), and the four tiles are entry points into it.

**Thread B — facilitation/community continuity: #9 Retrospektiva → #14 Design cirkus.** Already wired (the chip "pokračuje → Design cirkus"). One thread, two tiles, spanning S3 → post-study.

**Thread C — the workflow/voice ending: #2 Erik 2026 + #16 UX Monday** both draw on `cile-VI` + the UX-Monday braindump. Same source, two surfaces.

**Watch-out — two distinct S3 "service design" tiles: #6 Fléda ≠ #8 Jarmilka.** Fléda = the music-club SXD case (persona Tereza, sxd-25 deck). Jarmilka = the JINAG/Access4all bachelor thesis. They share the "service design" tag and the same semester; make sure copy keeps them separate or a reader will think it's one project.

---

## 3. Corrections & verifications surfaced (fold into one pass)

| Item | Status | Action |
|---|---|---|
| "pan nejvyšší" identity | ✅ resolved | Jindřich Fryč, nejvyšší tajemník pro státní službu (`praxe-IV.md`). Safe to name in copy. |
| Medal — body & semester | 🔴 likely wrong | Braindump → childcare service, not Ministerstvo vnitra; predates study. Confirm award name + body + year, then re-pin the tile. |
| `Matěj Káninský` vs `Kalinský` | ⚠️ | Semester files (`infoveda`, `cile-I`) spell **Káninský**. Fix shaping docs or confirm. |
| `Lukáš Němec` vs `Lukáš Jan Němec` | ⚠️ minor | Article says Lukáš Němec. Confirm middle name. |
| Design Kantýna moderator | ⚠️ | Article credits Baru moderating the *Miro* panel only; shaping notes say David Severa moderated *yours*. Confirm. |
| Studie týmů — quote clearance | ⚠️ | Stub says authorization pending; the 3 tile quotes need to be confirmed cleared for public use. |
| `ostrovy` depth-link | note | Point #5 at the published `inovacnitymystatnispravy.cz`, not the on-site stub. |

---

## 4. Recommendation — the one end-to-end master article

**Yes, write it — and make it the spine, not a seventh sibling of the cile-* files.**

`cile-VI.md` already does the end-to-end job better than you may remember: it opens "*po šesti reflexích už ten oblouk konečně začíná být vidět*", lists the whole-study goals, frames 2023→2026, and closes on "*neohrabaný praktik … → mluvil jsem na největším meetupu*". It reads as a capstone, not a semester note. It's just **filed** as a semester reflection.

Proposal:
- **Create `cesta/pribeh.md`** (or similar) = the canonical narrative, ~1200–1800 words, Czech, your voice. Seed it by lifting cile-VI, then thread the four locked beats (plan §1.3) with their concrete outcomes:
  - **Beat 1 / S1:** the Adam outcome ← *net-new, written here for the first time* (tile #3).
  - **Beat 2 / S3:** Fléda — cold email → improvements → CEO callback ← *net-new here* (tile #6); JINAG/Jarmilka as a one-line pointer (tile #8).
  - **Beat 3 / S4→S5:** the public-admin sweep (Studie → Fryč workshop → Design Kantýna → KISKED19) ← *connective tissue written here* (tiles #5, #10, #11, #13).
  - **Beat 4 / S6:** the workflow ending — bike, dictation, LLM orchestration, UX Monday; GPT-3 full-circle close (tiles #2, #4, #16).
- **This article is where every 🔴 net-new tile gets its prose, once.** The tiles then become teasers that link *into* the relevant section of this one article (recipe-video order: outcome first, process one click deeper). That's exactly the "single narrative, project pages are the appendix" principle in plan §1.10.
- It doubles as your **exam script** — read top-to-bottom, it's the 20-minute walkthrough; fallback-safe.

What it does NOT need: re-narrating Jarmilka (pointer), the IxD course (texture), or anything in the frozen legacy site. Curate in, don't summarize everything.

---

## Open questions for Erik (blocking the net-new writes)

1. **Adam** — the exact outcome in your words (guest at the usability session → candidacy → won the ředitel post?), so it can be written truthfully.
2. **Medal** — real award name, awarding body, year, and which project it was for. (Childcare service? Then it's a pre-study bookend asset, not an S4 swag piece.)
3. **Fléda** — what's safe to state about the CEO callback and the implemented improvements (D6 sensitivity pass).
4. **Etika v designu** (#15) — which semester, and what concrete output should the tile point to.
5. **Studie týmů quotes** — cleared for public display?
