import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundBlock from './BackgroundBlock';
import BackgroundWave from './BackgroundWave';

function Background () {
  const backgroundIndex = useSelector(state => state.background);

  switch (backgroundIndex) {
    case 1: return <BackgroundWave />;
    case 2: return <BackgroundBlock />
    default: return null;
  }
}

export default Background;
