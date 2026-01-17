const Jimp = require('jimp');
const { createNoise2D } = require('simplex-noise');

function seededRandom(seed) {
  let state = seed;
  return function() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

const noise2D = createNoise2D();

async function generateImage(params) {
  const {
    width = 256,
    height = 256,
    bgColor = '#000000',
    fgColor = '#ffffff',
    shapes = ['circle'],
    patterns = ['dots'],
    algorithm = 'basic',
    seed = Date.now()
  } = params;

  const image = new Jimp(width, height);
  const rng = seededRandom(seed);

  const bgColorRGB = hexToRgb(bgColor);
  const fgColorRGB = hexToRgb(fgColor);

  let mandelbrotParams = null;
  let juliaParams = null;
  let perlinParams = null;

  if (algorithm === 'mandelbrot') {
    mandelbrotParams = {
      offsetX: (rng() - 0.5) * 0.5,
      offsetY: (rng() - 0.5) * 0.5,
      zoom: 2.5 + rng() * 1.5
    };
  } else if (algorithm === 'julia') {
    juliaParams = {
      cRe: -0.7 + (rng() - 0.5) * 0.4,
      cIm: 0.27015 + (rng() - 0.5) * 0.4
    };
  } else if (algorithm === 'perlin') {
    perlinParams = {
      offsetX: rng() * 1000,
      offsetY: rng() * 1000,
      scale: 0.005 + rng() * 0.015
    };
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let r, g, b;

      switch (algorithm) {
        case 'mandelbrot':
          ({ r, g, b } = getMandelbrotColor(x, y, width, height, bgColorRGB, fgColorRGB, mandelbrotParams));
          break;
        case 'julia':
          ({ r, g, b } = getJuliaColor(x, y, width, height, bgColorRGB, fgColorRGB, juliaParams));
          break;
        case 'perlin':
          ({ r, g, b } = getPerlinNoiseColor(x, y, width, height, bgColorRGB, fgColorRGB, perlinParams));
          break;
        case 'sierpinski':
          break;
        case 'koch':
          break;
        default:
          ({ r, g, b } = getBasicColor(x, y, width, height, bgColorRGB, fgColorRGB, shapes, patterns));
      }

      if (algorithm === 'sierpinski') {
        image.setPixelColor(Jimp.rgbaToInt(bgColorRGB.r, bgColorRGB.g, bgColorRGB.b, 255), x, y);
      } else if (algorithm === 'koch') {
        image.setPixelColor(Jimp.rgbaToInt(bgColorRGB.r, bgColorRGB.g, bgColorRGB.b, 255), x, y);
      } else {
        image.setPixelColor(Jimp.rgbaToInt(r, g, b, 255), x, y);
      }
    }
  }

  if (algorithm === 'sierpinski') {
    drawSierpinskiOnImage(image, width, height, fgColorRGB, rng);
  } else if (algorithm === 'koch') {
    drawKochOnImage(image, width, height, fgColorRGB, rng);
  } else {
    drawShapesOnImage(image, width, height, fgColorRGB, shapes, patterns, rng);
  }

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function getBasicColor(x, y, width, height, bgColor, fgColor, shapes, patterns) {
  let r = bgColor.r;
  let g = bgColor.g;
  let b = bgColor.b;

  patterns.forEach(pattern => {
    switch (pattern) {
      case 'dots':
        if (Math.sin(x * 0.1) * Math.cos(y * 0.1) > 0.5) {
          r = fgColor.r;
          g = fgColor.g;
          b = fgColor.b;
        }
        break;
      case 'stripes':
        if (x % 20 < 2) {
          r = fgColor.r;
          g = fgColor.g;
          b = fgColor.b;
        }
        break;
      case 'gradient':
        const ratio = (x + y) / (width + height);
        r = Math.floor(bgColor.r * (1 - ratio) + fgColor.r * ratio);
        g = Math.floor(bgColor.g * (1 - ratio) + fgColor.g * ratio);
        b = Math.floor(bgColor.b * (1 - ratio) + fgColor.b * ratio);
        break;
    }
  });

  return { r, g, b };
}

function drawShapesOnImage(image, width, height, fgColor, shapes, patterns, rng) {
  shapes.forEach((shape, index) => {
    switch (shape) {
      case 'circle':
        for (let i = 0; i < 10; i++) {
          const x = Math.floor(rng() * width);
          const y = Math.floor(rng() * height);
          const radius = Math.floor(rng() * 30) + 10;
          drawCircle(image, x, y, radius, fgColor);
        }
        break;
      case 'square':
        for (let i = 0; i < 10; i++) {
          const x = Math.floor(rng() * width);
          const y = Math.floor(rng() * height);
          const size = Math.floor(rng() * 50) + 20;
          drawRect(image, x, y, size, size, fgColor);
        }
        break;
      case 'line':
        for (let i = 0; i < 15; i++) {
          const x1 = Math.floor(rng() * width);
          const y1 = Math.floor(rng() * height);
          const x2 = Math.floor(rng() * width);
          const y2 = Math.floor(rng() * height);
          drawLine(image, x1, y1, x2, y2, fgColor);
        }
        break;
    }
  });
}

function drawCircle(image, centerX, centerY, radius, color) {
  for (let x = centerX - radius; x <= centerX + radius; x++) {
    for (let y = centerY - radius; y <= centerY + radius; y++) {
      if (x >= 0 && x < image.bitmap.width && y >= 0 && y < image.bitmap.height) {
        const dx = x - centerX;
        const dy = y - centerY;
        if (dx * dx + dy * dy <= radius * radius) {
          image.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, 255), x, y);
        }
      }
    }
  }
}

function drawRect(image, x, y, width, height, color) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const px = x + i;
      const py = y + j;
      if (px >= 0 && px < image.bitmap.width && py >= 0 && py < image.bitmap.height) {
        if (i < 2 || i >= width - 2 || j < 2 || j >= height - 2) {
          image.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, 255), px, py);
        }
      }
    }
  }
}

function drawLine(image, x1, y1, x2, y2, color) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    if (x1 >= 0 && x1 < image.bitmap.width && y1 >= 0 && y1 < image.bitmap.height) {
      image.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, 255), x1, y1);
    }
    if (x1 === x2 && y1 === y2) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

function getMandelbrotColor(px, py, width, height, bgColor, fgColor, params) {
  const { offsetX = 0, offsetY = 0, zoom = 3 } = params || {};
  const x0 = (px / width) * zoom - (zoom / 2) + offsetX;
  const y0 = (py / height) * zoom - (zoom / 2) + offsetY;
  let x = 0, y = 0;
  let iteration = 0;
  const maxIter = 100;

  while (x * x + y * y <= 4 && iteration < maxIter) {
    const xtemp = x * x - y * y + x0;
    y = 2 * x * y + y0;
    x = xtemp;
    iteration++;
  }

  if (iteration === maxIter) {
    return bgColor;
  } else {
    const colorValue = (iteration / maxIter);
    return {
      r: Math.floor(fgColor.r * colorValue),
      g: Math.floor(fgColor.g * colorValue * 0.5),
      b: Math.floor(fgColor.b * (1 - colorValue))
    };
  }
}

function getJuliaColor(px, py, width, height, bgColor, fgColor, params) {
  const { cRe = -0.7, cIm = 0.27015 } = params || {};
  let x = (px / width) * 3 - 1.5;
  let y = (py / height) * 3 - 1.5;
  let iteration = 0;
  const maxIter = 100;

  while (x * x + y * y <= 4 && iteration < maxIter) {
    const xtemp = x * x - y * y + cRe;
    y = 2 * x * y + cIm;
    x = xtemp;
    iteration++;
  }

  if (iteration === maxIter) {
    return bgColor;
  } else {
    const colorValue = (iteration / maxIter);
    return {
      r: Math.floor(fgColor.r * (1 - colorValue)),
      g: Math.floor(fgColor.g * colorValue),
      b: Math.floor(fgColor.b * colorValue * 0.5)
    };
  }
}

function getPerlinNoiseColor(px, py, width, height, bgColor, fgColor, params) {
  const { offsetX = 0, offsetY = 0, scale = 0.01 } = params || {};
  const noiseValue = (noise2D((px + offsetX) * scale, (py + offsetY) * scale) + 1) / 2;
  
  return {
    r: Math.floor(bgColor.r * (1 - noiseValue) + fgColor.r * noiseValue),
    g: Math.floor(bgColor.g * (1 - noiseValue) + fgColor.g * noiseValue),
    b: Math.floor(bgColor.b * (1 - noiseValue) + fgColor.b * noiseValue)
  };
}

function drawSierpinskiOnImage(image, width, height, fgColor, rng) {
  const offsetX = Math.floor((rng() - 0.5) * 50);
  const offsetY = Math.floor((rng() - 0.5) * 30);
  const scale = 0.9 + rng() * 0.2;
  
  const points = [
    { x: Math.floor(width / 2 + offsetX), y: Math.floor(20 + offsetY) },
    { x: Math.floor(20 + offsetX), y: Math.floor((height - 20) * scale + offsetY) },
    { x: Math.floor((width - 20) * scale + offsetX), y: Math.floor((height - 20) * scale + offsetY) }
  ];

  drawSierpinskiTriangle(image, points, 6, fgColor);
}

function drawSierpinskiTriangle(image, points, depth, color) {
  if (depth === 0) {
    fillTriangle(image, points, color);
  } else {
    const mid1 = { x: Math.floor((points[0].x + points[1].x) / 2), y: Math.floor((points[0].y + points[1].y) / 2) };
    const mid2 = { x: Math.floor((points[1].x + points[2].x) / 2), y: Math.floor((points[1].y + points[2].y) / 2) };
    const mid3 = { x: Math.floor((points[2].x + points[0].x) / 2), y: Math.floor((points[2].y + points[0].y) / 2) };

    drawSierpinskiTriangle(image, [points[0], mid1, mid3], depth - 1, color);
    drawSierpinskiTriangle(image, [mid1, points[1], mid2], depth - 1, color);
    drawSierpinskiTriangle(image, [mid3, mid2, points[2]], depth - 1, color);
  }
}

function fillTriangle(image, points, color) {
  const minX = Math.min(points[0].x, points[1].x, points[2].x);
  const maxX = Math.max(points[0].x, points[1].x, points[2].x);
  const minY = Math.min(points[0].y, points[1].y, points[2].y);
  const maxY = Math.max(points[0].y, points[1].y, points[2].y);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (pointInTriangle(x, y, points) && x >= 0 && x < image.bitmap.width && y >= 0 && y < image.bitmap.height) {
        image.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, 255), x, y);
      }
    }
  }
}

function pointInTriangle(px, py, points) {
  const [p0, p1, p2] = points;
  const area = 0.5 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  const s = 1 / (2 * area) * (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * px + (p0.x - p2.x) * py);
  const t = 1 / (2 * area) * (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * px + (p1.x - p0.x) * py);
  return s > 0 && t > 0 && 1 - s - t > 0;
}

function drawKochOnImage(image, width, height, fgColor, rng) {
  const offsetX = Math.floor((rng() - 0.5) * 40);
  const offsetY = Math.floor((rng() - 0.5) * 40);
  const scale = 0.85 + rng() * 0.3;
  
  const startY = Math.floor(height * 0.8 + offsetY);
  const startX = Math.floor(width * 0.1 + offsetX);
  const size = Math.floor(width * 0.8 * scale);

  const p1 = { x: startX, y: startY };
  const p2 = { x: startX + Math.floor(size / 2), y: Math.floor(startY - size * Math.sqrt(3) / 2) };
  const p3 = { x: startX + size, y: startY };

  kochLine(image, p1, p2, 5, fgColor);
  kochLine(image, p2, p3, 5, fgColor);
  kochLine(image, p3, p1, 5, fgColor);
}

function kochLine(image, p1, p2, depth, color) {
  if (depth === 0) {
    drawLine(image, p1.x, p1.y, p2.x, p2.y, color);
  } else {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy) / 3;
    const angle = Math.atan2(dy, dx);

    const pa = { x: p1.x + Math.floor(dx / 3), y: p1.y + Math.floor(dy / 3) };
    const pc = { x: p1.x + Math.floor(2 * dx / 3), y: p1.y + Math.floor(2 * dy / 3) };
    const pb = {
      x: Math.floor(pa.x + Math.cos(angle - Math.PI / 3) * dist),
      y: Math.floor(pa.y + Math.sin(angle - Math.PI / 3) * dist)
    };

    kochLine(image, p1, pa, depth - 1, color);
    kochLine(image, pa, pb, depth - 1, color);
    kochLine(image, pb, pc, depth - 1, color);
    kochLine(image, pc, p2, depth - 1, color);
  }
}

async function generateMultipleImages(params) {
  const { count = 1, ranges } = params;
  const images = [];

  for (let i = 0; i < Math.min(count, 100); i++) {
    const randomParams = generateRandomParams(ranges);
    randomParams.seed = Date.now() + i * 100;
    const image = await generateImage(randomParams);
    images.push(image);
  }

  return images;
}

function generateRandomParams(ranges) {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomColor = (range) => {
    const r = getRandomInt(range.bgColor.r.min, range.bgColor.r.max);
    const g = getRandomInt(range.bgColor.g.min, range.bgColor.g.max);
    const b = getRandomInt(range.bgColor.b.min, range.bgColor.b.max);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const shapes = ranges.shapes.enabled;
  const selectedShapes = shapes.length > 0 
    ? [shapes[Math.floor(Math.random() * shapes.length)]]
    : ['circle'];

  const patterns = ranges.patterns.enabled;
  const selectedPatterns = patterns.length > 0
    ? [patterns[Math.floor(Math.random() * patterns.length)]]
    : ['dots'];

  return {
    width: getRandomInt(ranges.width.min, ranges.width.max),
    height: getRandomInt(ranges.height.min, ranges.height.max),
    bgColor: getRandomColor(ranges),
    fgColor: getRandomColor({ ...ranges, bgColor: ranges.fgColor }),
    shapes: selectedShapes,
    patterns: selectedPatterns,
    algorithm: ranges.algorithms.enabled[Math.floor(Math.random() * ranges.algorithms.enabled.length)] || 'basic'
  };
}

module.exports = { generateImage, generateMultipleImages };