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

/* ---- the dawn-bird mascot (Sahar's kid mascot: a small sunrise bird 🐦) ---- */
function birdSVG(size) {
  const s = size || 34;
  return `<svg class="dawnbird" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="var(--amber)" opacity=".22"/>
    <ellipse cx="21" cy="23" rx="9" ry="7.5" fill="var(--amber)"/>
    <circle cx="14" cy="18" r="6" fill="var(--amber)"/>
    <circle cx="12" cy="17" r="1.3" fill="var(--ink)"/>
    <path d="M6 18 l-4 -1 4 -1Z" fill="var(--gold)"/>
    <path d="M23 22 q7 -4 11 -1 q-5 5 -11 3Z" fill="var(--rose)"/>
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

/* ---- the honest "what's real vs placeholder" banner ------------------------
 * Reads the pack's declared audioStatus AND what actually played this session. */
function honestyLine() {
  const modes = Object.keys(bs.audioModes);
  const played = modes.length
    ? modes.map((m) => ({ recording: 'real recordings', tts: 'browser voice', tone: 'placeholder tone' }[m] || m)).join(' + ')
    : 'not played yet';
  const declared = (bs.pack && bs.pack.audioStatus) || 'placeholder';
  return { declared, played };
}

function renderBanner() {
  const h = honestyLine();
  const msg = {
    fa: `نمونهٔ اولیه · صداها هنوز واقعی نیستند (اکنون: ${h.played}) · صدای واقعی سحر/ندا بعداً · نیاز به آزمایش با ۲–۳ کودک`,
    en: `PROTOTYPE · audio is ${h.declared} (now playing: ${h.played}) · real Sahar/Neda voice comes later · needs a 2–3 child pilot`,
    de: `PROTOTYP · Audio ist ${h.declared} (jetzt: ${h.played}) · echte Sahar/Neda-Stimme folgt · braucht Pilot mit 2–3 Kindern`
  }[bs.lang];
  $$('bs-banner').textContent = msg;
}

/* ---- the dawn progress path (Duolingo-style bar + bird moving to the sun) --- */
function renderProgress() {
  const p = bs.session ? window.BootstrapCore.progress(bs.session) : 0;
  const pct = Math.round(p * 100);
  const el = $$('bs-progress');
  el.innerHTML = `
    <div class="path">
      <div class="fill" style="inline-size:${pct}%"></div>
      <div class="bird" style="inset-inline-start:calc(${pct}% - 17px)">${birdSVG(34)}</div>
      <div class="goal">🌅</div>
    </div>`;
}

/* ---- play a label and record its honest mode ---- */
async function playLabel(label, lang, isL2) {
  const r = await window.AudioEngine.voice(label, lang, isL2);
  bs.audioModes[r.mode] = true;
  renderBanner();
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
  renderBanner();
  if (!bs.session) return;
  if (bs.session.done) renderDone();
  else renderRound();
}

/* ---- taps ---- */
function onTapChoice(tappedId) {
  const before = bs.session.idx;
  const round = bs.session.rounds[before];
  const fb = $$('bs-fb');
  if (window.BootstrapCore.isCorrect(round, tappedId)) {
    bs.session = window.BootstrapCore.applyTap(bs.session, tappedId);
    window.AudioEngine.cheer();
    if (fb) fb.textContent = '🌟 ' + t('great');
    // brief celebration, then next round
    renderProgress();
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
