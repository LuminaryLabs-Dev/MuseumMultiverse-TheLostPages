import { cover, pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { withBasePath } from '../routes/basePath.js';

const PANEL_KINDS = ['title', 'story', 'mission', 'link', 'collectible'];
const BOOKLET_STYLE = `
  <style>
    .booklet-reader{--sheet-gloss:rgba(255,255,255,.18);--sheet-edge:#16100c;--sheet-shadow:rgba(0,0,0,.34)}
    .booklet-reader__intro{display:none}.booklet-reader__title-card{display:none}
    .booklet-reader__frame{width:min(760px,100%);gap:16px}.booklet-reader__book{position:relative;min-height:clamp(560px,72vw,760px);perspective:1200px;contain:layout paint;isolation:isolate}.booklet-reader__book:before{content:'';position:absolute;inset:26px -20px -26px;z-index:0;background:rgba(0,0,0,.22);filter:blur(24px);transform:translate3d(0,18px,0)}
    .booklet-reader__cover{position:absolute;inset:0;z-index:5;display:grid;align-content:end;gap:12px;padding:clamp(28px,5vw,54px);border:2px solid var(--sheet-edge);border-radius:0;color:#fff3d8;background:linear-gradient(120deg,var(--sheet-gloss),transparent 32%),linear-gradient(160deg,#55371e,#20140d 62%,#120b07);box-shadow:0 12px 0 rgba(20,14,10,.86),0 36px 90px rgba(0,0,0,.42);transform-origin:top center;backface-visibility:hidden;will-change:transform,opacity;transition:transform .68s cubic-bezier(.2,.84,.16,1),opacity .28s ease}.booklet-reader[data-open='true'] .booklet-reader__cover{transform:rotateX(-104deg) translate3d(0,-24px,0);opacity:0;pointer-events:none}.booklet-reader__cover h2{margin:0;font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,9vw,6.8rem);line-height:.84}.booklet-reader__cover span{font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,243,216,.7)}
    .booklet-reader__pages{position:absolute;inset:0;z-index:1;transform-style:preserve-3d}.booklet-reader__page{position:absolute;inset:0;min-height:0;grid-template-rows:auto 1fr;border-radius:0;backface-visibility:hidden;contain:layout paint;will-change:transform,opacity;transition:transform .34s cubic-bezier(.18,.8,.2,1),opacity .22s ease,visibility .22s ease}.booklet-reader__page[hidden]{display:grid;visibility:hidden;opacity:0;pointer-events:none}.booklet-reader__page[data-deck='active']{z-index:4;opacity:1;transform:translate3d(0,0,32px) rotate(0deg) scale(1)}.booklet-reader__page[data-deck='next-1']{z-index:3;visibility:visible;opacity:.74;transform:translate3d(0,18px,8px) rotate(1.2deg) scale(.982)}.booklet-reader__page[data-deck='next-2']{z-index:2;visibility:visible;opacity:.48;transform:translate3d(0,34px,2px) rotate(-1deg) scale(.966)}.booklet-reader__page[data-deck='back']{z-index:1;visibility:visible;opacity:.22;transform:translate3d(0,46px,-6px) rotate(.6deg) scale(.95)}
    .booklet-reader__page:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.18),transparent 30%,transparent 72%,rgba(255,255,255,.1));mix-blend-mode:screen}.booklet-reader__panel{opacity:0;transform:translate3d(0,16px,0);transition:opacity .28s ease,transform .28s ease}.booklet-reader__panel[data-revealed='true']{opacity:1;transform:translate3d(0,0,0)}.booklet-reader__link{display:grid;grid-template-columns:1fr minmax(112px,146px);gap:14px;align-items:end}.booklet-reader__controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.booklet-reader__controls button{min-height:42px;border:1px solid rgba(247,239,222,.28);border-radius:0;background:rgba(247,239,222,.12);color:var(--paper);font-weight:900;padding:0 16px}.booklet-reader__progress{text-align:center;color:rgba(247,239,222,.76);font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .booklet-reader[data-flip='forward'] .booklet-reader__page[data-deck='active']{animation:flipInForward .36s cubic-bezier(.18,.8,.2,1) both}.booklet-reader[data-flip='backward'] .booklet-reader__page[data-deck='active']{animation:flipInBackward .36s cubic-bezier(.18,.8,.2,1) both}.booklet-reader[data-shuffle='true'] .booklet-reader__page[data-deck^='next']{animation:deckShuffle .42s ease both}@keyframes flipInForward{from{opacity:.25;transform:translate3d(0,58px,28px) rotateX(10deg) scale(.97)}to{opacity:1;transform:translate3d(0,0,32px) rotateX(0) scale(1)}}@keyframes flipInBackward{from{opacity:.25;transform:translate3d(0,-44px,28px) rotateX(-8deg) scale(.97)}to{opacity:1;transform:translate3d(0,0,32px) rotateX(0) scale(1)}}@keyframes deckShuffle{0%{transform:translate3d(0,42px,0) rotate(0deg) scale(.96)}52%{transform:translate3d(12px,20px,8px) rotate(2.4deg) scale(.98)}100%{}}
    @media(max-width:760px){.booklet-reader__book{min-height:620px}.booklet-reader__frame{width:100%}.booklet-reader__link{grid-template-columns:1fr}.booklet-reader__cover{padding:24px}.booklet-reader__controls button{flex:1 1 auto}}
    @media(prefers-reduced-motion:reduce){.booklet-reader__cover,.booklet-reader__page,.booklet-reader__panel{transition:none!important;animation:none!important;transform:none!important}.booklet-reader[data-open='true'] .booklet-reader__cover{display:none}}
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
    <article class="print-page-sheet booklet-reader__page" data-comic-card data-booklet-page data-page-index="${index}" data-page-slug="${page.slug}" ${index === 0 ? 'data-active="true" data-deck="active"' : 'hidden'} style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
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
  return renderPrintMarkup();
}

export async function renderBookQrCodes() {
  return true;
}

export function renderPrintMarkup(origin = '') {
  return `
    <section class="print-tabletop clean-comic-launcher booklet-reader" data-comic-stage data-print-stage data-booklet-reader aria-label="Museum Multiverse Lost Pages booklet reader">
      ${BOOKLET_STYLE}
      <div class="clean-comic-launcher__paper-viewport" data-paper-viewport aria-hidden="true"></div>
      <header class="print-tabletop__hero clean-comic-hero" data-comic-card>
        <div>
          <p class="clean-comic-hero__eyebrow">Flat comic flipbook</p>
          <h1>${cover.title}</h1>
          <p class="clean-comic-hero__copy">A sharp-edged, glossy paper stack. Flip vertically through one page at a time, then open the page experience.</p>
        </div>
      </header>
      <main class="print-tabletop__layout booklet-reader__frame" aria-label="One-page flipbook reader">
        <div class="booklet-reader__progress" data-booklet-progress>Page 01 of ${String(pages.length).padStart(2, '0')}</div>
        <div class="booklet-reader__book">
          <div class="booklet-reader__cover" data-booklet-cover>
            <span>Archive item MM-LP-08</span>
            <h2>The Lost Pages</h2>
            <span>Cover turns first</span>
          </div>
          <div class="booklet-reader__pages" data-booklet-pages>
            ${pages.map((page, index) => renderPrintSheet(page, origin, index)).join('')}
          </div>
        </div>
        <div class="booklet-reader__controls" aria-label="Booklet controls">
          <button type="button" data-booklet-prev>Previous</button>
          <button type="button" data-booklet-reveal>Reveal panel</button>
          <button type="button" data-booklet-next>Next</button>
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
