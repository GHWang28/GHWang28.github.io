import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_SETTINGS, HISTORY_LIMIT } from '../constants';
import { Frame, SheetSettings, SliceOptions, SortMode } from '../types';
import {
  collectImageFiles,
  createSampleFrames,
  exportAtlas,
  exportCss,
  exportImage,
  exportProject,
  importProject,
  layoutSheet,
  loadHtmlImage,
  moveGroup,
  moveSlot,
  placeIdsInSlots,
  loadImageFiles,
  naturalCompare,
  revokeFrame,
  sliceSheet,
  stripExtension,
} from '../utils';

type Snapshot = {
  frames: Frame[];
  slots: Array<string | null>;
  settings: SheetSettings;
  projectName: string;
};

type UseSpriteSheetResult = {
  projectName: string;
  setProjectName: (value: string) => void;
  frames: Frame[];
  slots: Array<string | null>;
  settings: SheetSettings;
  setSettings: (patch: Partial<SheetSettings>) => void;
  selectedIds: string[];
  select: (id: string, additive?: boolean) => void;
  selectAll: () => void;
  clearSelection: () => void;
  layout: ReturnType<typeof layoutSheet>;
  error: string | null;
  notice: string | null;
  busy: boolean;
  canUndo: boolean;
  canRedo: boolean;
  addFiles: (files: FileList | File[]) => Promise<void>;
  addSamples: () => Promise<void>;
  sliceImage: (file: File, options: SliceOptions) => Promise<void>;
  loadProjectFile: (file: File) => Promise<void>;
  removeSelected: () => void;
  duplicateSelected: () => void;
  renameFrame: (id: string, name: string) => void;
  moveSelected: (delta: number) => void;
  reorder: (fromId: string, toId: string) => void;
  moveToCell: (fromId: string, cellIndex: number) => void;
  moveGroupToCell: (anchorId: string, cellIndex: number, groupIds: string[]) => void;
  orderedFrames: Frame[];
  sortFrames: (mode: SortMode) => void;
  reverseFrames: () => void;
  clearAll: () => void;
  undo: () => void;
  redo: () => void;
  exportSheet: () => Promise<void>;
  exportAtlasFile: () => void;
  exportCssFile: () => void;
  exportProjectFile: () => Promise<void>;
  dismissError: () => void;
  dismissNotice: () => void;
};

const cloneSettings = (settings: SheetSettings): SheetSettings => ({ ...settings });

export const useSpriteSheet = (): UseSpriteSheetResult => {
  const [projectName, setProjectName] = useState('');
  const [frames, setFrames] = useState<Frame[]>([]);
  const [slots, setSlots] = useState<Array<string | null>>([]);
  const [settings, setSettingsState] = useState<SheetSettings>(DEFAULT_SETTINGS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const pastRef = useRef<Snapshot[]>([]);
  const futureRef = useRef<Snapshot[]>([]);
  const [, setHistoryTick] = useState(0);

  const framesRef = useRef(frames);
  const slotsRef = useRef(slots);
  const settingsRef = useRef(settings);
  const projectNameRef = useRef(projectName);
  const lifetimeFrames = useRef<Frame[]>([]);
  framesRef.current = frames;
  slotsRef.current = slots;
  settingsRef.current = settings;
  projectNameRef.current = projectName;

  useEffect(() => {
    const seen = new Set(lifetimeFrames.current.map((frame) => frame.id));
    for (const frame of frames) {
      if (!seen.has(frame.id)) lifetimeFrames.current.push(frame);
    }
  }, [frames]);

  useEffect(() => () => {
    const revoked = new Set<string>();
    for (const frame of lifetimeFrames.current) {
      if (revoked.has(frame.previewUrl)) continue;
      revokeFrame(frame);
      revoked.add(frame.previewUrl);
    }
  }, []);

  const bumpHistory = () => setHistoryTick((value) => value + 1);

  const snapshot = useCallback((): Snapshot => ({
    frames: [...framesRef.current],
    slots: [...slotsRef.current],
    settings: cloneSettings(settingsRef.current),
    projectName: projectNameRef.current,
  }), []);

  const commit = useCallback(() => {
    pastRef.current = [...pastRef.current.slice(-(HISTORY_LIMIT - 1)), snapshot()];
    futureRef.current = [];
    bumpHistory();
  }, [snapshot]);

  const restore = useCallback((next: Snapshot) => {
    setFrames(next.frames);
    setSlots(next.slots);
    setSettingsState(next.settings);
    setProjectName(next.projectName);
    setSelectedIds((ids) => ids.filter((id) => next.frames.some((frame) => frame.id === id)));
  }, []);

  const runBusy = useCallback(async (work: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await work();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }, []);

  const addFrames = useCallback((incoming: Frame[], replace = false) => {
    commit();
    setFrames((prev) => (replace ? incoming : [...prev, ...incoming]));
    setSlots((prev) => (
      replace
        ? incoming.map((frame) => frame.id)
        : placeIdsInSlots(prev, incoming.map((frame) => frame.id))
    ));
    if (incoming.length) {
      setSelectedIds(incoming.map((frame) => frame.id));
    }
  }, [commit]);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = collectImageFiles(fileList);
    if (files.length === 0) {
      setError('Drop PNG, JPG, WebP, GIF, or SVG files');
      return;
    }
    await runBusy(async () => {
      const incoming = await loadImageFiles(files);
      addFrames(incoming);
      setNotice(`Added ${incoming.length} frame${incoming.length === 1 ? '' : 's'}`);
    });
  }, [addFrames, runBusy]);

  const addSamples = useCallback(async () => {
    await runBusy(async () => {
      addFrames(await createSampleFrames());
      if (!projectNameRef.current) setProjectName('sample_sheet');
      setNotice('Added 8 sample frames');
    });
  }, [addFrames, runBusy]);

  const sliceImage = useCallback(async (file: File, options: SliceOptions) => {
    await runBusy(async () => {
      const url = URL.createObjectURL(file);
      try {
        const image = await loadHtmlImage(url);
        const incoming = await sliceSheet(image, options, stripExtension(file.name));
        addFrames(incoming);
        setNotice(`Sliced ${incoming.length} frames from ${file.name}`);
      } finally {
        URL.revokeObjectURL(url);
      }
    });
  }, [addFrames, runBusy]);

  const loadProjectFile = useCallback(async (file: File) => {
    await runBusy(async () => {
      const loaded = await importProject(file);
      addFrames(loaded.frames, true);
      setSlots(loaded.slots);
      setSettingsState({ ...DEFAULT_SETTINGS, ...loaded.settings });
      setProjectName(loaded.projectName);
      setNotice('Project loaded');
    });
  }, [addFrames, runBusy]);

  const setSettings = useCallback((patch: Partial<SheetSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...patch }));
  }, []);

  const select = useCallback((id: string, additive = false) => {
    setSelectedIds((prev) => {
      if (additive) {
        return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return [id];
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(framesRef.current.map((frame) => frame.id));
  }, []);

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const removeSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    const remove = new Set(selectedIds);
    commit();
    setFrames((prev) => prev.filter((frame) => !remove.has(frame.id)));
    setSlots((prev) => prev.map((id) => (id && remove.has(id) ? null : id)));
    setSelectedIds([]);
  }, [commit, selectedIds]);

  const duplicateSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    const selected = new Set(selectedIds);
    commit();
    const pairs: Array<{ from: string; to: string }> = [];
    setFrames((prev) => {
      const copies: Frame[] = [];
      const next = prev.flatMap((frame) => {
        if (!selected.has(frame.id)) return [frame];
        const copy: Frame = {
          ...frame,
          id: uuidv4(),
          name: `${frame.name}_copy`,
        };
        copies.push(copy);
        pairs.push({ from: frame.id, to: copy.id });
        return [frame, copy];
      });
      setSelectedIds(copies.map((frame) => frame.id));
      return next;
    });
    setSlots((prev) => {
      const next = [...prev];
      for (const pair of pairs) {
        const at = next.indexOf(pair.from);
        if (at >= 0) next.splice(at + 1, 0, pair.to);
        else next.push(pair.to);
      }
      return next;
    });
  }, [commit, selectedIds]);

  const renameFrame = useCallback((id: string, name: string) => {
    setFrames((prev) => prev.map((frame) => (frame.id === id ? { ...frame, name } : frame)));
  }, []);

  const moveSelected = useCallback((delta: number) => {
    if (selectedIds.length === 0 || delta === 0) return;
    const selected = new Set(selectedIds);
    commit();
    setSlots((prev) => {
      const next = [...prev];
      const indexes = next
        .map((id, index) => (id && selected.has(id) ? index : -1))
        .filter((index) => index >= 0);
      const ordered = delta > 0 ? [...indexes].reverse() : indexes;
      for (const index of ordered) {
        const target = index + delta;
        if (target < 0 || target >= next.length) continue;
        const [item] = next.splice(index, 1);
        next.splice(target, 0, item);
      }
      return next;
    });
  }, [commit, selectedIds]);

  const reorder = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return;
    const toIndex = slotsRef.current.indexOf(toId);
    if (toIndex < 0) return;
    commit();
    setSlots((prev) => moveSlot(prev, fromId, toIndex));
  }, [commit]);

  const moveToCell = useCallback((fromId: string, cellIndex: number) => {
    if (slotsRef.current[cellIndex] === fromId) return;
    commit();
    setSlots((prev) => moveSlot(prev, fromId, cellIndex));
  }, [commit]);

  const sortFrames = useCallback((mode: SortMode) => {
    commit();
    setFrames((prev) => {
      const next = [...prev];
      next.sort((a, b) => {
        if (mode === 'name-asc') return naturalCompare(a.name, b.name);
        if (mode === 'name-desc') return naturalCompare(b.name, a.name);
        const aSize = a.width * a.height;
        const bSize = b.width * b.height;
        return mode === 'size-desc' ? bSize - aSize : aSize - bSize;
      });
      setSlots(next.map((frame) => frame.id));
      return next;
    });
  }, [commit]);

  const reverseFrames = useCallback(() => {
    commit();
    setSlots((prev) => [...prev].reverse());
  }, [commit]);

  const clearAll = useCallback(() => {
    if (framesRef.current.length === 0) return;
    commit();
    setFrames([]);
    setSlots([]);
    setSelectedIds([]);
  }, [commit]);

  const undo = useCallback(() => {
    const previous = pastRef.current.pop();
    if (!previous) return;
    futureRef.current.push(snapshot());
    restore(previous);
    bumpHistory();
  }, [restore, snapshot]);

  const redo = useCallback(() => {
    const next = futureRef.current.pop();
    if (!next) return;
    pastRef.current.push(snapshot());
    restore(next);
    bumpHistory();
  }, [restore, snapshot]);

  const layout = useMemo(() => layoutSheet(frames, settings, slots), [frames, settings, slots]);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const moveGroupToCell = useCallback((anchorId: string, cellIndex: number, groupIds: string[]) => {
    const currentLayout = layoutRef.current;
    const next = moveGroup(
      slotsRef.current,
      groupIds.length > 0 ? groupIds : [anchorId],
      anchorId,
      cellIndex,
      currentLayout.columns,
      currentLayout.rows
    );
    if (next === slotsRef.current) return;
    commit();
    setSlots(next);
  }, [commit]);

  const orderedFrames = useMemo(() => {
    const byId = new Map(frames.map((frame) => [frame.id, frame]));
    const ordered = slots
      .map((id) => (id ? byId.get(id) : undefined))
      .filter((frame): frame is Frame => Boolean(frame));
    return ordered.length > 0 ? ordered : frames;
  }, [frames, slots]);

  const exportSheet = useCallback(async () => {
    await runBusy(async () => {
      const nextLayout = layoutSheet(framesRef.current, settingsRef.current, slotsRef.current);
      await exportImage(framesRef.current, nextLayout, settingsRef.current, projectNameRef.current);
      const atlasSettings = settingsRef.current;
      if (atlasSettings.atlasFormat !== 'none') {
        exportAtlas(nextLayout, atlasSettings, projectNameRef.current);
      }
      setNotice('Exported sprite sheet');
    });
  }, [runBusy]);

  const exportAtlasFile = useCallback(() => {
    try {
      exportAtlas(layout, settings, projectName);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Atlas export failed');
    }
  }, [layout, projectName, settings]);

  const exportCssFile = useCallback(() => {
    try {
      exportCss(layout, settings, projectName);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'CSS export failed');
    }
  }, [layout, projectName, settings]);

  const exportProjectFile = useCallback(async () => {
    await runBusy(async () => {
      await exportProject(framesRef.current, settingsRef.current, projectNameRef.current, slotsRef.current);
      setNotice('Exported project zip');
    });
  }, [runBusy]);

  return {
    projectName,
    setProjectName,
    frames,
    slots,
    orderedFrames,
    settings,
    setSettings,
    selectedIds,
    select,
    selectAll,
    clearSelection,
    layout,
    error,
    notice,
    busy,
    canUndo: pastRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
    addFiles,
    addSamples,
    sliceImage,
    loadProjectFile,
    removeSelected,
    duplicateSelected,
    renameFrame,
    moveSelected,
    reorder,
    moveToCell,
    moveGroupToCell,
    sortFrames,
    reverseFrames,
    clearAll,
    undo,
    redo,
    exportSheet,
    exportAtlasFile,
    exportCssFile,
    exportProjectFile,
    dismissError: () => setError(null),
    dismissNotice: () => setNotice(null),
  };
};
