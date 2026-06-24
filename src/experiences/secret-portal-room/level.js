import { preferredModes } from '../authoring.js';
import { circularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

const sockets = Array.from({ length: tuning.socketCount }, (_, index) => ({
  id: `portal-socket-${index + 1}`,
  group: 'sockets',
  archetype: 'interactive-target',
  kit: 'interaction-target',
  transform: { anchor: `socket-${index + 1}`, x: 0, y: 0.12, z: 0 },
  visual: { shape: 'socket', color: '#7b6230', glow: '#fff1c0' },
  interaction: { action: 'light', count: 1 },
  metadata: { slot: index + 1 }
}));

export const level = {
  kits: ['surface-placement', 'interaction-target', 'lock-and-socket', 'objective-flow', 'collectible'],
  buildingDataset: circularRoom({ id: 'secret-portal-chamber', radius: 3.2, sockets: tuning.socketCount, floor: '#3b3428', walls: '#504431' }),
  sceneRecipe: {
    id: 'secret-portal-room-recipe',
    buildingId: 'secret-portal-chamber',
    placement: { preferredAnchor: 'center-floor', arScale: tuning.placementScale, desktopCameraPreset: 'three-quarter-room' },
    objects: [
      { id: 'central-portal', group: 'portal', archetype: 'lock-core', kit: 'lock-and-socket', transform: { anchor: 'center-floor', x: 0, y: 0.1, z: 0 }, visual: { shape: 'portal-ring', color: '#f0c96a', glow: '#fff1c0' }, interaction: { action: 'unlock', count: 1 } },
      ...sockets
    ]
  },
  objectiveDataset: {
    id: 'secret-portal-room-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-portal-room', label: 'Place portal room', instruction: 'Place the circular socket room on a flat surface.', requiredAction: 'place', target: 1 },
      { id: 'light-sockets', label: 'Light sockets', instruction: 'Light eight sockets with collected fragments.', requiredAction: 'light', target: tuning.socketCount },
      { id: 'unlock-portal', label: 'Unlock portal', instruction: 'Tap the central portal when all sockets are lit.', requiredAction: 'unlock', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'final-portal-key' }
  },
  interactionDataset: {
    id: 'secret-portal-room-interactions',
    inputs: [
      { action: 'light', source: 'pointer', targetGroup: 'sockets' },
      { action: 'unlock', source: 'pointer', targetGroup: 'portal' }
    ],
    constraints: [{ type: 'requires-collectibles', requiredRewardCount: rewardDataset.finaleRequirement.requiredRewardCount }],
    feedback: [{ on: 'step.complete', effect: 'portal-unlock' }]
  },
  visualDataset: {
    id: 'brass-portal-sockets',
    palette: { base: '#17140d', accent: '#f0c96a', glow: '#fff1c0', danger: '#9b2f2f' },
    materials: [{ id: 'brass-socket', kind: 'emissive', color: '#f0c96a' }],
    effects: [{ id: 'portal-unlock', kind: 'ring-expand', durationMs: 1400 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'three-quarter-room' }
};
