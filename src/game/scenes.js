export const gameScenes = {
  hub: {
    id: 'hub',
    title: 'Museum Hub',
    accent: '#d9b777',
    goal: { x: 0, z: -2.8 },
    exhibit: 'The Lost Pages'
  },
  page01: {
    id: 'page01',
    title: 'The Character Map',
    accent: '#d9b777',
    goal: { x: 0, z: -2.8 },
    exhibit: 'Living Map',
    asset: '/assets/comic-pages/page01-museum-entry-v1.png'
  },
  page02: {
    id: 'page02',
    title: 'The Frame That Breathes',
    accent: '#7ec6b8',
    goal: { x: -2.15, z: -2.4 },
    exhibit: 'Breathing Frame',
    asset: '/assets/comic-pages/page02-museum-art-v1.png'
  },
  page03: {
    id: 'page03',
    title: "The Lost Child's Sketchbook",
    accent: '#e7b6c6',
    goal: { x: 2.15, z: -2.4 },
    exhibit: 'Memory Sketch',
    asset: '/assets/comic-pages/page03-museum-art-v1.png'
  },
  page04: {
    id: 'page04',
    title: "The Curator's Warning",
    accent: '#df746d',
    goal: { x: -2.6, z: -0.6 },
    exhibit: 'Red Seal',
    asset: '/assets/comic-pages/page04-museum-art-v1.png'
  },
  page05: {
    id: 'page05',
    title: 'Tiny Platformer Diorama',
    accent: '#b9d975',
    goal: { x: 2.6, z: -0.6 },
    exhibit: 'Tiny Portal',
    asset: '/assets/comic-pages/page05-museum-art-v1.png'
  },
  page06: {
    id: 'page06',
    title: 'The In-Between Exhibit',
    accent: '#8fb8e8',
    goal: { x: -2.15, z: 1.2 },
    exhibit: 'Portal Stabilizer',
    asset: '/assets/comic-pages/page06-museum-art-v1.png'
  },
  page07: {
    id: 'page07',
    title: 'The Monster Behind the Canvas',
    accent: '#ad8de8',
    goal: { x: 2.15, z: 1.2 },
    exhibit: 'Shadow Fragment',
    asset: '/assets/comic-pages/page07-museum-art-v1.png'
  },
  page08: {
    id: 'page08',
    title: 'The Secret Portal Room',
    accent: '#f0c96a',
    goal: { x: 0, z: 1.9 },
    exhibit: 'Final Portal Key',
    asset: '/assets/comic-pages/page08-museum-art-v1.png'
  }
};

export function getGameScene(id) {
  return gameScenes[id] ?? gameScenes.hub;
}
