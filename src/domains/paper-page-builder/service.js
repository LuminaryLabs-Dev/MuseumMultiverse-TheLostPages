import * as THREE from 'three';
import QRCode from 'qrcode';
import { createPagePivotService } from '../page-pivot/service.js';
import { createPlaneMeshCreatorService } from '../plane-mesh-creator/service.js';
import sleepingGalleryReference from './sleeping-gallery-reference.png';

const REFERENCE_PAGE_SIZE = { width: 1023, height: 1537 };
const REFERENCE_QR_CENTER = { x: 510.5, y: 744 };
const IMAGE_ART_PAGES = new Set(['sleeping-gallery']);
const GENERATED_COMIC_PAGES = new Set(['frame-that-breathes', 'lost-childs-sketchbook']);

function drawWrapped(ctx, text, x, y, width, lineHeight, maxLines = 4) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  let line = '';
  let row = 0;

  for (const word of words) {
    if (row >= maxLines) return;
    const next = `${line} ${word}`.trim();
    if (ctx.measureText(next).width > width && line) {
      ctx.fillText(line, x, y + row * lineHeight);
      line = word;
      row += 1;
    } else {
      line = next;
    }
  }

  if (line && row < maxLines) ctx.fillText(line, x, y + row * lineHeight);
}

function shortText(text, maxWords = 12) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  if (words.length <= maxWords) return words.join(' ');
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function drawQr(ctx, url, x, y, size) {
  if (!url) {
    ctx.fillStyle = '#14100d';
    ctx.font = '900 34px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SET PUBLIC', x + size / 2, y + size / 2 - 18);
    ctx.fillText('ORIGIN', x + size / 2, y + size / 2 + 28);
    return;
  }

  const qr = QRCode.create(url, { errorCorrectionLevel: 'M', margin: 1 });
  const cells = qr.modules.size;
  const cell = size / cells;

  ctx.fillStyle = '#f8f0de';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#14100d';

  for (let row = 0; row < cells; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      if (qr.modules.get(row, col)) {
        ctx.fillRect(x + col * cell, y + row * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

function createImageTexture(source) {
  const texture = new THREE.TextureLoader().load(source);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 8;
  return texture;
}

function createQrTexture(page) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 8;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawQr(ctx, page.qrTarget || page.routeUrl || page.routeHref, 64, 64, 384);
  texture.needsUpdate = true;
  return texture;
}

function overlayPositionFor(origin, faceWidth, faceHeight, overlaySize) {
  const u = REFERENCE_QR_CENTER.x / REFERENCE_PAGE_SIZE.width;
  const v = 1 - REFERENCE_QR_CENTER.y / REFERENCE_PAGE_SIZE.height;
  if (origin === 'bottom-left') {
    return {
      x: u * faceWidth - overlaySize / 2,
      y: v * faceHeight - overlaySize / 2
    };
  }
  return {
    x: (u - 0.5) * faceWidth,
    y: (v - 0.5) * faceHeight
  };
}

function generatedOverlayPositionFor(origin, faceWidth, faceHeight, overlaySize) {
  if (origin === 'bottom-left') {
    return {
      x: faceWidth * 0.5 - overlaySize / 2,
      y: faceHeight * 0.5 - overlaySize / 2
    };
  }
  return { x: -overlaySize / 2, y: -overlaySize / 2 };
}

function drawHalftone(ctx, x, y, w, h, color = '#111111', spacing = 18, radius = 3, alpha = 0.22) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (let row = 0; row < h / spacing + 2; row += 1) {
    for (let col = 0; col < w / spacing + 2; col += 1) {
      const px = x + col * spacing + (row % 2) * spacing * 0.5;
      const py = y + row * spacing;
      const pulse = 0.7 + ((row + col) % 4) * 0.12;
      ctx.beginPath();
      ctx.arc(px, py, radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawCaption(ctx, text, x, y, w, h, fontSize = 28) {
  ctx.save();
  ctx.fillStyle = '#f6d99a';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#29231d';
  ctx.lineWidth = 5;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = '#2a251f';
  ctx.font = `900 ${fontSize}px "Arial Black", Impact, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  drawWrapped(ctx, text, x + 18, y + 16, w - 36, Math.round(fontSize * 1.18), 4);
  ctx.restore();
}

function drawSpeechBubble(ctx, text, x, y, w, h) {
  ctx.save();
  ctx.fillStyle = '#f8f1df';
  ctx.strokeStyle = '#3f3832';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.5, w * 0.48, h * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#272019';
  ctx.font = '900 30px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawWrapped(ctx, text, x + 22, y + h * 0.39, w - 44, 34, 3);
  ctx.restore();
}

function drawJr(ctx, x, y, scale, facing = 1, alarm = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * facing, scale);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#211814';
  ctx.lineWidth = 7;

  ctx.fillStyle = '#2a201c';
  ctx.beginPath();
  ctx.arc(0, -76, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  drawHalftone(ctx, -46, -122, 92, 92, '#0c0908', 13, 2.4, 0.22);

  ctx.fillStyle = '#8a5135';
  ctx.beginPath();
  ctx.arc(12, -44, 31, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#2b2420';
  ctx.beginPath();
  ctx.arc(25, -51, alarm ? 6 : 4, 0, Math.PI * 2);
  ctx.fill();

  if (alarm) {
    ctx.strokeStyle = '#2b2420';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(24, -34, 10, 0.1, Math.PI - 0.1);
    ctx.stroke();
  }

  ctx.strokeStyle = '#211814';
  ctx.lineWidth = 7;
  ctx.fillStyle = '#9d3d35';
  ctx.beginPath();
  ctx.roundRect?.(-24, -6, 52, 92, 8);
  if (!ctx.roundRect) ctx.rect(-24, -6, 52, 92);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#c64e3e';
  ctx.fillRect(-18, 2, 22, 72);
  ctx.fillStyle = '#233d51';
  ctx.fillRect(-66, 12, 42, 78);
  ctx.strokeRect(-66, 12, 42, 78);
  ctx.fillStyle = '#355b78';
  ctx.fillRect(-58, 27, 18, 35);
  ctx.fillStyle = '#d1b15d';
  ctx.beginPath();
  ctx.arc(-44, 42, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMaskArtifact(ctx, x, y, scale, color = '#d0aa63') {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.strokeStyle = '#2b241d';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 58, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,231,142,0.72)';
  ctx.beginPath();
  ctx.ellipse(-13, -17, 13, 22, -0.4, 0, Math.PI * 2);
  ctx.fill();
  drawHalftone(ctx, -40, -56, 80, 112, '#3b2613', 12, 1.8, 0.18);
  ctx.strokeStyle = 'rgba(43,36,29,0.72)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-20, -7);
  ctx.bezierCurveTo(-4, -26, 20, -24, 22, -4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-13, 12, 5, 0, Math.PI * 2);
  ctx.arc(15, 10, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawDinoSkull(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(-0.16);
  ctx.fillStyle = '#c0aa82';
  ctx.strokeStyle = '#2b241d';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(0, 0, 92, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e6d0a1';
  ctx.beginPath();
  ctx.ellipse(-21, -13, 40, 15, -0.15, 0, Math.PI * 2);
  ctx.fill();
  drawHalftone(ctx, -88, -44, 178, 88, '#5a4228', 14, 2.1, 0.18);
  ctx.fillStyle = '#332a22';
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(-38 + i * 24, -7, 10, 14, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = '#2b241d';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(50, 14);
  ctx.lineTo(118, 42);
  ctx.lineTo(34, 38);
  ctx.stroke();
  ctx.restore();
}

function drawColumns(ctx, x, y, w, h) {
  ctx.save();
  for (let i = 0; i < 4; i += 1) {
    const px = x + w * (0.14 + i * 0.22);
    const columnGradient = ctx.createLinearGradient(px, y, px + w * 0.055, y);
    columnGradient.addColorStop(0, '#625e55');
    columnGradient.addColorStop(0.5, '#b9ad91');
    columnGradient.addColorStop(1, '#565249');
    ctx.fillStyle = columnGradient;
    ctx.fillRect(px, y + h * 0.18, w * 0.055, h * 0.7);
    ctx.strokeStyle = '#2b261f';
    ctx.lineWidth = 6;
    ctx.strokeRect(px, y + h * 0.18, w * 0.055, h * 0.7);
    ctx.fillStyle = '#3f3b34';
    ctx.fillRect(px - 12, y + h * 0.14, w * 0.055 + 24, 18);
    ctx.fillRect(px - 16, y + h * 0.88, w * 0.055 + 32, 18);
  }
  ctx.restore();
}

function drawStarburst(ctx, cx, cy, radius, color = '#ffe56e', lines = 22) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 7;
  for (let i = 0; i < lines; i += 1) {
    const a = (Math.PI * 2 * i) / lines;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShadowTendrils(ctx, x, y, w, h, count = 8) {
  ctx.save();
  ctx.strokeStyle = 'rgba(9, 8, 13, 0.88)';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i += 1) {
    const sy = y + (h * (i + 0.5)) / count;
    ctx.beginPath();
    ctx.moveTo(x + w, sy);
    ctx.bezierCurveTo(x + w * 0.7, sy - 60, x + w * 0.62, sy + 90, x + w * 0.28, sy + 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPanelBase(ctx, box, colors, dark = false) {
  const grad = ctx.createLinearGradient(box.x, box.y, box.x, box.y + box.h);
  colors.forEach((color, index) => grad.addColorStop(index / Math.max(1, colors.length - 1), color));
  ctx.fillStyle = grad;
  ctx.fillRect(box.x, box.y, box.w, box.h);
  drawHalftone(ctx, box.x, box.y, box.w, box.h, dark ? '#050509' : '#1b1713', dark ? 19 : 17, dark ? 2.8 : 2.4, dark ? 0.2 : 0.16);
  ctx.strokeStyle = '#15120f';
  ctx.lineWidth = 9;
  ctx.strokeRect(box.x, box.y, box.w, box.h);
}

function drawPageTwoPanel(ctx, index, box, page) {
  const accent = page.accent || '#7ec6b8';
  const glow = page.glow || '#ccfff4';
  const palettes = [
    ['#b7aa8c', '#7c827d', '#424743'],
    ['#8a908b', '#626d70', '#33383c'],
    ['#3b3444', '#7b5633', '#d7a84c'],
    ['#215e9a', '#27a5c2', '#ffb43d', '#e74746']
  ];
  drawPanelBase(ctx, box, palettes[index] || palettes[0]);
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.w, box.h);
  ctx.clip();

  if (index === 0) {
    drawColumns(ctx, box.x + box.w * 0.12, box.y + box.h * 0.06, box.w * 0.8, box.h * 0.82);
    drawJr(ctx, box.x + box.w * 0.24, box.y + box.h * 0.78, Math.min(box.w, box.h) / 285, 1);
    drawSpeechBubble(ctx, 'This place is changing...', box.x + box.w * 0.56, box.y + box.h * 0.45, box.w * 0.36, box.h * 0.18);
  } else if (index === 1) {
    drawColumns(ctx, box.x + box.w * 0.08, box.y + box.h * 0.05, box.w * 0.65, box.h * 0.78);
    drawDinoSkull(ctx, box.x + box.w * 0.78, box.y + box.h * 0.25, Math.min(box.w, box.h) / 365);
    drawMaskArtifact(ctx, box.x + box.w * 0.74, box.y + box.h * 0.62, Math.min(box.w, box.h) / 360, '#bfb091');
    drawJr(ctx, box.x + box.w * 0.4, box.y + box.h * 0.78, Math.min(box.w, box.h) / 310, -1);
  } else if (index === 2) {
    drawStarburst(ctx, box.x + box.w * 0.6, box.y + box.h * 0.48, box.w * 0.58, 'rgba(255,232,116,0.72)', 18);
    drawJr(ctx, box.x + box.w * 0.22, box.y + box.h * 0.78, Math.min(box.w, box.h) / 230, 1);
    drawMaskArtifact(ctx, box.x + box.w * 0.68, box.y + box.h * 0.5, Math.min(box.w, box.h) / 225, '#c99643');
  } else {
    const cx = box.x + box.w * 0.5;
    const cy = box.y + box.h * 0.42;
    drawStarburst(ctx, cx, cy, box.w * 0.9, 'rgba(255,244,160,0.75)', 24);
    drawJr(ctx, box.x + box.w * 0.42, box.y + box.h * 0.78, Math.min(box.w, box.h) / 300, 1);
    drawDinoSkull(ctx, box.x + box.w * 0.74, box.y + box.h * 0.32, Math.min(box.w, box.h) / 430);
    drawMaskArtifact(ctx, box.x + box.w * 0.25, box.y + box.h * 0.35, Math.min(box.w, box.h) / 320, '#e1bd64');
  }

  ctx.restore();
  const text = Array.isArray(page.panels) ? page.panels[index] : page.description;
  drawCaption(ctx, shortText(text, 12), box.x + 26, box.y + 24, box.w * (index === 3 ? 0.42 : 0.48), box.h * 0.18, index === 3 ? 23 : 25);
}

function drawPageThreePanel(ctx, index, box, page) {
  const palettes = [
    ['#3b4250', '#191b25', '#0b0b12'],
    ['#202733', '#1b1720', '#08070c'],
    ['#1c2430', '#313644', '#0d0d14'],
    ['#15161d', '#222538', '#06060b']
  ];
  drawPanelBase(ctx, box, palettes[index] || palettes[0], true);
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.w, box.h);
  ctx.clip();
  drawColumns(ctx, box.x + box.w * 0.05, box.y + box.h * 0.06, box.w * 0.72, box.h * 0.82);

  if (index === 0) {
    drawDinoSkull(ctx, box.x + box.w * 0.72, box.y + box.h * 0.24, Math.min(box.w, box.h) / 390);
    drawMaskArtifact(ctx, box.x + box.w * 0.65, box.y + box.h * 0.64, Math.min(box.w, box.h) / 360, '#c49e4f');
    drawJr(ctx, box.x + box.w * 0.25, box.y + box.h * 0.8, Math.min(box.w, box.h) / 265, 1, false);
  } else if (index === 1) {
    drawShadowTendrils(ctx, box.x + box.w * 0.15, box.y, box.w * 0.9, box.h, 7);
    drawJr(ctx, box.x + box.w * 0.34, box.y + box.h * 0.78, Math.min(box.w, box.h) / 280, -1, true);
    drawSpeechBubble(ctx, 'Huh?', box.x + box.w * 0.18, box.y + box.h * 0.25, box.w * 0.26, box.h * 0.13);
  } else if (index === 2) {
    drawJr(ctx, box.x + box.w * 0.34, box.y + box.h * 0.8, Math.min(box.w, box.h) / 220, 1, true);
    drawSpeechBubble(ctx, 'Hello?', box.x + box.w * 0.56, box.y + box.h * 0.48, box.w * 0.3, box.h * 0.13);
  } else {
    drawShadowTendrils(ctx, box.x + box.w * 0.05, box.y, box.w, box.h, 10);
    drawJr(ctx, box.x + box.w * 0.46, box.y + box.h * 0.78, Math.min(box.w, box.h) / 290, 1, true);
    drawMaskArtifact(ctx, box.x + box.w * 0.72, box.y + box.h * 0.62, Math.min(box.w, box.h) / 345, '#b78b42');
    drawSpeechBubble(ctx, "I'm the only one here... right?", box.x + box.w * 0.5, box.y + box.h * 0.28, box.w * 0.42, box.h * 0.16);
  }

  ctx.restore();
  const fallback = ['For a while, the wonder was enough.', 'But wonder has shadows.', 'Every time he looked, nothing was there.', 'Every time he turned away, it came closer.'];
  const text = Array.isArray(page.panels) ? page.panels[index] : fallback[index];
  drawCaption(ctx, shortText(text || fallback[index], 10), box.x + 24, box.y + 24, box.w * (index === 3 ? 0.5 : 0.48), box.h * 0.17, index === 3 ? 22 : 24);
}

function drawCenterBurst(ctx, x, y, size, accent, glow) {
  const radius = size * 0.5;
  const cx = x + radius;
  const cy = y + radius;
  ctx.save();
  ctx.translate(cx, cy);
  const halo = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius);
  halo.addColorStop(0, 'rgba(255,255,255,0.3)');
  halo.addColorStop(0.48, glow || 'rgba(255,229,110,0.66)');
  halo.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f8f0de';
  ctx.lineWidth = Math.max(20, size * 0.08);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#15120f';
  ctx.lineWidth = Math.max(6, size * 0.024);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawGeneratedComicPage(ctx, page, canvas) {
  const w = canvas.width;
  const h = canvas.height;
  const accent = page.accent || '#7ec6b8';
  const glow = page.glow || '#ccfff4';
  const isDark = page.slug === 'lost-childs-sketchbook';

  ctx.fillStyle = '#010101';
  ctx.fillRect(0, 0, w, h);

  const pageH = Math.round(h * 0.88);
  const pageW = Math.round(pageH * 0.67);
  const pageX = Math.round((w - pageW) / 2);
  const pageY = Math.round(h * 0.04);
  const pad = Math.round(pageW * 0.038);
  const gutter = Math.round(pageW * 0.018);

  ctx.fillStyle = '#211f2e';
  ctx.fillRect(pageX + 46, pageY - 48, pageW + 104, pageH + 88);
  ctx.fillStyle = '#eee9d7';
  ctx.fillRect(pageX, pageY, pageW, pageH);
  ctx.strokeStyle = '#0f0f10';
  ctx.lineWidth = 14;
  ctx.strokeRect(pageX, pageY, pageW, pageH);
  ctx.strokeStyle = '#b8ad94';
  ctx.lineWidth = 6;
  ctx.strokeRect(pageX + 18, pageY + 18, pageW - 36, pageH - 36);

  const innerX = pageX + pad;
  const innerY = pageY + pad;
  const innerW = pageW - pad * 2;
  const innerH = pageH - pad * 2;
  const colW = Math.round((innerW - gutter) / 2);
  const topH = Math.round(innerH * 0.49);
  const bottomH = innerH - topH - gutter;
  const boxes = [
    { x: innerX, y: innerY, w: colW, h: topH },
    { x: innerX + colW + gutter, y: innerY, w: colW, h: topH },
    { x: innerX, y: innerY + topH + gutter, w: colW, h: bottomH },
    { x: innerX + colW + gutter, y: innerY + topH + gutter, w: colW, h: bottomH }
  ];

  boxes.forEach((box, index) => {
    if (isDark) drawPageThreePanel(ctx, index, box, page);
    else drawPageTwoPanel(ctx, index, box, page);
  });

  const qrOuter = Math.round(pageW * 0.36);
  const qrX = Math.round(pageX + pageW / 2 - qrOuter / 2);
  const qrY = Math.round(pageY + pageH * 0.5 - qrOuter * 0.34);
  drawCenterBurst(ctx, qrX - 42, qrY - 42, qrOuter + 84, accent, glow);

  ctx.fillStyle = '#f9f3e5';
  ctx.beginPath();
  ctx.arc(qrX + qrOuter / 2, qrY + qrOuter / 2, qrOuter * 0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f9f3e5';
  ctx.lineWidth = 28;
  ctx.stroke();
  ctx.strokeStyle = '#161411';
  ctx.lineWidth = 8;
  ctx.stroke();
}

function createGeneratedComicTexture(page, textureWidth, textureHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = textureWidth;
  canvas.height = textureHeight;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 8;
  drawGeneratedComicPage(ctx, page, canvas);
  texture.needsUpdate = true;
  return texture;
}

function createFallbackTexture(page, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 8;
  ctx.fillStyle = '#f4ead0';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 28;
  ctx.strokeRect(42, 42, width - 84, height - 84);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 96px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(page.title || 'Lost Page', width / 2, height * 0.38);
  ctx.font = '700 44px Courier New, monospace';
  ctx.fillText(`PAGE ${page.number || ''}`, width / 2, height * 0.5);
  texture.needsUpdate = true;
  return texture;
}

export function createPaperPageBuilderService({
  textureWidth = 1536,
  textureHeight = 2176,
  faceWidth = 1.95,
  faceHeight = 2.72,
  cardWidth = 2.42,
  cardHeight = 3.14,
  segmentsX = 10,
  segmentsY = 10,
  origin = 'bottom-left',
  planeMeshCreator = null,
  pagePivot = null
} = {}) {
  const textureCache = new Map();
  const localPlaneMeshCreator = planeMeshCreator ?? createPlaneMeshCreatorService();
  const localPagePivot = pagePivot ?? createPagePivotService({ anchor: origin, pivot: 'center' });
  const ownsPlaneMeshCreator = !planeMeshCreator;
  const state = { textureWidth, textureHeight, origin, createdTextures: 0, createdCards: 0, loaded: false, loadedPageCount: 0 };
  let loadedCards = [];

  function plane(options) {
    return localPlaneMeshCreator.getPlane({ origin, ...options });
  }

  function textureFor(page) {
    const key = page.slug ?? page.id ?? String(page.number ?? textureCache.size);
    if (textureCache.has(key)) return textureCache.get(key);

    let texture;
    if (page.slug === 'sleeping-gallery') {
      texture = createImageTexture(sleepingGalleryReference);
    } else if (GENERATED_COMIC_PAGES.has(page.slug)) {
      texture = createGeneratedComicTexture(page, textureWidth, textureHeight);
    } else {
      texture = createFallbackTexture(page, textureWidth, textureHeight);
    }

    textureCache.set(key, texture);
    state.createdTextures = textureCache.size;
    return texture;
  }

  function createCard(page, index) {
    const group = new THREE.Group();
    group.userData.index = index;
    group.userData.slug = page.slug;
    group.userData.url = page.routeHref ?? page.route ?? `/ar/${page.slug}`;
    group.userData.origin = origin;

    const side = new THREE.Mesh(
      plane({ width: 2.12, height: 2.9, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshStandardMaterial({ color: 0x30251d, roughness: 0.68, metalness: 0.04 })
    );
    side.position.z = -0.1;

    const shadow = new THREE.Mesh(
      plane({ width: cardWidth, height: cardHeight, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false })
    );
    shadow.position.set(0.18, -0.2, -0.22);

    const isFlatComic = IMAGE_ART_PAGES.has(page.slug) || GENERATED_COMIC_PAGES.has(page.slug);
    const face = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX, segmentsY }),
      isFlatComic
        ? new THREE.MeshBasicMaterial({ map: textureFor(page), transparent: true })
        : new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: 0.5, metalness: 0.01 })
    );
    face.position.z = 0.02;
    face.userData.paperGrid = { segmentsX, segmentsY, origin };

    const qrOverlaySize = isFlatComic ? faceWidth * 0.28 : 0;
    const qrOverlayPosition = qrOverlaySize
      ? (page.slug === 'sleeping-gallery'
        ? overlayPositionFor(origin, faceWidth, faceHeight, qrOverlaySize)
        : generatedOverlayPositionFor(origin, faceWidth, faceHeight, qrOverlaySize))
      : null;
    const qrOverlay = qrOverlaySize ? new THREE.Mesh(
      plane({ width: qrOverlaySize, height: qrOverlaySize, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ map: createQrTexture(page), transparent: true, depthWrite: false })
    ) : null;
    if (qrOverlay) qrOverlay.position.set(qrOverlayPosition.x, qrOverlayPosition.y, 0.066);

    const shine = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, depthWrite: false })
    );
    shine.position.z = 0.045;

    const hit = new THREE.Mesh(
      plane({ width: 2.25, height: 3.05, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001, depthWrite: false })
    );
    hit.position.z = 0.08;
    hit.userData.url = group.userData.url;
    hit.userData.slug = page.slug;
    hit.userData.index = index;

    const pivot = localPagePivot.wrap({
      children: [side, shadow, face, shine, ...(qrOverlay ? [qrOverlay] : []), hit],
      width: cardWidth,
      height: cardHeight,
      name: `page-${page.slug ?? index}-pivot`
    });
    group.add(pivot.pivotGroup);
    group.userData.pivot = pivot.pivotGroup;
    group.userData.visual = pivot.visualGroup;
    group.userData.pagePivot = { anchor: pivot.anchor, pivot: pivot.pivot, pivotOffset: pivot.pivotOffset, visualOffset: pivot.visualOffset };
    group.userData.hit = hit;
    group.userData.shine = shine;
    group.userData.shadow = shadow;
    group.userData.side = side;
    group.userData.face = face;
    group.userData.qrOverlay = qrOverlay;
    state.createdCards += 1;
    return group;
  }

  function loadPages(pages = []) {
    if (state.loaded) return loadedCards;
    loadedCards = pages.map((page, index) => createCard(page, index));
    state.loaded = true;
    state.loadedPageCount = loadedCards.length;
    return loadedCards;
  }

  function getCards() {
    return loadedCards;
  }

  function dispose() {
    textureCache.forEach((texture) => texture.dispose?.());
    textureCache.clear();
    loadedCards = [];
    state.createdTextures = 0;
    state.loaded = false;
    state.loadedPageCount = 0;
    if (ownsPlaneMeshCreator) localPlaneMeshCreator.dispose?.();
    return snapshot();
  }

  function snapshot() {
    return { ...state, pagePivot: localPagePivot.snapshot?.(), planeMeshCreator: localPlaneMeshCreator.snapshot?.() };
  }

  return Object.freeze({ textureFor, createCard, loadPages, getCards, dispose, snapshot });
}
