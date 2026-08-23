import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlignX, AlignY, AtlasFormat, ImageFormat, LayoutMode, SheetSettings } from '../types';

type Props = {
  settings: SheetSettings;
  onChange: (patch: Partial<SheetSettings>) => void;
};

const NumberField = ({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  width = 120,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  width?: number;
}) => (
  <TextField
    size="small"
    type="number"
    label={label}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    inputProps={{ min, step }}
    sx={{ width }}
  />
);

export const SettingsPanel: React.FC<Props> = ({ settings, onChange }) => (
  <Accordion defaultExpanded disableGutters>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="subtitle1" fontWeight={700}>Layout & export</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: '8px' }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Layout</InputLabel>
        <Select
          label="Layout"
          value={settings.layout}
          onChange={(e) => onChange({ layout: e.target.value as LayoutMode })}
        >
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="strip-h">Horizontal strip</MenuItem>
          <MenuItem value="strip-v">Vertical strip</MenuItem>
          <MenuItem value="packed">Packed (mixed sizes)</MenuItem>
        </Select>
      </FormControl>
      <NumberField label="Columns (0=auto)" value={settings.columns} onChange={(columns) => onChange({ columns })} width={140} />
      <NumberField label="Rows (0=auto)" value={settings.rows} onChange={(rows) => onChange({ rows })} width={140} />
      <NumberField label="Cell W (0=auto)" value={settings.cellWidth} onChange={(cellWidth) => onChange({ cellWidth })} width={130} />
      <NumberField label="Cell H (0=auto)" value={settings.cellHeight} onChange={(cellHeight) => onChange({ cellHeight })} width={130} />
      <NumberField label="Padding" value={settings.padding} onChange={(padding) => onChange({ padding })} width={100} />
      <NumberField label="Spacing" value={settings.spacing} onChange={(spacing) => onChange({ spacing })} width={100} />
      <NumberField label="Margin" value={settings.margin} onChange={(margin) => onChange({ margin })} width={100} />
      <NumberField label="Extrude" value={settings.extrude} onChange={(extrude) => onChange({ extrude })} width={100} />
      <NumberField label="Scale" value={settings.scale} onChange={(scale) => onChange({ scale })} min={0.1} step={0.1} width={100} />
      <NumberField label="Max width" value={settings.maxWidth} onChange={(maxWidth) => onChange({ maxWidth })} min={32} width={110} />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Align X</InputLabel>
        <Select label="Align X" value={settings.alignX} onChange={(e) => onChange({ alignX: e.target.value as AlignX })}>
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Align Y</InputLabel>
        <Select label="Align Y" value={settings.alignY} onChange={(e) => onChange({ alignY: e.target.value as AlignY })}>
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="bottom">Bottom</MenuItem>
        </Select>
      </FormControl>
      <TextField
        size="small"
        label="Background"
        value={settings.background}
        onChange={(e) => onChange({ background: e.target.value })}
        sx={{ minWidth: 160 }}
      />
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Image format</InputLabel>
        <Select
          label="Image format"
          value={settings.exportFormat}
          onChange={(e) => onChange({ exportFormat: e.target.value as ImageFormat })}
        >
          <MenuItem value="png">PNG</MenuItem>
          <MenuItem value="webp">WebP</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Atlas</InputLabel>
        <Select
          label="Atlas"
          value={settings.atlasFormat}
          onChange={(e) => onChange({ atlasFormat: e.target.value as AtlasFormat })}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="hash">TexturePacker JSON Hash</MenuItem>
          <MenuItem value="array">TexturePacker JSON Array</MenuItem>
          <MenuItem value="phaser3">Phaser 3</MenuItem>
          <MenuItem value="godot">Godot</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
      <FormControlLabel
        control={<Switch checked={settings.trimEnabled} onChange={(_, checked) => onChange({ trimEnabled: checked })} />}
        label="Trim transparent pixels"
      />
      <FormControlLabel
        control={<Switch checked={settings.powerOfTwo} onChange={(_, checked) => onChange({ powerOfTwo: checked })} />}
        label="Power-of-two sheet"
      />
      <FormControlLabel
        control={<Switch checked={settings.showGrid} onChange={(_, checked) => onChange({ showGrid: checked })} />}
        label="Show cell grid"
      />
      <FormControlLabel
        control={<Switch checked={settings.showIndices} onChange={(_, checked) => onChange({ showIndices: checked })} />}
        label="Show frame numbers"
      />
      <FormControlLabel
        control={<Switch checked={settings.pixelated} onChange={(_, checked) => onChange({ pixelated: checked })} />}
        label="Pixelated preview"
      />
    </Box>
    </AccordionDetails>
  </Accordion>
);
