/* Sahar — app.js
 * Clean-Architecture-ish in one file (prototype, honest): CORE (UI-free) below,
 * then PROVIDERS (swappable boundaries), then VIEW (render). The view never holds
 * domain logic; the Leitner core never touches the DOM.  No external network calls.
 */
'use strict';

/* =========================================================================
 * CORE — i18n strings (house principle #6: add a language = add a dict)
 * ========================================================================= */
const STRINGS = {
  fa: {
    dir: 'rtl',
    motto: 'یاد بگیر تا زندگی کنی، زندگی کن تا یاد بگیری.',
    greet: 'سلام! من سحرم.',
    greetSub: 'بیا با هم یاد بگیریم.',
    show: 'نشان بده',
    good: 'بلد بودم',
    again: 'دوباره',
    days: ' روز',
    rule: 'بلد بودی ← کارت دیرتر برمی‌گردد. دوباره ← فردا دوباره می‌بینی‌اش.',
    offline: 'آماده برای کار بدون اینترنت',
    doneTitle: 'آفرین!',
    doneSub: 'همه‌ی کارت‌های امروز تمام شد. سحر به تو افتخار می‌کند.',
    restart: 'دوباره تمرین کن',
    factOpinion: 'حقیقت یا نظر',
    counting: 'شمارش',
    letterSound: 'حرف و صدا',
    firstWords: 'واژه و تصویر',
    thinking: 'فکر کردن',
    science: 'نگاه و کشف',
    dayNight: 'روز و شب',
    guessCheck: 'حدس و امتحان',
    shapes: 'شکل و نقش',
    healthSafety: 'سلامت و ایمنی',
    pick: 'یک درس را انتخاب کن',
    plannedTopics: 'این گروه سنی یاد می‌گیرد:',
    listen: 'گوش کن',
    tapPrompt: 'کدام درست است؟ لمس کن.',
    tryAgain: 'دوباره امتحان کن',
    great: 'آفرین!',
    iSaidIt: 'گفتم!',
    caregiver: 'برای بزرگ‌ترها',
    whoIsLearning: 'کی می‌خواهد یاد بگیرد؟',
    addChild: 'افزودن کودک',
    addChildHint: '(این بخش برای بزرگ‌ترهاست)',
    childName: 'نام',
    optional: 'اختیاری',
    ageBand: 'گروه سنی',
    chooseAvatar: 'یک شکل را انتخاب کن',
    saveChild: 'ذخیره',
    gardenLabel: 'باغچه‌ی تو',
    switchProfile: 'تغییر کاربر'
  },
  en: {
    dir: 'ltr',
    motto: 'Learn to live, live to learn.',
    greet: 'Hi! I am Sahar.',
    greetSub: "Let's learn together.",
    show: 'Show me',
    good: 'Got it',
    again: 'Again',
    days: ' days',
    rule: 'Got it → the card waits longer. Again → you see it tomorrow.',
    offline: 'offline-ready',
    doneTitle: 'Well done!',
    doneSub: "You've cleared today's cards. Sahar is proud of you.",
    restart: 'Practice again',
    factOpinion: 'Fact or opinion',
    counting: 'Counting',
    letterSound: 'Letter & sound',
    firstWords: 'Word & picture',
    thinking: 'Thinking',
    science: 'Look & discover',
    dayNight: 'Day & night',
    guessCheck: 'Guess & check',
    shapes: 'Shapes & patterns',
    healthSafety: 'Health & safety',
    pick: 'Pick a lesson',
    plannedTopics: 'This age group will learn:',
    listen: 'Listen',
    tapPrompt: 'Which one is right? Tap it.',
    tryAgain: 'Try again',
    great: 'Great!',
    iSaidIt: 'I said it!',
    caregiver: 'For grown-ups',
    whoIsLearning: "Who's learning today?",
    addChild: 'Add a child',
    addChildHint: '(this part is for grown-ups)',
    childName: 'Name',
    optional: 'optional',
    ageBand: 'Age group',
    chooseAvatar: 'Pick a character',
    saveChild: 'Save',
    gardenLabel: 'Your garden',
    switchProfile: 'Switch profile'
  },
  de: {
    dir: 'ltr',
    motto: 'Lerne zu leben, lebe um zu lernen.',
    greet: 'Hallo! Ich bin Sahar.',
    greetSub: 'Lass uns zusammen lernen.',
    show: 'Zeig es mir',
    good: 'Gewusst',
    again: 'Nochmal',
    days: ' Tage',
    rule: 'Gewusst → die Karte wartet länger. Nochmal → du siehst sie morgen.',
    offline: 'offline bereit',
    doneTitle: 'Gut gemacht!',
    doneSub: 'Du hast die heutigen Karten geschafft. Sahar ist stolz auf dich.',
    restart: 'Nochmal üben',
    factOpinion: 'Tatsache oder Meinung',
    counting: 'Zählen',
    letterSound: 'Buchstabe & Klang',
    firstWords: 'Wort & Bild',
    thinking: 'Denken',
    science: 'Schauen & entdecken',
    dayNight: 'Tag & Nacht',
    guessCheck: 'Raten & prüfen',
    shapes: 'Formen & Muster',
    healthSafety: 'Gesundheit & Sicherheit',
    pick: 'Wähle eine Lektion',
    plannedTopics: 'Diese Altersgruppe lernt:',
    listen: 'Hören',
    tapPrompt: 'Welches ist richtig? Tippe darauf.',
    tryAgain: 'Nochmal versuchen',
    great: 'Super!',
    iSaidIt: 'Ich hab\'s gesagt!',
    caregiver: 'Für Erwachsene',
    whoIsLearning: 'Wer lernt heute?',
    addChild: 'Kind hinzufügen',
    addChildHint: '(dieser Teil ist für Erwachsene)',
    childName: 'Name',
    optional: 'optional',
    ageBand: 'Altersgruppe',
    chooseAvatar: 'Wähle einen Charakter',
    saveChild: 'Speichern',
    gardenLabel: 'Dein Garten',
    switchProfile: 'Profil wechseln'
  }
};

/* =========================================================================
 * CORE — the Leitner box engine (classic 5-box spaced repetition).
 * Pure functions, no DOM. boxes 1..5, intervals in days. Testable headless.
 * ========================================================================= */
const INTERVALS = [1, 2, 4, 9, 21]; // box 1..5 → days until due again

function todayISO(d) {
  return (d || new Date()).toISOString().slice(0, 10);
}
function addDaysISO(days, from) {
  const d = from ? new Date(from) : new Date();
  d.setDate(d.getDate() + days);
  return todayISO(d);
}
function isDue(card, today) {
  return !card.due || card.due <= (today || todayISO());
}
/** Apply a review answer. Returns a NEW card state (no mutation of input). */
function schedule(card, gotIt) {
  const c = Object.assign({}, card);
  if (gotIt) {
    c.box = Math.min((c.box || 1) + 1, INTERVALS.length); // climb
    c.reps = (c.reps || 0) + 1;
  } else {
    c.box = 1;                                            // fall back
    c.lapses = (c.lapses || 0) + 1;
  }
  c.due = addDaysISO(INTERVALS[c.box - 1]);
  return c;
}

/* =========================================================================
 * PROVIDERS — swappable boundaries (house principle #2). Mock-first, same shape.
 * ========================================================================= */

// ContentProvider: give me a pack. Prototype = bundled JSON (works offline).
const ContentProvider = {
  async getPack(path) {
    const res = await fetch(path);           // same-origin, cached by sw
    if (!res.ok) throw new Error('pack load failed: ' + path);
    const pack = await res.json();
    // DESIGNED (not built): verify pack.signature with the app's public key here.
    return pack;
  }
};

// ProgressProvider: load/save Leitner state. Prototype = localStorage (on device only).
// Namespaced per CHILD PROFILE (SAHAR-V3 CORE slice #1) so siblings sharing one
// device never see or overwrite each other's spaced-repetition progress. Falls
// back to the original un-namespaced key when no profile is active yet (e.g.
// headless tests, or a page load before the profile gate resolves) so this
// stays backward-compatible with the pre-profiles single-learner shape.
const PROGRESS_KEY_BASE = 'sahar.progress.v1';
const ProgressProvider = {
  _key() {
    return state.activeProfileId ? (PROGRESS_KEY_BASE + '.' + state.activeProfileId) : PROGRESS_KEY_BASE;
  },
  load() {
    try { return JSON.parse(localStorage.getItem(this._key()) || '{}'); }
    catch (_) { return {}; }
  },
  save(map) {
    try { localStorage.setItem(this._key(), JSON.stringify(map)); } catch (_) {}
  }
};

// I18nProvider: strings + direction for a language.
const I18nProvider = {
  t(lang, key) { return (STRINGS[lang] || STRINGS.en)[key]; },
  dir(lang) { return (STRINGS[lang] || STRINGS.en).dir; }
};

const KIND_KEY = {
  'fact-opinion': 'factOpinion',
  'counting': 'counting',
  'letter-sound': 'letterSound',
  'first-words': 'firstWords',
  'thinking': 'thinking',
  'science': 'science',
  'day-night': 'dayNight',
  'guess-check': 'guessCheck',
  'shapes': 'shapes',
  'health-safety': 'healthSafety'
};

/* PACKS — the bundled content shelf, built AT BOOT from the single-source
 * age-band manifest (content/packs.manifest.json), never hardcoded here.
 * Adding a band's content is therefore a pure-data edit of that one manifest
 * file (+ authoring the pack JSON) — no code change in this file, in the
 * validator, or in the service worker, which all read the same manifest.
 *
 * Each entry: { id, path, pic, band }. `band` (SAHAR-V3 CORE slice #2:
 * age-band packaging) is which of the charter's four bands the pack belongs
 * to; `path` is derived from the manifest's per-pack `file`. Stays empty
 * until loadPackManifest() runs (boot); headless core tests never touch it. */
const MANIFEST_PATH = './content/packs.manifest.json';
let PACKS = [];
/* Per-band curriculum preview (fa/en/de subject headings), keyed by band, read
 * from the same manifest. An empty band declares one so its "coming soon"
 * scaffold shows what it WILL cover — the charter's "defined shells WITH their
 * curriculum maps" — rather than a blank screen. Data only; no invented lessons. */
let BAND_PREVIEWS = {};

/** Load the age-band pack manifest and (re)build PACKS from it. The one place
 *  the shelf's contents are defined for the running app; the validator and
 *  service worker read the same JSON so the three can never silently drift.
 *  On failure returns false and leaves PACKS empty — the app then shows the
 *  honest "coming soon" scaffold rather than crashing (the manifest is part
 *  of the precached app shell, so this only degrades if the very first,
 *  online visit could not fetch it). */
async function loadPackManifest() {
  try {
    const res = await fetch(MANIFEST_PATH);
    if (!res.ok) throw new Error('manifest load failed: ' + res.status);
    const manifest = await res.json();
    const bands = Array.isArray(manifest.bands) ? manifest.bands : [];
    PACKS = bands.flatMap((b) => (b.packs || []).map((p) => ({
      id: p.id,
      path: './content/' + p.file,
      pic: p.pic,
      band: b.band
    })));
    BAND_PREVIEWS = {};
    bands.forEach((b) => { if (b.preview) BAND_PREVIEWS[b.band] = b.preview; });
    return true;
  } catch (err) {
    // Offline-first: this should never happen after the first visit (the
    // manifest is precached with the app shell). Fail loud but non-fatally.
    console.error('Sahar: could not load pack manifest —', err);
    PACKS = [];
    BAND_PREVIEWS = {};
    return false;
  }
}

/** All packs tagged for a given charter band (empty array for a band with no
 *  real content yet — that emptiness is what tells renderPicker() to show
 *  the honest "coming soon" scaffold instead of a shelf). */
function packsForBand(band) { return PACKS.filter((p) => p.band === band); }

/** The ACTIVE profile's charter band, normalized (never an invalid/legacy
 *  value) — the one place both the shelf and the band bar read from. Falls
 *  back to the default band when no profile is active (headless/boot edge). */
function activeAgeBand() {
  const P = window.SaharProfiles;
  if (!P) return '6-8';
  const profile = state.activeProfileId ? P.ProfileProvider.get(state.activeProfileId) : null;
  return P.normalizeAgeBand(profile && profile.ageBand);
}

/* Honest "packs coming soon" scaffold copy (SAHAR-V3 CORE slice #2) — shown
 * for any charter band with no real packs yet. Deliberately short and
 * icon/audio-first, never a text wall; the longer caregiver line is explicit
 * that nothing is invented, matching this app's other honesty banners. */
const COMING_SOON = {
  fa: 'درس‌های این گروه سنی به‌زودی می‌آیند',
  en: 'Lessons for this age group are coming soon',
  de: 'Lektionen für diese Altersgruppe kommen bald'
};
const COMING_SOON_CG = {
  fa: 'این گروه سنی هنوز محتوایی ندارد. محتوای واقعی تنها پس از بررسی آموزشی و ایمنی کودکان اضافه می‌شود — چیزی اینجا ساخته یا وانمود نشده است.',
  en: 'This age group has no real lessons yet. Real content will be added only after a pedagogy and child-safeguarding review — nothing here is invented or faked.',
  de: 'Für diese Altersgruppe gibt es noch keine echten Lektionen. Echte Inhalte kommen erst nach einer pädagogischen und kindersicherheitsbezogenen Prüfung hinzu — hier ist nichts erfunden oder vorgetäuscht.'
};

/* =========================================================================
 * VIEWMODEL — app state (no DOM here)
 * ========================================================================= */
const state = {
  lang: localStorage.getItem('sahar.lang') || 'fa',
  packPath: null,    // path of the loaded pack (null = show the lesson picker)
  pack: null,        // loaded content pack
  queue: [],         // due cards in order (merged with saved progress)
  idx: 0,            // current card index
  revealed: false,   // is the answer showing? (legacy read-based cards only)
  subIdx: 0,          // sub-round index, for "match" interaction cards
  shuffledChoices: null, // tap choices for the current card/round, order randomised at prepareCard()
  audioModes: {},     // which audio modes actually played this card (honesty banner)
  activeProfileId: null, // SAHAR-V3 CORE: the currently active child profile (localStorage-backed)
  gardenRecorded: false  // guards against double-counting a garden "bloom" on re-render of the done screen
};

/* =========================================================================
 * PROFILE-GATE view-state (SAHAR-V3 CORE slice #1, feature 1). Kept as plain
 * module-level variables, same spirit as `state` above — this is the small
 * bit of UI-only state for the "who's learning" screen (which sub-view is
 * showing, the in-progress add-child draft). Never persisted directly; only
 * ProfileProvider.add() at the end persists anything.
 * ========================================================================= */
let gateMode = 'pick'; // 'pick' (avatar grid) | 'add' (caregiver add-child form)
let addDraft = { name: '', ageBand: '', avatar: '' };

function resetAddDraft() {
  const P = window.SaharProfiles;
  addDraft = {
    name: '',
    ageBand: (P && P.DEFAULT_AGE_BAND) || '6-8',
    avatar: (P && P.DEFAULT_AVATAR) || 'dawnbird'
  };
}

/** Fisher-Yates shuffle (reuses bootstrap-core.js's implementation when present,
 *  so the tap-choice position is never predictable — never a memorised "always
 *  first" button). Falls back to an in-place copy if bootstrap-core.js isn't
 *  loaded on this page for some reason (defensive, should not happen). */
function shuffleChoices(arr) {
  if (window.BootstrapCore && typeof window.BootstrapCore.shuffle === 'function') {
    return window.BootstrapCore.shuffle(arr);
  }
  return (arr || []).slice();
}

/** Reset per-card interaction state (sub-round + shuffled choice order) whenever
 *  the current card changes. Called from openPack/onAnswer/onRestart — NOT from
 *  render(), so a wrong tap or a language switch never reshuffles mid-card. */
function prepareCard() {
  state.subIdx = 0;
  state.audioModes = {};
  const card = state.queue[state.idx];
  if (!card) { state.shuffledChoices = null; return; }
  if (card.interaction === 'match' && Array.isArray(card.rounds) && card.rounds.length) {
    state.shuffledChoices = shuffleChoices(card.rounds[0].choices);
  } else if (Array.isArray(card.choices)) {
    state.shuffledChoices = shuffleChoices(card.choices);
  } else {
    state.shuffledChoices = null;
  }
}

/** Merge a pack's cards with saved per-card progress, keep only due ones. */
function buildQueue(pack, progress) {
  const today = todayISO();
  const merged = pack.cards.map((card) => {
    const saved = progress[card.id];
    return Object.assign({ box: 1, reps: 0, lapses: 0, due: today }, card, saved || {});
  });
  const due = merged.filter((c) => isDue(c, today));
  // If nothing is due (already reviewed today), show all so the demo always works.
  return due.length ? due : merged;
}

/* =========================================================================
 * VIEW — render(): pure-ish state → DOM. Holds NO domain logic.
 * ========================================================================= */
const $ = (id) => document.getElementById(id);

function applyLanguageChrome() {
  const lang = state.lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = I18nProvider.dir(lang);
  // chrome strings
  $('greet').textContent = I18nProvider.t(lang, 'greet');
  $('greetSub').textContent = I18nProvider.t(lang, 'greetSub');
  $('ruleText').textContent = I18nProvider.t(lang, 'rule');
  $('offline').textContent = I18nProvider.t(lang, 'offline');
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = I18nProvider.t(lang, el.getAttribute('data-i18n'));
  });
  // active language button
  document.querySelectorAll('#langs button').forEach((b) => {
    b.classList.toggle('on', b.getAttribute('data-lang') === lang);
  });
}

/* =========================================================================
 * PROFILES view (SAHAR-V3 CORE slice #1, feature 1) — the "who's learning"
 * gate, the topbar switch-profile chip, and the caregiver add-child form.
 * All read/write goes through ProfileProvider (profiles.js); this section is
 * purely state -> DOM, same discipline as the rest of the view layer.
 * ========================================================================= */

/** Minimal HTML-escape for the one bit of free-text a caregiver can type
 *  (a child's name) before it's interpolated into innerHTML. */
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/** The SVG for one avatar id — reuses the dawn-bird mascot or a pictures.js
 *  glyph (SAHAR-V3 CORE: "reuse/extend the existing dawn-bird + simple
 *  friendly shapes", no new art system, secular by construction). */
function avatarSVG(avatarId, size) {
  const P = window.SaharProfiles;
  const list = (P && P.AVATARS) || [];
  const a = list.find((x) => x.id === avatarId) || list[0];
  if (!a) return '';
  if (a.id === 'dawnbird') return (window.SaharMascot && window.SaharMascot.svg(size || 64)) || '';
  return (window.pictureFor && window.pictureFor(a.pic)) || '';
}

/** Update the topbar switch-profile chip to show the ACTIVE profile's own
 *  avatar (icon-only affordance — a child recognizes "my page" without
 *  reading, and can tap it to switch to a sibling's profile). Hidden until a
 *  profile is active. */
function renderProfileChip() {
  const chip = $('profileChip');
  if (!chip) return;
  const P = window.SaharProfiles;
  if (!state.activeProfileId || !P) { chip.classList.remove('on'); chip.innerHTML = ''; return; }
  const profile = P.ProfileProvider.get(state.activeProfileId);
  if (!profile) { chip.classList.remove('on'); chip.innerHTML = ''; return; }
  const avatar = (P.AVATARS.find((a) => a.id === profile.avatar)) || P.AVATARS[0];
  chip.style.setProperty('--tile-color', avatar.color);
  chip.innerHTML = avatarSVG(profile.avatar, 40);
  chip.setAttribute('aria-label', I18nProvider.t(state.lang, 'switchProfile'));
  chip.classList.add('on');
}

/** The child-visible GARDEN (SAHAR-V3 CORE slice #1, feature 2): rendered on
 *  the home/lesson-shelf screen for the ACTIVE profile only. Purely a read
 *  of GardenProvider — never mutates it (house principle #3: content/state
 *  reads stay one-way; only onAnswer()/renderDone()'s completion hook write). */
function renderGarden() {
  const el = $('gardenView');
  if (!el) return;
  const P = window.SaharProfiles;
  if (!state.activeProfileId || !P) { el.innerHTML = ''; return; }
  const lang = state.lang;
  // SAHAR-V3 CORE slice #2: the garden's "total" is THIS BAND's pack count,
  // not the whole app's — a band with no packs yet has nothing to grow, so
  // the garden stays hidden rather than showing a misleading 0/10.
  const total = packsForBand(activeAgeBand()).length;
  if (!total) { el.innerHTML = ''; return; }
  const completed = P.GardenProvider.distinctCompletedCount(state.activeProfileId);
  const scene = (window.SaharMascot && window.SaharMascot.garden(completed, total)) || '';
  el.innerHTML = `
    <div class="garden-card">
      ${scene}
      <p class="garden-label">${I18nProvider.t(lang, 'gardenLabel')} · ${completed} / ${total}</p>
    </div>`;
}

/** The band indicator/selector (SAHAR-V3 CORE slice #2): a gentle icon+color
 *  strip, same tile language as the avatar picker, showing which of the
 *  four charter age bands the ACTIVE profile is on. Tapping a chip is a
 *  caregiver action that changes that profile's band and immediately swaps
 *  the shelf below (DoD: "switching a profile's band switches what's
 *  shown"). Hidden mid-lesson (only meaningful on the shelf) and when no
 *  profile is active — same guard style as renderGarden(). */
function renderBandBar() {
  const el = $('bandBar');
  if (!el) return;
  const P = window.SaharProfiles;
  if (!state.activeProfileId || !P || state.pack) { el.innerHTML = ''; el.hidden = true; return; }
  const profile = P.ProfileProvider.get(state.activeProfileId);
  if (!profile) { el.innerHTML = ''; el.hidden = true; return; }
  el.hidden = false;
  const lang = state.lang;
  const current = P.normalizeAgeBand(profile.ageBand);
  const chips = P.AGE_BANDS.map((b) => {
    const meta = P.BAND_META[b];
    const on = b === current ? ' on' : '';
    const icon = (window.pictureFor && window.pictureFor(meta.pic)) || '';
    return `<button type="button" class="band-chip${on}" data-act="pick-band" data-band="${b}"
        style="--tile-color:${meta.color}" aria-pressed="${b === current}" aria-label="${b}">
      <span class="band-chip-ico">${icon}</span>
      <span class="band-chip-label">${b}</span>
    </button>`;
  }).join('');
  el.innerHTML = `
    <p class="band-bar-label">${I18nProvider.t(lang, 'ageBand')}</p>
    <div class="band-row">${chips}</div>`;
}

/** The "who's learning" avatar grid — a pre-literate child picks THEIR
 *  profile by avatar + color alone; no name needs to be read. A dashed
 *  "add a child" tile is always last (a caregiver step, explicitly hinted
 *  as such below the grid). */
function renderProfileGate() {
  if (gateMode === 'add') { renderAddChildForm(); return; }
  const el = $('profileGate');
  if (!el) return;
  const lang = state.lang;
  const P = window.SaharProfiles;
  const profiles = (P && P.ProfileProvider.list()) || [];
  const tiles = profiles.map((p) => {
    const avatar = (P.AVATARS.find((a) => a.id === p.avatar)) || P.AVATARS[0];
    return `<button type="button" class="profile-tile" data-act="pick-profile" data-id="${p.id}"
        style="--tile-color:${avatar.color}" aria-label="${escapeHtml(p.name) || 'profile'}">
      <span class="profile-avatar">${avatarSVG(p.avatar, 76)}</span>
      ${p.name ? `<span class="profile-name">${escapeHtml(p.name)}</span>` : ''}
    </button>`;
  }).join('');
  const addTile = `<button type="button" class="profile-tile add-tile" data-act="add-child" aria-label="${I18nProvider.t(lang, 'addChild')}">
      <span class="profile-avatar"><span class="add-plus">+</span></span>
      <span class="profile-name">${I18nProvider.t(lang, 'addChild')}</span>
    </button>`;
  const closeBtn = profiles.length
    ? `<button type="button" class="link-btn back" data-act="gate-close" aria-label="${I18nProvider.t(lang, 'pick')}">✕</button>`
    : '';
  el.innerHTML = `
    <div class="gate-inner">
      ${closeBtn}
      <h2 class="gate-title">${I18nProvider.t(lang, 'whoIsLearning')}</h2>
      <div class="profile-grid">${tiles}${addTile}</div>
    </div>`;
}

/** The caregiver add-child form: name (optional, typed by a grown-up), age
 *  band, and an avatar picked from the same secular set the child later
 *  chooses from on the gate above. */
function renderAddChildForm() {
  const el = $('profileGate');
  if (!el) return;
  const lang = state.lang;
  const P = window.SaharProfiles;
  const avatars = (P && P.AVATARS) || [];
  const ageBands = (P && P.AGE_BANDS) || [];
  const avatarTiles = avatars.map((a) => `
    <button type="button" class="avatar-pick${addDraft.avatar === a.id ? ' on' : ''}"
      data-act="pick-avatar" data-avatar="${a.id}" style="--tile-color:${a.color}" aria-label="${a.id}">
      ${avatarSVG(a.id, 56)}
    </button>`).join('');
  const ageTiles = ageBands.map((b) => `
    <button type="button" class="age-pick${addDraft.ageBand === b ? ' on' : ''}" data-act="pick-age" data-age="${b}">${b}</button>`).join('');
  el.innerHTML = `
    <div class="gate-inner">
      <button type="button" class="link-btn back" data-act="gate-back" aria-label="${I18nProvider.t(lang, 'whoIsLearning')}">↩</button>
      <h2 class="gate-title">${I18nProvider.t(lang, 'addChild')}</h2>
      <p class="gate-hint">${I18nProvider.t(lang, 'addChildHint')}</p>
      <label class="gate-label" for="childName">${I18nProvider.t(lang, 'childName')}</label>
      <input type="text" id="childName" class="gate-input" value="${escapeHtml(addDraft.name)}"
        placeholder="${I18nProvider.t(lang, 'optional')}" maxlength="40">
      <p class="gate-label">${I18nProvider.t(lang, 'ageBand')}</p>
      <div class="age-row">${ageTiles}</div>
      <p class="gate-label">${I18nProvider.t(lang, 'chooseAvatar')}</p>
      <div class="avatar-row">${avatarTiles}</div>
      <button type="button" class="fc-btn gate-save" data-act="save-child">${I18nProvider.t(lang, 'saveChild')}</button>
    </div>`;
}

/** Enter the app for the active profile: hide the gate, show #app, and make
 *  sure we always land on the lesson shelf (never mid-lesson leftover state
 *  from a previous profile). */
function openApp() {
  const gate = $('profileGate');
  const app = $('app');
  if (gate) gate.hidden = true;
  if (app) app.hidden = false;
  state.pack = null;
  state.packPath = null;
  state.idx = 0;
  state.revealed = false;
  state.gardenRecorded = false;
  document.body.classList.remove('lesson-open');
  render();
}

/** Show the "who's learning" gate (initial boot with no active profile, or
 *  the topbar switch-profile chip tapped mid-session). */
function openProfileGate() {
  gateMode = 'pick';
  const gate = $('profileGate');
  const app = $('app');
  if (app) app.hidden = true;
  if (gate) gate.hidden = false;
  applyLanguageChrome(); // keep dir/lang correct even while #app is hidden
  renderProfileGate();
}

/** The lesson picker: a warm shelf of the bundled packs. Shown when no pack
 *  is open. Each tile reads its title from the pack's own title map.
 *  SAHAR-V3 CORE slice #2: only the ACTIVE profile's band's packs are ever
 *  shown; a band with none yet gets the honest scaffold instead. */
function renderPicker() {
  const lang = state.lang;
  const band = activeAgeBand();
  const packs = packsForBand(band);
  if (!packs.length) { renderComingSoonBand(band); return; }
  const tiles = packs.map((p) => {
    const title = (p.titleByLang && (p.titleByLang[lang] || p.titleByLang.en)) || p.id;
    const icon = (window.pictureFor && window.pictureFor(p.pic || 'star')) || '';
    return `<button class="lesson-tile" data-act="open" data-path="${p.path}">
        <span class="tile-sun">${icon}</span><span class="tile-title">${title}</span>
      </button>`;
  }).join('');
  $('stage').innerHTML = `
    <p class="lesson-title">${I18nProvider.t(lang, 'pick')}</p>
    <div class="lesson-shelf">${tiles}</div>`;
}

/** The honest "packs coming soon" scaffold for a charter band with no real
 *  packs yet (SAHAR-V3 CORE slice #2). Reuses the `.done` card frame (same
 *  container as the end-of-lesson / could-not-load screens) plus the band's
 *  own icon/color identity. Never a text wall, never invented curriculum —
 *  see COMING_SOON_CG for the explicit "nothing here is faked" note, which
 *  lives behind the same "For grown-ups" toggle every lesson card uses. */
function renderComingSoonBand(band) {
  const lang = state.lang;
  const P = window.SaharProfiles;
  const meta = (P && P.BAND_META[band]) || { pic: 'garden', color: 'var(--good, #6fcf97)' };
  const icon = (window.pictureFor && window.pictureFor(meta.pic)) || '';
  const sunrise = (window.SaharMascot && window.SaharMascot.sunrise(40)) || '';
  const label = COMING_SOON[lang] || COMING_SOON.en;
  const cg = COMING_SOON_CG[lang] || COMING_SOON_CG.en;
  // The band's curriculum map (planned subject headings) makes this an honest
  // "defined shell", not a blank screen — charter feature 8. Escaped; the chips
  // are fixed manifest data, but treat them as untrusted text on principle.
  const preview = BAND_PREVIEWS[band];
  const chips = (preview && Array.isArray(preview[lang]) ? preview[lang] : (preview && preview.en) || [])
    .map((topic) => `<span class="band-preview-chip">${escapeHtml(topic)}</span>`).join('');
  const previewBlock = chips ? `
      <p class="band-preview-label">${I18nProvider.t(lang, 'plannedTopics')}</p>
      <div class="band-preview">${chips}</div>` : '';
  $('stage').innerHTML = `
    <div class="done band-coming">
      <div class="band-coming-icon" style="--tile-color:${meta.color}">${icon}</div>
      ${sunrise}
      <h2>${label}</h2>${previewBlock}
      <button type="button" class="listen-btn l1" data-act="listen-coming">
        <span class="lico">🔊</span><span class="ltxt">${I18nProvider.t(lang, 'listen')}</span>
      </button>
      <button type="button" class="link-btn cg-toggle" data-act="caregiver">👪 ${I18nProvider.t(lang, 'caregiver')}</button>
      <div class="cg-panel" id="cgPanel" style="display:none">
        <p class="cg-line">${cg}</p>
      </div>
    </div>`;
}

/** Speak the "coming soon" band message through the same honest AudioEngine
 *  chain every lesson card uses (real recording if one ever exists → browser
 *  TTS where genuinely available → placeholder tone). Never blocks the
 *  screen; a missing AudioEngine is a silent no-op like voiceCard()'s. */
async function voiceComingSoon() {
  if (!window.AudioEngine) return;
  const lang = state.lang;
  const text = COMING_SOON[lang] || COMING_SOON.en;
  try { await window.AudioEngine.voice({ text }, lang, false); } catch (_) { /* honest no-op */ }
}

/** The visible dawn progress path (SAHAR-COVERAGE §6.5-C — Duolingo-style bar
 *  + the mascot bird flying toward the sunrise), shown above the lesson stage
 *  while a pack is open. Reuses bootstrap.css's `.dawn-progress` styling
 *  (already loaded by index.html) so both flows share one visual system and
 *  the RTL bird-flip / flutter animation defined there apply here for free. */
function renderProgressPath() {
  const el = $('progressPath');
  if (!el) return;
  if (!state.pack) { el.innerHTML = ''; return; }
  const total = state.queue.length || 1;
  const doneCount = Math.min(state.idx, total);
  const pct = Math.round((doneCount / total) * 100);
  const bird = (window.SaharMascot && window.SaharMascot.svg(30)) || '';
  const goal = (window.SaharMascot && window.SaharMascot.sunrise(26)) || '';
  el.innerHTML = `
    <div class="path" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
      <div class="fill" style="inline-size:${pct}%"></div>
      <div class="bird" style="inset-inline-start:clamp(4px, calc(${pct}% - 15px), calc(100% - 34px))">${bird}</div>
      <div class="goal">${goal}</div>
    </div>`;
}

function renderStage() {
  if (!state.pack) { renderPicker(); return; }
  if (state.idx >= state.queue.length) { renderDone(); return; }
  const card = state.queue[state.idx];
  // Audio-first / picture-first path (SAHAR-COVERAGE §6.5 A) — every Tier-1 card
  // shipped today declares an `interaction`. The text-prompt+reveal path below
  // is kept ONLY as a defensive fallback for a malformed/legacy card.
  if (card && card.interaction) { renderInteractiveCard(card); return; }
  renderLegacyCard(card);
}

/** LEGACY view: text prompt + reveal + self-report (pre-audio-first). Not used
 *  by any shipped pack anymore (all migrated to `interaction`), kept only as a
 *  defensive fallback so a malformed pack never crashes the app. */
function renderLegacyCard(card) {
  const lang = state.lang;
  const stage = $('stage');
  const kindLabel = I18nProvider.t(lang, KIND_KEY[card.type] || 'factOpinion');
  const prompt = card.prompt[lang] || card.prompt.en;
  const answer = card.answer[lang] || card.answer.en;

  const title = (state.pack.title && (state.pack.title[lang] || state.pack.title.en)) || '';

  stage.innerHTML = `
    <p class="lesson-title">
      <button type="button" class="link-btn back" data-act="lessons" aria-label="${I18nProvider.t(lang, 'pick')}">↩</button>
      ${title}
    </p>
    <div class="card">
      <div class="kind">${kindLabel}</div>
      <p class="prompt">${prompt}</p>
      <p class="answer ${state.revealed ? '' : 'hidden'}">${answer}</p>
      <div class="actions">
        ${state.revealed
          ? `<button class="btn again" data-act="again"><span class="ico">↻</span>${I18nProvider.t(lang, 'again')}</button>
             <button class="btn good"  data-act="good"><span class="ico">✓</span>${I18nProvider.t(lang, 'good')}</button>`
          : `<button class="btn show" data-act="show"><span class="ico">👁</span>${I18nProvider.t(lang, 'show')}</button>`
        }
      </div>
    </div>`;
}

/** AUDIO-FIRST / PICTURE-FIRST view (SAHAR-COVERAGE §6.5 A). No card text is
 *  ever required reading: the lesson content is SPOKEN (AudioEngine — real
 *  recording if present, honest TTS/tone fallback otherwise) and answered by
 *  tapping a picture or a big letter/number shape. The original prompt/answer
 *  text is never shown on the child-facing card; it lives only behind the
 *  "For grown-ups" caregiver toggle, as the realistic delivery channel. */
function renderInteractiveCard(card) {
  const lang = state.lang;
  const stage = $('stage');
  const title = (state.pack.title && (state.pack.title[lang] || state.pack.title.en)) || '';
  const kindLabel = I18nProvider.t(lang, KIND_KEY[card.type] || 'factOpinion');
  const isMatch = card.interaction === 'match' && Array.isArray(card.rounds);
  const round = isMatch ? card.rounds[state.subIdx] : card;
  const choices = state.shuffledChoices || [];
  const cgLine = (card.caregiver && (card.caregiver[lang] || card.caregiver.en)) || '';

  let body;
  if (card.interaction === 'repeat-aloud') {
    body = `
      <div class="fc-hero">
        <button type="button" class="listen-btn l1" data-act="listen">
          <span class="lico">🔊</span><span class="ltxt">${I18nProvider.t(lang, 'listen')}</span>
        </button>
      </div>
      <div class="fc-feedback" id="fb" aria-live="polite"></div>
      <button type="button" class="fc-btn" data-act="said-it">${I18nProvider.t(lang, 'iSaidIt')}</button>`;
  } else {
    const heroPic = round.heroPic ? `<div class="fc-pic big">${window.pictureFor(round.heroPic)}</div>` : '';
    const choiceHtml = choices.map((c) => {
      const inner = c.glyph
        ? `<span class="glyph">${c.glyph}</span>`
        : window.pictureFor(c.pic);
      const sizeClass = c.size ? (' ' + c.size) : '';
      return `<button type="button" class="pic-choice${sizeClass}" data-tap="${c.id}" aria-label="choice">${inner}</button>`;
    }).join('');
    body = `
      ${heroPic}
      <button type="button" class="listen-btn l1" data-act="listen">
        <span class="lico">🔊</span><span class="ltxt">${I18nProvider.t(lang, 'listen')}</span>
      </button>
      <p class="fc-tap">${I18nProvider.t(lang, 'tapPrompt')}</p>
      <div class="pic-grid">${choiceHtml}</div>
      <div class="fc-feedback" id="fb" aria-live="polite"></div>`;
  }

  stage.innerHTML = `
    <p class="lesson-title">
      <button type="button" class="link-btn back" data-act="lessons" aria-label="${I18nProvider.t(lang, 'pick')}">↩</button>
      ${title}
    </p>
    <div class="card interactive">
      <div class="kind">${kindLabel}</div>
      ${body}
      <button type="button" class="link-btn cg-toggle" data-act="caregiver">👪 ${I18nProvider.t(lang, 'caregiver')}</button>
      <div class="cg-panel" id="cgPanel" style="display:none">
        <p class="cg-line">${cgLine}</p>
        <p class="prototype-banner" id="cgHonesty"></p>
      </div>
    </div>`;

  updateCgHonesty();
  voiceCard(card, round);
}

/** Speak the card/round's lesson content honestly (real recording if present,
 *  browser TTS where genuinely supported, otherwise a placeholder tone) and
 *  track which mode actually played so the prototype-honesty banner is true. */
async function voiceCard(card, round) {
  if (!window.AudioEngine) return;
  const lang = state.lang;
  const text = (card.prompt && (card.prompt[lang] || card.prompt.en)) || '';
  const label = { text, audio: card.audioPending ? undefined : (card.audio && card.audio[lang]) };
  try {
    const r = await window.AudioEngine.voice(label, lang, false);
    state.audioModes[r.mode] = true;
    updateCgHonesty();
  } catch (_) { /* honest no-op: audio is optional, never blocks the lesson */ }
}

/** The prototype-honesty note (SAHAR-COVERAGE §6.5 D): what's declared vs
 *  what actually played this card. Never claims real audio that isn't real.
 *  Design fix: lives ONLY inside the "For grown-ups" caregiver panel now —
 *  it used to be a banner shown on every child-facing card. */
const AUDIO_MODE_LABELS = {
  fa: { recording: 'صدای رایانه‌ای موقت', tts: 'صدای مرورگر', tone: 'زنگ جایگزین' },
  en: { recording: 'temporary machine voice', tts: 'browser voice', tone: 'placeholder tone' },
  de: { recording: 'vorübergehende Computerstimme', tts: 'Browser-Stimme', tone: 'Platzhalter-Ton' }
};
const NOT_PLAYED_YET = { fa: 'هنوز پخش نشده', en: 'not played yet', de: 'noch nicht abgespielt' };

function updateCgHonesty() {
  const el = $('cgHonesty');
  if (!el) return;
  const lang = state.lang;
  const modes = Object.keys(state.audioModes);
  const labels = AUDIO_MODE_LABELS[lang] || AUDIO_MODE_LABELS.en;
  const played = modes.length
    ? modes.map((m) => labels[m] || m).join(' + ')
    : (NOT_PLAYED_YET[lang] || NOT_PLAYED_YET.en);
  el.textContent = {
    fa: `نمونهٔ اولیه · این صدا فعلاً یک صدای رایانه‌ای موقت است (اکنون: ${played}) · صدای واقعی انسان (سحر/ندا) به‌زودی می‌آید`,
    en: `PROTOTYPE · this voice is a temporary machine voice for now (now playing: ${played}) · a real human voice (Sahar/Neda) is coming`,
    de: `PROTOTYP · diese Stimme ist vorübergehend eine Computerstimme (jetzt: ${played}) · eine echte menschliche Stimme (Sahar/Neda) folgt bald`
  }[lang] || '';
}

function renderDone() {
  const lang = state.lang;
  const bird = (window.SaharMascot && window.SaharMascot.svg(72, 'done-bird')) || '';
  $('stage').innerHTML = `
    <div class="done">
      <div class="big">🌅</div>
      ${bird}
      <h2>${I18nProvider.t(lang, 'doneTitle')}</h2>
      <p>${I18nProvider.t(lang, 'doneSub')}</p>
      <button type="button" data-act="restart">${I18nProvider.t(lang, 'restart')}</button>
      <button type="button" class="link-btn" data-act="lessons">${I18nProvider.t(lang, 'pick')}</button>
    </div>`;
  celebrate({ big: true, bubble: false });
  recordGardenCompletion();
}

/** Record one "bloom" in the active profile's garden the FIRST time a pack
 *  reaches the done screen for this open (guarded by state.gardenRecorded so
 *  a language switch or any other re-render of the done screen never double-
 *  counts). Reset alongside opening/restarting a pack (SAHAR-V3 CORE feature
 *  2 — completing a lesson grows the garden, once per completion). */
function recordGardenCompletion() {
  if (state.gardenRecorded) return;
  state.gardenRecorded = true;
  const P = window.SaharProfiles;
  if (!P || !state.activeProfileId || !state.packPath) return;
  const packMeta = PACKS.find((p) => p.path === state.packPath);
  const packId = (packMeta && packMeta.id) || state.packPath;
  P.GardenProvider.recordCompletion(state.activeProfileId, packId);
  renderGarden();
}

/** Celebration on a correct answer / pack completion (SAHAR-COVERAGE §6.5-C):
 *  a gentle scale-pop on the card, a brief CSS confetti burst, and (unless
 *  suppressed) the mascot popping up with a short praise line. Purely
 *  cosmetic — never touches Leitner scheduling or the audio-honesty chain.
 *  The gentle success SOUND is `AudioEngine.cheer()` (WebAudio chime),
 *  called by the caller alongside this, not duplicated here. Respects
 *  prefers-reduced-motion via CSS (see styles.css). */
function celebrate(opts) {
  const o = opts || {};
  const host = document.querySelector('#stage .card, #stage .done');
  if (!host) return;

  host.classList.remove('pop'); void host.offsetWidth; host.classList.add('pop');
  setTimeout(() => host.classList.remove('pop'), 550);

  if (o.bubble !== false) {
    const bird = (window.SaharMascot && window.SaharMascot.svg(30)) || '';
    const star = (window.SaharMascot && window.SaharMascot.star(16)) || '';
    const bubble = document.createElement('div');
    bubble.className = 'praise-bubble';
    bubble.innerHTML = `${bird}<span>${star} ${I18nProvider.t(state.lang, 'great')}</span>`;
    host.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1100);
  }

  const n = o.big ? 22 : 12;
  const colors = ['var(--gold, #ffd89b)', 'var(--amber, #f4a259)', 'var(--rose, #e0719b)', 'var(--good, #6fcf97)'];
  let bits = '';
  for (let i = 0; i < n; i++) {
    const left = Math.round(Math.random() * 100);
    const delay = (Math.random() * 0.18).toFixed(2);
    const color = colors[i % colors.length];
    bits += `<i style="left:${left}%; animation-delay:${delay}s; background:${color}"></i>`;
  }
  const confetti = document.createElement('div');
  confetti.className = 'confetti-burst';
  confetti.innerHTML = bits;
  host.appendChild(confetti);
  setTimeout(() => confetti.remove(), 950);
}

/** Correct-tap TILE feedback (design fix, SAHAR-COVERAGE §6.5-C): the tapped
 *  picture itself gets a brief scale + gold-glow (~200ms) and an 8-12 SVG-star
 *  burst from its own position — the celebration used to be card-wide only,
 *  so the tile the child actually touched showed no state at all. */
function celebrateTile(tileEl) {
  if (!tileEl) return;
  tileEl.classList.remove('correct'); void tileEl.offsetWidth; tileEl.classList.add('correct');
  setTimeout(() => tileEl.classList.remove('correct'), 220);

  const host = tileEl.closest('.card') || tileEl.parentElement;
  if (!host) return;
  const hostRect = host.getBoundingClientRect();
  const tileRect = tileEl.getBoundingClientRect();
  const cx = tileRect.left - hostRect.left + tileRect.width / 2;
  const cy = tileRect.top - hostRect.top + tileRect.height / 2;
  const n = 8 + Math.floor(Math.random() * 5); // 8..12
  let bits = '';
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n + (Math.random() * 0.5 - 0.25);
    const dist = 40 + Math.random() * 30;
    const dx = Math.round(Math.cos(angle) * dist);
    const dy = Math.round(Math.sin(angle) * dist);
    const size = 12 + Math.round(Math.random() * 8);
    const delay = (Math.random() * 0.08).toFixed(2);
    const s = (window.SaharMascot && window.SaharMascot.star(size)) || '';
    bits += `<i style="left:${cx}px; top:${cy}px; --dx:${dx}px; --dy:${dy}px; animation-delay:${delay}s;">${s}</i>`;
  }
  const burst = document.createElement('div');
  burst.className = 'star-burst';
  burst.innerHTML = bits;
  host.appendChild(burst);
  setTimeout(() => burst.remove(), 900);
}

/** Hop the mascot bird one step on the dawn progress path immediately on a
 *  correct tap (design fix: the bar used to sit frozen for the whole 700ms
 *  wait before the card advanced). Purely a cosmetic bounce — the real % is
 *  still owned entirely by renderProgressPath(). */
function hopBird(containerId) {
  const el = document.querySelector(`#${containerId} .bird`);
  if (!el) return;
  el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
  setTimeout(() => el.classList.remove('hop'), 500);
}

function render() {
  applyLanguageChrome();
  renderProfileChip();
  renderGarden();
  renderBandBar();
  renderProgressPath();
  renderStage();
}

/* =========================================================================
 * COMMANDS in (writes) — answers flow in, mutate progress via ProgressProvider.
 * Reads (content) stay one-way out (house principle #3).
 * ========================================================================= */
function onShow() { state.revealed = true; render(); }

function onAnswer(gotIt) {
  const card = state.queue[state.idx];
  const updated = schedule(card, gotIt);       // CORE decides the new box/due
  const progress = ProgressProvider.load();
  progress[card.id] = { box: updated.box, due: updated.due, reps: updated.reps, lapses: updated.lapses };
  ProgressProvider.save(progress);             // persist on device
  state.idx += 1;
  state.revealed = false;
  prepareCard();
  render();
}

/** A wrong tap never counts as a lapse (gentle, non-punishing tone — house
 *  rule): it just invites another try, in place, no schedule() call. */
function onWrongTap(tappedId) {
  const fb = $('fb');
  const btn = document.querySelector(`.pic-choice[data-tap="${tappedId}"]`);
  if (btn) { btn.classList.add('wrong'); setTimeout(() => btn.classList.remove('wrong'), 500); }
  if (fb) fb.textContent = I18nProvider.t(state.lang, 'tryAgain');
}

/** Handle a tap on a picture/letter choice for the current interactive card
 *  (or the current sub-round of a "match" card). Correct -> cheer + advance
 *  (recording a Leitner "got it"); wrong -> gentle retry, no scheduling. */
function onTapChoice(tappedId) {
  const card = state.queue[state.idx];
  if (!card) return;
  const isMatch = card.interaction === 'match' && Array.isArray(card.rounds);
  const round = isMatch ? card.rounds[state.subIdx] : card;
  if (tappedId !== round.answerId) { onWrongTap(tappedId); return; }

  if (window.AudioEngine) window.AudioEngine.cheer();
  const fb = $('fb');
  const star = (window.SaharMascot && window.SaharMascot.star(18)) || '';
  if (fb) fb.innerHTML = `${star} ${I18nProvider.t(state.lang, 'great')}`;
  celebrateTile(document.querySelector(`.pic-choice[data-tap="${tappedId}"]`));
  hopBird('progressPath');
  celebrate();

  if (isMatch && state.subIdx < card.rounds.length - 1) {
    state.subIdx += 1;
    state.shuffledChoices = shuffleChoices(card.rounds[state.subIdx].choices);
    setTimeout(render, 700);
  } else {
    setTimeout(() => onAnswer(true), 700);
  }
}

function onRestart() {
  state.queue = buildQueue(state.pack, ProgressProvider.load());
  state.idx = 0;
  state.revealed = false;
  state.gardenRecorded = false; // a fresh run can bloom the garden again
  prepareCard();
  render();
}

/** Open a pack by path: load it, build the due queue, show its first card. */
async function openPack(path) {
  try {
    state.pack = await ContentProvider.getPack(path);
    state.packPath = path;
    state.queue = buildQueue(state.pack, ProgressProvider.load());
    state.idx = 0;
    state.revealed = false;
    state.gardenRecorded = false;
    prepareCard();
  } catch (err) {
    state.pack = null;
    $('stage').innerHTML = `<div class="done"><div class="big">🌙</div>
      <p>Could not load the lesson pack. (${String(err.message || err)})</p>
      <button type="button" data-act="lessons">${I18nProvider.t(state.lang, 'pick')}</button></div>`;
    return;
  }
  // Design fix (SAHAR-COVERAGE §6.5-C): opening a lesson slides the exercise
  // in full-screen under a slim progress-path bar, instead of sitting inline
  // below the header/hero/CTA. See styles.css `body.lesson-open`.
  document.body.classList.add('lesson-open');
  render();
}

/** Return to the lesson shelf. */
function openLessons() {
  state.pack = null;
  state.packPath = null;
  state.idx = 0;
  state.revealed = false;
  document.body.classList.remove('lesson-open');
  render();
}

function setLang(lang) {
  if (!STRINGS[lang]) return;
  state.lang = lang;
  localStorage.setItem('sahar.lang', lang);
  render();
}

/* =========================================================================
 * WIRING — events + boot
 * ========================================================================= */
function wireEvents() {
  // language switch
  $('langs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if (b) setLang(b.getAttribute('data-lang'));
  });
  // switch-profile chip (topbar): reopen the "who's learning" gate
  const chip = $('profileChip');
  if (chip) chip.addEventListener('click', () => openProfileGate());
  // band bar (home screen): tapping a band chip switches the ACTIVE
  // profile's charter band and immediately swaps the shelf below (SAHAR-V3
  // CORE slice #2 DoD: "switching a profile's band switches what's shown").
  const bandBar = $('bandBar');
  if (bandBar) {
    bandBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act="pick-band"]');
      if (!btn) return;
      const band = btn.getAttribute('data-band');
      const P = window.SaharProfiles;
      if (P && state.activeProfileId) P.ProfileProvider.setAgeBand(state.activeProfileId, band);
      render();
    });
  }
  // the profile gate: avatar picks, add-child form, its own click delegation
  // (kept separate from #stage's delegation below — different screen).
  const gate = $('profileGate');
  if (gate) {
    gate.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.getAttribute('data-act');
      const P = window.SaharProfiles;
      if (act === 'pick-profile') {
        const id = btn.getAttribute('data-id');
        if (P) P.ProfileProvider.setActiveId(id);
        state.activeProfileId = id;
        openApp();
      } else if (act === 'add-child') {
        resetAddDraft();
        gateMode = 'add';
        renderProfileGate();
      } else if (act === 'gate-back') {
        gateMode = 'pick';
        renderProfileGate();
      } else if (act === 'gate-close') {
        openApp();
      } else if (act === 'pick-avatar') {
        addDraft.avatar = btn.getAttribute('data-avatar');
        renderProfileGate();
      } else if (act === 'pick-age') {
        addDraft.ageBand = btn.getAttribute('data-age');
        renderProfileGate();
      } else if (act === 'save-child') {
        const nameEl = $('childName');
        if (nameEl) addDraft.name = nameEl.value;
        if (P) {
          const profile = P.ProfileProvider.add({ name: addDraft.name, ageBand: addDraft.ageBand, avatar: addDraft.avatar });
          state.activeProfileId = profile.id;
        }
        openApp();
      }
    });
    // the name field is free text; re-rendering on every keystroke (like the
    // click handler above does) would fight the caret, so track it directly.
    gate.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'childName') addDraft.name = e.target.value;
    });
  }
  // stage actions (delegated so re-renders keep working)
  $('stage').addEventListener('click', (e) => {
    if (window.AudioEngine) window.AudioEngine.unlock(); // prime audio on first tap (browser gesture rule)
    const tapBtn = e.target.closest('[data-tap]');
    if (tapBtn) { onTapChoice(tapBtn.getAttribute('data-tap')); return; }
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.getAttribute('data-act');
    if (act === 'show') onShow();
    else if (act === 'good') onAnswer(true);
    else if (act === 'again') onAnswer(false);
    else if (act === 'restart') onRestart();
    else if (act === 'open') openPack(btn.getAttribute('data-path'));
    else if (act === 'lessons') openLessons();
    else if (act === 'listen') {
      const card = state.queue[state.idx];
      const round = (card && card.interaction === 'match' && card.rounds) ? card.rounds[state.subIdx] : card;
      if (card) voiceCard(card, round);
    }
    else if (act === 'listen-coming') voiceComingSoon();
    else if (act === 'said-it') onAnswer(true); // repeat-aloud: ungraded, self-paced completion
    else if (act === 'caregiver') {
      const el = $('cgPanel');
      if (el) el.style.display = (el.style.display === 'none') ? '' : 'none';
    }
  });
}

async function boot() {
  wireEvents();
  // Audio-first CTA icon (design fix): house SVGs from mascot.js, replacing
  // the raw 🔊🐦 emoji pair that used to live directly in index.html markup.
  const doorIco = document.querySelector('.door-ico');
  if (doorIco && window.SaharMascot) {
    doorIco.innerHTML = window.SaharMascot.speaker(24) + window.SaharMascot.svg(24);
  }
  // Build the shelf from the single-source age-band manifest FIRST (this is
  // what populates PACKS); the validator and sw.js read the same file.
  await loadPackManifest();

  // Read each pack's title (cheap JSON) so the picker can label the shelf.
  // Offline-safe: the service worker has these precached after first visit.
  await Promise.all(PACKS.map(async (p) => {
    try { p.titleByLang = (await ContentProvider.getPack(p.path)).title; }
    catch (_) { p.titleByLang = null; }
  }));

  // SAHAR-V3 CORE slice #1: resume the last-active child profile if one is
  // set and still exists on this device; otherwise show the "who's
  // learning" gate so a caregiver can add the first child (or a returning
  // sibling can pick their own avatar) before any lesson content shows.
  const P = window.SaharProfiles;
  const activeId = P && P.ProfileProvider.getActiveId();
  if (P && activeId && P.ProfileProvider.get(activeId)) {
    state.activeProfileId = activeId;
    openApp();
  } else {
    openProfileGate();
  }

  // Register the service worker for offline use (no-op when opened via file://).
  if ('serviceWorker' in navigator) {
    try { navigator.serviceWorker.register('./sw.js'); } catch (_) {}
  }
}

document.addEventListener('DOMContentLoaded', boot);

/* Export the pure core for headless tests (house principle #8, future suite). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INTERVALS, schedule, isDue, addDaysISO, todayISO, buildQueue, STRINGS };
}
