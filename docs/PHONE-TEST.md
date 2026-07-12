# Phone test — the honest remaining gate to "ready for a child"

Sahar has been verified in a desktop browser (zero console errors, all packs
playable, offline service worker precaches the shell). It has **not** been
verified the way a real learner would actually encounter it: installed as an
app on a real Android phone, with the phone in airplane mode. That is the one
gate this document exists to close. Nothing below has been run on a real
device yet — these are the exact steps to run it, honestly labelled as still
open (see `SAHAR-COVERAGE-STATUS.md`).

## What you need
- A real Android phone (the cheaper/older, the more honest the test).
- Chrome (or another Chromium-based browser) on that phone.
- The phone and a laptop on the **same Wi-Fi network** the first time only
  (to serve the files once so the phone can fetch them) — after that, the
  whole point of the test is that Wi-Fi is OFF.

## 1. Serve the app to the phone (first time only, online)
On the laptop, from the repo folder:

```
node -e "require('http').createServer(require('serve-handler')).listen(8123)"
```

(Any static file server works — Node's bundled `http` module + a tiny static
handler, `npx serve .`, Python's `http.server`, etc. The app has no build
step: it is plain HTML/CSS/JS, so any static server is enough.)

Find the laptop's local IP (e.g. `192.168.1.42`), then on the phone browser
open:

```
http://192.168.1.42:8123/index.html
```

Confirm the page loads: language buttons, the dawn-bird mascot on the
welcome screen, the lesson shelf.

## 2. Install it as a PWA (home-screen app)
- Chrome on Android: tap the ⋮ menu → **"Add to Home screen"** (or Chrome may
  show an automatic "Install app" banner/icon in the address bar — either
  path is fine).
- Confirm the install. An "Sahar" icon should appear on the home screen.
- Open the app **from the home-screen icon** (not the browser tab) at least
  once while still online, so the service worker (`sw.js`) has a chance to
  finish its install step — precaching the app shell, every content pack,
  and every audio file listed in `audio/audio-manifest.json`.
- Wait ~10-20 seconds after first open before switching to airplane mode
  (the audio precache is best-effort and can take a moment on a slow
  connection — see `sw.js`'s install handler).

## 3. Go fully offline
- Turn on **airplane mode** on the phone (Wi-Fi and mobile data both off).
- This is the real test: a school-less child with this phone will most
  likely never have working internet at all.

## 4. Play a full pack, offline, from the home-screen icon
- Close the app completely (swipe it away from recent apps) first, so this
  is a genuinely cold, offline start — not just a warm tab.
- Reopen from the **home-screen icon**.
- Confirm:
  - [ ] The app opens at all (no "no internet" browser error page).
  - [ ] The welcome screen shows: Sahar, the motto, the dawn-bird mascot
        flourish, and the language switcher (fa / en / de) all work.
  - [ ] The lesson shelf lists all 10 packs.
  - [ ] Open any pack (e.g. `t1.literacy.first-letters`) and play it
        **card-by-card to the end** ("آفرین! / Well done!" screen):
    - [ ] Every card's audio actually plays (the honesty banner should read
          the "temporary machine voice" line, not silence/error — confirms
          the `.mp3` files were precached, not just the app shell).
    - [ ] Tapping the **correct** picture/letter shows the mascot's praise
          bubble + a brief confetti burst + a short WebAudio chime, and
          advances the card.
    - [ ] Tapping a **wrong** choice gently shakes and invites another try
          (no penalty, no crash).
    - [ ] The dawn progress bar (bird flying toward the sunrise) visibly
          advances as cards are completed.
    - [ ] Reaching the end shows the "Well done!" screen with the mascot and
          a bigger celebration, with a working "practice again" / "back to
          lessons" path.
  - [ ] Switch language mid-pack (fa ↔ en ↔ de) — the UI relabels instantly,
        RTL layout is correct for fa (mirrors correctly, mascot/progress bar
        flip the right way), no reload/network needed.
  - [ ] Open `teacher.html` from the footer link, offline — it should render
        (this is a separate precached page, not just `index.html`).
  - [ ] No visible "broken image" / blank picture tiles anywhere (every
        `pictureFor()` icon is inline SVG, so this would indicate a real bug,
        not just a missing asset).

## 5. Check for silent failures
Android Chrome's remote debugging (`chrome://inspect` from a desktop Chrome,
phone connected via USB with USB debugging on) lets you watch the Console
tab while doing the above. Confirm:
- [ ] Zero console errors during the entire offline playthrough above.
- [ ] `navigator.serviceWorker.controller` is non-null (the SW is actually
      controlling the page, not just registered).

## 6. What "pass" means — and what it still doesn't mean
Passing every checkbox above means: **a child with no internet and a cheap
Android phone can actually open and play Sahar.** That is a real, meaningful,
narrow claim.

It does **not** mean Sahar is "ready to use" — the other open gates
(`SAHAR-COVERAGE-STATUS.md` §5, §6.5) still stand: no real human voice
recording yet (machine draft voice only, honestly banner'd), no child pilot,
no Duolingo-grade illustration pass beyond this session's mascot/celebration
work. Record the result (pass/fail per checkbox, phone model + Android/Chrome
version, and any console errors seen) back into `SAHAR-COVERAGE-STATUS.md`
under a new dated entry — do not upgrade any "ready" claim without that.
