import { readFile, writeFile } from 'node:fs/promises';

async function readText(path, fallback = '') {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return fallback;
  }
}

function parseLines(source) {
  const result = {
    title: 'Lost Pages updated',
    summary: 'Lost Pages updated.',
    body: source.trim()
  };

  for (const line of source.split('\n')) {
    const index = line.indexOf(':');
    if (index < 1) continue;
    const key = line.slice(0, index).trim().toLowerCase();
    const value = line.slice(index + 1).trim();
    if (key === 'title') result.title = value;
    if (key === 'summary') result.summary = value;
    if (key === 'body') result.body = value;
  }

  if (!result.body.trim()) result.body = result.summary;
  return result;
}

function pickTemplate(rules) {
  const start = 'MESSAGE_TEMPLATE_START';
  const end = 'MESSAGE_TEMPLATE_END';
  const a = rules.indexOf(start);
  const b = rules.indexOf(end);
  if (a < 0 || b < 0 || b <= a) return '✅ %%TITLE%%\n\n%%SUMMARY%%';
  const firstNewline = rules.indexOf('\n', a);
  return rules.slice(firstNewline + 1, b).replace(/<!--/g, '').replace(/-->/g, '').trim();
}

const output = parseLines(await readText('output.md', ''));
const template = pickTemplate(await readText('output-rules.md', ''));

let message = template;
message = message.replaceAll('%%TITLE%%', output.title);
message = message.replaceAll('%%SUMMARY%%', output.summary);
message = message.replaceAll('%%BODY%%', output.body);
message = message.replaceAll('%%LIVE_URL%%', process.env.PAGE_URL || '');
message = message.replaceAll('%%CHANGED_FILES%%', process.env.FILES || '');
message = message.replaceAll('%%SHORT_SHA%%', (process.env.SHA || '').slice(0, 7));
message = message.trim() || output.body || 'Lost Pages updated.';

await writeFile('discord-message.txt', message, 'utf8');
