// million-ignore
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';
import ButtonGoBack from '../../../components/ButtonGoBack';
import GradientTitle from '../../../components/GradientTitle';
import { generatorSx } from './styles';
import { SliceOptions } from './types';
import { useSpriteSheet } from './hooks/useSpriteSheet';
import {
  AnimationPreview,
  FrameLibrary,
  SettingsPanel,
  SheetPreview,
  SliceDialog,
  Toolbar,
} from './components';

export const SpriteSheetGenerator: React.FC = () => {
  const sheet = useSpriteSheet();
  const sheetRef = useRef(sheet);
  sheetRef.current = sheet;
  const [dragging, setDragging] = useState(false);
  const [sliceOpen, setSliceOpen] = useState(false);
  const [sliceFile, setSliceFile] = useState<File | null>(null);

  const openSlice = (file?: File) => {
    setSliceFile(file || null);
    setSliceOpen(true);
  };

  const handleDroppedFiles = async (files: File[]) => {
    const zip = files.find((file) => file.name.toLowerCase().endsWith('.zip'));
    if (zip) {
      await sheetRef.current.loadProjectFile(zip);
      return;
    }
    await sheetRef.current.addFiles(files);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (typing) return;
      const current = sheetRef.current;
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) current.redo();
        else current.undo();
      } else if (meta && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        current.selectAll();
      } else if (event.key === 'Escape') {
        current.clearSelection();
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        current.removeSelected();
      } else if (event.key === '[') {
        current.moveSelected(-1);
      } else if (event.key === ']') {
        current.moveSelected(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Fragment>
      <ButtonGoBack destination="/projects" />
      <GradientTitle title="Sprite Sheet Generator" subtitle="Pack, slice, preview, and export game-ready sheets" />

      <Box
        onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setDragging(false);
        }}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(false);
          void handleDroppedFiles(Array.from(e.dataTransfer.files));
        }}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          pb: 4,
          mx: { md: -4, lg: -8 },
          ...generatorSx,
        }}
      >
        {dragging && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              outline: '2px dashed',
              outlineColor: 'primary.main',
              outlineOffset: '-2px',
              bgcolor: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Drop frames, a folder, or a project zip</Typography>
          </Box>
        )}

        <Toolbar
          projectName={sheet.projectName}
          onProjectName={sheet.setProjectName}
          busy={sheet.busy}
          canUndo={sheet.canUndo}
          canRedo={sheet.canRedo}
          exportDisabled={sheet.frames.length === 0}
          onImportImages={(files) => void sheet.addFiles(files)}
          onLoadProject={(file) => void sheet.loadProjectFile(file)}
          onOpenSlice={openSlice}
          onSamples={() => void sheet.addSamples()}
          onUndo={sheet.undo}
          onRedo={sheet.redo}
          onClear={sheet.clearAll}
          onExportSheet={() => void sheet.exportSheet()}
          onExportProject={() => void sheet.exportProjectFile()}
          onExportAtlas={sheet.exportAtlasFile}
          onExportCss={sheet.exportCssFile}
        />

        <SettingsPanel settings={sheet.settings} onChange={sheet.setSettings} />

        <Grid container spacing={1.5}>
          <Grid item xs={12} md={3}>
            <FrameLibrary
              frames={sheet.orderedFrames}
              selectedIds={sheet.selectedIds}
              onSelect={sheet.select}
              onRename={sheet.renameFrame}
              onRemove={sheet.removeSelected}
              onDuplicate={sheet.duplicateSelected}
              onMove={sheet.moveSelected}
              onReorder={sheet.reorder}
              onSort={sheet.sortFrames}
              onReverse={sheet.reverseFrames}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SheetPreview
              frames={sheet.frames}
              layout={sheet.layout}
              settings={sheet.settings}
              selectedIds={sheet.selectedIds}
              onSelect={sheet.select}
              onMoveGroupToCell={sheet.moveGroupToCell}
              slots={sheet.slots}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AnimationPreview frames={sheet.orderedFrames} selectedIds={sheet.selectedIds} />
          </Grid>
        </Grid>

        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          Shortcuts: ⌘/Ctrl+Z undo · Shift+⌘/Ctrl+Z redo · ⌘/Ctrl+A select all · Delete remove · [ ] reorder · drop images or a project zip anywhere on the tool
        </Typography>
      </Box>

      <SliceDialog
        open={sliceOpen}
        file={sliceFile}
        onClose={() => setSliceOpen(false)}
        onSlice={(file: File, options: SliceOptions) => {
          setSliceOpen(false);
          void sheet.sliceImage(file, options);
        }}
      />

      <Snackbar open={Boolean(sheet.error)} autoHideDuration={6000} onClose={sheet.dismissError}>
        <Alert severity="error" onClose={sheet.dismissError} variant="filled">
          {sheet.error}
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(sheet.notice)} autoHideDuration={3000} onClose={sheet.dismissNotice}>
        <Alert severity="success" onClose={sheet.dismissNotice} variant="filled">
          {sheet.notice}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
