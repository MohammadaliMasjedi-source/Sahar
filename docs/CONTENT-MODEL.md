# Sahar — Content Model (audio-first standard)

> Formalizes the content schema per `SAHAR-COVERAGE.md` §2, as amended by §6.5 A
> (the audio-first bootstrap rule) and §6.5 B (language-course packs). This is
> the standard going forward for every new pack — Tier 1 and beyond.

## 0. The rule this schema exists to satisfy

**A pre-literate child can never be required to read a prompt to progress.**
Every pack's cards must be completable by *listening* and *tapping* alone. Any
text on a card is decorative or caregiver-facing — never the required input
channel. See `SAHAR-COVERAGE.md` §6.5 A for the full rationale ("you cannot
teach reading through reading").

Two pack shapes currently exist in `content/`, covering two different
pedagogical jobs:

1. **Tier-1 card packs** (`t1-*.json`, `tier1-demo.json`) — the Leitner-box
   review packs driven by `app.js`. Documented in full below.
2. **Language-course packs** (`lc-*.json`) — teaching a second language
   *through* the mother tongue (§6.5 B), driven by `bootstrap.js`. Documented
   in §5 below; already implemented for `lc-fa-en-first-words.json`.

Both share the same audio-first spirit and the same picture library
(`pictures.js`) and audio engine (`audio.js`), but their JSON shapes differ
because the pedagogy differs (spaced-repetition review vs. first-contact
vocabulary). Do not force one shape into the other.

## 1. Tier-1 card pack — top-level fields

```
content/<pack>.json
  packId        "t1.<subject>.<slug>"        machine id, dot-namespaced
  version       "2.0.0"                      bump on any card-shape change
  tier          1                            1|2|3|4 (see SAHAR-COVERAGE §3)
  ageBand       "6-7"
  subject       starts with one of: literacy · numeracy · science · thinking ·
                life · world · arts (SAHAR-COVERAGE §4)
  lang          ["fa","en","de"]              UI/caregiver display languages
  license / attribution / signature           provenance (signature stays
                                               null until verification exists)
  audioStatus   "placeholder" | "draft"       honest: "placeholder" = no audio
                                               anywhere yet, "draft" = every
                                               card has a machine-voice file
                                               (not a real recording — see §4)
  audioNote     {fa,en,de}                    per-language honesty note (see §3);
                                               once "draft", must name the fa
                                               accent mismatch (Iranian, not Dari)
  title         {fa,en,de}
  intro         {fa,en,de}                    caregiver-facing framing, not
                                               shown to the child as "read this"
  cards[]       see §2
```

`fa` today is Dari-flavored Persian (Afghan girls first). When Iran-Persian
needs to diverge, split into `fa-AF` + `fa-IR` with fallback `fa-IR → fa-AF →
fa`, per SAHAR-COVERAGE §2 — not yet needed, not yet done.

## 2. Tier-1 card shape

```
{
  "id": "fl-fa-1",
  "type": "letter-sound",              // free-form category, only used for the
                                        // small "kind" chip label (KIND_KEY in app.js)
  "box": 1,                            // Leitner box, mutated at runtime, not content
  "interaction": "tap-the-letter-shape",  // REQUIRED — see §3, never "read-only"
  "audioPending": true,                 // REQUIRED unless `audio` is set — see §4
  "prompt":    { "fa": "...", "en": "...", "de": "..." },  // SPOKEN content, not shown
  "answer":    { "fa": "...", "en": "...", "de": "..." },  // narration reference, not shown
  "caregiver": { "fa": "...", "en": "...", "de": "..." },  // REQUIRED — read-aloud line
  // interaction-specific fields — see §3
  "choices": [ { "id": "aa", "glyph": "آ" }, ... ],
  "answerId": "aa"
}
```

`prompt` and `answer` are **not rendered as on-screen text** by `app.js` for
audio-first cards. They exist to be (a) the text handed to `AudioEngine.voice()`
for spoken narration, and (b) reference material a translator/reviewer reads
when editing content. The child-facing screen shows only: the "kind" chip,
optional hero picture, a Listen button, the tap choices, and — behind a
"For grown-ups" toggle — the `caregiver` line. This is deliberate: showing the
long prompt text on screen would *look* like a reading task even if not
technically required, which fails the spirit of §6.5 A.

## 3. Interaction types (the ones that never require reading)

| `interaction`         | Shape                                                    | When to use |
|---|---|---|
| `tap-the-picture`     | `choices: [{id, pic}]`, `answerId`                       | concrete nouns / binary or few-way picture choices (cat vs stone, yes vs no icon, circle vs square) |
| `tap-the-letter-shape`| `choices: [{id, glyph}]`, `answerId`                     | letters, digits, numerals — the glyph itself is the destination, not an instruction to read (SAHAR-COVERAGE §6.5 A: "text is the destination, not the medium") |
| `match`               | `rounds: [{heroPic?, choices, answerId}, ...]`           | pairing 2+ things to their category/home (bird→sky, fish→water) as a short sequence of tap-the-picture sub-rounds |
| `repeat-aloud`        | no choices — a "Listen" + a single self-affirm button    | open-ended / generative / personalized tasks that cannot be reduced to a fair forced choice (make your own question, say your name's first sound) — ungraded, always advances on tap |

A `choices` entry may carry an optional `"size": "small"|"big"` hint (CSS-only,
for shape-comparison cards). Every `pic` key must resolve in `pictures.js`
(enforced by the validator, §6 below).

**Never** add an interaction type outside this list for pre-literacy content —
that reopens the "read this" hole the whole amendment exists to close.

## 4. Audio field — the honest tri-state contract

Every card must declare its audio status via exactly one of:
- `"audioPending": true` — no audio exists yet at all; `AudioEngine.voice()`
  will fall through to TTS (where the browser can genuinely speak the
  language) or a placeholder tone (see `audio.js` for the fallback chain, and
  the honest policy that **fa/Dari browser TTS is never used** — browsers
  have no reliable Dari voice, and a wrong-accent robot teaches the wrong
  sound).
- `"audioDraft": true` + `"audio": { "fa": "audio/<packId>.<cardId>.fa.mp3", "en": "...", "de": "..." }`
  — a **machine-voice draft file genuinely exists on disk** at every declared
  path (written by `tools/generate-draft-audio.py`, edge-tts). This is real
  audio that really plays, but it is **not a human recording** — for `fa` it
  is an Iranian-Persian accent, not Dari. Never conflate this with a real
  recording; the pack-level `audioNote` must say so explicitly (see §6.5 /
  `audio/RECORDING-MANIFEST.md`).
- A future real recording needs **no schema change** — it drops into the
  exact same `audio.<lang>` path and wins automatically (`audio.js` always
  tries the file first; it cannot tell a draft from a real recording, so the
  honesty banner text is what must stay accurate, not the schema).

A card must never declare neither state, and never both `audioPending` and
`audioDraft` at once — `test/content-validator.test.js` enforces this and
additionally verifies that every `audioDraft:true` card's `audio.fa` file
**actually exists on disk and is nonzero bytes** (no lying about audio state).

Real *human* recordings are a **Mo-gated ask** (ideally Mo's or Neda's native
voice — see `audio/RECORDING-MANIFEST.md`), not something to fabricate. The
machine-voice draft is the honest bridge until then.

## 5. Language-course pack shape (`lc-*.json`, §6.5 B)

Different pedagogy: teaching a *target* language (`l2`) *through* the mother
tongue (`l1`), not reviewing pre-learned facts. Top-level adds `packType:
"language-course"`, `l1`/`l2` language codes; each `items[]` entry is:

```
{
  "id": "w-water", "pic": "water",
  "l1": { "text": "آب", "translit": "aab", "audio": "audio/fa-AF/water.mp3" },
  "l2": { "text": "water", "translit": "waa-ter", "audio": "audio/en/water.mp3" },
  "caregiver": { "fa": "...", "en": "...", "de": "..." }
}
```

The `{fa,en,de}` display-language dicts at the pack level are for UI chrome
ONLY (menus, buttons) — a different thing from `l1`/`l2`, per SAHAR-COVERAGE
§6.5 B's explicit separation. Driven by `bootstrap-core.js` (round-building,
scoring) + `bootstrap.js` (view). See `test/bootstrap.test.js` for its
validator.

## 6. The validator (CI-runnable, no pack ships if it fails)

`test/content-validator.test.js` checks every Tier-1 card pack for:
JSON validity; unique card ids; fa/en/de completeness on title, intro,
prompt, answer, and caregiver; an honest `audioStatus`/`audioNote`; every
card's `interaction` being one of the four non-read-dependent types; every
card declaring `audioPending:true` XOR `audioDraft:true` (never neither, never
both) with the latter requiring its `audio.fa` file to actually exist on disk
and be nonzero bytes (§4 — no lying about audio state); and every
choice-bearing card having a resolvable, non-empty, unique choice set whose
`answerId` is actually offered, with every `pic` resolving in `pictures.js`.

`tools/generate-draft-audio.py` is the generator that produces the
`audioDraft` state (edge-tts machine voices, child-directed rate) and keeps
`audio/audio-manifest.json` in sync for `sw.js`'s offline precache. See its
own `--help` and `audio/RECORDING-MANIFEST.md` for how a real recording
replaces a draft file in place.

`test/bootstrap.test.js` covers the language-course pack shape and the
picture-first round engine equivalently.

Run: `npm test` (or `npm run test:content` for just this pack). **No pack
merges if `npm test` doesn't exit 0.**
