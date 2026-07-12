/* Sahar — bootstrap.js  (VIEW + glue for the audio-first first-contact flow)
 * Depends on: bootstrap-core.js (pure logic), pictures.js (SVG), audio.js (voice).
 * The view holds NO scheduling logic — it renders session state and forwards taps.
 *
 * Design language here is Sahar's KID language (NOT Mo's adult Farr): a dawn-bird
 * mascot, big touch targets, warm colors, a visible progress path, a celebration
 * on success. Every prompt is SPOKEN — the child never has to read to advance.
 */
'use strict';

/* ---- UI strings (chrome only; the learning content is audio + pictures) ---- */
const BSTRINGS = {
  fa: {
    dir: 'rtl',
    title: 'اولین کلمه‌ها',
    hearMine: 'به زبان من',
    hearNew: 'به انگلیسی',
    tapPrompt: 'کدام تصویر است؟ لمس کن.',
    again: 'دوباره بشنو',
    tryAgain: 'دوباره امتحان کن',
    great: 'آفرین!',
    doneTitle: 'همه را یاد گرفتی!',
    doneSub: 'سحر به تو افتخار می‌کند. باز هم تمرین کن.',
    restart: 'از نو',
    home: 'خانه',
    listen: 'گوش کن',
    caregiver: 'برای بزرگ‌ترها'
  },
  en: {
    dir: 'ltr',
    title: 'First Words',
    hearMine: 'in my language',
    hearNew: 'in English',
    tapPrompt: 'Which picture is it? Tap it.',
    again: 'Hear again',
    tryAgain: 'Try again',
    great: 'Great!',
    doneTitle: 'You learned them all!',
    doneSub: 'Sahar is proud of you. Practice again anytime.',
    restart: 'Start over',
    home: 'Home',
    listen: 'Listen',
    caregiver: 'For grown-ups'
  },
  de: {
    dir: 'ltr',
    title: 'Erste Wörter',
    hearMine: 'in meiner Sprache',
    hearNew: 'auf Englisch',
    tapPrompt: 'Welches Bild ist es? Tippe darauf.',
    again: 'Nochmal hören',
    tryAgain: 'Nochmal versuchen',
    great: 'Super!',
    doneTitle: 'Du hast alle gelernt!',
    doneSub: 'Sahar ist stolz auf dich. Übe jederzeit weiter.',
    restart: 'Von vorn',
    home: 'Start',
    listen: 'Hören',
    caregiver: 'Für Erwachsene'
  }
};

const PACK_PATH = './content/lc-fa-en-first-words.json';

const bs = {
  lang: localStorage.getItem('sahar.lang') || 'fa',
  pack: null,
  session: null,
  audioModes: {},        // which modes have actually played (for honesty banner)
  busy: false
};

const $$ = (id) => document.getElementById(id);
function t(key) { return (BSTRINGS[bs.lang] || BSTRINGS.en)[key]; }

/* -------- content provider (same-origin JSON, cached by the service worker) -- */
async function loadPack() {
  const res = await fetch(PACK_PATH);
  if (!res.ok) throw new Error('pack load failed');
  return res.json();
}

/* ---- the dawn-bird mascot (Sahar's kid mascot: a small sunrise bird) ----
 * Kept as private local SVG generators (not mascot.js) — this page deliberately
 * doesn't load mascot.js, see mascot.js's own header comment. */
function birdSVG(size) {
  const s = size || 34;
  return `<svg class="dawnbird" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="var(--amber, #f4a259)" opacity=".22"/>
    <ellipse cx="21" cy="23" rx="9" ry="7.5" fill="var(--amber, #f4a259)"/>
    <circle cx="14" cy="18" r="6" fill="var(--amber, #f4a259)"/>
    <circle cx="12" cy="17" r="1.3" fill="var(--ink, #1c1430)"/>
    <path d="M9.5 19.6 L3.5 18 L9.5 16.4 Z" fill="var(--gold, #ffd89b)"/>
    <path d="M23 22 q7 -4 11 -1 q-5 5 -11 3Z" fill="var(--rose, #e0719b)"/>
  </svg>`;
}

/** A small flat sunrise glyph — replaces the raw 🌅 goal-marker emoji. */
function sunriseSVG(size) {
  const s = size || 24;
  return `<svg class="mascot-sunrise" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
    <g stroke="var(--gold, #ffd89b)" stroke-width="2.6" stroke-linecap="round">
      <line x1="20" y1="2" x2="20" y2="8"/>
      <line x1="5" y1="9" x2="9.5" y2="13.5"/>
      <line x1="35" y1="9" x2="30.5" y2="13.5"/>
      <line x1="1" y1="22" x2="8" y2="22"/>
      <line x1="32" y1="22" x2="39" y2="22"/>
    </g>
    <circle cx="20" cy="24" r="10" fill="var(--amber, #f4a259)"/>
    <circle cx="20" cy="24" r="10" fill="none" stroke="var(--gold, #ffd89b)" stroke-width="2"/>
  </svg>`;
}

/** A small flat star glyph — replaces the raw 🌟 feedback emoji, and doubles
 *  as the correct-tap celebration burst particle. */
function starSVG(size) {
  const s = size || 18;
  return `<svg class="mascot-star" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3 L24.6 15.3 L37.8 15.8 L27.2 23.9 L30.9 36.6 L20 29.2 L9.1 36.6 L12.8 23.9 L2.2 15.8 L15.4 15.3Z"
          fill="var(--gold, #ffd89b)" stroke="var(--amber, #f4a259)" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`;
}

/* ---- language chrome ---- */
function applyChrome() {
  document.documentElement.lang = bs.lang;
  document.documentElement.dir = (BSTRINGS[bs.lang] || BSTRINGS.en).dir;
  document.querySelectorAll('#bs-langs button').forEach((b) =>
    b.classList.toggle('on', b.getAttribute('data-lang') === bs.lang));
  $$('bs-title').textContent = t('title');
}

/* ---- the honest "what's real vs placeholder" note --------------------------
 * Reads the pack's declared audioStatus AND what actually played this session.
 * Design fix: lives ONLY inside the caregiver sheet now (showCaregiver()) —
 * it used to be a banner shown above every child-facing round. */
const BS_AUDIO_MODE_LABELS = {
  fa: { recording: 'صدای رایانه‌ای موقت', tts: 'صدای مرورگر', tone: 'زنگ جایگزین' },
  en: { recording: 'temporary machine voice', tts: 'browser voice', tone: 'placeholder tone' },
  de: { recording: 'vorübergehende Computerstimme', tts: 'Browser-Stimme', tone: 'Platzhalter-Ton' }
};
const BS_NOT_PLAYED_YET = { fa: 'هنوز پخش نشده', en: 'not played yet', de: 'noch nicht abgespielt' };

function honestyLine() {
  const modes = Object.keys(bs.audioModes);
  const labels = BS_AUDIO_MODE_LABELS[bs.lang] || BS_AUDIO_MODE_LABELS.en;
  const played = modes.length
    ? modes.map((m) => labels[m] || m).join(' + ')
    : (BS_NOT_PLAYED_YET[bs.lang] || BS_NOT_PLAYED_YET.en);
  const declared = (bs.pack && bs.pack.audioStatus) || 'placeholder';
  return { declared, played };
}

function honestyMessage() {
  const h = honestyLine();
  return {
    fa: `نمونهٔ اولیه · این صدا فعلاً یک صدای رایانه‌ای موقت است (اکنون: ${h.played}) · صدای واقعی انسان (سحر/ندا) به‌زودی می‌آید · نیاز به آزمایش با ۲–۳ کودک`,
    en: `PROTOTYPE · this voice is a temporary machine voice for now (now playing: ${h.played}) · a real human voice (Sahar/Neda) is coming · needs a 2–3 child pilot`,
    de: `PROTOTYP · diese Stimme ist vorübergehend eine Computerstimme (jetzt: ${h.played}) · eine echte menschliche Stimme (Sahar/Neda) folgt · braucht Pilot mit 2–3 Kindern`
  }[bs.lang] || '';
}

/* ---- the dawn progress path (Duolingo-style bar + bird moving to the sun) --- */
function renderProgress() {
  const p = bs.session ? window.BootstrapCore.progress(bs.session) : 0;
  const pct = Math.round(p * 100);
  const el = $$('bs-progress');
  el.innerHTML = `
    <div class="path">
      <div class="fill" style="inline-size:${pct}%"></div>
      <div class="bird" style="inset-inline-start:clamp(4px, calc(${pct}% - 17px), calc(100% - 38px))">${birdSVG(34)}</div>
      <div class="goal">${sunriseSVG(24)}</div>
    </div>`;
}

/* ---- play a label and record its honest mode ---- */
async function playLabel(label, lang, isL2) {
  const r = await window.AudioEngine.voice(label, lang, isL2);
  bs.audioModes[r.mode] = true;
  return r;
}

/** Voice the current item: L1 first, then (after a beat) L2. */
async function voiceCurrent() {
  const round = bs.session.rounds[bs.session.idx];
  if (!round) return;
  bs.busy = true;
  await playLabel(round.item.l1, bs.pack.l1, false);
  await new Promise((r) => setTimeout(r, 450));
  await playLabel(round.item.l2, bs.pack.l2, true);
  bs.busy = false;
}

/* ---- render one round (picture-first, tap-to-match, zero reading) ---- */
function renderRound() {
  const round = bs.session.rounds[bs.session.idx];
  const stage = $$('bs-stage');
  if (!round) return;

  // the "hero" picture being named + two big LISTEN buttons (icons, no reading)
  const heroPic = window.pictureFor(round.item.pic);

  const choices = round.choices.map((cid) => {
    const it = bs.pack.items.find((x) => x.id === cid);
    return `<button class="pic-choice" data-tap="${cid}" aria-label="choice">
      ${window.pictureFor(it.pic)}
    </button>`;
  }).join('');

  stage.innerHTML = `
    <div class="fc-hero">
      <div class="fc-pic big">${heroPic}</div>
      <div class="listen-row">
        <button class="listen-btn l1" data-act="say-l1" aria-label="${t('hearMine')}">
          <span class="lico">🔊</span><span class="ltxt">${t('hearMine')}</span>
        </button>
        <button class="listen-btn l2" data-act="say-l2" aria-label="${t('hearNew')}">
          <span class="lico">🔊</span><span class="ltxt">${t('hearNew')}</span>
        </button>
      </div>
    </div>
    <p class="fc-tap">${t('tapPrompt')}</p>
    <div class="pic-grid">${choices}</div>
    <div class="fc-feedback" id="bs-fb" aria-live="polite"></div>`;

  renderProgress();
  // auto-voice the item on entering the round (the child hears before tapping)
  voiceCurrent();
}

function renderDone() {
  const stage = $$('bs-stage');
  stage.innerHTML = `
    <div class="fc-done">
      <div class="fc-bird-big">${birdSVG(96)}</div>
      <h2>${t('doneTitle')}</h2>
      <p>${t('doneSub')}</p>
      <button class="fc-btn" data-act="restart">${t('restart')}</button>
    </div>`;
  renderProgress();
  window.AudioEngine.cheer();
}

function render() {
  applyChrome();
  if (!bs.session) return;
  if (bs.session.done) renderDone();
  else renderRound();
}

/** Correct-tap TILE feedback (design fix): the tapped picture itself gets a
 *  brief scale + gold-glow (~200ms) and an 8-12 SVG-star burst from its own
 *  position, instead of the tile showing no state at all. */
function celebrateTile(tileEl) {
  if (!tileEl) return;
  tileEl.classList.remove('correct'); void tileEl.offsetWidth; tileEl.classList.add('correct');
  setTimeout(() => tileEl.classList.remove('correct'), 220);

  const host = $$('bs-stage');
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
    bits += `<i style="left:${cx}px; top:${cy}px; --dx:${dx}px; --dy:${dy}px; animation-delay:${delay}s;">${starSVG(size)}</i>`;
  }
  const burst = document.createElement('div');
  burst.className = 'star-burst';
  burst.innerHTML = bits;
  host.appendChild(burst);
  setTimeout(() => burst.remove(), 900);
}

/** Hop the mascot bird one step on the dawn progress path immediately on a
 *  correct tap — a cosmetic bounce layered on top of renderProgress(), which
 *  still owns the real percentage. */
function hopBird(containerId) {
  const el = document.querySelector(`#${containerId} .bird`);
  if (!el) return;
  el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
  setTimeout(() => el.classList.remove('hop'), 500);
}

/* ---- taps ---- */
function onTapChoice(tappedId) {
  const before = bs.session.idx;
  const round = bs.session.rounds[before];
  const fb = $$('bs-fb');
  if (window.BootstrapCore.isCorrect(round, tappedId)) {
    bs.session = window.BootstrapCore.applyTap(bs.session, tappedId);
    window.AudioEngine.cheer();
    if (fb) fb.innerHTML = `${starSVG(18)} ${t('great')}`;
    const tile = document.querySelector(`.pic-choice[data-tap="${tappedId}"]`);
    celebrateTile(tile);
    // renderProgress() rebuilds the bar's innerHTML (new %), which would
    // wipe out a `.hop` class added beforehand — so hop AFTER re-rendering,
    // onto the freshly-built bird element.
    renderProgress();
    hopBird('bs-progress');
    setTimeout(render, 700);
  } else {
    // gentle: mark the wrong pic, invite another try, re-voice the word
    const btn = document.querySelector(`.pic-choice[data-tap="${tappedId}"]`);
    if (btn) { btn.classList.add('wrong'); setTimeout(() => btn.classList.remove('wrong'), 500); }
    if (fb) fb.textContent = t('tryAgain');
    voiceCurrent();
  }
}

function startSession() {
  bs.session = window.BootstrapCore.newSession(bs.pack, 3);
  render();
}

function setLang(lang) {
  if (!BSTRINGS[lang]) return;
  bs.lang = lang;
  localStorage.setItem('sahar.lang', lang);
  render();
}

/* ---- caregiver sheet (read-aloud lines; the realistic delivery channel) ---- */
function showCaregiver() {
  const rows = bs.pack.items.map((it) => {
    const line = (it.caregiver && (it.caregiver[bs.lang] || it.caregiver.en)) || '';
    return `<li><span class="cg-pic">${window.pictureFor(it.pic)}</span><span>${line}</span></li>`;
  }).join('');
  const rec = window.AudioEngine.CaregiverRecorder.supported()
    ? { fa: 'حالت ضبط صدا (به‌زودی): شما می‌توانید کلمه را با صدای خودتان ضبط کنید. هیچ صدایی از دستگاه بیرون نمی‌رود.',
        en: 'Record mode (coming soon): you can record the word in your own voice. Nothing ever leaves the device.',
        de: 'Aufnahmemodus (bald): Sie können das Wort mit Ihrer Stimme aufnehmen. Nichts verlässt das Gerät.' }[bs.lang]
    : { fa: 'حالت ضبط صدا در این دستگاه پشتیبانی نمی‌شود.', en: 'Record mode is not supported on this device.', de: 'Aufnahmemodus wird auf diesem Gerät nicht unterstützt.' }[bs.lang];
  $$('bs-stage').innerHTML = `
    <div class="caregiver">
      <p class="prototype-banner">${honestyMessage()}</p>
      <p class="cg-note">${(bs.pack.caregiverIntro && (bs.pack.caregiverIntro[bs.lang] || bs.pack.caregiverIntro.en)) || ''}</p>
      <ul class="cg-list">${rows}</ul>
      <p class="cg-rec">🎙 ${rec}</p>
      <button class="fc-btn" data-act="back">↩ ${t('home')}</button>
    </div>`;
}

/* ---- wiring ---- */
function wire() {
  $$('bs-langs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if (b) setLang(b.getAttribute('data-lang'));
  });
  $$('bs-caregiver').addEventListener('click', () => { window.AudioEngine.unlock(); showCaregiver(); });
  document.body.addEventListener('click', () => window.AudioEngine.unlock(), { once: true });

  $$('bs-stage').addEventListener('click', (e) => {
    const tapBtn = e.target.closest('[data-tap]');
    if (tapBtn) { window.AudioEngine.unlock(); onTapChoice(tapBtn.getAttribute('data-tap')); return; }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    window.AudioEngine.unlock();
    const a = act.getAttribute('data-act');
    if (a === 'say-l1') { const r = bs.session.rounds[bs.session.idx]; playLabel(r.item.l1, bs.pack.l1, false); }
    else if (a === 'say-l2') { const r = bs.session.rounds[bs.session.idx]; playLabel(r.item.l2, bs.pack.l2, true); }
    else if (a === 'restart') startSession();
    else if (a === 'back') render();
  });
}

async function boot() {
  wire();
  try {
    bs.pack = await loadPack();
  } catch (err) {
    $$('bs-stage').innerHTML = `<div class="fc-done"><div class="big">🌙</div>
      <p>Could not load the lesson pack.</p></div>`;
    return;
  }
  startSession();
  if ('serviceWorker' in navigator) {
    try { navigator.serviceWorker.register('./sw.js'); } catch (_) {}
  }
}

document.addEventListener('DOMContentLoaded', boot);
