import { IMAGE_EXT } from '../constants';

export const stripExtension = (name: string): string => name.replace(/\.[^.]+$/, '');

export const toSnakeCase = (str: string): string =>
  str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_') || 'sprite_sheet';

export const isImageFile = (file: File): boolean =>
  file.type.startsWith('image/') || IMAGE_EXT.test(file.name);

export const collectImageFiles = (fileList: FileList | File[]): File[] =>
  Array.from(fileList).filter(isImageFile);

export const naturalCompare = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

export const nextPowerOfTwo = (value: number): number => {
  if (value <= 1) return 1;
  return 2 ** Math.ceil(Math.log2(value));
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality = 1): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to encode image'));
        return;
      }
      resolve(blob);
    }, type, quality);
  });
