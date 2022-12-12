import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundBlock from './BackgroundBlock';
import BackgroundWave from './BackgroundWave';
import config from '../../config.json';
import BackgroundParticles from './BackgroundParticles';

function Background () {
  const backgroundIndex = useSelector(state => state.background);
  switch (backgroundIndex) {
    case 1: return <BackgroundWave />;
    case 2:
    case 3:
    case 4:
    case 5: return <BackgroundParticles bgIndex={backgroundIndex} />;
    case 6: return <BackgroundBlock dim={config.BLOCK_BG_DIM_SMALL} />;
    case 7: return <BackgroundBlock dim={config.BLOCK_BG_DIM_LARGE} />;
    case 8: return <BackgroundBlock dim={config.BLOCK_BG_DIM_XLARGE} />;
    default: return null;
  }
}

export default Background;
