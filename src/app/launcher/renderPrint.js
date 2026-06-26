import { cover, pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

const PANEL_KINDS = ['title', 'story', 'mission', 'link', 'collectible'];

function getDisplayUrl(page, origin) {
  return origin ? getPageUrl(page, origin) : '';
}

function renderPanel(page, origin, kind, index) {
  const pageUrl = getDisplayUrl(page, origin);
  const content = {
    title: `<p class="print-page-sheet__eyebrow">${page.qrTitle}</p><h2>${page.title}</h2>`,
    story: `<p>${page.description}</p>`,
    mission: `<div class="print-page-sheet__mission"><strong>Mission</strong><span>${page.prompt}</span></div>`,
    link: `<div class="booklet-reader__link"><a class="print-page-sheet__button" href="${withBasePath(`/ar/${page.slug}`)}" data-nav>Open page</a><div class="print-page-sheet__qr" data-print-qr="${page.slug}"><small>${pageUrl || 'Set public origin for output.'}</small></div></div>`,
    collectible: `<div class="print-page-sheet__mission"><strong>Collectible</strong><span>${page.collectible}</span></div>`
  };
  return `<section class="booklet-reader__panel" data-booklet-panel data-panel-index="${index}" data-panel-kind="${kind}">${content[kind]}</section>`;
}

function renderPrintSheet(page, origin, index) {
  return `
    <article class="print-page-sheet booklet-reader__page" data-comic-card data-booklet-page data-page-index="${index}" data-page-slug="${page.slug}" ${index === 0 ? 'data-active="true"' : 'hidden'} style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
      <div class="print-page-sheet__rule" aria-hidden="true"></div>
      <div class="print-page-sheet__topline">
        <span>Page ${page.number}</span>
        <span>${page.collectible}</span>
      </div>
      <div class="booklet-reader__panels" data-booklet-panels>
        ${PANEL_KINDS.map((kind, panelIndex) => renderPanel(page, origin, kind, panelIndex)).join('')}
      </div>
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
  return `
    <section class="print-tabletop clean-comic-launcher booklet-reader" data-comic-stage data-print-stage data-booklet-reader aria-label="Museum Multiverse Lost Pages booklet reader">
      <div class="clean-comic-launcher__paper-viewport" data-paper-viewport aria-hidden="true"></div>
      <div class="booklet-reader__intro" data-booklet-intro>
        <div class="booklet-reader__title-card">
          <p class="booklet-reader__seal">Museum Multiverse presents</p>
          <h1>The Lost Pages</h1>
          <p class="clean-comic-hero__copy">A recovered comic booklet. Open the cover, then reveal each page panel by panel.</p>
          <div class="clean-comic-hero__actions"><button type="button" data-booklet-open>Open booklet</button></div>
        </div>
      </div>
      <header class="print-tabletop__hero clean-comic-hero" data-comic-card>
        <div>
          <p class="clean-comic-hero__eyebrow">Comic booklet reader</p>
          <h1>${cover.title}</h1>
          <p class="clean-comic-hero__copy">Read one recovered page at a time. Reveal the comic panels vertically, then open the page experience.</p>
        </div>
        <nav class="clean-comic-hero__actions" aria-label="Print review controls">
          <a class="clean-comic-hero__primary-action" href="${withBasePath('/print')}" data-nav aria-current="page">Print view</a>
          <a class="clean-comic-hero__legacy-action" href="${withBasePath('/book')}" data-nav>Legacy book view</a>
          <a class="clean-comic-hero__legacy-action" href="${withBasePath('/launcher')}" data-nav>Launcher</a>
        </nav>
      </header>
      <main class="print-tabletop__layout booklet-reader__frame" aria-label="One-page booklet reader">
        <div class="booklet-reader__progress" data-booklet-progress>Page 01 of ${String(pages.length).padStart(2, '0')}</div>
        <div class="booklet-reader__book">
          <div class="booklet-reader__pages" data-booklet-pages>
            ${pages.map((page, index) => renderPrintSheet(page, origin, index)).join('')}
          </div>
        </div>
        <div class="booklet-reader__controls" aria-label="Booklet controls">
          <button type="button" data-booklet-prev>Previous page</button>
          <button type="button" data-booklet-reveal>Reveal next panel</button>
          <button type="button" data-booklet-next>Next page</button>
        </div>
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
