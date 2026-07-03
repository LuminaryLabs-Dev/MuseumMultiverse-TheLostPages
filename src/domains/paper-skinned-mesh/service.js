export function createPaperSkinnedMeshService({ skin = 'lost-pages-stable-rail' } = {}) {
  const state = {
    skin,
    lastSmoothIndex: 0,
    appliedFrameCount: 0
  };

  function applyCardSkin(card, descriptor = {}) {
    const visible = descriptor.visible !== false;
    const focus = Number(descriptor.focus ?? 0);
    const away = Number(descriptor.away ?? 1 - focus);
    const position = descriptor.railPosition ?? { x: 0, y: 0, z: 0 };
    const rotation = descriptor.railRotation ?? { x: 0, y: 0, z: 0 };
    const scale = Number(descriptor.railScale ?? 1);
    const pivot = card.userData.pivot ?? card;

    card.visible = visible;
    if (!visible) return { visible, focus, away };

    card.position.set(position.x, position.y, position.z);
    card.rotation.set(0, 0, 0);
    card.scale.setScalar(1);

    pivot.scale.setScalar(scale);
    pivot.rotation.x = rotation.x;
    pivot.rotation.y = rotation.y;
    pivot.rotation.z = rotation.z;

    card.renderOrder = Number(descriptor.renderOrder ?? 0);
    card.traverse((object) => {
      object.renderOrder = card.renderOrder;
    });

    if (card.userData.shine?.material) {
      card.userData.shine.material.opacity = 0.055 + focus * 0.15 + (descriptor.hovered ? 0.05 : 0);
    }
    if (card.userData.shadow?.material) {
      card.userData.shadow.material.opacity = 0.08 + focus * 0.24;
    }
    if (card.userData.side?.material?.color) {
      card.userData.side.material.color.setHSL(0.08, 0.36, 0.12 + focus * 0.05);
    }

    state.lastSmoothIndex = Number(descriptor.smoothIndex ?? state.lastSmoothIndex);
    state.appliedFrameCount += 1;
    return { visible, focus, away };
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ applyCardSkin, snapshot });
}
