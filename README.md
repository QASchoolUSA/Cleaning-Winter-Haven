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

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. https://cleaningwinterhaven.com) |
| `NEXT_PUBLIC_PHONE` | Display phone number |
| `NEXT_PUBLIC_EMAIL` | Contact email |
| `BOOKING_BROOM_URL` | Booking Broom API base URL |
| `BOOKING_BROOM_API_KEY` | API key for winter-haven site slug |

## Pre-launch checklist

1. Set real phone and email in `.env.local`
2. Register `winter-haven` site in Booking Broom
3. Point DNS to hosting (Vercel recommended)
4. Submit sitemap to Google Search Console and Bing Webmaster Tools
5. Create Google Business Profile for Winter Haven
