import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

const mapCells = Array.from({ length: tuning.mazeRows * tuning.mazeColumns }, (_, index) => ({
  id: `character-map-region-${String(index + 1).padStart(3, '0')}`,
  group: 'maze-map',
  archetype: 'map-region',
  kit: 'character-map-experience',
  transform: {
    anchor: 'wall',
    x: index % tuning.mazeColumns,
    y: Math.floor(index / tuning.mazeColumns),
    z: 0
  },
  visual: { shape: 'hidden-maze-region', color: '#d5b56f' }
}));

export const level = {
  kits: ['surface-placement', 'objective-flow', 'collectible', 'character-map-experience'],
  buildingDataset: rectangularRoom({
    id: 'lost-pages-character-map-wall',
    width: 6.4,
    depth: 5.4,
    floor: '#3a342d',
    walls: '#62543f'
  }),
  characterMap: {
    maze: { rows: tuning.mazeRows, columns: tuning.mazeColumns, seed: tuning.mazeSeed },
    unfold: { durationMs: tuning.unfoldDurationMs }
  },
  sceneRecipe: {
    id: 'character-map-recipe',
    buildingId: 'lost-pages-character-map-wall',
    placement: { preferredAnchor: 'wall', arScale: tuning.placementScale, desktopCameraPreset: 'front-wall' },
    objects: [
      ...mapCells,
      { id: 'folded-character-map', group: 'map', archetype: 'wall-map', kit: 'character-map-experience', transform: { anchor: 'wall', x: 0, y: 1.5, z: 0 }, visual: { shape: 'paper-map', color: '#d5b56f', glow: '#ecd2a0' } },
      { id: 'map-character', group: 'character', archetype: 'map-character', kit: 'character-map-experience', transform: { anchor: 'map-start', x: 0, y: 0, z: 0 }, visual: { shape: 'character', color: '#193b52' } },
      { id: 'maze-heart', group: 'goal', archetype: 'maze-goal', kit: 'character-map-experience', transform: { anchor: 'map-goal', x: 0, y: 0, z: 0 }, visual: { shape: 'heart', color: '#b7342b', glow: '#ffd36b' } },
      { id: 'gallery-key-fragment', group: 'reward', archetype: 'collectible', kit: 'collectible', transform: { anchor: 'map-goal', x: 0, y: 0, z: 0 }, visual: { shape: 'fragment', color: '#d8b76d', glow: '#fff0b3' }, interaction: { action: 'claim', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'character-map-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'find-wall', label: 'Find a wall', instruction: 'Point your phone at a clear wall.', requiredAction: 'place', target: 1, timeoutSeconds: 60 },
      { id: 'solve-maze', label: 'Find the maze heart', instruction: 'Swipe the character through the unfolded map.', requiredAction: 'solve-maze', target: 1 },
      { id: 'claim-fragment', label: 'Claim the fragment', instruction: 'Claim the Gallery Key Fragment.', requiredAction: 'claim', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'gallery-key-fragment' }
  },
  interactionDataset: {
    id: 'character-map-interactions',
    inputs: [
      { action: 'swipe', source: 'touch', targetGroup: 'character' },
      { action: 'claim', source: 'pointer', targetGroup: 'reward' }
    ],
    constraints: [{ type: 'cardinal-maze-paths', targetGroup: 'maze-map' }],
    feedback: [
      { on: 'wall.detected', effect: 'map-unfold' },
      { on: 'maze.complete', effect: 'fragment-awaken' }
    ]
  },
  visualDataset: {
    id: 'character-map-parchment',
    palette: { base: '#17130f', accent: '#cda96d', glow: '#ecd2a0', danger: '#b7342b' },
    materials: [
      { id: 'aged-map', kind: 'canvas-parchment', color: '#d5b56f' },
      { id: 'maze-ink', kind: 'matte', color: '#4b2b1b' }
    ],
    effects: [
      { id: 'map-unfold', kind: 'fold-open', durationMs: tuning.unfoldDurationMs },
      { id: 'fragment-awaken', kind: 'glow-pop', durationMs: 650 }
    ]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'front-wall' }
};
