# Sahar — End-to-End Test Report

**Date:** 2026-07-22
**Scope:** the runnable prototype (`index.html` shell + `app.js`, `profiles.js`, `audio.js`,
`mascot.js`, `pictures.js`, `bootstrap-core.js`, `sw.js`, the `content/` packs and manifest).
**Method:** unit suites + a real-DOM end-to-end run + adversarial edge-case probes.

> ### Status — fixes applied 2026-07-22
> **Applied & re-verified:** **F1**, **F2**, **F3**, **F4**, **H1**, **H2**, **H4**, **H5**.
> After the fixes: `npm test` = **238/238**; the real-DOM journey = **31/31**; the three edge
> probes that previously failed now pass — 3 rapid taps advance **1** card (was 3), the last-card
> multi-tap **no longer throws**, and the garden reads a sane **"0 / 4"** (was "6 / 4").
> **Deferred by design:** **F5** (Leitner gating is intentionally cosmetic in the prototype; the
> report scopes the real gate to the funded phase), **H3** (a boot-time perf optimization that adds
> a title-drift surface — left for a manifest-schema pass), **H6** (an error-path refactor of low
> value). Each is annotated in place below.

---

## 1. How it was tested

| Layer | Tool | Result |
|-------|------|--------|
| Unit / core suites | `npm test` (node:assert, no framework) | **201 / 201 pass** — core 28, bootstrap 14, content-validator 134, profiles 25 |
| Asset integrity | file-existence sweep | **0 missing** — 31 service-worker shell entries, 16 `index.html` refs, 245 audio-manifest clips, every pack's `audio.{fa,en,de}` |
| **Full user journey** | **real DOM (jsdom) driving the actual `app.js`** | **31 / 31 assertions pass, 0 uncaught errors** |
| Adversarial edge cases | targeted DOM probes | **2 real bugs + 3 design weaknesses found** (below) |

The end-to-end run exercised the true user flow against the unmodified `app.js`: boot → "who's
learning" gate → add a child (caregiver) → lesson shelf (10 packs on band 6‑8) → open a pack →
tap through every card → done screen → garden bloom recorded → language switch → restart → back to
shelf → switch profile → add a second child on an empty band (10‑12) → coming-soon scaffold →
band-switch back to a real shelf. All of that works. The findings below are the edge cases the
happy path does **not** cover.

> **Bottom line:** the prototype is functionally sound on the intended path. The issues are
> concentrated in (a) rapid/child-style tapping and (b) a few cross-cutting design choices
> (garden math, offline fallback, scheduling timezone). None block the "honest prototype" claim,
> but **F1 should be fixed before any real child use** because children mash buttons.

---

## 2. Findings (severity-ranked)

| # | Severity | Area | One-line |
|---|----------|------|----------|
| **F1** | **High** | lesson flow | Rapid tapping skips cards, falsely marks them "got it", and **crashes on the last card** |
| **F2** | Medium | garden UI | Garden can display an impossible count like **"6 / 4"** after a band switch |
| **F3** | Medium | offline / SW | Every failed offline GET falls back to **`index.html` HTML**, even for JSON/images/audio |
| **F4** | Low–Med | scheduling | "Today"/"due" is computed in **UTC**, so the Leitner day flips at 19:30 in Kabul |
| **F5** | Low (by design) | Leitner | Spaced-repetition **never actually withholds a card** in normal use |
| H1–H6 | Low | hygiene | Doc drift, un-CI'd gate, boot fetch cost, unescaped title, audio-honesty edge, error-path re-render |

---

### F1 — Rapid / double tap over-advances the queue and crashes on the last card  **(High)**

**What happens.** After a correct tap, `onTapChoice()` schedules the advance 700 ms later
(`setTimeout(() => onAnswer(true), 700)`, [app.js:1041](app.js#L1041)) but leaves the answer tiles
**live** — nothing disables them or locks the card during that window. A child who taps the
correct tile 2–3 times (the norm for this age group) queues 2–3 advances.

**Reproduced (single-boot headless DOM, `t1-numeracy-counting-0-20`):**

- One correct tap → **1** advance, 1 card recorded. ✅ correct.
- **Three** rapid taps on one card → **3** advances; **3** cards written to the Leitner store as
  "got it" — two of which the child never saw.
- **Three** rapid taps on the **last** card →
  `TypeError: Cannot read properties of undefined (reading 'id')` thrown twice at
  `onAnswer` ([app.js:1001](app.js#L1001), the `progress[card.id] = …` line), because `state.idx`
  runs past `state.queue.length` and `state.queue[state.idx]` is `undefined`.

**Impact.**
1. **Corrupts spaced repetition** — unseen cards climb their Leitner box, so they won't resurface
   when they should. This silently undermines the app's headline feature.
2. **Uncaught crash** on the final card of every pack. The done screen may still paint from the
   first advance, but two exceptions fire and the flow is left in a broken state.

**Proposed fix.** Lock the card the moment a correct answer is accepted, and guard `onAnswer`
against running past the end of the queue:

```js
// state: add an `advancing` flag (reset in openPack/onRestart/prepareCard)
function onTapChoice(tappedId) {
  const card = state.queue[state.idx];
  if (!card || state.advancing) return;          // ignore taps during the 700 ms advance
  const isMatch = card.interaction === 'match' && Array.isArray(card.rounds);
  const round = isMatch ? card.rounds[state.subIdx] : card;
  if (tappedId !== round.answerId) { onWrongTap(tappedId); return; }
  // …cheer / celebrate…
  if (isMatch && state.subIdx < card.rounds.length - 1) {
    state.subIdx += 1;
    state.shuffledChoices = shuffleChoices(card.rounds[state.subIdx].choices);
    setTimeout(render, 700);
  } else {
    state.advancing = true;                        // <- lock
    setTimeout(() => onAnswer(true), 700);
  }
}

function onAnswer(gotIt) {
  const card = state.queue[state.idx];
  if (!card) { state.advancing = false; return; }  // <- guard past end of queue
  // …existing schedule + persist…
  state.idx += 1;
  state.advancing = false;                          // <- unlock for the next card
  prepareCard();
  render();
}
```

Optionally also add a visual lock (e.g. `pointer-events:none` on `.pic-grid` once correct) so the
child *sees* the tiles freeze during the celebration.

---

### F2 — Garden shows an impossible "X / Y" after a profile's band changes  **(Medium)**

**What happens.** `renderGarden()` ([app.js:468](app.js#L468)) draws
`completed / total` where `total = packsForBand(activeAgeBand()).length` (current band, e.g. 4)
but `completed = GardenProvider.distinctCompletedCount(profile)` counts **every** pack the profile
ever finished, across **all** bands.

**Reproduced:** a profile completes 6 packs on band 6‑8, a caregiver switches it to band 8‑10
(4 packs) via the band bar → the garden label reads **"6 / 4"**. (The SVG scene itself clamps via
`Math.min` in `mascot.garden()`, so only the text label is wrong — no crash.)

**Impact.** A confusing, self-contradictory number shown to a pre-literate child, in the one
surface meant to feel warm and encouraging. It also over-reports progress.

**Proposed fix.** Count only completions that belong to the band currently on screen, so the
numerator can never exceed the denominator:

```js
function renderGarden() {
  // …guards…
  const bandPacks = packsForBand(activeAgeBand());
  const total = bandPacks.length;
  if (!total) { el.innerHTML = ''; return; }
  const bandIds = new Set(bandPacks.map((p) => p.id));
  const ledger = P.GardenProvider.load(state.activeProfileId).packsCompleted || {};
  const completed = Object.keys(ledger).filter((id) => bandIds.has(id)).length;
  const scene = (window.SaharMascot && window.SaharMascot.garden(completed, total)) || '';
  // …render `${completed} / ${total}`…
}
```

---

### F3 — Offline fallback returns `index.html` for *every* failed request  **(Medium)**

**What happens.** The service-worker fetch handler ends every miss with
`.catch(() => caches.match('./index.html'))` ([sw.js:117](sw.js#L117)). That is correct for a page
navigation, but a *content pack*, *image*, *font*, or *audio* request that isn't yet cached (e.g.
a brand-new pack on a device that went offline before caching it) also receives the **HTML of the
app shell**.

**Impact.** Wrong content-type on an offline miss. For packs it degrades "gracefully" only by
accident (`ContentProvider` then fails `res.json()` and shows "Could not load the lesson pack"),
but images/fonts/audio silently receive HTML bytes, and real errors are masked as the app shell.

**Proposed fix.** Only serve the shell fallback for navigations:

```js
return fetch(req).then((res) => {
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
  return res;
}).catch(() =>
  req.mode === 'navigate' ? caches.match('./index.html') : Response.error()
);
```

---

### F4 — "Today" is computed in UTC, not the learner's local day  **(Low–Medium)**

`todayISO()` uses `new Date().toISOString().slice(0, 10)` ([app.js:158](app.js#L158)), i.e. the
**UTC** date. For a learner in Kabul (UTC+4:30) the day boundary falls at **19:30 local**, so a
review done in the evening is dated to "tomorrow" and a card's `due` date drifts by a day relative
to the child's actual day.

**Impact.** Subtle spaced-repetition drift; a card meant for "tomorrow" can appear the same
evening or be delayed. Harmless to stability, wrong for pedagogy.

**Proposed fix.** Compute the local calendar date (and keep `addDaysISO` consistent with it):

```js
function todayISO(d) {
  const x = d || new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
}
```

---

### F5 — Spaced repetition never actually gates a card  **(Low — currently by design)**

`buildQueue()` ends with `return due.length ? due : merged;`
([app.js:393](app.js#L393)) — when nothing is due it shows **all** cards "so the demo always
works." Because a fresh pack marks every card due *today* and completing it pushes them into the
future, a returning learner is always in the "nothing due → show everything" branch. In practice
the due-date filter never withholds a card, so the Leitner engine is **cosmetic** in the prototype.

This is deliberate and commented, but it means the app's headline feature isn't observable. When
the funded phase turns it on, distinguish **due-today** from **extra practice** (e.g. a
"you're all caught up — practice anyway?" state) instead of silently serving the whole deck.

---

## 3. Hygiene / lower-priority

- **H1 — Doc drift.** `README.md` says "**132** headless checks"; the suites now total **201**
  (28 + 14 + 134 + 25). Update the number.
- **H2 — Un-CI'd gate.** `packs/teen-critical-thinking/validate.js` is **not** part of
  `npm test`. The pack is DRAFT and correctly kept out of the manifest, but its own validator
  never runs in CI — add it to the `test` script (even if it only guards a draft) so it can't rot.
- **H3 — Boot cost.** `boot()` fetches **every** pack's full JSON just to read titles
  ([app.js:1208](app.js#L1208)) — 14 files today, growing per band — even though only the active
  band's shelf is shown. Put `titleByLang` in `packs.manifest.json` and drop the boot-time fetch
  loop; the shelf then needs zero pack fetches until one is opened.
- **H4 — Unescaped title.** `renderPicker()` interpolates the pack title into `innerHTML`
  unescaped (`<span class="tile-title">${title}</span>`, [app.js:629](app.js#L629)) while the rest
  of the view uses `escapeHtml()`. Titles are trusted today, but for consistency and defense in
  depth, escape it.
- **H5 — Audio honesty edge.** In `audio.js`, `tryFile()` and `speak()` resolve *success* on their
  3 s / 4 s safety timeouts (`resolve(!missing[url])`, `setTimeout(() => resolve(true), 4000)`), so
  a clip that never audibly played can still report `mode: 'recording'`/`'tts'` and light up the
  "temporary machine voice" banner. Cosmetic, but it slightly undercuts the project's honesty rule.
- **H6 — Error-path re-render.** `openPack()`'s failure branch writes directly to `#stage`
  ([app.js:1066](app.js#L1066)) and skips `render()`, so the profile chip / band bar / garden are
  not refreshed on a load error. Prefer routing through `render()` with an error flag.

---

## 4. What this run did **not** cover

These need a real browser (recommend a Playwright pass in the funded phase):

- **`bootstrap.html`** first-contact flow was not driven through the DOM here (its pure engine is
  covered by `bootstrap.test.js`, 14 checks passing, but the page glue was not E2E'd).
- **Real service worker** install/activate/offline behavior — jsdom can't run a SW. F3 is from
  static analysis of the handler.
- **Real audio**: file playback, browser TTS availability, the tone fallback, and iOS's
  gesture/autoplay gating.
- **iOS/Android PWA install** (A2HS, `apple-touch-icon`, maskable icons) and real **RTL layout**.
- **On-device performance** on a low-end borrowed phone (the app's actual target).

---

## 5. Suggested fix order

1. **F1** (child-mash crash + Leitner corruption) — highest impact, small change.
2. **F2** (garden "6 / 4") — small change, user-visible.
3. **F3** (offline fallback) — correctness of the offline promise.
4. **F4 / F5** — pedagogy correctness; can land with the funded-phase Leitner work.
5. **H1–H6** — hygiene, batchable.

*Reproduction harnesses used for this report are available on request (headless jsdom driving the
unmodified `app.js`); they can be adapted into a permanent Playwright suite.*
