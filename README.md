# Crafting Pattern — Pro Site Boilerplate

A Next.js 14 + Tailwind CSS site deployed to **Cloudflare Workers** with static assets via OpenNext.

**Start here:** [`DEV_INSTRUCTIONS.md`](./DEV_INSTRUCTIONS.md)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy

```bash
npm run deploy
```

This builds with OpenNext and deploys one Worker to Cloudflare. The Worker handles SSR and API routes; static files (images, PDFs, JS/CSS) are served from the Workers **ASSETS** binding (Cloudflare's static CDN).

That is the supported "Workers + static hosting" setup for Next.js with OpenNext. A separate Cloudflare Pages project is not required and is not supported by this adapter.

See `DEV_INSTRUCTIONS.md` §9 for full Cloudflare setup.
