export type AlignX = 'left' | 'center' | 'right';
export type AlignY = 'top' | 'center' | 'bottom';
export type LayoutMode = 'grid' | 'strip-h' | 'strip-v' | 'packed';
export type ImageFormat = 'png' | 'webp';
export type AtlasFormat = 'none' | 'hash' | 'array' | 'phaser3' | 'godot';
export type SortMode = 'name-asc' | 'name-desc' | 'size-desc' | 'size-asc';

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Frame = {
  id: string;
  name: string;
  image: HTMLImageElement;
  previewUrl: string;
  width: number;
  height: number;
  trim: Rect;
};

export type SheetSettings = {
  layout: LayoutMode;
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  padding: number;
  spacing: number;
  margin: number;
  extrude: number;
  trimEnabled: boolean;
  powerOfTwo: boolean;
  maxWidth: number;
  alignX: AlignX;
  alignY: AlignY;
  scale: number;
  background: string;
  showGrid: boolean;
  showIndices: boolean;
  pixelated: boolean;
  exportFormat: ImageFormat;
  atlasFormat: AtlasFormat;
};

export type PlacedFrame = {
  id: string;
  name: string;
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
  src: Rect;
  sourceSize: { w: number; h: number };
  spriteSource: Rect;
  trimmed: boolean;
};

export type SheetLayout = {
  width: number;
  height: number;
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  places: PlacedFrame[];
};

export type SliceOptions = {
  rows: number;
  cols: number;
  frameWidth: number;
  frameHeight: number;
  spacing: number;
  margin: number;
  useFrameSize: boolean;
};

export type ProjectFile = {
  version: 2;
  projectName: string;
  settings: SheetSettings;
  frames: Array<{
    id: string;
    name: string;
    file: string;
  }>;
  slots?: Array<string | null>;
};
