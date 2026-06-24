import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'reveal-light', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'dark-canvas-room', width: 5.2, depth: 4.6, floor: '#28232b', walls: '#332b39', ceiling: '#120f15' }),
  sceneRecipe: {
    id: 'monster-behind-canvas-recipe',
    buildingId: 'dark-canvas-room',
    placement: { preferredAnchor: 'north-wall', arScale: tuning.placementScale, desktopCameraPreset: 'wall-focus' },
    objects: [
      { id: 'dark-canvas', group: 'canvas', archetype: 'reveal-surface', kit: 'reveal-light', transform: { anchor: 'north-wall', x: 0, y: 1.55, z: 0 }, visual: { shape: 'canvas', color: '#151117', glow: '#e5d8ff' }, interaction: { action: 'lock', count: 1 } },
      { id: 'hidden-symbol-01', group: 'symbols', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -0.72, y: 1.85, z: 0.04 }, visual: { shape: 'eye', color: '#9d7adf', glow: '#e5d8ff' }, interaction: { action: 'pulse', count: 1 } },
      { id: 'hidden-symbol-02', group: 'symbols', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 0.74, y: 1.78, z: 0.04 }, visual: { shape: 'rune', color: '#9d7adf', glow: '#e5d8ff' }, interaction: { action: 'pulse', count: 1 } },
      { id: 'hidden-symbol-03', group: 'symbols', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 0.05, y: 1.16, z: 0.04 }, visual: { shape: 'mark', color: '#9d7adf', glow: '#e5d8ff' }, interaction: { action: 'pulse', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'monster-behind-canvas-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-canvas', label: 'Place canvas', instruction: 'Place the dark canvas upright.', requiredAction: 'place', target: 1 },
      { id: 'reveal-symbols', label: 'Reveal symbols', instruction: 'Pulse the light to reveal three hidden symbols.', requiredAction: 'pulse', target: tuning.symbolCount },
      { id: 'lock-canvas', label: 'Lock canvas', instruction: 'Lock the symbols before the canvas overexposes.', requiredAction: 'lock', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'shadow-exhibit-fragment' }
  },
  interactionDataset: {
    id: 'monster-behind-canvas-interactions',
    inputs: [
      { action: 'pulse', source: 'pointer', targetGroup: 'symbols' },
      { action: 'lock', source: 'pointer', targetGroup: 'canvas' }
    ],
    constraints: [{ type: 'overexposure-limit', maxExposure: tuning.maxExposure }],
    feedback: [{ on: 'target.complete', effect: 'cold-reveal' }]
  },
  visualDataset: {
    id: 'cold-light-canvas',
    palette: { base: '#151117', accent: '#9d7adf', glow: '#e5d8ff', danger: '#9b2f2f' },
    materials: [{ id: 'black-canvas', kind: 'matte', color: '#151117' }],
    effects: [{ id: 'cold-reveal', kind: 'light-pulse', durationMs: 520 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'wall-focus' }
};
