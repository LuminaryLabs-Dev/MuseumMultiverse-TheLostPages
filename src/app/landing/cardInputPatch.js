import { pages } from '../../data/pages.js';

function esc(value = '') {
  return String(value).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
}

function cardDoc(page) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#030305;color:#f7efde;font-family:Arial,sans-serif}.page{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;gap:18px;padding:24px;background:linear-gradient(120deg,rgba(255,255,255,.14),transparent 30%),linear-gradient(180deg,${esc(page.deep)},#08070a 70%,#030305);border:3px solid rgba(247,239,222,.82);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),inset 0 -40px 88px rgba(0,0,0,.42);position:relative}.page:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.045) 0 1px,transparent 1px 7px),radial-gradient(circle at 30% 48%,${esc(page.accent)}40,transparent 13rem);mix-blend-mode:screen;pointer-events:none}.bar,.foot{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px;border:2px solid rgba(247,239,222,.22);background:rgba(0,0,0,.34);padding:12px 14px}.bar span,.foot small{font-size:.72rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:rgba(247,239,222,.74)}main{position:relative;z-index:1;display:grid;align-content:center;gap:18px}h1{margin:0;font-family:Georgia,serif;font-size:clamp(3rem,17vw,7.4rem);line-height:.82;letter-spacing:-.05em;color:#fff3df;text-shadow:0 3px 0 rgba(0,0,0,.45)}.panel{height:min(26vh,210px);border:3px solid rgba(247,239,222,.3);background:linear-gradient(115deg,${esc(page.accent)},${esc(page.deep)});box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),0 18px 50px rgba(0,0,0,.28)}.panel:before{content:'';display:block;height:18px;margin:24px 24px 0;background:rgba(0,0,0,.28);box-shadow:0 34px 0 rgba(0,0,0,.22),0 68px 0 rgba(0,0,0,.16)}p{max-width:30ch;margin:0;font-size:clamp(1rem,4vw,1.65rem);line-height:1.35;color:rgba(247,239,222,.84)}.reward{display:grid;gap:4px}.reward strong{font-family:Georgia,serif;font-size:1.45rem}.open{align-self:center;border:2px solid rgba(247,239,222,.86);background:${esc(page.glow)};color:#100b07;padding:10px 12px;font-weight:950;text-transform:uppercase;letter-spacing:.06em}</style></head><body><section class="page"><header class="bar"><span>Page ${esc(page.number)}</span><span>${esc(page.qrTitle)}</span></header><main><h1>${esc(page.title)}</h1><div class="panel"></div><p>${esc(page.prompt || page.description)}</p></main><footer class="foot"><div class="reward"><small>Reward</small><strong>${esc(page.collectible)}</strong></div><span class="open">Open AR</span></footer></section></body></html>`;
}

export function installCardInputPatch() {
  const d = globalThis.document;
  if (!d) return () => {};
  function apply() {
    const nodes = d.querySelectorAll('[data-rail-iframe]');
    nodes.forEach((node) => {
      const index = Number(node.getAttribute('data-rail-iframe') || 0);
      const page = pages[index];
      node.style['pointer' + 'Events'] = 'none';
      const child = node.firstElementChild;
      if (child) {
        child.style['pointer' + 'Events'] = 'none';
        if (page && child.dataset.railSrcdoc !== 'true') {
          child.dataset.railSrcdoc = 'true';
          child.removeAttribute('src');
          child.setAttribute('srcdoc', cardDoc(page));
        }
      }
    });
  }
  function relay(event) {
    const canvas = d.querySelector('canvas');
    if (!canvas || event.target === canvas) return;
    canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: event.deltaY, deltaX: event.deltaX, bubbles: true, cancelable: true }));
  }
  const t = globalThis.setInterval(apply, 250);
  globalThis.addEventListener('wheel', relay, { capture: true, passive: true });
  globalThis.requestAnimationFrame(apply);
  return () => {
    globalThis.clearInterval(t);
    globalThis.removeEventListener('wheel', relay, { capture: true });
  };
}
