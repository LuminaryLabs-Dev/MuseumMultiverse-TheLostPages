export function getSurfaceLabel(runtimeState) {
  if (!runtimeState.support.supported) {
    return 'Fallback surface preview';
  }

  if (runtimeState.placement.status === 'placed') {
    return 'Surface anchored';
  }

  if (runtimeState.placement.status === 'surface-found') {
    return 'Surface found';
  }

  return 'Scanning for surface';
}
