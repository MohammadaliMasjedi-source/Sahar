/* Standalone validator for the teen critical-thinking pack.
 *
 * This pack is a NEW pedagogy (reader lessons for ages 13-16), not the
 * audio-first tap-card schema that test/content-validator.test.js checks. It is
 * DELIBERATELY not in content/ and not in content/packs.manifest.json (see the
 * pack's `status` / the folder README), so the Tier-1 validator neither sees it
 * nor should. This script is a lightweight, self-contained check that the pack
 * is structurally sound and complete in fa/en/de — run it by hand:
 *
 *   node packs/teen-critical-thinking/validate.js
 *
 * It is intentionally NOT wired into `npm test`, to keep the shipped gate exactly
 * as it was. When this pack is taken through the review gate and given a real
 * teen reader view, fold an equivalent check into the suite then.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const LANGS = ['fa', 'en', 'de'];
let passed = 0, failed = 0;
const failures = [];
function test(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (err) { failed++; failures.push({ name, err }); console.log('  FAIL ' + name + '  -> ' + (err && err.message)); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
function nonEmpty(dict, label) {
  assert(dict && typeof dict === 'object', label + ' must be an {fa,en,de} object');
  for (const l of LANGS) assert(typeof dict[l] === 'string' && dict[l].trim().length > 0, label + '.' + l + ' present and non-empty');
}

console.log('Sahar TEEN CRITICAL-THINKING pack validator\n');

const PACK_PATH = path.join(__dirname, 'teen-critical-thinking.pack.json');
const pack = JSON.parse(fs.readFileSync(PACK_PATH, 'utf8'));

test('pack: parses and declares lang fa/en/de + tier 4 + a non-empty lessons[]', () => {
  assert(pack.lang.slice().sort().join(',') === 'de,en,fa', 'lang must be exactly fa/en/de');
  assert(pack.tier === 4, 'tier must be 4');
  assert(Array.isArray(pack.lessons) && pack.lessons.length > 0, 'lessons[] non-empty');
});

test('pack: license is CC-BY-SA-4.0 and status marks it NOT shipped', () => {
  assert(pack.license === 'CC-BY-SA-4.0', 'content license must be CC-BY-SA-4.0');
  assert(typeof pack.status === 'string' && /NOT SHIPPED/i.test(pack.status), 'status must state NOT SHIPPED (pending the review gate)');
  assert(Array.isArray(pack.reviewGate) && pack.reviewGate.length >= 4, 'reviewGate must list the required gates');
});

test('pack: title/intro/localizationNote complete in fa/en/de', () => {
  nonEmpty(pack.title, 'title');
  nonEmpty(pack.intro, 'intro');
  nonEmpty(pack.localizationNote, 'localizationNote');
});

test('pack: lesson ids and slugs are unique', () => {
  const ids = pack.lessons.map((l) => l.id);
  const slugs = pack.lessons.map((l) => l.slug);
  assert(new Set(ids).size === ids.length, 'no duplicate lesson id');
  assert(new Set(slugs).size === slugs.length, 'no duplicate lesson slug');
});

for (const lesson of pack.lessons) {
  test(lesson.id + ' (' + lesson.slug + '): title/bigIdea/example/teaching complete in fa/en/de', () => {
    nonEmpty(lesson.title, lesson.id + ' title');
    nonEmpty(lesson.bigIdea, lesson.id + ' bigIdea');
    nonEmpty(lesson.example, lesson.id + ' example');
    nonEmpty(lesson.teaching, lesson.id + ' teaching');
  });

  test(lesson.id + ': has a 5-min exercise with instructions + >=3 items, each complete in fa/en/de', () => {
    const ex = lesson.exercise;
    assert(ex && typeof ex === 'object', 'exercise object present');
    nonEmpty(ex.instructions, lesson.id + ' exercise.instructions');
    assert(Array.isArray(ex.items) && ex.items.length >= 3, lesson.id + ' exercise needs >=3 items');
    const qids = ex.items.map((i) => i.id);
    assert(new Set(qids).size === qids.length, lesson.id + ' exercise item ids unique');
    for (const it of ex.items) nonEmpty(it.q, lesson.id + ' exercise item ' + it.id + ' q');
  });

  test(lesson.id + ': answer key covers every exercise item, complete in fa/en/de', () => {
    const qids = lesson.exercise.items.map((i) => i.id);
    const aids = lesson.answerKey.items.map((i) => i.id);
    assert(qids.length === aids.length, lesson.id + ' answerKey must have one answer per exercise item');
    for (const qid of qids) assert(aids.includes(qid), lesson.id + ' answerKey missing item ' + qid);
    for (const it of lesson.answerKey.items) nonEmpty(it.a, lesson.id + ' answerKey item ' + it.id + ' a');
  });

  test(lesson.id + ': records at least one licensed source', () => {
    assert(Array.isArray(lesson.sources) && lesson.sources.length >= 1, lesson.id + ' must record its source(s) + licence');
    for (const s of lesson.sources) assert(typeof s === 'string' && s.trim().length > 0, lesson.id + ' source entries must be non-empty strings');
  });
}

console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
if (failed > 0) {
  for (const f of failures) { console.log('\nFAILED: ' + f.name); console.log(f.err && f.err.message); }
  process.exit(1);
}
process.exit(0);
