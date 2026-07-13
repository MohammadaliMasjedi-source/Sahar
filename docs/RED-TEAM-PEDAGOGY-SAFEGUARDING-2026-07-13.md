# Red-Team: Pedagogy + Child-Safeguarding + Secular Audit — Tier-1 content

Date: 2026-07-13 · Scope: the shipped Tier-1 packs (age band 6–8) and how lessons
present them. Gate required by SAHAR-V3-CHARTER §9 (double red-team: pedagogy +
child-safeguarding, both mandatory) and the new secular-audit gate (§Gates).

**Verdicts:** Pedagogy PASS · Child-safeguarding PASS · Secular audit CLEAN (no
star-crescent or other emblem in the current tree). Fixes applied this pass: **0**
(the tree is clean; nothing concrete/safe/small was outstanding). Findings logged
for a gated follow-up: **3** (all low severity).

**Update 2026-07-13 (later same day):** all 3 low-severity findings closed —
see "Findings logged for a gated follow-up" below for what changed in each.
Node validator: **green** (157/157 across content-validator + core + bootstrap
+ profiles) — before and after the fixes.

---

## What was reviewed

Content packs (all on the shelf via `app.js` `PACKS`, plus the bootstrap
first-contact pack wired by `bootstrap.js`):

1. `t1-literacy-first-letters.json` — phonics, first letter-sounds
2. `t1-literacy-first-words.json` — blending letters into words
3. `t1-numeracy-counting-0-20.json` — counting / add / subtract / compare
4. `t1-numeracy-shapes-patterns.json` — shapes, sizes, repeating patterns
5. `t1-science-living-things.json` — living vs non-living, my body, care
6. `t1-science-day-and-night.json` — sun/moon/stars, day/night rhythm
7. `t1-thinking-what-is-a-question.json` — what a question is, asking is good
8. `t1-thinking-fact-vs-guess.json` — guess then check, being wrong is OK
9. `t1-life-healthy-and-safe.json` — hygiene, safe water, sleep, feelings, trusted adult
10. `tier1-demo.json` — fact/opinion + a little counting (labelled "demo")
11. `lc-fa-en-first-words.json` — bootstrap language course (Dari→English, pre-literacy)

Presentation logic: `app.js` (interactive-card render, wrong-tap handling,
celebration, done screen, UI strings), `bootstrap.js` + `bootstrap-core.js`
(first-contact flow, distractor logic), `audio.js` (voice fallback chain),
`profiles.js` (profiles/garden storage), `pictures.js` (icon library),
`themes/kanoon/*` (Storybook skin art), `index.html` (logo/favicon/heroine).

---

## (1) PEDAGOGY — per pack

**Verdict: PASS.** The set is unusually well-built for 6–8.

- **Age-appropriateness (6–8):** Vocabulary, sentence length and cognitive
  demand fit early primary. Counting stays 0–20 with finger support offered.
  Shapes/patterns use a see→name→continue→make-your-own progression. Science
  and thinking packs use one idea per card. All within range.
- **Sequence / scaffolding:** Strong. Letters are taught by articulation cue
  ("press your lips together") before the word example; first-words explicitly
  calls back "the letter you already know"; blending is modelled (`d+ast→dast`)
  before the child is asked to blend alone (`m+aah→maah`). Each pack ends with
  an open, low-stakes "your turn" `repeat-aloud` card.
- **Cognitive load:** Low and controlled. Choice sets are 2–3 items; `match`
  cards run one sub-round at a time; the child-facing card shows a picture + one
  Listen button + choices only — no competing text.
- **Constructive feedback / no shame:** Confirmed in content AND engine. A wrong
  tap routes through `onWrongTap` (app.js) / `applyTap` (bootstrap-core.js): it
  never records a Leitner lapse, only shows "Try again" and a brief tile flash,
  and lets the child retry. Answer copy is warm and reframes error as learning
  ("being wrong is part of learning"; "if not, you just learned something").
  Done screen: "Sahar is proud of you." No timers, scores, streak-loss, or
  comparative pressure anywhere.
- **Picture-first / audio-first honoured:** Yes — this is structural, not
  cosmetic. `renderInteractiveCard` shows only pictures/glyphs + a Listen pill;
  the prompt/answer text lives ONLY behind the "For grown-ups" caregiver panel.
  Content-validator asserts every card has a "non-read-dependent interaction."
  Bootstrap flow is explicitly zero-reading (hear L1 → hear L2 → tap picture).

Pedagogy findings (logged, not blocking) → see F-3 below (demo pack).

## (2) CHILD-SAFEGUARDING

**Verdict: PASS.**

- **No fear / shame / pressure:** As above — gentle retry, no punishment, no
  scare imagery. The `sad-face`/`cross-mark`/`muddy-water` glyphs are mild,
  universal, non-graphic. The one sensitive card (`hs-8`, "if you ever feel
  scared/hurt/unsafe, who is a trusted grown-up?") is handled well: framed as a
  calm safety exercise ("not a test"), keeps the child in control, examples are
  family-first, no stranger-danger fear framing, no disclosure prompt.
- **Zero data collection / local-only:** VERIFIED. `profiles.js` (child
  name/age-band/avatar) and the garden progress use `localStorage` only — no
  `fetch`, XHR, beacon, or analytics of child data anywhere. The only network
  calls are same-origin `fetch()` of content-pack JSON and the service worker
  caching same-origin assets (app.js:178, bootstrap.js:78, sw.js). No third-party
  hosts, no tracking, no ads. `CaregiverRecorder` is an unwired local-only stub
  (`getUserMedia` appears only in a capability check). COPPA/GDPR-K clean by
  design, per charter.
- **Culturally appropriate for Afghan children:** Good. The bootstrap pack uses
  genuine Dari vocabulary (پشک *pishak* cat, مهتاب *mahtaab* moon, آفتاب
  *aaftaab* sun, ستاره *sitaara* star) rather than Iranian-Persian forms, and
  every pack carries an honest audioNote that the current TTS is an
  Iranian-Persian machine voice, not Dari, with real Dari human voice promised.
  Examples (water, garden, bread-adjacent, family) are neutral and regionally
  safe.
- **Secular:** See section (3).

## (3) SECULAR AUDIT — every crescent / star / geometric mark

**Result: CLEAN. No star-crescent (or any religious/political/nationalist)
emblem exists in the current tree.**

Prior context: two star-crescent issues were caught and fixed EARLIER this
session and are already in HEAD — commit `d10859a` removed two star-dots from the
`dawn` glyph's crescent bowl (the crescent+dots composition was the emblem; a
plain crescent, matching `moon`, was explicitly kept as astronomy), and the
heroine was redrawn to remove any headscarf/veil silhouette. This pass
re-checked the resulting state.

Icon-by-icon (`pictures.js` + `themes/kanoon/kanoon.js`):
- `moon` (both themes): a **lone plain crescent**, used to depict the actual moon
  in day/night and language lessons. Documented and correct as astronomy — never
  composited with a star in a single glyph or slot.
- `dawn` glyph: dawn theme keeps a plain crescent (deliberate, per `d10859a`);
  kanoon redraw drops it entirely ("no crescent anywhere"). Both are documented,
  reasoned choices — left as-is.
- `star`: plain 5-point star (a counting/night-sky motif, common in secular
  Persian folk textile). Not an 8-point / Rub-el-Hizb geometric star.
- `hand`: asymmetric (4 fingers + offset thumb) — reads as a hand, not a
  symmetric Hamsa/Khamsa amulet, and has no palm-eye.
- `cross-mark`: a diagonal "wrong" X, not an upright Latin cross.
- kanoon `sun` (no face → avoids lion-and-sun heraldry), `bird` (no winged-disc),
  `bloom` (6 rounded petals, not a pointed star), `tree` (cypress — secular
  Persian motif), `tulip` in the garden is ochre not red (avoids the post-1979
  martyrdom-tulip political reading).
- kanoon CSS `--k-frieze` (textile diamond + 6-dot blossom) and `--k-rosette`
  (12-petal botanical) — no emblem, no flag tricolor banding.
- `index.html` logo + favicon: a gold sun disc on a night→amber gradient — no
  crescent, no star. Heroine: hair ends at the ears, no head-covering.
- Avatar id guard in `profiles.test.js` asserts every avatar id is secular by
  name — passes.

No new star-crescent found. No 8-point geometric star, winged disc, sun-face, or
flag banding anywhere.

---

## Findings logged for a gated follow-up (all LOW severity — not forced)

- **F-1 (safeguarding, low) — CLOSED 2026-07-13.** The avatar picker
  (`profiles.js` `AVATARS`) shows all six avatars at once; `star` and `moon`
  used to sit last-two in the array, which is also grid render order, putting
  the crescent tile directly beside the star tile on narrow/phone widths
  (`.avatar-row` is `grid-template-columns: repeat(auto-fit, minmax(64px,
  1fr))`, so consecutive array entries are the ones most likely to land
  side-by-side). Still not a composited emblem, but per the absolute secular
  rule this was closed rather than left open: `star` was swapped with `cat` in
  the array (`dawnbird, leaf, fish, star, cat, moon`), putting two tiles
  between `star` and `moon` at every realistic column count (verified 3/4/5/6
  columns — only the unrealistic 2-column case, needing a ~150–200px
  container, still lands them adjacent). One-line reorder, `profiles.js`.
- **F-2 (safeguarding, low) — CLOSED 2026-07-13.** Same pattern in the
  bootstrap language pack: `bootstrap-core.js buildRounds` could randomly offer
  `moon` and `star` as two choice tiles in the same round. Fixed with a hard
  filter: a round for `moon` (or `star`) now excludes its partner from
  distractors, and any other round keeps at most one of `{moon, star}` among
  its distractors. Verified with 500 seeded RNG runs (5000 rounds total) — zero
  moon+star co-occurrences after the fix (was possible before).
- **F-3 (pedagogy, low) — CLOSED 2026-07-13.** `tier1-demo.json` declared
  `ageBand "7-9"` while shelved at band `6-8` (PACKS) and every sibling Tier-1
  pack declares `ageBand "6-7"` per `CONTENT-MODEL.md`'s documented standard —
  an honesty mismatch, not just an internal-vs-shelf quirk. Corrected the
  declared `ageBand` to `"6-7"` to match the documented standard and its actual
  shelf placement. The subject-mix and "demo" labelling were already disclosed
  in `subject: "critical-thinking + numeracy (demo)"`, so no further content
  change was made (retiring/re-pitching the pack remains a product call, still
  gated).

Re-run after fixes: `content-validator 90/90 · core 28/28 · bootstrap 14/14 ·
profiles 25/25 — 157 passed, 0 failed. GREEN.` (unchanged — none of these
fields/behaviors are asserted by name in the current test suite, so the fixes
are additive-safe.)

## Validator

`node test/content-validator.test.js` + core + bootstrap + profiles, run with the
Adobe-bundled `node.exe` (npm not on PATH):
**content-validator 90/90 · core 28/28 · bootstrap 14/14 · profiles 25/25 —
157 passed, 0 failed. GREEN.**
