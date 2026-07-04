#!/usr/bin/env bash
export PATH="/c/Program Files/nodejs:$PATH"
export npm_execpath="$(which npx)"
npx @cloudflare/next-on-pages && npx wrangler pages deploy .vercel/output/static --project-name manos-creativas-bynmw
