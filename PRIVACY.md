# Sahar — Privacy

*Written 2026-07-14 for Digital Public Goods Alliance review and for any caregiver who wants to
know exactly what Sahar does with a child's information. Short version: **offline-first, no
tracking, no accounts, no PII sent anywhere — but progress, settings, and downloaded lessons do
stay on the device itself, readable by anyone who can unlock and use it, until deleted.**
GDPR/COPPA-aligned by design. Long version below — specific, not just a promise.*

This is a description of how Sahar is built, not a legal compliance certification. Sahar is not a
company and processes no data on any server it operates, which is itself the reason the compliant
path and the safe path are the same path (see "Why GDPR/COPPA alignment is structural" below).

## The one-line summary

Sahar sends nothing off the device, because there is nowhere for anything to go. It is a static,
offline PWA: no backend, no database, no account system, no analytics vendor, no advertising SDK,
no third-party script of any kind (verified — every `<script src>` in `index.html`,
`bootstrap.html`, and `teacher.html` points to a local, same-origin file; see
`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`'s independent check of the same fact). That is
a claim about the network, not about the device — Sahar does store progress, settings, and
downloaded lesson packs locally, and that data sits on the device, visible to anyone who can unlock
and use it, until it is deleted. See "What is stored, and where" and "On-device visibility" below
for the honest, specific version of both halves of that claim.

## What is stored, and where

Everything Sahar remembers lives in the browser's `localStorage` **on that one device**, under
these keys (see [`DATA-HANDLING.md`](DATA-HANDLING.md) for the full data-format detail):

| Key | What it holds | Who typed it |
|---|---|---|
| `sahar.profiles.v1` | Per-child: an **optional** display name (freetext, caregiver-typed, capped at 40 characters, never required — a pre-literate child can use just an avatar + color), an age band, an avatar choice, and the date the profile was created. | Caregiver, optionally |
| `sahar.garden.v1` | Which lesson packs each profile has completed, and how many times. | The app, from play |
| `sahar.progress.v1[.profileId]` | Per-card spaced-repetition state (Leitner box number, next-due date, repeat/lapse counts). | The app, from play |
| `sahar.lang` | The selected UI language (`fa`/`en`/`de`). | The child/caregiver |
| `sahar.theme` | The selected visual theme. | The child/caregiver |

None of this is a login, an identifier, or a record tied to a real-world identity by anything
Sahar does. The one field that *could* contain a name is the optional profile name — and by design
it never leaves the device, so no outside party can "collect" it: it sits in the browser exactly
like a name written in a paper notebook, not in a database anyone can query. It is still written
down, though — on this device, in this notebook — and that notebook is not locked (see "On-device
visibility" below).

Beyond `localStorage`, the service worker (`sw.js`) also keeps a **Cache Storage** copy of the app
shell and of every content pack, audio file, and manifest it has downloaded, so Sahar keeps working
offline. That cache is not a hidden compartment: it is ordinary browser data, sitting on the device
the same way `localStorage` does, readable through the browser's own storage/developer tools and
removed by the same "clear site data" action described under "Deleting data" below.

## What is never collected

No accounts, no email, no phone number, no login of any kind. No analytics or telemetry — there is
no telemetry call to turn off, because none exists. No advertising, no ad identifiers, no
third-party SDKs. No cookies. No IP-address logging (there is no server to log to). No device
fingerprinting. No cloud sync by default. No biometric or voice data — `audio.js`'s
`CaregiverRecorder` (a designed local-only recording mode for caregiver-read audio) is an unwired
stub that returns `not-implemented` when called; it captures nothing today.

## Network behavior

The service worker (`sw.js`) makes **zero external network calls** — its own header comment says
so, and it is true: the only `fetch()` calls anywhere in the app (`app.js`, `bootstrap.js`, `sw.js`)
load Sahar's own bundled content-pack JSON, its own audio-manifest JSON, and its own app-shell
files — same-origin, cached by the service worker, indistinguishable in effect from reading a
local file. After the first load, Sahar runs at zero internet and stays that way; there is no
"phone home" path for it to use even if it wanted to.

## On-device visibility

Everything above is about the network: nothing is sent anywhere. It says nothing about the device
itself. On the device, Sahar's data is **not hidden or encrypted** — it sits in `localStorage` and
Cache Storage exactly like any other website's or app's data. Anyone who can unlock and use the
device — a sibling sharing it, a caregiver, or anyone else who gets hold of it — can see that Sahar
was used and read what is stored, either inside the app itself (open profiles/progress) or, with a
little technical knowledge, through the browser's own storage/developer tools.

Being offline-first stops this data from ever reaching a server, company, or outsider over a
network. It does **not** make Sahar invisible to someone holding the unlocked device. For a child
who must not be seen learning, the honest mitigation today is deleting the app or clearing the
site's storage after use (see "Deleting data" below) — there is not yet a fast in-app "erase
everything" button; that gap is tracked as `TASKS.md` T-SAHAR-08.

## Multi-child devices

Progress and garden data are namespaced per profile (`profiles.js`), so if two siblings share one
phone, one child's spaced-repetition history is never shown to or overwritten by the other.

## Deleting data

Because nothing is stored anywhere but the device, deleting it is immediate and complete: clearing
the site's storage in the browser (or uninstalling the installed PWA) removes every trace — both
the `localStorage` entries above and the Cache Storage copies of downloaded packs, audio, and app
files. There is no remote copy to also delete, no account to close, no request to file. Until that
step is taken, though, the data sits readable on the device — see "On-device visibility" above.

## Why GDPR/COPPA alignment is structural, not a policy promise

- **GDPR:** GDPR's obligations attach to processing of personal data by a controller. Sahar
  processes no personal data outside the user's own device and transmits none anywhere — there is
  no data flow for the regulation's machinery to act on.
- **COPPA:** COPPA's core duty is "don't collect personal information from children under 13
  without verifiable parental consent." Sahar's answer is not a consent flow — it's that no
  personal information is collected in the first place (an optional local nickname that never
  leaves the device is not "collected" in the sense the rule targets).

This is why the design choice (offline-first, local-only) *is* the privacy posture, not a
compliance layer bolted on afterward — see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §8,
written before this document, for the original "privacy is the safety model" reasoning.

## Honest gaps

- **No formal legal review.** This document was written by the project, not certified by a
  privacy lawyer. Treat it as an accurate technical description, not a legal opinion.
- **No in-app "export/delete my data" control yet** beyond the browser's own storage settings —
  see [`DATA-HANDLING.md`](DATA-HANDLING.md) for the honest status of that gap, and "On-device
  visibility" above for why that gap matters for safety, not just convenience. Tracked as
  `TASKS.md` T-SAHAR-08.
- **The designed (not built) encrypted optional backup feature** (`docs/ARCHITECTURE.md` §8) does
  not exist yet — today there is no backup path at all, which is maximally private but means a
  reset device loses progress. Named here so it isn't forgotten.

*Related: [`DATA-HANDLING.md`](DATA-HANDLING.md) (what the local data looks like and how to get it
out), [`DO-NO-HARM.md`](DO-NO-HARM.md) (the wider child-safeguarding picture),
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §8.*
