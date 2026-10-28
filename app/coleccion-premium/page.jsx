import ProductPage from '../../components/ProductPage';
import { pageMetadata } from '../../lib/site';
export const metadata = pageMetadata({ title: 'Colección Premium · Más de 1.000 patrones PDF', description: 'Más de 1.000 patrones de crochet en español: amigurumis, muñecas, flores y proyectos de temporada. PDF organizados, acceso inmediato y garantía de 7 días.', path: '/coleccion-premium/' });
export default function Page() { return <ProductPage kind="premium" />; }
