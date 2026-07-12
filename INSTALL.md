# Installing Sahar — نصب سحر — Sahar installieren

Sahar is a **Progressive Web App (PWA)**: no app store, no account, no download of an `.exe`/`.apk`
file. You install it straight from the web link, and after the very first successful open it keeps
working with **zero internet**, forever (see `docs/ARCHITECTURE.md` §1).

This page has the same instructions three times — English, دری (Dari), Deutsch — so a teacher,
parent, or child can read it in whichever language they're comfortable in.

> Honest note: install *works* on Android and Windows exactly the way described below (verified in
> this repo's PWA audit — real manifest, real service worker, real PNG icon set, 0 console errors on
> a served copy of the app). **iOS is different and more limited — read that section before assuming
> it behaves like Android.**

---

## 🇬🇧 English

### Android (Chrome or Edge)
1. Open the Sahar link in **Chrome** or **Edge**.
2. Tap the **⋮** (three-dot) menu, top-right corner.
3. Tap **"Install app"** — or **"Add to Home screen"** (the exact wording depends on your browser
   version; some phones show an automatic install banner or an icon in the address bar instead —
   any of these is fine, tap it).
4. Confirm by tapping **Install** in the pop-up.
5. Open Sahar **once from its new home-screen icon** while you still have internet, and wait about
   15–20 seconds before switching to airplane mode — this gives it time to save the lessons for
   offline use.
6. From then on, Sahar opens and works with **Wi-Fi and mobile data both off**.

### Windows (Edge or Chrome)
1. Open the Sahar link in **Microsoft Edge** or **Google Chrome**.
2. Look at the right side of the address bar for a small **install icon** (a monitor/computer with a
   `+` or `↓`).
3. Click it, then click **Install**.
   - If you don't see that icon: open the **`⋯`** menu → **Apps** → **Install this site as an app**.
4. Sahar now appears in the **Start menu** and can be pinned to the taskbar/desktop — it opens in its
   own window, no browser address bar or tabs.
5. It keeps working offline after the first successful load, same as Android.

### iOS (iPhone/iPad) — Safari only, with real limitations
1. Open the Sahar link **in Safari**. This step is not optional: Chrome, Edge, and Firefox on iOS are
   all required by Apple to use Safari's engine, but **only Safari itself can add a web app to the
   home screen** — the others cannot, at all.
   - If the link was opened inside another app (WhatsApp, Instagram, etc.), tap that app's share/`···`
     icon first and choose **"Open in Safari."**
2. Tap the **Share** button (a square with an arrow pointing up), usually in the bottom toolbar.
3. Scroll down the share sheet and tap **"Add to Home Screen."**
4. Tap **Add** (top-right corner).
5. Sahar's icon now appears on the home screen and opens full-screen, no Safari address bar.

**Honest iOS limitations — please read before relying on this for a child:**
- **No install prompt.** iOS never suggests installing; a caregiver has to already know to use the
  Share → Add to Home Screen steps above.
- **No push notifications.** iOS's support for web-app notifications is limited/absent compared to
  Android — Sahar does not use them today, but if that ever changes, iOS users won't get them the
  same way Android users do.
- **Storage can be capped or cleared.** iOS Safari's "Intelligent Tracking Prevention" can clear a
  web app's locally-saved data (this is where lesson progress lives) if the app sits unopened for
  roughly two to three weeks. Android and Windows installs do **not** have this cap. If a child on
  iOS goes quiet for a few weeks, their progress may be gone when they come back — this is an Apple
  platform limitation, not a Sahar bug.
- **Must stay in Safari.** Re-adding via any other browser does not work.
- **Icon look may differ slightly.** iOS uses its own `apple-touch-icon` file and rounds the corners
  itself, so Sahar's home-screen icon may look a little different from the Android/Windows version.

### Offline after install (all platforms)
Open Sahar once while connected to the internet so it can save everything it needs. After that first
successful open, airplane mode is fine — Sahar keeps working with zero internet, indefinitely.

---

## 🇦🇫 دری (فارسی)

<div dir="rtl" lang="fa">

### اندروید (Chrome یا Edge)
۱. لینک سحر را در **Chrome** یا **Edge** باز کن.
۲. روی نشانه سه‌نقطه **⋮** در گوشه بالا-راست ضربه بزن.
۳. روی **«Install app»** (نصب برنامه) یا **«Add to Home screen»** (افزودن به صفحه اصلی) ضربه بزن —
   نوشته دقیق بسته به نسخه مرورگر فرق می‌کند؛ بعضی گوشی‌ها به‌جای آن یک پیام خودکار نصب یا نشانه‌ای
   در نوار آدرس نشان می‌دهند — هرکدام را دیدی، همان را بزن.
۴. با زدن **Install** در پنجره‌ی تأیید، نصب را تأیید کن.
۵. یک‌بار سحر را از **نشانه‌ی تازه روی صفحه اصلی** باز کن، درحالی‌که هنوز اینترنت داری، و پیش از
   روشن‌کردن حالت پرواز حدود ۱۵ تا ۲۰ ثانیه صبر کن — این زمان برای ذخیره‌ی درس‌ها جهت استفاده‌ی
   آفلاین لازم است.
۶. از این پس، سحر با **وای‌فای و اینترنت موبایل هردو خاموش** باز می‌شود و کار می‌کند.

### ویندوز (Edge یا Chrome)
۱. لینک سحر را در **Microsoft Edge** یا **Google Chrome** باز کن.
۲. در سمت راست نوار آدرس، دنبال یک نشانه‌ی کوچک **نصب** بگرد (یک مانیتور/کامپیوتر با علامت `+`
   یا `↓`).
۳. روی آن کلیک کن، سپس **Install** را بزن.
   - اگر آن نشانه را ندیدی: منوی **`⋯`** ← **Apps** ← **«Install this site as an app»** را باز کن.
۴. سحر اکنون در **منوی Start** ظاهر می‌شود و می‌توان آن را به نوار وظیفه/دسکتاپ سنجاق کرد — در
   پنجره‌ی خودش باز می‌شود، بدون نوار آدرس یا تب‌های مرورگر.
۵. درست مثل اندروید، بعد از اولین بارگذاری موفق، به‌صورت آفلاین هم کار می‌کند.

### آی‌فون/آی‌پد (iOS) — فقط با Safari، با محدودیت‌های واقعی
۱. لینک سحر را **در Safari** باز کن. این مرحله اختیاری نیست: Chrome، Edge و Firefox روی iOS همه
   موظف‌اند از موتور Safari استفاده کنند، اما **فقط خودِ Safari می‌تواند برنامه را به صفحه اصلی
   اضافه کند** — بقیه اصلاً نمی‌توانند.
   - اگر لینک داخل برنامه‌ی دیگری باز شده (واتس‌اپ، اینستاگرام و غیره)، اول روی نشانه‌ی اشتراک/`···`
     همان برنامه بزن و **«Open in Safari»** را انتخاب کن.
۲. روی دکمه‌ی **Share** (مربعی با فلش رو به بالا) که معمولاً در نوار پایین است ضربه بزن.
۳. در فهرست اشتراک‌گذاری پایین برو و روی **«Add to Home Screen»** ضربه بزن.
۴. **Add** (بالا-راست) را بزن.
۵. نشانه‌ی سحر اکنون روی صفحه اصلی ظاهر می‌شود و به‌صورت تمام‌صفحه باز می‌شود، بدون نوار آدرس Safari.

**محدودیت‌های واقعی iOS — لطفاً پیش از اعتماد کامل برای یک کودک این را بخوان:**
- **بدون پیشنهاد نصب.** iOS هیچ‌وقت نصب را پیشنهاد نمی‌دهد؛ مراقب باید از قبل بداند که باید مراحل
  Share ← Add to Home Screen را انجام دهد.
- **بدون اعلان (push notification).** پشتیبانی iOS از اعلان‌های برنامه‌ی وب محدود یا ناموجود است؛
  سحر امروز از اعلان استفاده نمی‌کند، اما اگر روزی این تغییر کند، کاربران iOS آن را مثل اندروید
  دریافت نخواهند کرد.
- **حافظه ممکن است محدود یا پاک شود.** ویژگی «Intelligent Tracking Prevention» در Safari می‌تواند
  داده‌های ذخیره‌شده‌ی محلی یک برنامه‌ی وب (جایی که پیشرفت درس‌ها ذخیره می‌شود) را اگر برنامه حدود
  دو تا سه هفته باز نشود، پاک کند. نصب روی اندروید و ویندوز چنین محدودیتی **ندارد**. اگر کودکی روی
  iOS چند هفته سراغ برنامه نرود، ممکن است پیشرفتش هنگام بازگشت از بین رفته باشد — این محدودیت پلتفرم
  اپل است، نه یک اشکال در سحر.
- **باید در Safari بماند.** افزودن دوباره از مرورگر دیگر کار نمی‌کند.
- **ظاهر نشانه ممکن است کمی فرق کند.** iOS از فایل مخصوص خودش (`apple-touch-icon`) استفاده می‌کند و
  خودش گوشه‌ها را گرد می‌کند، پس نشانه‌ی سحر روی صفحه اصلی iOS ممکن است کمی با نسخه‌ی اندروید/ویندوز
  فرق داشته باشد.

### کارکردن آفلاین بعد از نصب (همه‌ی پلتفرم‌ها)
یک‌بار سحر را وقتی به اینترنت وصلی باز کن تا هرچه لازم دارد ذخیره کند. بعد از اولین بازکردنِ موفق،
حالت پرواز مشکلی ندارد — سحر برای همیشه، بدون هیچ اینترنتی، کار می‌کند.

</div>

---

## 🇩🇪 Deutsch

### Android (Chrome oder Edge)
1. Öffne den Sahar-Link in **Chrome** oder **Edge**.
2. Tippe oben rechts auf das **⋮**-Menü (drei Punkte).
3. Tippe auf **„Install app"** bzw. **„Zum Startbildschirm hinzufügen"** — der genaue Wortlaut hängt
   von der Browserversion ab; manche Handys zeigen stattdessen automatisch ein Installationsbanner
   oder ein Symbol in der Adressleiste — tippe darauf, egal welche Variante erscheint.
4. Bestätige im Pop-up mit **Install**.
5. Öffne Sahar **einmal über das neue Symbol auf dem Startbildschirm**, solange noch Internet
   besteht, und warte etwa 15–20 Sekunden, bevor du den Flugmodus einschaltest — so kann die App die
   Lektionen für die Offline-Nutzung speichern.
6. Danach öffnet und funktioniert Sahar auch mit **WLAN und mobilen Daten komplett ausgeschaltet**.

### Windows (Edge oder Chrome)
1. Öffne den Sahar-Link in **Microsoft Edge** oder **Google Chrome**.
2. Suche rechts in der Adressleiste nach einem kleinen **Installationssymbol** (ein Monitor/Computer
   mit `+` oder `↓`).
3. Klicke darauf und dann auf **Install**.
   - Falls das Symbol fehlt: Menü **`⋯`** → **Apps** → **„Diese Website als App installieren"**.
4. Sahar erscheint nun im **Startmenü** und kann an Taskleiste/Desktop angeheftet werden — es öffnet
   sich in einem eigenen Fenster, ohne Adressleiste oder Browser-Tabs.
5. Genau wie unter Android funktioniert es nach dem ersten erfolgreichen Laden auch offline.

### iOS (iPhone/iPad) — nur Safari, mit echten Einschränkungen
1. Öffne den Sahar-Link **in Safari**. Dieser Schritt ist nicht optional: Chrome, Edge und Firefox
   müssen unter iOS zwar Safaris Engine verwenden, aber **nur Safari selbst kann eine Web-App zum
   Startbildschirm hinzufügen** — die anderen können das überhaupt nicht.
   - Wurde der Link in einer anderen App geöffnet (WhatsApp, Instagram usw.), tippe zuerst dort auf
     das Teilen-/`···`-Symbol und wähle **„In Safari öffnen."**
2. Tippe auf die **Teilen**-Schaltfläche (ein Quadrat mit Pfeil nach oben), meist in der unteren
   Symbolleiste.
3. Scrolle im Teilen-Menü nach unten und tippe auf **„Zum Home-Bildschirm"**.
4. Tippe oben rechts auf **Hinzufügen**.
5. Das Sahar-Symbol erscheint jetzt auf dem Startbildschirm und öffnet sich im Vollbild, ohne
   Safari-Adressleiste.

**Ehrliche iOS-Einschränkungen — bitte lesen, bevor du dich für ein Kind darauf verlässt:**
- **Keine Installationsaufforderung.** iOS schlägt die Installation nie von selbst vor; eine
  Betreuungsperson muss die Schritte Teilen → Zum Home-Bildschirm bereits kennen.
- **Keine Push-Benachrichtigungen.** iOS unterstützt Web-App-Benachrichtigungen nur eingeschränkt
  oder gar nicht im Vergleich zu Android — Sahar nutzt heute keine, aber falls sich das ändert, kommen
  sie bei iOS-Nutzer:innen nicht wie bei Android an.
- **Speicher kann begrenzt oder gelöscht werden.** Safaris „Intelligent Tracking Prevention" kann die
  lokal gespeicherten Daten einer Web-App (dort liegt der Lernfortschritt) löschen, wenn die App etwa
  zwei bis drei Wochen lang nicht geöffnet wird. Installationen unter Android und Windows haben dieses
  Limit **nicht**. Meldet sich ein Kind auf iOS wochenlang nicht, kann der Fortschritt beim nächsten
  Öffnen weg sein — das ist eine Einschränkung von Apples Plattform, kein Sahar-Fehler.
- **Muss in Safari bleiben.** Erneutes Hinzufügen über einen anderen Browser funktioniert nicht.
- **Symbol kann leicht abweichen.** iOS verwendet seine eigene `apple-touch-icon`-Datei und rundet
  die Ecken selbst ab, daher kann das Sahar-Symbol auf dem iOS-Startbildschirm etwas anders aussehen
  als unter Android/Windows.

### Offline nach der Installation (alle Plattformen)
Öffne Sahar einmal mit Internetverbindung, damit alles Nötige gespeichert werden kann. Nach diesem
ersten erfolgreichen Öffnen ist der Flugmodus kein Problem — Sahar funktioniert danach dauerhaft ohne
jegliches Internet.

---

## What was actually verified (this audit, 2026-07-12)

- **Manifest** (`manifest.webmanifest`): `name`, `short_name`, `start_url`, `scope`,
  `display: "standalone"`, `background_color`, `theme_color` all present; icon set now includes real
  PNG files at 192×192 and 512×512 for both `purpose: "any"` and `purpose: "maskable"` (generated
  from the dawn-bird mascot in `mascot.js`, resolved to the app's real brand colors — see
  `icons/*.png`; previous icons were inline SVG data-URIs, kept only as the tab favicon now).
- **Service worker** (`sw.js`, cache `sahar-v13`): registers from `index.html`/`bootstrap.html`,
  precaches the app shell **and the new icon files**, cache-first with an offline fallback.
- **iOS tags**: `apple-touch-icon`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`
  added to `index.html` (and the icon/capable tags to `bootstrap.html`).
- **Verified in a real browser** (served over `http://127.0.0.1:8797`, Chromium preview): 0 console
  errors on `index.html` and `bootstrap.html`; manifest fetched successfully with the new icon URLs
  resolving (200 OK each); `navigator.serviceWorker.controller` is non-null (the SW actually controls
  the page, not just registered); Cache Storage (`sahar-v13`) contains all five new icon files.
- **Not verified here** (needs a real device — see `docs/PHONE-TEST.md`): the actual Android
  "Install app" banner/flow, the actual Windows Edge/Chrome install-icon flow, and the actual iOS
  Add-to-Home-Screen flow, end to end, on physical hardware. The manifest/service-worker/icon
  plumbing that those flows depend on is confirmed real and working; the on-device tap-through is the
  next honest gap to close.
