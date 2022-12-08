import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundBlock from './BackgroundBlock';
import BackgroundWave from './BackgroundWave';
import config from '../../config.json';

function Background () {
  const backgroundIndex = useSelector(state => state.background);

  switch (backgroundIndex) {
    case 1: return <BackgroundWave />;
    case 2: return <BackgroundBlock dim={config.BLOCK_BG_DIM_SMALL} />
    case 3: return <BackgroundBlock dim={config.BLOCK_BG_DIM_LARGE} />
    case 4: return <BackgroundBlock dim={config.BLOCK_BG_DIM_X_LARGE} />
    default: return null;
  }
}

export default Background;
