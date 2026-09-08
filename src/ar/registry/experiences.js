import { sleepingGallery } from '../../experiences/sleeping-gallery/index.js';
import { frameThatBreathes } from '../../experiences/frame-that-breathes/index.js';
import { lostChildsSketchbook } from '../../experiences/lost-childs-sketchbook/index.js';
import { curatorsWarning } from '../../experiences/curators-warning/index.js';
import { tinyPlatformerDiorama } from '../../experiences/tiny-platformer-diorama/index.js';
import { inBetweenExhibit } from '../../experiences/in-between-exhibit/index.js';
import { monsterBehindCanvas } from '../../experiences/monster-behind-canvas/index.js';
import { secretPortalRoom } from '../../experiences/secret-portal-room/index.js';

export const experiences = [
  sleepingGallery,
  frameThatBreathes,
  lostChildsSketchbook,
  curatorsWarning,
  tinyPlatformerDiorama,
  inBetweenExhibit,
  monsterBehindCanvas,
  secretPortalRoom
];

export function getExperienceBySlug(slug) {
  return experiences.find((entry) => entry.slug === slug);
}

// Publication identities stay stable even when a display title changes.
export function getExperienceByPageId(value) {
  if (typeof value !== 'string') return undefined;
  const match = /^page(0[1-8])$/.exec(value);
  return match ? experiences.find((entry) => entry.number === match[1]) : getExperienceBySlug(value);
}

export function getExperienceRoute(entry) {
  return `/ar/${entry.slug}/`;
}
