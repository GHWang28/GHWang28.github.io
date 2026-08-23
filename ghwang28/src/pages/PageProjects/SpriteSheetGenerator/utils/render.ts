import { Frame, PlacedFrame, SheetLayout, SheetSettings } from '../types';

const drawCheckerboard = (ctx: CanvasRenderingContext2D, width: number, height: number, size = 8): void => {
  ctx.save();
  ctx.fillStyle = '#2b2b2b';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#3a3a3a';
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      if ((x / size + y / size) % 2 === 0) {
        ctx.fillRect(x, y, size, size);
      }
    }
  }
  ctx.restore();
};

const drawExtrude = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  place: PlacedFrame,
  extrude: number
): void => {
  if (extrude <= 0) return;
  const { src, x, y, w, h } = place;
  // Edges
  ctx.drawImage(image, src.x, src.y, src.w, 1, x, y - extrude, w, extrude);
  ctx.drawImage(image, src.x, src.y + src.h - 1, src.w, 1, x, y + h, w, extrude);
  ctx.drawImage(image, src.x, src.y, 1, src.h, x - extrude, y, extrude, h);
  ctx.drawImage(image, src.x + src.w - 1, src.y, 1, src.h, x + w, y, extrude, h);
  // Corners
  ctx.drawImage(image, src.x, src.y, 1, 1, x - extrude, y - extrude, extrude, extrude);
  ctx.drawImage(image, src.x + src.w - 1, src.y, 1, 1, x + w, y - extrude, extrude, extrude);
  ctx.drawImage(image, src.x, src.y + src.h - 1, 1, 1, x - extrude, y + h, extrude, extrude);
  ctx.drawImage(image, src.x + src.w - 1, src.y + src.h - 1, 1, 1, x + w, y + h, extrude, extrude);
};

export type OverlayRect = {
  id?: string;
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const overlayRects = (layout: SheetLayout, settings: SheetSettings): OverlayRect[] => {
  const byIndex = new Map(layout.places.map((place) => [place.index, place]));
  if (settings.layout === 'packed') {
    const pad = settings.padding + settings.extrude;
    return layout.places.map((place) => ({
      id: place.id,
      index: place.index,
      x: place.x - pad,
      y: place.y - pad,
      w: place.w + pad * 2,
      h: place.h + pad * 2,
    }));
  }

  const rects: OverlayRect[] = [];
  for (let row = 0; row < layout.rows; row += 1) {
    for (let col = 0; col < layout.columns; col += 1) {
      const index = row * layout.columns + col;
      rects.push({
        id: byIndex.get(index)?.id,
        index,
        x: settings.margin + col * (layout.cellWidth + settings.spacing),
        y: settings.margin + row * (layout.cellHeight + settings.spacing),
        w: layout.cellWidth,
        h: layout.cellHeight,
      });
    }
  }
  return rects;
};

export const hitTestCell = (rects: OverlayRect[], x: number, y: number): OverlayRect | null => {
  for (let i = rects.length - 1; i >= 0; i -= 1) {
    const rect = rects[i];
    if (x >= rect.x && y >= rect.y && x < rect.x + rect.w && y < rect.y + rect.h) {
      return rect;
    }
  }
  return null;
};

export const renderSheet = (
  ctx: CanvasRenderingContext2D,
  frames: Frame[],
  layout: SheetLayout,
  settings: SheetSettings,
  options?: {
    preview?: boolean;
    hiddenIds?: Set<string>;
  }
): void => {
  const { width, height, places } = layout;
  const frameMap = new Map(frames.map((frame) => [frame.id, frame]));
  const preview = options?.preview ?? false;
  const hiddenIds = options?.hiddenIds ?? new Set<string>();

  ctx.clearRect(0, 0, width, height);

  if (preview) {
    drawCheckerboard(ctx, width, height);
  } else if (settings.background !== 'transparent') {
    ctx.fillStyle = settings.background;
    ctx.fillRect(0, 0, width, height);
  }

  for (const place of places) {
    if (hiddenIds.has(place.id)) continue;
    const frame = frameMap.get(place.id);
    if (!frame) continue;
    drawExtrude(ctx, frame.image, place, settings.extrude);
    ctx.drawImage(
      frame.image,
      place.src.x,
      place.src.y,
      place.src.w,
      place.src.h,
      place.x,
      place.y,
      place.w,
      place.h
    );
  }
};

export const hitTest = (layout: SheetLayout, x: number, y: number): PlacedFrame | null => {
  for (let i = layout.places.length - 1; i >= 0; i -= 1) {
    const place = layout.places[i];
    if (x >= place.x && y >= place.y && x <= place.x + place.w && y <= place.y + place.h) {
      return place;
    }
  }
  return null;
};
