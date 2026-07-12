# Sahar — Coverage Status (honest, ticks against `SAHAR-COVERAGE.md`)

> Starts from the contract's own 2026-07-03 baseline (§7) and ticks up only
> with real, verified work. **This is a prototype. It is not ready for real
> learners without an adult present.** No "ready to use / deployable" claim is
> made anywhere in this file. Updated 2026-07-11 after the Amendment A
> (audio-first bootstrap) lane, then again same day after the Tier-1
> subject-coverage lane (2 new packs, structure only), then again same day
> after the audio-generation lane (Amendment E: a real machine-draft voice,
> honestly flagged — see §6.5 E), then again same day after the life-skills
> lane (§3 DoD's last missing bucket — see the updated §3 entry below), then
> again 2026-07-12 after the kid-visual-identity lane (mascot + celebration +
> bigger touch targets + a visible progress path on the MAIN app — see the
> updated §6.5 Amendment C below).

## 1. Vision
Unchanged — no technical work needed here; the vision statement in
`SAHAR-COVERAGE.md` §1 stands as written.

## 2. Content model
- ✅ `{fa,en,de}` dicts, pack meta, validator-friendly — as before.
- ✅ **NEW (2026-07-11):** the audio-first schema is now formalized in
  `docs/CONTENT-MODEL.md` — `interaction`, `audioPending`/`audio`, `caregiver`,
  and the four non-read-dependent interaction types are documented as the
  standard for every future pack.
- ❌ `fa-AF` / `fa-IR` split still not formalized (still just `fa`). Not this
  lane's scope; still open.

## 3. Age packages
- ✅ **NEW (2026-07-11, subject-coverage lane):** Tier 1 now has **9 packs**
  (literacy×2, numeracy×2, science×2, thinking×2, demo×1). Two packs were
  added this lane, both built directly to the audio-first schema (no
  migration needed):
  - `t1.literacy.first-words` (`content/t1-literacy-first-words.json`) — 8
    cards, "the natural step after first letters": simple Dari words
    (aab/baagh/maah/setaare/sang/derakht/dast) built from the letter-sounds
    already taught in `t1.literacy.first-letters`, plus two explicit
    sound-blending `repeat-aloud` cards ("د + ست → دست"). Interactions:
    tap-the-picture ×3, tap-the-letter-shape ×2, match ×1 (2 rounds),
    repeat-aloud ×2.
  - `t1.science.day-and-night` (`content/t1-science-day-and-night.json`) — 8
    cards, observable-world wonder ("the world is knowable"): sun/moon/stars,
    day-vs-night, warmth, and the day-night rhythm. Interactions:
    tap-the-picture ×4, match ×1 (2 rounds), repeat-aloud ×2. Reuses existing
    `pictures.js` icons only (sun, moon, star, tree, check-mark, cross-mark) —
    no new picture assets were needed.
  - **Tier-1 DoD from §3 ("≥2 packs per core subject") is now MET for
    literacy, numeracy, and science.** `thinking` already had 2. The
    remaining gap at the time: **no dedicated life-skills pack yet** — out
    of this lane's scope (task was literacy + science only), flagged
    honestly. **Closed same day by the life-skills lane below — see the new
    entry for the full detail.**
  - Both packs registered in `app.js` (`PACKS`, plus new `KIND_KEY`/`STRINGS`
    chip labels `firstWords`/`dayNight` in fa/en/de), precached in `sw.js`
    (`APP_SHELL`, cache bumped `sahar-v6` → `sahar-v7`), added to the
    validator's `PACK_FILES` list, and added to `teacher.html`'s printable
    sheet — all four wiring points found and updated, not just the content
    files.
  - Verified in-browser (local static server, zero console errors both
    times): the lesson picker lists all 9 tiles; both new packs were played
    card-by-card end to end (scripted through the real `openPack` /
    `onTapChoice` / `onAnswer` app functions, confirming card order fw-1…fw-8
    and dn-1…dn-8 each ran exactly once with no skip and no repeat) reaching
    the "Well done!" screen; `teacher.html` renders both new packs' fa/en/de
    text correctly.
  - Validator green: `npm test` now runs **123 passed, 0 failed** (28 core +
    14 bootstrap + **81 content** — up from 63, i.e. exactly +18 = 2 new
    packs × 9 checks/pack), exit code 0.
- ✅ **NEW (2026-07-11, life-skills lane):** Tier 1 now has **10 packs** — the
  §3 DoD's last missing bucket is closed. `t1.life.healthy-and-safe`
  (`content/t1-life-healthy-and-safe.json`) — 8 cards, subject `life`
  (health/safety/feelings per §4): hand-washing (soap + water, and a
  yes/no on washing before eating), clean vs. dirty drinking water,
  brushing teeth, a day-play/night-sleep match pairing rest with health,
  naming a happy feeling, an open `repeat-aloud` naming-your-own-feeling
  card, and a closing `repeat-aloud` card asking the child to name a
  trusted grown-up (mother/father/aunt/any caring family adult) they can
  ask for help if scared, hurt, or unsafe — framed as a gentle safety
  habit, never as distrust of the family. Interactions: tap-the-picture
  ×5, match ×1 (2 rounds), repeat-aloud ×2 — no letters/reading anywhere.
  Kid-safe, universal, no politics/religion — read once more specifically
  for "could this get a child in trouble at home" (the extra life-skills
  check) and found clean.
  - 7 new placeholder icons added to `pictures.js`: `soap`, `muddy-water`,
    `toothbrush`, `bed`, `ball`, `happy-face`, `sad-face` — same simple
    flat-SVG style as the existing set, not the final illustration pass.
  - Registered in `app.js` (`PACKS`, plus new `KIND_KEY`/`STRINGS`
    `healthSafety` chip label in fa/en/de), precached in `sw.js`
    (`APP_SHELL`, cache bumped `sahar-v9` → `sahar-v10`), added to the
    validator's `PACK_FILES`, `tools/generate-draft-audio.py`'s
    `TIER1_PACK_FILES`, and `teacher.html`'s printable sheet — all wiring
    points found and updated, not just the content file.
  - Draft audio generated for all 8 cards × fa/en/de (24 new `.mp3` files,
    ~1 MB) via the existing `tools/generate-draft-audio.py` — honest
    `audioPending` → `audioDraft` flip verified, `audioStatus` flipped to
    `draft` with the standard accent-honesty note. `audio/audio-manifest.json`
    regenerated (245 entries) for `sw.js`'s offline precache.
    `audio/RECORDING-MANIFEST.md` updated with the 8 new Dari lines and
    exact target filenames for Mo/Neda; totals corrected to 75 Tier-1
    prompt lines / 85 lines overall.
  - Validator green: `npm test` now runs **132 passed, 0 failed** (28 core +
    14 bootstrap + **90 content** — up from 81, i.e. exactly +9 = 1 new
    pack × 9 checks/pack), exit code 0, verified via the same Node runtime
    used all session (`node --version` → v20.18.0, invoked via the
    Adobe-bundled `node.exe` since `node` is not on this machine's PATH).
  - Verified in-browser (local static server on port 8099, service worker
    + all caches cleared first to rule out stale state): the lesson picker
    lists all 10 tiles including "سالم و ایمن / Healthy and Safe / Gesund
    und sicher"; the pack was opened and played card-by-card end to end
    (scripted taps through the real `openPack`/`onTapChoice`/`onAnswer` app
    functions, including the 2-round `match` card and both `repeat-aloud`
    cards) reaching the "آفرین!" (Well done!) screen with zero console
    errors; network log confirms all 8 `hs-*.fa.mp3` files fetched 200 OK
    and the in-app honesty banner read "اکنون: صدای رایانه‌ای موقت" (now
    playing: temporary machine voice) mid-card, confirming the real draft
    audio — not TTS/tone — actually played; RTL layout correct for fa,
    chip label and caregiver line verified correct in fa/en/de;
    `teacher.html` re-verified rendering all 10 packs' fa/en/de text with
    zero console errors.
- ❌ Tiers 2-4 still don't exist. Not this lane's scope.

## 4. Fixed subject list
Unchanged, already followed by every pack's `subject` field.

## 5. "Ready to use" bar (§5)
- ❌ Not claimed. Still a prototype.
- ✅ Opening `index.html` → pick language → pick age → learning within 3 taps —
  true, verified in-browser this session (no console errors, all 7 packs load
  and complete, language switch mid-card works fa/en/de).
- ⚠️ Offline/service-worker: `sw.js` precaches the full app shell + all
  content + the new `teacher.html`, cache bumped to `sahar-v6` this session.
  **Not verified with an actual airplane-mode test on a real device** — that
  verification is still open.
- ⚠️ PWA installability: manifest icons are real (inline SVG, 192/512px,
  maskable) — not placeholder. **Not verified installed on a real Android
  phone.** Still open.
- ✅ Progress saved locally (`localStorage`, unchanged, pre-existing).
- ✅ **NEW:** teacher/parent printable page (`teacher.html`) — what each
  Tier-1 pack teaches, fa/en/de, vanilla HTML/CSS, no dependency on
  `styles.css` so it still prints/opens standalone. Verified rendering
  in-browser, zero console errors.
- ✅ Zero console errors confirmed this session across: lesson picker, all 7
  Tier-1 packs end-to-end (including the new `match` two-round card and
  `repeat-aloud` cards), language switching, the caregiver toggle, and
  `teacher.html`. `bootstrap.html` (pre-existing) re-verified unaffected.
- ❌ README top structure (what-it-is → try-it-now → screenshots → contributor
  path) not reviewed/updated this session — out of scope for this lane.

## 6. Books track
Unchanged — still not started. Out of scope for this lane.

## 6.5 Amendment A — the audio-first bootstrap rule (THIS LANE'S SCOPE)

- ✅ **Audio-first card schema** — every card in all 7 Tier-1 packs now carries
  `interaction` + `audioPending: true` (declared honest placeholder; no
  fabricated audio files) + a `caregiver` read-aloud line in fa/en/de. Schema
  documented in `docs/CONTENT-MODEL.md`.
- ✅ **Picture-first interaction types** — `tap-the-picture`,
  `tap-the-letter-shape`, `match`, `repeat-aloud` are wired into `app.js`
  (previously only implemented for the separate `bootstrap.js` first-contact
  flow, built in an earlier session on 2026-07-06). All 51 cards across the 7
  Tier-1 packs were migrated off the old "read the prompt, then reveal the
  answer" pattern onto these four types — verified in-browser, choice order
  is shuffled per card (never a memorizable fixed position), wrong taps give
  a gentle retry with no scheduling penalty, correct taps advance the real
  Leitner spaced-repetition box.
- ✅ **Caregiver mode** — every card (all 7 packs + the pre-existing
  language-course pack) carries a "read this aloud to the child" line in
  fa/en/de, reachable via a "For grown-ups" toggle on the card.
- ✅ **Validator green** — `npm test` runs 3 suites, **105 passed, 0 failed**,
  exit code 0 (verified this session via Node v20.18.0):
  - `test/core.test.js` — 28 passed (Leitner core, i18n parity, unchanged)
  - `test/bootstrap.test.js` — 14 passed (language-course pack + round engine,
    pre-existing, re-verified unaffected)
  - `test/content-validator.test.js` — **63 passed (NEW this session)** —
    checks every Tier-1 pack for JSON validity, unique ids, fa/en/de
    completeness, honest `audioStatus`/`audioNote`, non-read-dependent
    interaction on every card, `audioPending`/`audio` declared on every card,
    and a resolvable/unique/answerable choice set with every `pic` key real
    in `pictures.js`.
- ✅ `docs/CONTENT-MODEL.md` — written this session, documents both the
  Tier-1 card schema and the pre-existing language-course schema as one
  standard.
- ✅ `teacher.html` — written this session (see §5 above).
- ⚠️ **Real audio recordings — still Mo/Neda-gated, still not faked** (updated
  2026-07-11, audio-generation lane — see §6.5 E below for full detail). What
  changed: every one of the 67 Tier-1 cards + 10 language-course words now has
  a **real, nonzero, machine-generated draft `.mp3` file** on disk (edge-tts,
  `tools/generate-draft-audio.py`), so the app genuinely speaks now instead of
  falling to TTS/tone for `fa`. What did NOT change: **no human ever recorded
  anything** — this is a computer voice, and for `fa` specifically an
  Iranian-Persian accent standing in for Dari, honestly flagged in every
  pack's `audioNote` and in the in-app banner. **The ask is unchanged and
  still open: real recordings, ideally in Mo's or Neda's native Dari voice**
  — now with an exact, ready-to-follow line-by-line list in
  `audio/RECORDING-MANIFEST.md`. This remains the single biggest gap before
  any real child uses this for real.

## 6.5 Amendment B — language courses from the mother tongue
Pre-existing (built 2026-07-06, before this lane): `content/lc-fa-en-first-words.json`
+ `bootstrap.html`/`bootstrap.js`/`bootstrap-core.js`. Re-verified working and
unaffected by this session's changes (14/14 `bootstrap.test.js` tests still
pass; manually exercised in-browser, zero console errors). Not extended this
session — out of Amendment A's scope.

## 6.5 Amendment C — Duolingo-grade visual bar
Originally out of scope (design/mascot work was deferred to a separate
PC/Firefly design pass). What existed before this session: the dawn-bird
mascot and progress path only in `bootstrap.js`'s private first-contact flow,
plus a modest set of placeholder SVG icons in `pictures.js` — plain, flat,
functional shapes so the interaction types have *something* to tap, not the
final illustrated design language. No mascot, no celebration, and no visible
progress path existed in the MAIN app (`index.html`/`app.js`, the shelf used
by all 10 Tier-1 packs) — that was the honestly-flagged gap.

- ✅ **NEW (2026-07-12, kid-visual-identity lane):** the MAIN app now has the
  same four pieces Duolingo-grade kid apps use, vanilla/no-deps, cheap-phone
  safe:
  - **Dawn-bird mascot** — factored into a new shared `mascot.js`
    (`SaharMascot.svg(size)`, the exact same bird bootstrap.js already drew
    privately, now reusable). Appears as a fluttering flourish on the welcome
    screen (`index.html` `.hero-bird`), on the pack-complete "Well done!"
    screen, and pops up with a short praise line when the child taps a
    correct answer. `bootstrap.js`/`bootstrap.html` were left untouched (they
    already had their own working mascot) — zero risk to that already-tested
    flow.
  - **Celebration** — `app.js`'s new `celebrate()`: a gentle CSS scale-pop on
    the card, a ~1s CSS confetti burst (12-22 pieces, no images/canvas), and
    the mascot praise bubble, fired on every correct tap and (bigger) on pack
    completion. The gentle success **sound** was already real
    (`AudioEngine.cheer()`, a 4-note WebAudio arpeggio in `audio.js`, no mp3)
    — wired in already, just newly paired with the visual. All new animation
    respects `prefers-reduced-motion` (styles.css).
  - **Bigger, warmer touch targets** — `--tap` raised 52px → 60px; the shared
    `.pic-choice` tap grid (`bootstrap.css`, used by both the main shelf and
    the first-contact flow) raised its minimum size 96px → 112px with a
    bigger border-radius; language buttons enlarged too.
  - **Visible progress path** — the main lesson screen's small dot "pips"
    were replaced with the same Duolingo-style bar + flying mascot bird used
    in `bootstrap.js` (`.dawn-progress`, reused directly from `bootstrap.css`
    — zero new CSS needed, RTL bird-flip included for free), now driven by
    `app.js`'s new `renderProgressPath()`.
  - RTL kept correct throughout (fa mirrors properly, mascot flips to face
    the reading direction); the honest machine-voice banner text/logic was
    not touched; no pack content or safety-gated strings were touched.
  - `sw.js` cache bumped `sahar-v10` → `sahar-v11`, `mascot.js` added to
    `APP_SHELL`.
  - Validator green: **132 passed, 0 failed** (28 core + 14 bootstrap + 90
    content — unchanged counts, confirming no content/logic regression),
    exit code 0, same Node runtime as every prior lane (`v20.18.0`, via the
    Adobe-bundled `node.exe`, `node` still not on this machine's PATH).
  - Verified in-browser (local static server): mascot visible on the welcome
    screen and on the done screen (screenshots); a scripted correct tap
    confirmed (via DOM inspection, not just visual) that `.confetti-burst`
    (12 pieces) and `.praise-bubble` (mascot + "🌟 Great!") both fire only on
    the correct answer, never on a wrong one; zero console errors across
    `index.html` (desktop + mobile viewport) and `bootstrap.html` (confirmed
    still working unaffected by the shared `bootstrap.css` touch-target
    bump).
  - ❌ **Still not phone-tested.** `docs/PHONE-TEST.md` (new this lane) is the
    exact, honest checklist for the one gate this session could not close
    itself: a real Android phone, installed as a PWA, in airplane mode. Not
    run yet — still open.
  - ❌ No per-card professional illustration pass, no Firefly/design-tool
    involvement, no Duolingo screenshot-by-screenshot comparison. The mascot
    and interaction icons remain hand-drawn inline SVG placeholders, now
    animated and reused consistently — a real visual-identity step, not the
    final illustrated design language.

## 6.5 Amendment D — honest deployment status
**Sahar is a prototype. It is not ready for real learners.** The bar the
contract sets for "deployable" — audio-first Tier 1 complete + offline
phone-tested + Duolingo-grade UI + a real pilot with 2-3 children with
observed learning — is **not met**. What changed this session: the
audio-first *structure* (schema, interaction types, migration, validator,
docs) is now real and tested. What is still missing before any pilot: real
recorded audio (Mo-gated), a real-device offline/PWA test, and the visual
design pass. No "ready to use" claim is made anywhere in this repo as a
result of this session's work.

## What this lane did NOT do (by design, per its brief)
No new lessons invented. No Tier 2-4 work started. No mascot/illustration
design pass. No README rewrite. No books-track work. No real audio recorded
or fabricated. No repo other than `E:/Mo Pers/Sahar` touched.

## 2026-07-11 — Tier-1 subject-coverage lane (2 new packs, structure only)
Scope: close the literacy/science half of the §3 DoD gap flagged above with
exactly 2 new Tier-1 packs, audio-first schema, structure only — audio stays
Mo-gated (no `.mp3` files added or claimed real). See the updated §3 entry
above for the full detail. Not done this lane, still open: the life-skills
pack (§3 DoD's 5th bucket), `fa-AF`/`fa-IR` split, real-device offline/PWA
test, Duolingo-grade illustration pass, Tiers 2-4, README/curriculum-map
refresh. No "ready to use" claim added anywhere.

## 6.5 Amendment E — Sahar gets a (draft) voice (2026-07-11, audio-generation lane)

**Audio-first is now REAL, not just structural — with an honestly flagged
machine-draft voice, not a real human voice.**

- ✅ **`tools/generate-draft-audio.py`** — new generator (edge-tts, Microsoft
  Edge neural TTS), idempotent (never overwrites an existing file — a real
  Mo/Neda recording simply wins by existing at the same path), one-command
  voice switching (`--voice fa=fa-IR-FaridNeural --force`) for when Mo decides
  between Dilara / Farid / his own voice (still **pending**; Dilara is today's
  draft default).
- ✅ **221 real `.mp3` files generated and committed**, 8.97 MB total (well
  under the cheap-phone-sane budget; fa+en+de together, no lazy-load split
  needed) — every one of the 67 Tier-1 cards across all 9 packs (fa+en+de),
  plus the 10 words in the language-course pack (`fa-AF` + `en`). Verified
  every file is nonzero on disk; `npm test` re-verified green **123 passed, 0
  failed** with a stricter honesty gate (below).
- ✅ **Schema honesty fix** — `audioPending:true` (nothing yet) now correctly
  flips to `audioDraft:true` + a real `audio.{fa,en,de}` ref once files exist;
  a card can never declare neither or both. `test/content-validator.test.js`
  and `test/bootstrap.test.js` now assert the declared `audio.fa` file
  **actually exists on disk and is nonzero** wherever `audioDraft`/`draft` is
  claimed — no lying states possible without failing the suite.
  Pack-level `audioStatus` flips `placeholder` → `draft` once every card in
  the pack is a draft, and `audioNote` (fa/en/de, all 10 content packs) now
  explicitly names the accent honestly: **the `fa` voice is Iranian-Persian,
  not Dari** — flagged, not hidden.
- ✅ **Playback wired end-to-end** — `audio.js`'s existing recording→TTS→tone
  fallback chain needed zero logic changes (it already tries `item.audio`
  first); only the in-app honesty banner text changed, in `app.js` and
  `bootstrap.js`, fa/en/de, gentle wording: *"this voice is a temporary
  machine voice for now… a real human voice (Sahar/Neda) is coming"* — never
  claims the draft is real, never sounds alarming to a caregiver reading it
  aloud.
- ✅ **Offline precache updated** — `sw.js` cache bumped `sahar-v7` → `sahar-v8`;
  install now also fetches `audio/audio-manifest.json` (written by the
  generator, kept in sync automatically) and precaches every listed audio
  file, wrapped so a failed/slow audio fetch never breaks the core app-shell
  install.
- ✅ **`audio/RECORDING-MANIFEST.md`** — the real ask, made concrete: every one
  of the 77 Dari lines (67 Tier-1 prompts + 10 language-course words) listed
  in order with its exact target filename, plus phone-recording instructions
  (quiet room, m4a→mp3 note, drop-in-place, drafts auto-yield). This is what
  actually closes the gap — the drafts are the bridge, this file is the ask.
- ✅ Verified in-browser: served locally, opened cards across multiple packs,
  confirmed the real `.mp3` reaches the `playing` state (not just TTS/tone),
  zero console errors, banner text correct fa/en/de, RTL layout intact.
- ❌ **Still not a real human voice.** No Mo/Neda recording has been made.
  `fa` is Iranian-Persian, not Dari — an honest compromise, not the real
  answer, and named as such everywhere the honesty contract requires it.
- ❌ **Still not real-device tested.** Airplane-mode / installed-PWA
  verification on an actual phone remains open (unchanged from Amendment A/D).
- ❌ **No child pilot.** Unchanged — still needed before any "ready" claim.
- **No "ready to use / deployable" claim is made anywhere as a result of this
  lane.** Sahar has a voice today; it is not yet the *right* voice, and it has
  not been tested the way a real learner would encounter it.

## 2026-07-11 — Tier-1 life-skills lane (§3 DoD's last missing bucket, closed)

Scope: build the one remaining Tier-1 pack subject-coverage §3 DoD required —
a `life` (health/safety/feelings) pack — full audio-first schema, real draft
audio generated (not left structure-only this time), registered everywhere,
verified in-browser. See the updated §3 entry above for the full pack
content/interaction breakdown.

- ✅ **Tier-1 DoD from §3 ("≥2 packs per core subject + 1 life-skills pack")
  is now fully MET.** Tier 1 has **10 packs**: literacy×2, numeracy×2,
  science×2, thinking×2, life×1 (new), demo×1.
- ✅ New pack `t1.life.healthy-and-safe` — hand-washing, clean water,
  toothbrushing, sleep-as-a-health-need, naming a happy feeling, an
  open-ended "how do you feel" card, and a trusted-adult safety card. Every
  string re-read once more specifically against "could this get a child in
  trouble at home" (the extra life-skills red-team check) — the trusted-adult
  card explicitly names parents/family as the example trusted grown-ups, so
  it reinforces the family rather than creating any tension with it.
- ✅ Real draft audio generated this lane (not deferred) — 24 new `.mp3`
  files via the existing `tools/generate-draft-audio.py`, same honest
  `audioDraft`/accent-mismatch contract as every other pack. No human
  recording — still Mo/Neda-gated, added to `audio/RECORDING-MANIFEST.md`.
- ✅ Validator green: **132 passed, 0 failed**, exit code 0 (28 core + 14
  bootstrap + 90 content, up from 123/81 before this lane).
- ✅ Verified in-browser end to end (see §3 for detail): all 10 tiles listed,
  full 8-card playthrough including the `match` and both `repeat-aloud`
  cards, zero console errors, real audio confirmed playing (not TTS/tone)
  via network log + in-app banner, RTL correct, `teacher.html` re-verified.
- ❌ **Still not claimed ready.** No human voice, no real-device offline
  test, no child pilot, no illustration design pass — unchanged from every
  prior lane. `fa-AF`/`fa-IR` split still not formalized. Tiers 2-4 still
  don't exist.
- **What this lane did NOT do:** no Tier 2-4 work, no mascot/illustration
  pass, no README rewrite, no books-track work, no real audio recorded, no
  repo other than `E:/Mo Pers/Sahar` touched.
