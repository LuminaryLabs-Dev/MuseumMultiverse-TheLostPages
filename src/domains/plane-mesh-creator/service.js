import * as THREE from 'three';

function keyFor({ width, height, segmentsX, segmentsY }) {
  return `${width}:${height}:${segmentsX}:${segmentsY}`;
}

export function createPlaneMeshCreatorService() {
  const geometryCache = new Map();
  const state = {
    createdGeometryCount: 0,
    reusedGeometryCount: 0
  };

  function getPlane({ width = 1, height = 1, segmentsX = 1, segmentsY = 1 } = {}) {
    const descriptor = {
      width: Number(width) || 1,
      height: Number(height) || 1,
      segmentsX: Math.max(1, Math.round(Number(segmentsX) || 1)),
      segmentsY: Math.max(1, Math.round(Number(segmentsY) || 1))
    };
    const key = keyFor(descriptor);
    if (geometryCache.has(key)) {
      state.reusedGeometryCount += 1;
      return geometryCache.get(key);
    }

    const geometry = new THREE.PlaneGeometry(
      descriptor.width,
      descriptor.height,
      descriptor.segmentsX,
      descriptor.segmentsY
    );
    geometry.userData.planeMeshCreator = descriptor;
    geometryCache.set(key, geometry);
    state.createdGeometryCount = geometryCache.size;
    return geometry;
  }

  function dispose() {
    geometryCache.forEach((geometry) => geometry.dispose?.());
    geometryCache.clear();
    state.createdGeometryCount = 0;
    return snapshot();
  }

  function snapshot() {
    return {
      ...state,
      cachedGeometryCount: geometryCache.size,
      cachedKeys: [...geometryCache.keys()]
    };
  }

  return Object.freeze({ getPlane, dispose, snapshot });
}
