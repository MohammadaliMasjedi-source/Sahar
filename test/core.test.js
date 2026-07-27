/* Sahar — headless test suite (pure node, no framework, node:assert only).
 * Closes the project's biggest honest gap: the CORE had no tests.
 * Exercises the UI-free CORE exported from app.js:
 *   INTERVALS, schedule, isDue, addDaysISO, todayISO, buildQueue, STRINGS
 * plus the I18n key-parity contract and the demo content pack shape.
 *
 * Run:  node test/core.test.js   (or:  npm test)
 *
 * Honest note: app.js touches browser globals at MODULE LOAD time —
 * localStorage.getItem (the `state` viewmodel) and
 * document.addEventListener('DOMContentLoaded', boot) (the wiring, line ~299).
 * So we install tiny no-op shims for localStorage + document BEFORE requiring
 * app.js. boot() only runs on the DOMContentLoaded event, which our shim never
 * fires, so no DOM/view code executes. We test ONLY the pure CORE here; the
 * DOM view layer is intentionally out of scope (no jsdom).
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

/* ---- mock localStorage so requiring app.js doesn't throw under node ---- */
function makeMockLocalStorage() {
  const store = new Map();
  return {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); },
    removeItem(k) { store.delete(k); },
    clear() { store.clear(); },
    _dump() { return Object.fromEntries(store); }
  };
}
globalThis.localStorage = makeMockLocalStorage();

/* ---- minimal document shim: app.js registers a DOMContentLoaded listener at
 * load time. We capture it but never fire it, so boot()/the view never runs. ---- */
globalThis.document = { addEventListener() { /* listener captured, never fired */ } };

const CORE = require('../app.js');
const { INTERVALS, schedule, isDue, addDaysISO, todayISO, buildQueue, STRINGS } = CORE;

/* ---- tiny test harness (no deps) ---- */
let passed = 0;
let failed = 0;
const failures = [];
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ok   ' + name);
  } catch (err) {
    failed++;
    failures.push({ name, err });
    console.log('  FAIL ' + name + '  -> ' + (err && err.message));
  }
}

console.log('Sahar CORE tests\n');

/* =====================================================================
 * 1. INTERVALS contract
 * ===================================================================== */
test('INTERVALS is the canonical [1,2,4,9,21]', () => {
  assert.deepEqual(INTERVALS, [1, 2, 4, 9, 21]);
});

/* =====================================================================
 * 2. schedule() — climbs the box ladder on "got it"
 * ===================================================================== */
test('schedule(gotIt) climbs one box and bumps reps', () => {
  const out = schedule({ id: 'x', box: 1, reps: 0 }, true);
  assert.equal(out.box, 2, 'box should climb 1 -> 2');
  assert.equal(out.reps, 1, 'reps should increment');
});

test('schedule(gotIt) sets due to today + INTERVALS[newBox-1]', () => {
  // box 1 -> 2, interval for box 2 is INTERVALS[1] = 2 days
  const expected = addDaysISO(INTERVALS[1]);
  const out = schedule({ id: 'x', box: 1 }, true);
  assert.equal(out.due, expected, 'due must be today + 2 days');
});

test('schedule defaults missing box to 1 then climbs to 2', () => {
  const out = schedule({ id: 'x' }, true); // no box field
  assert.equal(out.box, 2);
  assert.equal(out.due, addDaysISO(INTERVALS[1]));
});

test('schedule(gotIt) caps box at top (5) — edge case', () => {
  const out = schedule({ id: 'x', box: 5, reps: 4 }, true);
  assert.equal(out.box, 5, 'box must not exceed INTERVALS.length (5)');
  assert.equal(out.reps, 5);
  assert.equal(out.due, addDaysISO(INTERVALS[4]), 'due = today + 21 days at top box');
});

/* =====================================================================
 * 3. schedule() — falls back to box 1 on "again"
 * ===================================================================== */
test('schedule(again) drops to box 1 and bumps lapses', () => {
  const out = schedule({ id: 'x', box: 4, lapses: 1 }, false);
  assert.equal(out.box, 1, 'a miss resets to box 1');
  assert.equal(out.lapses, 2, 'lapses should increment');
  assert.equal(out.due, addDaysISO(INTERVALS[0]), 'due = today + 1 day');
});

test('schedule(again) from box 1 stays at box 1 — edge case', () => {
  const out = schedule({ id: 'x', box: 1, lapses: 0 }, false);
  assert.equal(out.box, 1);
  assert.equal(out.lapses, 1);
});

test('schedule does NOT mutate the input card (pure)', () => {
  const input = { id: 'x', box: 2, reps: 1, lapses: 0 };
  const snapshot = JSON.stringify(input);
  schedule(input, true);
  assert.equal(JSON.stringify(input), snapshot, 'input must be unchanged');
});

/* =====================================================================
 * 4. isDue() — boundary behaviour
 * ===================================================================== */
test('isDue: a card with no due date is always due', () => {
  assert.equal(isDue({ id: 'x' }, todayISO()), true);
});

test('isDue: due exactly today is due (boundary, <=)', () => {
  const t = todayISO();
  assert.equal(isDue({ id: 'x', due: t }, t), true);
});

test('isDue: due in the past is due', () => {
  const t = todayISO();
  const yesterday = addDaysISO(-1);
  assert.equal(isDue({ id: 'x', due: yesterday }, t), true);
});

test('isDue: due in the future is NOT due — edge case', () => {
  const t = todayISO();
  const tomorrow = addDaysISO(1);
  assert.equal(isDue({ id: 'x', due: tomorrow }, t), false);
});

/* =====================================================================
 * 5. date helpers
 * ===================================================================== */
test('todayISO returns YYYY-MM-DD', () => {
  assert.match(todayISO(), /^\d{4}-\d{2}-\d{2}$/);
});

test('addDaysISO(0) equals today; addDaysISO(1) is strictly after', () => {
  assert.equal(addDaysISO(0), todayISO());
  assert.ok(addDaysISO(1) > todayISO());
  assert.ok(addDaysISO(-1) < todayISO());
});

test('todayISO uses the LOCAL calendar date, not UTC — regression, F4', () => {
  // A late-evening moment that is still "today" locally but already "tomorrow"
  // in UTC (e.g. Kabul UTC+4:30). todayISO must report the LOCAL day so a
  // learner's Leitner "due"/"today" never drifts a day. Build the date from
  // local components so the expectation is timezone-independent.
  const d = new Date(2026, 6, 22, 23, 30, 0); // local 2026-07-22 23:30
  assert.equal(todayISO(d), '2026-07-22');
  // round-trip: adding then subtracting a day returns the same local day
  assert.equal(addDaysISO(-1, addDaysISO(1, todayISO(d))), '2026-07-22');
});

/* =====================================================================
 * 6. i18n STRINGS — fa/en/de exist with matching keys (no missing translations)
 * ===================================================================== */
test('STRINGS has exactly fa, en, de', () => {
  assert.deepEqual(Object.keys(STRINGS).sort(), ['de', 'en', 'fa']);
});

test('every language has identical key sets (no missing translation key)', () => {
  const langs = Object.keys(STRINGS);
  const ref = Object.keys(STRINGS.en).sort();
  for (const lang of langs) {
    const keys = Object.keys(STRINGS[lang]).sort();
    assert.deepEqual(keys, ref, `lang "${lang}" key set must match en`);
  }
});

test('no string value is empty/missing across any language', () => {
  for (const [lang, dict] of Object.entries(STRINGS)) {
    for (const [key, val] of Object.entries(dict)) {
      assert.equal(typeof val, 'string', `${lang}.${key} must be a string`);
      assert.ok(val.length > 0, `${lang}.${key} must be non-empty`);
    }
  }
});

test('dir is rtl for fa and ltr for en/de', () => {
  assert.equal(STRINGS.fa.dir, 'rtl');
  assert.equal(STRINGS.en.dir, 'ltr');
  assert.equal(STRINGS.de.dir, 'ltr');
});

/* =====================================================================
 * 7. Demo content pack parses + has the expected fields
 * ===================================================================== */
const PACK_PATH = path.join(__dirname, '..', 'content', 'tier1-demo.json');
let pack;
test('demo pack parses as JSON', () => {
  const raw = fs.readFileSync(PACK_PATH, 'utf8');
  pack = JSON.parse(raw); // throws if malformed
  assert.ok(pack && typeof pack === 'object');
});

test('demo pack has required top-level fields', () => {
  for (const f of ['packId', 'version', 'tier', 'lang', 'title', 'cards']) {
    assert.ok(f in pack, `pack must have "${f}"`);
  }
  assert.ok(Array.isArray(pack.cards) && pack.cards.length > 0, 'cards non-empty array');
  assert.deepEqual(pack.lang.sort(), ['de', 'en', 'fa'], 'pack declares fa/en/de');
});

test('title is translated into every declared language', () => {
  for (const lang of pack.lang) {
    assert.ok(pack.title[lang] && pack.title[lang].length > 0, `title.${lang} present`);
  }
});

test('every card has id, type, and prompt+answer in all declared langs', () => {
  const seenIds = new Set();
  for (const card of pack.cards) {
    assert.ok(card.id, 'card has id');
    assert.ok(!seenIds.has(card.id), `card id "${card.id}" is unique`);
    seenIds.add(card.id);
    assert.ok(card.type, `card ${card.id} has type`);
    for (const lang of pack.lang) {
      assert.ok(card.prompt && card.prompt[lang], `card ${card.id} prompt.${lang}`);
      assert.ok(card.answer && card.answer[lang], `card ${card.id} answer.${lang}`);
    }
  }
});

/* =====================================================================
 * 8. buildQueue() — pack + saved progress -> due cards
 * ===================================================================== */
test('buildQueue returns all cards when no progress saved (all due today)', () => {
  const q = buildQueue(pack, {});
  assert.equal(q.length, pack.cards.length, 'fresh learner: every card is due');
  // defaults applied
  assert.equal(q[0].box, 1);
  assert.equal(q[0].reps, 0);
});

test('buildQueue filters out cards scheduled in the future', () => {
  const future = addDaysISO(5);
  const progress = {};
  // push every card into the future -> nothing due
  for (const c of pack.cards) progress[c.id] = { box: 3, due: future };
  const q = buildQueue(pack, progress);
  // fallback: when NOTHING is due, the demo shows all cards (so it never looks broken)
  assert.equal(q.length, pack.cards.length, 'fallback shows all when none due');
});

test('buildQueue keeps only due cards when SOME are due — edge case', () => {
  const future = addDaysISO(5);
  const past = addDaysISO(-1);
  const progress = {};
  pack.cards.forEach((c, i) => {
    progress[c.id] = { box: 2, due: i === 0 ? past : future };
  });
  const q = buildQueue(pack, progress);
  assert.equal(q.length, 1, 'only the one past-due card is queued');
  assert.equal(q[0].id, pack.cards[0].id);
});

test('buildQueue merges saved progress over pack defaults', () => {
  const progress = {};
  progress[pack.cards[0].id] = { box: 4, reps: 7, due: addDaysISO(-2) };
  const q = buildQueue(pack, progress);
  const card = q.find((c) => c.id === pack.cards[0].id);
  assert.ok(card, 'merged due card present');
  assert.equal(card.box, 4, 'saved box wins over default');
  assert.equal(card.reps, 7, 'saved reps wins over default');
});

/* =====================================================================
 * 9. ProgressProvider round-trip (via the localStorage shim)
 *    schedule() -> persist shape -> reload -> buildQueue reflects it.
 * ===================================================================== */
test('progress round-trips through localStorage shim', () => {
  globalThis.localStorage.clear();
  const KEY = 'sahar.progress.v1';
  const card = pack.cards[0];
  const updated = schedule(card, true); // box 1 -> 2, reps 0 -> 1, due = +2d
  // This mirrors onAnswer() in app.js exactly. Note: on a "got it", schedule
  // does NOT touch lapses, so updated.lapses is undefined here — and JSON
  // serialization drops undefined-valued keys. The round-trip below asserts
  // the values that actually survive, which is the honest persisted shape.
  const toSave = {};
  toSave[card.id] = { box: updated.box, due: updated.due, reps: updated.reps, lapses: updated.lapses };
  globalThis.localStorage.setItem(KEY, JSON.stringify(toSave));

  const reloaded = JSON.parse(globalThis.localStorage.getItem(KEY));
  const r = reloaded[card.id];
  assert.equal(r.box, 2, 'box survives round-trip');
  assert.equal(r.due, updated.due, 'due survives round-trip');
  assert.equal(r.reps, 1, 'reps survives round-trip');
  assert.equal('lapses' in r, false, 'undefined lapses is dropped by JSON (honest)');

  // and buildQueue should honour it: due is in the future -> falls back to all
  const q = buildQueue(pack, reloaded);
  assert.ok(Array.isArray(q) && q.length > 0);
});

test('progress round-trips with lapses set (the "again" path) — edge case', () => {
  globalThis.localStorage.clear();
  const KEY = 'sahar.progress.v1';
  const card = pack.cards[0];
  const updated = schedule(card, false); // miss -> box 1, lapses 0 -> 1
  const toSave = {};
  toSave[card.id] = { box: updated.box, due: updated.due, reps: updated.reps, lapses: updated.lapses };
  globalThis.localStorage.setItem(KEY, JSON.stringify(toSave));
  const r = JSON.parse(globalThis.localStorage.getItem(KEY))[card.id];
  assert.equal(r.box, 1);
  assert.equal(r.lapses, 1, 'defined lapses DOES survive the round-trip');
  assert.equal(r.due, addDaysISO(INTERVALS[0]));
});

/* =====================================================================
 * summary
 * ===================================================================== */
console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
if (failed > 0) {
  for (const f of failures) {
    console.log('\nFAILED: ' + f.name);
    console.log(f.err && f.err.stack ? f.err.stack : f.err);
  }
  process.exit(1);
}
process.exit(0);
