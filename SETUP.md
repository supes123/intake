# Intake Ledger — setup

A single-page app you install on your phone's home screen. You speak (or type) what you ate; the app asks Claude to estimate calories and macros, shows you the numbers to check, and saves the day to a JSON file in your Dropbox. The 9 pm chat check-in still works and drops its entries into the same folder, where the app picks them up.

Everything sensitive — your Anthropic API key and your Dropbox sign-in — stays on the phone. Nothing but the food log itself is written to Dropbox.

Four steps, about 20 minutes, all on a computer except the last one.

---

## 1. Host the app (GitHub Pages)

The app needs an `https://` address so Dropbox can sign you in and so the phone can install it as an app. GitHub Pages is free and has no server to maintain.

1. Sign in at github.com (create an account if needed).
2. **New repository** → name it `intake` → Public → Create. (Public means the code is visible, not your data. There are no secrets in the files.)
3. **Add file → Upload files** → drag in all six files from this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` → Commit.
4. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
5. After a minute the page shows your address, e.g. `https://<your-username>.github.io/intake/`. Open it once in a browser to confirm the app loads. **Copy this address** — you need it in step 2.

To update the app later, upload a new `index.html` over the old one. Phones pick it up on the next open.

## 2. Dropbox app key

1. Go to dropbox.com/developers/apps → **Create app**.
2. *Scoped access* → **Full Dropbox** → name it `Intake Ledger` → Create.
3. On the **Permissions** tab tick `files.metadata.read`, `files.metadata.write`, `files.content.read`, `files.content.write` → Submit.
4. On the **Settings** tab:
   - Copy the **App key** (a short string of letters and digits). You will type it into the app.
   - Under **OAuth 2 → Redirect URIs**, paste the address from step 1 exactly as it appears in the app's Settings screen under "Redirect URI to register" (it will be your GitHub Pages address, ending in `/`). Click Add.
   - Leave *Allow public clients (Implicit Grant & PKCE)* set to **Allow**.

You do not need to generate an access token; the app signs in with your normal Dropbox login.

## 3. Anthropic API key

1. Go to console.anthropic.com and sign in or create an account (it is separate from your Claude subscription).
2. **Settings → Billing** → add a card and a small credit, £10 is plenty. Each meal estimate costs a fraction of a penny; a month of daily use is well under £1.
3. **Settings → API Keys → Create Key** → name it `Intake Ledger` → copy it. It starts with `sk-ant-` and is only shown once.

## 4. On your phone

1. Open the GitHub Pages address in Safari (iPhone) or Chrome (Android).
2. **Add to Home Screen**: Safari → Share → *Add to Home Screen*. Chrome → menu → *Add to Home screen* / *Install app*. Open it from the icon from now on.
3. Tap **Settings** (bottom right):
   - Dropbox: paste the **App key**; leave the folder as `/Investments/AI models/Intake Ledger` (already created, with your 10 September entry in it). Tap **Connect Dropbox**, sign in, allow. You come back to the app and it syncs.
   - Claude: paste the API key, leave the model as it is, tap **Save and test**. It should say the key works.
4. Tap **Log**, press the mic, say what you ate, tap **Estimate with Claude**. Check the numbers, adjust if needed, **Add to the day**.

---

## Branded products

When you name a commercial product ("a Green & Black's dark chocolate bar", "Hellmann's mayo", "a pot of Tnuva 5% cottage cheese"), the app does not guess: Claude looks the product up in Open Food Facts, the open database of packaged-food labels, takes the per-100 g values from the label, scales them to what you ate, and notes the record it used in the meal description. Unbranded and home-cooked food is still estimated. If a product is missing from the database, it falls back to an estimate and tells you.

## How it fits together

```
you speak ──► app ──► Claude API ──► estimate ──► you confirm ──► intake-state.json (Dropbox)
                                                                        ▲
9 pm chat check-in ──► Claude writes inbox/<date>.json ─── app merges on next sync ─┘
```

- `intake-state.json` — the record. Written only by the app. Days, meals, weights, targets.
- `inbox/*.json` — drop zone for Claude's chat check-ins. The app merges each file and moves it to `inbox/processed/`.
- Edits on two devices merge by meal, so using the app on both a phone and an iPad is fine.
- Offline: the app opens and shows your data without a connection; estimates need the network; changes sync when you are back online.

## Troubleshooting

- **"Sign-in failed" after Dropbox login** — the Redirect URI in the Dropbox App Console does not match the address exactly. Copy it from the app's Settings screen.
- **Estimate failed: 401** — API key wrong or pasted with a space. **429** — out of credit or rate-limited. **404 model** — type a current model name in the Model box (e.g. `claude-sonnet-4-5`).
- **Mic button does nothing** — the browser does not offer speech recognition in installed mode. Tap into the text box and use the keyboard's own microphone key; it works everywhere.
- **Sync failed** — tap Settings → Sync now for the specific error. Token refresh problems are fixed by Disconnect → Connect Dropbox.
