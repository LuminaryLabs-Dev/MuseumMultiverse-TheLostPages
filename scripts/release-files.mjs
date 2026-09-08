import { createHash } from 'node:crypto';
import { readdir, readFile, lstat } from 'node:fs/promises';
import path from 'node:path';

export const RELEASE_OWNER = 'LuminaryLabs-Dev/MuseumMultiverse-TheLostPages';
export const MANIFEST = 'release-manifest.json';

export function validateReleasePath(name) {
  if (typeof name !== 'string' || !name || name.includes('\\') || name.startsWith('/') || name.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error(`Unsafe release path: ${name}`);
  }
  if (name.split('/').some((part) => /^(?:\.git|\.env(?:\..*)?|node_modules|src|tests?|agent|\.agent|docs)$/i.test(part)) || /\.(?:map|pem|key|md)$/i.test(name)) {
    throw new Error(`Source, secret, or development file in release: ${name}`);
  }
  return name;
}

export async function inventory(directory, prefix = '') {
  const directoryInfo = await lstat(directory);
  if (!directoryInfo.isDirectory() || directoryInfo.isSymbolicLink()) throw new Error('Release root must be a real directory.');
  const files = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = prefix + entry.name;
    const file = path.join(directory, entry.name);
    const info = await lstat(file);
    if (info.isSymbolicLink()) throw new Error(`Symlink in release: ${name}`);
    if (info.isDirectory()) files.push(...await inventory(file, name + '/'));
    else if (info.isFile()) {
      validateReleasePath(name);
      if (name === MANIFEST) continue;
      const data = await readFile(file);
      files.push({ path: name, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
    } else throw new Error(`Unsupported release entry: ${name}`);
  }
  return files;
}

export async function verifyRelease(directory) {
  const directoryInfo = await lstat(directory);
  if (!directoryInfo.isDirectory() || directoryInfo.isSymbolicLink()) throw new Error('Release root must be a real directory.');
  const manifestInfo = await lstat(path.join(directory, MANIFEST));
  if (!manifestInfo.isFile() || manifestInfo.isSymbolicLink()) throw new Error('Manifest must be a regular file.');
  const manifest = JSON.parse(await readFile(path.join(directory, MANIFEST), 'utf8'));
  if (manifest.schemaVersion !== 1 || manifest.owner !== RELEASE_OWNER || !/^[a-f0-9]{40}$/.test(manifest.sourceCommit) || typeof manifest.sourceDirty !== 'boolean' || !Array.isArray(manifest.files)) {
    throw new Error('Invalid release manifest identity.');
  }
  const actual = await inventory(directory);
  const expected = new Map();
  for (const file of manifest.files) {
    validateReleasePath(file.path);
    if (expected.has(file.path)) throw new Error(`Duplicate manifest path: ${file.path}`);
    expected.set(file.path, file);
  }
  if (actual.length !== expected.size) throw new Error('Release contains missing or unlisted files.');
  for (const file of actual) {
    const recorded = expected.get(file.path);
    if (!recorded || recorded.sha256 !== file.sha256 || recorded.bytes !== file.bytes) throw new Error(`Release checksum mismatch: ${file.path}`);
  }
  if (!expected.has('index.html')) throw new Error('Release has no index.html.');
  return manifest;
}
