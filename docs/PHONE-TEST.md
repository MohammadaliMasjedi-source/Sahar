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
- Choose a first-load route below: a trusted HTTPS host serving your test revision, or a laptop, USB cable, and Android USB debugging on a test phone you control. Same Wi-Fi is not required.

## 1. Open the test revision from a trustworthy origin

**Option A — HTTPS.** Serve the checkout (including its worker, manifests, packs and audio) on a static HTTPS host the phone trusts. Open its app URL in Chrome. Use the same origin throughout the test; the GitHub source-code view is not a deployment.

**Option B — USB loopback.** On the laptop, run this from the repository root:

```sh
python3 -m http.server 8123 --bind 127.0.0.1
```

On desktop Chrome, connect the test phone using [Chrome's USB port-forwarding instructions, Android case](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/#port-forwarding). In `chrome://inspect/#devices`, enable USB discovery and forward **device port 8123** to **127.0.0.1:8123 on the laptop**. On the phone, open `http://localhost:8123/index.html`. The page should show the welcome screen and lesson shelf.

An ordinary `http://192.168.…` LAN address may display the page but cannot exercise service-worker registration on standard Android Chrome. [Service workers require a trustworthy origin](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register); use one of the two routes above.

## 2. Install and verify that the worker controls the app

- Use Android Chrome's **Install app** action (often under **Add to Home screen**). A shortcut alone is not confirmation of an offline installation.
- Open Sahar once from its home-screen icon while the host is reachable. Using desktop Chrome's remote inspector for that page, check `window.isSecureContext` is `true`. In **Application → Service Workers**, verify that this revision's `sw.js` is **activated**.
- Reload once if needed, then verify `navigator.serviceWorker.controller?.scriptURL` points to the app's `sw.js`. If it is still missing, stop and record the error. A fixed wait or a visible home-screen icon does not establish control or complete audio coverage; test those assets below.

## 3. Remove **all** routes back to the host

- For the USB route, stop the laptop server, disable port forwarding and unplug USB **before** the cold launch. Airplane mode does not turn off a wired forwarding route.
- Turn on airplane mode and confirm mobile data and Wi-Fi are both off. For the HTTPS route, also disconnect any USB forwarding or other network adapter.

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
use a trusted debugging computer) lets you inspect the Console. If reconnecting USB after the cold launch, keep the laptop server stopped and port forwarding disabled. Confirm:
- [ ] Zero console errors during the entire offline playthrough above.
- [ ] `navigator.serviceWorker.controller` is non-null (the SW is actually
      controlling the page, not just registered).

## 6. What "pass" means — and what it still doesn't mean
Passing every checkbox establishes that the recorded revision, on **this phone and browser version**, reopened offline after initial provisioning and played the tested pack. It does not establish behavior on other phones or untested packs.

It does **not** mean Sahar is "ready to use" — the other open gates
(`SAHAR-COVERAGE-STATUS.md` §5, §6.5) still stand: no real human voice
recording yet (machine draft voice only, honestly banner'd), no child pilot,
no Duolingo-grade illustration pass beyond this session's mascot/celebration
work. Record the result (pass/fail per checkbox, phone model + Android/Chrome
version, and any console errors seen) back into `SAHAR-COVERAGE-STATUS.md`
under a new dated entry — do not upgrade any "ready" claim without that.
