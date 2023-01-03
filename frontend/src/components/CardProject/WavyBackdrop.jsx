import React from 'react';
import { Box, keyframes } from '@mui/material';

const wavyUpAnimation = keyframes`
  0% {
    translate: 0px 0px
  }
  100% {
    translate: 0px -120px
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

export default function WavyBackdrop ({ bgColor, speed, yPos }) {
  return (
    <Box
      sx={{
        animation: `${wavyUpAnimation} ${speed}s linear infinite, ${wavySideAnimation} ${speed / 2}s ease-in-out infinite`,
        width: '100%',
        height: 'calc(100% + 120px)',
        position: 'absolute',
        top: 0,
        left: yPos,
        backgroundImage: `linear-gradient(90deg, ${bgColor} 65%, rgba(255,255,255,0) 150%)`,
        mask: `
          radial-gradient(46.86px at calc(100% - 66.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 60px)/100% 120px,
          radial-gradient(46.86px at calc(100% + 36.00px) 50%,#0000 99%,#000 101%) calc(100% - 30px) 50%/100% 120px repeat-y
        `,
        WebkitMask: `
          radial-gradient(46.86px at calc(100% - 66.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 60px)/100% 120px,
          radial-gradient(46.86px at calc(100% + 36.00px) 50%,#0000 99%,#000 101%) calc(100% - 30px) 50%/100% 120px repeat-y
        `,
        zIndex: -1
      }}
    />
  )
}