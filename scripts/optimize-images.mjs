import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import sharp from 'sharp';

const roots = ['public/assets', 'public/Crochet-Shop-Website-Images'];
const minimumBytes = 200 * 1024;
const outputRoot = 'public/optimized';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}

let saved = 0;
let optimized = 0;

for (const root of roots) {
  for (const file of await filesIn(root)) {
    if (!file.toLowerCase().endsWith('.webp')) continue;
    const before = (await stat(file)).size;
    const destination = join(outputRoot, relative('public', file));
    await mkdir(dirname(destination), { recursive: true });
    if (before < minimumBytes) {
      await copyFile(file, destination);
      continue;
    }
    await sharp(file).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 85, effort: 6, smartSubsample: true })
      .toFile(destination);
    const after = (await stat(destination)).size;
    saved += Math.max(0, before - after);
    optimized += 1;
  }
}

for (const name of ['garantia-7-dias', 'natalia-crochet']) {
  const source = `public/assets/${name}.png`;
  const destination = `${outputRoot}/assets/${name}.webp`;
  await mkdir(dirname(destination), { recursive: true });
  const before = (await stat(source)).size;
  await sharp(source).rotate().resize({ width: 1254, height: 1254, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(destination);
  const after = (await stat(destination)).size;
  saved += Math.max(0, before - after);
  optimized += 1;
}

console.log(`Optimized ${optimized} images; saved ${(saved / 1024 / 1024).toFixed(1)} MB.`);
