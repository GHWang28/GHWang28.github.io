import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import BackgroundWave from './BackgroundWave';
import { useAppSelector } from '../../hooks';
import Canvas from './Canvas';
import blockPulsateAnim from './Canvas/Animators/blockPulsateAnim';
import rippleAnim from './Canvas/Animators/rippleAnim';

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      setHidden(document.hidden);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, []);

  // If the page is hidden, then return null as background
  if (hidden) {
    return null;
  }

  switch (backgroundIndex) {
    case 1: return <BackgroundWave />
    case 2: return <Canvas anim={rippleAnim} />;
    case 3: return <Canvas anim={(c: CanvasRenderingContext2D) => blockPulsateAnim(c, 200)}/>;
    case 4: return <Canvas anim={(c: CanvasRenderingContext2D) => blockPulsateAnim(c, 75)}/>;
    case 5: return (
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
