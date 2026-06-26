export function createLaunchService({ pages = [], origin = '', routeQr = null } = {}) {
  const bySlug = new Map(pages.map((page) => [page.slug, page]));

  function getManifest(slug) {
    return bySlug.get(slug) ?? null;
  }

  function getLaunchInfo(slug) {
    const page = getManifest(slug);
    if (!page) return null;
    return {
      slug,
      title: page.title,
      number: page.number,
      qrTitle: page.qrTitle,
      target: routeQr?.getQrTarget?.(slug, origin) ?? ''
    };
  }

  function snapshot() {
    return pages.map((page) => getLaunchInfo(page.slug));
  }

  return Object.freeze({ getManifest, getLaunchInfo, snapshot });
}
