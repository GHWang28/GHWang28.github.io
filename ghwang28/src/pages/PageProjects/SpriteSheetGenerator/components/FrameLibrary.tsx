import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SortIcon from '@mui/icons-material/Sort';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Frame, SortMode } from '../types';
import BootstrapTooltip from '../../../../components/BootstrapTooltip';

type Props = {
  frames: Frame[];
  selectedIds: string[];
  onSelect: (id: string, additive?: boolean) => void;
  onRename: (id: string, name: string) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onMove: (delta: number) => void;
  onReorder: (fromId: string, toId: string) => void;
  onSort: (mode: SortMode) => void;
  onReverse: () => void;
};

export const FrameLibrary: React.FC<Props> = ({
  frames,
  selectedIds,
  onSelect,
  onRename,
  onRemove,
  onDuplicate,
  onMove,
  onReorder,
  onSort,
  onReverse,
}) => {
  const [sortAnchor, setSortAnchor] = useState<HTMLElement | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const selected = new Set(selectedIds);

  return (
    <Paper sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1, minHeight: 280 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>
          {`Frames (${frames.length})`}
        </Typography>
        <BootstrapTooltip title="Move earlier">
          <span>
            <IconButton size="small" disabled={!selectedIds.length} onClick={() => onMove(-1)}>
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </span>
        </BootstrapTooltip>
        <BootstrapTooltip title="Move later">
          <span>
            <IconButton size="small" disabled={!selectedIds.length} onClick={() => onMove(1)}>
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </span>
        </BootstrapTooltip>
        <BootstrapTooltip title="Duplicate">
          <span>
            <IconButton size="small" disabled={!selectedIds.length} onClick={onDuplicate}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </span>
        </BootstrapTooltip>
        <BootstrapTooltip title="Delete">
          <span>
            <IconButton size="small" disabled={!selectedIds.length} onClick={onRemove}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </span>
        </BootstrapTooltip>
        <IconButton size="small" onClick={(e) => setSortAnchor(e.currentTarget)}>
          <SortIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={onReverse}>
          <SwapVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
        {([
          ['name-asc', 'Name A–Z'],
          ['name-desc', 'Name Z–A'],
          ['size-desc', 'Largest first'],
          ['size-asc', 'Smallest first'],
        ] as Array<[SortMode, string]>).map(([mode, label]) => (
          <MenuItem
            key={mode}
            onClick={() => {
              onSort(mode);
              setSortAnchor(null);
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
      <Box sx={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75, py: 0.25 }}>
        {frames.length === 0 && (
          <Typography variant="body2" sx={{ opacity: 0.7, p: 1 }}>
            Import frames or drop images here. They do not need to be the same size.
          </Typography>
        )}
        {frames.map((frame, index) => {
          const isSelected = selected.has(frame.id);
          return (
            <Box
              key={frame.id}
              draggable
              onDragStart={(event) => {
                setDragId(frame.id);
                const image = event.currentTarget.querySelector('img');
                if (image) event.dataTransfer.setDragImage(image, 20, 20);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) onReorder(dragId, frame.id);
                setDragId(null);
              }}
              onClick={(e) => onSelect(frame.id, e.metaKey || e.ctrlKey || e.shiftKey)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 0.75,
                borderRadius: 1,
                cursor: 'grab',
                outline: isSelected ? '2px solid' : '1px solid',
                outlineColor: isSelected ? 'primary.main' : 'divider',
                outlineOffset: '-1px',
                bgcolor: isSelected ? 'action.selected' : 'transparent',
              }}
            >
              <Box
                component="img"
                src={frame.previewUrl}
                alt={frame.name}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain',
                  imageRendering: 'pixelated',
                  bgcolor: 'rgba(0,0,0,0.25)',
                  borderRadius: 0.5,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <TextField
                  size="small"
                  value={frame.name}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onRename(frame.id, e.target.value)}
                  variant="standard"
                  fullWidth
                />
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {`#${index} · ${frame.width}×${frame.height}`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      {selectedIds.length > 1 && (
        <Button size="small" onClick={onRemove}>
          {`Delete ${selectedIds.length} selected`}
        </Button>
      )}
    </Paper>
  );
};
