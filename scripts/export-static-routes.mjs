import { mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { experiences } from '../src/ar/registry/experiences.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const indexFile = path.join(dist, 'index.html');

async function assertBuilt() {
  const indexStat = await stat(indexFile).catch(() => null);
  if (!indexStat?.isFile()) {
    throw new Error('dist/index.html not found. Run vite build before exporting static routes.');
  }
}

async function writeRoute(route) {
  const target = path.join(dist, route, 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(indexFile, target);
}

await assertBuilt();

const routes = [
  'launcher',
  'book',
  'print',
  ...experiences.map((experience) => `ar/${experience.slug}`),
  ...experiences.map((experience) => `debug/ar/${experience.slug}`)
];

await Promise.all(routes.map(writeRoute));

console.log(`Exported ${routes.length} static routes into ${path.relative(root, dist)}/`);
