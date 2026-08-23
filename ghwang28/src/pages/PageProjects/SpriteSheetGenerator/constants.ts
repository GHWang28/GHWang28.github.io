import { SheetSettings, SliceOptions } from './types';

export const DEFAULT_SETTINGS: SheetSettings = {
  layout: 'grid',
  columns: 0,
  rows: 0,
  cellWidth: 0,
  cellHeight: 0,
  padding: 0,
  spacing: 0,
  margin: 0,
  extrude: 0,
  trimEnabled: false,
  powerOfTwo: false,
  maxWidth: 2048,
  alignX: 'center',
  alignY: 'center',
  scale: 1,
  background: 'transparent',
  showGrid: true,
  showIndices: false,
  pixelated: true,
  exportFormat: 'png',
  atlasFormat: 'hash',
};

export const DEFAULT_SLICE: SliceOptions = {
  rows: 4,
  cols: 4,
  frameWidth: 32,
  frameHeight: 32,
  spacing: 0,
  margin: 0,
  useFrameSize: false,
};

export const IMAGE_ACCEPT = 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml';
export const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;
export const MAX_CANVAS = 8192;
export const HISTORY_LIMIT = 60;

export const SAMPLE_COLORS = [
  '#ef5350',
  '#ab47bc',
  '#5c6bc0',
  '#29b6f6',
  '#26a69a',
  '#9ccc65',
  '#ffca28',
  '#ff7043',
];
