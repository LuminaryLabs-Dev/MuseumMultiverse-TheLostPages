export function rectangularRoom({ id, width = 6, depth = 5, height = 3, floor = '#4b463f', walls = '#756955', ceiling = '#25211d', anchors = [] }) {
  return {
    id,
    units: 'meters',
    seed: id,
    scale: 1,
    rooms: [
      {
        id: 'main',
        type: 'rect',
        size: { width, depth, height },
        transform: { x: 0, y: 0, z: 0, rotationY: 0 },
        floor: { material: 'stone-tile', color: floor },
        walls: { material: 'aged-plaster', color: walls },
        ceiling: { enabled: true, material: 'dark-panel', color: ceiling },
        lighting: [
          { id: 'warm-overhead', type: 'area', x: 0, y: height - 0.25, z: -0.8, intensity: 0.8 },
          { id: 'low-fill', type: 'point', x: 0, y: 1.4, z: 1.8, intensity: 0.25 }
        ],
        anchors: [
          { id: 'center-floor', type: 'floor', x: 0, y: 0, z: 0 },
          { id: 'north-wall', type: 'wall', x: 0, y: height * 0.5, z: -depth / 2 + 0.05 },
          { id: 'south-wall', type: 'wall', x: 0, y: height * 0.5, z: depth / 2 - 0.05 },
          { id: 'left-wall', type: 'wall', x: -width / 2 + 0.05, y: height * 0.5, z: 0 },
          { id: 'right-wall', type: 'wall', x: width / 2 - 0.05, y: height * 0.5, z: 0 },
          ...anchors
        ]
      }
    ],
    connections: [],
    props: []
  };
}

export function circularRoom({ id, radius = 3, height = 3, sockets = 8, floor = '#3b3428', walls = '#4f4638' }) {
  const anchors = Array.from({ length: sockets }, (_, index) => {
    const angle = (Math.PI * 2 * index) / sockets;
    return {
      id: `socket-${index + 1}`,
      type: 'floor',
      x: Math.cos(angle) * radius * 0.68,
      y: 0.1,
      z: Math.sin(angle) * radius * 0.68,
      rotationY: -angle
    };
  });

  return rectangularRoom({
    id,
    width: radius * 2,
    depth: radius * 2,
    height,
    floor,
    walls,
    anchors
  });
}
