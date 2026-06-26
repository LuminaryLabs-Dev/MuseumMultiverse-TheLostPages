import { getPagePath, getPageUrl } from '../../data/pages.js';
import { withBasePath } from '../../app/routes/basePath.js';

export function createRouteQrService({ pages = [], origin = '' } = {}) {
  const indexedPages = pages.map((page, index) => ({ ...page, index }));
  const bySlug = new Map(indexedPages.map((page) => [page.slug, page]));

  function getPage(slug) {
    return bySlug.get(slug) ?? null;
  }

  function getArPath(slug) {
    return `/ar/${slug}/`;
  }

  function getDebugPath(slug) {
    return `/debug/ar/${slug}/`;
  }

  function getQrTarget(slug, nextOrigin = origin) {
    const page = getPage(slug);
    return page ? getPageUrl(page, nextOrigin) : '';
  }

  function validatePages() {
    const errors = [];
    const seen = new Set();
    indexedPages.forEach((page, index) => {
      if (!page.slug) errors.push(`page-${index + 1}:missing-slug`);
      if (page.slug && seen.has(page.slug)) errors.push(`duplicate-slug:${page.slug}`);
      if (page.slug) seen.add(page.slug);
      if (!page.title) errors.push(`missing-title:${page.slug || index}`);
      if (!page.qrTitle) errors.push(`missing-qr-title:${page.slug || index}`);
    });
    return { ok: errors.length === 0, errors };
  }

  function snapshot() {
    return {
      origin,
      launcherPath: withBasePath('/launcher'),
      printPath: withBasePath('/print'),
      legacyBookPath: withBasePath('/book'),
      pages: indexedPages.map((page) => ({
        slug: page.slug,
        title: page.title,
        number: page.number,
        arPath: getArPath(page.slug),
        debugPath: getDebugPath(page.slug),
        qrTarget: getQrTarget(page.slug),
        printPath: getPagePath(page)
      })),
      validation: validatePages()
    };
  }

  return Object.freeze({
    getPage,
    getArPath,
    getDebugPath,
    getQrTarget,
    validatePages,
    snapshot
  });
}
