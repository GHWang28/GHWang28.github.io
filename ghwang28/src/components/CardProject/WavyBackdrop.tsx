import React from 'react';
import { Box, keyframes } from '@mui/material';

type ComponentProps = {
  bgColor: string,
  speed: number,
  yPos: string,
  direction: 'up' | 'down',
  inView: boolean
}

const WavyBackdrop = ({ bgColor, speed, yPos, direction, inView }: ComponentProps) => {
  const wavyUpAnimation = keyframes`
    0% {
      translate: 0px 0px
    }
    100% {
      translate: 0px ${(direction === 'up') ? '-' : ''}240px
    }
  `
  const wavySideAnimation = keyframes`
    0% {
      transform: translateX(15px)
    }
    50% {
      transform: translateX(-15px)
    }
    100% {
      transform: translateX(15px)
    }
  `
  const waveMask = `
    radial-gradient(98.41px at calc(100% - 138.00px) 50%,#000 99%,#0000 101%) 0 calc(50% - 120px)/100% 240px,
    radial-gradient(98.41px at calc(100% + 78.00px) 50%,#0000 99%,#000 101%) calc(100% - 60px) 50%/100% 240px repeat-y
  `
  return (
    /* Wave contained in another div to separate inView animation and the wavy animation */
    <div
      style={{
        width: '200%',
        height: 'calc(100% + 240px)',
        position: 'absolute',
        top: (direction === 'up') ? '0px' : '-240px',
        left: yPos,
        translate: (inView) ? '-50%' : '15%',
        transition: 'translate 2.0s ease-out',
        userSelect: 'none',
        zIndex: -1
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          animation: `${wavyUpAnimation} ${speed}s linear infinite, ${wavySideAnimation} ${speed / 2}s ease-in-out -${(direction === 'up') ? speed / 8 : 0}s infinite`,
          backgroundImage: `linear-gradient(90deg, ${bgColor} 65%, rgba(255,255,255,0) 150%)`,
          mask: waveMask,
          WebkitMask: waveMask
        }}
      />
    </div>
  )
}

export default WavyBackdrop;
