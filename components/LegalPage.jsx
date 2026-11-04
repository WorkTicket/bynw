import Link from 'next/link';
import { Footer, Kicker } from './Sections';

export default function LegalPage({ kicker, title, children }) {
  return <><main id="contenido"><section className="inner-hero"><div className="container centered"><Kicker>{kicker}</Kicker><h1>{title}</h1></div></section><section className="section legal-section"><div className="container legal-copy">{children}<p className="legal-back"><Link href="/">← Volver a Manos Creativas</Link></p></div></section></main><Footer showRibbon={false} /></>;
}
