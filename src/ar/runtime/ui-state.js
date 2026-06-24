export function getRuntimeUiState(runtimeState) {
  if (!runtimeState.support.supported) {
    return {
      status: 'unsupported',
      message: 'This browser is using the desktop fallback preview. The same steps still run through NexusRealtime.'
    };
  }

  if (runtimeState.experience.status === 'complete') {
    return {
      status: 'complete',
      message: 'Experience complete.'
    };
  }

  return {
    status: runtimeState.experience.status,
    message: runtimeState.experience.steps[runtimeState.experience.currentStepIndex]?.instruction ?? ''
  };
}
