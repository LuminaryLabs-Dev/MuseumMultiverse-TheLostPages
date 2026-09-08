import { execFileSync } from 'node:child_process';
import { readFile, writeFile, unlink, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inventory, RELEASE_OWNER, MANIFEST } from './release-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const packageInfo = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const dist = path.join(root, 'dist');
if (!(await lstat(dist)).isDirectory() || (await lstat(dist)).isSymbolicLink()) throw new Error('Build directory must not be a symlink.');
// Vite copies this authoring note from public; it is not a runtime asset.
await unlink(path.join(dist, 'assets/comic-pages/README.md')).catch((error) => { if (error.code !== 'ENOENT') throw error; });
const files = await inventory(dist);
const manifest = {
  schemaVersion: 1,
  owner: RELEASE_OWNER,
  sourceCommit: git('rev-parse', 'HEAD'),
  sourceDirty: Boolean(git('status', '--porcelain', '--untracked-files=all')),
  basePath: process.env.VITE_BASE_PATH || '/',
  publicOrigin: process.env.VITE_PUBLIC_ORIGIN || null,
  builtAt: new Date().toISOString(),
  toolchain: { node: process.version, vite: JSON.parse(await readFile(path.join(root, 'node_modules/vite/package.json'), 'utf8')).version },
  engine: packageInfo.dependencies.nexusengine,
  files
};
await writeFile(path.join(dist, MANIFEST), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Release manifest: ${files.length} files; source ${manifest.sourceCommit}; dirty=${manifest.sourceDirty}`);
