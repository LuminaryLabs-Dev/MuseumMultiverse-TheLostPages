import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'sorting', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'in-between-quadrant-room', width: 6, depth: 5.2, floor: '#303842', walls: '#4b5661' }),
  sceneRecipe: {
    id: 'in-between-exhibit-recipe',
    buildingId: 'in-between-quadrant-room',
    placement: { preferredAnchor: 'center-floor', arScale: tuning.placementScale, desktopCameraPreset: 'tabletop' },
    objects: [
      { id: 'quadrant-board', group: 'board', archetype: 'sorting-board', kit: 'sorting', transform: { anchor: 'center-floor', x: 0, y: 0.08, z: 0 }, visual: { shape: 'quadrant', color: '#263340', glow: '#d5ecff' }, interaction: { action: 'stabilize', count: 1 } },
      { id: 'artifact-water', group: 'artifacts', targetGroup: 'zones', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: -0.9, y: 0.22, z: 0.65 }, visual: { shape: 'drop', color: '#6ea7d8', glow: '#d5ecff' }, interaction: { action: 'sort', count: 1 } },
      { id: 'artifact-forest', group: 'artifacts', targetGroup: 'zones', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.85, y: 0.22, z: 0.52 }, visual: { shape: 'leaf', color: '#7bbf72', glow: '#d5ecff' }, interaction: { action: 'sort', count: 1 } },
      { id: 'artifact-stone', group: 'artifacts', targetGroup: 'zones', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: -0.65, y: 0.22, z: -0.7 }, visual: { shape: 'stone', color: '#b8a078', glow: '#d5ecff' }, interaction: { action: 'sort', count: 1 } },
      { id: 'artifact-star', group: 'artifacts', targetGroup: 'zones', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.75, y: 0.22, z: -0.62 }, visual: { shape: 'star', color: '#d6dff5', glow: '#d5ecff' }, interaction: { action: 'sort', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'in-between-exhibit-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-quadrants', label: 'Place quadrants', instruction: 'Place the four-zone board on a flat surface.', requiredAction: 'place', target: 1 },
      { id: 'sort-artifacts', label: 'Sort artifacts', instruction: 'Drag or tap four artifacts into matching zones.', requiredAction: 'sort', target: tuning.artifactCount },
      { id: 'stabilize-board', label: 'Stabilize exhibit', instruction: 'Stabilize the board after every object is sorted.', requiredAction: 'stabilize', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'portal-stabilizer-fragment' }
  },
  interactionDataset: {
    id: 'in-between-exhibit-interactions',
    inputs: [
      { action: 'sort', source: 'pointer', targetGroup: 'artifacts' },
      { action: 'stabilize', source: 'pointer', targetGroup: 'board' }
    ],
    constraints: [{ type: 'drag-to-zone', targetGroup: 'artifacts', zoneGroup: 'zones' }],
    feedback: [{ on: 'step.complete', effect: 'glitch-stabilize' }]
  },
  visualDataset: {
    id: 'four-zone-glitch',
    palette: { base: '#101419', accent: '#6ea7d8', glow: '#d5ecff', danger: '#9b2f2f' },
    materials: [{ id: 'quadrant-panel', kind: 'matte', color: '#263340' }],
    effects: [{ id: 'glitch-stabilize', kind: 'jitter-to-still', durationMs: 900 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'tabletop' }
};
