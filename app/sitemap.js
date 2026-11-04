import { site } from '../lib/site';

export const dynamic = 'force-static';

export default function sitemap() {
  const routes = [
    ['', 1, 'weekly'],
    ['/coleccion-premium', .9, 'weekly'],
    ['/coleccion-princesas', .9, 'weekly'],
    ['/testimonios', .7, 'monthly'],
    ['/sobre-nosotras', .6, 'monthly'],
    ['/contacto', .6, 'monthly'],
    ['/aviso-legal', .3, 'yearly'],
    ['/privacidad', .3, 'yearly'],
    ['/terminos', .3, 'yearly'],
    ['/cookies', .3, 'yearly'],
  ];
  return routes.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}/`, lastModified: new Date(), changeFrequency, priority }));
}
