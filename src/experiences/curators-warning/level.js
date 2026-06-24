import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'sorting', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'red-seal-room', width: 5.4, depth: 4.8, floor: '#463535', walls: '#6f5551' }),
  sceneRecipe: {
    id: 'curators-warning-recipe',
    buildingId: 'red-seal-room',
    placement: { preferredAnchor: 'north-wall', arScale: tuning.placementScale, desktopCameraPreset: 'wall-focus' },
    objects: [
      { id: 'warning-placard', group: 'notice', archetype: 'sign', kit: 'sorting', transform: { anchor: 'north-wall', x: 0, y: 1.55, z: 0 }, visual: { shape: 'placard', color: '#7f2f2b', glow: '#ffd0c9' }, interaction: { action: 'read', count: 1 } },
      { id: 'word-fragment-01', group: 'words', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -1.2, y: 2.05, z: 0.05 }, visual: { shape: 'word', color: '#e9d5ca', glow: '#ffd0c9' }, interaction: { action: 'restore', count: 1 } },
      { id: 'word-fragment-02', group: 'words', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 1.2, y: 2.05, z: 0.05 }, visual: { shape: 'word', color: '#e9d5ca', glow: '#ffd0c9' }, interaction: { action: 'restore', count: 1 } },
      { id: 'word-fragment-03', group: 'words', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: -1, y: 1.05, z: 0.05 }, visual: { shape: 'word', color: '#e9d5ca', glow: '#ffd0c9' }, interaction: { action: 'restore', count: 1 } },
      { id: 'word-fragment-04', group: 'words', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'north-wall', x: 1, y: 1.05, z: 0.05 }, visual: { shape: 'word', color: '#e9d5ca', glow: '#ffd0c9' }, interaction: { action: 'restore', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'curators-warning-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-seal', label: 'Place seal', instruction: 'Place the red warning seal against the wall.', requiredAction: 'place', target: 1 },
      { id: 'restore-words', label: 'Restore words', instruction: 'Collect four missing warning words.', requiredAction: 'restore', target: tuning.wordCount },
      { id: 'read-warning', label: 'Read warning', instruction: 'Read the restored warning before the seal fades.', requiredAction: 'read', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'red-seal-warning' }
  },
  interactionDataset: {
    id: 'curators-warning-interactions',
    inputs: [
      { action: 'restore', source: 'pointer', targetGroup: 'words' },
      { action: 'read', source: 'pointer', targetGroup: 'notice' }
    ],
    constraints: [{ type: 'ordered-sequence', targetGroup: 'words' }],
    feedback: [{ on: 'step.complete', effect: 'warning-pulse' }]
  },
  visualDataset: {
    id: 'red-seal-ink',
    palette: { base: '#181010', accent: '#d76d64', glow: '#ffd0c9', danger: '#9b2f2f' },
    materials: [{ id: 'red-seal', kind: 'matte', color: '#7f2f2b' }],
    effects: [{ id: 'warning-pulse', kind: 'shake-flash', durationMs: 700 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'wall-focus' }
};
