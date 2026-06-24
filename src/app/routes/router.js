import { getExperienceBySlug } from '../../ar/registry/experiences.js';
import { stripBasePath } from './basePath.js';

export function routeFromLocation(location = window.location) {
  const { search } = location;
  const pathname = stripBasePath(location.pathname);
  const params = new URLSearchParams(search);

  if (pathname === '/book' || pathname === '/print') {
    return { type: 'book' };
  }

  if (pathname === '/' || pathname === '/launcher') {
    return { type: 'launcher' };
  }

  const debugMatch = pathname.match(/^\/debug\/ar\/([^/]+)\/?$/);
  if (debugMatch) {
    return { type: 'experience-debug', experience: getExperienceBySlug(debugMatch[1]) };
  }

  const match = pathname.match(/^\/ar\/([^/]+)\/?$/);
  if (match) {
    return {
      type: params.get('debug') === '1' ? 'experience-debug' : 'experience',
      experience: getExperienceBySlug(match[1])
    };
  }

  const searchPage = params.get('page');
  if (searchPage) {
    return { type: 'experience', experience: getExperienceBySlug(searchPage) };
  }

  return { type: 'launcher' };
}
