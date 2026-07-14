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
const { AGE_BANDS } = require('../profiles.js'); // the four charter bands — the manifest must cover exactly these

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

/* =====================================================================
 * MANIFEST — the single source of truth for which packs exist and which
 * charter age band each belongs to (content/packs.manifest.json). app.js
 * (shelf) and sw.js (offline precache) read the same file, so validating it
 * here is what keeps all three from silently drifting. The per-pack content
 * checks below run over the pack list DERIVED from this manifest — never a
 * second hardcoded list.
 * ===================================================================== */
const MANIFEST_PATH = path.join(CONTENT_DIR, 'packs.manifest.json');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

test('packs.manifest.json: parses and declares a schemaVersion + bands[]', () => {
  assert.equal(typeof manifest.schemaVersion, 'number', 'schemaVersion is a number');
  assert.ok(Array.isArray(manifest.bands) && manifest.bands.length > 0, 'bands is a non-empty array');
});

test('packs.manifest.json: bands are EXACTLY the four charter age bands (profiles.js AGE_BANDS), in order', () => {
  const bandIds = manifest.bands.map((b) => b.band);
  assert.deepEqual(bandIds, AGE_BANDS,
    `manifest bands ${JSON.stringify(bandIds)} must match profiles.js AGE_BANDS ${JSON.stringify(AGE_BANDS)} exactly (every band has a slot, even empty ones)`);
});

test('packs.manifest.json: the priority band 6-8 has real content (charter: 6-8 ships first)', () => {
  const b68 = manifest.bands.find((b) => b.band === '6-8');
  assert.ok(b68 && Array.isArray(b68.packs) && b68.packs.length > 0, 'band 6-8 must have at least one pack');
});

test('packs.manifest.json: every band declares a valid curriculumTier (1-4) and a packs[] array', () => {
  for (const b of manifest.bands) {
    assert.ok(Number.isInteger(b.curriculumTier) && b.curriculumTier >= 1 && b.curriculumTier <= 4,
      `band ${b.band} curriculumTier must be an integer 1-4`);
    assert.ok(Array.isArray(b.packs), `band ${b.band} must declare a packs[] array (empty is allowed)`);
  }
});

/* Every pack entry the manifest lists, flattened, with its band tag. */
const MANIFEST_PACKS = manifest.bands.flatMap((b) => (b.packs || []).map((p) => ({ ...p, band: b.band })));

test('packs.manifest.json: every pack entry has id/file/pic, a resolvable pic, and an on-disk file whose packId matches', () => {
  for (const p of MANIFEST_PACKS) {
    assert.ok(p.id && p.file && p.pic, `manifest pack ${JSON.stringify(p)} needs id, file and pic`);
    assert.ok(PICTURES[p.pic], `manifest pack "${p.id}" shelf pic "${p.pic}" must exist in the picture library`);
    const full = path.join(CONTENT_DIR, p.file);
    assert.ok(fs.existsSync(full), `manifest pack "${p.id}" file "${p.file}" must exist on disk`);
    const packJson = JSON.parse(fs.readFileSync(full, 'utf8'));
    assert.equal(packJson.packId, p.id, `pack file "${p.file}" packId "${packJson.packId}" must match its manifest id "${p.id}"`);
  }
});

test('packs.manifest.json: pack ids and files are unique across ALL bands', () => {
  const ids = MANIFEST_PACKS.map((p) => p.id);
  const files = MANIFEST_PACKS.map((p) => p.file);
  assert.equal(new Set(ids).size, ids.length, 'no duplicate pack id across bands');
  assert.equal(new Set(files).size, files.length, 'no duplicate pack file across bands');
});

test('packs.manifest.json: no ORPHAN packs — every card pack file in content/ is listed in the manifest', () => {
  // Card packs are t1-*.json + tier1-demo.json; language-course lc-*.json is a
  // different pedagogy and is deliberately outside the band manifest.
  const onDisk = fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'packs.manifest.json' && !f.startsWith('lc-'));
  const listed = new Set(MANIFEST_PACKS.map((p) => p.file));
  for (const f of onDisk) {
    assert.ok(listed.has(f), `content/${f} is a card pack but is NOT listed in packs.manifest.json (orphan — add it to a band or move/remove it)`);
  }
});

test('packs.manifest.json: every EMPTY band is a defined shell — declares a curriculum preview complete in fa/en/de', () => {
  // Charter feature 8: 8-10/10-12/12-14 = "defined but empty shells WITH their
  // curriculum maps". An empty band must therefore carry a preview so the app
  // shows what it WILL cover, never a blank "coming soon" screen. A band that
  // already ships packs needs no preview (it shows the real shelf).
  for (const b of manifest.bands) {
    const empty = !Array.isArray(b.packs) || b.packs.length === 0;
    if (empty) {
      assert.ok(b.preview && typeof b.preview === 'object',
        `empty band ${b.band} must declare a "preview" (its curriculum map) so it is a defined shell, not blank`);
    }
    if (!b.preview) continue; // a band with packs may omit it
    for (const lang of LANGS) {
      assert.ok(Array.isArray(b.preview[lang]) && b.preview[lang].length > 0,
        `band ${b.band} preview.${lang} must be a non-empty array of subject headings`);
      for (const topic of b.preview[lang]) {
        assert.ok(typeof topic === 'string' && topic.trim().length > 0,
          `band ${b.band} preview.${lang} entries must be non-empty strings`);
      }
    }
    // fa/en/de are parallel content — same number of topic headings each.
    assert.equal(b.preview.fa.length, b.preview.en.length,
      `band ${b.band} preview fa/en must have the same number of topics`);
    assert.equal(b.preview.fa.length, b.preview.de.length,
      `band ${b.band} preview fa/de must have the same number of topics`);
  }
});

/* The per-pack content checks below run over exactly what the manifest ships. */
const PACK_FILES = MANIFEST_PACKS.map((p) => p.file);

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
    // A glyph may be a single string (letter/number, shown to every language) OR
    // a localized {fa,en,de} dict (a word to READ in the learner's own script).
    // If it's a dict, every declared language must be present and non-empty.
    if (c.glyph && typeof c.glyph === 'object') {
      for (const lang of LANGS) assert.ok(typeof c.glyph[lang] === 'string' && c.glyph[lang].trim().length > 0,
        `${label}: choice "${c.id}" localized glyph must be non-empty in ${lang}`);
    }
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
    assert.ok(['placeholder', 'draft'].includes(pack.audioStatus),
      'audioStatus must be honestly "placeholder" (no audio yet) or "draft" (machine-voice files exist, not real recordings)');
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

  test(`${file}: every card has an honest, non-lying audio state (audioPending OR a real audioDraft file)`, () => {
    for (const card of pack.cards) {
      const pending = card.audioPending === true;
      const draft = card.audioDraft === true;
      assert.ok(pending || draft,
        `card ${card.id} must declare audioPending:true (no audio yet) or audioDraft:true (machine-voice file exists) — never neither`);
      assert.ok(!(pending && draft),
        `card ${card.id} cannot be both audioPending and audioDraft at once — pick the honest one`);
      if (draft) {
        assert.ok(card.audio && typeof card.audio.fa === 'string' && card.audio.fa.length > 0,
          `card ${card.id}: audioDraft:true requires a declared audio.fa ref`);
        const absPath = path.join(CONTENT_DIR, '..', card.audio.fa);
        assert.ok(fs.existsSync(absPath),
          `card ${card.id}: declared audio.fa file must actually exist on disk (${card.audio.fa}) — no lying about audio state`);
        assert.ok(fs.statSync(absPath).size > 0, `card ${card.id}: audio.fa file must be nonzero bytes`);
      }
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
