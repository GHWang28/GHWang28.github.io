import React from 'react';

/**
 * This component gives the fading gradient to the background
 * waves
 */
function WaveGradient () {
  return (
    <defs>
      <linearGradient id='wave-gradient' gradientTransform='rotate(90)'>
        <stop offset="0%" stopColor='rgba(245,245,245,0.2)' />
        <stop offset="50%" stopColor='rgba(245,245,245,0)' />
      </linearGradient>
    </defs>
  )
}

export default WaveGradient;
