# Sample accessibility-check template

*Copy this into an issue (to report a finding) or a PR description (to record the check that
accompanies a fix). Structure only — record real tool names/versions and real pass/fail results;
never leave a box checked that wasn't actually verified.*

---

## Accessibility check

**Surface audited:** `[e.g. "the welcome screen and language switcher" or "the card-reveal
interaction in a Tier-1 lesson pack" — pick a focused surface, not "the whole app"]`

**Device/tier tested:** `[see ../DEVICE-SUPPORT-MATRIX.md Tier E — e.g. "Android TalkBack on a
Tier-A phone (model: ___, Android version: ___)" or "NVDA on desktop, version ___"]`

**Date:** `[YYYY-MM-DD]`

## Checklist — from `../PROTOCOLS-AND-STANDARDS.md` §3

- [ ] Touch targets ≥ 44×44 CSS px.
- [ ] Color contrast meets WCAG 2.1 AA (≥ 4.5:1 normal text, ≥ 3:1 large text/meaningful UI
      elements) — `[tool used to measure, e.g. "browser DevTools contrast checker"]`.
- [ ] Color is never the sole signal for correct/incorrect/selected state.
- [ ] Every interactive element has a real accessible name (not just a `title` attribute).
- [ ] Semantic landmarks and heading structure used correctly.
- [ ] `aria-live` fires correctly for dynamic content (card reveal, feedback).
- [ ] `prefers-reduced-motion` respected.
- [ ] `lang`/`dir` update correctly on language switch.
- [ ] Full keyboard-only navigation reaches and operates every interactive element on this surface.
- [ ] Screen-reader pass: every element announced makes sense out of visual context (no "button,
      button, unlabeled").

## RTL cross-check (if the surface renders in `fa`)

- [ ] Checked with `dir="rtl"` active, not only the LTR default.
- [ ] Focus order/reading order is correct for RTL (not just mirrored visually).

## Result

**Overall:** `[PASS / PASS WITH ISSUES / FAIL — be honest, matching this project's standing
disclosure style]`

**Issues found (if any):** `[list each: what, where, how to reproduce, which
../DEVICE-SUPPORT-MATRIX.md tier it affects]`

**Recorded into `SAHAR-COVERAGE-STATUS.md`?** `[Yes, dated entry added / Not yet — link the
follow-up]`

## Does fixing this touch any learner-facing text or symbolic content?

`[Yes / No]` — if yes, the fix (not this check itself) routes through `../REVIEWER-GATE.md` before
it can ship, per `../DOD-BY-TASK-TYPE.md` §7.
