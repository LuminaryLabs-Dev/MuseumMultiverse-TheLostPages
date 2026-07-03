import * as THREE from 'three';

function keyFor({ width, height, segmentsX, segmentsY, origin }) {
  return `${width}:${height}:${segmentsX}:${segmentsY}:${origin}`;
}

function applyOrigin(geometry, descriptor) {
  if (descriptor.origin === 'bottom-left') {
    geometry.translate(descriptor.width / 2, descriptor.height / 2, 0);
  }
  return geometry;
}

export function createPlaneMeshCreatorService() {
  const geometryCache = new Map();
  const state = {
    createdGeometryCount: 0,
    reusedGeometryCount: 0
  };

  function getPlane({ width = 1, height = 1, segmentsX = 1, segmentsY = 1, origin = 'center' } = {}) {
    const descriptor = {
      width: Number(width) || 1,
      height: Number(height) || 1,
      segmentsX: Math.max(1, Math.round(Number(segmentsX) || 1)),
      segmentsY: Math.max(1, Math.round(Number(segmentsY) || 1)),
      origin
    };
    const key = keyFor(descriptor);
    if (geometryCache.has(key)) {
      state.reusedGeometryCount += 1;
      return geometryCache.get(key);
    }

    const geometry = applyOrigin(new THREE.PlaneGeometry(
      descriptor.width,
      descriptor.height,
      descriptor.segmentsX,
      descriptor.segmentsY
    ), descriptor);
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
