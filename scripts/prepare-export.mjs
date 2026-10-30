import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';

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

// On Windows, Next writes route payloads as `__next.route/__PAGE__.txt`,
// although browsers request `__next.route.__PAGE__.txt`. Flatten them before
// Wrangler uploads the static export so client navigation does not return 404.
async function flattenRscPayloads(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const source = join(directory, entry.name);
    if (entry.name.startsWith('__next.')) {
      try {
        await copyFile(join(source, '__PAGE__.txt'), join(directory, `${entry.name}.__PAGE__.txt`));
        await rm(source, { recursive: true, force: true });
        continue;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    await flattenRscPayloads(source);
  }
}

await flattenRscPayloads('out');

console.log('Removed superseded source images from the production export.');
