export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'Manos Creativas Bynmw', short_name: 'Manos Creativas',
    description: 'Patrones digitales de crochet y ganchillo en español.',
    start_url: '/', display: 'standalone', background_color: '#fff8fb', theme_color: '#e58aa9', lang: 'es-ES',
    icons: [
      { src: '/Crochet-Shop-Website-Images/05-assets-tienda-completa/11-marca/favicon-yarn-heart-180.png', sizes: '180x180', type: 'image/png' },
      { src: '/Crochet-Shop-Website-Images/05-assets-tienda-completa/11-marca/favicon-yarn-heart-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
