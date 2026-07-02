import './landing.css';

function activeStep(runtimeState) {
  const experience = runtimeState.objective ?? runtimeState.experience ?? runtimeState;
  return experience.steps?.[experience.currentStepIndex] ?? experience.steps?.[0];
}
