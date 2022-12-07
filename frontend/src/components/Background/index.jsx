import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundCubes from './BackgroundCubes';
import BackgroundWave from './BackgroundWave';

function Background () {
  const backgroundIndex = useSelector(state => state.background);

  switch (backgroundIndex) {
    case 1: return <BackgroundWave />;
    case 2: return <BackgroundCubes />
    default: return null;
  }
}

export default Background;
