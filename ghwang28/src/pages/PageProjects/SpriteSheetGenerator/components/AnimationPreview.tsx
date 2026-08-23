import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, Paper, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Frame } from '../types';
import BootstrapTooltip from '../../../../components/BootstrapTooltip';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 16;

const clampZoom = (value: number): number =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));

type Props = {
  frames: Frame[];
  selectedIds: string[];
};

export const AnimationPreview: React.FC<Props> = ({ frames, selectedIds }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [fps, setFps] = useState(8);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'loop' | 'pong'>('loop');
  const [zoom, setZoom] = useState(1.00);
  const [fullscreen, setFullscreen] = useState(false);
  const direction = useRef(1);

  const playback = useMemo(() => {
    if (selectedIds.length === 0) return frames;
    const selected = new Set(selectedIds);
    const subset = frames.filter((frame) => selected.has(frame.id));
    return subset.length > 0 ? subset : frames;
  }, [frames, selectedIds]);

  const playbackKey = playback.map((frame) => frame.id).join(',');

  useEffect(() => {
    setIndex(0);
    direction.current = 1;
  }, [playbackKey]);

  useEffect(() => {
    const frame = playback[index] || playback[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = frame?.width || 64;
    const height = frame?.height || 64;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#3a3a3a';
    for (let y = 0; y < height; y += 8) {
      for (let x = 0; x < width; x += 8) {
        if ((x / 8 + y / 8) % 2 === 0) ctx.fillRect(x, y, 8, 8);
      }
    }
    if (frame) ctx.drawImage(frame.image, 0, 0);
  }, [index, playback]);

  useEffect(() => {
    if (!playing || playback.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (mode === 'loop') return (current + 1) % playback.length;
        let next = current + direction.current;
        if (next >= playback.length - 1 || next <= 0) {
          direction.current *= -1;
          next = Math.max(0, Math.min(playback.length - 1, next));
        }
        return next;
      });
    }, Math.max(16, 1000 / fps));
    return () => window.clearInterval(timer);
  }, [fps, mode, playback.length, playing]);

  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement === rootRef.current);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === rootRef.current) {
        await document.exitFullscreen();
        return;
      }
      await rootRef.current?.requestFullscreen();
    } catch {
      setFullscreen((value) => !value);
    }
  };

  const current = playback[index];
  const displayWidth = Math.max(16, (current?.width || 64) * zoom);
  const displayHeight = Math.max(16, (current?.height || 64) * zoom);

  return (
    <Paper
      ref={rootRef}
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        ...(fullscreen ? {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          bgcolor: 'bgColor.main',
          ...(document.fullscreenElement === rootRef.current ? {} : {
            position: 'fixed',
            inset: 0,
            zIndex: 20,
          }),
        } : {}),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>
          Animation
        </Typography>
        <Typography variant="caption" sx={{ width: 40, textAlign: 'right' }}>
          {`${Math.round(zoom * 100)}%`}
        </Typography>
        <BootstrapTooltip title="Zoom out">
          <IconButton size="small" onClick={() => setZoom((value) => clampZoom(value * 0.8))}>
            <ZoomOutIcon fontSize="small" />
          </IconButton>
        </BootstrapTooltip>
        <Slider
          size="small"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.25}
          value={zoom}
          onChange={(_, value) => setZoom(value as number)}
          sx={{ width: fullscreen ? 160 : 72 }}
        />
        <BootstrapTooltip title="Zoom in">
          <IconButton size="small" onClick={() => setZoom((value) => clampZoom(value / 0.8))}>
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </BootstrapTooltip>
        <BootstrapTooltip title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
          <IconButton size="small" onClick={() => void toggleFullscreen()}>
            {fullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
          </IconButton>
        </BootstrapTooltip>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'rgba(0,0,0,0.28)',
          borderRadius: fullscreen ? 0 : 1,
          p: 1,
          minHeight: fullscreen ? 0 : 96,
          flex: fullscreen ? 1 : undefined,
          overflow: 'auto',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: displayWidth,
            height: displayHeight,
            imageRendering: 'pixelated',
            flexShrink: 0,
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        <IconButton size="small" onClick={() => setIndex((value) => (value - 1 + playback.length) % Math.max(1, playback.length))}>
          <SkipPreviousIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => setPlaying((value) => !value)}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton size="small" onClick={() => setIndex((value) => (value + 1) % Math.max(1, playback.length))}>
          <SkipNextIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="caption" align="center" sx={{ opacity: 0.75 }}>
        {current ? `${current.name} · ${index + 1}/${playback.length}` : 'No frames'}
        {selectedIds.length > 0 ? ' · playing selection' : ' · playing all'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ width: 42 }}>{`${fps} fps`}</Typography>
        <Slider size="small" min={1} max={30} value={fps} onChange={(_, value) => setFps(value as number)} />
      </Box>
      <ToggleButtonGroup
        exclusive
        size="small"
        fullWidth
        value={mode}
        onChange={(_, value) => {
          if (value) setMode(value);
        }}
      >
        <ToggleButton value="loop">Loop</ToggleButton>
        <ToggleButton value="pong">Ping-pong</ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};
