import { pages, getPageUrl } from '../../data/pages.js';
import { renderQrCode } from '../../lib/qr.js';
import { renderPortalLandingMarkup } from '../landing/portalLanding.js';

export function renderBookMarkup() {
  return renderPortalLandingMarkup();
}

export async function renderBookQrCodes() {
  return true;
}

export function renderPrintMarkup() {
  return renderPortalLandingMarkup();
}

export async function renderPrintQrCodes(root, origin) {
  await Promise.all(pages.map((page) => {
    const target = root.querySelector(`[data-print-qr="${page.slug}"]`);
    const pageUrl = getPageUrl(page, origin);
    if (target) target.dataset.qrTarget = pageUrl;
    return renderQrCode(target, pageUrl);
  }));
}
