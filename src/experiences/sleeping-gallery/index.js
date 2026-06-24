import { copy } from './copy.js';
import { level } from './level.js';
import { tuning } from './tuning.js';
import { createExperienceManifest } from '../authoring.js';

export const sleepingGallery = createExperienceManifest({ copy, level, tuning });
