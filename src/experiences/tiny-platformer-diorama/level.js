import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'micro-platformer', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'tiny-diorama-tabletop', width: 5.8, depth: 4.8, floor: '#3f4633', walls: '#66724c' }),
  sceneRecipe: {
    id: 'tiny-platformer-diorama-recipe',
    buildingId: 'tiny-diorama-tabletop',
    placement: { preferredAnchor: 'center-floor', arScale: tuning.placementScale, desktopCameraPreset: 'tabletop' },
    objects: [
      { id: 'tiny-runner', group: 'runner', archetype: 'avatar', kit: 'micro-platformer', transform: { anchor: 'center-floor', x: -1.4, y: 0.16, z: 0 }, visual: { shape: 'avatar', color: '#b3d46a', glow: '#ebffc5' }, interaction: { action: 'jump', count: 1 } },
      { id: 'hazard-01', group: 'hazards', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: -0.6, y: 0.12, z: -0.25 }, visual: { shape: 'spike', color: '#6d7d35', glow: '#ebffc5' }, interaction: { action: 'jump', count: 1 } },
      { id: 'hazard-02', group: 'hazards', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.25, y: 0.12, z: 0.22 }, visual: { shape: 'saw', color: '#6d7d35', glow: '#ebffc5' }, interaction: { action: 'jump', count: 1 } },
      { id: 'hazard-03', group: 'hazards', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.95, y: 0.12, z: -0.1 }, visual: { shape: 'gap', color: '#6d7d35', glow: '#ebffc5' }, interaction: { action: 'jump', count: 1 } },
      { id: 'goal-gate', group: 'goal', archetype: 'collectible', kit: 'collectible', transform: { anchor: 'center-floor', x: 1.5, y: 0.22, z: 0 }, visual: { shape: 'gate', color: '#36431f', glow: '#ebffc5' }, interaction: { action: 'enter', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'tiny-platformer-diorama-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-diorama', label: 'Place diorama', instruction: 'Place the tiny course on a flat surface.', requiredAction: 'place', target: 1 },
      { id: 'clear-hazards', label: 'Clear hazards', instruction: 'Tap jump through three hazards.', requiredAction: 'jump', target: tuning.hazardCount },
      { id: 'enter-gate', label: 'Enter gate', instruction: 'Enter the tiny goal gate.', requiredAction: 'enter', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'tiny-portal-badge' }
  },
  interactionDataset: {
    id: 'tiny-platformer-diorama-interactions',
    inputs: [
      { action: 'jump', source: 'pointer', targetGroup: 'hazards' },
      { action: 'enter', source: 'pointer', targetGroup: 'goal' }
    ],
    constraints: [{ type: 'timing-window', targetGroup: 'hazards', windowMs: 850 }],
    feedback: [{ on: 'target.complete', effect: 'jump-pop' }]
  },
  visualDataset: {
    id: 'paper-theater-platformer',
    palette: { base: '#13150f', accent: '#b3d46a', glow: '#ebffc5', danger: '#9b2f2f' },
    materials: [{ id: 'paper-platform', kind: 'matte', color: '#d5e2a2' }],
    effects: [{ id: 'jump-pop', kind: 'arc-bounce', durationMs: 420 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'tabletop' }
};
