# Red-Team: Pedagogy + Child-Safeguarding + Secular Audit — Tier-1 content

Date: 2026-07-13 · Scope: the shipped Tier-1 packs (age band 6–8) and how lessons
present them. Gate required by SAHAR-V3-CHARTER §9 (double red-team: pedagogy +
child-safeguarding, both mandatory) and the new secular-audit gate (§Gates).

**Verdicts:** Pedagogy PASS · Child-safeguarding PASS · Secular audit CLEAN (no
star-crescent or other emblem in the current tree). Fixes applied this pass: **0**
(the tree is clean; nothing concrete/safe/small was outstanding). Findings logged
for a gated follow-up: **3** (all low severity). Node validator: **green**
(157/157 across content-validator + core + bootstrap + profiles).

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

- **F-1 (safeguarding, low):** The avatar picker (`profiles.js` `AVATARS`) shows
  all six avatars at once, so the `star` tile and the `moon` (crescent) tile are
  always on screen together. They are two separate bordered picture tiles, each a
  legitimate astronomy glyph — NOT a composited star-crescent emblem — so this is
  not treated as a secular breach. Flagged only because the project's own kanoon
  note aspires to avoid moon+star in "the same screen slot." If the safeguarding
  reviewer wants zero adjacency, swap one avatar (one-line change) — a product
  call, so not forced here.
- **F-2 (safeguarding, low):** Same pattern in the bootstrap language pack:
  `bootstrap-core.js buildRounds` can randomly offer `moon` and `star` as two
  choice tiles in the same round (both are pack items). Same reasoning as F-1 —
  separate tiles, not an emblem. If desired, constrain distractor selection so
  those two are never co-offered; logic change, gated.
- **F-3 (pedagogy, low):** `tier1-demo.json` declares `ageBand "7-9"` but is
  shelved at band `6-8` (PACKS), mixes two subjects (fact/opinion + counting),
  and fact-vs-opinion is the most abstract concept in the Tier-1 set for a 6yo.
  It is labelled "demo." Consider retiring it from the 6–8 shelf or re-pitching /
  re-banding it once the real per-subject packs fully cover the slot. Content
  decision → gated.

## Validator

`node test/content-validator.test.js` + core + bootstrap + profiles, run with the
Adobe-bundled `node.exe` (npm not on PATH):
**content-validator 90/90 · core 28/28 · bootstrap 14/14 · profiles 25/25 —
157 passed, 0 failed. GREEN.**
