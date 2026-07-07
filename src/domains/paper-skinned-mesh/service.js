export function createPaperSkinnedMeshService({ skin = 'lost-pages-stable-rail' } = {}) {
  const state = {
    skin,
    lastSmoothIndex: 0,
    appliedFrameCount: 0
  };

  function setMaterialOpacity(object, opacity) {
    if (!object?.material || typeof object.material.opacity !== 'number') return;
    object.material.transparent = opacity < 0.999 || object.material.transparent === true;
    object.material.opacity = opacity;
    object.material.needsUpdate = true;
  }

  function applyCardSkin(card, descriptor = {}) {
    const visible = descriptor.visible !== false;
    const focus = Number(descriptor.focus ?? 0);
    const away = Number(descriptor.away ?? 1 - focus);
    const position = descriptor.railPosition ?? { x: 0, y: 0, z: 0 };
    const rotation = descriptor.railRotation ?? { x: 0, y: 0, z: 0 };
    const scale = Number(descriptor.railScale ?? 1);
    const pivot = card.userData.pivot ?? card;
    const opacity = Math.max(0, Math.min(1, Number(descriptor.opacity ?? 1)));
    const glowIntensity = Math.max(0, Number(descriptor.glowIntensity ?? focus));
    const shineIntensity = Math.max(0, Number(descriptor.shineIntensity ?? 0.055 + focus * 0.15));
    const shadowIntensity = Math.max(0, Number(descriptor.shadowIntensity ?? 0.08 + focus * 0.24));

    card.visible = visible && opacity > 0.01;
    if (!card.visible) return { visible: false, focus, away };

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
      card.userData.shine.material.opacity = Math.min(0.82, shineIntensity + (descriptor.hovered ? 0.05 : 0));
    }
    if (card.userData.shadow?.material) {
      card.userData.shadow.material.opacity = Math.min(0.62, shadowIntensity);
    }
    if (card.userData.edgeGlow) {
      const edgeOpacity = Math.min(0.72, 0.08 + glowIntensity * 0.42 + (descriptor.hovered ? 0.06 : 0));
      card.userData.edgeGlow.visible = true;
      if (card.userData.edgeGlow.material) {
        card.userData.edgeGlow.material.opacity = edgeOpacity;
      }
      card.userData.edgeGlow.children?.forEach?.((edge) => {
        if (edge.material) edge.material.opacity = edgeOpacity;
      });
    }
    if (card.userData.side?.material?.color) {
      card.userData.side.material.color.setHSL(0.08, 0.36, 0.1 + focus * 0.07);
    }
    if (card.userData.hit) {
      card.userData.hit.visible = focus > 0.62 && !descriptor.outgoing;
    }

    setMaterialOpacity(card.userData.face, opacity);
    if (card.userData.side) setMaterialOpacity(card.userData.side, Math.min(1, 0.82 + opacity * 0.18));

    state.lastSmoothIndex = Number(descriptor.smoothIndex ?? state.lastSmoothIndex);
    state.appliedFrameCount += 1;
    return { visible, focus, away };
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ applyCardSkin, snapshot });
}
