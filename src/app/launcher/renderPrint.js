import { cover, pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

const PANEL_KINDS = ['title', 'story', 'mission', 'link', 'collectible'];
const BOOKLET_STYLE = `
  <style>
    .booklet-reader__intro{position:fixed;inset:0;z-index:3;display:grid;place-items:center;padding:24px;background:linear-gradient(145deg,rgba(27,18,10,.9),rgba(9,6,4,.84));transition:opacity .46s ease,visibility .46s ease}.booklet-reader[data-open='true'] .booklet-reader__intro{opacity:0;visibility:hidden;pointer-events:none}.booklet-reader__title-card{width:min(720px,100%);border:1px solid rgba(247,239,222,.24);padding:clamp(28px,6vw,64px);background:rgba(41,28,16,.74);box-shadow:0 32px 90px rgba(0,0,0,.38);text-align:center}.booklet-reader__title-card h1{margin:0;font-family:'Cormorant Garamond',serif;font-size:clamp(3.4rem,12vw,8rem);line-height:.82}.booklet-reader__seal{margin:0 0 18px;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:rgba(247,239,222,.64)}.booklet-reader__frame{width:min(900px,100%)}.booklet-reader__pages{min-height:clamp(560px,70vw,760px);perspective:1400px}.booklet-reader__page{min-height:inherit}.booklet-reader__page[hidden]{display:none}.booklet-reader__panel{opacity:0;transform:translateY(16px);transition:opacity .3s ease,transform .3s ease}.booklet-reader__panel[data-revealed='true']{opacity:1;transform:translateY(0)}.booklet-reader__link{display:grid;grid-template-columns:1fr minmax(116px,148px);gap:14px;align-items:end}.booklet-reader__controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.booklet-reader__controls button,.booklet-reader__intro button{min-height:42px;border:1px solid rgba(247,239,222,.28);border-radius:999px;background:rgba(247,239,222,.12);color:var(--paper);font-weight:900;padding:0 16px}.booklet-reader__progress{text-align:center;color:rgba(247,239,222,.76);font-weight:900;letter-spacing:.08em;text-transform:uppercase}.booklet-reader__book{position:relative;animation:bookletSettle .72s ease both}.booklet-reader__book:before{content:'';position:absolute;inset:-22px;z-index:-1;background:linear-gradient(90deg,rgba(32,20,10,.75),rgba(100,66,35,.24),rgba(18,11,7,.72));box-shadow:0 38px 120px rgba(0,0,0,.42);transform:rotateX(8deg);transform-origin:center bottom}@keyframes bookletSettle{from{opacity:.1;transform:translateY(42px) rotateX(12deg) scale(.96)}to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}}
  </style>
`;

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
      ${BOOKLET_STYLE}
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
