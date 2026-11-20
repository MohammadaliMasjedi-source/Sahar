# Android offline installation check — an open device gate

Adult-maintainer checklist, corrected 20 November 2026. **No real Android result
is recorded here.** A desktop cached-reload and lesson-interaction check has
passed for the T-SAHAR-05 candidate; that does not establish phone support,
classroom outcomes or readiness for children. Other human/content/pilot gates in
`SAHAR-COVERAGE-STATUS.md` remain open.

Use synthetic test profiles, not a child's name or learning history. Record the
exact commit being tested. This procedure tests the app, not any real learner.

## What you need

- A real Android phone and Chrome; record the phone model, Android version and
  Chrome version rather than assuming another device will behave identically.
- **One trustworthy setup route below:** an existing HTTPS deployment of the
  chosen commit, or a laptop with Python 3, desktop Chrome and a USB data cable.
- For the USB route, owner-controlled USB debugging on the test phone. Follow
  Chrome's remote-debugging instructions; no hosting purchase or account is
  required for this local development route.

## 1. Use a trustworthy origin for the first load

Service-worker registration requires a secure/trustworthy origin. A laptop URL
such as `http://192.168.1.42:8123/` may display the page on a phone, but ordinary
LAN HTTP is **not a valid setup for this service-worker installation test**.
The loopback exception refers to `localhost` on the device opening the page,
not a different machine's LAN address. See the MDN sources below.

### Route A — an existing trusted HTTPS deployment

Open the maintainer-approved **HTTPS** URL for the exact commit being tested.
It must serve the app and `sw.js` from the expected origin/scope, with a
certificate Chrome accepts normally. If no such deployment is available, use
Route B. Do not continue through certificate warnings or enable insecure-origin
flags to make an invalid setup appear to pass. An HTML file opened directly or
a GitHub source-file page is not the deployed PWA.

### Route B — phone-local loopback through USB

1. From the chosen repository checkout on the laptop, start this standard-library
   server; it listens only on the laptop's loopback interface:

   ```sh
   python -m http.server 8123 --bind 127.0.0.1
   ```

2. Connect the Android test phone by USB and set up remote debugging. In desktop
   Chrome, open `chrome://inspect/#devices` and confirm the phone is discovered.
3. In **Port forwarding**, map device port `8123` to laptop `localhost:8123`,
   enable forwarding, and keep the USB connection while installing.
4. In **Chrome on the phone**, open `http://localhost:8123/index.html`. The phone
   sees its own loopback origin; USB forwards it to the laptop server. This is
   Chrome's documented development route, not an insecure-origin override.

Follow the [official Chrome USB-forwarding guide](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/)
if the device/forwarding controls differ. Keep the same hostname, port and app
path throughout installation and the later offline launch.

## 2. Verify installation and required cache readiness

- [ ] The app loads with its language controls and lesson shelf.
- [ ] In the **phone tab's** remotely inspected Console, `window.isSecureContext`
      is `true` and `'serviceWorker' in navigator` is `true`.
- [ ] The worker finishes installing/activating. Reload the phone page and check
      that `navigator.serviceWorker.controller` is non-null. Registration alone
      is not proof that the current page is controlled.
- [ ] In DevTools **Application → Cache Storage**, inspect the cache matching
      `CACHE` in the tested commit's `sw.js`. Confirm the app shell,
      `content/packs.manifest.json`, **every pack listed in its bands**, and
      `content/lc-fa-en-first-words.json` are present. Record the cache name.
- [ ] Use Chrome's install/home-screen action and open the resulting icon while
      the server is still reachable. Record whether it opens as an installed app
      or only a browser shortcut; an icon by itself does not prove PWA installation.

If secure context, activation, control or required cache checks fail, mark setup
**blocked/failed** and stop. Merely waiting 15–20 seconds does not establish that
installation succeeded. For an update, verify the intended worker/cache is in use,
rather than mistaking an older installed version for this candidate.

Draft audio is **optional and best-effort**. Inspect it separately if testing audio;
missing draft audio is not evidence that the required text-first cache is missing.
It must not prevent a lesson from being usable without sound.

## 3. Remove every route back to the server

- [ ] For Route B, stop the laptop HTTP server, disable port forwarding and
      disconnect the USB cable **before the cold-start offline check**. Airplane
      mode alone does not remove a USB-forwarded server connection.
- [ ] Turn on airplane mode and explicitly confirm **both Wi-Fi and mobile data
      are off**. Keep them off for Route A as well.
- [ ] Close the app/tab completely, then reopen from the home-screen icon at the
      same origin. Do not clear browser/app storage; this tests a cached install.

## 4. Complete a pack from a cold offline launch

- [ ] The app opens without the browser's network-error page.
- [ ] The expected age-band shelf appears. In the present prototype, band 6–8
      has ten packs and band 8–10 has four; later bands are previews, not finished
      lessons. Check against the manifest of the exact commit being tested.
- [ ] Open a pack **not previously opened during this installation**. Record its
      pack ID and finish it card by card **with audio off**.
- [ ] Correct and wrong selections produce their expected feedback without
      skipping cards or crashing; the lesson can reach its completion screen.
- [ ] Restart/back-to-lessons navigation works.
- [ ] Test fa / en / de switching and Persian RTL layout without reconnecting.
- [ ] Open the separate `teacher.html` page offline.
- [ ] No blank/broken picture tiles are seen.

### Optional audio check — record separately from text-first pass

- [ ] Enable sound through an ordinary user action and check the selected pack's
      audio offline. Record which files/languages were actually heard.
- [ ] The existing temporary-machine-voice label remains visible; never record
      this as a human Dari recording.
- [ ] If a clip is absent, blocked or stalled, record the failure and confirm the
      learner can continue without sound. Do not mark unheard clips as passed.

## 5. Record evidence and limits

Record pass/fail/not-tested for each checkbox, date, commit, origin/setup route,
phone/OS/Chrome versions, worker cache name, tested pack IDs/languages and whether
the app opened standalone or as a browser shortcut. Capture only synthetic QA
data. Note any visible errors or Console errors actually observed; if the Console
was not monitored, say so instead of claiming zero errors.

You may reconnect USB for inspection **after** the isolated cold-start/lesson
check; leave the server stopped and forwarding disabled so inspection does not
silently restore access to the source files.

A pass supports only the tested phone/browser/commit/pack combination. It does
not establish all-device support, indefinite storage retention, real human Dari
audio, reviewed new educational content, a child pilot or learning outcomes.
Add an honest dated result to `SAHAR-COVERAGE-STATUS.md`; leave device gates open
until they have actually been run. Do not upgrade a learner-readiness claim from
desktop checks or this written procedure alone.

## Primary references

- [MDN — service-worker registration and trustworthy origins](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
- [MDN — secure contexts and loopback origins](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
- [Chrome — Android access to a local server through USB forwarding](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/)
