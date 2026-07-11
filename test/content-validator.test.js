/* Sahar — content validator for the Tier-1 audio-first / picture-first packs
 * (SAHAR-COVERAGE §6.5 A). Pure node, no framework (node:assert only), same
 * style as core.test.js / bootstrap.test.js.
 *
 * This is the gate the task asked for: "no pack ships that fails it". It
 * checks, across EVERY card-based Tier-1 pack in content/:
 *   - valid JSON, unique card ids within the pack
 *   - every declared language (fa/en/de) present and non-empty on every
 *     translated field (title, intro, prompt, answer, caregiver, audioNote)
 *   - every card's `interaction` is one of the four that NEVER require the
 *     child to read: tap-the-picture, tap-the-letter-shape, match, repeat-aloud
 *   - every card declares `audioPending: true` (today's honest state) OR an
 *     `audio` ref — never silently neither
 *   - every card carries a caregiver read-aloud line in fa/en/de
 *   - choice-bearing interactions have >=2 choices, unique choice ids, and
 *     answerId (or each round's answerId, for "match") among those ids
 *   - every referenced `pic` key resolves to a real inline SVG (pictures.js)
 *
 * Run:  node test/content-validator.test.js
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

globalThis.window = globalThis.window || {}; // harmless target for pictures.js's browser-global assignment
const { PICTURES } = require('../pictures.js');

let passed = 0, failed = 0;
const failures = [];
function test(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (err) { failed++; failures.push({ name, err }); console.log('  FAIL ' + name + '  -> ' + (err && err.message)); }
}

console.log('Sahar CONTENT VALIDATOR (Tier-1 audio-first packs)\n');

const NON_READ_INTERACTIONS = ['tap-the-picture', 'tap-the-letter-shape', 'match', 'repeat-aloud'];
const LANGS = ['fa', 'en', 'de'];

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const PACK_FILES = [
  'tier1-demo.json',
  't1-literacy-first-letters.json',
  't1-numeracy-counting-0-20.json',
  't1-numeracy-shapes-patterns.json',
  't1-science-living-things.json',
  't1-thinking-what-is-a-question.json',
  't1-thinking-fact-vs-guess.json'
];

function nonEmpty(dict, lang, label) {
  assert.ok(dict && typeof dict[lang] === 'string' && dict[lang].trim().length > 0, `${label}.${lang} present and non-empty`);
}

function checkChoiceSet(choices, answerId, label) {
  assert.ok(Array.isArray(choices) && choices.length >= 2, `${label}: at least 2 choices`);
  const ids = choices.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, `${label}: choice ids unique`);
  for (const c of choices) {
    assert.ok(c.pic || c.glyph, `${label}: choice "${c.id}" has a pic or a glyph (never bare text-only)`);
    if (c.pic) assert.ok(PICTURES[c.pic], `${label}: choice "${c.id}" pic "${c.pic}" exists in the picture library`);
  }
  assert.ok(ids.includes(answerId), `${label}: answerId "${answerId}" is among the offered choices`);
}

for (const file of PACK_FILES) {
  const fullPath = path.join(CONTENT_DIR, file);

  test(`${file}: parses as JSON`, () => {
    const raw = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(raw); // throws if malformed
  });

  const pack = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  test(`${file}: declares lang fa/en/de + has cards`, () => {
    assert.deepEqual(pack.lang.slice().sort(), ['de', 'en', 'fa']);
    assert.ok(Array.isArray(pack.cards) && pack.cards.length > 0);
  });

  test(`${file}: pack-level title/intro complete in fa/en/de`, () => {
    for (const lang of LANGS) {
      nonEmpty(pack.title, lang, 'title');
      nonEmpty(pack.intro, lang, 'intro');
    }
  });

  test(`${file}: pack declares an honest audioStatus + audioNote in fa/en/de`, () => {
    assert.equal(pack.audioStatus, 'placeholder', 'audioStatus must be honestly "placeholder" (no real recordings shipped yet)');
    for (const lang of LANGS) nonEmpty(pack.audioNote, lang, 'audioNote');
  });

  test(`${file}: card ids are unique`, () => {
    const ids = pack.cards.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length, 'no duplicate card id in this pack');
  });

  test(`${file}: every card's prompt/answer/caregiver complete in fa/en/de`, () => {
    for (const card of pack.cards) {
      for (const lang of LANGS) {
        nonEmpty(card.prompt, lang, `card ${card.id} prompt`);
        nonEmpty(card.answer, lang, `card ${card.id} answer`);
        nonEmpty(card.caregiver, lang, `card ${card.id} caregiver`);
      }
    }
  });

  test(`${file}: every card has a non-read-dependent interaction`, () => {
    for (const card of pack.cards) {
      assert.ok(NON_READ_INTERACTIONS.includes(card.interaction),
        `card ${card.id} interaction "${card.interaction}" must be one of ${NON_READ_INTERACTIONS.join(', ')}`);
    }
  });

  test(`${file}: every card declares audioPending:true or an audio ref (never neither)`, () => {
    for (const card of pack.cards) {
      const hasPending = card.audioPending === true;
      const hasAudioRef = card.audio && Object.keys(card.audio).length > 0;
      assert.ok(hasPending || hasAudioRef, `card ${card.id} must declare audioPending:true or an audio ref`);
    }
  });

  test(`${file}: choice-bearing cards have a valid, resolvable choice set`, () => {
    for (const card of pack.cards) {
      if (card.interaction === 'match') {
        assert.ok(Array.isArray(card.rounds) && card.rounds.length >= 1, `card ${card.id} (match) has rounds`);
        card.rounds.forEach((round, i) => {
          checkChoiceSet(round.choices, round.answerId, `card ${card.id} round ${i}`);
          if (round.heroPic) assert.ok(PICTURES[round.heroPic], `card ${card.id} round ${i} heroPic "${round.heroPic}" exists`);
        });
      } else if (card.interaction === 'tap-the-picture' || card.interaction === 'tap-the-letter-shape') {
        checkChoiceSet(card.choices, card.answerId, `card ${card.id}`);
      } else if (card.interaction === 'repeat-aloud') {
        // open-ended by design — no forced choice, self-paced completion only
        assert.ok(!card.choices || card.choices.length === 0, `card ${card.id} (repeat-aloud) should not force a choice`);
      }
    }
  });
}

/* =====================================================================
 * summary
 * ===================================================================== */
console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
if (failed > 0) {
  for (const f of failures) { console.log('\nFAILED: ' + f.name); console.log(f.err && f.err.stack ? f.err.stack : f.err); }
  process.exit(1);
}
process.exit(0);
