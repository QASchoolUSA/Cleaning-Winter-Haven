# Cleaning Winter Haven

Professional cleaning services website for Winter Haven, FL.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your phone, email, and Booking Broom API key
npm run dev
```

## Tests

```bash
npm test
```

Covers booking validation, `/api/book` request handling (with a mocked Booking Broom upstream), and a demo-text walkthrough of the booking widget.

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. https://cleaningwinterhaven.com) |
| `NEXT_PUBLIC_PHONE` | Display phone number |
| `NEXT_PUBLIC_EMAIL` | Contact email |
| `BOOKING_BROOM_URL` | Booking Broom API base URL |
| `BOOKING_BROOM_API_KEY` | API key for winter-haven site slug |

## Deploy to Cloudflare Workers

This project uses [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) to run Next.js (including `/api/book`) on Cloudflare Workers.

**Cloudflare Pages / Workers build settings:**

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Branch | `main` |

Set environment variables in the Cloudflare dashboard:

**Build variables** (Settings → Builds → Build variables):
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`

**Runtime variables** (Settings → Variables and secrets):
- `BOOKING_BROOM_URL` — also in `wrangler.jsonc` `vars` (non-secret, safe in git)
- `BOOKING_BROOM_API_KEY` — add as **Secret** in dashboard only; do **not** put in `wrangler.jsonc`

For local Wrangler preview (`npm run preview`), copy `.dev.vars.example` → `.dev.vars` and add your API key.

After changing env vars, redeploy (Retry deployment or push to `main`).

**Note:** Next.js must be `>=16.2.6` for `@opennextjs/cloudflare` compatibility.


1. Set real phone and email in `.env.local`
2. Register `winter-haven` site in Booking Broom
3. Point DNS to hosting (Vercel recommended)
4. Submit sitemap to Google Search Console and Bing Webmaster Tools
5. Create Google Business Profile for Winter Haven
