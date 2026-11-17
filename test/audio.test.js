/* Sahar audio fallback lifecycle tests. Pure Node; no recordings or child-facing
 * content are changed. Events and time are controlled so a stalled file is
 * distinguishable from a confirmed playing event without a real 3-second wait. */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'audio.js'), 'utf8');

function fixture() {
  let now = 0, nextTimer = 0;
  const timers = new Map(), files = [], spoken = [];
  class FakeAudio {
    constructor(url) { this.url = url; this.listeners = new Map(); this.playCalls = 0; this.pauseCalls = 0; files.push(this); }
    addEventListener(name, callback) { this.listeners.set(name, callback); }
    removeEventListener(name, callback) { if (this.listeners.get(name) === callback) this.listeners.delete(name); }
    emit(name) { const listener = this.listeners.get(name); if (listener) listener(); }
    play() { this.playCalls++; return this.playPromise || Promise.resolve(); }
    pause() { this.pauseCalls++; }
  }
  const window = { speechSynthesis: {
    getVoices: () => [{ lang: 'en-US' }],
    cancel() {},
    speak(utterance) { spoken.push(utterance.text); utterance.onend(); }
  } };
  const context = {
    window, Audio: FakeAudio, module: { exports: {} },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    setTimeout(callback, delay) { const id = ++nextTimer; timers.set(id, { callback, time: now + delay }); return id; },
    clearTimeout(id) { timers.delete(id); }
  };
  vm.runInNewContext(source, context, { filename: 'audio.js' });
  function advance(milliseconds) {
    const end = now + milliseconds;
    while (true) {
      const due = [...timers.entries()].filter(([, t]) => t.time <= end).sort((a, b) => a[1].time - b[1].time || a[0] - b[0]);
      if (!due.length) break;
      const [id, timer] = due[0]; timers.delete(id); now = timer.time; timer.callback();
    }
    now = end;
  }
  return { engine: context.module.exports.AudioEngine, files, spoken, timers, advance };
}

const label = { text: 'book', audio: 'audio/test-label.mp3' };
let passed = 0, failed = 0;
async function test(name, run) {
  try { await run(); passed++; console.log('  ok   ' + name); }
  catch (error) { failed++; console.log('  FAIL ' + name + ' -> ' + error.message); }
}

(async () => {
  console.log('Sahar AUDIO lifecycle tests\n');
  await test('a resolved play promise without playing does not prevent the timeout fallback', async () => {
    const f = fixture(); const outcome = f.engine.voice(label, 'en');
    await Promise.resolve();
    assert.equal(f.spoken.length, 0, 'do not fall back before the file timeout');
    f.advance(3000);
    assert.equal((await outcome).mode, 'tts');
    assert.deepEqual(f.spoken, ['book']);
  });
  await test('a timed-out file removes its listeners and stops pending playback', async () => {
    const f = fixture(); const outcome = f.engine.voice(label, 'en');
    f.advance(3000); await outcome;
    assert.equal(f.files[0].listeners.size, 0, 'no stale playing/error handlers after fallback');
    assert.equal(f.files[0].pauseCalls, 1, 'a late recording must not overlap the fallback');
  });
  await test('a timed-out URL is skipped on the next prompt instead of stalling again', async () => {
    const f = fixture(); const first = f.engine.voice(label, 'en');
    f.advance(3000); await first;
    const second = f.engine.voice(label, 'en');
    assert.equal(f.files[0].playCalls, 1, 'the same failed file should not be retried during this session');
    assert.equal((await second).mode, 'tts');
    assert.equal(f.spoken.length, 2);
  });
  await test('a playing event confirms the file and clears its safety timer', async () => {
    const f = fixture(); const outcome = f.engine.voice(label, 'en');
    f.files[0].emit('playing');
    assert.equal((await outcome).mode, 'recording');
    assert.equal(f.files[0].listeners.size, 0);
    assert.equal(f.timers.size, 0, 'a confirmed recording should not retain a timeout');
    assert.equal(f.files[0].pauseCalls, 0);
    assert.equal(f.spoken.length, 0);
  });
  await test('an error uses the fallback immediately and clears its safety timer', async () => {
    const f = fixture(); const outcome = f.engine.voice(label, 'en');
    f.files[0].emit('error');
    assert.equal((await outcome).mode, 'tts');
    // Browser speech has its own existing timeout; only the 3s file timer must be gone.
    assert.equal([...f.timers.values()].some(t => t.time === 3000), false);
    assert.equal(f.files[0].listeners.size, 0);
  });
  await test('a late play rejection cannot invalidate a recording already confirmed by playing', async () => {
    const f = fixture();
    // Cache the element through a successful first call, then control its next play promise.
    const first = f.engine.voice(label, 'en'); f.files[0].emit('playing'); await first;
    let rejectPlay;
    f.files[0].playPromise = new Promise((resolve, reject) => { rejectPlay = reject; });
    const second = f.engine.voice(label, 'en'); f.files[0].emit('playing'); await second;
    rejectPlay(new Error('late rejection')); await Promise.resolve(); await Promise.resolve();
    f.files[0].playPromise = Promise.resolve();
    const third = f.engine.voice(label, 'en');
    assert.equal(f.files[0].playCalls, 3, 'late rejection must not poison the URL cache');
    f.files[0].emit('playing');
    assert.equal((await third).mode, 'recording');
    assert.equal(f.spoken.length, 0);
  });
  await test('a stalled Persian/Dari file keeps the existing tone fallback policy', async () => {
    const f = fixture(); const outcome = f.engine.voice(label, 'fa-AF');
    f.advance(3000);
    assert.equal((await outcome).mode, 'tone');
    assert.equal(f.spoken.length, 0, 'do not introduce unreliable Dari browser speech');
  });
  await test('a confirmed file can be replayed using the cached media element', async () => {
    const f = fixture(); const first = f.engine.voice(label, 'en');
    f.files[0].emit('playing'); await first;
    const second = f.engine.voice(label, 'en'); f.files[0].emit('playing');
    assert.equal((await second).mode, 'recording');
    assert.equal(f.files.length, 1);
    assert.equal(f.files[0].playCalls, 2);
  });
  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed) process.exitCode = 1;
})();
