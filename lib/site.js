export const site = {
  name: 'Manos Creativas Bynmw',
  url: 'https://bynmwcreative.com',
  description: 'Patrones digitales de crochet y ganchillo en español, con fotos paso a paso, descarga inmediata y garantía de 7 días.',
  locale: 'es_ES',
  ogImage: '/optimized/Crochet-Shop-Website-Images/05-assets-tienda-completa/14-social/patrones-crochet-social-1200x630.webp',
};

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}

export function pageMetadata({ title, description, path, image = site.ogImage, noIndex = false }) {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', locale: site.locale, siteName: site.name, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
