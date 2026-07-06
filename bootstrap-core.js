/* Sahar — bootstrap-core.js
 * PURE core for the audio-first / picture-first first-contact flow.
 * NO DOM, NO audio here — just the logic of "which pictures, in which order,
 * how do we score a tap". Kept UI-free so it is testable headless (node),
 * matching the house rule the Leitner core follows in app.js.
 *
 * The flow (SAHAR-COVERAGE §6.5 A + B) — ZERO reading required:
 *   For each item the child:
 *     (a) sees the picture, hears it named in L1 (mother tongue),
 *     (b) hears it named in L2 (the new language),
 *     (c) taps the matching picture among a small set of choices.
 *   No prompt is ever read. Text on cards is DECORATIVE only.
 */
'use strict';

/** Deterministic-ish shuffle (Fisher-Yates). `rnd` injectable for tests. */
function shuffle(arr, rnd) {
  const r = rnd || Math.random;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/**
 * Build the ordered list of "rounds" for a language-course pack.
 * Each round targets one item and offers `choiceCount` picture choices
 * (the correct one + distractors drawn from the other items).
 * @param {object} pack  a language-course pack ({items:[...]})
 * @param {number} choiceCount  pictures shown per round (default 3)
 * @param {function} rnd  optional RNG for deterministic tests
 * @returns {Array<{itemId,item,choices:[itemId],answer:itemId}>}
 */
function buildRounds(pack, choiceCount, rnd) {
  const items = (pack && pack.items) || [];
  const n = Math.max(2, Math.min(choiceCount || 3, items.length || 2));
  return items.map((item) => {
    const others = items.filter((x) => x.id !== item.id);
    const distractors = shuffle(others, rnd).slice(0, n - 1).map((x) => x.id);
    const choices = shuffle([item.id].concat(distractors), rnd);
    return { itemId: item.id, item, choices, answer: item.id };
  });
}

/** Is a tapped choice correct for this round? */
function isCorrect(round, tappedId) {
  return !!round && round.answer === tappedId;
}

/** Fresh session state for a pack. */
function newSession(pack, choiceCount, rnd) {
  return {
    packId: pack && pack.packId,
    rounds: buildRounds(pack, choiceCount, rnd),
    idx: 0,
    correct: 0,
    attempts: 0,
    done: false
  };
}

/**
 * Apply a tap. Returns a NEW session (no mutation). On a correct tap we
 * advance; on a wrong tap we stay on the same round (gentle: try again).
 */
function applyTap(session, tappedId) {
  const s = Object.assign({}, session, {
    rounds: session.rounds,
    attempts: session.attempts + 1
  });
  const round = s.rounds[s.idx];
  if (isCorrect(round, tappedId)) {
    s.correct += 1;
    s.idx += 1;
    if (s.idx >= s.rounds.length) s.done = true;
  }
  return s;
}

/** Progress as a 0..1 fraction (for the Duolingo-style bar). */
function progress(session) {
  const total = (session.rounds && session.rounds.length) || 1;
  return Math.max(0, Math.min(1, session.idx / total));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { shuffle, buildRounds, isCorrect, newSession, applyTap, progress };
}
if (typeof window !== 'undefined') {
  window.BootstrapCore = { shuffle, buildRounds, isCorrect, newSession, applyTap, progress };
}
