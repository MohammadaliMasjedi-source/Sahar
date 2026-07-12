/* Sahar — profiles.js
 * Local-first CHILD PROFILES (SAHAR-V3 CORE slice #1, feature 1) + the
 * per-profile GARDEN progress ledger (feature 2). Same house shape as
 * bootstrap-core.js / app.js's Leitner core: a UI-free CORE (pure functions,
 * headless-testable) plus PROVIDERS that are the only thing touching
 * localStorage (house principle #2 — provider boundary; #3 — writes vs reads).
 *
 * DSGVO / privacy: everything below reads/writes localStorage ONLY. No
 * fetch(), no XHR, no beacon — a child's name/age/avatar never leaves the
 * device. A name is optional and never required to be typed by the child
 * (a caregiver types it, or it is left blank and the avatar+color is the
 * only identity a pre-literate child needs).
 *
 * Secular by rule (re-checked against ARCHITECTURE.md §10 / this project's
 * own hard rule): every avatar below is a dawn-bird or a plain secular
 * nature/animal shape already in mascot.js / pictures.js. No religious,
 * national, or political symbol of any kind.
 */
'use strict';

/** The small, warm, secular avatar set a pre-literate child chooses from.
 *  Each entry reuses an EXISTING house drawing (mascot.js's dawn-bird, or a
 *  pictures.js glyph) so no new art system is introduced — and pairs it with
 *  a distinct color token so a child can find "their" avatar by color alone
 *  even before they'd recognize the shape. */
/* Design-critic fix (score 74/100, re-review pass): SaharMascot.svg() (the
 * dawn-bird) has NO background rect of its own (unlike every pictures.js
 * glyph, which paints one) — on a tile whose --tile-color equalled the
 * bird's own amber fill, the bird went near-invisible. Giving it `--dusk`
 * (a dark indigo, unique among this set) both fixes the contrast AND, as a
 * side effect, un-clashes it from `cat`, which used to share that same
 * amber hex. `cat` moved to `--rose` so no two avatars share a color. */
const AVATARS = [
  { id: 'dawnbird', pic: null,   color: 'var(--dusk)' }, // SaharMascot.svg() — dark backdrop so the amber bird reads clearly
  { id: 'leaf',     pic: 'leaf', color: 'var(--good)' },
  { id: 'fish',     pic: 'fish', color: '#4db6e6' },
  { id: 'cat',      pic: 'cat',  color: 'var(--rose)' },
  { id: 'star',     pic: 'star', color: 'var(--gold)' },
  { id: 'moon',     pic: 'moon', color: '#c9b6ff' }
];
const DEFAULT_AVATAR = AVATARS[0].id;

/** Age bands — a caregiver picks one when adding a child (not the child).
 *  SAHAR-V3 CORE slice #2 (age-band packaging): refines wave-14c lane G's
 *  placeholder 3-band scheme ('3-5'/'6-8'/'9+') into the V3 charter's four
 *  bands. This is also exactly what app.js's pack shelf keys off of, so a
 *  profile's band and the packs it sees always agree. */
const AGE_BANDS = ['6-8', '8-10', '10-12', '12-14'];
const DEFAULT_AGE_BAND = AGE_BANDS[0];

/** Small, secular, color+icon "growth stage" identity per band — same
 *  color-alone-selectability spirit as AVATARS above, reusing EXISTING
 *  pictures.js glyphs (no new art system). Consumed by app.js's band bar
 *  and its "packs coming soon" scaffold. */
const BAND_META = {
  '6-8':   { pic: 'garden', color: 'var(--good)' },
  '8-10':  { pic: 'sun',    color: 'var(--gold)' },
  '10-12': { pic: 'tree',   color: '#4db6e6' },
  '12-14': { pic: 'dawn',   color: 'var(--rose)' }
};

/** A profile created under wave-14c's pre-charter 3-band scheme may still
 *  exist on a device with ageBand '3-5' or '9+' — values the charter's
 *  4-band scheme no longer offers as a choice. Read-side ONLY (never
 *  offered in the add/edit UI): lets an old profile keep resolving to a
 *  sensible charter band instead of silently losing its band. */
const LEGACY_AGE_BAND_MAP = { '3-5': '6-8', '9+': '10-12' };

function isValidAvatar(id) { return AVATARS.some((a) => a.id === id); }
function isValidAgeBand(b) { return AGE_BANDS.indexOf(b) !== -1; }

/** Resolve ANY stored ageBand (current charter band, legacy wave-14c value,
 *  or garbage) to one of the four charter bands. Never throws, never
 *  returns an unrecognised value — every consumer (pack selection, the band
 *  bar) can trust this always returns a real, displayable band. */
function normalizeAgeBand(b) {
  if (isValidAgeBand(b)) return b;
  if (LEGACY_AGE_BAND_MAP[b]) return LEGACY_AGE_BAND_MAP[b];
  return DEFAULT_AGE_BAND;
}

/** A reasonably unique, dependency-free id. Injectable for deterministic tests. */
function makeProfileId() {
  return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

/** Pure: build a new profile record from caregiver input. Never throws on bad
 *  input — falls back to safe defaults so a malformed form never corrupts
 *  storage. Name is optional and trimmed/length-capped (a display label only,
 *  never required, never used as a login). */
function createProfile(input, idFn) {
  const src = input || {};
  const id = (idFn || makeProfileId)();
  const name = typeof src.name === 'string' ? src.name.trim().slice(0, 40) : '';
  return {
    id,
    name,
    ageBand: isValidAgeBand(src.ageBand) ? src.ageBand : DEFAULT_AGE_BAND,
    avatar: isValidAvatar(src.avatar) ? src.avatar : DEFAULT_AVATAR,
    createdAt: new Date().toISOString().slice(0, 10)
  };
}

/* =========================================================================
 * PROVIDER — ProfileProvider. Prototype = localStorage (on-device only, per
 * ARCHITECTURE.md §8: no accounts, nothing leaves the device).
 * ========================================================================= */
const PROFILES_KEY = 'sahar.profiles.v1';

const ProfileProvider = {
  _read() {
    try {
      const raw = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
      return {
        profiles: Array.isArray(raw.profiles) ? raw.profiles : [],
        activeId: raw.activeId || null
      };
    } catch (_) { return { profiles: [], activeId: null }; }
  },
  _write(data) {
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(data)); } catch (_) {}
  },
  /** All profiles on this device, in the order they were added. */
  list() { return this._read().profiles; },
  get(id) { return this.list().find((p) => p.id === id) || null; },
  /** Add a child (caregiver action). The new profile becomes active
   *  immediately, so the phone is handed straight to the right child. */
  add(input) {
    const data = this._read();
    const profile = createProfile(input);
    data.profiles.push(profile);
    data.activeId = profile.id;
    this._write(data);
    return profile;
  },
  getActiveId() { return this._read().activeId; },
  setActiveId(id) {
    const data = this._read();
    data.activeId = id;
    this._write(data);
  },
  /** Change an EXISTING profile's age band (caregiver action, via the band
   *  bar on the lesson shelf — SAHAR-V3 CORE slice #2). Ignored (returns
   *  null) for an unknown profile id or an invalid band, so a malformed tap
   *  never corrupts storage. */
  setAgeBand(id, band) {
    if (!isValidAgeBand(band)) return null;
    const data = this._read();
    const profile = data.profiles.find((p) => p.id === id);
    if (!profile) return null;
    profile.ageBand = band;
    this._write(data);
    return profile;
  }
};

/* =========================================================================
 * PROVIDER — GardenProvider. Per-profile, per-device visual-progress ledger
 * (feature 2). Namespaced by profileId so siblings never see each other's
 * garden. Commands (a lesson pack completed) flow IN and mutate this store;
 * nothing here is ever read back into lesson CONTENT (house principle #3).
 * ========================================================================= */
const GARDEN_KEY = 'sahar.garden.v1';

const GardenProvider = {
  _read() {
    try { return JSON.parse(localStorage.getItem(GARDEN_KEY) || '{}'); }
    catch (_) { return {}; }
  },
  _write(all) {
    try { localStorage.setItem(GARDEN_KEY, JSON.stringify(all)); } catch (_) {}
  },
  /** This profile's raw ledger: how many times each pack has been completed. */
  load(profileId) {
    const all = this._read();
    return all[profileId] || { packsCompleted: {} };
  },
  /** Record one full completion of `packId` for `profileId` (a "bloom"). */
  recordCompletion(profileId, packId) {
    if (!profileId || !packId) return null;
    const all = this._read();
    const g = all[profileId] || { packsCompleted: {} };
    g.packsCompleted[packId] = (g.packsCompleted[packId] || 0) + 1;
    all[profileId] = g;
    this._write(all);
    return g;
  },
  /** How many DISTINCT packs this profile has completed at least once —
   *  the number that drives the garden's bloom count. */
  distinctCompletedCount(profileId) {
    if (!profileId) return 0;
    return Object.keys(this.load(profileId).packsCompleted).length;
  }
};

/* Headless export (house principle #8: core testable without a DOM). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AVATARS, DEFAULT_AVATAR, AGE_BANDS, DEFAULT_AGE_BAND, BAND_META, LEGACY_AGE_BAND_MAP,
    isValidAvatar, isValidAgeBand, normalizeAgeBand, createProfile, makeProfileId,
    ProfileProvider, GardenProvider, PROFILES_KEY, GARDEN_KEY
  };
}
if (typeof window !== 'undefined') {
  window.SaharProfiles = {
    AVATARS, DEFAULT_AVATAR, AGE_BANDS, DEFAULT_AGE_BAND, BAND_META, LEGACY_AGE_BAND_MAP,
    isValidAvatar, isValidAgeBand, normalizeAgeBand, createProfile, makeProfileId,
    ProfileProvider, GardenProvider
  };
}
