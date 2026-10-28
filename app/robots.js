import { site } from '../lib/site';

export const dynamic = 'force-static';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/about/'] }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
