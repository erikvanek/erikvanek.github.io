# Site design direction — dis-kisk portfolio (proposed)

*Target location: `pages/dis-kisk/portfolio-shaping/site-design-direction.md`*
*Status: Proposed v0.2 — Lego pivot with six roles per semester, from bike-transcript 2026-05-30, to be validated through paper.design prototyping*
*Last updated: 2026-05-30 (Lego pivot + six roles + maturity-curve synthesis)*

This is the design direction for the dis-kisk portfolio *site* itself — distinct from the locked dis-kisk visual system (cream/ink/amber, A4 portrait, light theme, type pair pending). The visual system defines the static elements; this direction defines the interactive/structural treatment.

Erik shared this in a bike transcript. It is *proposed*, not committed — it'll get tested via paper.design prototyping before anything ships. Treat it as a vision document, not a spec.

## The concept

A primitive interactive portfolio with two character modes the visitor can switch between:

- **Erik 2023** — entering the program. Engineering background, methodology gaps, just fired from Infarm, just admitted to the program. Inventory: a CS degree, some HCI theory, a partner-suggested motivation letter written via GPT-3.
- **Erik 2026** — defending the bachelor's. Designer plus a bit of product person, teaching three classes across the program, juggling several client engagements, dictating from a bike on Vysočina, brain-dump-and-LLM workflow as default.

The visitor picks a starting state; the portfolio walks from there to the other.

- **2023 → 2026** is the *journey forward* — what was added each semester to get from clumsy practitioner to where the spine lands. This is the mode for the finals presentation.
- **2026 → 2023** is the *origins backward* — where does the current state of Erik come from? Per semester, what fell into place to make it possible.

## Aesthetic

A minifigure-style abstract character — Lego-inspired register (boxy head, claw hands, swappable costume parts) without being literal Lego, which is trademark-protected and would complicate eventual commercial absorption.

The character takes on a different role/costume in each of the six semesters, accumulating tools and gear as it goes. By S6 the figure is visibly the sum of every prior costume plus something quietly new.

The visual leveling does the spine's work without prose having to argue for it.

## Six roles, six costumes

One per semester. Erik's framing from the second bike transcript, with light commentary.

1. **S1 — The scruffy button-pusher.** Tired, working at the ministry on a difficult project, *"pushing buttons and seeing what sticks."* Costume: rumpled, generic, unbranded. Layer zero on the design-maturity scale.
2. **S2 — The dedicated researcher.** Deep in public-service innovation work. Going beneath the surface. Also the first tutoring gig (Design Management & Leadership with Matěj Kalinský), which introduced leadership and org-change lenses. Costume: research-coded — papers under one arm, an audio recorder, glasses, a notebook.
3. **S3 — The hands-dirty craftsman.** Most hands-on semester. Interaction Design + Service Design with Fléda. Multiple projects, different contexts, different tools. Costume: tool belt, sleeves rolled, a phone in hand with prototypes on the screen.
4. **S4 — The distinguished.** First solo teaching gig (Service Design Workshop at KISK). Tajemnický workshop with secretaries of more than half of Czech ministries. Highest stakes Erik had been at. **Plus: awarded by the Ministry of Interior as one of the most innovative public-space workers (exact title/date to verify).** Costume: button shirt, leather shoes, slightly more posture — and **the medal**, the canonical example of per-semester swag.
5. **S5 — The conductor / bridger / composite (name TBD).** Three threads compile: teaching, design, public-services. Designing-and-teaching-at-once for public-space officers. Costume: composite — keeps most of S3 and S4, adds a baton or pointer or whatever signals *"I'm now teaching this whole thing."* The accumulation reaches critical mass here.
6. **S6 — The last-miler.** Factory-worker / steam-engine register. Finishing the thesis, finishing the portfolio. Costume: coffee in one hand, thesis under one arm, slightly tired but walking out the door. The narrative earns a quiet ending — the leveling doesn't have to keep climbing forever.

The S5 name is the one real open item. Three candidates above; pick or veto all.

## Concept track B — the revealing terrain map (Erik sketch, 2026-06-07)

A second concept track alongside (not necessarily replacing) the hero/creature. From Erik's notebook sketch:

- The journey as a **map of terrain**, divided into six territories = six semesters. Each territory links to a **dedicated semester page** — the map is the navigation hub of the new-URL experience (matches the plan's stage-page IA directly).
- A **diagonal S-curve cutting through = the timeline 2023 → 2026**; segment boundaries = semester transitions.
- **Gradual reveal**: territories start hidden and reveal as the path is walked (fog-of-war mechanic — the game layer without needing character animation). Territory I starts revealed (hatched in the sketch).
- **Per-territory distinction**: color, pattern, or sign per semester — open, up for rework.
- **Keyword collage / garden ambition (later layer, not now)**: each territory carries keywords illustrated with pictos/small pictures, forming a collage-landscape. End-state metaphor: *a garden harvested throughout the study* — connects to the hydroponics origin, the mycelium motif, and the regenerative/extractive language already in Erik's texts.
- **Hero × map composability**: the creature can stand on / walk the path — the two tracks can merge (hero at the current position on the map, skins changing per territory). Neither excludes the other.
- Three conceptual models drafted on canvas (fog-of-war cartographic / garden plots / topographic ascent) — treat as thinking models, not visual finals.
- **Metaphor space is open beyond hero/garden/journey** (Erik, 2026-06-07). Hard constraint for any candidate: **easy to depict with web technologies & code** — CSS/SVG/canvas/generative, no pixel-perfect drawing in design tools. The divergence pass and scoring criteria live in `plan.md` Phase 2.

### Hero screen — glass panel over the map (Erik sketch #2, 2026-06-07)

Second notebook sketch resolves the "map alone is hard to carry the whole interface" worry: the map stays the **full-bleed background** (age-of-empires register — Erik explicitly likes that it *also illustrates how design/discovery usually works*: territory gets revealed as you explore), and a **centered overlay panel ~50% of screen width & height** floats on top. Mocked on canvas (artboard "Hero screen — glass panel over map v0.1").

- **Panel is semi-transparent** — the map structure (and the amber timeline crossing diagonally behind it) must read through. **Shader-powered visual** wanted so the panel "stands out" from the layer behind. Web feasibility: CSS `backdrop-filter: blur()` is the trivially-webby baseline (this is what the Paper mock uses + a diagonal sheen gradient); a real shader (subtle WebGL refraction/grain behind the text) is a progressive enhancement, fits the web-tech constraint.
- **Panel = 3 rows:** (1) **Title** — really punchy, must capture the journey + who Erik became professionally. (2) **Subtitle** — to be co-written. (3) **Meta row in thirds:** `AKTUALIZOVÁNO / červen 2026` · `DIS KISK portfolio` hyperlinked to the study programme page · `Erik Vaněk`. Vertical hairlines between cells.
- **Title/subtitle copy = OPEN** (plan.md D10). On canvas as placeholder: *"Naučil jsem se řemeslo. Teď ho učím."* / *"Šest semestrů, šest území. Cesta studiem Designu informačních služeb, 2023–2026."* **Copy filter when co-writing: "hook, not a label" (Ridd / Dive.club — see `portfolio-inspiration.md` §2). The title opens a curiosity gap; it never names a category.**
- **Map topology rule (Erik correction, 2026-06-07):** the map divides into **three bands by two sharp, parallel cross-diagonal cuts** — pair I+II | pair III+IV | pair V+VI. **Within each band the river itself is the only divider**: odd semesters (I, III, V) above the river, even (II, IV, VI) below it. No other border lines — the first mock's arbitrary per-territory borders were wrong. The cuts render clearly stronger than all other linework, still subordinate to the amber river.
- **Territory areas weighted by semester intensity:** S1, S2, S3, S5 (where most happened) get a bit more area than S4, S6 — tuned via the river's path through each band: it bisects band 1 fairly (I/II), runs low through band 2 (III > IV), climbs steeply through band 3 (V > VI right strip). Erik also asked the river to split within-pair space *fairly* — his redrawn river was the reference.
- **Territories I–VI stay low-detail in first iteration.** End ambition per territory: a **tiny "wordcloud" that isn't necessarily words** — collage of quotes, keywords, photos, pictos (the "garden harvested" layer from sketch #1). Per-semester content shortlist lives in `landing-collage-content.md` (3–4 standout items each, Erik curates). Content first, map integration after. **When curating each territory, lead with the strongest outcome ("recipe video" order, `portfolio-inspiration.md` §2) — the earned result is the hook, the process is the depth link.**
- Mock details worth keeping: territory tints stay near-cream (parchment holds), territory I hatched = revealed, amber river with soft halo + station dots where the river crosses the pair cuts (= pair transitions), start flag + `2023`/`2026` endpoints, thin map frame.

### Collage map — built mocks (2026-06-07)

Two artboards now carry the per-territory collage (real photos + keyword chips + emojis), on top of the pair-cut topology:

- **"Terrain map — collage v0.2"** — first full collage. Per-territory *visual register* differs deliberately: I scruffy scatter (rotated stickers), II neat stack, III craft (loud Fléda sign), IV formal + date stamp, V threaded/connected, VI ship. Each territory has its own tint family + a **lava-lamp radial glow** (mocked static; **animates slowly in the web build** — Erik's "slow-moving continuous lava-lamp" ask). **No dashed fills** (Erik vetoed the hatch pattern) — gradients/glows instead. A faint "glass panel footprint" marks where the hero panel will overlay.
- **"Terrain map — collage v0.3"** — branched from v0.2 (Erik: "duplicate and branch off it"). Changes: **river raised on the left (origin y≈640) so territory II is much taller** — the portrait report cover fits cleanly below the river; **VI abstract topology picto removed** (Erik's call — photo carries it). v0.3 is the current head; v0.2 kept as the branch point.
- **Per-territory content + image assignments** live in `landing-collage-content.md` (single source of truth for what goes where).
- **Emoji usage:** Erik asked for emojis to "extract emotion" per semester — used sparingly as trailing accents on chips (🎯 🔬 🎖️ 🚲 ↺). Keep them earned, not decorative noise.
- **Roman numerals = faint watermarks, NOT labels (Erik, 2026-06-07):** the I–VI signs are background filler that orient, never focal points — they must not compete with photos/content. Set low (opacity ~0.16) and neutral quiet-gray `#7a7060` (NOT per-territory saturated color — that also keeps amber reserved for earned moments only). The content (photos, chips) carries the eye.
- **Semester framing should fade from the UI (Erik, 2026-06-07):** Erik *eventually doesn't want to mention semesters at all* in the presentation layer. Interim convention: a small **color-coded `semestr X` tag** per card/tile (web build uses the Paper territory-glow colors: I moss `#6B7A45` · II steel `#3E5A6E` · III terracotta `#B0552E` · IV burgundy `#6F2430` · V amber `#C26818` · VI ochre `#9a7a23`). Role names (Praktik…Poslední míle) stay in the content data but are NOT shown as tile headers. Long-term: color alone may carry the period.
- **Mřížka mode = photo wall (Erik steer, 2026-06-07):** uniform-height tiles, each tile's aspect ratio follows its photo (portrait photo → portrait tile); keyword chips stamped on a bottom gradient scrim; hero title/subtitle stamped directly over the wall with a radial dark scrim (NO dedicated center card — "wasting precious space"); title sized down (~3vw); meta thirds (date/program/author) dropped from the wall stamp (kept in the Mapa panel per the original sketch). Erik likes the steer toward visual content.
  - **Refinement — 4 fixed footprints (Erik, 2026-06-07):** free per-photo aspect ratios flowed strangely (8 distinct tile widths wrapping unevenly). Replaced the flex height-band with a **square-cell CSS grid + 4 footprints only**: **1×1** (text + near-square photos), **2×2** (hero card + a few `feature:true` hot picks — the editorial anchors), **1×2** (tall photos, ratio < 0.85), **2×1** (wide photos, ratio > 1.25). Shape auto-derives from `photo.ratio`; `grid-auto-flow:row` preserves the Semestry/Hotness reading order (accepts the odd gap at row ends over reshuffling). Implemented in `cesta/index.html` (`.wall` grid + `.tile.f-*` spans + `footprint()` helper).
  - **Refinement — designed opening block + chrome-less headline (Erik, 2026-06-07):** the wall now opens on a **fixed 6×2 composition**: `[Erik 2023 · 2×2] [headline · 2×2, centre] [Hackathon · 2×1 / Retrospektiva · 2×1, stacked right column]`. The **headline is deliberately the ONE element that does not read as a tile** — chrome stripped (no bg/border/shadow/blur), just title+subtitle floating in the grid, centred in the first row. Mechanics: `lead:N` field marks the opening pair (held across sort modes); `fp:'f-...'` field is an explicit per-tile footprint override (used for Erik 2023 → `f-big`, Retrospektiva → `f-landscape` until its photo lands); `renderWall` order = start → headline → lead → mid → end. Grid **capped at 6 columns** (`.wall max-width` + `margin-inline:auto`, `--cell` lowered to `clamp(150,15vw,200)`) so the opening stays stable ≥~960px and centres on wide screens instead of spreading. Erik 2023 got the `img/i-me-melon.jpeg` portrait. Below ~960px the grid drops to 5/fewer cols and the opening reflows (accepted).
- **Mřížka ROZŠÍŘENÁ — third mode, implemented (2026-06-07):** branched off Mřížka (kept vN, forked vN+1) — same `INITIATIVES` data + same `start → headline → lead+mid+end` composition, but each card carries two extra layers. **(1) Thematic tags** — a small uppercase pill row per card. Taxonomy is deliberately coarse: **every tag must apply to ≥3 cards (Erik's threshold)** — `výzkum · service design · facilitace · veřejná správa · AI workflow`. Tags Erik rejected: `ocenění` (only 1 card) and `veřejný hlas` ("weird"). A dedicated *teaching* tag can't reach 3 (compiled into one "Učím" card) so the teaching thread rides under `facilitace`. **(2) Research-voice quotes as STANDALONE tiles (Erik correction, 2026-06-08):** *verbatim* field/participant quotes from Erik's own research (NOT self-description citáty — rejected). **Each quote is its OWN tile** — explicitly NOT baked into the project card (the first 2×3 "qcard" version that stacked them on the project was rejected). A quote tile = the quote (italic) on top + the project reference underneath (`— {project, emoji-stripped}`), **no tags**, white card with a faint „ watermark; sized **1×1 (<90 chars) or 1×2 (≥90 chars)** by length. `renderWallExt` emits a project's quote tiles immediately after that project's card (`emit()` helper). So far: Studie týmů (3) + Fléda (3, preserved exactly incl. the no-diacritics + Slovak responses); Jarmilka quotes pending from Erik. Mechanics: `makeTileExt()` (tags+title+chips) + `makeQuoteTile(text,ref)` + `noEmoji()` + `renderWallExt()` (mirrors `renderWall` composition — **keep in sync**); `tags`/`quotes`/`fp` ignored by Mapa + Mřížka. Dropdown: Mapa / Mřížka / Mřížka rozšířená, persisted in `localStorage`.
- **Tile roster edits (Erik, 2026-06-08):** removed **Motivák, podruhé** (gone everywhere — also drops its full-circle chip from Mapa) and **Motivák psaný GPT-3** → replaced by a **Přihláška na KISK** tile (keeps the GPT-3-motivák chip + `AI workflow` tag, which keeps that tag at ≥3: Erik 2026 · UX Monday · Přihláška). **UX Monday** moved to the END of the flow (last mid tile before the Erik-2026 bookend) to balance the marquee items across the journey. Footprint overrides: **Design cirkus** → 1×2 with new `cerych.jpg`; **bakalářka (JINAG)** → 2×1; **Retrospektiva** → real `retro.jpg` (no longer "foto chybí", `missing` dropped, still `lead:2`/2×1). New images downscaled to 1200px JPEG q85 in `cesta/img/` per the asset rule.
- **Layout pass — no more 1×1, deliberate squares (Erik, 2026-06-08):** **all `f-1×1` removed** — every tile is now 2×1, 1×2, or 2×2 (text tiles → 2×1; quote tiles → 2×1, dropping the by-length 1×2). **Studie inovativních týmů → 2×2** big square; **Design cirkus → 2×1** (cerych.jpg is landscape, so the crop concern is gone). Bottom card gradient **shortened ~30% + ~⅓ less dark** (base `.tile-stamp` `.82→.55`, pad-top `30→21`; ext stamp swapped its solid panel+feather for a short `rgba(18,16,12,.6) 62%` gradient). **OPEN — exact composition not yet achievable:** Erik wants specific positions (UX Monday last row; Fléda+Design KANTÝNA stacked into a 2×2 in the right column; Učím middle row; cirkus+bakalářka paired into a square). CSS `grid-auto-flow:row` auto-packs and **cannot pin tiles to specific rows/columns** — that needs explicit per-tile `grid-column`/`grid-row` placement, which would also disable the Semestry/Hotness reorder for this mode. Footprints are set up to *support* those squares (all the pieces are 2×1); the precise placement is the open decision.
- **River = tapered gradient ribbon (Erik, 2026-06-07, on v0.3):** the timeline is no longer a constant-width stroke. It's a **filled ribbon that widens from ~3px at 2023 to ~22px at 2026**, filled with a `linearGradient` running 2023→2026 at **30% → 100% amber opacity**. Reads as "the path gains definition and weight as Erik matures." Technique note: SVG strokes can't vary width, so this needs a filled outline shape; inline `<defs><linearGradient gradientUnits="userSpaceOnUse">` **survives Paper's `write_html` import** (confirmed working) — see CLAUDE.md Paper learnings.
- **Open visual TODOs:** the per-territory backgrounds are still flat tint + one glow each — Erik wants each semester to eventually have its *own* richer visual style (gradients + shaders combined, "vivid and interesting"); this is the next fidelity pass, not done. Retrospective-workshop photo (S3) still a dashed placeholder.

## Swag system — hard requirements (Erik, 2026-06-07)

The accumulation mechanic has engineering constraints that precede any aesthetic choice:

1. **Every swag piece is a standalone asset.** Designed, named, and exportable on its own (own SVG group/file) — never baked flat into a figure illustration. Examples per semester: S2 recorder/notebook, S3 tool belt, **S4 the Ministry of Interior medal**, S5 baton, S6 thesis + coffee.
2. **The figure has standard attachment points** (e.g. head, face, torso-front, belt, left hand, right hand, feet, back) so skins and swag stay portable across costume states. A skin change must not orphan the swag.
3. **The final screen decomposes the swagger**: the journey's accumulated items laid out as a labeled inventory on one canvas — what each piece is, which semester earned it, what it stands for. This is the payoff screen; the figure earns it by walking the curve first.
4. **Skinning and swag-attaching are separate mechanics.** Skin = the costume/clothing state of the figure itself; swag = items attached on top. Both must compose.

## Structural visual motif

A **design-maturity curve rising across the six semesters**, with the Lego figure standing on it at each beat. The synthesis Erik raised in the S1 observation: the program seems *"centered around some sort of design maturity scale or curve."* The costume progression and the curve aren't two ideas — they're one. Each semester is a rung on the climb; each costume is the figure's state at that rung.

**Not** an emotional ups-and-downs curve (the voice principles explicitly reject wishy-washy readings). The curve has a direction: up.

Maturity scales worth borrowing — or inventing one of:

- Nielsen Norman's UX maturity scale.
- IDEO's design-thinking maturity model.
- Erik's own scale, derived from the six roles: *chaos → research → craft → stakes → integration → ship.*

The earlier river/tree readings can still apply as decoration (tributaries = parallel projects; branches = side gigs and teaching threads) but the *primary* structural reading is the maturity climb.

## Functional switches

Two toggles in addition to the mode switch:

- **Language: Czech ↔ English.** Default Czech (state-exam context). EN as a switch for international viewers and for eventual commercial absorption.
- **Theme: Light ↔ Dark.** The locked design system is light (cream/ink/amber, A4 portrait). A dark variant needs a parallel token set; not yet defined. Possibly: dark cream (closer to umber) ground, paper-ink reversed to lighter shade, amber unchanged.

## What this means for the next few weeks

Two questions worth answering before time goes into prototyping:

1. **Is the full character-progression concept a Phase 5+ ambition (post-exam), or do you want a stripped-down version for the deck?** Building a fully animated leveling-figure interactive in 2.5 weeks would consume time that should go into the four-beat deck content and rehearsal. A stripped-down version (the curve + the 2023/2026 mode switch + static figures at the key semesters, no per-semester animation) is viable in the window; the full six-costume animated variant is not. Safest plan: minimum-viable for the exam, full build post-exam when the commercial rebuild is happening anyway.
2. **paper.design or production code?** paper.design is great for prototyping interactions and getting visual ideas live fast. But the dis-kisk portfolio currently lives in the Eleventy/Nunjucks repo. At some point the prototype has to either port to production or stay as a separate prototype-only artifact pointed to from the site. Worth deciding which mode this is shipping in.

## Known constraints to inform prototyping

- **Locked palette:** cream `#F4EFE5`, ink `#1C1812`, amber `#C26818`. Plus an open spot for "quiet" gray (`#7a7060` in cile-VI's SVG) and rule color (`#d8d2c4`).
- **Locked format constraint:** A4 portrait for the PDF version (light theme). The web version can have its own format; just be aware the PDF export exists.
- **Type pair:** pending. Recommendation in `type-pairs.md` is Pair 02 (DM Serif Display + DM Sans). Editorial register suits a journey portfolio well.
- **Existing assets to reuse:** the SVG topology diagram in `cile-VI.md` (Space Grotesk + Inter for labels). The four type-pair preview is at `type-pairs-preview.html`.
- **Figma is not Erik's tool of choice.** Self-described as *"never a huge figma person, gonna suck at it."* paper.design is the right call for him; whatever ships should be straightforward to maintain without heavy design-tool dependency.

## Creature — initial decisions (Erik, 2026-06-07; revocable first steps)

- **Face: expressive, changes per semester** — eyes + mouth are part of each skin; the face carries the emotional arc.
- **Register: seamless flat pictogram** — no visible sockets/joints; the mechanic stays implicit, swag just attaches.
- **Body: chibi big-head; legs optional** — torso + head + hands can be enough; human resemblance matters only as far as it serves skinning, which is the prime directive.
- **Color: amber = swag only** — the figure stays ink+cream; everything amber on screen was earned. Decomposition screen reads itself.
  - **Evolution (2026-06-07):** costumes/skins may carry a small *wardrobe palette* — muted colors that don't compete with amber: putty `#D8D2C4` (S1 rumpled tee), burgundy/oxblood `#6F2430` (S4 polka-dot tie, white dots). Wardrobe colors stay low-chroma; amber remains the only "earned" signal.
- **Base creature: Variant C "Sprout" chosen by Erik (2026-06-07)**, tweaked by hand on canvas (head nested lower onto torso, longer arms). The tweaked canvas version is the source of truth for geometry — read it via get_jsx before deriving new states.
- **Pixel rework (2026-06-07, supersedes the rounded register pending Erik's pick):** rounded SVG felt "mellow and sloppy" → pixelated/nerdy direction with a Duke Nukem edge, dosed **70% friendly / 30% Duke** (sturdy stance, one-pixel smirk; no default sunglasses). Skinning surface expanded per Erik: **legs/pants region restored, wider/taller torso, explicit headwear zone above the head**. Three outline treatments drafted on canvas (inked / flat / silhouette-only) — Erik picks after seeing them. **SVG is the prototyping medium only**; the web build may use raster sprites or canvas if it serves the look better.
- S1 skin note: greenery (hydroponics tray + plants) was removed during a failed SVG-append (see CLAUDE.md Paper learnings); re-adding it waits for the pixel-direction pick so it's built once, in the winning register.

## Open questions for paper.design prototyping

When Erik sketches:

- ~~Does the character have a face?~~ → answered above. A name? Still open.
- How does the visitor *progress* — scroll, click, drag along the curve, autoplay with pause?
- Are the per-semester additions discoverable (click to learn) or passive (just visible)?
- What happens at the start and end states — is the 2023 state played for comedy or for honesty (the dropped-out-once, just-got-fired-from-Infarm context is real)?
- Does the curve scale with semester importance, or is it evenly weighted? (Uneven feels more honest; even is easier to build.)
- How do parallel threads (teaching, the public-services silver lining, the client work) show up against the spine? Multiple curves? Annotations on the main one?

---

*v0.1 — proposal, not commitment. The paper.design prototype iteration is what turns this into a spec.*