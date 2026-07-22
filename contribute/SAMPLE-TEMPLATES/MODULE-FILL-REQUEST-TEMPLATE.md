# Sample module-skeleton fill-request template

> **STATUS: `needs-reviewers` — STRUCTURE ONLY, NO CONTENT FILLED IN.**
> This is a template showing *how* to propose filling part of an age-band module skeleton
> (`../modules/`). It contains no lesson content and must never be used as a shortcut around
> `../REVIEWER-GATE.md`. Copy the shape below into your own PR/issue when you're ready to propose
> real draft content for one objective slot.

*Use this when you want to draft content for one learning-objective slot inside a
`contribute/modules/age-X-Y/MODULE-SKELETON.md` file. It formalizes exactly what
`modules/README.md` step 4 already asks for — copying the skeleton's structure into your own
working pack file — so nothing gets missed.*

---

## Module fill-request

**Age band:** `[e.g. 10-12]` (must match a folder under `../modules/`)

**Learning-objective category:** `[1–8, matching the skeleton's numbered headers, e.g. "3. Science
& the scientific method"]`

**Working pack file location:** `[your own new file path under content/ or a personal branch — NOT
inside the skeleton file itself, per modules/README.md's standing rule]`

**Content schema followed:** `[cite the exact section of docs/CONTENT-MODEL.md this pack follows,
e.g. "§1-§2, Tier-1/2 audio-first card schema" or "teen-critical-thinking.pack.json's reader-format
shape"]`

## Reviewer-gate status — `needs-reviewers`

This fill-request is **not cleared to ship**. Per `../REVIEWER-GATE.md`, it needs all three,
recorded by name and date, before any maintainer may wire it into `content/packs.manifest.json` or
`sw.js`:

- [ ] **Native-fa (or relevant-language) editor:** `[not yet assigned]`
- [ ] **Child-safety / safeguarding adviser:** `[not yet assigned]`
- [ ] **Secular / regional-context reviewer:** `[not yet assigned]`

**Verdict:** `[leave as "PENDING" until all three boxes above are checked with real names/dates]`

## Does this touch category 7 (Health, well-being & life skills)?

`[Yes / No]` — if yes, stop and re-read the HARD RULE in your band's `MODULE-SKELETON.md` before
going any further: this category is authored by a human subject-matter expert only, from the first
word, no AI assistance at any stage, and still needs the full gate above.

## Definition of Done checklist (from `../DOD-BY-TASK-TYPE.md` §3)

- [ ] Follows the correct schema for the pack shape (not an invented fourth shape).
- [ ] Complete in `fa`/`en`/`de` at minimum.
- [ ] Every source licensed compatibly and recorded (`../PROTOCOLS-AND-STANDARDS.md` §5).
- [ ] No text lifted verbatim from a non-open source.
- [ ] Passes the relevant automated validator (`npm test` or the pack's own `validate.js`).
- [ ] Sits in DRAFT status, outside the manifest, clearly labeled, until the gate above clears.
- [ ] No invented statistic or fact — every number hand-checked.
- [ ] Meets `../PROTOCOLS-AND-STANDARDS.md` §2, §3, §4, §5 in full.
- [ ] Sized within `../DEVICE-SUPPORT-MATRIX.md` Tier A's storage/performance floor.

## What happens next

See `../REVIEW-PATH.md` — this fill-request, once opened as a real PR, merges as DRAFT and stays
outside the live app until all three reviewer boxes above are checked with real names and dates.
