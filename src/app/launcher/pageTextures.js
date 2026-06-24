import * as THREE from 'three';
import QRCode from 'qrcode';
import { getPageUrl } from '../../data/pages.js';

const WIDTH = 1024;
const HEIGHT = 1440;

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  let line = '';
  let lines = 0;

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      lines += 1;
      line = word;
      if (lines >= maxLines) {
        return y;
      }
    } else {
      line = next;
    }
  }

  if (line && lines < maxLines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }

  return y;
}

function drawNotebookRules(ctx, side) {
  const spineX = side === 'left' ? WIDTH - 88 : 88;
  const marginX = side === 'left' ? WIDTH - 190 : 164;
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#fff7d4');
  gradient.addColorStop(0.58, '#f4e2b8');
  gradient.addColorStop(1, '#dfc386');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const spineGradient = ctx.createLinearGradient(spineX - 110, 0, spineX + 110, 0);
  spineGradient.addColorStop(0, 'rgba(80, 45, 22, 0)');
  spineGradient.addColorStop(0.5, 'rgba(87, 53, 29, 0.16)');
  spineGradient.addColorStop(1, 'rgba(80, 45, 22, 0)');
  ctx.fillStyle = spineGradient;
  ctx.fillRect(spineX - 110, 0, 220, HEIGHT);

  ctx.strokeStyle = 'rgba(62, 86, 126, 0.22)';
  ctx.lineWidth = 2;
  for (let y = 122; y < HEIGHT - 80; y += 58) {
    ctx.beginPath();
    ctx.moveTo(92, y);
    ctx.lineTo(WIDTH - 86, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(154, 65, 48, 0.36)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(marginX, 72);
  ctx.lineTo(marginX, HEIGHT - 72);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(96, 55, 26, 0.2)';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(spineX, 74);
  ctx.lineTo(spineX, HEIGHT - 72);
  ctx.stroke();

  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = '#7a582c';
  ctx.lineWidth = 22;
  ctx.strokeRect(18, 18, WIDTH - 36, HEIGHT - 36);
  ctx.globalAlpha = 1;
}

function drawSketchMarks(ctx, accent, side, pageNumber) {
  const isTextHeavyPage = pageNumber === 'GO' || pageNumber === 'KEY';
  const baseX = side === 'left' ? 210 : 812;
  ctx.save();
  ctx.globalAlpha = isTextHeavyPage ? 0 : 0.2;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  for (let i = 0; i < 5; i += 1) {
    const x = baseX + Math.sin(i * 1.7) * 42;
    const y = 176 + i * 58;
    ctx.beginPath();
    ctx.arc(x, y, 18 + (i % 3) * 6, 0.2, Math.PI * 1.62);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.1;
  ctx.fillStyle = accent;
  ctx.rotate(-0.06);
  ctx.fillRect(side === 'left' ? 134 : 668, 952, 230, 28);
  ctx.rotate(0.06);
  ctx.restore();
}

function drawQr(ctx, url, x, y, size) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M', margin: 1 });
  const cells = qr.modules.size;
  const cell = size / cells;

  ctx.fillStyle = '#f8edcf';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#1f1a14';

  for (let row = 0; row < cells; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      if (qr.modules.get(row, col)) {
        ctx.fillRect(x + col * cell, y + row * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

function getLayout(side) {
  if (side === 'left') {
    return {
      contentX: 118,
      contentWidth: 320,
      qrX: 146,
      qrY: 1054,
      labelX: 146,
      spineSafeX: 704
    };
  }

  return {
    contentX: 228,
    contentWidth: 560,
    qrX: 228,
    qrY: 1054,
    labelX: 228,
    spineSafeX: 172
  };
}

function drawIndexPage(ctx, page, layout, experiences) {
  ctx.fillStyle = '#2a2119';
  ctx.textBaseline = 'top';
  ctx.font = '700 38px "Courier New", monospace';
  ctx.fillText(page.number, layout.contentX, 116);

  ctx.font = '700 58px Georgia, serif';
  drawWrappedText(ctx, page.title, layout.contentX, 182, layout.contentWidth, 64, 2);

  ctx.font = '600 25px "Courier New", monospace';
  ctx.fillStyle = '#4f3b2a';
  let y = 354;
  for (const experience of experiences) {
    ctx.fillText(experience.number, layout.contentX, y);
    drawWrappedText(ctx, experience.title, layout.contentX + 70, y, layout.contentWidth - 70, 32, 1);
    y += 48;
  }

  ctx.font = '700 26px "Courier New", monospace';
  ctx.fillStyle = page.accent;
  drawWrappedText(ctx, page.prompt, layout.contentX, 812, layout.contentWidth, 36, 2);
}

function drawStandardPage(ctx, page, layout, side) {
  const isCover = page?.number === 'GO';
  const isLeft = side === 'left';
  const textWidth = isLeft ? 320 : layout.contentWidth;
  ctx.fillStyle = '#2a2119';
  ctx.textBaseline = 'top';
  ctx.font = isLeft ? '700 34px "Courier New", monospace' : '700 40px "Courier New", monospace';
  ctx.fillText(page?.number ?? (side === 'left' ? '00' : 'GO'), layout.contentX, 118);

  ctx.font = isLeft ? '700 44px Georgia, serif' : '700 54px Georgia, serif';
  const titleY = drawWrappedText(
    ctx,
    page?.title ?? 'Lost Pages',
    layout.contentX,
    isCover ? 218 : 202,
    textWidth,
    isLeft ? 52 : 62,
    isLeft ? 4 : (isCover ? 4 : 2)
  );

  ctx.font = isLeft ? '500 25px "Courier New", monospace' : '500 30px "Courier New", monospace';
  ctx.fillStyle = '#4b3a2b';
  const descY = drawWrappedText(
    ctx,
    page?.description ?? 'Scan the page to open the exhibit.',
    layout.contentX,
    titleY + 34,
    textWidth,
    isLeft ? 36 : 41,
    isCover ? 3 : 4
  );

  ctx.font = isLeft ? '700 23px "Courier New", monospace' : '700 28px "Courier New", monospace';
  ctx.fillStyle = page?.accent ?? '#405f77';
  drawWrappedText(ctx, page?.prompt ?? page?.qrTitle ?? 'Start AR', layout.contentX, descY + 42, textWidth, isLeft ? 33 : 38, 4);
}

function pageToCanvas(page, origin, side = 'left') {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  const accent = page?.accent ?? '#405f77';
  const url = page?.slug ? getPageUrl(page, origin) : origin;
  const layout = getLayout(side);

  drawNotebookRules(ctx, side);
  drawSketchMarks(ctx, accent, side, page?.number);

  if (page?.number === 'KEY') {
    drawIndexPage(ctx, page, layout, experiencesForIndex);
  } else {
    drawStandardPage(ctx, page, layout, side);
  }

  ctx.fillStyle = '#2a2119';
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText(page?.qrTitle ?? 'Scan to launch', layout.labelX, 1004);
  drawQr(ctx, url, layout.qrX, layout.qrY, 228);

  ctx.font = '600 20px "Courier New", monospace';
  ctx.fillStyle = '#5f4b36';
  ctx.fillText('AR launch page', layout.qrX + 260, layout.qrY + 12);
  ctx.font = '500 18px "Courier New", monospace';
  ctx.fillStyle = '#806345';
  drawWrappedText(ctx, 'QR opens the AR exhibit.', layout.qrX + 260, layout.qrY + 46, 230, 25, 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  if (side === 'left') {
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;
  }
  texture.needsUpdate = true;
  return texture;
}

function createTurnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  drawNotebookRules(ctx, 'right');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

let experiencesForIndex = [];

export function createBookSpreads(experiences, origin) {
  experiencesForIndex = experiences;
  const cover = {
    number: 'GO',
    title: 'Museum Multiverse: Lost Pages',
    description: 'A field notebook of eight QR-launched AR exhibits.',
    prompt: 'Turn the page. Scan a drawing. Open the museum.',
    qrTitle: 'Open Page 01',
    slug: experiences[0]?.slug,
    accent: '#405f77'
  };
  const guide = {
    number: 'KEY',
    title: 'Lost Pages Index',
    description: experiences.map((experience) => `${experience.number} ${experience.title}`).join(' / '),
    prompt: 'Each spread shows two pages. Tap or scroll to turn.',
    qrTitle: 'Open Book',
    slug: experiences[0]?.slug,
    accent: '#7b5932'
  };

  const spreads = [[cover, guide]];
  for (let i = 0; i < experiences.length; i += 2) {
    spreads.push([experiences[i], experiences[i + 1] ?? guide]);
  }

  return spreads.map(([left, right]) => ({
    left,
    right,
    leftTexture: pageToCanvas(left, origin, 'left'),
    rightTexture: pageToCanvas(right, origin, 'right'),
    turnTexture: createTurnTexture()
  }));
}
