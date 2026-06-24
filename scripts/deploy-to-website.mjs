import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const websiteRoot = path.resolve(process.env.WEBSITE_ROOT || path.join(root, '..', 'Website'));
const target = path.resolve(websiteRoot, 'apps', 'lost-pages');
const expectedSuffix = path.join('Website', 'apps', 'lost-pages');

async function assertDirectory(directory, label) {
  const directoryStat = await stat(directory).catch(() => null);
  if (!directoryStat?.isDirectory()) {
    throw new Error(`${label} not found: ${directory}`);
  }
}

async function assertFile(file, label) {
  const fileStat = await stat(file).catch(() => null);
  if (!fileStat?.isFile()) {
    throw new Error(`${label} not found: ${file}`);
  }
}

await assertDirectory(dist, 'Build output directory');
await assertFile(path.join(dist, 'index.html'), 'Build entrypoint');
await assertFile(path.join(websiteRoot, 'CNAME'), 'Website CNAME');

if (!target.endsWith(expectedSuffix)) {
  throw new Error(`Refusing to deploy outside ${expectedSuffix}: ${target}`);
}

if (target.includes(`${path.sep}games${path.sep}`)) {
  throw new Error(`Refusing to deploy into games/: ${target}`);
}

await mkdir(path.dirname(target), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(dist, target, { recursive: true });

console.log(`Copied ${path.relative(root, dist)}/ to ${target}`);
