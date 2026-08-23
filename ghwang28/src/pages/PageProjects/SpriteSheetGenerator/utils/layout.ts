import { MAX_CANVAS } from '../constants';
import { Frame, PlacedFrame, Rect, SheetLayout, SheetSettings } from '../types';
import { nextPowerOfTwo } from './files';

const sourceRect = (frame: Frame, trimEnabled: boolean): Rect => {
  if (!trimEnabled) {
    return { x: 0, y: 0, w: frame.width, h: frame.height };
  }
  return frame.trim.w > 0 && frame.trim.h > 0
    ? frame.trim
    : { x: 0, y: 0, w: frame.width, h: frame.height };
};

const alignOffset = (cell: number, size: number, align: 'start' | 'center' | 'end'): number => {
  if (align === 'center') return Math.round((cell - size) / 2);
  if (align === 'end') return cell - size;
  return 0;
};

const packShelf = (
  sizes: Array<{ id: string; w: number; h: number }>,
  maxWidth: number
): { places: Array<{ id: string; x: number; y: number }>; width: number; height: number } => {
  const sorted = [...sizes].sort((a, b) => b.h - a.h || b.w - a.w);
  const shelves: Array<{ y: number; height: number; x: number }> = [];
  const places: Array<{ id: string; x: number; y: number }> = [];
  let sheetW = 0;
  let sheetH = 0;

  for (const item of sorted) {
    let shelf = shelves.find((entry) => entry.x + item.w <= maxWidth && entry.height >= item.h);
    if (!shelf) {
      shelf = { y: sheetH, height: item.h, x: 0 };
      shelves.push(shelf);
      sheetH += item.h;
    }
    places.push({ id: item.id, x: shelf.x, y: shelf.y });
    shelf.x += item.w;
    sheetW = Math.max(sheetW, shelf.x);
  }

  return { places, width: sheetW, height: sheetH };
};

export const padSlots = (slots: Array<string | null>, length: number): Array<string | null> => {
  const next = slots.slice(0, Math.max(length, slots.length));
  while (next.length < length) next.push(null);
  return next;
};

export const placeIdsInSlots = (slots: Array<string | null>, ids: string[]): Array<string | null> => {
  const next = [...slots];
  for (const id of ids) {
    const hole = next.findIndex((slot) => slot === null);
    if (hole >= 0) next[hole] = id;
    else next.push(id);
  }
  return next;
};

export const moveSlot = (
  slots: Array<string | null>,
  fromId: string,
  cellIndex: number
): Array<string | null> => {
  const next = padSlots(slots, cellIndex + 1);
  const from = next.indexOf(fromId);
  if (from < 0 || from === cellIndex) return slots;
  const swap = next[cellIndex] ?? null;
  next[cellIndex] = fromId;
  next[from] = swap;
  return next;
};

const toCell = (index: number, columns: number) => ({
  col: index % columns,
  row: Math.floor(index / columns),
});

export type GroupMovePreview = {
  pairs: Array<{ id: string; from: number; to: number }>;
  destIndexes: number[];
  valid: boolean;
};

export const previewGroupMove = (
  slots: Array<string | null>,
  groupIds: string[],
  anchorId: string,
  targetIndex: number,
  columns: number,
  rows: number
): GroupMovePreview => {
  const selected = new Set(groupIds);
  selected.add(anchorId);
  const cols = Math.max(1, columns);
  const anchorFrom = slots.indexOf(anchorId);
  if (anchorFrom < 0 || targetIndex < 0) {
    return { pairs: [], destIndexes: [], valid: false };
  }

  const anchor = toCell(anchorFrom, cols);
  const target = toCell(targetIndex, cols);
  const dRow = target.row - anchor.row;
  const dCol = target.col - anchor.col;
  const pairs: GroupMovePreview['pairs'] = [];

  for (let index = 0; index < slots.length; index += 1) {
    const id = slots[index];
    if (!id || !selected.has(id)) continue;
    const cell = toCell(index, cols);
    const row = cell.row + dRow;
    const col = cell.col + dCol;
    if (row < 0 || col < 0 || row >= rows || col >= cols) {
      return { pairs: [], destIndexes: [], valid: false };
    }
    pairs.push({ id, from: index, to: row * cols + col });
  }

  if (pairs.length === 0) {
    return { pairs: [], destIndexes: [], valid: false };
  }

  return {
    pairs,
    destIndexes: pairs.map((pair) => pair.to),
    valid: true,
  };
};

export const moveGroup = (
  slots: Array<string | null>,
  groupIds: string[],
  anchorId: string,
  targetIndex: number,
  columns: number,
  rows: number
): Array<string | null> => {
  const preview = previewGroupMove(slots, groupIds, anchorId, targetIndex, columns, rows);
  if (!preview.valid || preview.pairs.every((pair) => pair.from === pair.to)) {
    return slots;
  }

  const lastIndex = Math.max(
    slots.length - 1,
    ...preview.pairs.map((pair) => Math.max(pair.from, pair.to))
  );
  const next = padSlots(slots, lastIndex + 1);
  const selected = new Set(preview.pairs.map((pair) => pair.id));

  for (const pair of preview.pairs) {
    next[pair.from] = null;
  }

  const displaced: string[] = [];
  for (const pair of preview.pairs) {
    const occupant = next[pair.to];
    if (occupant && !selected.has(occupant)) {
      displaced.push(occupant);
    }
    next[pair.to] = null;
  }

  for (const pair of preview.pairs) {
    next[pair.to] = pair.id;
  }

  const holes = preview.pairs.map((pair) => pair.from).filter((index) => next[index] === null);
  displaced.forEach((id, index) => {
    if (holes[index] !== undefined) {
      next[holes[index]] = id;
    } else {
      next.push(id);
    }
  });

  return next;
};

export const layoutSheet = (
  frames: Frame[],
  settings: SheetSettings,
  slots?: Array<string | null>
): SheetLayout => {
  const scale = Math.max(0.1, settings.scale);
  const padding = Math.max(0, settings.padding);
  const spacing = Math.max(0, settings.spacing);
  const margin = Math.max(0, settings.margin);
  const extrude = Math.max(0, settings.extrude);

  const sequence = slots && slots.length > 0 ? [...slots] : frames.map((frame) => frame.id);
  const sources = frames.map((frame) => {
    const src = sourceRect(frame, settings.trimEnabled);
    const w = Math.max(1, Math.round(src.w * scale));
    const h = Math.max(1, Math.round(src.h * scale));
    return { frame, src, w, h };
  });
  const sourceById = new Map(sources.map((item) => [item.frame.id, item]));

  const contentPad = (padding + extrude) * 2;
  const autoCellW = sources.reduce((max, item) => Math.max(max, item.w), 1) + contentPad;
  const autoCellH = sources.reduce((max, item) => Math.max(max, item.h), 1) + contentPad;
  const cellWidth = settings.cellWidth > 0 ? settings.cellWidth : autoCellW;
  const cellHeight = settings.cellHeight > 0 ? settings.cellHeight : autoCellH;

  const count = Math.max(sequence.length, frames.length);
  let columns = 1;
  let rows = 1;
  let packedOrigins: Record<string, { x: number; y: number }> | null = null;
  let packedW = 0;
  let packedH = 0;

  if (settings.layout === 'strip-h') {
    columns = Math.max(1, count);
    rows = 1;
  } else if (settings.layout === 'strip-v') {
    columns = 1;
    rows = Math.max(1, count);
  } else if (settings.layout === 'packed') {
    const maxInner = Math.max(cellWidth, settings.maxWidth - margin * 2);
    const packed = packShelf(
      sources.map((item) => ({
        id: item.frame.id,
        w: item.w + contentPad + spacing,
        h: item.h + contentPad + spacing,
      })),
      Math.max(itemWidthSafe(sources, contentPad), maxInner)
    );
    packedOrigins = Object.fromEntries(packed.places.map((place) => [place.id, { x: place.x, y: place.y }]));
    packedW = Math.max(0, packed.width - (count > 0 ? spacing : 0));
    packedH = Math.max(0, packed.height - (count > 0 ? spacing : 0));
    columns = count;
    rows = 1;
  } else {
    const maxColsByWidth = Math.max(
      1,
      Math.floor((settings.maxWidth - margin * 2 + spacing) / (cellWidth + spacing))
    );
    if (settings.columns > 0) {
      columns = settings.columns;
    } else if (count === 0) {
      columns = 1;
    } else {
      columns = Math.min(count, Math.max(1, Math.min(maxColsByWidth, Math.ceil(Math.sqrt(count)))));
    }
    rows = settings.rows > 0 ? settings.rows : Math.max(1, Math.ceil(count / columns));
  }

  const alignX = settings.alignX === 'left' ? 'start' : settings.alignX === 'right' ? 'end' : 'center';
  const alignY = settings.alignY === 'top' ? 'start' : settings.alignY === 'bottom' ? 'end' : 'center';

  const usedSlots = settings.layout === 'packed'
    ? sequence.filter((id): id is string => Boolean(id))
    : padSlots(sequence, columns * rows);

  const places: PlacedFrame[] = [];
  usedSlots.forEach((id, index) => {
    if (!id) return;
    const item = sourceById.get(id);
    if (!item) return;
    const boxW = item.w + contentPad;
    const boxH = item.h + contentPad;
    let cellX = 0;
    let cellY = 0;
    let boxWidth = cellWidth;
    let boxHeight = cellHeight;

    if (settings.layout === 'packed' && packedOrigins) {
      const origin = packedOrigins[item.frame.id] || { x: 0, y: 0 };
      cellX = margin + origin.x;
      cellY = margin + origin.y;
      boxWidth = boxW;
      boxHeight = boxH;
    } else {
      const col = index % columns;
      const row = Math.floor(index / columns);
      cellX = margin + col * (cellWidth + spacing);
      cellY = margin + row * (cellHeight + spacing);
    }

    const innerX = cellX + padding + extrude + alignOffset(boxWidth - contentPad, item.w, alignX);
    const innerY = cellY + padding + extrude + alignOffset(boxHeight - contentPad, item.h, alignY);

    places.push({
      id: item.frame.id,
      name: item.frame.name,
      index,
      x: innerX,
      y: innerY,
      w: item.w,
      h: item.h,
      src: item.src,
      sourceSize: { w: item.frame.width, h: item.frame.height },
      spriteSource: {
        x: item.src.x,
        y: item.src.y,
        w: item.src.w,
        h: item.src.h,
      },
      trimmed: settings.trimEnabled && (item.src.w !== item.frame.width || item.src.h !== item.frame.height),
    });
  });

  let width = margin * 2;
  let height = margin * 2;

  if (settings.layout === 'packed') {
    width += packedW;
    height += packedH;
  } else {
    width += columns * cellWidth + Math.max(0, columns - 1) * spacing;
    height += rows * cellHeight + Math.max(0, rows - 1) * spacing;
  }

  if (count === 0) {
    width = Math.max(width, 64);
    height = Math.max(height, 64);
  }

  if (settings.powerOfTwo) {
    width = nextPowerOfTwo(width);
    height = nextPowerOfTwo(height);
  }

  width = Math.min(MAX_CANVAS, Math.max(1, Math.round(width)));
  height = Math.min(MAX_CANVAS, Math.max(1, Math.round(height)));

  return {
    width,
    height,
    columns,
    rows,
    cellWidth,
    cellHeight,
    places,
  };
};

const itemWidthSafe = (
  sources: Array<{ w: number }>,
  contentPad: number
): number => Math.max(1, ...sources.map((item) => item.w + contentPad), 1);
