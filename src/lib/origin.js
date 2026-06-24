const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

function cleanOrigin(value) {
  return String(value ?? '').trim().replace(/\/+$/, '');
}

export function isLoopbackOrigin(origin) {
  try {
    const url = new URL(origin);
    return LOOPBACK_HOSTS.has(url.hostname);
  } catch {
    return true;
  }
}

export function resolvePublicOrigin(location = window.location) {
  const configured = cleanOrigin(import.meta.env.VITE_PUBLIC_ORIGIN);
  if (configured) {
    return configured;
  }

  const current = cleanOrigin(location.origin);
  if (isLoopbackOrigin(current)) {
    return '';
  }

  return current;
}

export function requirePublicUrl(path, location = window.location) {
  const origin = resolvePublicOrigin(location);
  if (!origin) {
    return '';
  }

  return `${origin}${path}`;
}
