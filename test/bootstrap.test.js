/* Sahar — headless tests for the AUDIO-FIRST bootstrap slice.
 * Pure node, no framework (node:assert only), same style as core.test.js.
 * Covers:
 *   - the pure bootstrap-core logic (rounds, tap scoring, progress)
 *   - the language-course pack VALIDATOR (shape, l1/l2, audio slots, honesty)
 *   - the picture library (every pack `pic` has an SVG)
 *
 * bootstrap-core.js and pictures.js touch only `module`/`window`, so they load
 * cleanly under node. We shim `window` to a bare object so the browser-global
 * assignment at the bottom of each file is a harmless no-op.
 *
 * Run:  node test/bootstrap.test.js
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

globalThis.window = globalThis.window || {}; // harmless target for browser globals

const core = require('../bootstrap-core.js');
const { pictureFor, PICTURES } = require('../pictures.js');

let passed = 0, failed = 0;
const failures = [];
function test(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (err) { failed++; failures.push({ name, err }); console.log('  FAIL ' + name + '  -> ' + (err && err.message)); }
}

console.log('Sahar BOOTSTRAP tests\n');

/* ---- load the seed language-course pack ---- */
const PACK_PATH = path.join(__dirname, '..', 'content', 'lc-fa-en-first-words.json');
let pack;
test('language-course pack parses as JSON', () => {
  pack = JSON.parse(fs.readFileSync(PACK_PATH, 'utf8'));
  assert.ok(pack && typeof pack === 'object');
});

/* =====================================================================
 * VALIDATOR — the language-course pack contract (SAHAR-COVERAGE §6.5 B)
 * ===================================================================== */
test('pack declares packType=language-course with l1 + l2', () => {
  assert.equal(pack.packType, 'language-course');
  assert.equal(pack.l1, 'fa-AF', 'l1 is the mother tongue (Dari)');
  assert.equal(pack.l2, 'en', 'l2 is the target language');
});

test('pack is honest: audioStatus=placeholder + an audioNote in fa/en/de', () => {
  assert.equal(pack.audioStatus, 'placeholder', 'audio must be declared placeholder, not real');
  for (const lang of ['fa', 'en', 'de']) {
    assert.ok(pack.audioNote && pack.audioNote[lang] && pack.audioNote[lang].length > 0, `audioNote.${lang}`);
  }
});

test('pack has ~10 first-contact items', () => {
  assert.ok(Array.isArray(pack.items), 'items is an array');
  assert.ok(pack.items.length >= 8 && pack.items.length <= 12, `expected ~10 items, got ${pack.items.length}`);
});

test('every item: unique id, pic, l1{text,translit,audio}, l2{text,translit,audio}', () => {
  const ids = new Set();
  for (const it of pack.items) {
    assert.ok(it.id, 'item has id');
    assert.ok(!ids.has(it.id), `item id "${it.id}" unique`);
    ids.add(it.id);
    assert.ok(it.pic, `item ${it.id} has pic`);
    for (const side of ['l1', 'l2']) {
      assert.ok(it[side] && it[side].text, `item ${it.id} ${side}.text`);
      assert.ok(it[side].translit, `item ${it.id} ${side}.translit (pronunciation aid)`);
      assert.ok(it[side].audio, `item ${it.id} ${side}.audio slot present (Mo-gated recording)`);
    }
  }
});

test('every item has a caregiver read-aloud line in fa/en/de', () => {
  for (const it of pack.items) {
    for (const lang of ['fa', 'en', 'de']) {
      assert.ok(it.caregiver && it.caregiver[lang] && it.caregiver[lang].length > 0, `item ${it.id} caregiver.${lang}`);
    }
  }
});

/* =====================================================================
 * PICTURES — every pack `pic` maps to a real inline SVG (offline, no assets)
 * ===================================================================== */
test('every item pic has an inline SVG in the picture library', () => {
  for (const it of pack.items) {
    assert.ok(PICTURES[it.pic], `PICTURES["${it.pic}"] exists for item ${it.id}`);
    const svg = pictureFor(it.pic);
    assert.ok(/^<svg[\s>]/.test(svg.trim()), `pictureFor("${it.pic}") returns an <svg>`);
  }
});

test('pictureFor falls back to a gentle "?" for an unknown key', () => {
  const svg = pictureFor('___nope___');
  assert.ok(/^<svg[\s>]/.test(svg.trim()));
});

/* =====================================================================
 * CORE LOGIC — rounds, tap scoring, progress (pure, deterministic RNG)
 * ===================================================================== */
// deterministic RNG so tests are stable
function seededRnd(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

test('buildRounds: one round per item, correct answer in choices', () => {
  const rounds = core.buildRounds(pack, 3, seededRnd(1));
  assert.equal(rounds.length, pack.items.length);
  for (const r of rounds) {
    assert.ok(r.choices.includes(r.answer), 'the correct picture is among the choices');
    assert.equal(r.choices.length, 3, '3 choices per round');
    assert.equal(new Set(r.choices).size, r.choices.length, 'choices are distinct');
  }
});

test('buildRounds clamps choiceCount to available items (never crashes)', () => {
  const tiny = { items: pack.items.slice(0, 2) };
  const rounds = core.buildRounds(tiny, 5, seededRnd(2));
  assert.equal(rounds[0].choices.length, 2, 'cannot show more choices than items exist');
});

test('newSession + applyTap(correct) advances; applyTap(wrong) stays', () => {
  let s = core.newSession(pack, 3, seededRnd(3));
  assert.equal(s.idx, 0);
  const round0 = s.rounds[0];
  const wrong = round0.choices.find((c) => c !== round0.answer);
  s = core.applyTap(s, wrong);
  assert.equal(s.idx, 0, 'a wrong tap does NOT advance');
  assert.equal(s.correct, 0);
  s = core.applyTap(s, round0.answer);
  assert.equal(s.idx, 1, 'a correct tap advances');
  assert.equal(s.correct, 1);
});

test('applyTap does not mutate the input session (pure)', () => {
  const s = core.newSession(pack, 3, seededRnd(4));
  const snap = JSON.stringify({ idx: s.idx, correct: s.correct, attempts: s.attempts });
  core.applyTap(s, s.rounds[0].answer);
  assert.equal(JSON.stringify({ idx: s.idx, correct: s.correct, attempts: s.attempts }), snap, 'input unchanged');
});

test('a full correct run reaches done with progress 1', () => {
  let s = core.newSession(pack, 3, seededRnd(5));
  while (!s.done) s = core.applyTap(s, s.rounds[s.idx].answer);
  assert.equal(s.done, true);
  assert.equal(s.correct, pack.items.length, 'every item answered correctly');
  assert.equal(core.progress(s), 1, 'progress is full');
});

test('progress is monotonic 0 -> 1 across a correct run', () => {
  let s = core.newSession(pack, 3, seededRnd(6));
  let last = core.progress(s);
  assert.equal(last, 0);
  while (!s.done) {
    s = core.applyTap(s, s.rounds[s.idx].answer);
    const p = core.progress(s);
    assert.ok(p >= last, 'progress never goes backwards');
    last = p;
  }
});

/* =====================================================================
 * summary
 * ===================================================================== */
console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
if (failed > 0) {
  for (const f of failures) { console.log('\nFAILED: ' + f.name); console.log(f.err && f.err.stack ? f.err.stack : f.err); }
  process.exit(1);
}
process.exit(0);
