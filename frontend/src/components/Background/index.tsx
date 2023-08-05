import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import BackgroundWave from './BackgroundWave';
import { useAppSelector } from '../../hooks';
import Canvas from './Canvas';
import blockPulsateAnim from './Canvas/Animators/blockPulsateAnim';
import rippleAnim from './Canvas/Animators/rippleAnim';
import mountainAnim from './Canvas/Animators/mountainAnim';
import rainAnim from './Canvas/Animators/rainAnim';
import { Position } from '../../types';

const Background = () => {
  const themeMode = useAppSelector(state => state.themeMode);
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        filter: (themeMode === 'light') ? 'invert(100%)' : '',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        zIndex: -999
      }}
    >
      <BackgroundInner/>
    </Box>
  )
}

const BackgroundInner = () => {
  const backgroundIndex = useAppSelector(state => state.background);
  const [hidden, setHidden] = useState<boolean>(false);
  const [midPos, setMidPos] = useState<Position>({ x: 0, y: 0});

  const theme = useTheme();
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery(theme.breakpoints.up('sm'));
  const largeMq = useMediaQuery(theme.breakpoints.up('sm'));

  // Handling when the document can be visible or not
  useEffect(() => {
    const handleVisibilityChange = () => {
      setHidden(document.hidden);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, []);

  // Handling resize
  useEffect(() => {
    const resize = () => {
      setMidPos({
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5
      });
    }
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);

  // If the page is hidden, then return null as background
  if (hidden) {
    return null;
  }

  switch (backgroundIndex) {
    case 0: return (
      <Canvas anim={(c: CanvasRenderingContext2D) => mountainAnim(c, midPos)} />
    );
    case 1: return (
      <Canvas
        anim={(c: CanvasRenderingContext2D) => rainAnim(
          c,
          (largeMq) ? (
            Math.floor(window.innerWidth / 3)
          ) : (mediumMq) ? (
            500
          ) : (smallMq) ? (
            250
          ) : (100)
        )}
      />
    );
    case 2: return <BackgroundWave />;
    case 3: return <Canvas anim={rippleAnim} />;
    case 4: return (
      <Canvas
        anim={(c: CanvasRenderingContext2D) => blockPulsateAnim(
          c,
          (largeMq) ? (
            250
          ) : (mediumMq) ? (
            200
          ) : (smallMq) ? (
            150
          ) : (100)
        )}
      />
    );
    case 5: return (
      <Canvas
        anim={(c: CanvasRenderingContext2D) => blockPulsateAnim(
          c,
          (largeMq) ? (
            125
          ) : (mediumMq) ? (
            100
          ) : (smallMq) ? (
            75
          ) : (50)
        )}
      />
    );
    case 6: return (
      <Box
        sx={{
          position: 'relative',
          opacity: 0.25,
          width: '100%',
          height: '100%',
          bottom: '0px',
          maskImage: 'url(/images/background/circuitry.svg)',
          maskSize: 'cover',
          maskRepeat: 'no-repeat',
          zIndex: -32
        }}
      >
        <Box
          className={'gradient-background-transparent'}
          sx={{ height: '100%', width: '100%' }}
        />
      </Box>
    );
    default: return null;
  }
}

export default Background;
