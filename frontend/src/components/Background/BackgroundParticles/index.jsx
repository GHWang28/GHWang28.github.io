import React from 'react';
import Particles from 'react-particles';
import { useMediaQuery } from '@mui/material';
import { loadLinksPreset } from 'tsparticles-preset-links';
import { loadTrianglesPreset } from 'tsparticles-preset-triangles';
import { loadSnowPreset } from 'tsparticles-preset-snow';
import { loadStarsPreset } from 'tsparticles-preset-stars';

/**
 * The background particle option
 */
function BackgroundParticles ({ bgIndex }) {
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const totalParticles = () => {
    if (xLargeMq) return 200;
    if (largeMq) return 100;
    if (mediumMq) return 50;
    return 10;
  }

  const getPreset = () => {
    switch (bgIndex) {
      case 2: return 'links';
      case 3: return 'snow';
      case 4: return 'triangles';
      case 5: return 'stars';
      default: return '';
    }
  }

  const defaultOptions = {
    particles: {
      number: {
        value: totalParticles()
      }
    },
    background: {
      opacity: 0
    },
    fullScreen: {
      enable: true,
      zIndex: -1
    },
  }
  return (
    <Particles
      style={{
        opacity: 0.3
      }}
      options={{
        ...defaultOptions,
        preset: getPreset(),
      }}
      init={async (engine) => {
        await loadTrianglesPreset(engine);
        await loadLinksPreset(engine);
        await loadSnowPreset(engine);
        await loadStarsPreset(engine)
      }}
    />
  )
}

export default BackgroundParticles;