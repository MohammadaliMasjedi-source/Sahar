/* T-SAHAR-05: device-independent offline integrity checks.
 * Runs the real service-worker install handler in a small Cache API harness.
 * This does not replace a browser/PWA or physical Android airplane-mode test.
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const source = read('sw.js');
const manifest = JSON.parse(read('content/packs.manifest.json'));
const audioFiles = JSON.parse(read('audio/audio-manifest.json'));
const packUrls = manifest.bands.flatMap((b) => b.packs.map((p) => './content/' + p.file));

function worker(options = {}) {
  const handlers = {};
  const calls = { batches: [], skipWaiting: 0 };
  const cache = {
    async addAll(urls) {
      calls.batches.push(Array.from(urls));
      if (options.failUrl && urls.includes(options.failUrl)) throw new Error('unavailable: ' + options.failUrl);
    },
    async match(url) {
      if (url !== './content/packs.manifest.json' || options.missingManifest) return undefined;
      return { async json() {
        if (options.badJSON) throw new SyntaxError('invalid JSON');
        return Object.hasOwn(options, 'manifest') ? options.manifest : manifest;
      } };
    }
  };
  const context = {
    self: {
      addEventListener(type, handler) { handlers[type] = handler; },
      skipWaiting() { calls.skipWaiting++; return Promise.resolve(); }
    },
    caches: { async open() { return cache; } },
    async fetch() {
      if (options.audioNetworkError) throw new Error('audio unavailable');
      return { ok: true, async json() { return audioFiles; } };
    }
  };
  vm.createContext(context);
  vm.runInContext(source + '\nglobalThis.OFFLINE_TEST = { CACHE, APP_SHELL };', context, { filename: 'sw.js' });
  return {
    shell: Array.from(context.OFFLINE_TEST.APP_SHELL), calls,
    install() {
      let lifetime;
      handlers.install({ waitUntil(promise) { lifetime = promise; } });
      assert.ok(lifetime && typeof lifetime.then === 'function', 'install must extend its lifetime');
      return lifetime;
    }
  };
}

function localRef(file, ref) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref)) return null;
  const clean = ref.split(/[?#]/)[0];
  if (!clean) return null;
  return './' + path.posix.normalize(path.posix.join(path.posix.dirname(file), clean));
}

function requiredStaticAssets() {
  const required = new Set();
  for (const file of ['index.html', 'bootstrap.html', 'teacher.html']) {
    required.add('./' + file);
    for (const match of read(file).matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) {
      const ref = localRef(file, match[1]);
      if (ref) required.add(ref);
    }
  }
  for (const file of ['styles.css', 'bootstrap.css', 'profiles.css', 'themes/kanoon/kanoon.css']) {
    required.add('./' + file);
    const css = read(file).replace(/\/\*[\s\S]*?\*\//g, '');
    for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s"')]+))\s*\)/g)) {
      const ref = localRef(file, match[1] || match[2] || match[3]);
      if (ref) required.add(ref);
    }
  }
  // These are the data entry points used by app.js and bootstrap.js.
  for (const file of ['app.js', 'bootstrap.js']) {
    const match = read(file).match(/const (?:MANIFEST_PATH|PACK_PATH)\s*=\s*['"]([^'"]+)['"]/);
    assert.ok(match, file + ': data entry-point declaration must remain discoverable');
    required.add(localRef(file, match[1]));
  }
  return required;
}

function assertShellCoverage(shell) {
  const cached = new Set(shell);
  for (const ref of requiredStaticAssets()) assert.ok(cached.has(ref), 'not precached: ' + ref);
  for (const ref of shell) {
    const file = ref === './' ? 'index.html' : ref.slice(2);
    assert.ok(fs.existsSync(path.join(ROOT, file)), 'stale precache entry: ' + ref);
  }
}

function assertPWA(data, shell) {
  for (const field of ['name', 'short_name', 'start_url', 'scope', 'display']) {
    assert.ok(typeof data[field] === 'string' && data[field].trim(), 'manifest missing ' + field);
  }
  assert.ok(['standalone', 'minimal-ui', 'fullscreen'].includes(data.display), 'installable display mode');
  assert.ok(Array.isArray(data.icons), 'manifest icons must be an array');
  const cached = new Set(shell);
  for (const size of ['192x192', '512x512']) {
    assert.ok(data.icons.some((icon) => icon.sizes === size && icon.type === 'image/png'), 'missing PNG icon ' + size);
  }
  assert.ok(data.icons.some((icon) => (icon.purpose || '').split(/\s+/).includes('maskable')), 'missing maskable icon');
  for (const icon of data.icons) assert.ok(cached.has(localRef('manifest.webmanifest', icon.src)), 'uncached manifest icon');
  assert.ok(cached.has(localRef('manifest.webmanifest', data.start_url)), 'uncached start_url');
}

let passed = 0, failed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('  ok   ' + name); }
  catch (error) { failed++; console.error('  FAIL ' + name + ' -> ' + error.message); }
}

(async () => {
  console.log('Sahar OFFLINE install and asset integrity tests\n');
  await test('APP_SHELL covers current HTML, styles, fonts and runtime data entry points', () => assertShellCoverage(worker().shell));
  await test('coverage rejects a deliberately removed app script', () => assert.throws(() => assertShellCoverage(worker().shell.filter((p) => p !== './app.js')), /not precached: .\/app.js/));
  await test('coverage rejects a stale asset path', () => assert.throws(() => assertShellCoverage([...worker().shell, './missing-offline-fixture.css']), /stale precache entry/));
  await test('PWA manifest has required fields and precached installation icons', () => assertPWA(JSON.parse(read('manifest.webmanifest')), worker().shell));
  await test('manifest validator rejects a deliberately missing 512px icon', () => {
    const broken = JSON.parse(read('manifest.webmanifest'));
    broken.icons = broken.icons.filter((icon) => icon.sizes !== '512x512');
    assert.throws(() => assertPWA(broken, worker().shell), /missing PNG icon 512x512/);
  });
  await test('every band pack and optional audio manifest path exists on disk', () => {
    for (const ref of [...packUrls, ...audioFiles.map((file) => './' + file)]) {
      assert.ok(fs.existsSync(path.join(ROOT, ref.slice(2))), 'missing bundled file: ' + ref);
    }
  });
  await test('successful install precaches every band pack before skipWaiting', async () => {
    const w = worker(); await w.install();
    const cached = new Set(w.calls.batches.flat());
    for (const ref of packUrls) assert.ok(cached.has(ref), ref);
    assert.equal(w.calls.skipWaiting, 1);
  });
  await test('shell failure rejects installation and does not activate the candidate', async () => {
    const w = worker({ failUrl: './app.js' });
    await assert.rejects(w.install(), /unavailable/);
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('one failed required lesson pack rejects installation instead of masking incomplete offline content', async () => {
    const w = worker({ failUrl: packUrls[0] });
    await assert.rejects(w.install(), /unavailable/);
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('missing cached pack manifest rejects installation', async () => {
    const w = worker({ missingManifest: true });
    await assert.rejects(w.install());
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('invalid manifest JSON rejects installation', async () => {
    const w = worker({ badJSON: true });
    await assert.rejects(w.install(), /invalid JSON/);
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('invalid band structure rejects installation', async () => {
    const w = worker({ manifest: { bands: [{ band: '6-8' }] } });
    await assert.rejects(w.install());
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('required pack paths cannot escape the bundled content directory', async () => {
    const w = worker({ manifest: { bands: [{ packs: [{ file: '../outside.json' }] }] } });
    await assert.rejects(w.install());
    assert.equal(w.calls.skipWaiting, 0);
  });
  await test('empty later-tier bands remain valid when real earlier-tier packs exist', async () => {
    const w = worker(); await w.install(); assert.equal(w.calls.skipWaiting, 1);
  });
  await test('an unavailable optional audio manifest does not block text-first installation', async () => {
    const w = worker({ audioNetworkError: true }); await w.install();
    assert.equal(w.calls.skipWaiting, 1);
  });
  await test('an unavailable optional audio clip does not block text-first installation', async () => {
    const w = worker({ failUrl: './' + audioFiles[0] }); await w.install();
    assert.equal(w.calls.skipWaiting, 1);
  });
  console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
  process.exitCode = failed ? 1 : 0;
})();
