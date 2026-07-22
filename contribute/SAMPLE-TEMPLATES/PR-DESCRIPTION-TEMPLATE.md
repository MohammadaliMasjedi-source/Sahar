# Sample PR description template

*Copy everything below the line into your pull request description. Delete any section that
genuinely doesn't apply (say so, don't just omit it silently) and fill in every bracket. This
example is filled with placeholder/structural text only — swap every `[bracket]` for your real
content, never a real lesson/content string.*

---

## What changed

[One or two sentences: what does this PR actually do? e.g. "Fixes a layout bug where the RTL
progress bar didn't mirror correctly on the welcome screen" or "Adds a new inline-SVG icon for
'lantern' to pictures.js".]

## Why

[One or two sentences: what problem does this solve, or what does it enable? Link an issue if one
exists.]

## Task type

[Pick one, matching `../DOD-BY-TASK-TYPE.md`:]
- [ ] 1. Code
- [ ] 2. Translation
- [ ] 3. Content-pack authoring
- [ ] 4a. Art & icons
- [ ] 4b. Audio
- [ ] 5. Documentation & tooling
- [ ] 6. Funding / outreach
- [ ] 7. Accessibility
- [ ] 8. Testing & QA

## Definition of Done — checked against `../DOD-BY-TASK-TYPE.md` §[N]

[Paste the relevant checklist from that section here, with real boxes checked as they become true.
Do not check a box that isn't actually true yet.]

## Standards checked — `../PROTOCOLS-AND-STANDARDS.md`

[List which of the seven standards apply to this change and confirm each, or state "not
applicable, because ___":]
- [ ] §1 Offline-first
- [ ] §2 i18n + RTL
- [ ] §3 Accessibility (WCAG AA)
- [ ] §4 Child-safety-by-design
- [ ] §5 Licensing & attribution
- [ ] §6 Data-minimization / privacy
- [ ] §7 Performance budgets

## Device tiers affected — `../DEVICE-SUPPORT-MATRIX.md`

[Which tier(s) does this change need to keep working on? e.g. "Tier A (low-end Android) — verified
in Chrome DevTools mobile emulation; not yet on a real device" or "N/A, docs-only change".]

## Tests run

[Exact command(s) and result, e.g. `npm test` → all four suites, exit 0. If you ran
`docs/PHONE-TEST.md`, say which checkboxes and on what device.]

## Does this touch anything a child could read/hear/see?

[Yes / No. If yes: this PR merges as DRAFT per `../REVIEW-PATH.md` until the full 3-reviewer gate
(`../REVIEWER-GATE.md`) is recorded — say so explicitly here so a maintainer doesn't have to guess.]

## Screenshots (if UI-affecting)

[Attach before/after, and — for anything RTL-affecting — a screenshot with `fa` active, not just
the LTR default.]
