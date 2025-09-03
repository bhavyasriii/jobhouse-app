# JobHouse – Job Application Tracker (Expo + Web)

A simple, friendly job-application tracker built with **React Native + Expo Router**, exported to a static **web** site.

**Live:** [https://bhavyasriii.github.io/jobhouse-app/](https://bhavyasriii.github.io/jobhouse-app/)

---

## ✨ Features

* Add jobs (role, company, link, notes)
* Status dropdown (Applied / Interviewing / Offer / Rejected …)
* Dates: **Applied** and **Status Updated**
* Persistent data with **AsyncStorage**
* Quick **share/export** (JSON/text)
* Clean, mobile‑first UI

---

## 🧰 Tech Stack

* **Expo 53**, **React Native 0.79**, **React 19**
* **Expo Router 5** + **React Navigation 7**
* **AsyncStorage** for persistence
* **@react-native-community/datetimepicker** for dates
* (Optional UI) **react-native-paper**

---

## 📦 Project Structure (important bits)

```
jobhouse-app/
├─ app/
│  ├─ _layout.tsx           # Expo Router root (required)
│  └─ index.tsx             # Home route (re-exports your HomeScreen)
├─ screens/
│  ├─ HomeScreen.js         # Home list
│  ├─ AddJobScreen.js       # Add a job
│  └─ EditJobScreen.js      # Edit/delete a job
├─ components/              # Reusable UI (HapticTab, IconSymbol, etc.)
├─ assets/                  # icons, images
├─ app.json                 # Expo config  → web.output = "static"
├─ package.json             # scripts for dev/build/deploy
└─ vercel.json              # (only for Vercel) SPA rewrites
```

> **Why `app/`?** Expo Router only discovers routes inside an `app/` folder. At minimum you need `app/_layout.tsx` and one route like `app/index.tsx`.

---

## 🚀 Quick Start (local dev)

```bash
# install deps
npm install

# run in Expo (QR / simulator)
npm start

# run on the web\	npm run web
```

---

## 🔧 Scripts

These are the scripts used in this repo:

```json
{
  "scripts": {
    "start": "expo start",
    "web": "expo start --web",
    "build:web": "expo export --platform web --output-dir=dist",
    "predeploy": "npm run build:web && powershell -Command \"Copy-Item -Path dist\\index.html -Destination dist\\404.html\"",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## 🌐 Deploy – GitHub Pages (static)

1. Ensure `app.json` has:

   ```json
   {
     "expo": {
       "web": { "output": "static", "publicPath": "./", "favicon": "./assets/favicon.png" }
     }
   }
   ```
2. Set the homepage in `package.json` (already set):

   ```json
   { "homepage": "https://bhavyasriii.github.io/jobhouse-app" }
   ```
3. Build & publish:

   ```bash
   npm run build:web
   npm run predeploy   # copies index.html → 404.html for SPA refresh
   npm run deploy      # pushes dist/ to gh-pages branch
   ```
4. In GitHub → **Settings → Pages**: Source = **gh-pages** / **/(root)**.

---

## ▲ Deploy – Vercel (optional)

Add a **vercel.json** at the repo root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "cleanUrls": true
}
```

Then set build settings:

* **Framework preset:** Other
* **Install Command:** `npm install`
* **Build Command:** `npx expo export --platform web`
* **Output Directory:** `dist`

> If you deploy via CLI with a prebuilt `dist/`, copy `vercel.json` into `dist/` before `vercel deploy dist`.

---

## 📄 Configuration Notes

* Remove invalid `entryPoint` from `app.json` (Expo 53 validates config strictly).
* Environment variables for web must start with `EXPO_PUBLIC_` (e.g. `EXPO_PUBLIC_API_BASE`). Add them in Vercel/Pages if needed.

---

## 📚 Troubleshooting

**“No routes found”** during export

* Ensure you have `app/_layout.tsx` and at least one route like `app/index.tsx`.
* In this project, `app/index.tsx` simply re-exports the existing `screens/HomeScreen.js`:

  ```tsx
  // app/index.tsx
  import HomeScreen from "../screens/HomeScreen";
  export default HomeScreen;
  ```

**Expo doctor dependency mismatches**

```bash
npx expo-doctor
npx expo install <packages it suggests>
```

**Windows cleanup**

```powershell
# instead of rm -rf
foreach ($p in 'node_modules','.expo','.cache','dist') { if (Test-Path $p) { Remove-Item $p -Recurse -Force } }
```

**Blank screen on web**

* Avoid HTML‑only tags like `<select>` / `<input type="date">` in React Native code. Use RN components (e.g., Picker, community DateTimePicker).

---

## 🛣️ Roadmap

* Search & filters
* CSV export
* Cloud backup (Supabase/Firebase)
* Better empty states and toasts
* E2E tests (Web + Android)

---

## 📱 Mobile Builds (EAS)

```bash
npm i -g eas-cli
eas login && eas init
# Android internal build
eas build -p android --profile preview
# iOS TestFlight (requires Apple Dev account)
eas build -p ios --profile preview
```

Add minimal `eas.json`:

```json
{
  "cli": { "version": ">= 3.0.0" },
  "build": {
    "preview": { "distribution": "internal" },
    "release": { "distribution": "store" }
  }
}
```

---

## 🤝 Contributing

PRs/issues welcome! Keep components platform‑safe (no web‑only HTML tags) and prefer `expo install` for native deps.

---

## 📝 License

MIT © 2025 Bhavyasri Mudireddy
