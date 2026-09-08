// Build, stage and publish are separate. Default invocation only previews.
import { cp, rename, readFile, lstat, realpath, mkdtemp } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyRelease, inventory, MANIFEST } from './release-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--apply')) throw new Error('Usage: node scripts/deploy-to-website.mjs [--apply]');
const apply = args.includes('--apply');
const dist = path.join(root, 'dist');
const website = await realpath(process.env.WEBSITE_ROOT || path.join(root, '..', 'Website'));
const git = (...args) => execFileSync('git', args, { cwd: website, encoding: 'utf8' }).trim();
if (await realpath(git('rev-parse', '--show-toplevel')) !== website) throw new Error('WEBSITE_ROOT must be the repository root.');
const remote = git('remote', 'get-url', 'origin');
if (!/^(?:https:\/\/github\.com\/|git@github\.com:)LuminaryLabs-Dev\/Website(?:\.git)?$/i.test(remote)) throw new Error('Wrong Website remote.');
if ((await readFile(path.join(website, 'CNAME'), 'utf8')).trim() !== 'luminarylabs.dev') throw new Error('Unexpected Website domain.');
const target = path.join(website, 'lostpages');
const info = await lstat(target).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
if (info && (!info.isDirectory() || info.isSymbolicLink())) throw new Error('Refusing non-directory or symlink target.');
const incoming = await verifyRelease(dist);
if (incoming.basePath !== '/lostpages/' || incoming.publicOrigin !== 'https://luminarylabs.dev/lostpages') throw new Error('Build is not configured for /lostpages/.');
let previous = [];
let previousManifest;
if (info) {
  // Unknown contents or locally modified releases are never adopted/overwritten.
  previousManifest = await verifyRelease(target);
  previous = await inventory(target);
}
const before = new Map(previous.map((file) => [file.path, file]));
const after = new Map(incoming.files.map((file) => [file.path, file]));
const diff = {
  added: incoming.files.filter((file) => !before.has(file.path)).map((file) => file.path),
  changed: incoming.files.filter((file) => before.has(file.path) && before.get(file.path).sha256 !== file.sha256).map((file) => file.path),
  removed: previous.filter((file) => !after.has(file.path)).map((file) => file.path)
};
console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', target, sourceCommit: incoming.sourceCommit, sourceDirty: incoming.sourceDirty, manifest: MANIFEST, ...diff }, null, 2));
if (!apply) process.exit(0);
if (incoming.sourceDirty) throw new Error('Refusing to stage a release built from uncommitted source.');
if (git('status', '--porcelain')) throw new Error('Website must be clean before release staging.');
if (!incoming.files.some((file) => file.path === 'Lost-Pages.pdf')) throw new Error('Publication gate: Lost-Pages.pdf is missing.');
// Acceptance is a post-build evidence file, not an assertion made by the build.
const acceptancePath = process.env.LOST_PAGES_ACCEPTANCE;
if (!acceptancePath) throw new Error('Set LOST_PAGES_ACCEPTANCE to the source-matched validation evidence JSON.');
const acceptance = JSON.parse(await readFile(acceptancePath, 'utf8'));
if (acceptance.sourceCommit !== incoming.sourceCommit || !['gameplay', 'pdf', 'browser', 'deviceAR'].every((key) => acceptance.checks?.[key]?.status === 'passed' && typeof acceptance.checks[key].evidence === 'string' && acceptance.checks[key].evidence.trim())) {
  throw new Error('Publication gate: source-matched gameplay, PDF, browser and device-AR evidence required.');
}
// Git-private staging keeps candidate and backup out of the published tree.
const privateDir = await realpath(git('rev-parse', '--absolute-git-dir'));
const container = await mkdtemp(path.join(privateDir, 'lostpages-release-'));
const candidate = path.join(container, 'candidate');
const backup = path.join(container, 'previous');
await cp(dist, candidate, { recursive: true, errorOnExist: true, force: false });
const copiedManifest = await verifyRelease(candidate);
if (JSON.stringify(copiedManifest) !== JSON.stringify(incoming)) throw new Error('Candidate changed during staging; destination untouched.');
if (git('status', '--porcelain')) throw new Error('Website changed during staging; destination untouched.');
if (info && JSON.stringify(await verifyRelease(target)) !== JSON.stringify(previousManifest)) throw new Error('Existing release changed during staging; destination untouched.');
if (info) await rename(target, backup);
try {
  await rename(candidate, target);
  await verifyRelease(target);
} catch (error) {
  const failed = await lstat(target).catch(() => null);
  if (failed) await rename(target, path.join(container, 'failed'));
  if (info) await rename(backup, target);
  throw error;
}
console.log(`Staged only ${target}. Previous release: ${info ? backup : 'none (first release)'}. No commit or push performed.`);
