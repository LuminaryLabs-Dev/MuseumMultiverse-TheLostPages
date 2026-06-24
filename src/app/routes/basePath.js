function normalizeBase(value = import.meta.env.BASE_URL) {
  const raw = String(value || '/').trim();
  if (!raw || raw === '/') return '';
  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

export function getAppBasePath() {
  return normalizeBase();
}

export function stripBasePath(pathname) {
  const base = getAppBasePath();
  if (!base) return pathname || '/';
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname || '/';
}

export function withBasePath(path) {
  const base = getAppBasePath();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }
  if (normalized === '/') return `${base}/`;
  return `${base}${normalized}`;
}
