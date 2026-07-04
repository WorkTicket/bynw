/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // required for Cloudflare Pages (no built-in image optimizer)
  },
};

module.exports = nextConfig;
