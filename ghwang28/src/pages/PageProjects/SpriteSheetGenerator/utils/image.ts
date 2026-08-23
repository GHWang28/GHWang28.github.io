import { v4 as uuidv4 } from 'uuid';
import { SAMPLE_COLORS } from '../constants';
import { Frame, Rect, SliceOptions } from '../types';
import { stripExtension } from './files';

export const loadHtmlImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to decode image'));
    image.src = src;
  });

export const computeTrim = (image: HTMLImageElement): Rect => {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (width === 0 || height === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { x: 0, y: 0, w: width, h: height };

  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, width, height);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0 || maxY < 0) {
    return { x: 0, y: 0, w: width, h: height };
  }

  return {
    x: minX,
    y: minY,
    w: maxX - minX + 1,
    h: maxY - minY + 1,
  };
};

export const revokeFrame = (frame: Frame): void => {
  URL.revokeObjectURL(frame.previewUrl);
};

export const createFrameFromImage = (
  image: HTMLImageElement,
  previewUrl: string,
  name: string,
  id = uuidv4()
): Frame => ({
  id,
  name,
  image,
  previewUrl,
  width: image.naturalWidth || image.width,
  height: image.naturalHeight || image.height,
  trim: computeTrim(image),
});

export const loadImageFile = async (file: File): Promise<Frame> => {
  const previewUrl = URL.createObjectURL(file);
  try {
    const image = await loadHtmlImage(previewUrl);
    return createFrameFromImage(image, previewUrl, stripExtension(file.name));
  } catch (error) {
    URL.revokeObjectURL(previewUrl);
    throw error;
  }
};

export const loadImageFiles = async (files: File[]): Promise<Frame[]> => {
  const frames: Frame[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      frames.push(await loadImageFile(file));
    } catch {
      errors.push(file.name);
    }
  }

  if (frames.length === 0) {
    throw new Error(errors.length ? `Could not load: ${errors.join(', ')}` : 'No images found');
  }

  return frames;
};

const canvasToImage = async (canvas: HTMLCanvasElement, name: string): Promise<Frame> => {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((next) => {
      if (!next) reject(new Error('Failed to slice frame'));
      else resolve(next);
    }, 'image/png');
  });
  const previewUrl = URL.createObjectURL(blob);
  const image = await loadHtmlImage(previewUrl);
  return createFrameFromImage(image, previewUrl, name);
};

export const sliceSheet = async (
  image: HTMLImageElement,
  options: SliceOptions,
  baseName: string
): Promise<Frame[]> => {
  const sheetW = image.naturalWidth || image.width;
  const sheetH = image.naturalHeight || image.height;
  const { spacing, margin, useFrameSize } = options;

  let cols = Math.max(1, options.cols);
  let rows = Math.max(1, options.rows);
  let frameW = options.frameWidth;
  let frameH = options.frameHeight;

  if (useFrameSize) {
    frameW = Math.max(1, frameW);
    frameH = Math.max(1, frameH);
    cols = Math.max(1, Math.floor((sheetW - margin * 2 + spacing) / (frameW + spacing)));
    rows = Math.max(1, Math.floor((sheetH - margin * 2 + spacing) / (frameH + spacing)));
  } else {
    frameW = Math.max(1, Math.floor((sheetW - margin * 2 - spacing * (cols - 1)) / cols));
    frameH = Math.max(1, Math.floor((sheetH - margin * 2 - spacing * (rows - 1)) / rows));
  }

  const frames: Frame[] = [];
  const canvas = document.createElement('canvas');
  canvas.width = frameW;
  canvas.height = frameH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not slice sprite sheet');

  let index = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const sx = margin + col * (frameW + spacing);
      const sy = margin + row * (frameH + spacing);
      if (sx + frameW > sheetW + 0.5 || sy + frameH > sheetH + 0.5) continue;

      ctx.clearRect(0, 0, frameW, frameH);
      ctx.drawImage(image, sx, sy, frameW, frameH, 0, 0, frameW, frameH);
      const data = ctx.getImageData(0, 0, frameW, frameH).data;
      const hasPixels = data.some((_, i) => i % 4 === 3 && data[i] > 0);
      if (!hasPixels) continue;

      frames.push(await canvasToImage(canvas, `${baseName}_${index}`));
      index += 1;
    }
  }

  if (frames.length === 0) {
    throw new Error('No non-empty frames found in that slice');
  }

  return frames;
};

export const createSampleFrames = async (count = 8, size = 48): Promise<Frame[]> => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create sample frames');

  const frames: Frame[] = [];
  for (let i = 0; i < count; i += 1) {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = SAMPLE_COLORS[i % SAMPLE_COLORS.length];
    ctx.fillRect(2, 2, size - 4, size - 4);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, size - 6, size - 6);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(size * 0.42)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(i), size / 2, size / 2 + 1);
    frames.push(await canvasToImage(canvas, `sample_${i}`));
  }
  return frames;
};
