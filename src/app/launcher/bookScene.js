import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { experiences } from '../../ar/registry/experiences.js';
import { createBookSpreads } from './pageTextures.js';

const ASSET_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const MODEL_URL = `${ASSET_BASE}/assets/models/composition-notebook.glb`;

function fitModelToView(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const largest = Math.max(size.x, size.y, size.z) || 1;
  const scale = 6.2 / largest;

  object.position.sub(center);
  object.scale.setScalar(scale);
  object.rotation.set(0, 0, 0);
}

function applyToonStyle(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    const color = child.material?.color?.clone?.() ?? new THREE.Color('#d6b977');
    child.userData.originalMaterialName = child.material?.name ?? '';
    child.material = new THREE.MeshToonMaterial({
      color,
      map: child.material?.map ?? null,
      gradientMap: null
    });
    child.castShadow = false;
    child.receiveShadow = false;
  });
}

function isPageSurface(child) {
  return /Pages(Left|Right)_M_Paper|Page_M_Paper/i.test(child.name) ||
    /M_Paper/i.test(child.userData?.originalMaterialName ?? child.material?.name ?? '');
}

function isLeftPage(child) {
  return /PagesLeft/i.test(child.name) || /PagesLeft/i.test(child.parent?.name ?? '');
}

function isRightPage(child) {
  return /PagesRight/i.test(child.name) || /PagesRight/i.test(child.parent?.name ?? '');
}

function createProjectedPageMaterial(texture) {
  const material = new THREE.MeshToonMaterial({
    color: '#ffffff',
    map: texture,
    side: THREE.DoubleSide
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.paperWarmth = { value: new THREE.Color('#f3dfad') };
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\nuniform vec3 paperWarmth;'
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `
        #ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          diffuseColor *= sampledDiffuseColor;
        #endif
        diffuseColor.rgb = mix(paperWarmth, diffuseColor.rgb, 0.92);
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
        float paperBand = floor(gl_FragCoord.y * 0.04) * 0.0025;
        gl_FragColor.rgb *= 0.96 + paperBand;
        #include <dithering_fragment>
      `
    );
  };
  material.name = 'ProjectedLostPageMaterial';
  return material;
}

function setPageTexture(mesh, texture) {
  if (!mesh?.material) return;
  if (mesh.material.uniforms?.pageMap) {
    mesh.material.uniforms.pageMap.value = texture;
    return;
  }
  mesh.material.map = texture;
  mesh.material.needsUpdate = true;
}

function makeFallbackPagePlane(texture, x) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.55, 3.55, 12, 12),
    new THREE.MeshBasicMaterial({ map: texture, color: '#ffffff', side: THREE.DoubleSide })
  );
  mesh.position.set(x, 0.03, 0.66);
  mesh.rotation.set(-0.82, 0, x < 0 ? 0.045 : -0.045);
  return mesh;
}

function createFallbackNotebook() {
  const group = new THREE.Group();
  const coverMaterial = new THREE.MeshToonMaterial({ color: '#6c4d28' });
  const pageMaterial = new THREE.MeshToonMaterial({ color: '#e8d09b' });
  const cover = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.16, 4.2), coverMaterial);
  const left = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.05, 3.78), pageMaterial);
  const right = left.clone();
  left.position.set(-1.36, 0.09, 0);
  right.position.set(1.36, 0.1, 0);
  group.add(cover, left, right);
  fitModelToView(group);
  return group;
}

export function createBookScene(root, { origin }) {
  const mount = root?.querySelector?.('[data-book-scene]');
  if (!mount || typeof window === 'undefined') {
    return { dispose() {} };
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#000000');

  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 7, 2);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.className = 'book-scene__canvas';
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight('#ffffff', 1.5));

  const key = new THREE.DirectionalLight('#fff5de', 2.2);
  key.position.set(3, 5, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight('#7fa9ff', 1.1);
  rim.position.set(-4, 2, -2);
  scene.add(rim);

  const spreads = createBookSpreads(experiences, origin);
  let spreadIndex = 0;
  let pendingSpreadIndex = null;
  let pendingDirection = 0; // 1 forward, -1 backward
  const scrollSensitivity = 0.005;
  let disposed = false;
  let rafId = 0;
  let mixer = null;
  let pageAction = null;
  let pageClip = null;
  let animationTime = 0;
  let targetAnimationTime = 0;
  let leftPageSurface = null;
  let rightPageSurface = null;
  let animatedPageSurface = null;
  let fallbackLeftPage = null;
  let fallbackRightPage = null;
  let turnFromIndex = null;
  let animatedTextureKey = '';
  let visualSpreadIndex = null;

  const bookRoot = new THREE.Group();
  scene.add(bookRoot);

  function setAnimationTime(time) {
    if (!pageClip || !pageAction || !mixer) return;
    animationTime = Math.max(0, Math.min(pageClip.duration, time));
    targetAnimationTime = animationTime;
    pageAction.enabled = true;
    pageAction.paused = false;
    pageAction.play();
    pageAction.time = animationTime;
    mixer.setTime(animationTime);
  }

  function applySpread(index, force = false) {
    if (!force && visualSpreadIndex === index) return;
    visualSpreadIndex = index;
    const spread = spreads[index];
    setPageTexture(leftPageSurface, spread.leftTexture);
    setPageTexture(rightPageSurface, spread.rightTexture);
    setPageTexture(animatedPageSurface, spread.rightTexture);
    animatedTextureKey = '';
    if (fallbackLeftPage) fallbackLeftPage.material.map = spread.leftTexture;
    if (fallbackRightPage) fallbackRightPage.material.map = spread.rightTexture;
  }

  function setAnimatedPageTexture(texture, key, force = false) {
    if (!force && animatedTextureKey === key) return;
    animatedTextureKey = key;
    setPageTexture(animatedPageSurface, texture);
  }

  function applyTurnTextures() {
    if (turnFromIndex === null || pendingSpreadIndex === null || pendingDirection === 0) return;
    const halfway = pageClip ? pageClip.duration * 0.5 : 0.5;
    const showingTarget = pendingDirection > 0 ? animationTime >= halfway : animationTime <= halfway;
    applySpread(showingTarget ? pendingSpreadIndex : turnFromIndex);
    setAnimatedPageTexture(spreads[pendingSpreadIndex].turnTexture, `turning-paper-${pendingDirection}`, true);
  }

  function startPendingSpread(direction) {
    const nextIndex = Math.max(0, Math.min(spreads.length - 1, spreadIndex + direction));
    if (nextIndex === spreadIndex) return false;
    turnFromIndex = spreadIndex;
    pendingSpreadIndex = nextIndex;
    pendingDirection = direction;
    if (pageClip) {
      setAnimationTime(direction > 0 ? 0 : pageClip.duration);
    }
    applyTurnTextures();
    return true;
  }

  function completePendingSpread(completedDirection = pendingDirection) {
    if (pendingSpreadIndex === null) return;
    const finishedDirection = completedDirection || pendingDirection;
    spreadIndex = pendingSpreadIndex;
    pendingSpreadIndex = null;
    pendingDirection = 0;
    turnFromIndex = null;
    animatedTextureKey = '';
    applySpread(spreadIndex, true);
    if (pageClip) {
      setAnimationTime(finishedDirection > 0 ? 0 : pageClip.duration);
    }
  }

  function goToSpread(index) {
    const nextIndex = Math.max(0, Math.min(spreads.length - 1, index));
    if (nextIndex === spreadIndex) return spreadIndex;
    turnFromIndex = spreadIndex;
    pendingSpreadIndex = nextIndex;
    pendingDirection = nextIndex > spreadIndex ? 1 : -1;
    const duration = pageClip?.duration ?? 1;
    if (pageClip) {
      setAnimationTime(pendingDirection > 0 ? 0 : duration);
    }
    applyTurnTextures();
    targetAnimationTime = pendingDirection > 0 ? duration : 0;

    if (!pageClip) {
      completePendingSpread();
    }

    return nextIndex;
  }

  function nextSpread() {
    return goToSpread(spreadIndex + 1);
  }

  function previousSpread() {
    return goToSpread(spreadIndex - 1);
  }

  function advanceTurn(delta) {
    if (!pageClip || !pageAction) return;
    const remaining = delta * scrollSensitivity;
    if (Math.abs(remaining) <= 0) return;

    if (pendingSpreadIndex === null) {
      const direction = remaining > 0 ? 1 : -1;
      if (!startPendingSpread(direction)) return;
    }

    const target = pendingDirection > 0 ? pageClip.duration : 0;
    const distance = target - animationTime;
    const step = Math.sign(remaining) * Math.min(Math.abs(remaining), Math.abs(distance));
    if (Math.abs(step) <= 0) return;

    animationTime = Math.max(0, Math.min(pageClip.duration, animationTime + step));
    pageAction.time = animationTime;
    mixer.setTime(animationTime);
    targetAnimationTime = animationTime;
    applyTurnTextures();

    if (Math.abs(animationTime - target) < 1e-5) {
      completePendingSpread(pendingDirection);
    }
  }

  function onWheel(event) {
    const delta = event.deltaY;
    if (Math.abs(delta) < 6) return;
    event.preventDefault();

    if (!pageClip || !pageAction) {
      if (delta > 0) nextSpread();
      else previousSpread();
      return;
    }

    advanceTurn(delta);
  }

  function onPointer() {
    nextSpread();
  }

  function resize() {
    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate(time) {
    if (disposed) return;
    rafId = window.requestAnimationFrame(animate);
    if (mixer && pageAction && pageClip) {
      animationTime += (targetAnimationTime - animationTime) * 0.18;
      animationTime = Math.max(0, Math.min(pageClip.duration, animationTime));
      pageAction.time = animationTime;
      mixer.setTime(pageAction.time);
      applyTurnTextures();

      if (pendingSpreadIndex !== null) {
        const doneForward = pendingDirection > 0 && animationTime >= pageClip.duration - 0.01;
        const doneBackward = pendingDirection < 0 && animationTime <= 0.01;
        if (doneForward || doneBackward) {
          completePendingSpread(pendingDirection);
        }
      }
    }
    if (fallbackRightPage) {
      fallbackRightPage.rotation.y = -0.045 + (animationTime / Math.max(pageClip?.duration ?? 1, 1)) * -0.82;
    }
    bookRoot.rotation.set(0, 0, 0);
    renderer.render(scene, camera);
  }

  const loader = new GLTFLoader();
  loader.load(
    MODEL_URL,
    (gltf) => {
      if (disposed) return;
      applyToonStyle(gltf.scene);
      fitModelToView(gltf.scene);
      gltf.scene.traverse((child) => {
        if (!child.isMesh || !isPageSurface(child)) return;
        if (isLeftPage(child)) {
          leftPageSurface = child;
          child.material = createProjectedPageMaterial(spreads[0].leftTexture);
        } else if (isRightPage(child)) {
          rightPageSurface = child;
          child.material = createProjectedPageMaterial(spreads[0].rightTexture);
        } else {
          animatedPageSurface = child;
          child.material = createProjectedPageMaterial(spreads[0].rightTexture);
        }
      });
      if (gltf.animations?.[0]) {
        pageClip = gltf.animations[0];
        mixer = new THREE.AnimationMixer(gltf.scene);
        pageAction = mixer.clipAction(pageClip);
        pageAction.setLoop(THREE.LoopOnce, 1);
        pageAction.clampWhenFinished = true;
        pageAction.paused = false;
        pageAction.play();
      }
      bookRoot.add(gltf.scene);
      applySpread(0);
    },
    undefined,
    () => {
      if (disposed) return;
      bookRoot.add(createFallbackNotebook());
      fallbackLeftPage = makeFallbackPagePlane(spreads[0].leftTexture, -1.34);
      fallbackRightPage = makeFallbackPagePlane(spreads[0].rightTexture, 1.34);
      scene.add(fallbackLeftPage, fallbackRightPage);
    }
  );

  window.__lostPagesBookScene = {
    scene,
    camera,
    renderer,
    bookRoot,
    get leftPageSurface() { return leftPageSurface; },
    get rightPageSurface() { return rightPageSurface; },
    get animatedPageSurface() { return animatedPageSurface; },
    get mixer() { return mixer; },
    get pageAction() { return pageAction; },
    get pageClip() { return pageClip; },
    get animationTime() { return animationTime; },
    get spreadIndex() { return spreadIndex; }
  };

  const observer = new ResizeObserver(resize);
  observer.observe(mount);
  mount.addEventListener('wheel', onWheel, { passive: false });
  mount.addEventListener('click', onPointer);
  mount.addEventListener('touchend', onPointer);
  resize();
  animate(0);

  return {
    nextSpread,
    previousSpread,
    goToSpread,
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      mount.removeEventListener('wheel', onWheel);
      mount.removeEventListener('click', onPointer);
      mount.removeEventListener('touchend', onPointer);
      renderer.dispose();
      renderer.domElement.remove();
      spreads.forEach((spread) => {
        spread.leftTexture.dispose();
        spread.rightTexture.dispose();
      });
    }
  };
}

export const enhanceBookScene = createBookScene;
