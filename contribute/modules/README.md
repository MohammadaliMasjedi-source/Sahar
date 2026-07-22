# Age-band module skeletons

*Five empty drafting templates — one per age band — for anyone who wants to propose new Sahar
content. Every slot in every file below is a structural placeholder, not a lesson. Read
[`../REVIEWER-GATE.md`](../REVIEWER-GATE.md) before opening any of them; it explains why every
content slot reads `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]` and what has to happen
before that placeholder can be replaced with anything real.*

## The five bands

| Folder | Age band | Status in the live app today |
|---|---|---|
| [`age-8-10/`](age-8-10/MODULE-SKELETON.md) | 8–10 | **Exists in the shipped charter** as band `8-10` / curriculum Tier 2 — 4 real packs live, see `content/packs.manifest.json` and `docs/CURRICULUM-MAP.md` Tier 2. |
| [`age-10-12/`](age-10-12/MODULE-SKELETON.md) | 10–12 | **Exists in the shipped charter** as band `10-12` / curriculum Tier 3 — defined shell with a curriculum-map preview, no packs authored yet. |
| [`age-12-14/`](age-12-14/MODULE-SKELETON.md) | 12–14 | **Exists in the shipped charter** as band `12-14` / curriculum Tier 4 — defined shell with a preview; `packs/teen-critical-thinking/` is a real (unreviewed, unshipped) draft aimed at the top of this band. |
| [`age-14-16/`](age-14-16/MODULE-SKELETON.md) | 14–16 | **New ground.** Not yet in `content/packs.manifest.json` or `docs/CURRICULUM-MAP.md`. This is the "Sahar for Teens" extension named in `packs/teen-critical-thinking/README.md`. |
| [`age-16-18/`](age-16-18/MODULE-SKELETON.md) | 16–18 | **New ground**, same as above — oldest band, not yet charted anywhere in this repo. |

**Important — this is a drafting scaffold, not a live wiring.** Nothing under `contribute/modules/`
is read by `app.js`, listed in `content/packs.manifest.json`, or precached by `sw.js`. Filling in a
skeleton does not make it appear in the app. It becomes real content only after the path in
[`../REVIEW-PATH.md`](../REVIEW-PATH.md) — draft, gate, sign-off, then a maintainer wires it into
the manifest by hand. This mirrors the existing precedent of `packs/teen-critical-thinking/` and
`docs/drafts/*.json`, both real drafts that correctly sit outside the shipped shelf today.

**Why 8-10 through 16-18, and not the app's own `6-8` band?** This scaffold answers the exact
five bands named in the ask that created it. The youngest band (6-8, curriculum Tier 1) already
has ten shipped, gate-passed packs and its own mature process — see `docs/CONTENT-MODEL.md` and
`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`. It didn't need a fresh empty skeleton. The two
oldest bands (14-16, 16-18) are genuinely new — reconciling them into `docs/CURRICULUM-MAP.md` and
the app's band list is an open task for a maintainer, not something decided here.

## Why these particular objective headers

Each skeleton uses the same eight learning-objective categories, so a contributor can compare
across bands and see how a subject grows up. The categories and their UN/UNICEF anchors (paraphrased,
not quoted — see sources below) are:

1. **Literacy & language** — anchored in UN SDG Target 4.6 (literacy and numeracy) and 4.1 (free,
   equitable primary and secondary education).
2. **Numeracy & mathematics** — SDG Target 4.6.
3. **Science & the scientific method** — the SDG 4.1 breadth of basic education, general science
   literacy.
4. **Critical thinking & media/information literacy** — SDG Target 4.7 (knowledge and skills
   needed to promote sustainable development, incl. global citizenship).
5. **Digital literacy & online safety** — SDG Target 4.4 (relevant skills, including digital, for
   employment and life) read alongside 4.7.
6. **Civics, rights & citizenship** — SDG Target 4.7 (global citizenship) and 4.a (safe, inclusive
   learning environments); the right to education itself (SDG 4's own premise).
7. **Health, well-being & life skills** — UNICEF's holistic framing of adolescent health and
   life-skills development; cross-references SDG 3 (health) where the two overlap. **This category
   carries the strictest gate of all eight — see the HARD RULE in every skeleton file.**
8. **Arts, culture, world languages & expression** — SDG Target 4.7's appreciation of cultural
   diversity, and Sahar's own founding promise (README.md) of "a window into world languages."

Per-band emphasis notes inside each skeleton (which SDG target or UNICEF developmental stage is
the primary anchor for that specific age) are **positioning metadata for authors, not curriculum
content** — they say which UN framework the band sits under, never what to teach a child.

**Sources** (consistent with this repo's existing sourcing discipline in `SDG-MAPPING.md` —
paraphrased in plain language, not quoted verbatim, links provided so anyone can check):
[UN SDG 4 official target list](https://sdgs.un.org/goals/goal4) (sdgs.un.org, UN DESA) ·
[UNICEF on adolescence](https://www.unicef.org/adolescence) (early adolescence ~10–14, late
adolescence ~15–19) · [UNICEF on education](https://www.unicef.org/education). Verified reachable
2026-07-22; re-check before relying on these for anything formal like a DPG or grant submission,
per this project's own "verify by fetching" discipline (see the licence-table correction in
`packs/teen-critical-thinking/RED-TEAM.md` for why that discipline matters).

## How to use a skeleton

1. Read [`../CONTRIBUTING.md`](../CONTRIBUTING.md) and [`../REVIEWER-GATE.md`](../REVIEWER-GATE.md)
   first — every skeleton assumes you already know the gate exists.
2. Pick the age band you want to write for.
3. Copy its `MODULE-SKELETON.md` structure into your own working pack file (following the schema
   in `docs/CONTENT-MODEL.md` — the skeleton tells you *what objectives to cover*, the content
   model tells you *what JSON shape to write it in*).
4. Fill in real content, in the open, as a DRAFT — replacing each
   `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]` marker is exactly the job. It's normal
   and expected for a human contributor to fill these in; the marker is there to stop the marker
   surviving unnoticed into something a child sees, not to stop anyone from writing.
5. Open a PR. It will merge as DRAFT (outside the manifest) until the gate clears — see
   [`../REVIEW-PATH.md`](../REVIEW-PATH.md).
6. Recruit or wait for the three reviewers. See the "Who these people are" section of
   `../REVIEWER-GATE.md`.
