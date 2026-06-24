import { pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

function chunkPages(items, size = 2) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function renderPageCard(page, origin) {
  return `
    <article class="clean-comic-card" data-comic-card style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
      <div class="clean-comic-card__topline">
        <span>Page ${page.number}</span>
        <span>${page.collectible}</span>
      </div>

      <div class="clean-comic-card__copy">
        <h2>${page.title}</h2>
        <p>${page.description}</p>
      </div>

      <div class="clean-comic-card__mission">
        <strong>${page.qrTitle}</strong>
        <span>${page.prompt}</span>
      </div>

      <div class="clean-comic-card__footer">
        <a class="clean-comic-card__button" href="${withBasePath(`/ar/${page.slug}`)}" data-nav>Open AR</a>
        <div class="clean-comic-card__qr" data-launcher-qr="${page.slug}">
          <small>${getPageUrl(page, origin) || 'Set public origin for QR output.'}</small>
        </div>
      </div>
    </article>
  `;
}

export function renderLauncherMarkup(origin = '') {
  const spreads = chunkPages(pages);

  return `
    <section class="clean-comic-launcher" data-comic-stage aria-label="Museum Multiverse Lost Pages launcher">
      <div class="clean-comic-launcher__glow" aria-hidden="true"></div>

      <header class="clean-comic-hero" data-comic-card>
        <div>
          <p class="clean-comic-hero__eyebrow">Museum Multiverse</p>
          <h1>Lost Pages</h1>
          <p class="clean-comic-hero__copy">Eight compact AR pages. Scan one, open the route, wake the museum.</p>
        </div>
        <nav class="clean-comic-hero__actions" aria-label="Launcher controls">
          <a href="${withBasePath('/book')}" data-nav>Book view</a>
          <a href="${withBasePath('/print')}" data-nav>Print view</a>
        </nav>
      </header>

      <div class="clean-comic-book" aria-label="Lost Pages comic book spreads">
        ${spreads.map((spread, index) => `
          <section class="clean-comic-spread" data-comic-spread style="--spread-index:${index}">
            <div class="clean-comic-spread__label">Spread ${String(index + 1).padStart(2, '0')}</div>
            <div class="clean-comic-spread__pages">
              ${spread.map((page) => renderPageCard(page, origin)).join('')}
            </div>
          </section>
        `).join('')}
      </div>
    </section>
  `;
}

export async function renderLauncherQrCodes(root, origin) {
  await Promise.all(pages.map((page) => {
    const target = root.querySelector(`[data-launcher-qr="${page.slug}"]`);
    const pageUrl = getPageUrl(page, origin);
    if (target) {
      target.dataset.qrTarget = pageUrl;
    }
    return renderQrCode(target, pageUrl);
  }));
}
