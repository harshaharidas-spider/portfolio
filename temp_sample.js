const fs = require('fs');
const zlib = require('zlib');

function readPngRgba(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 8;
  let width, height;
  const idatChunks = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
    offset += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * 4;
  const raw = Buffer.alloc(width * height * 4);
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcPos++];
    const prevRowOffset = (y - 1) * stride;
    const currRowOffset = y * stride;
    for (let x = 0; x < stride; x++) {
      const byte = decompressed[srcPos++];
      const a = x >= 4 ? raw[currRowOffset + x - 4] : 0;
      const b = y > 0 ? raw[prevRowOffset + x] : 0;
      const c = (x >= 4 && y > 0) ? raw[prevRowOffset + x - 4] : 0;
      let val = byte;
      if (filter === 1) val = (byte + a) & 0xff;
      else if (filter === 2) val = (byte + b) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = c;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        val = (byte + pr) & 0xff;
      }
      raw[currRowOffset + x] = val;
    }
  }
  return { width, height, raw };
}

const f = 'C:/Users/harsh/.gemini/antigravity/brain/5705a60c-1d04-4b79-9629-dadba8b3def1/.user_uploaded/media_1793170141685_6051a31b.png';
const png = readPngRgba(f);
console.log('Image dimensions:', png.width, png.height);

function getAvg(x0, y0, size) {
  let r = 0, g = 0, b = 0, count = 0;
  for (let y = y0; y < y0 + size && y < png.height; y++) {
    for (let x = x0; x < x0 + size && x < png.width; x++) {
      const idx = (y * png.width + x) * 4;
      r += png.raw[idx];
      g += png.raw[idx+1];
      b += png.raw[idx+2];
      count++;
    }
  }
  const avgR = Math.round(r / count);
  const avgG = Math.round(g / count);
  const avgB = Math.round(b / count);
  const hex = '#' + [avgR, avgG, avgB].map(v => v.toString(16).padStart(2, '0')).join('');
  return { hex, r: avgR, g: avgG, b: avgB };
}

console.log('Top area (500, 50):', getAvg(500, 50, 20));
console.log('Right area (800, 300):', getAvg(800, 300, 20));
console.log('Bottom area (600, 480):', getAvg(600, 480, 20));
console.log('Inside wheel (80, 300):', getAvg(80, 300, 20));
