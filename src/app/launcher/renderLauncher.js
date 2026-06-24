import { pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

export function renderLauncherMarkup(origin = '') {
  return `
    <section class="comic-launcher" aria-label="Museum Multiverse Lost Pages page viewer">
      <nav class="comic-launcher__rail" aria-label="Launcher controls">
        <strong>Lost Pages</strong>
        <span>PDF-style page viewer</span>
        <a href="${withBasePath('/book')}" data-nav>Book view</a>
      </nav>

      <div class="comic-launcher__scroll">
        ${pages.map((page) => `
          <article class="comic-page-shell" style="--accent:${page.accent};--glow:${page.glow}">
            <div class="comic-page">
              <div class="comic-page__folio">${page.number}</div>
              <div class="comic-page__mast">
                <span>Museum Multiverse: Lost Pages</span>
                <h2>${page.title}</h2>
              </div>

              <div class="comic-panel comic-panel--hero">
                <div class="comic-panel__burst">${page.collectible}</div>
                <p>${page.description}</p>
              </div>

              <div class="comic-panel comic-panel--mission">
                <h3>${page.qrTitle}</h3>
                <p>${page.prompt}</p>
                <a href="${withBasePath(`/ar/${page.slug}`)}" data-nav>Open AR page</a>
              </div>

              <div class="comic-page__scan">
                <div class="comic-page__qr" data-launcher-qr="${page.slug}">
                  <small>${getPageUrl(page, origin) || 'Set VITE_PUBLIC_ORIGIN for QR output.'}</small>
                </div>
                <p>${page.pitch}</p>
              </div>
            </div>
          </article>
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
