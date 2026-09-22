function copy(value) {
  return value == null ? value : structuredClone(value);
}

function rejectionMessage(page, reason) {
  const messages = {
    wrong_phase: 'That action is not available yet.',
    not_eligible: 'Finish the current step first.',
    unsafe: 'JR is moving. Jump is the only available action.',
    invalid_target: 'Choose a highlighted route point.',
    invalid_order: 'Trace the next highlighted point in order.',
    stale_revision: 'The scene changed. Try the current action again.',
    already_applied: 'That action was already applied.',
    already_buffered: 'One Jump is already queued.',
    route_incomplete: 'Trace every highlighted point before locking the route.',
    save_unavailable: `${page.player.saveNoun} could not be saved yet. Retry Save.`
  };
  return page.player.rejections?.[reason] ?? messages[reason] ?? 'That action could not be applied.';
}

function createInitialState(page, sessionId, existingReceipt = null) {
  return {
    schemaVersion: 1,
    sessionId,
    pageId: page.pageId,
    pageNumber: page.pageNumber,
    title: page.title,
    revision: 0,
    appliedCommandIds: [],
    phase: 'start',
    mode: null,
    resumePhase: null,
    placementValid: false,
    acceptedPlan: page.initialPlan(),
    routeLocked: false,
    checkpoint: {
      id: 'origin',
      beatId: 'route-start',
      primaryPhase: 'start',
      tick: 0,
      extensionState: {}
    },
    missesByBeat: {},
    assistanceEnabled: false,
    completion: {
      status: existingReceipt ? 'saved-before-attempt' : 'idle',
      receipt: copy(existingReceipt),
      error: null
    },
    feedback: {
      tone: 'ready',
      message: page.player.readyMessage
    },
    mastery: []
  };
}

function objectiveFor(state, page, runner) {
  if (state.mode === 'paused') return { eyebrow: 'Paused safely', text: 'Resume from the exact same point.' };
  if (state.mode === 'recovering') return { eyebrow: 'Local recovery', text: page.player.recoveryObjective };
  if (state.phase === 'start') return { eyebrow: `Page ${page.pageNumber}`, text: page.player.startObjective };
  if (state.phase === 'placement') return { eyebrow: 'Place', text: page.player.placementObjective };
  if (state.phase === 'plan') {
    if (page.isReady(state.acceptedPlan)) return { eyebrow: 'Plan', text: page.player.planReadyObjective };
    const completed = state.acceptedPlan.length - (page.route.kind === 'character-map' ? 1 : 0);
    return {
      eyebrow: 'Plan',
      text: `${page.player.planInstruction} · ${Math.max(0, completed)}/${page.player.planTotal} ${page.player.planUnit}`
    };
  }
  if (state.phase === 'run') return { eyebrow: 'Run', text: page.player.runObjective };
  if (state.phase === 'safeStop' && runner.status === 'final-stop') {
    return { eyebrow: 'Finish', text: page.player.finalObjective };
  }
  if (state.phase === 'safeStop') return { eyebrow: 'Checkpoint', text: page.player.checkpointObjective };
  if (state.phase === 'complete') return { eyebrow: 'Save', text: `Save ${page.player.saveNoun} before showing the reward.` };
  if (state.phase === 'reward') return { eyebrow: 'Reward saved', text: page.player.rewardObjective };
  if (state.phase === 'replay') return { eyebrow: 'Replay', text: `The saved ${page.player.saveNoun} stays safe during a fresh run.` };
  return { eyebrow: `Page ${page.pageNumber}`, text: `Continue ${page.title}.` };
}

function heroFor(state, page, runner) {
  if (state.mode === 'recovering') {
    return { id: 'recovery', label: 'Rewinding…', command: null, disabled: true };
  }
  if (state.mode === 'paused') {
    return { id: 'resume-session', label: 'Resume', command: 'session.resume', disabled: false };
  }
  if (state.phase === 'start') return { id: 'start', label: 'Start', command: 'session.start', disabled: false };
  if (state.phase === 'placement') {
    return { id: 'confirm-placement', label: 'Confirm Placement', command: 'placement.confirm', disabled: false };
  }
  if (state.phase === 'plan') {
    const next = page.nextNode(state.acceptedPlan);
    if (next) {
      return {
        id: 'plan-target',
        label: next.id === page.player.planFinalTargetId
          ? page.player.planFinalTargetLabel
          : `${page.player.planTargetPrefix} ${next.label}`,
        command: page.player.planCommand,
        targetId: next.id,
        disabled: false
      };
    }
    return { id: 'lock-route', label: page.player.lockLabel, command: 'route.lock', disabled: false };
  }
  if (state.phase === 'run') return { id: 'jump', label: 'Jump', command: 'jump.press', disabled: false };
  if (state.phase === 'safeStop' && runner.status === 'final-stop') {
    return { id: 'finish', label: page.player.finalLabel, command: page.player.finalCommand, disabled: false };
  }
  if (state.phase === 'safeStop') return { id: 'resume-run', label: 'Resume Run', command: 'run.resume', disabled: false };
  if (state.phase === 'complete') {
    return { id: 'retry-save', label: 'Retry Save', command: 'save.retry', disabled: state.completion.status !== 'error' };
  }
  if (state.phase === 'reward') {
    return { id: 'continue', label: page.player.continueLabel, command: 'journey.continue', disabled: false };
  }
  if (state.phase === 'replay') return { id: 'start-replay', label: 'Start Replay', command: 'replay.start', disabled: false };
  return { id: 'unavailable', label: 'Unavailable', command: null, disabled: true };
}

export function createLostPagesGameplayService({
  autoRunner,
  journeyProgress,
  page,
  sessionId = 'page-01-simulator-session'
} = {}) {
  if (!autoRunner?.snapshot || !journeyProgress?.snapshot || !page?.pageId || !page?.player) {
    throw new TypeError('Lost Pages Gameplay requires Auto Runner, Journey Progress, and one page definition.');
  }

  let state = createInitialState(page, sessionId, journeyProgress.getReceipt(page.pageId));

  function snapshot() {
    const runner = autoRunner.snapshot();
    return copy({
      ...state,
      objective: objectiveFor(state, page, runner),
      hero: heroFor(state, page, runner),
      runner,
      journey: journeyProgress.snapshot(),
      route: page.route,
      reward: page.reward,
      player: page.player,
      view: page.view,
      helpAvailable: (state.missesByBeat[page.runnerRoute.hazardId] ?? 0) >= 3 && !state.assistanceEnabled
    });
  }

  function commandResult(accepted, reason, events = [], message = null) {
    return {
      accepted,
      reason,
      revision: state.revision,
      phase: state.phase,
      events: copy(events),
      message: message ?? (accepted ? state.feedback.message : rejectionMessage(page, reason))
    };
  }

  function reject(reason) {
    return commandResult(false, reason, [{ type: 'command.rejected', reason }]);
  }

  function accept(command, mutate, events = []) {
    mutate?.();
    state = {
      ...state,
      revision: state.revision + 1,
      appliedCommandIds: [...state.appliedCommandIds, command.commandId].slice(-128)
    };
    return commandResult(true, 'accepted', events);
  }

  function checkpointRecord(id, beatId = id, primaryPhase = state.phase) {
    const runner = autoRunner.snapshot();
    return {
      id,
      beatId,
      primaryPhase,
      tick: runner.tick,
      extensionState: { routeLocked: state.routeLocked }
    };
  }

  function saveCheckpoint() {
    return journeyProgress.saveCheckpoint({
      pageId: page.pageId,
      acceptedPlan: state.acceptedPlan,
      checkpoint: state.checkpoint,
      assistance: {
        missesByBeat: state.missesByBeat,
        enabledHelp: state.assistanceEnabled ? [page.runnerRoute.hazardId] : []
      },
      mastery: state.mastery
    });
  }

  function persistCompletion(completionRevision) {
    return journeyProgress.commitCompletion({
      pageId: page.pageId,
      acceptedPlan: state.acceptedPlan,
      checkpoint: checkpointRecord(page.player.finalCheckpointId, page.player.finalBeatId),
      assistance: {
        missesByBeat: state.missesByBeat,
        enabledHelp: state.assistanceEnabled ? [page.runnerRoute.hazardId] : []
      },
      mastery: state.mastery,
      completionRevision
    });
  }

  function dispatch(command = {}) {
    if (!command.commandId || command.sessionId !== state.sessionId || command.pageId !== state.pageId) {
      return reject('invalid_target');
    }
    if (state.appliedCommandIds.includes(command.commandId)) return reject('already_applied');
    if (command.expectedRevision !== state.revision) return reject('stale_revision');
    if (state.mode === 'paused' && command.name !== 'session.resume') return reject('wrong_phase');

    if (command.name === 'session.start') {
      if (state.phase !== 'start') return reject('wrong_phase');
      return accept(command, () => {
        state = {
          ...state,
          phase: 'placement',
          feedback: { tone: 'ready', message: page.player.placementReadyMessage }
        };
      }, [{ type: 'session.started' }]);
    }

    if (command.name === 'placement.confirm') {
      if (state.phase !== 'placement') return reject('wrong_phase');
      return accept(command, () => {
        state = {
          ...state,
          phase: 'plan',
          placementValid: true,
          checkpoint: { ...state.checkpoint, id: 'placement', primaryPhase: 'plan' },
          feedback: { tone: 'accepted', message: page.player.placementConfirmedMessage }
        };
      }, [{ type: 'placement.confirmed' }, { type: 'plan.ready' }]);
    }

    if (command.name === page.player.planCommand) {
      if (state.phase !== 'plan') return reject(state.phase === 'run' ? 'unsafe' : 'wrong_phase');
      const stepped = page.step(state.acceptedPlan, command.targetId);
      if (!stepped.ok) return reject(stepped.reason);
      return accept(command, () => {
        state = {
          ...state,
          acceptedPlan: stepped.acceptedPlan,
          feedback: {
            tone: 'accepted',
            message: page.isReady(stepped.acceptedPlan)
              ? page.player.planReadyMessage
              : `${stepped.node.label}${page.player.planAcceptedMessage}`
          }
        };
      }, [{ type: page.player.planAcceptedEvent, targetId: stepped.node.id }]);
    }

    if (command.name === page.player.undoCommand) {
      if (state.phase !== 'plan') return reject('wrong_phase');
      const undone = page.undo(state.acceptedPlan);
      if (!undone.ok) return reject(undone.reason);
      return accept(command, () => {
        state = {
          ...state,
          acceptedPlan: undone.acceptedPlan,
          feedback: { tone: 'accepted', message: page.player.planUndoMessage }
        };
      }, [{ type: page.player.planUndoneEvent }]);
    }

    if (command.name === 'route.lock') {
      if (state.phase !== 'plan') return reject('wrong_phase');
      if (!page.isReady(state.acceptedPlan)) return reject('route_incomplete');
      autoRunner.reset(page.runnerRoute);
      const started = autoRunner.start();
      if (!started.accepted) return reject(started.reason);
      return accept(command, () => {
        state = {
          ...state,
          phase: 'run',
          routeLocked: true,
          checkpoint: checkpointRecord('route-start', 'route-start', 'run'),
          feedback: { tone: 'run', message: page.player.runStartedMessage }
        };
      }, [{ type: 'route.locked' }, ...started.events]);
    }

    if (command.name === 'jump.press') {
      if (state.phase !== 'run' || state.mode) return reject('wrong_phase');
      const jumped = autoRunner.jump();
      if (!jumped.accepted) return reject(jumped.reason);
      return accept(command, () => {
        state = {
          ...state,
          feedback: {
            tone: 'jump',
            message: jumped.events[0]?.type === 'jump.buffered' ? 'Jump queued.' : 'Jump!'
          }
        };
      }, jumped.events);
    }

    if (command.name === 'run.resume') {
      if (state.phase !== 'safeStop') return reject('wrong_phase');
      const resumed = autoRunner.resume();
      if (!resumed.accepted) return reject(resumed.reason);
      return accept(command, () => {
        state = {
          ...state,
          phase: 'run',
          feedback: { tone: 'run', message: page.player.runResumeMessage }
        };
      }, resumed.events);
    }

    if (command.name === 'assistance.enable') {
      if (state.phase !== 'safeStop' || (state.missesByBeat[page.runnerRoute.hazardId] ?? 0) < 3) return reject('not_eligible');
      const assisted = autoRunner.enableAssistance();
      return accept(command, () => {
        state = {
          ...state,
          assistanceEnabled: true,
          feedback: { tone: 'help', message: page.player.assistanceMessage }
        };
      }, assisted.events);
    }

    if (command.name === page.player.finalCommand) {
      const runner = autoRunner.snapshot();
      if (state.phase !== 'safeStop' || runner.status !== 'final-stop' || !runner.grounded) return reject('not_eligible');
      const completionRevision = state.revision + 1;
      const saved = persistCompletion(completionRevision);
      return accept(command, () => {
        state = saved.ok
          ? {
              ...state,
              phase: 'reward',
              checkpoint: checkpointRecord(page.player.finalCheckpointId, page.player.finalBeatId),
              completion: { status: 'saved', receipt: saved.receipt, error: null },
              feedback: { tone: 'reward', message: page.player.rewardSavedMessage }
            }
          : {
              ...state,
              phase: 'complete',
              completion: { status: 'error', receipt: null, error: saved.reason },
              feedback: { tone: 'error', message: `Save failed. ${page.player.saveNoun} is held—Retry Save.` }
            };
      }, saved.ok
        ? [{ type: saved.existing ? 'completion.existing' : 'completion.saved', receipt: saved.receipt }, { type: 'reward.presented' }]
        : [{ type: 'save.failed', reason: saved.reason }]);
    }

    if (command.name === 'save.retry') {
      if (state.phase !== 'complete' || state.completion.status !== 'error') return reject('wrong_phase');
      const saved = persistCompletion(state.revision + 1);
      return accept(command, () => {
        state = saved.ok
          ? {
              ...state,
              phase: 'reward',
              completion: { status: 'saved', receipt: saved.receipt, error: null },
              feedback: { tone: 'reward', message: page.player.rewardSavedMessage }
            }
          : {
              ...state,
              completion: { ...state.completion, error: saved.reason },
              feedback: { tone: 'error', message: 'Save is still unavailable. Try again.' }
            };
      }, saved.ok ? [{ type: 'completion.saved', receipt: saved.receipt }, { type: 'reward.presented' }] : [{ type: 'save.failed' }]);
    }

    if (command.name === 'session.pause') {
      if (!['plan', 'run', 'safeStop'].includes(state.phase) || state.mode) return reject('wrong_phase');
      if (['run', 'safeStop'].includes(state.phase)) {
        const paused = autoRunner.pause();
        if (!paused.accepted) return reject(paused.reason);
      }
      return accept(command, () => {
        state = {
          ...state,
          mode: 'paused',
          resumePhase: state.phase,
          feedback: { tone: 'paused', message: 'Paused at the exact gameplay tick.' }
        };
      }, [{ type: 'session.paused', tick: autoRunner.snapshot().tick }]);
    }

    if (command.name === 'session.resume') {
      if (state.mode !== 'paused' || !state.resumePhase) return reject('wrong_phase');
      if (autoRunner.snapshot().status === 'paused') {
        const resumed = autoRunner.resumePaused();
        if (!resumed.accepted) return reject(resumed.reason);
      }
      return accept(command, () => {
        state = {
          ...state,
          phase: state.resumePhase,
          mode: null,
          resumePhase: null,
          feedback: { tone: 'ready', message: 'Resumed from the same point.' }
        };
      }, [{ type: 'session.resumed', tick: autoRunner.snapshot().tick }]);
    }

    if (command.name === 'route.reset') {
      if (!state.placementValid || state.mode === 'recovering' || state.phase === 'complete') return reject('wrong_phase');
      autoRunner.reset(page.runnerRoute);
      return accept(command, () => {
        state = {
          ...state,
          phase: 'plan',
          mode: null,
          resumePhase: null,
          acceptedPlan: page.initialPlan(),
          routeLocked: false,
          checkpoint: { id: 'placement', beatId: 'placement', primaryPhase: 'plan', tick: 0, extensionState: {} },
          missesByBeat: {},
          assistanceEnabled: false,
          feedback: { tone: 'ready', message: page.player.routeResetMessage },
          mastery: []
        };
      }, [{ type: 'route.reset' }]);
    }

    if (command.name === 'replay.prepare') {
      if (state.phase !== 'reward') return reject('wrong_phase');
      return accept(command, () => {
        state = { ...state, phase: 'replay', feedback: { tone: 'ready', message: page.player.replayPreparedMessage } };
      }, [{ type: 'replay.prepared' }]);
    }

    if (command.name === 'replay.start') {
      if (state.phase !== 'replay') return reject('wrong_phase');
      autoRunner.reset(page.runnerRoute);
      return accept(command, () => {
        state = {
          ...state,
          phase: 'plan',
          mode: null,
          resumePhase: null,
          acceptedPlan: page.initialPlan(),
          routeLocked: false,
          checkpoint: { id: 'placement', beatId: 'placement', primaryPhase: 'plan', tick: 0, extensionState: {} },
          missesByBeat: {},
          assistanceEnabled: false,
          feedback: { tone: 'ready', message: page.player.replayStartMessage },
          mastery: []
        };
      }, [{ type: 'replay.started' }]);
    }

    if (command.name === 'journey.continue') {
      if (state.phase !== 'reward') return reject('wrong_phase');
      return accept(command, () => {
        state = { ...state, feedback: { tone: 'reward', message: page.player.continueMessage } };
      }, [{ type: 'journey.continue', nextPageId: page.player.nextPageId }]);
    }

    return reject('invalid_target');
  }

  function tick(count = 1) {
    if (state.mode === 'paused' || (!['run'].includes(state.phase) && state.mode !== 'recovering')) {
      return { accepted: true, reason: 'accepted', events: [], state: snapshot() };
    }
    const stepped = autoRunner.tick(count);
    const events = [...stepped.events];
    for (const event of stepped.events) {
      if (event.type === 'checkpoint.reached') {
        state = {
          ...state,
          checkpoint: checkpointRecord(event.id, page.runnerRoute.hazardId, 'safeStop'),
          feedback: { tone: 'checkpoint', message: page.player.checkpointMessage }
        };
        const saved = saveCheckpoint();
        events.push({ type: saved.ok ? 'checkpoint.saved' : 'save.failed', reason: saved.reason });
      }
      if (event.type === 'jump.buffered') {
        state = { ...state, feedback: { tone: 'jump', message: 'Jump queued for landing.' } };
      }
      if (event.type === 'landed') {
        state = { ...state, feedback: { tone: 'landed', message: 'JR landed safely.' } };
      }
      if (event.type === 'hazard.cleared') {
        state = { ...state, feedback: { tone: 'accepted', message: page.player.hazardClearedMessage } };
      }
      if (event.type === 'run.missed') {
        const misses = (state.missesByBeat[event.id] ?? 0) + 1;
        state = {
          ...state,
          mode: 'recovering',
          resumePhase: 'run',
          missesByBeat: { ...state.missesByBeat, [event.id]: misses },
          feedback: { tone: 'recovery', message: page.player.missMessage },
          mastery: [...state.mastery, { type: 'run.missed', beatId: event.id, tick: event.tick }].slice(-50)
        };
      }
      if (event.type === 'recovery.complete') {
        state = {
          ...state,
          phase: 'safeStop',
          mode: null,
          resumePhase: null,
          checkpoint: checkpointRecord(page.runnerRoute.checkpointId, page.runnerRoute.hazardId),
          feedback: { tone: 'checkpoint', message: page.player.recoveryMessage }
        };
        const saved = saveCheckpoint();
        events.push({ type: saved.ok ? 'checkpoint.saved' : 'save.failed', reason: saved.reason });
      }
      if (event.type === 'run.final-stop') {
        state = {
          ...state,
          phase: 'safeStop',
          checkpoint: checkpointRecord(page.player.finalCheckpointId, page.player.finalBeatId, 'safeStop'),
          feedback: { tone: 'complete', message: page.player.finalMessage },
          mastery: [...state.mastery, { type: 'run.complete', tick: event.tick }].slice(-50)
        };
      }
    }
    return { accepted: true, reason: 'accepted', events: copy(events), state: snapshot() };
  }

  function loadSnapshot(candidate) {
    if (!candidate || candidate.pageId !== page.pageId || !candidate.runner) {
      throw new TypeError('Lost Pages Gameplay snapshot is invalid.');
    }
    const { objective, hero, runner, journey, route, reward, player, view, helpAvailable, ...rest } = copy(candidate);
    autoRunner.loadSnapshot(runner);
    state = rest;
    return snapshot();
  }

  return Object.freeze({ dispatch, tick, loadSnapshot, snapshot });
}
