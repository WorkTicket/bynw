import { notFound } from 'next/navigation';
import Link from 'next/link';
import { collections } from '../../../lib/store';
import { pageMetadata } from '../../../lib/site';

export function generateStaticParams() {
  return [{ product: 'princesas' }, { product: 'premium' }];
}

export async function generateMetadata({ params }) {
  const { product } = await params;
  const item = collections[product];
  if (!item) return {};
  return pageMetadata({
    title: 'Compra confirmada',
    description: `Tu compra de ${item.name} ha sido confirmada.`,
    path: `/compra-confirmada/${product}/`,
  });
}

export default async function PurchaseConfirmation({ params }) {
  const { product } = await params;
  const item = collections[product];
  if (!item) notFound();

  return <main id="contenido"><section className="inner-hero"><div className="container centered">
    <span className="kicker"><span>✦</span>COMPRA CONFIRMADA</span>
    <h1>¡Gracias por tu compra!</h1>
    <p>Hemos recibido tu pedido de <strong>{item.name}</strong>. Hotmart te enviará el acceso a los patrones por correo electrónico.</p>
    <p>Si no lo encuentras, revisa el correo no deseado y las promociones. Para cualquier duda, <Link href="/contacto/">habla con Natalia</Link>.</p>
  </div></section></main>;
}
