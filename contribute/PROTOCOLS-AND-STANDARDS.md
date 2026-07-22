# Contribution protocols & standards

*Seven standards every contribution is checked against, each broken into concrete, checkable items
— not vibes. These formalize discipline already stated across `ARCHITECTURE.md`, `PRIVACY.md`,
`DO-NO-HARM.md`, and `OSS-REUSE.md`; this file is where a contributor finds them gathered as one
checklist instead of hunting six documents. Structure and standards only — no child-facing content.
Every learner-facing change still needs [`REVIEWER-GATE.md`](REVIEWER-GATE.md)'s three human
sign-offs on top of meeting these standards; meeting these standards is necessary, not sufficient,
for content.*

## How to use this file

Each standard below has a **Why**, a **Checkable standard** (boxes you can actually verify, not
aspirations), and a **Verified by** line (what proves it — a test, a manual check, a reviewer).
Pick the standards relevant to your task type — [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) tells
you which ones apply to which kind of contribution — and check them before opening a PR.

---

## 1. Offline-first

**Why:** Sahar's first user has no reliable internet, ever. This isn't a feature; it's the premise
the whole architecture is built on (`ARCHITECTURE.md` §0).

**Checkable standard:**
- [ ] No `fetch`/`XHR`/`WebSocket`/beacon call added anywhere except the app loading its own
      bundled files.
- [ ] Every new static asset (JS, CSS, JSON, image, audio, font) is committed to the repo and added
      to `sw.js`'s `APP_SHELL`/precache list — an asset present in the repo but absent from the
      service worker's manifest silently breaks offline (see `DEVICE-SUPPORT-MATRIX.md` Tier C).
- [ ] `sw.js`'s `CACHE` version constant is bumped whenever the precache list changes, with a one-line
      comment saying what changed (matches the existing convention at the top of `sw.js`).
- [ ] No third-party CDN reference (script, stylesheet, font, image host) anywhere — everything is
      vendored locally (`OSS-REUSE.md`'s standing rule).
- [ ] Works with DevTools' "Offline" checkbox after one prior online load, and ideally verified on a
      real device per `docs/PHONE-TEST.md`.

**Verified by:** manual offline check (DevTools or `PHONE-TEST.md`); `test/core.test.js` and
`test/bootstrap.test.js` catch some but not all offline regressions — they are not a substitute for
the manual check above.

---

## 2. Internationalization (i18n) + RTL (Farsi/Dari, Pashto)

**Why:** Sahar ships fa (Dari)/en/de today, with Pashto named as a real next-language target
(`README.md`'s "a file, not a rewrite" promise; `OSS-REUSE.md` §3's font coverage already includes
Pashto via Noto Arabic-script fallback). Farsi/Dari and Pashto are both RTL — layout bugs that only
show up in RTL are a recurring, named risk class in this project (`DO-NO-HARM.md`'s icon-adjacency
findings are a cousin of this same class of bug: things that look fine in one direction/context and
aren't in another).

**Checkable standard:**
- [ ] No learner-facing or UI-chrome string is added in only one language — `fa`/`en`/`de` parity is
      required (content-pack strings: enforced by the content-validator; UI chrome: enforced by
      `test/core.test.js`'s parity check per `DOD-BY-TASK-TYPE.md` §1).
- [ ] `fa` content states explicitly whether it is **Dari** or **Iran-Persian** — the two are not
      interchangeable in this project (`REVIEWER-GATE.md` role 1; Tier-1/2 shipped content is
      Afghan-girls-first Dari, the teen pack is Iran-Persian, and mixing them without saying so is a
      defect, not a style choice).
- [ ] Any new layout is checked with `dir="rtl"` active, not only the LTR default — open `index.html`,
      switch to `fa`, and look at the actual change, not just the code.
- [ ] Uses CSS **logical properties** (`margin-inline-start/end`, `padding-inline-*`, `inset-inline-*`)
      instead of physical ones (`margin-left/right`) for anything that must mirror correctly —
      `OSS-REUSE.md` §5's stated first line of RTL support.
- [ ] No text baked into an image/icon (unlocalizable) — text lives in the `STRINGS[lang]` dictionary
      or the content pack's per-language fields, never hardcoded into an SVG or raster asset
      (`OSS-REUSE.md` §6).
- [ ] A new language beyond fa/en/de (e.g., Pashto) is added as **a new file/dictionary entry**, not
      a rewrite of the existing i18n mechanism — matches the "a file, not a rewrite" architectural
      promise.

**Verified by:** `test/core.test.js` (parity), content-validator (`test/content-validator.test.js`),
manual RTL screenshot in the PR (already required for translation PRs, `DOD-BY-TASK-TYPE.md` §2),
native-fa/Pashto reviewer sign-off for anything learner-facing.

---

## 3. Accessibility (WCAG 2.1 AA)

**Why:** the first user "cannot yet read the menu" (`ARCHITECTURE.md` §7) — accessibility is a
launch requirement for Sahar's actual target user, not an add-on for a smaller edge-case audience.

**Checkable standard:**
- [ ] Touch targets ≥ 44×44 CSS px (matches `ARCHITECTURE.md` §7 and `DEVICE-SUPPORT-MATRIX.md`
      Tier A).
- [ ] Color contrast meets **WCAG 2.1 AA**: ≥ 4.5:1 for normal text, ≥ 3:1 for large text (≥ 24px, or
      ≥ 19px bold) and for meaningful UI/graphical elements — check with any free contrast checker
      against the dawn palette's actual computed colors, not the palette's intent.
- [ ] Color is never the sole signal for correct/incorrect/selected state — pair it with shape, icon,
      or text (already the mascot praise-bubble pattern; keep new interaction types consistent).
- [ ] Every interactive element has a real accessible name — visible text, or `aria-label` when the
      visible content is icon-only. A `title` attribute alone does not satisfy this.
- [ ] Semantic landmarks and heading structure are used, not `<div>` soup with click handlers bolted
      on.
- [ ] `aria-live` is used for dynamic content a screen-reader user needs to hear (card reveal,
      feedback) — matches the existing designed pattern in `ARCHITECTURE.md` §7.
- [ ] Respects `prefers-reduced-motion` for any new animation.
- [ ] `lang`/`dir` attributes update correctly on language switch (ties to the i18n standard above).
- [ ] Keyboard-only navigation reaches and operates every interactive element, for any UI surface
      also expected to work on a desktop/shared computer (Tier E).

**Verified by:** manual pass per `DEVICE-SUPPORT-MATRIX.md` Tier E (TalkBack or a desktop screen
reader, keyboard-only pass); `axe-core` is named in `OSS-REUSE.md` §5 as the intended automated
a11y-testing tool for the future test suite — until it's wired in, the manual pass is the standard.

---

## 4. Child-safety-by-design

**Why:** this is the project's absolute, non-negotiable standard — see `DO-NO-HARM.md` in full.
This section is a pointer and a checklist, not a restatement; `DO-NO-HARM.md` and
`REVIEWER-GATE.md` remain the sources of truth.

**Checkable standard:**
- [ ] No content a child could read/hear/see ships without the full 3-reviewer gate
      (`REVIEWER-GATE.md`) — no exceptions, ever, regardless of how small or "obviously fine" it
      looks.
- [ ] No religious, political, or nationalist symbol in any icon, character, theme, or copy — checked
      explicitly against the documented moon-and-star adjacency trap (`DO-NO-HARM.md`) for anything
      celestial.
- [ ] No disclosure prompt anywhere (nothing that asks a child to reveal that something happened to
      them) and no shame/comparative-pressure framing (no timers, scores, streak-loss, or "you're
      behind" language) — a structural rule already enforced in the Leitner engine itself
      (`DO-NO-HARM.md`'s "constructive, no-shame feedback wired into the engine").
- [ ] Anything touching body, health, puberty, or relationships is authored **only** by a human
      subject-matter expert from the first word — never drafted by an AI assistant at any stage, per
      the HARD RULE in every module skeleton under `modules/`.
- [ ] No social/network surface added — no chat, comments, multiplayer, friend list, leaderboard, or
      any way for one user to reach another (`DO-NO-HARM.md`'s "no social or harassment surface" —
      this is architectural, not a moderation policy).
- [ ] Audio: draft/machine-voice files are never presented as indistinguishable from real human
      recordings; real recordings are adult-narrator-only, never a child's voice (`DO-NO-HARM.md`,
      `audio/DARI-AUDIO-SOURCING-2026-07-19.md`).

**Verified by:** `REVIEWER-GATE.md`'s three named human sign-offs — the only thing that can verify
this standard for learner-facing content. No automated check substitutes for it.

---

## 5. Licensing & attribution

**Why:** Sahar is dual-licensed on purpose (code MIT, content CC-BY-SA 4.0) specifically so it stays
free and forkable forever (`LICENSE-NOTE.md`). Getting a source's license wrong is a real legal and
ethical failure, not a paperwork nitpick — `packs/teen-critical-thinking/RED-TEAM.md` already logged
a real license-table correction as a lesson learned.

**Checkable standard:**
- [ ] Every third-party source drawn on is recorded with its actual license, matched against
      `OSS-REUSE.md`'s table (or added to it, if it's a new source type).
- [ ] License discipline followed: **CC-BY** → attribute it; **CC-BY-SA** → your derived content is
      also CC-BY-SA; **CC-BY-NC** → fine for this not-for-profit, free project, never sell it;
      **ND-licensed text is never used** for translation or adaptation (only original-license terms
      that permit derivatives may be adapted).
- [ ] No text lifted verbatim from a copyrighted, non-open source — concepts may be drawn on, the
      words must be original (`DOD-BY-TASK-TYPE.md` §3's existing rule, restated here as the general
      standard).
- [ ] No new runtime dependency added without a license + offline-compatibility note in
      `OSS-REUSE.md`, in that file's existing table format.
- [ ] Your own contribution is licensed under the matching terms automatically (code → MIT, content →
      CC-BY-SA 4.0) per `LICENSE-NOTE.md` — say so explicitly in the PR if the licensing implication
      is non-obvious (e.g., a mixed code+content PR).

**Verified by:** maintainer triage (`REVIEW-PATH.md` step 2) checks the license story as part of fit
review; for content, the 3-reviewer gate also re-checks sourcing as part of factual-accuracy review.

---

## 6. Data-minimization / privacy

**Why:** "collects nothing, because there is nowhere for anything to go" (`PRIVACY.md`) is a
structural property today. A single contribution that adds a network call, an analytics snippet, or
an unnamed piece of PII storage would break that property for the whole app, not just its own
feature.

**Checkable standard:**
- [ ] No new account system, login, email/phone collection, or identifier added.
- [ ] No analytics, telemetry, advertising SDK, or third-party tracking script added — none, not even
      "privacy-friendly" or "anonymous" analytics.
- [ ] No new `localStorage` (or any storage) key added without documenting it in `PRIVACY.md`'s data
      table and `DATA-HANDLING.md` — every stored field must have a stated purpose and "who typed it."
- [ ] Any new persisted field is namespaced per-profile through `profiles.js` if it's per-child data
      (`DEVICE-SUPPORT-MATRIX.md` Tier D) — never a global unkeyed value that could leak across
      siblings sharing a device.
- [ ] No IP-address logging, device fingerprinting, or cloud sync added by default.
- [ ] No personal data about any real child, family, or contact is ever committed to this **public**
      repo — including in funding/outreach materials (`DOD-BY-TASK-TYPE.md` §6), example data, test
      fixtures, or commit messages.

**Verified by:** `test/profiles.test.js` (namespacing); manual review against `PRIVACY.md`/
`DATA-HANDLING.md`'s existing tables; maintainer triage explicitly checks any new storage key or
network call.

---

## 7. Performance budgets

**Why:** Tier-A devices (`DEVICE-SUPPORT-MATRIX.md`) are cheap, shared, and storage-constrained.
"It works on my laptop" is not evidence it works on the actual target device.

**Checkable standard (current honest baseline, so growth is checkable, not guessed):**
- [ ] Full offline install today is **~13 MB total** (app shell + all content packs + 245 draft
      audio clips, of which audio is ~11 MB) — a PR that meaningfully grows this states the new
      total in its description, so reviewers can judge the tradeoff deliberately rather than by
      surprise.
- [ ] No new runtime dependency (`OSS-REUSE.md`'s reuse table) unless it is offline-compatible
      (vendored, not CDN) and its size is stated in the PR.
- [ ] Audio assets follow the existing compressed `.mp3` convention (not uncompressed `.wav`) unless
      there's a stated reason.
- [ ] Images/icons stay inline SVG where the existing codebase does (`pictures.js`, `mascot.js`) —
      no new raster-image dependency for something an SVG already handles, per
      `PLATFORM-INDEPENDENCE.md`'s "no build step, no bloat" posture.
- [ ] No added synchronous, render-blocking work on the main thread for content that could load
      lazily (a pack's audio, for instance, is fetched by the service worker's precache, not inline
      in the critical render path).

**Verified by:** `du -sh` on the repo before/after (see the current baseline number above), manual
load-time check on a Tier-A device or Chrome DevTools' network throttling set to a slow connection
profile.

---

## Cross-references

- Which standards apply to which contribution type: [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md).
- Device tiers these standards are written against: [`DEVICE-SUPPORT-MATRIX.md`](DEVICE-SUPPORT-MATRIX.md).
- The mandatory human sign-off for anything learner-facing, on top of these standards:
  [`REVIEWER-GATE.md`](REVIEWER-GATE.md).
- A guided, step-by-step way to apply all of this: [`INTERACTIVE-GUIDE.md`](INTERACTIVE-GUIDE.md).
