import * as THREE from 'three';

const PAPER_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vSurfaceNormal;

  void main() {
    vUv = uv;
    vSurfaceNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PAPER_FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D paperAlbedoMap;
  uniform sampler2D paperNormalMap;
  uniform sampler2D paperHeightMap;
  uniform vec2 paperUvScale;
  uniform vec3 paperAmbient;
  uniform vec3 paperLight;
  uniform vec3 paperLightDirection;

  varying vec2 vUv;
  varying vec3 vSurfaceNormal;

  void main() {
    vec2 uv = vUv * paperUvScale;
    vec3 albedo = texture2D(paperAlbedoMap, uv).rgb;
    vec3 normalMap = texture2D(paperNormalMap, uv).xyz * 2.0 - 1.0;
    normalMap.xy *= 0.62;

    vec3 normal = normalize(vSurfaceNormal + normalMap * 0.74);
    vec3 lightDirection = normalize(paperLightDirection);
    float diffuse = max(dot(normal, lightDirection), 0.0);

    float height = texture2D(paperHeightMap, uv).r;
    float fiberShade = mix(0.84, 1.12, height);
    float grazingShade = pow(1.0 - max(normal.z, 0.0), 2.0) * 0.07;

    vec3 color = albedo * (paperAmbient + paperLight * diffuse * 0.34) * fiberShade;
    color -= grazingShade;
    color = pow(max(color, vec3(0.0)), vec3(0.94));

    gl_FragColor = vec4(color, 1.0);
  }
`;

let cachedPaperMaps = null;

function fract(value) {
  return value - Math.floor(value);
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function fade(value) {
  return value * value * (3 - 2 * value);
}

function hash2(x, y, seed = 0) {
  return fract(Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123);
}

function valueNoise(x, y, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fade(fx);
  const uy = fade(fy);

  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  const x1 = a + (b - a) * ux;
  const x2 = c + (d - c) * ux;
  return x1 + (x2 - x1) * uy;
}

function fbm(x, y, octaves = 6, seed = 0) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let normalizer = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    value += valueNoise(x * frequency, y * frequency, seed + octave * 13.37) * amplitude;
    normalizer += amplitude;
    frequency *= 2.03;
    amplitude *= 0.5;
  }

  return normalizer ? value / normalizer : 0;
}

function chooseTextureSize() {
  const memory = Number(navigator.deviceMemory || 8);
  return memory <= 4 ? 256 : 512;
}

function makeDataTexture(data, size, colorSpace = null) {
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  if (colorSpace) texture.colorSpace = colorSpace;
  texture.needsUpdate = true;
  return texture;
}

function sampleHeight(heightField, size, x, y) {
  const wrappedX = (x + size) % size;
  const wrappedY = (y + size) % size;
  return heightField[wrappedY * size + wrappedX];
}

function buildCachedPaperMaps() {
  if (cachedPaperMaps) return cachedPaperMaps;
  if (typeof window !== 'undefined' && window.__lostPagesPaperMaps) {
    cachedPaperMaps = window.__lostPagesPaperMaps;
    return cachedPaperMaps;
  }

  const size = chooseTextureSize();
  const heightField = new Float32Array(size * size);
  const albedo = new Uint8Array(size * size * 4);
  const normal = new Uint8Array(size * size * 4);
  const height = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = x / size;
      const ny = y / size;
      const cloud = fbm(nx * 4.4, ny * 3.7, 7, 4);
      const broadPulp = fbm(nx * 9.0 + 11.0, ny * 8.0, 5, 18);
      const longFiber = fbm(nx * 58.0, ny * 8.5 + cloud * 1.6, 4, 31);
      const crossFiber = fbm(nx * 14.0 + 2.0, ny * 46.0, 4, 57);
      const fineGrain = valueNoise(nx * 230.0, ny * 230.0, 77);
      const sheetDepth =
        0.44 +
        (cloud - 0.5) * 0.4 +
        (broadPulp - 0.5) * 0.25 +
        (longFiber - 0.5) * 0.14 +
        (crossFiber - 0.5) * 0.1 +
        (fineGrain - 0.5) * 0.045;
      heightField[y * size + x] = clamp01(sheetDepth);
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const out = index * 4;
      const h = sampleHeight(heightField, size, x, y);
      const hx = sampleHeight(heightField, size, x + 1, y) - sampleHeight(heightField, size, x - 1, y);
      const hy = sampleHeight(heightField, size, x, y + 1) - sampleHeight(heightField, size, x, y - 1);
      const normalStrength = 4.5;
      const nx = -hx * normalStrength;
      const ny = -hy * normalStrength;
      const nz = 1;
      const length = Math.hypot(nx, ny, nz) || 1;
      const normalizedX = nx / length;
      const normalizedY = ny / length;
      const normalizedZ = nz / length;
      const fiber = fbm((x / size) * 80.0, (y / size) * 11.0, 3, 93);
      const speck = valueNoise((x / size) * 340.0, (y / size) * 340.0, 121);
      const warmth = clamp01(0.58 + (h - 0.5) * 0.5 + (fiber - 0.5) * 0.16 + (speck - 0.5) * 0.05);

      albedo[out] = Math.round(44 + warmth * 46);
      albedo[out + 1] = Math.round(32 + warmth * 34);
      albedo[out + 2] = Math.round(20 + warmth * 22);
      albedo[out + 3] = 255;

      normal[out] = Math.round((normalizedX * 0.5 + 0.5) * 255);
      normal[out + 1] = Math.round((normalizedY * 0.5 + 0.5) * 255);
      normal[out + 2] = Math.round((normalizedZ * 0.5 + 0.5) * 255);
      normal[out + 3] = 255;

      const depth = Math.round(h * 255);
      height[out] = depth;
      height[out + 1] = depth;
      height[out + 2] = depth;
      height[out + 3] = 255;
    }
  }

  cachedPaperMaps = {
    size,
    heightField,
    albedoMap: makeDataTexture(albedo, size, THREE.SRGBColorSpace),
    normalMap: makeDataTexture(normal, size),
    heightMap: makeDataTexture(height, size)
  };

  if (typeof window !== 'undefined') {
    window.__lostPagesPaperMaps = cachedPaperMaps;
  }

  return cachedPaperMaps;
}

function buildPaperGeometry(maps) {
  const segments = maps.size <= 256 ? 56 : 80;
  const geometry = new THREE.PlaneGeometry(2, 2, segments, segments);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;

  for (let index = 0; index < position.count; index += 1) {
    const u = uv.getX(index);
    const v = uv.getY(index);
    const x = Math.min(maps.size - 1, Math.max(0, Math.round(u * (maps.size - 1))));
    const y = Math.min(maps.size - 1, Math.max(0, Math.round(v * (maps.size - 1))));
    const depth = maps.heightField[y * maps.size + x] - 0.5;
    position.setZ(index, depth * 0.052);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export function enhancePaperSurface(root) {
  if (!root || typeof window === 'undefined') {
    return () => {};
  }

  const mount = root.querySelector('[data-paper-viewport]');
  if (!mount) {
    return () => {};
  }

  let renderer;
  let observer;
  let resizeHandler;

  try {
    const maps = buildCachedPaperMaps();
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = 'clean-comic-launcher__paper-canvas';
    mount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        paperAlbedoMap: { value: maps.albedoMap },
        paperNormalMap: { value: maps.normalMap },
        paperHeightMap: { value: maps.heightMap },
        paperUvScale: { value: new THREE.Vector2(2.5, 2.1) },
        paperAmbient: { value: new THREE.Color(0.68, 0.62, 0.54) },
        paperLight: { value: new THREE.Color(0.68, 0.56, 0.42) },
        paperLightDirection: { value: new THREE.Vector3(-0.32, 0.58, 0.75) }
      },
      vertexShader: PAPER_VERTEX_SHADER,
      fragmentShader: PAPER_FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false
    });

    const paper = new THREE.Mesh(buildPaperGeometry(maps), material);
    scene.add(paper);

    function renderSurface() {
      const width = Math.max(1, mount.clientWidth || window.innerWidth || 1);
      const height = Math.max(1, mount.clientHeight || window.innerHeight || 1);
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      paper.scale.set(aspect * 1.28, 1.28, 1);
      material.uniforms.paperUvScale.value.set(Math.max(2.2, aspect * 2.85), 2.28);
      renderer.render(scene, camera);
    }

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(renderSurface);
      observer.observe(mount);
    } else {
      resizeHandler = renderSurface;
      window.addEventListener('resize', resizeHandler, { passive: true });
    }

    renderSurface();

    return () => {
      observer?.disconnect();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      paper.geometry.dispose();
      material.dispose();
      renderer?.dispose();
      renderer?.domElement?.remove();
    };
  } catch {
    mount.setAttribute('data-paper-fallback', 'true');
    renderer?.domElement?.remove();
    return () => {};
  }
}
