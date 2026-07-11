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
    pick: 'یک درس را انتخاب کن',
    listen: 'گوش کن',
    tapPrompt: 'کدام درست است؟ لمس کن.',
    tryAgain: 'دوباره امتحان کن',
    great: 'آفرین!',
    iSaidIt: 'گفتم!',
    caregiver: 'برای بزرگ‌ترها'
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
    pick: 'Pick a lesson',
    listen: 'Listen',
    tapPrompt: 'Which one is right? Tap it.',
    tryAgain: 'Try again',
    great: 'Great!',
    iSaidIt: 'I said it!',
    caregiver: 'For grown-ups'
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
    pick: 'Wähle eine Lektion',
    listen: 'Hören',
    tapPrompt: 'Welches ist richtig? Tippe darauf.',
    tryAgain: 'Nochmal versuchen',
    great: 'Super!',
    iSaidIt: 'Ich hab\'s gesagt!',
    caregiver: 'Für Erwachsene'
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
  revealed: false,   // is the answer showing? (legacy read-based cards only)
  subIdx: 0,          // sub-round index, for "match" interaction cards
  shuffledChoices: null, // tap choices for the current card/round, order randomised at prepareCard()
  audioModes: {}      // which audio modes actually played this card (honesty banner)
};

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

/** AUDIO-FIRST / PICTURE-FIRST view (SAHAR-COVERAGE §6.5 A). No card text is
 *  ever required reading: the lesson content is SPOKEN (AudioEngine — real
 *  recording if present, honest TTS/tone fallback otherwise) and answered by
 *  tapping a picture or a big letter/number shape. The original prompt/answer
 *  text is never shown on the child-facing card; it lives only behind the
 *  "For grown-ups" caregiver toggle, as the realistic delivery channel. */
function renderInteractiveCard(card) {
  const lang = state.lang;
  const stage = $('stage');
  const total = state.queue.length;
  let pips = '';
  for (let i = 0; i < total; i++) pips += `<i class="${i < state.idx ? 'fill' : ''}"></i>`;
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
    <div class="pips">${pips}</div>
    <div class="card interactive">
      <div class="kind">${kindLabel}</div>
      ${body}
      <button type="button" class="link-btn cg-toggle" data-act="caregiver">👪 ${I18nProvider.t(lang, 'caregiver')}</button>
      <p class="cg-line" id="cgLine" style="display:none">${cgLine}</p>
    </div>`;

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
    renderBanner();
  } catch (_) { /* honest no-op: audio is optional, never blocks the lesson */ }
}

/** The prototype-honesty banner (SAHAR-COVERAGE §6.5 D): what's declared vs
 *  what actually played this card. Never claims real audio that isn't real. */
function renderBanner() {
  const el = $('banner');
  if (!el) return;
  const modes = Object.keys(state.audioModes);
  const played = modes.length
    ? modes.map((m) => ({ recording: 'real recordings', tts: 'browser voice', tone: 'placeholder tone' }[m] || m)).join(' + ')
    : 'not played yet';
  const lang = state.lang;
  el.textContent = {
    fa: `نمونهٔ اولیه · صداها هنوز واقعی نیستند (اکنون: ${played}) · صدای واقعی سحر/ندا بعداً`,
    en: `PROTOTYPE · audio is placeholder (now playing: ${played}) · real Sahar/Neda voice comes later`,
    de: `PROTOTYP · Audio ist Platzhalter (jetzt: ${played}) · echte Sahar/Neda-Stimme folgt später`
  }[lang] || '';
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
  const banner = $('banner');
  if (banner && !(state.pack && state.idx < state.queue.length)) banner.textContent = '';
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
  if (fb) fb.textContent = '🌟 ' + I18nProvider.t(state.lang, 'great');

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
    prepareCard();
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
    else if (act === 'said-it') onAnswer(true); // repeat-aloud: ungraded, self-paced completion
    else if (act === 'caregiver') {
      const el = $('cgLine');
      if (el) el.style.display = (el.style.display === 'none') ? '' : 'none';
    }
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
