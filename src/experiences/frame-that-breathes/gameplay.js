const GLYPHS = Object.freeze([
  Object.freeze({
    id: 'bridge',
    label: 'Bridge',
    order: 0,
    socket: Object.freeze({ x: 330, y: 178, width: 174, height: 56 }),
    edge: 'M 170 430 L 250 350 L 410 350'
  }),
  Object.freeze({
    id: 'step',
    label: 'Step',
    order: 1,
    socket: Object.freeze({ x: 190, y: 430, width: 150, height: 56 }),
    edge: 'M 170 430 L 250 350'
  }),
  Object.freeze({
    id: 'gate',
    label: 'Gate',
    order: 2,
    socket: Object.freeze({ x: 466, y: 350, width: 112, height: 190 }),
    edge: 'M 410 350 L 466 350 L 466 235'
  })
]);

export function createFrameThatBreathesGameplayDefinition() {
  const glyphIds = GLYPHS.map((glyph) => glyph.id);

  function initialPlan() {
    return [];
  }

  function nextNode(acceptedPlan) {
    return GLYPHS[acceptedPlan.length] ?? null;
  }

  function step(acceptedPlan, targetId) {
    const next = nextNode(acceptedPlan);
    if (!glyphIds.includes(targetId)) return { ok: false, reason: 'invalid_target' };
    if (acceptedPlan.includes(targetId)) return { ok: false, reason: 'already_applied' };
    if (!next || next.id !== targetId) return { ok: false, reason: 'invalid_order' };
    return { ok: true, acceptedPlan: [...acceptedPlan, targetId], node: next };
  }

  function undo(acceptedPlan) {
    if (!acceptedPlan.length) return { ok: false, reason: 'not_eligible' };
    return { ok: true, acceptedPlan: acceptedPlan.slice(0, -1) };
  }

  function isReady(acceptedPlan) {
    return acceptedPlan.length === glyphIds.length
      && acceptedPlan.every((id, index) => id === glyphIds[index]);
  }

  return Object.freeze({
    pageId: 'frame-that-breathes',
    pageNumber: '02',
    title: 'The Frame That Breathes',
    reward: Object.freeze({ id: 'breathing-frame-mark', label: 'Breathing Frame Mark', slot: 2 }),
    route: Object.freeze({
      id: 'frame-that-breathes-living-route',
      kind: 'living-frame',
      nodes: GLYPHS
    }),
    runnerRoute: Object.freeze({
      id: 'frame-that-breathes-platform-route',
      lengthTicks: 270,
      lengthUnits: 11,
      checkpointTick: 48,
      checkpointId: 'frame-approach',
      hazardTick: 120,
      hazardId: 'frame-gap',
      jumpDurationTicks: 54,
      jumpHeight: 1.2,
      clearance: 0.38,
      recoveryTicks: 60,
      bufferTicks: 9,
      coyoteTicks: 6
    }),
    player: Object.freeze({
      readyMessage: 'The breathing frame is ready.',
      startObjective: 'Build a living route through the frame.',
      placementObjective: 'Confirm the breathing frame on the gallery wall.',
      placementReadyMessage: 'The wall anchor is stable. Confirm when the frame is upright.',
      placementConfirmedMessage: 'Frame placed. Match Bridge, Step, then Gate.',
      planCommand: 'glyph.place',
      undoCommand: 'glyph.remove',
      planInstruction: 'Match the highlighted glyph socket',
      planTotal: 3,
      planUnit: 'glyphs',
      planReadyObjective: 'Bridge, Step, and Gate form a route. Lock it.',
      planReadyMessage: 'The living route is complete. Lock it.',
      planAcceptedEvent: 'frame.glyph-accepted',
      planUndoneEvent: 'frame.glyph-removed',
      planAcceptedMessage: ' matched its socket.',
      planUndoMessage: 'Last glyph removed. The route opened safely.',
      planTargetPrefix: 'Place',
      lockLabel: 'Lock Route',
      routeResetMessage: 'Route cleared. Match Bridge, Step, then Gate again.',
      replayStartMessage: 'Replay ready. Rebuild the living-frame route.',
      runObjective: 'JR runs automatically. Jump the bright frame gap.',
      runStartedMessage: 'Route locked. JR is running—Jump the bright frame gap.',
      runResumeMessage: 'JR is running again. Jump the frame gap.',
      checkpointObjective: 'JR is safe at the frame approach. Resume when ready.',
      checkpointMessage: 'Checkpoint: frame approach.',
      hazardClearedMessage: 'Frame gap cleared!',
      missMessage: 'Missed the frame gap. Rewinding to the checkpoint…',
      recoveryObjective: 'Rewinding JR to the frame approach…',
      recoveryMessage: 'Back at the frame approach. Resume when ready.',
      assistanceMessage: 'Help on: the frame-gap timing is wider.',
      finalCommand: 'portal.enter',
      finalLabel: 'Enter Portal',
      finalObjective: 'JR is grounded at the open frame. Enter the portal.',
      finalMessage: 'JR reached the open frame. Enter the portal.',
      finalCheckpointId: 'open-frame-landing',
      finalBeatId: 'open-frame',
      rewardObjective: 'Breathing Frame Mark · Journey slot 2 of 8',
      rewardSavedMessage: 'Breathing Frame Mark saved in journey slot 2.',
      continueLabel: 'Continue Journey',
      nextPageId: 'lost-childs-sketchbook',
      continueMessage: 'Page 03 is the next Lost Page.',
      replayLabel: 'Replay Page 02',
      replayPreparedMessage: 'Saved mark preserved. Ready a fresh attempt.',
      saveNoun: 'Breathing Frame Mark',
      rejections: Object.freeze({
        invalid_target: 'Choose Bridge, Step, or Gate.',
        invalid_order: 'Match Bridge first, then Step, then Gate.',
        already_applied: 'That glyph is already holding its socket.',
        route_incomplete: 'Match all three glyph sockets before locking the route.'
      })
    }),
    view: Object.freeze({
      placementLabel: 'THE\nBREATHING\nFRAME',
      checkpointLabel: 'Frame checkpoint',
      hazardLabel: 'Jump',
      goalLabel: 'Portal',
      goalSymbol: '◎',
      runnerAria: 'JR auto-runs along the built Bridge, Step, and Gate route toward the portal. Jump the bright frame gap.'
    }),
    initialPlan,
    nextNode,
    step,
    undo,
    isReady
  });
}
