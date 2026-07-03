const DEFAULT_CONFIG = {
  cardWidth: 2.42,
  cardHeight: 3.14,
  desktopPadding: 1.18,
  mobilePadding: 1.42,
  minDistance: 3.25,
  maxDistance: 7.2,
  cameraLerp: 0.055,
  lookAtZ: 0,
  mobileAspectThreshold: 0.82
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function degToRad(value) {
  return (Number(value) || 0) * Math.PI / 180;
}

function visibleCards(cards = []) {
  return cards.filter((card) => card?.visible !== false);
}

function computeBounds(cards, config) {
  const items = visibleCards(cards);
  if (!items.length) {
    return {
      minX: -config.cardWidth / 2,
      maxX: config.cardWidth / 2,
      minY: -config.cardHeight / 2,
      maxY: config.cardHeight / 2,
      centerX: 0,
      centerY: 0,
      width: config.cardWidth,
      height: config.cardHeight
    };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  items.forEach((card) => {
    const position = card.railPosition ?? { x: 0, y: 0 };
    const scale = Number(card.railScale ?? 1);
    const halfWidth = config.cardWidth * scale * 0.5;
    const halfHeight = config.cardHeight * scale * 0.5;
    minX = Math.min(minX, position.x - halfWidth);
    maxX = Math.max(maxX, position.x + halfWidth);
    minY = Math.min(minY, position.y - halfHeight);
    maxY = Math.max(maxY, position.y + halfHeight);
  });

  const width = Math.max(config.cardWidth, maxX - minX);
  const height = Math.max(config.cardHeight, maxY - minY);
  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width,
    height
  };
}

export function createViewportFitService(config = {}) {
  const settings = { ...DEFAULT_CONFIG, ...config };
  const state = {
    lastFit: null,
    frame: 0
  };

  function fit({ viewport = {}, cards = [], cameraFov = 45 } = {}) {
    const width = Math.max(1, Number(viewport.width) || 1);
    const height = Math.max(1, Number(viewport.height) || 1);
    const aspect = width / height;
    const isMobile = aspect < settings.mobileAspectThreshold || width <= 720;
    const padding = isMobile ? settings.mobilePadding : settings.desktopPadding;
    const bounds = computeBounds(cards, settings);
    const verticalFov = degToRad(cameraFov || 45);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    const verticalDistance = (bounds.height * padding) / (2 * Math.tan(verticalFov / 2));
    const horizontalDistance = (bounds.width * padding) / (2 * Math.tan(horizontalFov / 2));
    const distance = clamp(
      Math.max(verticalDistance, horizontalDistance),
      settings.minDistance,
      settings.maxDistance
    );

    state.lastFit = {
      viewport: { width, height, aspect, isMobile },
      bounds,
      cameraPosition: {
        x: bounds.centerX,
        y: bounds.centerY,
        z: distance
      },
      lookAt: {
        x: bounds.centerX,
        y: bounds.centerY,
        z: settings.lookAtZ
      },
      distance,
      padding,
      cameraLerp: settings.cameraLerp
    };
    state.frame += 1;
    return state.lastFit;
  }

  function snapshot() {
    return {
      frame: state.frame,
      lastFit: state.lastFit
    };
  }

  return Object.freeze({ fit, snapshot });
}
