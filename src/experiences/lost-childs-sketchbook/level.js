import { preferredModes } from '../authoring.js';
import { rectangularRoom } from '../shared/buildings.js';
import { rewardDataset } from '../shared/rewards.js';
import { tuning } from './tuning.js';

export const level = {
  kits: ['surface-placement', 'interaction-target', 'moving-target', 'objective-flow', 'collectible'],
  buildingDataset: rectangularRoom({ id: 'sketchbook-room', width: 5, depth: 4.6, floor: '#4a3c33', walls: '#705d4d' }),
  sceneRecipe: {
    id: 'lost-childs-sketchbook-recipe',
    buildingId: 'sketchbook-room',
    placement: { preferredAnchor: 'center-floor', arScale: tuning.placementScale, desktopCameraPreset: 'tabletop' },
    objects: [
      { id: 'sketchbook-page', group: 'page', archetype: 'surface-card', kit: 'surface-placement', transform: { anchor: 'center-floor', x: 0, y: 0.04, z: 0 }, visual: { shape: 'paper', color: '#f2d5ad', glow: '#ffd9c2' }, interaction: { action: 'reveal', count: 1 } },
      { id: 'sketch-creature-01', group: 'sketch-creatures', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: -0.8, y: 0.18, z: -0.4 }, visual: { shape: 'scribble', color: '#3f3028', glow: '#ffd9c2' }, interaction: { action: 'catch', count: 1 } },
      { id: 'sketch-creature-02', group: 'sketch-creatures', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.1, y: 0.18, z: 0.2 }, visual: { shape: 'scribble', color: '#3f3028', glow: '#ffd9c2' }, interaction: { action: 'catch', count: 1 } },
      { id: 'sketch-creature-03', group: 'sketch-creatures', archetype: 'interactive-target', kit: 'interaction-target', transform: { anchor: 'center-floor', x: 0.8, y: 0.18, z: -0.1 }, visual: { shape: 'scribble', color: '#3f3028', glow: '#ffd9c2' }, interaction: { action: 'catch', count: 1 } }
    ]
  },
  objectiveDataset: {
    id: 'lost-childs-sketchbook-objectives',
    durationSeconds: tuning.durationSeconds,
    steps: [
      { id: 'place-sketchbook', label: 'Place sketchbook', instruction: 'Place the sketchbook page on a flat surface.', requiredAction: 'place', target: 1 },
      { id: 'catch-sketches', label: 'Catch sketches', instruction: 'Tap the three wandering pencil shapes before they leave the page.', requiredAction: 'catch', target: tuning.sketchCount },
      { id: 'reveal-memory', label: 'Reveal memory', instruction: 'Reveal the hidden memory sketch.', requiredAction: 'reveal', target: 1 }
    ],
    completion: { event: 'experience.complete', collectibleId: 'memory-sketch-fragment' }
  },
  interactionDataset: {
    id: 'lost-childs-sketchbook-interactions',
    inputs: [
      { action: 'catch', source: 'pointer', targetGroup: 'sketch-creatures' },
      { action: 'reveal', source: 'pointer', targetGroup: 'page' }
    ],
    constraints: [{ type: 'movement-bounds', targetGroup: 'sketch-creatures', width: 1.8, height: 1.2 }],
    feedback: [{ on: 'target.complete', effect: 'ink-pop' }]
  },
  visualDataset: {
    id: 'graphite-memory-page',
    palette: { base: '#19110f', accent: '#f0a26d', glow: '#ffd9c2', danger: '#9b2f2f' },
    materials: [
      { id: 'paper', kind: 'matte', color: '#f2d5ad' },
      { id: 'graphite', kind: 'flat', color: '#3f3028' }
    ],
    effects: [{ id: 'ink-pop', kind: 'jitter-fade', durationMs: 520 }]
  },
  rewardDataset,
  ar: { preferredModes, placementScale: tuning.placementScale, fallbackRoomCamera: 'tabletop' }
};
