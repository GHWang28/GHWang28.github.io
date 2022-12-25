import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundBlock from './BackgroundBlock';
import BackgroundWave from './BackgroundWave';
import config from '../../config.json';
import BackgroundParticles from './BackgroundParticles';
import { Box } from '@mui/material';

function Background () {
  const backgroundIndex = useSelector(state => state.background);
  switch (backgroundIndex) {
    case 1: return (
      <Box
        component='img'
        sx={{
          position: 'fixed',
          bottom: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          opacity: 0.75,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: -32
        }}
        src='/images/background/skyscraper.svg'
        alt='background-chipped'
      />
    )
    case 2: return (
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
    case 3: return <BackgroundWave />;
    case 4:
    case 5:
    case 6:
    case 7: return <BackgroundParticles bgIndex={backgroundIndex} />;
    case 8: return <BackgroundBlock dim={config.BLOCK_BG_DIM_SMALL} />;
    case 9: return <BackgroundBlock dim={config.BLOCK_BG_DIM_LARGE} />;
    case 10: return <BackgroundBlock dim={config.BLOCK_BG_DIM_XLARGE} />;
    default: return null;
  }
}

export default Background;
