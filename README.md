# Crafting Pattern — Pro Site Boilerplate

A Next.js 14 + Tailwind CSS boilerplate, themed pink, set up to deploy to
Cloudflare Pages (with Cloudflare Workers via the Edge runtime).

**Start here:** [`DEV_INSTRUCTIONS.md`](./DEV_INSTRUCTIONS.md) has the full
build plan for whoever (or whatever coding agent) implements the rest of the
site — pages to build, product/checkout decisions to confirm, contact form
email integration, and Cloudflare deployment steps.

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

See `DEV_INSTRUCTIONS.md` §9 for full Cloudflare Pages setup.
