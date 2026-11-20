# Offline installation integrity — T-SAHAR-05

20 November 2026. Code/tooling contribution, based on main `f00ba2f`.
Implementation and automated evidence are ready for independent PR review;
this document does not record a merge or deployment.

## Confirmed defect and fix

The service worker's install handler caught and ignored a failed required
content-pack precache. It could then call `skipWaiting()` even though a lesson
pack was unavailable. A device going offline before first opening that lesson
would have no cached copy. Its comment already said such a failure should reject
installation, but the implementation did not enforce that rule.

Required pack-manifest parsing, band/filename validation and pack precaching now
reject the install on failure. A failed update therefore does not replace the
previous worker with this incomplete candidate. The cache version is `sahar-v26`.
Optional draft audio remains best-effort, so audio/network failure does not block
the required text-first installation. No lesson words, pack JSON, recordings or
learner storage are changed.

## Automated scope

`npm run test:offline` / `node test/offline.test.js` checks:

- APP_SHELL coverage of current HTML assets, CSS fonts, data entry points,
  installation icons and existing local files;
- PWA manifest required fields, icon sizes and cached start URL;
- existence of current manifest-listed lesson/audio files;
- the actual service-worker install handler in a controlled Cache API harness:
  complete install, required-file failure, missing/malformed manifest,
  malformed band structure, non-local pack path and optional-audio failures;
- negative fixtures that remove a required script, add a stale asset path, or
  remove the 512px icon, ensuring the checks detect a regression.

The new suite has 16 checks. On unchanged main, 11 passed and five install-failure
regressions failed; after this change, all 16 pass. The complete package test
command has 254 passing checks (238 existing + 16 offline), zero failures.
In the current development environment npm is absent, so the exact Node commands
from `package.json` were executed directly, without dependency installation or
omitting a suite. Full output is attached to the PR description.

## Remaining human/device gates

This harness does not simulate real browser storage quotas, interruption of a
download, service-worker lifecycle timing, accessibility tools, or a physical
Android device. Complete `docs/PHONE-TEST.md` before claiming real-device
airplane-mode support. An adult-supervised pilot, human Dari recordings and the
native-Dari, safeguarding and context reviews remain open. This change does not
implement signed pack distribution or demonstrate learning outcomes.
