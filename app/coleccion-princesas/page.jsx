import ProductPage from '../../components/ProductPage';
import { pageMetadata } from '../../lib/site';
export const metadata = pageMetadata({ title: 'Princesas de Cuento · Más de 200 patrones PDF', description: 'Más de 200 patrones de princesas de cuento en español, con instrucciones claras y fotos paso a paso. Descarga digital y garantía de 7 días.', path: '/coleccion-princesas/' });
export default function Page() { return <ProductPage kind="princesas" />; }
