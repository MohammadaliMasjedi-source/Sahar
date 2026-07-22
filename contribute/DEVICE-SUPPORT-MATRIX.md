# Device & platform support matrix

*Sahar's first user has a cheap secondhand Android phone, unreliable or no internet, and may be
sharing that phone with siblings. Every design and contribution decision is checked against that
reality, not against a developer's laptop. This file makes that reality checkable: five tiers, what
"supported" means in each, how it's tested, and what's honestly still a gap. Structure only — no
child-facing content lives here. Cross-links to [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md)
(the standards a contribution must meet) and [`REVIEWER-GATE.md`](REVIEWER-GATE.md) (the human
sign-off any learner-facing change still needs).*

## Why a matrix, not one target device

`PLATFORM-INDEPENDENCE.md` already commits Sahar to "no lock-in, runs in any modern
standards-compliant browser." That's a direction, not a test plan. This matrix turns it into five
concrete tiers a contributor can check a change against, so "works on my phone" becomes "works on
the tier I claimed."

## The five tiers

| Tier | Who | Example hardware | Status today |
|---|---|---|---|
| **A — Low-end Android (baseline, guaranteed)** | The primary target user | 2–4 GB RAM, 16–32 GB storage, Android 8–11, secondhand, Chrome or the stock AOSP WebView | **The tier everything is built for.** See `PHONE-TEST.md` — this is the exact device class that document's checklist targets. |
| **B — Feature phones / ultra-low-end (KaiOS-class)** | Out of scope for the full app, named honestly rather than silently dropped | KaiOS, Nokia-style feature phones, no modern JS engine, no PWA install path | **Not supported today.** No workaround exists for a device that can't run a service worker or modern JS — see "What Tier B honestly means" below. |
| **C — Offline / no-internet (a state, not a device)** | Every tier above, at the moment that matters most | Airplane mode, no Wi-Fi ever available | **Core architectural guarantee**, not a bonus — `PRIVACY.md`, `ARCHITECTURE.md` §0/§8: the service worker makes zero external network calls after first load. |
| **D — Shared / multi-child devices** | Siblings sharing one phone, a household device, a classroom tablet | Any Tier A device used by 2+ children | **Supported by design** — `profiles.js` namespaces progress per profile; see `PRIVACY.md`'s "Multi-child devices" section. |
| **E — Screen-reader / accessibility devices** | A learner or caregiver using assistive tech (TalkBack, VoiceOver, a screen reader on desktop) | Android TalkBack, iOS VoiceOver, NVDA/JAWS on a shared desktop | **Partially supported, gap named honestly** — see "Tier E: what's real vs. designed" below and `PROTOCOLS-AND-STANDARDS.md`'s accessibility standard. |

---

## Tier A — Low-end Android (the baseline)

**What "supported" means:** a child on a cheap, secondhand Android phone, offline, can install
Sahar to the home screen and play a full lesson pack start to finish, with no crash, no silent
audio failure, no broken layout.

**Concrete floor (do not regress below this without a maintainer conversation):**
- [ ] RAM: assume 2 GB total, shared with the OS and other apps — no assumption that Sahar is the
      only thing running.
- [ ] Storage: current full install (app shell + 245 draft audio clips) is **~13 MB total, ~11 MB of
      which is audio** — see `du -sh` figures recorded here so this number stays checkable, not
      guessed. A new contribution that meaningfully grows this (a large new pack, uncompressed
      audio, an added dependency) should say so in the PR per the performance-budget standard in
      `PROTOCOLS-AND-STANDARDS.md`.
- [ ] Browser: Chrome for Android or the stock WebView, Android 8+ (matches the versions realistic
      for a secondhand phone in 2026). No feature that only works in a bleeding-edge Chrome version
      may be load-bearing for the core lesson flow.
- [ ] No build step, no bundler-only syntax that an older mobile Chromium can't parse — the
      prototype's "plain HTML/CSS/JS, no framework" choice (`ARCHITECTURE.md` §1) is deliberate and
      load-bearing for this tier; don't introduce a dependency that breaks it without discussing it
      first.
- [ ] Touch targets ≥ 44×44 CSS px (already a stated a11y requirement, `ARCHITECTURE.md` §7) —
      re-confirmed here because it's also a low-end-device usability requirement: a cracked or
      cheap digitizer is less precise.

**How it's tested:** [`docs/PHONE-TEST.md`](../docs/PHONE-TEST.md) is the canonical, step-by-step
Tier-A test procedure — install from a real network once, then airplane mode, then play a full pack
card-by-card. Any code change that could plausibly affect the offline path, install flow, or
lesson-play flow should be checked against that document before merge; results get recorded into
`SAHAR-COVERAGE-STATUS.md`, honestly (pass/fail per checkbox, device + browser version), per that
document's own closing instruction.

**Honest gap:** `PHONE-TEST.md` itself states this has not yet been run end-to-end on a real device
as of this writing. That is the single most valuable non-code contribution a Tier-A device owner can
make — see `REVIEW-PATH.md`/`DOD-BY-TASK-TYPE.md` §8 (Testing) below.

---

## Tier B — Feature phones / ultra-low-end (KaiOS-class)

**What Tier B honestly means:** a KaiOS or similar feature phone cannot run a service worker or a
modern PWA install flow. There is no partial-credit workaround that makes the current app "sort of"
work there. Rather than silently never mentioning this, it's named here as an **explicit non-goal
for the current architecture**, so a contributor doesn't spend effort chasing a device class the
app structurally cannot support without a from-scratch alternate delivery mechanism (e.g., a
USSD/SMS-based companion, out of scope for this repo today).

**If you want to work on this:** open an issue describing the approach before writing code — this
is a scope decision for a maintainer, not something a single PR should decide unilaterally, because
it would likely mean a second, parallel delivery surface rather than a change to the existing app.

**Definition of Done for a Tier-B proposal (design only, not implementation):**
- [ ] States plainly what technical floor it targets (e.g., basic KaiOS browser, SMS gateway) and
      what it can and cannot deliver of the existing curriculum.
- [ ] Does not compromise Tier A/C/D's offline-first, zero-tracking guarantees to accommodate Tier B.
- [ ] Reviewed by a maintainer as a scope decision before any implementation PR is opened.

---

## Tier C — Offline / no-internet

**What "supported" means:** after the very first load (the one time a device needs network, to
fetch the app once — `PHONE-TEST.md` step 1), the app makes **zero** external network calls, ever,
for any feature. This is not a performance nicety; it's the safety model (`PRIVACY.md`, `ARCHITECTURE.md`
§8: "privacy is the safety model" — a device that never talks to a server is a device with nothing
to intercept, log, or subpoena).

**Concrete floor:**
- [ ] No `fetch`/`XHR`/`WebSocket`/beacon call added anywhere that isn't the app loading its own
      bundled files — this exact rule is already enforced in `DOD-BY-TASK-TYPE.md` §1 (Code) and
      restated here because it is simultaneously a device-support requirement, not only a privacy
      one: a device with no signal must still fully work.
- [ ] Any new asset (image, audio, font, data file) is vendored into the repo and precached by
      `sw.js` — never loaded from a CDN or third-party host (`OSS-REUSE.md`'s vendoring principle).
- [ ] `sw.js`'s `CACHE` version is bumped and the new asset is added to its precache list — an asset
      that exists in the repo but isn't in `sw.js`'s manifest **will silently fail offline**, which
      is exactly the failure mode Tier-A testing exists to catch.

**How it's tested:** the airplane-mode portion of `PHONE-TEST.md`, plus (for a quick desktop check)
DevTools → Application → Service Workers → "Offline" checkbox, then a hard reload.

---

## Tier D — Shared / multi-child devices

**What "supported" means:** two or more children can use the same physical phone, each with their
own name/avatar/progress, and neither can see or overwrite the other's spaced-repetition history.

**Concrete floor:**
- [ ] Any new persisted state (a new `localStorage` key, a new piece of per-child data) is
      namespaced per-profile via `profiles.js`'s existing pattern (see `PRIVACY.md`'s data-key table)
      — a global, unkeyed piece of state that leaks across profiles is a regression on this tier
      even if it "works" for a single-child tester.
- [ ] Profile switching does not require re-installing, re-downloading, or any network call.
- [ ] No profile's name, avatar, or progress is exposed to another profile's UI surface without an
      explicit profile switch.

**How it's tested:** `test/profiles.test.js` (automated), plus a manual check — create two profiles,
progress one partway through a pack, switch profiles, confirm the second profile starts clean and
the first profile's progress is untouched on switch-back.

---

## Tier E — Screen-reader / accessibility devices

**What's real vs. designed (stated honestly, per this project's own house style):**
- **Real today:** semantic HTML landmarks, real button text labels (not icon-only with no label),
  `lang`/`dir` updates on language switch so assistive tech reads the correct language and
  direction, reduced-motion respect, high-contrast palette — see `ARCHITECTURE.md` §7.
- **Designed, not fully verified today:** `aria-live` regions on card reveal are implemented but
  have not been run through a real screen reader end-to-end the way `PHONE-TEST.md` runs a real
  phone end-to-end. This is an honest gap, not a claim of completeness — closing it is a concrete,
  high-value Testing contribution (see `DOD-BY-TASK-TYPE.md` §8).

**Concrete floor for any new UI contribution:**
- [ ] Every interactive element has a real accessible name (visible text, or `aria-label` if the
      visible content is icon-only) — not just a `title` attribute.
- [ ] Color is never the only signal (a correct/incorrect state also has shape, icon, or text —
      already true for the mascot praise-bubble pattern; keep it true for new interaction types).
- [ ] New animation respects `prefers-reduced-motion`.
- [ ] Meets WCAG 2.1 **AA** contrast ratios — see `PROTOCOLS-AND-STANDARDS.md`'s accessibility
      standard for the exact checkable ratios and how to verify them.
- [ ] RTL correctness: any new layout is checked with `dir="rtl"` (Dari) active, not just LTR — use
      CSS logical properties (`margin-inline-*`, not `margin-left/right`), per `OSS-REUSE.md` §5.

**How it's tested:** manual pass with Android TalkBack (Tier A device) or a desktop screen reader
(NVDA is free and open source) navigating a full lesson card by keyboard/swipe alone, no mouse/touch.
Record findings the same honest way as `PHONE-TEST.md` — pass/fail per check, tool + version used.

---

## Cross-references

- Standards each tier's contribution must meet in detail: [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md).
- Per-task-type Definition of Done, including which tiers apply to which task type:
  [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md).
- The mandatory 3-reviewer gate for anything learner-facing, regardless of tier:
  [`REVIEWER-GATE.md`](REVIEWER-GATE.md).
- The real-device test procedure this matrix's Tier-A section points to:
  [`../docs/PHONE-TEST.md`](../docs/PHONE-TEST.md).
- The architecture decisions this matrix assumes: [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)
  §0 (offline-first), §7 (accessibility), §8 (privacy/safety).
