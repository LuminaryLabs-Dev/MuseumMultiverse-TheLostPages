import { installPortalLandingObserver } from '../landing/portalLandingBoot.js';
import { installPageFrameSurfaceObserver } from '../launcher/pageFrameSurface.js';
import { installFocusCoverSplash } from './focusCoverSplash.js';

const isEmbedded = window.self !== window.top || new URLSearchParams(window.location.search).has('embed');

if (!isEmbedded) {
  installPortalLandingObserver();
  installPageFrameSurfaceObserver();
  installFocusCoverSplash();
}
