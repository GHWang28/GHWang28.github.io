import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundBlock from './BackgroundBlock';
import BackgroundWave from './BackgroundWave';
import config from '../../config.json';
import BackgroundParticles from './BackgroundParticles';
import { Box } from '@mui/material';

function Background () {
  const themeMode = useSelector(state => state.themeMode);
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: (themeMode === 'light') ? 'invert(100%)' : '',
        width: '100vw',
        height: '100vh',
        zIndex: -999
      }}
    >
      <BackgroundInner/>
    </Box>
  )
}

function BackgroundInner () {
  const backgroundIndex = useSelector(state => state.background);
  switch (backgroundIndex) {
    case 1: return (
      <Box
        sx={{
          position: 'fixed',
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
    )
    case 2: return <BackgroundWave />;
    case 3:
    case 4:
    case 5:
    case 6: return <BackgroundParticles bgIndex={backgroundIndex} />;
    case 7: return <BackgroundBlock dim={config.BLOCK_BG_DIM_SMALL} />;
    case 8: return <BackgroundBlock dim={config.BLOCK_BG_DIM_LARGE} />;
    default: return null;
  }
}

export default Background;
