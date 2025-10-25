export type ImageItem = {
  id: string,
  file: File,
  previewUrl: string,
  imageElement: HTMLImageElement,
}
export type ImageFileMapping = Partial<Record<string, ImageItem>>; // File name to File
export type Image2dGrid = Partial<Record<number, Partial<Record<number, string>>>>; // 2d grid
export type ImageDim = { width: number, height: number };