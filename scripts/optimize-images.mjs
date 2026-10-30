import { mkdir, readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import sharp from 'sharp';

const outputRoot = 'public/optimized';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}

async function webp(source, destination, width, quality = 74) {
  await mkdir(dirname(destination), { recursive: true });
  const input = await readFile(source);
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 82, effort: 6, smartSubsample: true })
    .toFile(destination);
}

let saved = 0;

async function report(source, destination) {
  try {
    const before = (await stat(source)).size;
    const after = (await stat(destination)).size;
    saved += Math.max(0, before - after);
  } catch {
    // Source was already replaced or is generated, nothing to compare.
  }
}

async function responsive(source, name, widths, quality) {
  for (const width of widths) {
    const destination = `${outputRoot}/assets/${name}-${width}.webp`;
    await webp(source, destination, width, quality);
    await report(source, destination);
  }
  // Base file (largest width) for browsers without srcset support.
  const base = `${outputRoot}/assets/${name}.webp`;
  await webp(source, base, Math.max(...widths), quality);
  await report(source, base);
}

// Product and editorial imagery: one optimized copy per asset.
const roots = ['public/assets', 'public/Crochet-Shop-Website-Images'];
const handled = new Set([
  'hero', 'benefit-access', 'benefit-support', 'benefit-quality', 'benefit-bonuses',
  'benefit-payment', 'benefit-lifetime', 'bundle-1000', 'bundle-princesas',
  'delivery', 'flowers', 'natalia-crochet', 'garantia-7-dias',
]);

for (const root of roots) {
  for (const file of await filesIn(root)) {
    if (!file.toLowerCase().endsWith('.webp')) continue;
    const name = file.replace(/\\/g, '/').split('/').pop().replace('.webp', '');
    if (handled.has(name)) continue;
    const destination = join(outputRoot, relative('public', file));
    const isPreview = /\/assets\/preview-/.test(file.replace(/\\/g, '/'));
    const width = isPreview ? 640 : 900;
    await webp(file, destination, width, isPreview ? 72 : 72);
    await report(file, destination);
  }
}

// Hero (LCP) and other large homepage art get width-specific variants.
await responsive('public/assets/hero.webp', 'hero', [480, 768, 1024, 1280, 1600], 72);
for (const name of ['benefit-access', 'benefit-support', 'benefit-quality', 'benefit-bonuses', 'benefit-payment', 'benefit-lifetime']) {
  await responsive(`public/assets/${name}.webp`, name, [240, 480], 74);
}
await responsive('public/assets/bundle-1000.webp', 'bundle-1000', [640, 960], 72);
await responsive('public/assets/bundle-princesas.webp', 'bundle-princesas', [640, 960], 72);
await responsive('public/optimized/assets/delivery.webp', 'delivery', [640, 960], 72);
await responsive('public/optimized/assets/flowers.webp', 'flowers', [640, 960], 72);
await responsive('public/optimized/assets/natalia-crochet.webp', 'natalia-crochet', [400, 640], 72);
await responsive('public/optimized/assets/garantia-7-dias.webp', 'garantia-7-dias', [320, 480], 74);

// Review photos are rendered as 40px avatars or ~300px carousel cards.
for (const file of await filesIn('public/assets/reviews')) {
  if (!file.toLowerCase().endsWith('.webp')) continue;
  const name = file.replace(/\\/g, '/').split('/').pop().replace('.webp', '');
  for (const width of [160, 320, 640]) {
    const destination = `${outputRoot}/assets/reviews/${name}-${width}.webp`;
    await webp(file, destination, width, width === 160 ? 70 : 74);
    await report(file, destination);
  }
  const base = `${outputRoot}/assets/reviews/${name}.webp`;
  await webp(file, base, 640, 74);
  await report(file, base);
}

// Brand marks are displayed at 60px; ship 160px versions instead of 512px files.
await mkdir(`${outputRoot}/assets`, { recursive: true });
for (const [source, name] of [['public/manos-creativas-navbar.webp', 'brand-navbar'], ['public/manos-creativas-footer.webp', 'brand-footer']]) {
  await webp(source, `${outputRoot}/assets/${name}-160.webp`, 160, 82);
  await report(source, `${outputRoot}/assets/${name}-160.webp`);
}

console.log(`Optimized responsive images; saved ${(saved / 1024 / 1024).toFixed(1)} MB.`);
