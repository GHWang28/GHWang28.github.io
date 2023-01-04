import React from 'react';
import { Box, keyframes } from '@mui/material';
import PropTypes from 'prop-types';

export default function WavyBackdrop ({ bgColor, speed, yPos, direction, inView }) {
  const wavyUpAnimation = keyframes`
    0% {
      translate: 0px 0px
    }
    100% {
      translate: 0px ${(direction === 'up') ? '-' : ''}120px
    }
  `

  const wavySideAnimation = keyframes`
    0% {
      transform: translateX(10px)
    }
    50% {
      transform: translateX(-10px)
    }
    100% {
      transform: translateX(10px)
    }
  `

  return (
    /* Wave contained in another div to separate inView animation and the wavy animation */
    <Box
      sx={{
        width: '100%',
        height: 'calc(100% + 120px)',
        position: 'absolute',
        top: (direction === 'up') ? '0px' : '-120px',
        left: yPos,
        translate: (inView) ? '0%' : '-60%',
        transition: 'translate 1.5s ease-in-out',
        zIndex: -1
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          animation: `${wavyUpAnimation} ${speed}s linear infinite, ${wavySideAnimation} ${speed / 2}s ease-in-out infinite`,
          backgroundImage: `linear-gradient(90deg, ${bgColor} 65%, rgba(255,255,255,0) 150%)`,
          mask: `
            radial-gradient(46.86px at calc(100% - 66.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 60px)/100% 120px,
            radial-gradient(46.86px at calc(100% + 36.00px) 50%,#0000 99%,#000 101%) calc(100% - 30px) 50%/100% 120px repeat-y
          `,
          WebkitMask: `
            radial-gradient(46.86px at calc(100% - 66.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 60px)/100% 120px,
            radial-gradient(46.86px at calc(100% + 36.00px) 50%,#0000 99%,#000 101%) calc(100% - 30px) 50%/100% 120px repeat-y
          `
        }}
      />
    </Box>
  )
}

WavyBackdrop.propTypes = {
  bgColor: PropTypes.string,
  speed: PropTypes.number,
  yPos: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),
  inView: PropTypes.bool
};
