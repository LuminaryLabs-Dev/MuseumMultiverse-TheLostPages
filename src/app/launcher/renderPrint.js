import { cover, pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

function chunkPages(items, size = 2) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function getDisplayUrl(page, origin) {
  return origin ? getPageUrl(page, origin) : '';
}

function renderPrintSheet(page, origin) {
  const pageUrl = getDisplayUrl(page, origin);

  return `
    <article class="print-page-sheet" data-comic-card style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
      <div class="print-page-sheet__rule" aria-hidden="true"></div>
      <div class="print-page-sheet__topline">
        <span>Page ${page.number}</span>
        <span>${page.collectible}</span>
      </div>

      <div class="print-page-sheet__body">
        <p class="print-page-sheet__eyebrow">${page.qrTitle}</p>
        <h2>${page.title}</h2>
        <p>${page.description}</p>
      </div>

      <div class="print-page-sheet__mission">
        <strong>Interaction</strong>
        <span>${page.prompt}</span>
      </div>

      <footer class="print-page-sheet__footer">
        <a class="print-page-sheet__button" href="${withBasePath(`/ar/${page.slug}`)}" data-nav>Open AR route</a>
        <div class="print-page-sheet__qr" data-print-qr="${page.slug}">
          <small>${pageUrl || 'Set public origin for QR output.'}</small>
        </div>
      </footer>
    </article>
  `;
}

export function renderBookMarkup() {
  return `
    <section class="book-stage" aria-label="Lost Pages composition notebook">
      <div class="book-stage__scene" data-book-scene></div>
    </section>
  `;
}

export async function renderBookQrCodes() {
  return true;
}

export function renderPrintMarkup(origin = '') {
  const spreads = chunkPages(pages);

  return `
    <section class="print-tabletop clean-comic-launcher" data-comic-stage data-print-stage aria-label="Museum Multiverse Lost Pages print review surface">
      <header class="print-tabletop__hero clean-comic-hero" data-comic-card>
        <div>
          <p class="clean-comic-hero__eyebrow">Primary print review surface</p>
          <h1>${cover.title}</h1>
          <p class="clean-comic-hero__copy">A tabletop pass for the eight printed Lost Pages. Review the page order, QR targets, and AR entry points before the artifact goes to print.</p>
        </div>
        <nav class="clean-comic-hero__actions" aria-label="Print review controls">
          <a class="clean-comic-hero__primary-action" href="${withBasePath('/print')}" data-nav aria-current="page">Print view</a>
          <a class="clean-comic-hero__legacy-action" href="${withBasePath('/book')}" data-nav>Legacy book view</a>
          <a class="clean-comic-hero__legacy-action" href="${withBasePath('/launcher')}" data-nav>Launcher</a>
        </nav>
      </header>

      <div class="print-tabletop__opening" aria-hidden="true">
        <div class="print-tabletop__cover print-tabletop__cover--left"></div>
        <div class="print-tabletop__cover print-tabletop__cover--right"></div>
      </div>

      <main class="print-tabletop__layout" aria-label="Eight page print layout">
        <section class="print-tabletop__cover-sheet" data-comic-spread>
          <div class="print-tabletop__cover-copy" data-comic-card>
            <p class="print-page-sheet__eyebrow">Museum Multiverse</p>
            <h2>Lost Pages</h2>
            <p>${cover.blurb}</p>
            <span>Eight pages · Eight QR portals · One final portal key</span>
          </div>
        </section>

        ${spreads.map((spread, index) => `
          <section class="print-tabletop__spread" data-comic-spread style="--spread-index:${index}">
            <div class="print-tabletop__spread-label">Spread ${String(index + 1).padStart(2, '0')}</div>
            <div class="print-tabletop__pages">
              ${spread.map((page) => renderPrintSheet(page, origin)).join('')}
            </div>
          </section>
        `).join('')}
      </main>
    </section>
  `;
}

export async function renderPrintQrCodes(root, origin) {
  await Promise.all(pages.map((page) => {
    const target = root.querySelector(`[data-print-qr="${page.slug}"]`);
    const pageUrl = getPageUrl(page, origin);
    if (target) {
      target.dataset.qrTarget = pageUrl;
    }
    return renderQrCode(target, pageUrl);
  }));
}
