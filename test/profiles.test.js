/* Sahar — headless tests for profiles.js (SAHAR-V3 CORE slice #1).
 * Pure node, no framework (node:assert only), same style as core.test.js /
 * bootstrap.test.js. Covers:
 *   - the pure CORE (createProfile, avatar/age-band validation, secular avatar set)
 *   - ProfileProvider round-tripping through a localStorage shim
 *   - GardenProvider per-profile isolation + distinct-completion counting
 *
 * profiles.js touches only `module`/`window`/`localStorage`, so it loads
 * cleanly under node with the same tiny shims core.test.js already uses.
 *
 * Run:  node test/profiles.test.js
 */
'use strict';

const assert = require('node:assert/strict');

globalThis.window = globalThis.window || {}; // harmless target for the browser-global assignment

/* ---- mock localStorage (same shape as core.test.js's shim) ---- */
function makeMockLocalStorage() {
  const store = new Map();
  return {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); },
    removeItem(k) { store.delete(k); },
    clear() { store.clear(); }
  };
}
globalThis.localStorage = makeMockLocalStorage();

const {
  AVATARS, DEFAULT_AVATAR, AGE_BANDS, DEFAULT_AGE_BAND, BAND_META, LEGACY_AGE_BAND_MAP,
  isValidAvatar, isValidAgeBand, normalizeAgeBand, createProfile,
  ProfileProvider, GardenProvider
} = require('../profiles.js');

let passed = 0, failed = 0;
const failures = [];
function test(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (err) { failed++; failures.push({ name, err }); console.log('  FAIL ' + name + '  -> ' + (err && err.message)); }
}

console.log('Sahar PROFILES tests\n');

/* =====================================================================
 * 1. secular avatar set (SAHAR-V3 CORE hard rule — re-checked here so a
 *    future edit that adds a religious/national/political glyph fails CI).
 * ===================================================================== */
const BANNED_TERMS = /hijab|scarf|cross|crescent|star.?of.?david|flag|nation|religio|prayer|church|mosque|temple|god|allah|jesus/i;

test('AVATARS is a non-empty small set (a pre-literate child can scan it at a glance)', () => {
  assert.ok(Array.isArray(AVATARS) && AVATARS.length >= 3 && AVATARS.length <= 8);
});

test('every avatar id is secular by name (no religious/national/political terms)', () => {
  for (const a of AVATARS) {
    assert.ok(!BANNED_TERMS.test(a.id), `avatar id "${a.id}" must not reference religion/nation/politics`);
  }
});

test('every avatar declares a distinct color token (color-alone selectability)', () => {
  const colors = AVATARS.map((a) => a.color);
  assert.equal(new Set(colors).size, colors.length, 'avatar colors must be unique');
  for (const c of colors) assert.ok(typeof c === 'string' && c.length > 0);
});

test('DEFAULT_AVATAR is a real avatar id', () => {
  assert.ok(isValidAvatar(DEFAULT_AVATAR));
});

test('AGE_BANDS is a small ordered set and DEFAULT_AGE_BAND is one of them', () => {
  assert.ok(Array.isArray(AGE_BANDS) && AGE_BANDS.length >= 2);
  assert.ok(isValidAgeBand(DEFAULT_AGE_BAND));
});

/* =====================================================================
 * 1b. SAHAR-V3 CORE slice #2 (age-band packaging) — the charter's four
 *     bands, their band-bar identity, and legacy-value normalization.
 * ===================================================================== */
test('AGE_BANDS is exactly the V3 charter\'s four bands, in order', () => {
  assert.deepEqual(AGE_BANDS, ['6-8', '8-10', '10-12', '12-14']);
});

test('every AGE_BAND has a BAND_META entry with a real picture + a color token', () => {
  const { PICTURES } = require('../pictures.js');
  for (const b of AGE_BANDS) {
    const meta = BAND_META[b];
    assert.ok(meta, `BAND_META must cover band "${b}"`);
    assert.ok(PICTURES[meta.pic], `BAND_META["${b}"].pic "${meta.pic}" must exist in the picture library`);
    assert.ok(typeof meta.color === 'string' && meta.color.length > 0);
  }
});

test('BAND_META colors are unique per band (color-alone selectability, same rule as AVATARS)', () => {
  const colors = AGE_BANDS.map((b) => BAND_META[b].color);
  assert.equal(new Set(colors).size, colors.length, 'band colors must be unique');
});

test('normalizeAgeBand passes a valid charter band through unchanged', () => {
  for (const b of AGE_BANDS) assert.equal(normalizeAgeBand(b), b);
});

test('normalizeAgeBand maps wave-14c legacy bands to a real charter band', () => {
  for (const [legacy, mapped] of Object.entries(LEGACY_AGE_BAND_MAP)) {
    assert.equal(normalizeAgeBand(legacy), mapped);
    assert.ok(isValidAgeBand(mapped), 'the mapped-to value must itself be a valid charter band');
  }
});

test('normalizeAgeBand falls back to DEFAULT_AGE_BAND for garbage/unknown input — edge case', () => {
  assert.equal(normalizeAgeBand('not-a-band'), DEFAULT_AGE_BAND);
  assert.equal(normalizeAgeBand(undefined), DEFAULT_AGE_BAND);
  assert.equal(normalizeAgeBand(null), DEFAULT_AGE_BAND);
});

/* =====================================================================
 * 2. createProfile() — pure, defensive, never throws on bad input
 * ===================================================================== */
test('createProfile fills in a valid id/avatar/ageBand from good input', () => {
  const p = createProfile({ name: 'Zahra', ageBand: '6-8', avatar: 'leaf' }, () => 'fixed-id');
  assert.equal(p.id, 'fixed-id');
  assert.equal(p.name, 'Zahra');
  assert.equal(p.ageBand, '6-8');
  assert.equal(p.avatar, 'leaf');
  assert.match(p.createdAt, /^\d{4}-\d{2}-\d{2}$/);
});

test('createProfile falls back to safe defaults on an invalid avatar/ageBand — edge case', () => {
  const p = createProfile({ name: 'X', ageBand: 'not-a-band', avatar: 'not-a-real-avatar' }, () => 'id2');
  assert.equal(p.avatar, DEFAULT_AVATAR);
  assert.equal(p.ageBand, DEFAULT_AGE_BAND);
});

test('createProfile never requires a name — a blank/omitted name is valid (pre-literate, no typing required)', () => {
  const p1 = createProfile({ ageBand: '8-10', avatar: 'star' }, () => 'id3');
  assert.equal(p1.name, '');
  const p2 = createProfile(undefined, () => 'id4');
  assert.equal(p2.name, '');
  assert.equal(p2.avatar, DEFAULT_AVATAR);
});

test('createProfile trims and caps an overlong name (defensive, never corrupts storage)', () => {
  const p = createProfile({ name: '  ' + 'a'.repeat(200) + '  ', ageBand: '12-14', avatar: 'moon' }, () => 'id5');
  assert.ok(p.name.length <= 40, 'name must be capped');
  assert.equal(p.name[0], 'a', 'must be trimmed, not left with leading whitespace');
});

test('createProfile does not mutate its input (pure)', () => {
  const input = { name: 'Y', ageBand: '6-8', avatar: 'cat' };
  const snapshot = JSON.stringify(input);
  createProfile(input, () => 'id6');
  assert.equal(JSON.stringify(input), snapshot);
});

/* =====================================================================
 * 3. ProfileProvider — round-trips through the localStorage shim
 * ===================================================================== */
test('ProfileProvider starts empty with no active profile', () => {
  globalThis.localStorage.clear();
  assert.deepEqual(ProfileProvider.list(), []);
  assert.equal(ProfileProvider.getActiveId(), null);
});

test('ProfileProvider.add() persists a profile and makes it active', () => {
  globalThis.localStorage.clear();
  const p = ProfileProvider.add({ name: 'Nilab', ageBand: '6-8', avatar: 'fish' });
  assert.equal(ProfileProvider.list().length, 1);
  assert.equal(ProfileProvider.getActiveId(), p.id);
  assert.deepEqual(ProfileProvider.get(p.id), p);
});

test('ProfileProvider supports multiple sibling profiles independently', () => {
  globalThis.localStorage.clear();
  const a = ProfileProvider.add({ name: 'Sibling A', ageBand: '6-8', avatar: 'star' });
  const b = ProfileProvider.add({ name: 'Sibling B', ageBand: '10-12', avatar: 'moon' });
  assert.equal(ProfileProvider.list().length, 2);
  assert.equal(ProfileProvider.getActiveId(), b.id, 'the most-recently-added child becomes active');
  ProfileProvider.setActiveId(a.id);
  assert.equal(ProfileProvider.getActiveId(), a.id, 'switching profiles updates the active id');
  assert.notEqual(a.id, b.id);
});

/* =====================================================================
 * 3b. ProfileProvider.setAgeBand — SAHAR-V3 CORE slice #2's band bar
 *     switches an EXISTING profile's band (not just at creation time).
 * ===================================================================== */
test('setAgeBand changes an existing profile\'s band and persists it', () => {
  globalThis.localStorage.clear();
  const p = ProfileProvider.add({ name: 'Zahra', ageBand: '6-8', avatar: 'leaf' });
  const updated = ProfileProvider.setAgeBand(p.id, '10-12');
  assert.equal(updated.ageBand, '10-12');
  assert.equal(ProfileProvider.get(p.id).ageBand, '10-12', 'the change must round-trip through storage');
});

test('setAgeBand is a no-op (never throws, never corrupts) for an unknown profile or invalid band — edge case', () => {
  globalThis.localStorage.clear();
  const p = ProfileProvider.add({ name: 'Zahra', ageBand: '6-8', avatar: 'leaf' });
  assert.equal(ProfileProvider.setAgeBand('no-such-id', '8-10'), null);
  assert.equal(ProfileProvider.setAgeBand(p.id, 'not-a-band'), null);
  assert.equal(ProfileProvider.get(p.id).ageBand, '6-8', 'an invalid band must never overwrite the real one');
});

/* =====================================================================
 * 4. GardenProvider — per-profile isolation + distinct-completion counting
 * ===================================================================== */
test('GardenProvider starts at zero blooms for an unknown profile', () => {
  globalThis.localStorage.clear();
  assert.equal(GardenProvider.distinctCompletedCount('nobody'), 0);
});

test('recordCompletion grows the distinct count once per distinct pack', () => {
  globalThis.localStorage.clear();
  GardenProvider.recordCompletion('child-1', 'pack-a');
  assert.equal(GardenProvider.distinctCompletedCount('child-1'), 1);
  GardenProvider.recordCompletion('child-1', 'pack-b');
  assert.equal(GardenProvider.distinctCompletedCount('child-1'), 2);
  // completing the SAME pack again must not inflate the distinct count
  GardenProvider.recordCompletion('child-1', 'pack-a');
  assert.equal(GardenProvider.distinctCompletedCount('child-1'), 2, 'repeat completion does not double-count distinct packs');
});

test('GardenProvider keeps sibling gardens fully isolated — the DoD "switch profile switches progress" contract', () => {
  globalThis.localStorage.clear();
  GardenProvider.recordCompletion('child-A', 'pack-a');
  GardenProvider.recordCompletion('child-A', 'pack-b');
  GardenProvider.recordCompletion('child-B', 'pack-a');
  assert.equal(GardenProvider.distinctCompletedCount('child-A'), 2);
  assert.equal(GardenProvider.distinctCompletedCount('child-B'), 1, 'sibling B never inherits sibling A\'s blooms');
});

test('GardenProvider.recordCompletion is a no-op (never throws) for a missing profileId/packId — edge case', () => {
  globalThis.localStorage.clear();
  assert.doesNotThrow(() => GardenProvider.recordCompletion(null, 'pack-a'));
  assert.doesNotThrow(() => GardenProvider.recordCompletion('child-1', null));
  assert.equal(GardenProvider.distinctCompletedCount('child-1'), 0);
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
