import { Hero, ProofBar, Benefits, Collections, Guarantee, Delivery, Reviews, FAQ, Support, FinalCTA, Footer } from '../components/Sections';
import JsonLd from '../components/JsonLd';
import { site } from '../lib/site';
export const metadata = { alternates: { canonical: '/' } };
const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'es' };
export default function Home() { return <><JsonLd data={website} /><main id="contenido"><Hero /><ProofBar /><Benefits /><Collections /><Delivery /><Support /><Guarantee /><Reviews /><FAQ /><FinalCTA /></main><Footer /></>; }
