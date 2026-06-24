import { readFile } from 'node:fs/promises';

const url = String(process.env.DISCORD_WEBHOOK_URL || '').trim();
if (!url) {
  console.log('No deploy chat URL set; skipping message.');
  process.exit(0);
}

const content = (await readFile('discord-message.txt', 'utf8')).trim() || 'Lost Pages updated.';
const chunks = [];
let rest = content;
while (rest.length > 1900) {
  let cut = rest.lastIndexOf('\n', 1900);
  if (cut < 500) cut = 1900;
  chunks.push(rest.slice(0, cut).trim());
  rest = rest.slice(cut).trim();
}
chunks.push(rest);

for (const [index, chunk] of chunks.entries()) {
  const body = JSON.stringify({
    content: chunks.length > 1 ? `${chunk}\n\n_Part ${index + 1}/${chunks.length}_` : chunk,
    allowed_mentions: { parse: [] }
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'LostPagesGitHubActions/1.0'
    },
    body
  });

  if (!response.ok) {
    const text = await response.text();
    console.log(`Deploy chat warning: ${response.status} ${text}`);
    break;
  }

  console.log(`Deploy chat response: ${response.status}`);
}
