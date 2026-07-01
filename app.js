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
    thinking: 'فکر کردن',
    science: 'نگاه و کشف',
    guessCheck: 'حدس و امتحان',
    shapes: 'شکل و نقش',
    pick: 'یک درس را انتخاب کن'
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
    thinking: 'Thinking',
    science: 'Look & discover',
    guessCheck: 'Guess & check',
    shapes: 'Shapes & patterns',
    pick: 'Pick a lesson'
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
    thinking: 'Denken',
    science: 'Schauen & entdecken',
    guessCheck: 'Raten & prüfen',
    shapes: 'Formen & Muster',
    pick: 'Wähle eine Lektion'
  }
};

/* =========================================================================
 * CORE — the Leitner box engine (mirrors internal/leitner.html exactly).
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
const PROGRESS_KEY = 'sahar.progress.v1';
const ProgressProvider = {
  load() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
    catch (_) { return {}; }
  },
  save(map) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(map)); } catch (_) {}
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
  'thinking': 'thinking',
  'science': 'science',
  'guess-check': 'guessCheck',
  'shapes': 'shapes'
};

/* PACKS — the bundled Tier-1 content shelf. Add a pack = add a line here
 * (and to APP_SHELL in sw.js so it precaches for offline). Titles are read
 * from each pack's own `title` map, so this stays a thin index of paths. */
const PACKS = [
  { id: 't1.literacy.first-letters',        path: './content/t1-literacy-first-letters.json' },
  { id: 't1.numeracy.counting-0-20',        path: './content/t1-numeracy-counting-0-20.json' },
  { id: 't1.numeracy.shapes-patterns',      path: './content/t1-numeracy-shapes-patterns.json' },
  { id: 't1.science.living-things',         path: './content/t1-science-living-things.json' },
  { id: 't1.thinking.what-is-a-question',   path: './content/t1-thinking-what-is-a-question.json' },
  { id: 't1.thinking.fact-vs-guess',        path: './content/t1-thinking-fact-vs-guess.json' },
  { id: 't1.thinking.fact-opinion-counting', path: './content/tier1-demo.json' }
];

/* =========================================================================
 * VIEWMODEL — app state (no DOM here)
 * ========================================================================= */
const state = {
  lang: localStorage.getItem('sahar.lang') || 'fa',
  packPath: null,    // path of the loaded pack (null = show the lesson picker)
  pack: null,        // loaded content pack
  queue: [],         // due cards in order (merged with saved progress)
  idx: 0,            // current card index
  revealed: false    // is the answer showing?
};

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

/** The lesson picker: a warm shelf of the bundled packs. Shown when no pack
 *  is open. Each tile reads its title from the pack's own title map. */
function renderPicker() {
  const lang = state.lang;
  const tiles = PACKS.map((p) => {
    const title = (p.titleByLang && (p.titleByLang[lang] || p.titleByLang.en)) || p.id;
    return `<button class="lesson-tile" data-act="open" data-path="${p.path}">
        <span class="tile-sun">🌅</span><span class="tile-title">${title}</span>
      </button>`;
  }).join('');
  $('stage').innerHTML = `
    <p class="lesson-title">${I18nProvider.t(lang, 'pick')}</p>
    <div class="lesson-shelf">${tiles}</div>`;
}

function renderStage() {
  const lang = state.lang;
  const stage = $('stage');

  if (!state.pack) { renderPicker(); return; }

  if (state.idx >= state.queue.length) { renderDone(); return; }

  const card = state.queue[state.idx];
  const kindLabel = I18nProvider.t(lang, KIND_KEY[card.type] || 'factOpinion');
  const prompt = card.prompt[lang] || card.prompt.en;
  const answer = card.answer[lang] || card.answer.en;
  const total = state.queue.length;

  let pips = '';
  for (let i = 0; i < total; i++) pips += `<i class="${i < state.idx ? 'fill' : ''}"></i>`;

  const title = (state.pack.title && (state.pack.title[lang] || state.pack.title.en)) || '';

  stage.innerHTML = `
    <p class="lesson-title">
      <button type="button" class="link-btn back" data-act="lessons" aria-label="${I18nProvider.t(lang, 'pick')}">↩</button>
      ${title}
    </p>
    <div class="card">
      <div class="pips">${pips}</div>
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

function renderDone() {
  const lang = state.lang;
  $('stage').innerHTML = `
    <div class="done">
      <div class="big">🌅</div>
      <h2>${I18nProvider.t(lang, 'doneTitle')}</h2>
      <p>${I18nProvider.t(lang, 'doneSub')}</p>
      <button type="button" data-act="restart">${I18nProvider.t(lang, 'restart')}</button>
      <button type="button" class="link-btn" data-act="lessons">${I18nProvider.t(lang, 'pick')}</button>
    </div>`;
}

function render() {
  applyLanguageChrome();
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
  render();
}

function onRestart() {
  state.queue = buildQueue(state.pack, ProgressProvider.load());
  state.idx = 0;
  state.revealed = false;
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
  } catch (err) {
    state.pack = null;
    $('stage').innerHTML = `<div class="done"><div class="big">🌙</div>
      <p>Could not load the lesson pack. (${String(err.message || err)})</p>
      <button type="button" data-act="lessons">${I18nProvider.t(state.lang, 'pick')}</button></div>`;
    return;
  }
  render();
}

/** Return to the lesson shelf. */
function openLessons() {
  state.pack = null;
  state.packPath = null;
  state.idx = 0;
  state.revealed = false;
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
  // stage actions (delegated so re-renders keep working)
  $('stage').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.getAttribute('data-act');
    if (act === 'show') onShow();
    else if (act === 'good') onAnswer(true);
    else if (act === 'again') onAnswer(false);
    else if (act === 'restart') onRestart();
    else if (act === 'open') openPack(btn.getAttribute('data-path'));
    else if (act === 'lessons') openLessons();
  });
}

async function boot() {
  wireEvents();
  // Read each pack's title (cheap JSON) so the picker can label the shelf.
  // Offline-safe: the service worker has these precached after first visit.
  await Promise.all(PACKS.map(async (p) => {
    try { p.titleByLang = (await ContentProvider.getPack(p.path)).title; }
    catch (_) { p.titleByLang = null; }
  }));
  // Start on the lesson shelf; the learner chooses where to begin.
  render();

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
