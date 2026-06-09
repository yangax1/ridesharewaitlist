# HRide — Waitlist site

Standalone Next.js + Tailwind landing page for the **HRide** campus
rideshare waitlist. Black & white design. Form submissions are forwarded
to a Google Sheet (or Excel Online) via a single webhook.

## Quick start

```bash
npm install
cp .env.local.example .env.local       # then fill in WAITLIST_WEBHOOK_URL
npm run dev
```

Open http://localhost:3000.

Without `WAITLIST_WEBHOOK_URL` set the form still works — submissions
just log to the server console instead of landing in a sheet, so you can
test the UI before doing the sheet setup.

## Wire it to a spreadsheet

See **[SETUP.md](./SETUP.md)** for full step-by-step instructions for
either Google Sheets (Apps Script, free, ~5 min) or Excel Online
(Microsoft Power Automate). Once your webhook URL is in `.env.local`,
restart `npm run dev` and the next submission lands as a new row.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo.
3. In the import screen, add an environment variable:
   - Key: `WAITLIST_WEBHOOK_URL`
   - Value: your sheet webhook URL
4. Click **Deploy**. Vercel auto-detects Next.js and ships in ~60s.

To use a custom domain (e.g. hride.app), add it under **Project →
Settings → Domains** after the first deploy.

## What you collect

Each submission writes one row with these columns:

| firstName | lastName | email | classYear | usePlan                  | submittedAt        |
|-----------|----------|-------|-----------|--------------------------|--------------------|
| Jane      | Doe      | …     | 2027      | offer rides, take rides  | 2026-06-08T15:32Z  |

## Project layout

```
app/
  layout.tsx              ← root layout (fonts, metadata)
  globals.css             ← Tailwind setup, almost empty
  page.tsx                ← waitlist landing page (/)
  terms/page.tsx          ← /terms
  privacy/page.tsx        ← /privacy
  api/waitlist/route.ts   ← POST endpoint, forwards to sheet
.env.local.example
SETUP.md                  ← spreadsheet wiring guide
README.md
```

## License

All rights reserved — the HRide name, logo, and waitlist design belong
to the HRide team. Don't copy without permission.
