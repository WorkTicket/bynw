import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

// Product imagery is served from /optimized; keep only the brand icons still
// referenced at their original public paths in the production export.
const originalImageRoot = 'out/Crochet-Shop-Website-Images';
const icons = [
  '05-assets-tienda-completa/11-marca/favicon-yarn-heart-32.png',
  '05-assets-tienda-completa/11-marca/favicon-yarn-heart-180.png',
  '05-assets-tienda-completa/11-marca/favicon-yarn-heart-512.png',
];

await rm(originalImageRoot, { recursive: true, force: true });
for (const icon of icons) {
  const destination = `${originalImageRoot}/${icon}`;
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(`public/Crochet-Shop-Website-Images/${icon}`, destination);
}

for (const file of ['hero.webp', 'bundle-1000.webp', 'bundle-princesas.webp', 'delivery.webp', 'flowers.webp', 'garantia-7-dias.png', 'natalia-crochet.png', 'natalia-founder.png']) {
  await rm(`out/assets/${file}`, { force: true });
}

console.log('Removed superseded source images from the production export.');
