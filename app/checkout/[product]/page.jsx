import { redirect } from 'next/navigation';
import { collections } from '../../../lib/store';
import { pageMetadata } from '../../../lib/site';

export function generateStaticParams() { return Object.keys(collections).map(product => ({ product })); }

export async function generateMetadata({ params }) {
  const product = (await params).product;
  const item = collections[product];
  return pageMetadata({ title: item ? `Pago seguro en Hotmart · ${item.name}` : 'Pago seguro en Hotmart', description: 'Pago cifrado y 100% seguro gestionado por Hotmart.', path: `/checkout/${product}/`, noIndex: true });
}

export default async function Page({ params }) {
  const { product } = await params;
  const item = collections[product] || collections.premium;
  redirect(item.checkout);
}
