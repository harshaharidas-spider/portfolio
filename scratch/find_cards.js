const fs = require('fs');
const zlib = require('zlib');

// Read PNG
const buf = fs.readFileSync('C:/Users/harsh/.gemini/antigravity/brain/31280a99-01ca-4d26-9b10-c48854241527/.user_uploaded/media_1793096335798_2511dea9.png');

// Parse PNG chunks
let pos = 8;
let width, height, bitDepth, colorType;
let idatChunks = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
    bitDepth = buf.readUInt8(pos + 16);
    colorType = buf.readUInt8(pos + 17);
    console.log(`Dimensions: ${width} x ${height}, bitDepth: ${bitDepth}, colorType: ${colorType}`);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  } else if (type === 'IEND') {
    break;
  }
  pos += 12 + len;
}

const idat = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(idat);

// Check bytes per pixel
const bytesPerPixel = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
const stride = 1 + width * bytesPerPixel;

function getPixel(x, y) {
  // Simple unfilter approximation or reconstructed
  const rowStart = y * stride;
  const filter = raw[rowStart];
  // If filter is 0 (None), directly read
  const idx = rowStart + 1 + x * bytesPerPixel;
  return [raw[idx], raw[idx+1], raw[idx+2]];
}

// Let's reconstruct scanlines properly
const img = Buffer.alloc(width * height * bytesPerPixel);
for (let y = 0; y < height; y++) {
  const rowStart = y * stride;
  const filter = raw[rowStart];
  const prevRowStart = (y - 1) * width * bytesPerPixel;
  const currRowStart = y * width * bytesPerPixel;

  for (let i = 0; i < width * bytesPerPixel; i++) {
    const rawVal = raw[rowStart + 1 + i];
    const a = i >= bytesPerPixel ? img[currRowStart + i - bytesPerPixel] : 0;
    const b = y > 0 ? img[prevRowStart + i] : 0;
    const c = (y > 0 && i >= bytesPerPixel) ? img[prevRowStart + i - bytesPerPixel] : 0;

    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      val = (rawVal + pr) & 0xff;
    }
    img[currRowStart + i] = val;
  }
}

function getRGB(x, y) {
  const idx = (y * width + x) * bytesPerPixel;
  return { r: img[idx], g: img[idx+1], b: img[idx+2] };
}

// Sample points across x to find each of the 5 cards
// Width is likely 1440 or scaled
console.log('Background at (10, 10):', getRGB(10, 10));

// Find cards by scanning horizontal line at y = Math.floor(height * 0.5)
const midY = Math.floor(height * 0.55);
let inCard = false;
let cards = [];
let startX = 0;
for (let x = 0; x < width; x++) {
  const c = getRGB(x, midY);
  // background is around (244, 242, 238)
  const isBg = c.r > 235 && c.g > 230 && c.b > 225;
  if (!isBg && !inCard) {
    inCard = true;
    startX = x;
  } else if (isBg && inCard) {
    inCard = false;
    cards.push({ startX, endX: x - 1, width: x - startX });
  }
}
if (inCard) cards.push({ startX, endX: width - 1, width: width - startX });

console.log(`Found ${cards.length} cards at Y=${midY}:`, cards);

// For each card, scan vertically at its center X to find top and bottom of the colored box
cards.forEach((card, idx) => {
  const centerX = Math.floor((card.startX + card.endX) / 2);
  let topY = -1, bottomY = -1;
  for (let y = 0; y < height; y++) {
    const c = getRGB(centerX, y);
    const isBg = c.r > 235 && c.g > 230 && c.b > 225;
    if (!isBg && topY === -1) {
      topY = y;
    } else if (isBg && topY !== -1 && bottomY === -1 && y > topY + 50) {
      bottomY = y - 1;
      break;
    }
  }
  console.log(`Card ${idx + 1} (${centerX}): Top=${topY}, Bottom=${bottomY}, Height=${bottomY - topY + 1}, Left=${card.startX}, Width=${card.width}`);
});
