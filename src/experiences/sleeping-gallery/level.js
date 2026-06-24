import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({
    id: 'lost-pages-gallery-wing',
    width: 6.4,
    depth: 5.4,
    floor: '#4a443b',
    walls: '#73644f'
  }),
  sceneRecipe: {
    id: 'sleeping-gallery-recipe',
    buildingId: 'lost-pages-gallery-wing',
    placement: { preferredAnchor: 'center-floor', arScale: tuning.placementScale, desktopCameraPreset: 'three-quarter-room' },
    objects: [
      { id: 'frame-light-01', group: 'frame-lights', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -2, y: 1.55, z: 0 }, visual: { shape: 'frame', color: '#8b6b3d', glow: '#ecd2a0' }, interaction: { action: 'tap', count: 1 } },
      { id: 'frame-light-02', group: 'frame-lights', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -1, y: 1.7, z: 0 }, visual: { shape: 'frame', color: '#8b6b3d', glow: '#ecd2a0' }, interaction: { action: 'tap', count: 1 } },
      { id: 'frame-light-03', group: 'frame-lights', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 0, y: 1.5, z: 0 }, visual: { shape: 'frame', color: '#8b6b3d', glow: '#ecd2a0' }, interaction: { action: 'tap', count: 1 } },
      { id: 'frame-light-04', group: 'frame-lights', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 1, y: 1.7, z: 0 }, visual: { shape: 'frame', color: '#8b6b3d', glow: '#ecd2a0' }, interaction: { action: 'tap', count: 1 } },
      { id: 'frame-light-05', group: 'frame-lights', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 2, y: 1.55, z: 0 }, visual: { shape: 'frame', color: '#8b6b3d', glow: '#ecd2a0' }, interaction: { action: 'tap', count: 1 } },
      { id: 'fragment-pedestal', group: 'reward', archetype: 'collectible', kit: 'collectible', transform: { anchor: 'center-floor', x: 0, y: 0.2, z: 0.9 }, visual: { shape: 'pedestal', color: '#33291d', glow: '#ecd2a0' }, interaction: { action: 'claim', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'sleeping-gallery-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-scene', label: 'Place the room', instruction: 'Find a flat surface and place the sleeping gallery.', requiredAction: 'place', target: 1, timeoutSeconds: 45 },
      { id: 'wake-frames', label: 'Wake five frames', instruction: 'Tap five lit frames before the gallery falls asleep again.', requiredAction: 'tap', target: tuning.targetCount, sequenceRequired: true },
      { id: 'claim-fragment', label: 'Claim fragment', instruction: 'Claim the key fragment from the center pedestal.', requiredAction: 'claim', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'gallery-key-fragment' }
  },
  interactionDataset: {
    id: 'sleeping-gallery-interactions',
    inputs: [
      { action: 'tap', source: 'pointer', targetGroup: 'frame-lights' },
      { action: 'claim', source: 'pointer', targetGroup: 'reward' }
    ],
    constraints: [
      { type: 'ordered-sequence', targetGroup: 'frame-lights' },
      { type: 'proximity', maxDistance: 2.5 }
    ],
    feedback: [
      { on: 'target.complete', effect: 'glow-pop' },
      { on: 'step.complete', effect: 'room-light-shift' }
    ]
  },
  visualDataset: {
    id: 'gold-dust-gallery',
    palette: { base: '#141311', accent: '#cda96d', glow: '#ecd2a0', danger: '#9b2f2f' },
    materials: [
      { id: 'aged-frame', kind: 'matte', color: '#8b6b3d' },
      { id: 'dust-light', kind: 'emissive', color: '#ecd2a0' }
    ],
    effects: [
      { id: 'glow-pop', kind: 'scale-fade', durationMs: 450 },
      { id: 'room-light-shift', kind: 'light-warm', durationMs: 900 }
    ]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'three-quarter-room' }
};
