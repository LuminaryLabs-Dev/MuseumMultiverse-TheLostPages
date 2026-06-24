import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'symbol-alignment', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'breathing-frame-hall', width: 5.6, depth: 4.8, floor: '#394644', walls: '#526863' }),
  sceneRecipe: {
    id: 'frame-that-breathes-recipe',
    buildingId: 'breathing-frame-hall',
    placement: { preferredAnchor: 'north-wall', arScale: tuning.placementScale, desktopCameraPreset: 'wall-focus' },
    objects: [
      { id: 'breathing-frame', group: 'frame', archetype: 'portal-frame', kit: 'symbol-alignment', transform: { anchor: 'north-wall', x: 0, y: 1.55, z: 0 }, visual: { shape: 'frame', color: '#345a54', glow: '#ccfff4', effect: 'breathing-scale' }, interaction: { action: 'open', count: 1 } },
      { id: 'glyph-01', group: 'glyphs', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -0.9, y: 1.95, z: 0.04 }, visual: { shape: 'glyph', color: '#7ec6b8', glow: '#ccfff4' }, interaction: { action: 'align', count: 1 } },
      { id: 'glyph-02', group: 'glyphs', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 0.9, y: 1.95, z: 0.04 }, visual: { shape: 'glyph', color: '#7ec6b8', glow: '#ccfff4' }, interaction: { action: 'align', count: 1 } },
      { id: 'glyph-03', group: 'glyphs', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 0, y: 1.05, z: 0.04 }, visual: { shape: 'glyph', color: '#7ec6b8', glow: '#ccfff4' }, interaction: { action: 'align', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'frame-that-breathes-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-frame', label: 'Place frame', instruction: 'Place the breathing frame upright in the room.', requiredAction: 'place', target: 1 },
      { id: 'align-glyphs', label: 'Align glyphs', instruction: 'Align the three glyphs around the frame.', requiredAction: 'align', target: tuning.glyphCount },
      { id: 'open-portal', label: 'Open portal', instruction: 'Tap inside the frame when the glyphs lock.', requiredAction: 'open', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'breathing-frame-mark' }
  },
  interactionDataset: {
    id: 'frame-that-breathes-interactions',
    inputs: [
      { action: 'align', source: 'pointer', targetGroup: 'glyphs' },
      { action: 'open', source: 'pointer', targetGroup: 'frame' }
    ],
    constraints: [{ type: 'snap-tolerance', targetGroup: 'glyphs', toleranceDegrees: 12 }],
    feedback: [{ on: 'step.complete', effect: 'portal-open' }]
  },
  visualDataset: {
    id: 'teal-breathing-frame',
    palette: { base: '#101716', accent: '#7ec6b8', glow: '#ccfff4', danger: '#9b2f2f' },
    materials: [{ id: 'teal-ink', kind: 'emissive', color: '#7ec6b8' }],
    effects: [
      { id: 'breathing-scale', kind: 'scale-loop', durationMs: 1800 },
      { id: 'portal-open', kind: 'ring-expand', durationMs: 1200 }
    ]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'wall-focus' }
};
