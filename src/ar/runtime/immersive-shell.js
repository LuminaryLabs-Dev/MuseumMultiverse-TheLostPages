function activeStep(runtimeState) {
  const experience = runtimeState.objective ?? runtimeState.experience ?? runtimeState;
  return experience.steps?.[experience.currentStepIndex] ?? experience.steps?.[0];
}

function progressLabel(step) {
  if (!step) return '';
  return `${step.progress ?? 0}/${step.target ?? 1}`;
}

function renderHotspots(manifest, step) {
  const action = step?.requiredAction ?? 'tap';
  const objects = manifest.level?.sceneRecipe?.objects ?? [];
  const targets = objects.filter((object) => object.interaction?.action === action);
  const count = Math.max(1, targets.length || step?.target || 1);

  return Array.from({ length: count }, (_, index) => {
    const target = targets[index] ?? {};
    const transform = target.transform ?? {};
    const x = 50 + Number(transform.x ?? 0) * 18;
    const y = 52 - Number(transform.y ?? 0) * 14 + Number(transform.z ?? 0) * 9;
    return `
      <button
        class="immersive-ar__hotspot immersive-ar__hotspot--${target.visual?.shape ?? target.archetype ?? 'target'}"
        data-ar-action="${action}"
        data-target-id="${target.id ?? ''}"
        style="--x:${Math.max(8, Math.min(92, x))}%;--y:${Math.max(12, Math.min(88, y))}%;--delay:${index * 70}ms;--color:${target.visual?.color ?? 'var(--accent)'}"
        aria-label="${target.id ?? step?.label ?? 'AR target'}"
      ></button>
    `;
  }).join('');
}

export function renderImmersiveGate(experience, runtimeState = {}) {
  const selected = runtimeState.selectedMode ?? runtimeState.support ?? {};
  return `
    <section class="immersive-gate" style="--accent:${experience.accent};--deep:${experience.deep};--glow:${experience.glow}">
      <div class="immersive-gate__mark">${experience.number}</div>
      <h1>${experience.title}</h1>
      <p>${experience.prompt}</p>
      <button class="immersive-gate__start" data-start-ar>Start AR</button>
      <small>${selected.mode ?? selected.deviceClass ?? 'Detecting AR mode'} · camera permission required</small>
    </section>
  `;
}

export function renderImmersiveExperience({ manifest, state }) {
  const experience = state.objective ?? state.experience ?? state;
  const step = activeStep(state);
  const status = experience.status ?? 'intro';
  const placed = state.placement?.status === 'placed';
  const showPlace = state.selectedMode?.mode === 'webxr-plane' && !placed;

  return `
    <section class="immersive-ar" style="--accent:${manifest.accent};--deep:${manifest.deep};--glow:${manifest.glow}" data-mode="${state.selectedMode?.mode ?? 'detecting'}" data-status="${status}">
      <video class="immersive-ar__camera" data-ar-camera autoplay muted playsinline></video>
      <div class="immersive-ar__veil"></div>
      <div class="immersive-ar__reticle ${placed ? 'is-placed' : ''}"></div>
      <div class="immersive-ar__object immersive-ar__object--${manifest.slug}">
        <div class="immersive-ar__artifact">${manifest.collectible}</div>
        ${showPlace ? '<button class="immersive-ar__place" data-ar-place>Tap to place</button>' : renderHotspots(manifest, step)}
      </div>
      <div class="immersive-ar__hud">
        <strong>${step?.label ?? manifest.completeText}</strong>
        <span>${step?.instruction ?? manifest.prompt}</span>
        <small>${progressLabel(step)} · ${state.selectedMode?.mode ?? 'fallback-preview'}</small>
      </div>
      ${experience.completed ? `<div class="immersive-ar__complete">${manifest.completeText}</div>` : ''}
    </section>
  `;
}
