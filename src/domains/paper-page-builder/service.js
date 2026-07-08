import * as THREE from 'three';
import QRCode from 'qrcode';
import { createPagePivotService } from '../page-pivot/service.js';
import { createPlaneMeshCreatorService } from '../plane-mesh-creator/service.js';
import sleepingGalleryReference from './sleeping-gallery-reference.png';

const SLEEPING_GALLERY_REFERENCE_SIZE = { width: 1023, height: 1537 };
const SLEEPING_GALLERY_QR_CENTER = { x: 510.5, y: 744 };

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

function shortText(text, maxWords = 12) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  if (words.length <= maxWords) return words.join(' ');
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function createSleepingGalleryReferenceTexture() {
  const texture = new THREE.TextureLoader().load(sleepingGalleryReference);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  return texture;
}

function createSleepingGalleryQrTexture(page) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawQr(ctx, page.qrTarget || page.routeUrl || page.routeHref, 64, 64, 384);
  texture.needsUpdate = true;
  return texture;
}

function overlayPositionFor(origin, faceWidth, faceHeight, overlaySize) {
  const u = SLEEPING_GALLERY_QR_CENTER.x / SLEEPING_GALLERY_REFERENCE_SIZE.width;
  const v = 1 - SLEEPING_GALLERY_QR_CENTER.y / SLEEPING_GALLERY_REFERENCE_SIZE.height;
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

function drawPanelFrame(ctx, x, y, w, h, fill, stroke = '#17110d') {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 8;
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 8, y + 8, Math.max(0, w - 16), Math.max(0, h - 16));
}

function drawCaptionStrip(ctx, text, x, y, w, h, fontSize, ink = '#17110d') {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = ink;
  ctx.font = `800 ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'left';
  drawWrapped(ctx, text, x + 18, y + Math.round(h * 0.56), w - 36, Math.round(fontSize * 1.12), 3);
}

function drawKidFigure(ctx, x, y, scale, ink, accent) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#3a2a22';
  ctx.beginPath();
  ctx.arc(0, -62, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = ink;
  ctx.fillRect(-14, -16, 28, 76);
  ctx.fillRect(-34, 0, 20, 60);
  ctx.fillRect(14, 0, 20, 60);
  ctx.fillStyle = accent;
  ctx.fillRect(-6, 12, 12, 34);
  ctx.fillRect(-34, 58, 20, 14);
  ctx.fillRect(14, 58, 20, 14);
  ctx.restore();
}

function drawMuseumHall(ctx, x, y, w, h, ink, accent, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(17, 17, 18, 0.08)';
  for (let i = 0; i < 4; i += 1) {
    ctx.fillRect(26, 30 + i * 36, w - 52, 6);
  }
  ctx.strokeStyle = 'rgba(23, 17, 13, 0.72)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.56, Math.min(w, h) * 0.25, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.fillRect(w * 0.22, h * 0.56, w * 0.56, 14);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.18, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawColorBurst(ctx, x, y, w, h, accent, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  const cx = w * 0.56;
  const cy = h * 0.44;
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * w * 0.32, cy + Math.sin(angle) * h * 0.32);
    ctx.stroke();
  }
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCenterBurst(ctx, x, y, size, accent, glow) {
  const radius = size * 0.5;
  const cx = x + radius;
  const cy = y + radius;

  ctx.save();
  ctx.translate(cx, cy);

  const halo = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius);
  halo.addColorStop(0, 'rgba(255,255,255,0.24)');
  halo.addColorStop(0.5, glow);
  halo.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.96, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(6, size * 0.032);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.62, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(23,17,13,0.22)';
  ctx.lineWidth = Math.max(4, size * 0.02);
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * radius * 0.18, Math.sin(angle) * radius * 0.18);
    ctx.lineTo(Math.cos(angle) * radius * 0.92, Math.sin(angle) * radius * 0.92);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPageQr(ctx, page, x, y, size) {
  const target = page.qrTarget || page.routeUrl || page.routeHref || (page.slug ? `/ar/${page.slug}/` : '');
  drawQr(ctx, target, x, y, size);
}

function drawComicCaption(ctx, text, x, y, w, h, fontSize = 28) {
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

function drawThoughtBubble(ctx, text, x, y, w, h) {
  ctx.save();
  ctx.fillStyle = '#f7f0df';
  ctx.strokeStyle = '#4b443a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.5, w * 0.5, h * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#2a251f';
  ctx.font = '900 25px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawWrapped(ctx, text, x + 18, y + h * 0.42, w - 36, 30, 3);
  ctx.restore();
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

function drawPosterBands(ctx, x, y, w, h, colors) {
  const bandH = h / colors.length;
  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y + index * bandH, w, bandH + 1);
  });
}

function drawJrProfile(ctx, x, y, scale, facing = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * facing, scale);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#211814';
  ctx.lineWidth = 7;
  ctx.fillStyle = '#2e221d';
  ctx.beginPath();
  ctx.arc(0, -70, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  drawHalftone(ctx, -42, -112, 84, 84, '#0c0908', 13, 2.2, 0.2);
  ctx.fillStyle = '#8a5135';
  ctx.beginPath();
  ctx.arc(12, -42, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#2b2420';
  ctx.beginPath();
  ctx.arc(24, -48, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,215,148,0.55)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(20, -54, 18, -0.2, 1.35);
  ctx.stroke();
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
  ctx.fillStyle = '#6e2c2b';
  ctx.fillRect(-38, 4, 22, 78);
  ctx.fillStyle = '#233d51';
  ctx.fillRect(-66, 14, 42, 76);
  ctx.strokeRect(-66, 14, 42, 76);
  ctx.fillStyle = '#355b78';
  ctx.fillRect(-58, 28, 18, 34);
  ctx.fillStyle = '#d1b15d';
  ctx.beginPath();
  ctx.arc(-44, 42, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawColumns(ctx, x, y, w, h) {
  ctx.save();
  ctx.strokeStyle = '#2b261f';
  ctx.lineWidth = 6;
  for (let i = 0; i < 4; i += 1) {
    const px = x + w * (0.18 + i * 0.2);
    const columnGradient = ctx.createLinearGradient(px, y, px + w * 0.055, y);
    columnGradient.addColorStop(0, '#625e55');
    columnGradient.addColorStop(0.5, '#b9ad91');
    columnGradient.addColorStop(1, '#565249');
    ctx.fillStyle = columnGradient;
    ctx.fillRect(px, y + h * 0.2, w * 0.055, h * 0.68);
    ctx.strokeRect(px, y + h * 0.2, w * 0.055, h * 0.68);
    ctx.fillStyle = 'rgba(255,230,166,0.35)';
    ctx.fillRect(px + w * 0.014, y + h * 0.22, w * 0.012, h * 0.6);
    ctx.fillStyle = '#3f3b34';
    ctx.fillRect(px + w * 0.04, y + h * 0.22, w * 0.01, h * 0.62);
    ctx.fillRect(px - 10, y + h * 0.16, w * 0.055 + 20, 16);
    ctx.fillRect(px - 14, y + h * 0.88, w * 0.055 + 28, 16);
  }
  drawHalftone(ctx, x, y, w, h, '#17130f', 22, 2.4, 0.16);
  ctx.restore();
}

function drawArtifact(ctx, x, y, scale, color = '#d0aa63') {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.strokeStyle = '#2b241d';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 38, 54, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,231,142,0.7)';
  ctx.beginPath();
  ctx.ellipse(-12, -16, 12, 20, -0.4, 0, Math.PI * 2);
  ctx.fill();
  drawHalftone(ctx, -36, -52, 72, 104, '#3b2613', 12, 1.8, 0.18);
  ctx.strokeStyle = 'rgba(43,36,29,0.62)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-18, -6);
  ctx.bezierCurveTo(-4, -24, 18, -22, 20, -4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-12, 10, 5, 0, Math.PI * 2);
  ctx.arc(14, 8, 5, 0, Math.PI * 2);
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
  ctx.ellipse(0, 0, 86, 44, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e6d0a1';
  ctx.beginPath();
  ctx.ellipse(-20, -12, 38, 14, -0.15, 0, Math.PI * 2);
  ctx.fill();
  drawHalftone(ctx, -82, -42, 170, 86, '#5a4228', 14, 2.1, 0.18);
  ctx.fillStyle = '#332a22';
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(-36 + i * 22, -6, 10, 14, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = '#2b241d';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(48, 14);
  ctx.lineTo(112, 40);
  ctx.lineTo(32, 36);
  ctx.stroke();
  ctx.restore();
}

function drawReferencePanelArt(ctx, index, x, y, w, h, accent, glow) {
  const palettes = [
    ['#b7aa8c', '#7c827d', '#424743'],
    ['#8a908b', '#626d70', '#33383c'],
    ['#3b3444', '#7b5633', '#d7a84c'],
    ['#215e9a', '#27a5c2', '#ffb43d', '#e74746']
  ];
  drawPosterBands(ctx, x, y, w, h, palettes[index] || palettes[0]);
  drawHalftone(ctx, x, y, w, h, index === 3 ? '#1b1940' : '#1b1713', 17, 2.6, index === 3 ? 0.18 : 0.22);
  ctx.strokeStyle = index === 3 ? 'rgba(255,248,185,0.28)' : 'rgba(245,229,174,0.18)';
  ctx.lineWidth = 5;
  for (let i = -2; i < 8; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x + i * w * 0.22, y + h);
    ctx.lineTo(x + i * w * 0.22 + w * 0.55, y);
    ctx.stroke();
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  if (index === 0) {
    ctx.fillStyle = '#494941';
    ctx.fillRect(x + w * 0.08, y + h * 0.73, w * 0.82, h * 0.08);
    ctx.fillStyle = '#2f332f';
    ctx.fillRect(x + w * 0.05, y + h * 0.8, w * 0.86, h * 0.18);
    drawColumns(ctx, x + w * 0.28, y + h * 0.08, w * 0.7, h * 0.82);
    drawJrProfile(ctx, x + w * 0.22, y + h * 0.78, Math.min(w, h) / 280, 1);
    drawThoughtBubble(ctx, "This place does not look like much...", x + w * 0.58, y + h * 0.48, w * 0.34, h * 0.18);
  }

  if (index === 1) {
    ctx.fillStyle = '#34383d';
    ctx.fillRect(x, y + h * 0.58, w, h * 0.42);
    drawColumns(ctx, x + w * 0.08, y + h * 0.08, w * 0.58, h * 0.78);
    drawDinoSkull(ctx, x + w * 0.78, y + h * 0.23, Math.min(w, h) / 360);
    drawArtifact(ctx, x + w * 0.73, y + h * 0.62, Math.min(w, h) / 360, '#bfb091');
    drawJrProfile(ctx, x + w * 0.38, y + h * 0.76, Math.min(w, h) / 300, -1);
    drawThoughtBubble(ctx, 'Just old stuff. Nothing for me.', x + w * 0.13, y + h * 0.28, w * 0.34, h * 0.18);
  }

  if (index === 2) {
    const burst = ctx.createRadialGradient(x + w * 0.58, y + h * 0.48, 10, x + w * 0.58, y + h * 0.48, w * 0.48);
    burst.addColorStop(0, glow);
    burst.addColorStop(0.38, '#d9a650');
    burst.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = burst;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(255,235,120,0.72)';
    ctx.lineWidth = 5;
    for (let i = 0; i < 18; i += 1) {
      const a = (Math.PI * 2 * i) / 18;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.58, y + h * 0.48);
      ctx.lineTo(x + w * 0.58 + Math.cos(a) * w * 0.62, y + h * 0.48 + Math.sin(a) * h * 0.62);
      ctx.stroke();
    }
    drawJrProfile(ctx, x + w * 0.22, y + h * 0.78, Math.min(w, h) / 220, 1);
    drawArtifact(ctx, x + w * 0.68, y + h * 0.5, Math.min(w, h) / 220, '#c99643');
    drawThoughtBubble(ctx, 'Wait... what is that light?', x + w * 0.54, y + h * 0.8, w * 0.4, h * 0.18);
  }

  if (index === 3) {
    const cx = x + w * 0.48;
    const cy = y + h * 0.48;
    ctx.strokeStyle = 'rgba(255,244,160,0.72)';
    ctx.lineWidth = 8;
    for (let i = 0; i < 20; i += 1) {
      const a = (Math.PI * 2 * i) / 20;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * w, cy + Math.sin(a) * h);
      ctx.stroke();
    }
    drawHalftone(ctx, x, y, w, h, '#ffef82', 14, 2.4, 0.2);
    drawJrProfile(ctx, x + w * 0.42, y + h * 0.78, Math.min(w, h) / 300, 1);
    drawDinoSkull(ctx, x + w * 0.72, y + h * 0.32, Math.min(w, h) / 420);
    drawArtifact(ctx, x + w * 0.28, y + h * 0.35, Math.min(w, h) / 320, '#e1bd64');
    ctx.fillStyle = '#eadc9c';
    ctx.strokeStyle = '#2b241d';
    ctx.lineWidth = 5;
    ctx.fillRect(x + w * 0.55, y + h * 0.63, w * 0.18, h * 0.12);
    ctx.strokeRect(x + w * 0.55, y + h * 0.63, w * 0.18, h * 0.12);
  }

  ctx.restore();
}

function drawReferenceStyleComicPage(ctx, page, canvas) {
  const w = canvas.width;
  const h = canvas.height;
  const ink = '#1f1a14';
  const accent = page.accent || '#7ec6b8';
  const glow = page.glow || '#ccfff4';
  const panels = Array.isArray(page.panels) && page.panels.length === 4 ? page.panels : [];

  ctx.fillStyle = '#010101';
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.font = '900 70px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#bd1f1d';
  ctx.fillText('MUSEUM MULTIVERSE', 42, 52);
  ctx.fillStyle = '#ffd43b';
  ctx.fillText('MUSEUM MULTIVERSE', 34, 42);
  ctx.font = '900 20px Arial, sans-serif';
  ctx.fillStyle = '#d8c7a7';
  ctx.fillText('THE LOST CHAPTERS', 40, 126);
  ctx.restore();

  const pageH = Math.round(h * 0.86);
  const pageW = Math.round(pageH * 0.67);
  const pageX = Math.round((w - pageW) / 2);
  const pageY = Math.round(h * 0.06);
  const pad = Math.round(pageW * 0.034);
  const gutter = Math.round(pageW * 0.014);

  ctx.fillStyle = '#211f2e';
  ctx.fillRect(pageX + 46, pageY - 66, pageW + 120, pageH + 110);
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
    drawReferencePanelArt(ctx, index, box.x, box.y, box.w, box.h, accent, glow);
    ctx.strokeStyle = '#161411';
    ctx.lineWidth = 8;
    ctx.strokeRect(box.x, box.y, box.w, box.h);
  });

  drawComicCaption(ctx, 'At first, the museum feels quiet and ordinary.', boxes[0].x + 26, boxes[0].y + 24, boxes[0].w * 0.48, boxes[0].h * 0.2, 24);
  drawComicCaption(ctx, 'Inside, it feels the same.', boxes[1].x + 28, boxes[1].y + 24, boxes[1].w * 0.45, boxes[1].h * 0.16, 25);
  drawComicCaption(ctx, 'Then something catches his eye.', boxes[2].x + 26, boxes[2].y + 24, boxes[2].w * 0.42, boxes[2].h * 0.2, 22);
  drawComicCaption(ctx, 'Suddenly, the museum is alive. It is endless. It is me.', boxes[3].x + boxes[3].w * 0.48, boxes[3].y + 24, boxes[3].w * 0.44, boxes[3].h * 0.2, 21);

  const qrOuter = Math.round(pageW * 0.36);
  const qrX = Math.round(pageX + pageW / 2 - qrOuter / 2);
  const qrY = Math.round(pageY + pageH * 0.5 - qrOuter * 0.34);
  drawCenterBurst(ctx, qrX - 42, qrY - 42, qrOuter + 84, accent, glow);

  ctx.fillStyle = '#f9f3e5';
  ctx.beginPath();
  ctx.arc(qrX + qrOuter / 2, qrY + qrOuter / 2, qrOuter * 0.47, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f9f3e5';
  ctx.lineWidth = 28;
  ctx.stroke();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 8;
  ctx.stroke();

  const qrSize = Math.round(qrOuter * 0.64);
  drawPageQr(ctx, page, Math.round(qrX + (qrOuter - qrSize) / 2), Math.round(qrY + (qrOuter - qrSize) / 2), qrSize);
}

function drawComicPage(ctx, page, canvas) {
  if (page.qrBurst) {
    drawReferenceStyleComicPage(ctx, page, canvas);
    return;
  }

  const pageMarginY = Math.round(canvas.height * 0.032);
  const pageHeight = canvas.height - pageMarginY * 2;
  const pageWidth = Math.round(pageHeight * (1023 / 1538));
  const pageX = Math.round((canvas.width - pageWidth) / 2);
  const pageY = pageMarginY;
  const innerPad = Math.round(pageWidth * 0.032);
  const titleBandH = Math.round(pageHeight * 0.16);
  const qrSize = Math.round(Math.min(pageWidth, pageHeight) * 0.24);
  const qrX = Math.round(pageX + (pageWidth - qrSize) / 2);
  const qrY = Math.round(pageY + (pageHeight - qrSize) / 2);
  const leftX = pageX + innerPad;
  const rightX = qrX + qrSize + innerPad;
  const topY = pageY + titleBandH + innerPad;
  const bottomY = qrY + qrSize + innerPad;
  const leftW = Math.max(1, qrX - innerPad - leftX);
  const rightW = Math.max(1, pageX + pageWidth - innerPad - rightX);
  const topH = Math.max(1, qrY - innerPad - topY);
  const bottomH = Math.max(1, pageY + pageHeight - innerPad - bottomY);
  const opening = page.slug === 'sleeping-gallery';
  const ink = '#17110d';
  const paper = opening ? '#f5ead7' : '#f7e8bd';
  const muted = opening ? '#d8d1c3' : '#e0cfa5';
  const muted2 = opening ? '#cfc7ba' : '#d9be85';
  const lift = opening ? '#e8d9bd' : page.accent || '#56dfff';
  const glow = opening ? page.glow || '#ecd2a0' : page.glow || '#fff2bd';
  const accent = page.accent || '#56dfff';
  const panelCopy = Array.isArray(page.panels) && page.panels.length === 4
    ? page.panels.map((panel) => shortText(panel, 14))
    : [
        shortText(page.description || page.pitch || page.title, 11),
        shortText(page.pitch || page.description || page.prompt, 11),
        shortText(page.prompt || page.collectible || page.qrTitle, 10),
        shortText(page.completeText || page.collectible || page.qrTitle, 10)
      ];

  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(pageX - 18, pageY - 18, pageWidth + 36, pageHeight + 36);
  ctx.fillStyle = paper;
  ctx.fillRect(pageX, pageY, pageWidth, pageHeight);

  ctx.fillStyle = 'rgba(23, 17, 13, 0.04)';
  for (let i = 0; i < 180; i += 1) {
    const px = pageX + ((i * 83) % pageWidth);
    const py = pageY + ((i * 47) % pageHeight);
    const size = 0.9 + (i % 5) * 0.2;
    ctx.fillRect(px, py, size, size);
  }

  ctx.strokeStyle = ink;
  ctx.lineWidth = 18;
  ctx.strokeRect(pageX + 10, pageY + 10, pageWidth - 20, pageHeight - 20);
  ctx.lineWidth = 4;
  ctx.strokeRect(pageX + 46, pageY + 46, pageWidth - 92, pageHeight - 92);

  ctx.fillStyle = ink;
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`PAGE ${page.number}`, pageX + innerPad + 6, pageY + 88);
  ctx.textAlign = 'center';
  ctx.font = '900 40px Georgia, serif';
  ctx.fillText(page.title, pageX + Math.round(pageWidth / 2), pageY + 136);
  ctx.textAlign = 'right';
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.fillText(page.collectible || 'AR FRAGMENT', pageX + pageWidth - innerPad - 6, pageY + 88);

  drawPanelFrame(ctx, leftX, topY, leftW, topH, opening ? muted : 'rgba(245, 233, 214, 0.86)');
  drawPanelFrame(ctx, rightX, topY, rightW, topH, opening ? muted2 : 'rgba(240, 220, 176, 0.88)');
  drawPanelFrame(ctx, leftX, bottomY, leftW, bottomH, opening ? '#ebdcc0' : 'rgba(240, 214, 145, 0.92)');
  drawPanelFrame(ctx, rightX, bottomY, rightW, bottomH, opening ? accent : lift);

  const captionH = Math.max(72, Math.round(pageHeight * 0.062));
  drawCaptionStrip(ctx, panelCopy[0], leftX, topY + topH - captionH, leftW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[1], rightX, topY + topH - captionH, rightW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[2], leftX, bottomY + bottomH - captionH, leftW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[3], rightX, bottomY + bottomH - captionH, rightW, captionH, 20, ink);

  drawMuseumHall(ctx, leftX + 24, topY + 24, Math.max(120, leftW - 48), Math.max(120, topH - captionH - 54), ink, opening ? '#9b8d7c' : accent, glow);
  drawMuseumHall(ctx, rightX + 24, topY + 24, Math.max(120, rightW - 48), Math.max(120, topH - captionH - 54), ink, opening ? '#b4aa9a' : glow, accent);
  drawKidFigure(ctx, leftX + leftW * 0.42, bottomY + bottomH * 0.58, Math.max(0.8, Math.min(leftW, bottomH) / 290), ink, accent);
  drawColorBurst(ctx, rightX + 24, bottomY + 24, Math.max(120, rightW - 48), Math.max(120, bottomH - captionH - 54), accent, glow);

  if (page.qrBurst) {
    drawCenterBurst(ctx, qrX, qrY, qrSize, accent, glow);
  } else {
    ctx.fillStyle = '#fcf5e6';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
  }
  ctx.strokeStyle = ink;
  ctx.lineWidth = 10;
  ctx.strokeRect(qrX, qrY, qrSize, qrSize);
  ctx.setLineDash([12, 10]);
  ctx.lineWidth = 3;
  ctx.strokeRect(qrX + 16, qrY + 16, qrSize - 32, qrSize - 32);
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(23,17,13,0.82)';
  ctx.font = '900 44px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('QR SPACE', qrX + qrSize / 2, qrY + qrSize / 2 - 6);
  ctx.font = '700 24px Arial, sans-serif';
  ctx.fillText('SCAN LATER', qrX + qrSize / 2, qrY + qrSize / 2 + 30);
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
  const state = {
    textureWidth,
    textureHeight,
    origin,
    createdTextures: 0,
    createdCards: 0,
    loaded: false,
    loadedPageCount: 0
  };
  let loadedCards = [];

  function plane(options) {
    return localPlaneMeshCreator.getPlane({ origin, ...options });
  }

  function textureFor(page) {
    const key = page.slug ?? page.id ?? String(page.number ?? textureCache.size);
    if (textureCache.has(key)) return textureCache.get(key);

    if (page.slug === 'sleeping-gallery') {
      const texture = createSleepingGalleryReferenceTexture();
      textureCache.set(key, texture);
      state.createdTextures = textureCache.size;
      return texture;
    }

    const canvas = document.createElement('canvas');
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 4;
    drawComicPage(ctx, page, canvas);
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

    const face = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX, segmentsY }),
      page.slug === 'sleeping-gallery' || page.qrBurst
        ? new THREE.MeshBasicMaterial({ map: textureFor(page), transparent: true })
        : new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: 0.5, metalness: 0.01 })
    );
    face.position.z = 0.02;
    face.userData.paperGrid = { segmentsX, segmentsY, origin };

    const qrOverlaySize = page.slug === 'sleeping-gallery' ? faceWidth * 0.26 : 0;
    const qrOverlayPosition = qrOverlaySize ? overlayPositionFor(origin, faceWidth, faceHeight, qrOverlaySize) : null;
    const qrOverlay = qrOverlaySize ? new THREE.Mesh(
      plane({ width: qrOverlaySize, height: qrOverlaySize, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({
        map: createSleepingGalleryQrTexture(page),
        transparent: true,
        depthWrite: false
      })
    ) : null;
    if (qrOverlay) {
      qrOverlay.position.set(qrOverlayPosition.x, qrOverlayPosition.y, 0.066);
    }

    const shine = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false })
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
    group.userData.pagePivot = {
      anchor: pivot.anchor,
      pivot: pivot.pivot,
      pivotOffset: pivot.pivotOffset,
      visualOffset: pivot.visualOffset
    };
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
    return {
      ...state,
      pagePivot: localPagePivot.snapshot?.(),
      planeMeshCreator: localPlaneMeshCreator.snapshot?.()
    };
  }

  return Object.freeze({ textureFor, createCard, loadPages, getCards, dispose, snapshot });
}
