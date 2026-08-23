import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, Paper, Slider, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Frame, SheetLayout, SheetSettings } from '../types';
import { hitTestCell, overlayRects, previewGroupMove, renderSheet } from '../utils';

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 8;
const DRAG_THRESHOLD = 4;

const clampZoom = (value: number): number =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));

type DragState = {
  id: string;
  groupIds: string[];
  pointerX: number;
  pointerY: number;
  hoverIndex: number | null;
};

type Props = {
  frames: Frame[];
  slots: Array<string | null>;
  layout: SheetLayout;
  settings: SheetSettings;
  selectedIds: string[];
  onSelect: (id: string, additive?: boolean) => void;
  onMoveGroupToCell: (anchorId: string, cellIndex: number, groupIds: string[]) => void;
};

export const SheetPreview: React.FC<Props> = ({
  frames,
  slots,
  layout,
  settings,
  selectedIds,
  onSelect,
  onMoveGroupToCell,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hover, setHover] = useState<{ index: number; clientX: number; clientY: number } | null>(null);
  const pendingRef = useRef<{ id: string; x: number; y: number; additive: boolean } | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const selectedRef = useRef(selectedIds);
  dragRef.current = drag;
  selectedRef.current = selectedIds;

  const overlays = useMemo(() => overlayRects(layout, settings), [layout, settings]);
  const selected = useMemo(() => new Set(selectedIds), [selectedIds]);
  const frameById = useMemo(() => new Map(frames.map((frame) => [frame.id, frame])), [frames]);
  const hiddenIds = useMemo(() => (drag ? new Set(drag.groupIds) : new Set<string>()), [drag]);
  const groupPreview = useMemo(() => {
    if (!drag || drag.hoverIndex === null) return null;
    return previewGroupMove(
      slots,
      drag.groupIds,
      drag.id,
      drag.hoverIndex,
      layout.columns,
      layout.rows
    );
  }, [drag, layout.columns, layout.rows, slots]);
  const destIndexes = useMemo(() => new Set(groupPreview?.destIndexes ?? []), [groupPreview]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = layout.width;
    canvas.height = layout.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = !settings.pixelated;
    renderSheet(ctx, frames, layout, settings, { preview: true, hiddenIds });
  }, [frames, hiddenIds, layout, settings]);

  const clientToSheet = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
    return {
      x: ((clientX - rect.left) / rect.width) * layout.width,
      y: ((clientY - rect.top) / rect.height) * layout.height,
    };
  };

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const pending = pendingRef.current;
      if (pending && !dragRef.current) {
        const dx = event.clientX - pending.x;
        const dy = event.clientY - pending.y;
        if (dx * dx + dy * dy < DRAG_THRESHOLD * DRAG_THRESHOLD) return;
        const currentSelected = selectedRef.current;
        const groupIds = currentSelected.includes(pending.id) && currentSelected.length > 1
          ? [...currentSelected]
          : [pending.id];
        const start: DragState = {
          id: pending.id,
          groupIds,
          pointerX: event.clientX,
          pointerY: event.clientY,
          hoverIndex: null,
        };
        pendingRef.current = null;
        dragRef.current = start;
        setDrag(start);
      }
      if (!dragRef.current) return;
      const point = clientToSheet(event.clientX, event.clientY);
      const cell = hitTestCell(overlays, point.x, point.y);
      setHover(cell ? { index: cell.index, clientX: event.clientX, clientY: event.clientY } : null);
      setDrag({
        id: dragRef.current.id,
        groupIds: dragRef.current.groupIds,
        pointerX: event.clientX,
        pointerY: event.clientY,
        hoverIndex: cell?.index ?? null,
      });
    };

    const onUp = () => {
      const current = dragRef.current;
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (current && current.hoverIndex !== null) {
        onMoveGroupToCell(current.id, current.hoverIndex, current.groupIds);
      } else if (pending) {
        onSelect(pending.id, pending.additive);
      }
      if (current) {
        dragRef.current = null;
        setDrag(null);
        setHover(null);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [layout.height, layout.width, onMoveGroupToCell, onSelect, overlays]);

  const anchorRect = drag ? overlays.find((rect) => rect.id === drag.id) : undefined;
  const draggedFrames = drag
    ? drag.groupIds.flatMap((id) => {
      const frame = frameById.get(id);
      const rect = overlays.find((item) => item.id === id);
      return frame && rect ? [{ frame, rect }] : [];
    })
    : [];
  const hoverCell = hover ? overlays.find((rect) => rect.index === hover.index) : undefined;
  const hoverFrame = hoverCell?.id ? frameById.get(hoverCell.id) : undefined;
  const hoverCol = hover ? hover.index % Math.max(1, layout.columns) : 0;
  const hoverRow = hover ? Math.floor(hover.index / Math.max(1, layout.columns)) : 0;
  const hoverIndex = hover ? hover.index : 0;

  return (
    <Paper sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1, minHeight: 320 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>
          Sheet preview
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.75 }}>
          {`${layout.width}×${layout.height} · ${layout.columns}×${layout.rows} · ${layout.cellWidth}×${layout.cellHeight} cells`}
        </Typography>
        <Typography variant="caption" sx={{ width: 40, textAlign: 'right' }}>
          {`${Math.round(zoom * 100)}%`}
        </Typography>
        <IconButton size="small" onClick={() => setZoom((value) => clampZoom(value * 0.8))}>
          <ZoomOutIcon fontSize="small" />
        </IconButton>
        <Slider
          size="small"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={(_, value) => setZoom(value as number)}
          sx={{ width: 110 }}
        />
        <IconButton size="small" onClick={() => setZoom((value) => clampZoom(value / 0.8))}>
          <ZoomInIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          bgcolor: 'rgba(0,0,0,0.28)',
          borderRadius: 1,
          p: 1,
          userSelect: 'none',
        }}
      >
        <Box sx={{ position: 'relative', width: layout.width * zoom, height: layout.height * zoom, mx: 'auto' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={(event) => {
              if (event.button !== 0) return;
              const point = clientToSheet(event.clientX, event.clientY);
              const cell = hitTestCell(overlays, point.x, point.y);
              if (!cell?.id) return;
              pendingRef.current = {
                id: cell.id,
                x: event.clientX,
                y: event.clientY,
                additive: event.metaKey || event.ctrlKey || event.shiftKey,
              };
              event.preventDefault();
            }}
            onMouseMove={(event) => {
              if (dragRef.current) return;
              const point = clientToSheet(event.clientX, event.clientY);
              const cell = hitTestCell(overlays, point.x, point.y);
              setHover(cell ? { index: cell.index, clientX: event.clientX, clientY: event.clientY } : null);
            }}
            onMouseLeave={() => {
              if (!dragRef.current) setHover(null);
            }}
            style={{
              width: '100%',
              height: '100%',
              imageRendering: settings.pixelated ? 'pixelated' : 'auto',
              cursor: drag ? 'grabbing' : 'grab',
              display: 'block',
            }}
          />
          {overlays.map((rect) => {
            const isSelected = Boolean(rect.id && selected.has(rect.id) && !hiddenIds.has(rect.id));
            const isHover = hover?.index === rect.index && !drag;
            const isDest = destIndexes.has(rect.index);
            const destInvalid = Boolean(drag && groupPreview && !groupPreview.valid && isHover);
            if (!settings.showGrid && !isSelected && !settings.showIndices && !isHover && !isDest) return null;
            return (
              <Box
                key={`overlay-${rect.index}-${rect.id || 'empty'}`}
                sx={{
                  position: 'absolute',
                  left: rect.x * zoom,
                  top: rect.y * zoom,
                  width: Math.max(1, rect.w * zoom),
                  height: Math.max(1, rect.h * zoom),
                  pointerEvents: 'none',
                  outline: destInvalid
                    ? '2px solid #ef5350'
                    : isDest
                      ? '2px solid #80deea'
                      : isHover || isSelected
                        ? '2px solid #80deea'
                        : settings.showGrid
                          ? '1px solid rgba(255,255,255,0.45)'
                          : 'none',
                  outlineOffset: '-1px',
                  bgcolor: destInvalid
                    ? 'rgba(239,83,80,0.18)'
                    : isDest || isHover
                      ? 'rgba(128,222,234,0.18)'
                      : 'transparent',
                  boxSizing: 'border-box',
                }}
              >
                {settings.showIndices && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      px: 0.4,
                      bgcolor: 'rgba(0,0,0,0.55)',
                      color: '#fff',
                      fontSize: 10,
                      lineHeight: '14px',
                    }}
                  >
                    {rect.index}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      {drag && anchorRect && draggedFrames.map(({ frame, rect }) => (
        <Box
          key={`ghost-${frame.id}`}
          sx={{
            position: 'fixed',
            left: drag.pointerX + (rect.x - anchorRect.x) * zoom,
            top: drag.pointerY + (rect.y - anchorRect.y) * zoom,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 30,
            opacity: 0.92,
            outline: '2px solid #80deea',
            outlineOffset: '-1px',
            bgcolor: 'rgba(0,0,0,0.35)',
            boxShadow: 4,
          }}
        >
          <Box
            component="img"
            src={frame.previewUrl}
            alt={frame.name}
            sx={{
              width: Math.max(24, rect.w * zoom),
              height: Math.max(24, rect.h * zoom),
              objectFit: 'contain',
              imageRendering: settings.pixelated ? 'pixelated' : 'auto',
              display: 'block',
            }}
          />
        </Box>
      ))}
      {hover && (
        <Box
          sx={{
            position: 'fixed',
            left: hover.clientX + 14,
            top: hover.clientY + 14,
            pointerEvents: 'none',
            zIndex: 31,
            px: 1,
            py: 0.75,
            bgcolor: 'rgba(18,18,18,0.94)',
            color: 'whitesmoke',
            boxShadow: 2,
            borderRadius: 1,
            minWidth: 120,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          }}
        >
          <Typography variant="caption" display="block" fontWeight={700}>
            {hoverFrame?.name || 'Empty'}
          </Typography>
          <Typography variant="caption" display="block">
            {`Row ${hoverRow} · Col ${hoverCol}`}
          </Typography>
          <Typography variant="caption" display="block">
            {`Index ${hoverIndex}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
