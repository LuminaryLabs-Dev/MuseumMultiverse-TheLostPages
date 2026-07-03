import * as THREE from 'three';

function drawWrapped(ctx, text, x, y, width, lineHeight, maxLines) {
  const words = String(text || '').split(' ');
  let line = '';
  let row = 0;
  words.forEach((word) => {
    if (row >= maxLines) return;
    const next = `${line} ${word}`.trim();
    if (ctx.measureText(next).width > width && line) {
      ctx.fillText(line, x, y + row * lineHeight);
      line = word;
      row += 1;
    } else {
      line = next;
    }
  });
  if (line && row < maxLines) ctx.fillText(line, x, y + row * lineHeight);
}

export function createPaperRendererService({ textureWidth = 768, textureHeight = 1088 } = {}) {
  const textureCache = new Map();
  const state = {
    textureWidth,
    textureHeight,
    textureCount: 0,
    createdCards: 0
  };

  function textureFor(page) {
    const key = page.slug ?? page.id ?? String(page.number ?? textureCache.size);
    if (textureCache.has(key)) return textureCache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#08070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gloss = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gloss.addColorStop(0, 'rgba(255,255,255,.18)');
    gloss.addColorStop(0.35, 'rgba(255,255,255,.025)');
    gloss.addColorStop(1, 'rgba(0,0,0,.5)');
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,.04)';
    for (let y = 38; y < canvas.height; y += 8) ctx.fillRect(0, y, canvas.width, 1);

    ctx.strokeStyle = '#f7efde';
    ctx.lineWidth = 18;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);
    ctx.lineWidth = 4;
    ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

    ctx.fillStyle = '#f7efde';
    ctx.font = '900 30px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`PAGE ${page.number}`, 84, 110);
    ctx.textAlign = 'right';
    ctx.fillText((page.collectible || 'AR').slice(0, 26), canvas.width - 84, 110);

    ctx.textAlign = 'left';
    ctx.font = '900 96px Georgia, serif';
    drawWrapped(ctx, page.title, 84, 242, canvas.width - 168, 86, 4);

    ctx.fillStyle = page.accent || '#56dfff';
    ctx.fillRect(88, 520, canvas.width - 176, 178);
    ctx.fillStyle = 'rgba(0,0,0,.32)';
    ctx.fillRect(118, 552, canvas.width - 236, 22);
    ctx.fillRect(118, 596, canvas.width - 292, 22);
    ctx.fillRect(118, 640, canvas.width - 332, 22);

    ctx.fillStyle = '#f7efde';
    ctx.font = '800 34px Arial, sans-serif';
    drawWrapped(ctx, page.prompt || page.description, 92, 760, canvas.width - 184, 43, 3);

    ctx.fillStyle = page.glow || '#fff2bd';
    ctx.fillRect(canvas.width - 236, canvas.height - 232, 156, 150);
    ctx.strokeStyle = '#f7efde';
    ctx.lineWidth = 7;
    ctx.strokeRect(canvas.width - 236, canvas.height - 232, 156, 150);
    ctx.fillStyle = '#100b07';
    ctx.font = '900 28px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LAUNCH', canvas.width - 158, canvas.height - 150);
    ctx.fillText('AR', canvas.width - 158, canvas.height - 112);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 2;
    textureCache.set(key, texture);
    state.textureCount = textureCache.size;
    return texture;
  }

  function createCard(page, index) {
    const group = new THREE.Group();
    group.userData.index = index;
    group.userData.slug = page.slug;
    group.userData.url = page.routeHref ?? page.route ?? `/ar/${page.slug}`;

    const side = new THREE.Mesh(
      new THREE.BoxGeometry(2.12, 2.9, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x30251d, roughness: 0.68, metalness: 0.04 })
    );
    side.position.z = -0.1;

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.42, 3.14),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false })
    );
    shadow.position.set(0.18, -0.2, -0.22);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.95, 2.72, 12, 16),
      new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: 0.48, metalness: 0.02 })
    );
    face.position.z = 0.02;

    const shine = new THREE.Mesh(
      new THREE.PlaneGeometry(1.95, 2.72),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false })
    );
    shine.position.z = 0.045;

    const hit = new THREE.Mesh(
      new THREE.PlaneGeometry(2.25, 3.05),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001, depthWrite: false })
    );
    hit.position.z = 0.08;
    hit.userData.url = group.userData.url;
    hit.userData.slug = page.slug;
    hit.userData.index = index;

    group.add(side, shadow, face, shine, hit);
    group.userData.hit = hit;
    group.userData.shine = shine;
    group.userData.shadow = shadow;
    group.userData.side = side;
    group.userData.face = face;
    state.createdCards += 1;
    return group;
  }

  function dispose() {
    textureCache.forEach((texture) => texture.dispose?.());
    textureCache.clear();
    state.textureCount = 0;
    return snapshot();
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ textureFor, createCard, dispose, snapshot });
}
