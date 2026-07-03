const SOFTNESS = 0.72;
const SIDE_PUSH = 1.55;
const DEPTH_PUSH = 1.45;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function createPaperSkinnedMeshService({ skin = 'lost-pages-stable-rail' } = {}) {
  const state = {
    skin,
    lastSmoothIndex: 0,
    lastTargetIndex: 0,
    appliedFrameCount: 0
  };

  function clampIndex(value, pageCount) {
    return clamp(value, 0, Math.max(0, pageCount - 1));
  }

  function settleTarget(target) {
    return target + (Math.round(target) - target) * 0.026;
  }

  function smoothTarget(target, smooth) {
    return smooth + (target - smooth) * 0.09;
  }

  function applyCardSkin(card, { index, smooth, hoverHit }) {
    const d = index - smooth;
    const centered = Math.exp(-(d * d) / SOFTNESS);
    const away = 1 - centered;
    const side = d === 0 ? 0 : Math.sign(d);
    const visible = Math.abs(d) < 2.8;

    card.visible = visible;
    if (!visible) return { visible, centered, away, distance: d };

    card.position.set(side * away * SIDE_PUSH, d * 0.04, -away * DEPTH_PUSH);
    card.scale.setScalar(1.24 - away * 0.3);
    card.rotation.x = -away * 0.02;
    card.rotation.y = -side * away * 0.58;
    card.rotation.z = side * away * 0.08;
    card.renderOrder = Math.round(1000 - Math.abs(d) * 50);
    card.traverse((object) => {
      object.renderOrder = card.renderOrder;
    });

    if (card.userData.shine?.material) {
      card.userData.shine.material.opacity = 0.055 + centered * 0.15 + (hoverHit === card.userData.hit ? 0.05 : 0);
    }
    if (card.userData.shadow?.material) {
      card.userData.shadow.material.opacity = 0.08 + centered * 0.24;
    }
    if (card.userData.side?.material?.color) {
      card.userData.side.material.color.setHSL(0.08, 0.36, 0.12 + centered * 0.05);
    }

    state.lastSmoothIndex = smooth;
    state.appliedFrameCount += 1;
    return { visible, centered, away, distance: d };
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ clampIndex, settleTarget, smoothTarget, applyCardSkin, snapshot });
}
