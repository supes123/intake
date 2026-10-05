# Intake Ledger — getting started

You've been sent a link to Intake Ledger. It's a small app that turns a spoken (or typed, or photographed) description of what you ate into calories and macros, keeps the record in **your own Dropbox**, and gives you a short, direct read on each day. Nothing is stored anywhere else and nobody but you can see your log.

It takes about ten minutes to set up and needs two accounts you may already have.

## 1. Install it

Open the link in Chrome (Android) or Safari (iPhone). Chrome: menu ⋮ → **Add to Home screen** (or **Install app**). Safari: Share → **Add to Home Screen**. From now on open it from the icon; it works offline for viewing.

## 2. Add a Claude API key

The estimates are done by Claude, Anthropic's AI, using a key that belongs to you, so you pay Anthropic directly and only for what you use — a typical day of logging costs a few pence.

1. Go to **console.anthropic.com** and create an account (separate from any Claude chat subscription).
2. **Settings → Billing** — add a card and a small amount of credit (£5–10 lasts months).
3. **Settings → API Keys → Create Key** — copy it (it starts with `sk-ant-` and is shown once).
4. In the app: **Settings → Claude** — paste the key and tap **Save and test**.

The key is stored only on your phone.

## 3. Connect Dropbox

**Settings → Dropbox → Connect Dropbox**, sign in to your Dropbox and allow access. The app creates a folder called `Intake Ledger` with one file in it; that file is your entire record. You can change the folder name first if you like.

## 4. Tell it about you

**Settings → About you** — age, sex, height, weight, how active you are and what you're aiming for, then **Save and calculate targets**. This sets your daily calorie and macro targets (you can edit any number afterwards) and lets Claude judge portions and exercise for someone your size. Add a line of notes if there's something it should know — "weights three times a week", "kosher", "no dairy".

## Using it

- **Log** tab: tap the mic and say what you ate and any exercise ("two eggs on toast, chicken salad for lunch, and a 40-minute run"). Or type it, or add a photo of the plate. Tap **Estimate with Claude**, check the numbers, change anything by hand or by saying what's wrong, then **Add to the day**.
- Named products ("a Green & Black's dark chocolate bar") are looked up from their actual label rather than guessed.
- **Today** tab: your ring and nutrient bars, each meal with its items, a short note on what drove the day, and a weight field. Swipe right for earlier days. Tap **Edit** on any meal to change it later.
- **History** tab: swipe the chart to see each nutrient over the last two weeks; averages and weight trend below.
- Exercise you log is credited to your allowance at 50% by default (Settings → Targets → Exercise credit), because burn estimates run high and your routine training is already in the base target.

## Privacy

Your food log lives in your Dropbox. Your API key and Dropbox sign-in live on your phone. The app talks to Anthropic (estimates), Dropbox (your file) and Open Food Facts (product labels), and nothing else. The person who shared the link with you cannot see your data.
