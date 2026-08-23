import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DEFAULT_SLICE } from '../constants';
import { generatorSx } from '../styles';
import { SliceOptions } from '../types';
import { loadHtmlImage } from '../utils';

type Props = {
  open: boolean;
  file: File | null;
  onClose: () => void;
  onSlice: (file: File, options: SliceOptions) => void;
};

export const SliceDialog: React.FC<Props> = ({ open, file, onClose, onSlice }) => {
  const [options, setOptions] = useState<SliceOptions>(DEFAULT_SLICE);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    void loadHtmlImage(url).then((image) => {
      setSize({ w: image.naturalWidth, h: image.naturalHeight });
    }).catch(() => undefined);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const patch = (next: Partial<SliceOptions>) => setOptions((prev) => ({ ...prev, ...next }));

  const grid = useMemo(() => {
    if (!size.w || !size.h) return { cols: options.cols, rows: options.rows, fw: 0, fh: 0 };
    if (options.useFrameSize) {
      const fw = Math.max(1, options.frameWidth);
      const fh = Math.max(1, options.frameHeight);
      return {
        cols: Math.max(1, Math.floor((size.w - options.margin * 2 + options.spacing) / (fw + options.spacing))),
        rows: Math.max(1, Math.floor((size.h - options.margin * 2 + options.spacing) / (fh + options.spacing))),
        fw,
        fh,
      };
    }
    return {
      cols: Math.max(1, options.cols),
      rows: Math.max(1, options.rows),
      fw: Math.max(1, Math.floor((size.w - options.margin * 2 - options.spacing * (options.cols - 1)) / options.cols)),
      fh: Math.max(1, Math.floor((size.h - options.margin * 2 - options.spacing * (options.rows - 1)) / options.rows)),
    };
  }, [options, size]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={generatorSx}>
      <DialogTitle>Slice an existing sprite sheet</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2">
          {file ? `${file.name} · ${size.w}×${size.h} · ${grid.cols}×${grid.rows} frames of ${grid.fw}×${grid.fh}` : 'Choose a sheet image'}
        </Typography>
        <FormControlLabel
          control={<Switch checked={options.useFrameSize} onChange={(_, checked) => patch({ useFrameSize: checked })} />}
          label="Slice by frame size"
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {options.useFrameSize ? (
            <>
              <TextField size="small" type="number" label="Frame W" value={options.frameWidth} onChange={(e) => patch({ frameWidth: Number(e.target.value) })} />
              <TextField size="small" type="number" label="Frame H" value={options.frameHeight} onChange={(e) => patch({ frameHeight: Number(e.target.value) })} />
            </>
          ) : (
            <>
              <TextField size="small" type="number" label="Columns" value={options.cols} onChange={(e) => patch({ cols: Number(e.target.value) })} />
              <TextField size="small" type="number" label="Rows" value={options.rows} onChange={(e) => patch({ rows: Number(e.target.value) })} />
            </>
          )}
          <TextField size="small" type="number" label="Spacing" value={options.spacing} onChange={(e) => patch({ spacing: Number(e.target.value) })} />
          <TextField size="small" type="number" label="Margin" value={options.margin} onChange={(e) => patch({ margin: Number(e.target.value) })} />
        </Box>
        {previewUrl && (
          <Box sx={{ position: 'relative', width: '100%', maxHeight: 360, overflow: 'auto', bgcolor: 'rgba(0,0,0,0.35)', borderRadius: 1 }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Box component="img" src={previewUrl} alt="Sheet to slice" sx={{ display: 'block', maxWidth: '100%' }} />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    repeating-linear-gradient(to right, rgba(128,222,234,0.7) 0, rgba(128,222,234,0.7) 1px, transparent 1px, transparent ${100 / grid.cols}%),
                    repeating-linear-gradient(to bottom, rgba(128,222,234,0.7) 0, rgba(128,222,234,0.7) 1px, transparent 1px, transparent ${100 / grid.rows}%)
                  `,
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!file}
          onClick={() => {
            if (file) onSlice(file, options);
          }}
        >
          Slice frames
        </Button>
      </DialogActions>
    </Dialog>
  );
};
