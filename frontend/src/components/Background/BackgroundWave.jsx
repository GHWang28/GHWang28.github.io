import React from 'react';
import { Box } from '@mui/material';
import Wave from 'react-wavify';
import WaveGradient from './WaveGradient';

function BackgroundWave () {
  const options = {
    height: 20,
    amplitude: 20,
    speed: 0.3,
    points: 9
  }
  return (
    <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', bottom: '0px', zIndex: -999 }}>
      <Box sx={{ opacity: 0.2, position: 'absolute', width: '100vw', height: '35vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={options}>
          <WaveGradient />
        </Wave>
      </Box>
      <Box sx={{ opacity: 0.5, position: 'absolute', width: '100vw', height: '30vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={{ ...options, speed: 0.2, points: 8 }} />
      </Box>
      <Box sx={{ opacity: 0.8, position: 'absolute', width: '100vw', height: '25vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={{ ...options, speed: 0.4, points: 5 }} />
      </Box>
    </Box>
  )
}

export default BackgroundWave;
