import * as THREE from 'three';

const FRAME_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormalView;

  void main() {
    vUv = uv;
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAME_FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec3 baseColor;
  uniform vec3 edgeColor;
  uniform vec3 lightColor;
  uniform float side;
  varying vec2 vUv;
  varying vec3 vNormalView;

  float edgeBand(vec2 uv) {
    float e = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    return 1.0 - smoothstep(0.0, 0.055, e);
  }

  float innerWell(vec2 uv) {
    vec2 centered = abs(uv - vec2(0.5));
    float well = step(centered.x, 0.36) * step(centered.y, 0.34);
    return well;
  }

  void main() {
    float edge = edgeBand(vUv);
    float well = innerWell(vUv);
    float ruled = step(0.965, fract((vUv.y + side * 0.07) * 18.0)) * 0.07;
    float gloss = smoothstep(0.18, 0.72, vUv.x + vUv.y * 0.26) * 0.16;
    float light = max(dot(normalize(vNormalView + vec3(0.18, 0.08, 1.0)), normalize(vec3(-0.25, 0.5, 0.82))), 0.0);
    vec3 color = mix(baseColor, edgeColor, edge * 0.72);
    color = mix(color, color * 0.72, well * 0.18);
    color += lightColor * (light * 0.16 + gloss);
    color -= ruled;
    gl_FragColor = vec4(color, 0.92);
  }
`;

function makeFrameMaterial(side) {
  return new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(0xf2dfb8) },
      edgeColor: { value: new THREE.Color(0x4b321d) },
      lightColor: { value: new THREE.Color(0xfff1c6) },
      side: { value: side }
    },
    vertexShader: FRAME_VERTEX_SHADER,
    fragmentShader: FRAME_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    depthTest: false
  });
}

function makeFrameMesh(side) {
  const geometry = new THREE.PlaneGeometry(1.05, 1.38, 18, 24);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;

  for (let index = 0; index < position.count; index += 1) {
    const u = uv.getX(index);
    const v = uv.getY(index);
    const edge = Math.min(u, 1 - u, v, 1 - v);
    const ridge = Math.max(0, 0.12 - edge) * 0.025;
    const pageCurl = Math.pow(Math.abs(u - 0.5), 2) * 0.018;
    position.setZ(index, ridge + pageCurl);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, makeFrameMaterial(side));
  mesh.position.x = side * 0.58;
  mesh.rotation.z = side * -0.018;
  return mesh;
}

export function enhancePageFrameSurface(root) {
  if (!root || typeof window === 'undefined') return () => {};
  const mount = root.querySelector('[data-page-frame-viewport]');
  if (!mount || mount.dataset.frameMounted === 'true') return () => {};

  mount.dataset.frameMounted = 'true';

  let renderer;
  let observer;
  let resizeHandler;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = 'booklet-reader__frame-canvas';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.add(makeFrameMesh(-1));
    group.add(makeFrameMesh(1));
    scene.add(group);

    function renderFrame() {
      const width = Math.max(1, mount.clientWidth || 1);
      const height = Math.max(1, mount.clientHeight || 1);
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      group.scale.set(Math.min(1.16, aspect * 0.86), 0.92, 1);
      renderer.render(scene, camera);
    }

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(renderFrame);
      observer.observe(mount);
    } else {
      resizeHandler = renderFrame;
      window.addEventListener('resize', resizeHandler, { passive: true });
    }

    renderFrame();

    return () => {
      observer?.disconnect();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        object.material?.dispose?.();
      });
      renderer?.dispose();
      renderer?.domElement?.remove();
      delete mount.dataset.frameMounted;
    };
  } catch {
    mount.dataset.frameFallback = 'true';
    renderer?.domElement?.remove();
    return () => {
      delete mount.dataset.frameMounted;
    };
  }
}

export function installPageFrameSurfaceObserver() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  const cleanups = new WeakMap();

  function mountAll() {
    document.querySelectorAll('[data-page-frame-viewport]').forEach((mount) => {
      const root = mount.closest('[data-booklet-reader]') ?? document;
      if (!cleanups.has(mount)) {
        cleanups.set(mount, enhancePageFrameSurface(root));
      }
    });
  }

  const observer = new MutationObserver(mountAll);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mountAll();

  return () => {
    observer.disconnect();
    document.querySelectorAll('[data-page-frame-viewport]').forEach((mount) => {
      cleanups.get(mount)?.();
    });
  };
}
