import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
const root = resolve('out');
if (!existsSync(root)) { console.error('Run npm run build first.'); process.exit(1); }
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
createServer((req, res) => {
  let path;
  try { path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (existsSync(path) && statSync(path).isDirectory()) path = resolve(path, 'index.html');
  const found = existsSync(path) && statSync(path).isFile();
  if (!found) path = resolve(root, '404.html');
  const extension = extname(path);
  const immutable = extension && extension !== '.html' && extension !== '.txt' && extension !== '.json';
  res.writeHead(found ? 200 : 404, {
    'Content-Type': types[extension] || 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(path).pipe(res);
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`Static Next.js export running on port ${process.env.PORT || 3000}`));
