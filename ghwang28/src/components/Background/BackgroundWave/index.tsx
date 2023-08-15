import React from 'react';
import { Box, keyframes } from '@mui/material';
import Wave from 'react-wavify';
import WaveGradient from './WaveGradient';
import BoatIcon from '../../../icons/BoatIcon';

const bobbingAnimation = keyframes`
  0% {
    translate: 0% -100%;
    rotate: 7.5deg;
  }
  50% {
    translate: 0% 0%;
    rotate: -7.5deg;
  }
  100% {
    translate: 0% -100%;
    rotate: 7.5deg;
  }
`

function BackgroundWave () {
  const options = {
    height: 20,
    amplitude: 20,
    speed: 0.3,
    points: 9
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', bottom: '0px', zIndex: -1 }}>
      <Box sx={{ opacity: 0.025, position: 'absolute', width: '100vw', height: '40vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={options}>
          <WaveGradient />
        </Wave>
      </Box>
      <Box sx={{ opacity: 0.05, position: 'absolute', width: '100vw', height: '35vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={options}>
          <WaveGradient />
        </Wave>
      </Box>
      <BoatIcon
        sx={{
          opacity: '1',
          position: 'absolute',
          bottom: '29vh',
          left: '10vw',
          scale: '4.5',
          animation: `${bobbingAnimation} 5.0s ease-in-out infinite`,
          animationDelay: '-0.5s'
        }}
      />
      <Box sx={{ opacity: 0.10, position: 'absolute', width: '100vw', height: '30vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={{ ...options, speed: 0.2, points: 8 }} />
      </Box>
      <Box sx={{ opacity: 0.15, position: 'absolute', width: '100vw', height: '25vh', bottom: '0px'}}>
        <Wave fill='url(#wave-gradient)' options={{ ...options, speed: 0.4, points: 5 }} />
      </Box>
    </Box>
  )
}

export default BackgroundWave;
