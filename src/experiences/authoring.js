export const preferredModes = ['page-marker', 'webxr-plane', 'camera-overlay', 'fallback-preview'];

export function createExperienceManifest({ copy, level, tuning = {} }) {
  return {
    ...copy,
    kits: level.kits,
    level,
    tuning,
    preferredModes: level.ar?.preferredModes ?? preferredModes,
    ar: level.ar ?? {}
  };
}
