import * as THREE from 'three';

function visualOffsetFor({ width, height, pivot }) {
  if (pivot === 'center') return { x: -width / 2, y: -height / 2, z: 0 };
  if (pivot === 'left-spine') return { x: 0, y: -height / 2, z: 0 };
  return { x: 0, y: 0, z: 0 };
}

export function createPagePivotService({ anchor = 'bottom-left', pivot = 'center' } = {}) {
  const state = {
    anchor,
    pivot,
    createdPivotCount: 0
  };

  function wrap({ children = [], width = 1, height = 1, name = 'page-pivot' } = {}) {
    const pivotOffset = { x: 0, y: 0, z: 0 };
    const visualOffset = visualOffsetFor({ width, height, pivot });
    const pivotGroup = new THREE.Group();
    const visualGroup = new THREE.Group();

    pivotGroup.name = name;
    visualGroup.name = `${name}-visual`;
    pivotGroup.position.set(pivotOffset.x, pivotOffset.y, pivotOffset.z);
    visualGroup.position.set(visualOffset.x, visualOffset.y, visualOffset.z);

    children.forEach((child) => visualGroup.add(child));
    pivotGroup.add(visualGroup);
    pivotGroup.userData.pagePivot = {
      anchor,
      pivot,
      width,
      height,
      pivotOffset,
      visualOffset
    };
    visualGroup.userData.pagePivotVisual = true;
    state.createdPivotCount += 1;

    return {
      anchor,
      pivot,
      pivotGroup,
      visualGroup,
      pivotOffset,
      visualOffset
    };
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ wrap, snapshot });
}
