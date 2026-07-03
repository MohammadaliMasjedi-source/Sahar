# Task guides — how to do each phase yourself

One guide per roadmap phase (see `docs/ARCHITECTURE.md`, "Phased delivery"). Written so a careful
beginner can follow them without help. Phases 1–2 are done; these guides cover keeping them healthy
and building what comes next.

---

## Task A — Author and ship a new Tier-1 pack (ongoing, phase 2→4)

**Goal:** grow the Tier-1 shelf toward the full curriculum row in `docs/CURRICULUM-MAP.md`.

**Before you start:** read [`04-MAINTENANCE-GUIDE.md`](04-MAINTENANCE-GUIDE.md) → "Add a lesson
pack", and the content rules in [`03-NAMING-AND-STANDARDS.md`](03-NAMING-AND-STANDARDS.md).

**Steps:**
1. Pick the next cell from the Tier-1 row of `docs/CURRICULUM-MAP.md` (e.g. *Health & body*).
2. Draft 7–9 cards on paper first: each card = one small idea, phrased as a question a 7-year-old
   can act on ("count it", "look around you", "say it out loud").
3. Create the JSON (copy a sibling pack), fill all three languages. Write fa (Dari) first — it is
   the first-class language — then en, then de.
4. Register in `PACKS` (`app.js`) and `APP_SHELL` (`sw.js`); add a `KIND_KEY` + `STRINGS` label if
   the card `type` is new; bump `CACHE`.
5. Test: `npm test`, then serve and click through the pack in all three languages.

**How to test it:** `npm test` green; in the browser the tile appears on the shelf, all cards render
in fa/en/de, RTL looks right.

**How to debug it:** JSON parse error → `python -m json.tool content/<file>`; tile missing → check
`PACKS` path; label shows `factOpinion` fallback → the card `type` is missing from `KIND_KEY`.

**How to extend later:** when audio arrives (phase 4), each card gains an `audio` field — the pack
format already reserves it.

---

## Task B — Phase 3: lock the pack schema + signing design

**Goal:** freeze the pack format and specify Ed25519 signing so tampered packs can't reach a child.

**Before you start:** read `docs/ARCHITECTURE.md` §4 and `docs/OSS-REUSE.md` §7 (TweetNaCl.js).

**Steps:**
1. Write a JSON-schema file (`docs/pack.schema.json`) describing the current pack shape exactly.
2. Add a test in `test/` that validates every file in `content/` against it.
3. Specify signing in a short doc: who holds the private key, what exactly is signed (canonical
   JSON without the `signature` field), and the verify-then-load rule in `ContentProvider.getPack()`.
4. Only then implement: vendor TweetNaCl.js, embed the public key, refuse unverified packs
   (behind a flag until all packs are signed).

**How to test it:** a pack with one flipped byte must be rejected; all shipped packs must verify.

**How to debug it:** canonicalization is the classic trap — byte-identical JSON serialization on
signer and verifier, or nothing verifies.

**How to extend later:** key rotation = ship a new public key list, accept both during a grace
window.

---

## Task C — Phase 4: audio-first lessons

**Goal:** a pre-reader can *hear* every prompt (critical for the first weeks of literacy).

**Before you start:** know the constraint — offline, small files, no external calls.

**Steps:**
1. Record or synthesize per-card audio (fa first), save as small `.opus`/`.m4a` under
   `content/audio/<packId>/<cardId>.<ext>`.
2. Fill the reserved `audio` field per card with the relative path.
3. In `renderStage()`, when `card.audio` exists show a large 🔊 button that plays it
   (`new Audio(path)` — same-origin, so the SW caches it).
4. Add the audio files of shipped packs to `APP_SHELL`, bump `CACHE`, and watch the install size —
   per-tier download matters more once audio lands.

**How to test it:** airplane mode after first visit → audio still plays.

**How to debug it:** autoplay policies require a user gesture — always play from the button tap,
never automatically.

---

## Task D — Keep the docs honest (every phase, always)

**Goal:** the repo never claims more than it does. This is the house rule the whole project stands
on (*REAL 90 > FAKE 100*).

**Steps:** after any change — update the "Real vs. mocked" list in `docs/ARCHITECTURE.md` §9, the
honest-status notes in `README.md` and `docs/CURRICULUM-MAP.md`, and the Changelog in
`learning/PROJECT-EXPLAINED.md`. If a number appears in a doc (packs, tests), verify it by counting
before writing it.
