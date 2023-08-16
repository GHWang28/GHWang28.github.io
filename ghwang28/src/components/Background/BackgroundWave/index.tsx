import React from 'react';
import { Box, keyframes } from '@mui/material';
import Wave from 'react-wavify';
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

const BackgroundWave = () => {
  const options = {
    height: 20,
    amplitude: 20,
    speed: 0.3,
    points: 9
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', bottom: '0px', zIndex: -1 }}>
      <div style={{ opacity: 0.05, position: 'absolute', width: '100vw', height: '40vh', bottom: '0px', background: 'linear-gradient(to bottom, transparent 20%, whitesmoke 20%)'}}>
        <Wave fill='whitesmoke' options={options}/>
      </div>
      <div style={{ opacity: 0.05, position: 'absolute', width: '100vw', height: '35vh', bottom: '0px', background: 'linear-gradient(to bottom, transparent 30%, whitesmoke 30%)'}}>
        <Wave fill='whitesmoke' options={options}/>
      </div>
      <BoatIcon
        sx={{
          position: 'absolute',
          bottom: '29vh',
          left: '10vw',
          scale: '4.5',
          animation: `${bobbingAnimation} 5.0s ease-in-out infinite`,
          animationDelay: '-0.5s'
        }}
      />
      <div style={{ opacity: 0.05, position: 'absolute', width: '100vw', height: '30vh', bottom: '0px', background: 'linear-gradient(to bottom, transparent 40%, whitesmoke 40%)'}}>
        <Wave fill='whitesmoke' options={{ ...options, speed: 0.2, points: 8 }} />
      </div>
      <div style={{ opacity: 0.05, position: 'absolute', width: '100vw', height: '25vh', bottom: '0px', background: 'linear-gradient(to bottom, transparent 50%, whitesmoke 50%)'}}>
        <Wave fill='whitesmoke' options={{ ...options, speed: 0.4, points: 5 }} />
      </div>
    </Box>
  )
}

export default BackgroundWave;
