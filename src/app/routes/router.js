import { getExperienceBySlug, getExperienceByPageId } from '../../ar/registry/experiences.js';
import { stripBasePath } from './basePath.js';

export function routeFromLocation(location = window.location) {
  const { search } = location;
  const pathname = stripBasePath(location.pathname);
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/g, '') : pathname;
  const params = new URLSearchParams(search);

  const simulatorMatch = normalizedPath.match(/^\/sim\/ar\/([^/]+)$/);
  if (simulatorMatch) {
    return { type: 'experience-simulator', experience: getExperienceBySlug(simulatorMatch[1]) };
  }

  const debugMatch = normalizedPath.match(/^\/debug\/ar\/([^/]+)$/);
  if (debugMatch) {
    return { type: 'experience-debug', experience: getExperienceBySlug(debugMatch[1]) };
  }

  const match = normalizedPath.match(/^\/ar\/([^/]+)$/);
  if (match) {
    return {
      type: params.get('debug') === '1' ? 'experience-debug' : 'experience',
      experience: getExperienceBySlug(match[1])
    };
  }

  if (params.has('page')) {
    const experience = getExperienceByPageId(params.get('page'));
    return experience ? { type: 'experience', experience } : { type: 'invalid-page' };
  }

  return { type: 'print' };
}
