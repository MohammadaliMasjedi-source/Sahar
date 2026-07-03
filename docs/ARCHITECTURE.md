# Sahar — Architecture

*How Sahar is built. Companion to [`CURRICULUM-MAP.md`](CURRICULUM-MAP.md) (what it teaches),
[`NAME.md`](NAME.md) (who Sahar is), and [`OSS-REUSE.md`](OSS-REUSE.md) (what we don't rebuild).*

This document follows a small set of **house architecture principles** (layered core, provider
boundaries at every edge, writes separated from reads, MVVM, design tokens, externalized strings,
one access-policy source, headless tests, honest real-vs-mock documentation). Sahar is a web PWA,
so we adopt the **principles**, not any particular framework. The mapping is explicit in
[§9](#9-the-nine-house-principles-in-sahar).

---

## 0. The constraint that shapes everything: offline-first

The child Sahar is for has a **borrowed phone, no data plan, intermittent power, and a reason to
hide**. So the architecture is not "an app that also works offline" — it is **offline-first**, and
online is the optional accelerator.

Consequences that ripple through every later section:
- The whole UI shell (HTML/CSS/JS) is **cached on first load** and runs forever with zero network.
- Content arrives as **self-contained packs** the child can receive by download *or* by sideload
  (a teacher copies a `.json` pack over Bluetooth / SD card / a shared phone).
- **No login is required** to learn. No server round-trip is on the critical path of any lesson.
- All progress lives **on the device** (`localStorage` now; IndexedDB when packs get large).

---

## 1. It is a PWA (installable, service-worker cached)

Sahar is a **Progressive Web App** so one codebase reaches iPhone, Samsung/Android, tablet, and PC,
installs to the home screen, and runs full-screen like a game — without app-store gatekeeping
(which matters when a child's access can be taken away by others).

- **`manifest.webmanifest`** — name, icons, `display: standalone`, `dir`/`lang`, dawn theme color →
  makes it installable and launchable like a native app.
- **`sw.js`** — a **cache-first** service worker. On `install` it precaches the app shell + the demo
  pack; on `fetch` it serves from cache and only falls back to network for things not yet cached.
  Result: after the very first visit, **the app opens at zero internet, instantly.**
- **Versioned cache** (`CACHE = 'sahar-vN'` in `sw.js`): bumping the version retires the old cache
  cleanly, so updates are atomic and a half-downloaded update never corrupts a working install.

> Prototype status: `sw.js` is real and registers; the app shell + all Tier-1 packs are precached.
> Pack *signing* and background pack sync are **designed below but not yet implemented** — honest gap.

---

## 2. Clean Architecture + MVVM (logic separated from the view)

Per house principles #1 and #4 — **logic and data live in a UI-free core; the view is derived.**

```
┌─────────────────────────────────────────────────────────┐
│  View  (index.html + styles.css)                          │  declarative; no business logic
│   data-i18n, data-action hooks only                       │
├─────────────────────────────────────────────────────────┤
│  ViewModel / render  (app.js: render(), bindings)         │  pure-ish: state → DOM
├─────────────────────────────────────────────────────────┤
│  Core / state + services  (app.js: Leitner, i18n, packs)  │  UI-free logic; testable headless
├─────────────────────────────────────────────────────────┤
│  Providers (interfaces)                                   │  swappable boundaries (see §3)
│   ContentProvider · ProgressProvider · I18nProvider       │
└─────────────────────────────────────────────────────────┘
```

In the prototype these layers are sections of one `app.js` (honest: it's a prototype). The
**discipline is already enforced**: `render()` never mutates domain state, the Leitner functions
never touch the DOM, and the view holds no logic — so splitting into modules later is mechanical.

Target module shape when it graduates from prototype:
```
core/        leitner.js  packs.js  i18n.js  schedule.js   (no DOM imports)
providers/   content.local.js  progress.local.js  content.remote.js (later)
ui/          render.js  components/…                       (no domain logic)
tests/       leitner.test.js  packs.test.js  i18n.test.js
```

---

## 3. Provider interfaces at every external boundary (house principle #2)

Every place Sahar touches the outside world is behind an **interface**, so adding a real backend is
*one adapter*, nothing else changes. Mock first, real later, same shape.

| Interface | Responsibility | Prototype impl | Future impl (same interface) |
|-----------|----------------|----------------|------------------------------|
| `ContentProvider` | give me pack N for tier T, language L | reads bundled `content/*.json` | fetch + verify signed pack from CDN / peer sideload |
| `ProgressProvider` | load/save a learner's Leitner state | `localStorage` | IndexedDB; optional encrypted cloud backup |
| `I18nProvider` | strings + direction for a language | `STRINGS[lang]` in `app.js` | per-pack string bundles, lazy-loaded |

`render()` and the Leitner core depend **only on these interfaces** — never on `fetch`, `localStorage`,
or a file path directly.

### Writes vs reads (house principle #3)
**Commands** (the learner answered *got it* / *again*) flow *in* and mutate progress through
`ProgressProvider.save`. **Content** flows one-way *out* of `ContentProvider` and is never mutated by
the UI. They are kept separate — review answers never rewrite lesson content.

---

## 4. Content as versioned, signed JSON packs

Content is **not** baked into the app. It ships as **packs** so a phone stores only the tier(s) that
child is using, and so educators/translators can publish new material without shipping a new app.

**Pack shape** (see `content/tier1-demo.json` for a real one):
```jsonc
{
  "packId": "t1.literacy.fact-opinion",
  "version": "1.0.0",          // semver; sw + provider compare versions
  "tier": 1, "ageBand": "7",
  "subject": "literacy/critical-thinking",
  "lang": ["fa","en","de"],     // every string keyed by language inside the pack
  "license": "CC-BY-SA-4.0",
  "signature": null,            // ← DESIGNED: detached Ed25519 sig over canonical JSON. null in prototype (honest)
  "cards": [ { "id": "...", "type": "...", "prompt": {fa,en,de}, "answer": {fa,en,de}, "box": 1 } ]
}
```

- **Versioned:** semver per pack; the provider/service-worker compare versions to decide refresh.
- **Signed (designed, not yet built):** each official pack carries a **detached Ed25519 signature**
  over its canonical JSON; the app ships the public key and **refuses to load a pack whose signature
  doesn't verify** — so a tampered or hostile pack can't slip onto a child's device. The prototype
  ships `"signature": null` and loads unsigned local packs only. *This is the single most important
  unbuilt safety feature; it is named here so it is not forgotten.*
- **Per-tier download:** the catalog lists packs by tier; a 7-year-old's phone never downloads the
  Tier-4 algebra packs. Packs are small (KBs of JSON) and **sideloadable** (file, Bluetooth, SD).

---

## 5. i18n from day one — fa/Dari (RTL) · en · de

Per house principle #6 — **every string externalized; add-a-language = add-a-dict.** No hardcoded UI
text anywhere.

- UI chrome strings live in `STRINGS[lang]` (prototype) keyed by `data-i18n`.
- **Lesson** strings live *inside each pack*, keyed per language — so a translator localizes a pack
  without touching code.
- **RTL is first-class:** switching to `fa` sets `<html dir="rtl" lang="fa">`; layout uses logical
  properties (`margin-inline-start`, `text-align: start`) so mirroring is automatic, not patched.
- **Dari ≠ Farsi nuance:** the language key is `fa` today; the design reserves a distinct `fa-AF`
  (Dari) bundle so Afghan vocabulary/spelling can diverge from Iranian Persian where it should.
- Adding language #4–6 (e.g. Pashto, Arabic, Urdu — all RTL) is **one dictionary file + one pack
  translation**, no layout work.

---

## 6. Spaced repetition — the Leitner box

Sahar uses the **classic Leitner box model**, a simple and proven spaced-repetition method:

- **5 boxes**, intervals **`[1, 2, 4, 9, 21]` days** (`INTERVALS` in `app.js`).
- **Got it →** card climbs one box and waits longer.
- **Again →** card falls back to **box 1** and returns tomorrow.
- A card is **due** when `today >= due`. Progress (`box`, `due`, `reps`, `lapses`) **persists** in
  `localStorage` — this is *real* spaced repetition, not a throwaway demo loop.

The algorithm is deliberately tiny and transparent; the FSRS upgrade path is noted in
[`OSS-REUSE.md`](OSS-REUSE.md) (drop-in behind the same `schedule()` function — provider-style).

---

## 7. Accessibility & low-literacy, icon-first UX

The first user **cannot yet read the menu.** So a11y is a launch requirement, not polish.

- **Icon-first:** every primary action pairs a large glyph with its label; a child navigates by
  pictures before words. Sahar (the character) demonstrates each new action once.
- **Large touch targets** (≥ 44×44 CSS px), generous spacing, single-column flows — works on a small
  cheap phone held in a child's hand.
- **Screen-reader ready:** semantic landmarks, `aria-live` on the card reveal, language switch updates
  `lang`/`dir` so assistive tech reads the right language. Buttons have real text labels.
- **Audio-first path (designed):** packs reserve an `audio` field per card so a pre-reader can *hear*
  the prompt — critical for the very first weeks of literacy. Prototype is silent (honest).
- **Reduced-motion** respected; high color contrast in the dawn palette; no flashing.
- **Works one-handed, offline, quietly** — no sound required, nothing that announces "a girl is
  learning here."

---

## 8. Child safety · no tracking · privacy by default

This is the section that protects a real child from real danger. **Privacy is the safety model.**

- **No accounts required.** A child can learn the moment the app opens. No phone number, no email,
  no name needed.
- **No tracking, no analytics, no ads, no third-party SDKs.** There is no telemetry call to disable
  because there is none to begin with. (The service worker makes **no external network calls.**)
- **All data stays on the device.** Progress is local. There is no central database of "who is
  learning" that could ever be subpoenaed, leaked, or seized.
- **No remote content execution.** Packs are *data*, never code; the signed-pack design (§4) means a
  hostile party can't push executable or manipulated content to a device.
- **Plausible deniability by design:** secular visuals (no religious symbols, see §10), an innocuous
  installable icon, optional quick-hide — using Sahar should never itself be evidence.
- **Optional, opt-in, encrypted backup only** if a learner ever wants to move devices — never on by
  default, never to us.
- **COPPA/GDPR-K posture:** because we collect nothing and identify no one, the compliant path and
  the safe path are the same path.

> Honest status: the *prototype* already makes zero network calls and stores only local Leitner
> progress. Encrypted backup, quick-hide, and pack signing are **designed, not yet built.**

---

## 9. The nine house principles in Sahar

| # | House principle | In Sahar |
|---|-----------------|----------|
| 1 | Layer it; view depends on core | §2 — Leitner/i18n/pack core is UI-free; `render()` is derived |
| 2 | Provider interface at every boundary | §3 — `ContentProvider` / `ProgressProvider` / `I18nProvider`, mock first |
| 3 | Separate writes from reads | §3 — *got it/again* commands in; content one-way out |
| 4 | MVVM-ish everywhere | §2 — `state` + pure `render()`; no logic in the view |
| 5 | Design tokens + live theme swap | `styles.css` CSS custom properties (dawn tokens); RTL theme via `[dir]` |
| 6 | Externalize all strings | §5 — `STRINGS[lang]` + per-pack strings; add a language = add a file |
| 7 | One access-policy source | learner-only today; a future **educator** role gates pack authoring through one policy |
| 8 | Tests prove the core without UI | `test/core.test.js` — 28 headless tests (pure `node:assert`) covering `schedule()`, `isDue()`, date helpers, i18n key parity, pack shape, `buildQueue()` |
| 9 | ARCHITECTURE.md + real-vs-mock honesty | this file + the "honest status" notes throughout + README banner |

### Real vs. mocked (the honesty section the standard demands)
- **REAL:** offline app shell + service worker; cache-first; the Leitner box engine with persistence;
  i18n fa-RTL/en/de re-rendering real lessons; seven Tier-1 content packs; the Sahar SVG character;
  the pack *format*; the headless test suite (28 tests); zero network calls.
- **MOCKED / DESIGNED-NOT-BUILT:** pack **signing** (Ed25519); multi-pack catalog + per-tier
  download/sideload sync; audio prompts; encrypted backup; quick-hide; tiers 2–4 content; FSRS
  upgrade.

---

## 10. The Sahar character — technical note

Sahar (the girl-at-dawn mascot, see [`NAME.md`](NAME.md)) is an **inline SVG** so she renders offline
with no image asset. **Secular by rule:** no headscarf-as-religious-symbol, no crescent, no script
that reads as devotional — a hopeful girl facing a sunrise. She is themeable (the dawn gradient is
token-driven) and will gain simple state poses (cheering on *got it*, encouraging on *again*) as the
character system grows.

---

## Phased delivery (per the standard's Analyse → Prototyp → … model)

1. **Analyse** ✅ — this repo: vision, architecture, curriculum map, OSS plan, name.
2. **Prototyp** ✅ (current) — runnable offline demo: 7 Tier-1 packs, 3 languages, real Leitner,
   28 headless core tests.
3. **Align** — review with educators/Afghan teachers; lock pack schema + signing.
4. **V1** — Tier-1 full literacy+numeracy packs, audio, installable, sideload distribution.
5. **vNext** — Tiers 2–4, companion books, FSRS, more languages, educator authoring.
