# SCA Career Platform

A curated job and opportunity platform for African undergraduate students, with student accounts and saved opportunities.
A product of **Student Companion AI** (studentcompanionai.xyz).

Forked from [`sca-opportunities`](https://github.com/andrewstevenboima/sca-opportunities) (the site live at career.studentcompanionai.rw) and extended with the accounts/save-for-later idea explored in [`africa-jobs-mru-v2`](https://github.com/andrewstevenboima/africa-jobs-mru-v2).

**Stack:**
- Static site (HTML/CSS/JS), hosted on GitHub Pages. No build step, no framework.
- **Job listings** — Google Sheets, served through a Google Apps Script web app (unchanged from `sca-opportunities`).
- **Accounts + saved opportunities** — [Supabase](https://supabase.com) (Postgres + Auth), free tier.

Two backends, on purpose: the Sheet stays the easy admin panel for posting jobs, Supabase only owns login and bookmarks. See "Why Supabase" below.

---

## What's new vs. `sca-opportunities`

- **Student accounts** (`login.html`) — email/password signup and login via Supabase Auth.
- **Pilot region scope** — signup is currently open to **East Africa** and **West Africa** only (see `js/regions.js` for the country list). Browsing and applying to opportunities never requires an account, same as before.
- **Saved opportunities** (`account.html`) — logged-in students can save a listing from the ★ button on any card; saves persist across devices via Supabase, and show up on the account page with quick-remove.
- **Guests still get session-only bookmarks**, exactly like the original site — logging in is what upgrades a bookmark from "this tab only" to "saved to my account."

---

## Why Supabase (and why keep Google Sheets too)

You asked specifically about free hosting/database options for this — here's the reasoning:

| Need | Choice | Why |
|---|---|---|
| Job listings (content an admin edits by hand) | **Google Sheets + Apps Script** (existing) | Zero cost, zero code to add a row, already working. No reason to migrate content editors to a database. |
| Accounts, passwords, saved jobs (structured, per-user, needs security rules) | **Supabase** | Free tier: 500MB Postgres DB, 50k monthly active users, built-in Auth (email/password out of the box, OTP/social login if you want it later), and Row Level Security so each student can only ever read their own profile/bookmarks — enforced by the database, not just the frontend. |

Free-tier things to know before you scale past a pilot:
- Supabase's free project **pauses after 7 days of no API activity** — a visit un-pauses it in seconds, but a truly dormant project needs a manual "restore" click in the dashboard. Fine for a pilot; worth knowing before a demo.
- 500MB and 50k MAU is enormous headroom for a two-region pilot — you will not hit this before you outgrow the free tier of almost anything else first.
- Alternative considered: Firebase (Auth + Firestore) — also free and solid, but NoSQL, and the country/eligibility filtering this site already does reads naturally as relational data. Supabase is Postgres, so `regions.js` and the Sheet's `eligibility_*` columns map cleanly if you ever want to join saved-jobs data against listing metadata server-side.

---

## File structure

```
sca-career-platform/
├── index.html                  # home
├── opportunities.html          # browse + save opportunities
├── login.html                  # log in / sign up (East & West Africa pilot)
├── account.html                # profile + saved opportunities
├── about.html, sources.html, match.html, privacy.html, terms.html
├── styles.css                  # white/gold editorial design (unchanged)
├── auth.css                    # login/account page styles only
├── legal.css
├── script.js                   # main site logic (opportunities grid, bookmarks)
├── match.js                    # CV Checker logic (loads its own nav script, see below)
├── js/
│   ├── regions.js               # East & West Africa country list for signup
│   ├── supabase-client.js       # Supabase init + auth/bookmark helpers (window.SCA)
│   ├── auth-page.js              # login.html form logic
│   ├── account-page.js           # account.html profile/bookmarks logic
│   └── site-nav.js               # mobile nav + auth-aware nav links, for match.html only
│                                    (match.js declares its own top-level `state`/`$`/
│                                    APPS_SCRIPT_URL, so match.html can't also load
│                                    script.js — they'd collide)
├── opportunities.json          # fallback sample data
├── Code.gs                     # Google Apps Script backend (unchanged)
├── supabase/
│   └── schema.sql               # run once in Supabase's SQL editor — creates
│                                   profiles + bookmarks tables and RLS policies
├── assets/
└── README.md
```

---

## Setup

### Part A — Job listings (Google Sheets)

Unchanged from `sca-opportunities`. Follow the original 4 steps:

1. Create a Google Sheet named **SCA Opportunities Database**, with an `Opportunities` tab (columns: `id | category | title | organization | location | remote | deadline | eligibility_year | eligibility_nationality | field | tags | description | apply_link | source | status | date_posted`) and a `Subscribers` tab (`email | consent_timestamp | source_page`).
2. Deploy `Code.gs` as an Apps Script Web App (**Execute as: Me**, **Who has access: Anyone**), and copy the Web App URL.
3. Paste that URL into `APPS_SCRIPT_URL` near the top of `script.js`.
4. Seed a few rows — copy from `opportunities.json` as a starting point.

If you skip this, the site falls back to `opportunities.json` automatically, so you can preview everything else first.

### Part B — Accounts & saved opportunities (Supabase)

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier, no card required). Pick a region close to your users — Supabase doesn't have an East/West Africa region yet, so `eu-west` (Ireland) or `eu-central` (Frankfurt) is typically the lowest-latency choice.
2. Once the project is ready: **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and click **Run**. This creates the `profiles` and `bookmarks` tables with Row Level Security already locked down (a user can only ever see their own rows).
3. **Project Settings → API** — copy the **Project URL** and the **anon public** key.
4. Open `js/supabase-client.js` and replace:
   ```js
   const SUPABASE_URL = "REPLACE_WITH_YOUR_SUPABASE_PROJECT_URL";
   const SUPABASE_ANON_KEY = "REPLACE_WITH_YOUR_SUPABASE_ANON_KEY";
   ```
   The anon key is safe to ship in client-side code — it's what Supabase's docs call the "publishable" key; the RLS policies from step 2 are what actually protect the data, not secrecy of this key.
5. **Authentication → Providers**, confirm **Email** is enabled. Optional but recommended for a real launch: **Authentication → URL Configuration**, set the Site URL to your GitHub Pages / custom domain, and consider turning off "Confirm email" while you're testing locally (`http://localhost`) since confirmation links point at whatever Site URL is configured.

Until you complete this part, `login.html` and `account.html` will show "Accounts aren't set up yet" instead of erroring — the rest of the site works exactly as before.

### Part C — Publish to GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. **Settings → Pages** → Source: **Deploy from a branch** → `main` / `(root)`.
3. **Not yet connected to career.studentcompanionai.rw.** That domain's `CNAME` currently points at the `sca-opportunities` repo, which is what's live in production. This repo intentionally does **not** include a `CNAME` file yet, so publishing it won't fight the existing DNS record. When you're ready to cut over:
   - Add a `CNAME` file here containing `career.studentcompanionai.rw`, and
   - Repoint the domain's DNS/Pages setting to this repo,
   - at which point you'd retire `sca-opportunities` as the live site (or keep it as a staging copy).

---

## Region scope (East & West Africa pilot)

`js/regions.js` defines the two region lists used by the signup form:

- **East Africa:** Rwanda, Kenya, Uganda, Tanzania, Burundi, Ethiopia, South Sudan, Somalia, Djibouti
- **West Africa:** Nigeria, Ghana, Senegal, Côte d'Ivoire, Sierra Leone, Liberia, Guinea, Mali, Burkina Faso, Benin, Togo, Niger, The Gambia, Guinea-Bissau, Cabo Verde, Mauritania

This restricts what a student can pick when creating an account — it does **not** restrict which job listings show up (those still come from the Sheet, unfiltered by region, same as `sca-opportunities`). To add more countries/regions later, just extend the object in `js/regions.js` — no schema change needed, since `profiles.region`/`profiles.country` are plain text columns.

---

## Daily workflow — posting an opportunity

Unchanged: open the Google Sheet, add a row to `Opportunities`, set `status` to `live`. The site fetches fresh on every load, no cache.

---

## Testing locally

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Without a configured Supabase project, `opportunities.html` works exactly like the original site (session-only bookmarks); `login.html`/`account.html` show a "not set up yet" message instead of crashing.

---

## Privacy posture

- Job browsing still collects no personal data.
- Creating an account collects: email, password (hashed by Supabase Auth, never touched by this code), full name, region, country, year of study, and optionally university — all supplied by the student at signup, stored in `profiles`, readable only by that student (RLS).
- Saved opportunities (`bookmarks`) are likewise readable only by the student who saved them.
- Same newsletter email-capture flow as before remains on `index.html`/Google Sheets, unrelated to accounts.

Update `privacy.html` before a real launch to describe the account data above, in line with Rwanda's Law N° 058/2021 and similar frameworks.

---

## Future upgrades

- **Expand beyond East/West Africa** — extend `js/regions.js`; no backend change required.
- **Personalized matching** — join `profiles.year_of_study`/`field` against listing eligibility to rank cards.
- **Social login** (Google, etc.) — Supabase Auth supports this; just enable the provider in the dashboard and add a button.
- **Auto-refresh hook** — still marked `// TODO` in `script.js`, unchanged from the original.

---

## Credits

Built for Student Companion AI by Andrew Boima.
Opportunities data curated from: ALU, Mastercard Foundation, UN Careers, Chevening, DAAD, Commonwealth Scholarships, Erasmus+, and other reputable sources.
Accounts/save-for-later concept adapted from `africa-jobs-mru-v2`.

---

## License

All code © Student Companion AI. Opportunity data sourced from public-facing program announcements — always verify current deadlines with the original source.
