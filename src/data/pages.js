import { experiences } from '../ar/registry/experiences.js';
import { requirePublicUrl } from '../lib/origin.js';

export const pages = experiences;

export const cover = {
  title: 'Museum Multiverse: Lost Pages',
  subtitle:
    'A launcher magazine for eight tiny AR demos, each opened by QR and placed with a simple floor-anchor flow.',
  blurb:
    'The launcher is the front door. Each page is a separate demo module with its own copy and scene.'
};

export function getPageBySlug(slug) {
  return experiences.find((page) => page.slug === slug);
}

export function getPagePath(page) {
  return `/ar/${page.slug}/`;
}

export function getPageUrl(page, origin) {
  if (origin) {
    return `${origin}${getPagePath(page)}`;
  }

  return requirePublicUrl(getPagePath(page));
}
