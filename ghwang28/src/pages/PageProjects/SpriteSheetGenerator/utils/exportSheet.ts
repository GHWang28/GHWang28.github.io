import { Frame, SheetLayout, SheetSettings } from '../types';
import { canvasToBlob, downloadBlob, toSnakeCase } from './files';
import { renderSheet } from './render';

const mimeFor = (format: SheetSettings['exportFormat']): string =>
  format === 'webp' ? 'image/webp' : 'image/png';

export const createSheetCanvas = (
  frames: Frame[],
  layout: SheetLayout,
  settings: SheetSettings
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = layout.width;
  canvas.height = layout.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create an export canvas');
  if (settings.pixelated) {
    ctx.imageSmoothingEnabled = false;
  }
  renderSheet(ctx, frames, layout, settings, { preview: false });
  return canvas;
};

export const exportImage = async (
  frames: Frame[],
  layout: SheetLayout,
  settings: SheetSettings,
  projectName: string
): Promise<void> => {
  if (frames.length === 0) throw new Error('Add frames before exporting');
  const canvas = createSheetCanvas(frames, layout, settings);
  const blob = await canvasToBlob(canvas, mimeFor(settings.exportFormat));
  downloadBlob(blob, `${toSnakeCase(projectName)}.${settings.exportFormat}`);
};

const hashAtlas = (layout: SheetLayout, imageName: string, settings: SheetSettings) => ({
  frames: Object.fromEntries(
    layout.places.map((place) => [
      place.name,
      {
        frame: { x: place.x, y: place.y, w: place.w, h: place.h },
        rotated: false,
        trimmed: place.trimmed,
        spriteSourceSize: {
          x: place.spriteSource.x,
          y: place.spriteSource.y,
          w: place.spriteSource.w,
          h: place.spriteSource.h,
        },
        sourceSize: place.sourceSize,
      },
    ])
  ),
  meta: {
    app: 'GHWang28 Sprite Sheet Generator',
    version: '2.0',
    image: imageName,
    format: 'RGBA8888',
    size: { w: layout.width, h: layout.height },
    scale: String(settings.scale),
  },
});

const arrayAtlas = (layout: SheetLayout, imageName: string, settings: SheetSettings) => {
  const hash = hashAtlas(layout, imageName, settings);
  return {
    frames: layout.places.map((place) => ({
      filename: place.name,
      ...hash.frames[place.name],
    })),
    meta: hash.meta,
  };
};

const phaserAtlas = (layout: SheetLayout, imageName: string, settings: SheetSettings) => {
  const hash = hashAtlas(layout, imageName, settings);
  return {
    textures: [
      {
        image: imageName,
        format: 'RGBA8888',
        size: hash.meta.size,
        scale: settings.scale,
        frames: layout.places.map((place) => ({
          filename: place.name,
          ...hash.frames[place.name],
        })),
      },
    ],
  };
};

const godotAtlas = (layout: SheetLayout, imageName: string) => ({
  textures: [
    {
      image: imageName,
      size: { w: layout.width, h: layout.height },
      sprites: layout.places.map((place) => ({
        filename: place.name,
        region: { x: place.x, y: place.y, w: place.w, h: place.h },
        margin: {
          x: place.spriteSource.x,
          y: place.spriteSource.y,
          w: place.sourceSize.w,
          h: place.sourceSize.h,
        },
      })),
    },
  ],
});

export const buildAtlas = (
  layout: SheetLayout,
  settings: SheetSettings,
  projectName: string
): { filename: string; json: string } | null => {
  if (settings.atlasFormat === 'none') return null;
  const imageName = `${toSnakeCase(projectName)}.${settings.exportFormat}`;
  const atlasName = `${toSnakeCase(projectName)}.json`;
  let data: unknown;
  switch (settings.atlasFormat) {
    case 'array':
      data = arrayAtlas(layout, imageName, settings);
      break;
    case 'phaser3':
      data = phaserAtlas(layout, imageName, settings);
      break;
    case 'godot':
      data = godotAtlas(layout, imageName);
      break;
    default:
      data = hashAtlas(layout, imageName, settings);
  }
  return { filename: atlasName, json: JSON.stringify(data, null, 2) };
};

export const exportAtlas = (
  layout: SheetLayout,
  settings: SheetSettings,
  projectName: string
): void => {
  const atlas = buildAtlas(layout, settings, projectName);
  if (!atlas) throw new Error('Choose an atlas format first');
  downloadBlob(new Blob([atlas.json], { type: 'application/json' }), atlas.filename);
};

export const buildCss = (layout: SheetLayout, projectName: string, format: SheetSettings['exportFormat']): string => {
  const imageName = `${toSnakeCase(projectName)}.${format}`;
  const className = toSnakeCase(projectName);
  const lines = [
    `.${className} {`,
    `  background-image: url('${imageName}');`,
    '  background-repeat: no-repeat;',
    '  display: inline-block;',
    '}',
    '',
  ];
  for (const place of layout.places) {
    const frameClass = toSnakeCase(place.name);
    lines.push(`.${className}.${frameClass} {`);
    lines.push(`  width: ${place.w}px;`);
    lines.push(`  height: ${place.h}px;`);
    lines.push(`  background-position: -${place.x}px -${place.y}px;`);
    lines.push('}');
    lines.push('');
  }
  return lines.join('\n');
};

export const exportCss = (
  layout: SheetLayout,
  settings: SheetSettings,
  projectName: string
): void => {
  downloadBlob(
    new Blob([buildCss(layout, projectName, settings.exportFormat)], { type: 'text/css' }),
    `${toSnakeCase(projectName)}.css`
  );
};
