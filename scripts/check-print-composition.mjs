import { experiences } from '../src/ar/registry/experiences.js';
import { bookletPanelKinds } from '../src/data/bookletPanels.js';

const errors = [];
const seen = new Set();

for (const page of experiences) {
  if (!page.slug) errors.push('missing slug');
  if (seen.has(page.slug)) errors.push('duplicate slug');
  seen.add(page.slug);
  if (!page.title) errors.push('missing title');
  if (!page.qrTitle) errors.push('missing route label');
}

if (!bookletPanelKinds.includes('link')) errors.push('missing link panel');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Print composition OK: ${experiences.length} pages.`);
