import Link from 'next/link';
import { collections } from '../../../lib/store';
import { pageMetadata } from '../../../lib/site';
import { Brand } from '../../../components/Header';
import '../../../app/globals.css';

export function generateStaticParams() { return Object.keys(collections).map(product => ({ product })); }

export async function generateMetadata({ params }) {
  const item = collections[(await params).product];
  return pageMetadata({ title: item ? `Compra segura · ${item.name}` : 'Compra segura', description: 'Revisa los detalles antes de continuar al checkout seguro de Hotmart.', path: `/checkout/${(await params).product}/`, noIndex: true });
}

export default async function Page({ params }) {
  const { product } = await params;
  const item = collections[product] || collections.premium;
  return <main className="checkout-bridge"><div className="checkout-bridge-card"><Link href="/" className="checkout-bridge-brand"><Brand /></Link><span className="kicker">PASO FINAL · COMPRA SEGURA</span><h1>Estás a un paso de empezar a crear.</h1><p className="checkout-bridge-product">{item.name}</p><div className="checkout-bridge-price"><strong>{item.price} €</strong><span>pago único<br />acceso de por vida</span></div><ul><li>✓ Pago procesado de forma segura por Hotmart</li><li>✓ Acceso digital enviado a tu correo tras confirmar el pago</li><li>✓ Garantía de 7 días y soporte por WhatsApp</li></ul><a className="button" href={item.checkout}>Continuar a Hotmart <span>↗</span></a><p className="checkout-bridge-note">Serás redirigida a Hotmart para elegir tu método de pago. Verás el precio, las condiciones y el nombre del producto antes de confirmar.</p><Link href={`/${item.slug}/`} className="checkout-bridge-back">← Volver a revisar la colección</Link></div></main>;
}
