import { pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { renderStableRailMarkup } from '../landing/stableRailLanding.js';

export function renderBookMarkup() {
  return renderStableRailMarkup();
}

export async function renderBookQrCodes() {
  return true;
}

export function renderPrintMarkup() {
  return renderStableRailMarkup();
}

export async function renderPrintQrCodes(root, origin) {
  await Promise.all(pages.map((page) => {
    const target = root.querySelector('[data-print-qr="' + page.slug + '"]');
    const pageUrl = getPageUrl(page, origin);
    if (target) target.dataset.qrTarget = pageUrl;
    return renderQrCode(target, pageUrl);
  }));
}
