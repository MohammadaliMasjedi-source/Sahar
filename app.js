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
    firstWords: 'Word & picture',
    thinking: 'Thinking',
    science: 'Look & discover',
    dayNight: 'Day & night',
    guessCheck: 'Guess & check',
    shapes: 'Shapes & patterns',
    healthSafety: 'Health & safety',
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
    firstWords: 'Wort & Bild',
    thinking: 'Denken',
    science: 'Schauen & entdecken',
    dayNight: 'Tag & Nacht',
    guessCheck: 'Raten & prüfen',
    shapes: 'Formen & Muster',
    healthSafety: 'Gesundheit & Sicherheit',
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
  'first-words': 'firstWords',
  'thinking': 'thinking',
  'science': 'science',
  'day-night': 'dayNight',
  'guess-check': 'guessCheck',
  'shapes': 'shapes',
  'health-safety': 'healthSafety'
};

/* PACKS — the bundled Tier-1 content shelf. Add a pack = add a line here
 * (and to APP_SHELL in sw.js so it precaches for offline). Titles are read
 * from each pack's own `title` map, so this stays a thin index of paths. */
const PACKS = [
  { id: 't1.literacy.first-letters',        path: './content/t1-literacy-first-letters.json', pic: 'letters' },
  { id: 't1.literacy.first-words',          path: './content/t1-literacy-first-words.json', pic: 'book' },
  { id: 't1.numeracy.counting-0-20',        path: './content/t1-numeracy-counting-0-20.json', pic: 'star' },
  { id: 't1.numeracy.shapes-patterns',      path: './content/t1-numeracy-shapes-patterns.json', pic: 'shapes-trio' },
  { id: 't1.science.living-things',         path: './content/t1-science-living-things.json', pic: 'leaf' },
  { id: 't1.science.day-and-night',         path: './content/t1-science-day-and-night.json', pic: 'dawn' },
  { id: 't1.thinking.what-is-a-question',   path: './content/t1-thinking-what-is-a-question.json', pic: 'question-mark' },
  { id: 't1.thinking.fact-vs-guess',        path: './content/t1-thinking-fact-vs-guess.json', pic: 'guess-cloud' },
  { id: 't1.life.healthy-and-safe',         path: './content/t1-life-healthy-and-safe.json', pic: 'soap' },
  { id: 't1.thinking.fact-opinion-counting', path: './content/tier1-demo.json', pic: 'statement' }
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
    const icon = (window.pictureFor && window.pictureFor(p.pic || 'star')) || '';
    return `<button class="lesson-tile" data-act="open" data-path="${p.path}">
        <span class="tile-sun">${icon}</span><span class="tile-title">${title}</span>
      </button>`;
  }).join('');
  $('stage').innerHTML = `
    <p class="lesson-title">${I18nProvider.t(lang, 'pick')}</p>
    <div class="lesson-shelf">${tiles}</div>`;
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
  const colors = ['var(--gold)', 'var(--amber)', 'var(--rose)', 'var(--good)'];
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
