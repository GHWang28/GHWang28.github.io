import { Image2dGrid, ImageDim, ImageFileMapping, ImageItem } from "./typings";
import JSZip from "jszip";

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

type IHandleParsedUploadedImages = { imageNameToFile: ImageFileMapping, imageDim: ImageDim };

export const handleParsingUploadedImages = async (files: File[]): Promise<IHandleParsedUploadedImages> => {
  const newImageItems = await Promise.all(
    files.map((file) => getImageData(file, file.name))
  );

  if (newImageItems.length === 0) throw new Error('No files found')

  // Check if all dimensions are a match
  const firstDim = newImageItems[0].imageElement;
  const allSameDimensions = newImageItems.every(
    (item) =>
      item.imageElement.width === firstDim.width &&
      item.imageElement.height === firstDim.height
  );

  if (!allSameDimensions) {
    throw new Error('Images do not have the same dimensions')
  }

  const imageNameToFile = newImageItems.reduce((prev, curr) => {
    return {
      [curr.id]: curr,
      ...prev
    }
  }, {} as ImageFileMapping);

  return {
    imageNameToFile,
    imageDim: {
      width: firstDim.width,
      height: firstDim.height,
    }
  }
}

type JsonData = {
  rows: number,
  cols: number,
  imageGrid: Image2dGrid,
  projectName: string,
}

export const handleParsingUploadedProject = async (file: File): Promise<JsonData & { imageFiles: File[] }> => {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);

  let parsedJson: JsonData = {
    rows: 0,
    cols: 0,
    imageGrid: {},
    projectName: '',
  };
  const imageFiles: File[] = [];

  await Promise.all(Object.entries(loadedZip.files).map(async ([relativePath, zipEntry]) => {
    if (relativePath.endsWith(".json")) {
      // Handle JSON
      const text = await zipEntry.async("text");
      parsedJson = JSON.parse(text);
    } else if (/\.(png|jpg|jpeg|gif|webp)$/i.test(relativePath)) {
      // Handle images
      const blob = await zipEntry.async("blob");

      const fileFromZip = new File([blob], relativePath.split("/").pop() || relativePath, {
          type: blob.type || "image/*",
        });

      imageFiles.push(fileFromZip);
    }
  }))

  if (parsedJson.rows === 0 || parsedJson.cols === 0) throw new Error("Invalid JSON file");

  return {
    ...parsedJson,
    imageFiles
  }
}

export const handleExportingProject = async ({ imageFiles, ...jsonData }: JsonData & { imageFiles: File[] }) => {
  const zip = new JSZip();

  // 1. Add JSON file
  const jsonString = JSON.stringify(jsonData, null, 2);
  zip.file("state.json", jsonString);

  // 2. Add images
  for (const image of imageFiles) {
    const arrayBuffer = await image.arrayBuffer();
    zip.file(`images/${image.name}`, arrayBuffer, { binary: true });
  }

  // 3. Generate ZIP blob
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // 4. Create a download link
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${jsonData.projectName}_project.zip`; // filename
  document.body.appendChild(link);
  link.click();

  // 5. Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const handleExportSpritesheet = ({
  imageDim,
  totalCols,
  totalRows,
  imageGrid,
  imageNameToFile,
  projectName
}: {
  imageDim: ImageDim,
  totalCols: number,
  totalRows: number,
  imageGrid: Image2dGrid,
  imageNameToFile: ImageFileMapping,
  projectName: string
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
  link.download = `${projectName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}