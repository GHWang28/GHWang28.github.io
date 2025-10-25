import { Image2dGrid, ImageDim, ImageFileMapping, ImageItem } from "./typings";

/**
 * Loads a File object into an HTMLImageElement to get its dimensions.
 * @returns A promise that resolves with the image element and its dimensions.
 */
export const getImageData = (
  file: File,
  id: string
): Promise<ImageItem> => {
  return new Promise((resolve, reject) => {
    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = previewUrl;

    image.onload = () => {
      resolve({
        id,
        file,
        previewUrl,
        imageElement: image,
      });
    };
    image.onerror = (err) => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error(`Failed to load image: ${file.name}. ${err}`));
    };
  });
};

export const traverseImageGrid = (callback: (input: { x: number, y: number, fileName: string }) => void, grid: Image2dGrid) => {
  for (const [x, row] of Object.entries(grid)) {
    if (!row) continue;
    for (const [y, fileName] of Object.entries(row)) {
      if (!fileName) continue;

      callback({
        x: Number(x),
        y: Number(y),
        fileName
      })
    }
  }
}

export const getAllOccupiedImages = (grid: Image2dGrid): Set<string> => {
  const output = new Set<string>();

  traverseImageGrid(({ fileName }) => {
    output.add(fileName);
  }, grid)

  return output;
}

export const removeUndefinedValues = <T extends object>(obj: T): T => {
  // Create a new object to avoid modifying the original directly
  const newObj: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects
        const cleanedValue = removeUndefinedValues(value);
        // Only include non-empty objects after cleaning
        if (Object.keys(cleanedValue).length > 0) {
          newObj[key] = cleanedValue;
        }
      } else if (value !== undefined) {
        // Include values that are not undefined
        newObj[key] = value;
      }
    }
  }
  return newObj as T;
}

export const exportImage = ({
  imageDim,
  totalCols,
  totalRows,
  imageGrid,
  imageNameToFile,
}: {
  imageDim: ImageDim,
  totalCols: number,
  totalRows: number,
  imageGrid: Image2dGrid,
  imageNameToFile: ImageFileMapping
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = imageDim.width * totalCols;
  canvas.height = imageDim.height * totalRows;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not create canvas context for export.');
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  traverseImageGrid(({ x, y, fileName }) => {
    const imageData = imageNameToFile[fileName];

    if (!imageData) return;

    ctx.drawImage(
      imageData.imageElement,
      y * imageDim.width,
      x * imageDim.height
    );
  }, imageGrid)

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png'); // Lossless PNG
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'spritesheet.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}