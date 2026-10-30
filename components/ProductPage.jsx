import Link from 'next/link';
import Lightbox from './Lightbox';
import ProductCarousel from './ProductCarousel';
import { collections, reviews, whatsappHref } from '../lib/store';
import { Button, FAQ, Footer, Guarantee, Kicker, Reviews } from './Sections';
import JsonLd from './JsonLd';
import { absoluteUrl, site } from '../lib/site';

const ASSET_ROOT = '/optimized/Crochet-Shop-Website-Images';

const premiumProducts = [
  ['01-ariel-sirena-producto.webp', 'Princesa sirena'],
  ['02-merida-arquera-producto.webp', 'Princesa arquera'],
  ['03-rapunzel-flores-producto.webp', 'Princesa de flores'],
  ['04-blancanieves-enanito-producto.webp', 'Princesa y enanito'],
  ['05-cenicienta-azul-producto.webp', 'Princesa de azul'],
  ['06-unicornio-pastel-producto.webp', 'Unicornio pastel'],
  ['07-vacas-fresa-producto.webp', 'Vaquitas fresa'],
  ['08-plantas-amigurumi-producto.webp', 'Plantas amigurumi'],
  ['09-muneca-navidad-producto.webp', 'Muñeca de Navidad'],
  ['10-cascanueces-rosa-producto.webp', 'Cascanueces rosa'],
  ['11-muneca-fresa-producto.webp', 'Muñeca fresa'],
  ['12-merida-vestido-largo-producto.webp', 'Muñeca de vestido largo'],
  ['13-hada-verde-producto.webp', 'Hada verde'],
  ['14-muneca-overol-azul-producto.webp', 'Muñeca con peto azul'],
  ['15-muneca-rosa-lazos-producto.webp', 'Muñeca rosa con lazos'],
  ['16-muneca-pastel-rayas-producto.webp', 'Muñeca pastel'],
  ['17-muneca-cabello-violeta-producto.webp', 'Muñeca de cabello violeta'],
  ['18-bruja-calabaza-producto.webp', 'Bruja y calabaza'],
  ['19-ingenieras-cascos-producto.webp', 'Muñecas profesionales'],
  ['20-amigas-vestidos-producto.webp', 'Amigas con vestidos'],
  ['21-muneca-pelirroja-overol-producto.webp', 'Muñeca pelirroja'],
  ['22-alice-conejo-producto.webp', 'Alicia y conejo'],
  ['23-muneca-vestido-rojo-producto.webp', 'Muñeca de vestido rojo'],
  ['24-bombero-producto.webp', 'Bombero amigurumi'],
  ['25-virgen-corona-producto.webp', 'Virgen con corona'],
  ['26-nacimiento-familia-producto.webp', 'Nacimiento tejido'],
  ['27-virgen-guadalupe-producto.webp', 'Virgen de Guadalupe'],
  ['28-santa-claus-producto.webp', 'Santa Claus'],
  ['29-casa-jengibre-producto.webp', 'Casa de jengibre'],
  ['30-munecas-flor-reversible-producto.webp', 'Muñecas flor reversibles'],
  ['31-ramo-girasoles-producto.webp', 'Ramo de girasoles'],
  ['32-ramo-margaritas-producto.webp', 'Ramo de margaritas'],
  ['33-ramo-rosas-producto.webp', 'Ramo de rosas'],
  ['34-ramo-flores-violetas-producto.webp', 'Ramo de flores violetas'],
];

const princessProducts = [
  ['65-tiana-pareja-producto.webp', 'Tiana en pareja'],
  ['66-alice-producto.webp', 'Alicia'],
  ['67-bella-producto.webp', 'Bella'],
  ['68-ariel-sirena-producto.webp', 'Ariel sirena'],
  ['69-merida-arquera-producto.webp', 'Mérida arquera'],
  ['70-moana-producto.webp', 'Moana'],
  ['71-anna-producto.webp', 'Anna'],
  ['73-mulan-producto.webp', 'Mulan'],
  ['76-jasmine-producto.webp', 'Jasmine'],
  ['77-cenicienta-azul-producto.webp', 'Cenicienta'],
];

const gifts = [
  ['53-virgen-guadalupe-regalo.webp', 'Virgen de Guadalupe'],
  ['54-guia-abreviaturas-regalo.webp', 'Guía de abreviaturas'],
  ['55-libro-amigurumis-regalo.webp', 'Libro de amigurumis'],
  ['56-rosa-virgen-regalo.webp', 'Rosa Virgen'],
  ['57-rosa-rapunzel-regalo.webp', 'Rosa Rapunzel'],
  ['58-flores-amigurumi-regalo.webp', 'Flores amigurumi'],
  ['59-animalitos-amigurumis-regalo.webp', 'Animalitos amigurumi'],
  ['60-burrito-azul-regalo.webp', 'Burrito azul'],
  ['61-libro-amigurumi-volumen-2-regalo.webp', 'Amigurumis · Volumen 2'],
  ['62-guia-puntos-regalo.webp', 'Guía de puntos'],
  ['63-ideas-para-celebrar-regalo.webp', 'Ideas para celebrar'],
  ['64-muneca-flor-reversible-regalo.webp', 'Muñeca flor reversible'],
];

const princessMoreDesigns = [
  ['WhatsApp Image 2026-10-27 at 12.59.00 PM.jpeg', 'Collage de diseños exclusivos', 'new final/PRINCESS/And many more exclusive designs princess', 'Ver más'],
  ['WhatsApp Image 2026-10-27 at 12.59.00 PM (1).jpeg', 'Más diseños de la colección', 'new final/PRINCESS/And many more exclusive designs princess', 'Ver más'],
];

const princessDesigns = [
  ...princessProducts.map(([name, label]) => [name, label, null, 'Princesas']),
  ...princessMoreDesigns,
];

const premiumMoreDesigns = [
  'WhatsApp Image 2026-10-27 at 12.58.44 PM.jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (1).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (2).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (3).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (4).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (5).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (6).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (7).jpeg',
  'WhatsApp Image 2026-10-27 at 12.58.44 PM (8).jpeg',
  'WhatsApp Image 2026-10-27 at 1.10.51 PM.jpeg',
].map((name, index) => [name, `Más diseños · ${index + 1}`, 'new final/1000 PATRONES/And many more exclusive designs 1000', 'Más diseños']);

const princessDelivery = ['IMAGEN 5.jpeg', 'IMAGEN 5.3.jpeg', 'IMAGEN 5.4.jpeg', 'IMAGEN 5.5.jpeg', 'IMAGEN 5.6.jpeg', 'IMAGEN 5.7.jpeg', 'IMAGEN 5.8.jpeg', 'IMAGEN 5.9.jpeg']
  .map((name, index) => [name, `Tu colección organizada · ${index + 1}`, "new final/PRINCESS/That's how easy you receive your collection princess"]);

const premiumDelivery = ['IMAGEN 7.1.jpeg', 'IMAGEN 5.5.jpeg', 'IMAGEN 3.2.jpeg', 'IMAGEN 21.1.jpeg', 'IMAGEN 16.3.jpeg', 'IMAGEN 14.3.jpeg', 'IMAGEN 13.1.jpeg', 'IMAGEN 10.jpeg', 'IMAGEN 10.1.jpeg']
  .map((name, index) => [name, `Tu colección organizada · ${index + 1}`, "new final/1000 PATRONES/That's how easy you receive your collection 1000"]);

const productData = {
  premium: {
    drive: `${ASSET_ROOT}/05-assets-tienda-completa/02-bundles-digitales/pack-1000-bundle-google-drive-real.webp`,
    device: `${ASSET_ROOT}/05-assets-tienda-completa/03-entrega-digital/pack-1000-capturas-reales-dispositivos.webp`,
    productFolder: '01-pack-1000-patrones/01-portadas-productos',
    deliveryFolder: '01-pack-1000-patrones/02-asi-recibes-tu-coleccion',
    qualityFolder: '01-pack-1000-patrones/03-calidad-de-los-patrones',
    products: premiumMoreDesigns,
    delivery: premiumDelivery,
    quality: ['44-girasol-calidad.webp', '45-santa-claus-calidad.webp', '46-blancanieves-calidad.webp', '47-unicornio-calidad.webp', '48-blancanieves-pasos-calidad.webp', '49-ingenieras-calidad.webp', '50-munecas-premium-calidad.webp', '51-munecas-pastel-calidad.webp', '52-nacimiento-calidad.webp'],
    title: <>Más de 1.000 patrones<br /><span>para no quedarte sin ideas</span></>,
    intro: 'Una biblioteca digital de amigurumis, muñecas, flores y proyectos de temporada, organizada para encontrar tu próximo proyecto sin perder tiempo.',
    count: '1.000+',
    categories: ['Más diseños'],
    specs: [
      ['∞', 'Contenido', 'Más de 1.000 patrones digitales prémium de ganchillo: princesas de cuento, Halloween, profesiones, santos y ángeles, Navidad, amigurumis de chenilla, flores eternas, muñecas flor reversibles y muñecas prémium.'],
      ['ES', 'Idioma', 'Español.'],
      ['PDF', 'Formato', 'Archivos PDF descargables e imprimibles.'],
      ['✦', 'Metodología', 'Guía paso a paso con soporte visual de alta resolución, diseñada para facilitar la ejecución de cada punto y detalle.'],
      ['✉', 'Entrega', 'Acceso inmediato a tu correo electrónico tras la confirmación del pago.'],
    ],
  },
  princesas: {
    drive: `${ASSET_ROOT}/05-assets-tienda-completa/02-bundles-digitales/princesas-bundle-google-drive-real.webp`,
    device: `${ASSET_ROOT}/05-assets-tienda-completa/03-entrega-digital/princesas-capturas-reales-dispositivos.webp`,
    productFolder: '02-pack-princesas/01-portadas-productos',
    deliveryFolder: '02-pack-princesas/02-asi-recibes-tu-coleccion',
    qualityFolder: '02-pack-princesas/03-calidad-de-los-patrones',
    products: princessDesigns,
    delivery: princessDelivery,
    quality: ['86-merida-calidad.webp', '87-munecas-amarillo-calidad.webp', '88-munecas-rosa-calidad.webp', '89-ariel-calidad.webp'],
    title: <>Más de 200 patrones de<br /><span>Princesas de Cuento</span></>,
    intro: 'Crea muñecas con vestidos, peinados y detalles llenos de encanto siguiendo patrones visuales en español, paso a paso y a tu ritmo.',
    count: '200+',
    categories: ['Princesas', 'Ver más'],
    specs: [
      ['200+', 'Contenido', 'Más de 200 patrones de princesas de cuento.'],
      ['ES', 'Idioma', 'Español.'],
      ['PDF', 'Formato', 'PDF descargable e imprimible.'],
      ['✦', 'Guía visual', 'Guía paso a paso con fotos en alta resolución.'],
      ['✉', 'Entrega', 'Acceso inmediato por correo electrónico en cuanto se confirme el pago.'],
      ['▶', 'Vídeos incluidos', 'Vídeos para principiantes: aprenderás cómo leer abreviaturas en un tejido de crochet para interpretar correctamente tus patrones.'],
    ],
  },
};

function TrustRow() {
  return <div className="cp-trust-row" aria-label="Ventajas de la compra"><span><b>PDF</b> en español</span><span><b>↓</b> Acceso inmediato</span><span><b>7</b> días de garantía</span><span><b>♡</b> Ayuda directa</span></div>;
}

function ProductSupport() {
  return <section className="cp-support"><div className="container cp-support-inner"><div className="cp-support-photo"><img src="/optimized/assets/natalia-crochet.webp" alt="Natalia, fundadora de Manos Creativas, con una muñeca de crochet" loading="lazy" /><span><b>NATALIA</b> · FUNDADORA</span></div><div><Kicker>SOPORTE DIRECTO</Kicker><h2>¿Necesitas ayuda<br /><span>con tu pedido?</span></h2><p>Soy Natalia, de Manos Creativas. Escríbeme por WhatsApp y te ayudo con tu compra o con el acceso a tus patrones.</p><Button href={whatsappHref} external>ESCRIBIR A NATALIA</Button><small>Respondemos en menos de 24 horas</small></div></div></section>;
}

function PaymentMethods() {
  return <div className="cp-payment-methods" aria-label="Métodos de pago aceptados"><span className="cp-pay-visa">VISA</span><span className="cp-pay-master"><i /><i />Mastercard</span><span className="cp-pay-paypal">PayPal</span><span className="cp-pay-klarna">Klarna.</span></div>;
}

function AssetGrid({ files, folder, type = 'product' }) {
  return <div className={`cp-asset-grid cp-asset-grid-${type}`}>{files.map((file, index) => {
    const [name, label] = Array.isArray(file) ? file : [file, type === 'quality' ? 'Interior del patrón' : 'Biblioteca digital'];
    const src = `${ASSET_ROOT}/${folder}/${name}`;
    const visualOnly = type === 'delivery' || type === 'quality';
    return <Lightbox key={name} src={src} caption={`${label} · Imagen real de la colección`} className={`cp-asset-card ${visualOnly ? 'cp-asset-visual' : ''}`}>
      <span className="cp-asset-image"><img src={src} alt={label} loading="lazy" /></span>
      {visualOnly ? <span className="cp-asset-overlay">Ver en detalle <b aria-hidden="true">↗</b></span> : <span className="cp-asset-label"><span>{label}</span><small>{type === 'gift' ? 'Regalo incluido' : 'Ver diseño'} <b aria-hidden="true">↗</b></small></span>}
    </Lightbox>;
  })}</div>;
}

function OfferCard({ item }) {
  return <aside className="cp-offer-card"><span className="cp-offer-label">OFERTA · 50% DE DESCUENTO</span><p className="cp-offer-title">Tu colección completa</p><div className="cp-price"><strong>{item.price}<sup>€</sup></strong><span>Pago único<br />acceso de por vida</span></div><Button href={item.checkout} external className="buy-button">COMPRAR AHORA</Button><PaymentMethods /><p className="cp-checkout-note"><span>✓</span> Pago cifrado y 100% seguro</p><hr /><ul><li>Acceso inmediato por correo</li><li>Garantía de 7 días</li><li>Archivos PDF en español</li></ul><p className="cp-digital-note"><b>Producto 100% digital.</b> Recibes patrones PDF; no se envían muñecos ni materiales físicos.</p></aside>;
}

export default function ProductPage({ kind }) {
  const item = collections[kind];
  const data = productData[kind];
  const isPrincesses = kind === 'princesas';
  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product', name: item.name, description: item.description,
    image: absoluteUrl(item.preview), sku: `MC-${kind.toUpperCase()}`, brand: { '@type': 'Brand', name: site.name },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: String(reviews.length), bestRating: '5' },
    offers: { '@type': 'Offer', url: absoluteUrl(`/${item.slug}/`), priceCurrency: 'EUR', price: item.price.replace(',', '.'), availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition' },
  };
  return <><JsonLd data={productSchema} /><main id="contenido" className="cp-page">
    <section className="cp-hero">
      <div className="container"><Link className="cp-breadcrumb" href="/#colecciones">← Todas las colecciones</Link><div className="cp-hero-grid">
        <div className="cp-hero-heading"><div className="cp-rating"><span>★★★★★</span><b>5.0</b> · 52 reseñas</div><Kicker>COLECCIÓN</Kicker><h1>{isPrincesses ? <>Patrones de<br /><span>Princesas de Cuento</span></> : data.title}</h1></div>
        <div className="cp-hero-visual"><img src={item.preview} width={item.previewWidth} height={item.previewHeight} alt={`Caja de producto de ${item.name}`} fetchPriority="high" decoding="async" /><span className="cp-hero-count"><b>{data.count}</b> patrones<br />digitales</span><span className="cp-real-badge">Colección real<br /><b>en español</b></span></div>
        <div className="cp-hero-copy"><p className="cp-lead">{isPrincesses ? 'Colección de más de 200 patrones de Princesas de Cuento + 20 regalos adicionales' : 'Patrones en PDF con fotos paso a paso, para tejer, regalar o vender.'}</p><ul className="cp-benefit-list">{item.benefits.map(text => <li key={text}><span>✓</span>{text}</li>)}</ul><a className="cp-text-link" href="#contenido-real">Mira todo lo que incluye <span>↓</span></a></div>
        <div className="cp-mobile-offer"><OfferCard item={item} /></div>
        <div className="cp-desktop-offer"><OfferCard item={item} /></div>
      </div></div>
    </section>
    <TrustRow />

    <section className="cp-section cp-proof" id="contenido-real"><div className="container"><div className="cp-spec-heading"><Kicker>DETALLES DE LA COLECCIÓN</Kicker><h2>Especificaciones<br /><span>técnicas</span></h2><p>Todo lo que recibirás, explicado de forma clara antes de tu compra.</p></div><div className="cp-spec-grid">{data.specs.map(([icon, title, text]) => <article className="cp-spec-card" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className={`cp-section cp-showcase cp-showcase-${kind}`}><div className="container"><div className="cp-heading-row"><div><Kicker>COLECCIÓN</Kicker><h2>Y muchos diseños<br /><span>exclusivos más…</span></h2></div><p>Esta es solo una muestra: la colección incluye muchos más patrones de los que ves aquí.</p></div><ProductCarousel files={data.products} folder={data.productFolder} categories={data.categories} kind={kind} title={isPrincesses ? 'Princesas incluidas en la colección' : 'Explora todos los diseños disponibles'} subtitle={isPrincesses ? 'Elige Princesas o Ver más para explorar' : 'Desliza o utiliza las flechas para continuar'} /><p className="cp-more-designs">Y muchos diseños más…</p></div></section>

    <section className="cp-section cp-delivery"><div className="container"><div className="cp-delivery-heading"><Kicker>ENTREGA</Kicker><h2>Así de fácil recibes<br /><span>tu colección</span></h2><p>Tu biblioteca digital llega organizada y lista para explorar. El carrusel avanza automáticamente cada 20 segundos.</p></div><ProductCarousel files={data.delivery} folder={data.deliveryFolder} type="delivery" title="Así se ve la colección por dentro" subtitle="Imágenes reales · pulsa para ampliar" /></div></section>

    <section className="cp-section cp-quality"><div className="container"><div className="cp-heading-row"><div><Kicker>CALIDAD</Kicker><h2>Echa un vistazo a la calidad<br /><span>de nuestros patrones</span></h2></div><p>Patrones detallados, con fotos en cada paso, pensados para que tejas con tranquilidad.</p></div><ProductCarousel files={data.quality} folder={data.qualityFolder} type="quality" title="Muestras reales de nuestros patrones" subtitle="2 imágenes por vista · pulsa para ampliar" /></div></section>

    {kind === 'princesas' && <section className="cp-section cp-gifts"><div className="container"><div className="cp-gift-heading"><div><span className="cp-gift-kicker">REGALOS INCLUIDOS CON TU COLECCIÓN</span><h2>Regalos digitales exclusivos<br /><span>con tu compra</span></h2><p>Guías, patrones y material adicional incluidos con tu colección.</p><span className="cp-gift-note">Incluidos con tu compra · para siempre</span></div><img src={`${ASSET_ROOT}/05-assets-tienda-completa/05-regalos/regalos-portadas-reales-composicion.webp`} alt="Composición de los regalos digitales incluidos" loading="lazy" /></div><ProductCarousel files={gifts} folder="02-pack-princesas/04-regalos-incluidos" type="gift" /><p className="cp-more-gifts">…y muchos regalos más.</p></div></section>}

    <Guarantee />
    <ProductSupport />
    <Reviews />
    <FAQ />
    <section className="cp-final"><div className="container cp-final-inner"><div><Kicker>MANOS CREATIVAS BYNMW</Kicker><h2>¿Lista para<br /><span>empezar?</span></h2><p>{item.name}. Acceso inmediato a la colección y a los regalos incluidos.</p></div><div className="cp-final-buy"><div className="cp-price"><strong>{item.price}<sup>€</sup></strong><span>pago único</span></div><Button href={item.checkout} external className="buy-button">COMPRAR AHORA</Button><PaymentMethods /><small>Pago cifrado y 100% seguro</small></div></div></section>
  </main><Footer collection={item} /></>;
}
