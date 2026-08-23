import JSZip from 'jszip';
import { DEFAULT_SETTINGS } from '../constants';
import { Frame, ProjectFile, SheetSettings } from '../types';
import { downloadBlob, toSnakeCase } from './files';
import { createFrameFromImage, loadHtmlImage } from './image';

const frameToPng = (frame: Frame): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = frame.width;
    canvas.height = frame.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not serialize frame'));
      return;
    }
    ctx.drawImage(frame.image, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error('Could not serialize frame'));
      else resolve(blob);
    }, 'image/png');
  });

export const exportProject = async (
  frames: Frame[],
  settings: SheetSettings,
  projectName: string,
  slots: Array<string | null> = frames.map((frame) => frame.id)
): Promise<void> => {
  const zip = new JSZip();
  const manifest: ProjectFile = {
    version: 2,
    projectName,
    settings,
    slots,
    frames: frames.map((frame, index) => ({
      id: frame.id,
      name: frame.name,
      file: `frames/${String(index).padStart(3, '0')}_${toSnakeCase(frame.name)}.png`,
    })),
  };

  zip.file('project.json', JSON.stringify(manifest, null, 2));
  await Promise.all(
    frames.map(async (frame, index) => {
      const blob = await frameToPng(frame);
      zip.file(manifest.frames[index].file, blob);
    })
  );

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  downloadBlob(zipBlob, `${toSnakeCase(projectName || 'sprite_sheet')}_project.zip`);
};

type LegacyProject = {
  rows?: number;
  cols?: number;
  imageGrid?: Partial<Record<number, Partial<Record<number, string>>>>;
  projectName?: string;
};

export const importProject = async (
  file: File
): Promise<{ frames: Frame[]; settings: SheetSettings; projectName: string; slots: Array<string | null> }> => {
  const zip = await JSZip.loadAsync(file);
  const jsonEntry = Object.values(zip.files).find((entry) => entry.name.endsWith('.json') && !entry.dir);
  if (!jsonEntry) throw new Error('Project zip is missing a JSON manifest');

  const parsed = JSON.parse(await jsonEntry.async('text')) as ProjectFile | LegacyProject;

  if ('version' in parsed && parsed.version === 2) {
    const frames: Frame[] = [];
    for (const item of parsed.frames) {
      const entry = zip.file(item.file);
      if (!entry) continue;
      const blob = await entry.async('blob');
      const url = URL.createObjectURL(blob);
      const image = await loadHtmlImage(url);
      frames.push(createFrameFromImage(image, url, item.name, item.id));
    }
    return {
      frames,
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      projectName: parsed.projectName || '',
      slots: parsed.slots?.length ? parsed.slots : frames.map((frame) => frame.id),
    };
  }

  const legacy = parsed as LegacyProject;
  const imageEntries = Object.values(zip.files).filter(
    (entry) => !entry.dir && /\.(png|jpe?g|gif|webp)$/i.test(entry.name)
  );
  const filesByName = new Map<string, JSZip.JSZipObject>();
  for (const entry of imageEntries) {
    filesByName.set(entry.name.split('/').pop() || entry.name, entry);
  }

  const frames: Frame[] = [];
  const grid = legacy.imageGrid || {};
  const rows = legacy.rows || 0;
  const cols = legacy.cols || 0;

  if (rows > 0 && cols > 0) {
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const fileName = grid[row]?.[col] || grid[col]?.[row];
        if (!fileName) continue;
        const entry = filesByName.get(fileName);
        if (!entry) continue;
        const blob = await entry.async('blob');
        const url = URL.createObjectURL(blob);
        const image = await loadHtmlImage(url);
        frames.push(createFrameFromImage(image, url, fileName.replace(/\.[^.]+$/, '')));
      }
    }
  }

  if (frames.length === 0) {
    for (const entry of imageEntries) {
      const blob = await entry.async('blob');
      const url = URL.createObjectURL(blob);
      const image = await loadHtmlImage(url);
      const name = (entry.name.split('/').pop() || entry.name).replace(/\.[^.]+$/, '');
      frames.push(createFrameFromImage(image, url, name));
    }
  }

  return {
    frames,
    settings: {
      ...DEFAULT_SETTINGS,
      columns: cols || 0,
      rows: rows || 0,
    },
    projectName: legacy.projectName || '',
    slots: frames.map((frame) => frame.id),
  };
};
