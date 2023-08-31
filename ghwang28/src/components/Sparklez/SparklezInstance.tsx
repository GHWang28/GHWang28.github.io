import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { rng } from '../../utils';
import { growShrink, spinAntiClockwise, spinClockwise } from './sparklezAnimation';

type ComponentProps = {
  color: string,
  size: number,
  top?: string,
  left?: string,
  zIndex?: number
}

const SparklezInstance = ({ color, size, top, left, zIndex }: ComponentProps) => {
  const [spinDirection, setSpinDirection] = useState<boolean>(false);

  useEffect(() => {
    setSpinDirection(Boolean(rng(0,1)))
  }, []);

  return (
    <Box
      component='span'
      sx={{
        animation: `${growShrink} 0.6s ease-in-out forwards`,
        '& svg': {
          animation: `${(spinDirection) ? spinClockwise : spinAntiClockwise} 0.6s linear forwards`
        }
      }}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        top, left, zIndex,
        translate: '-50% -50%'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 16 16'
        fill='none'
      >
        <path
          stroke='white'
          strokeWidth='1px'
          d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'
          fill={color}
        />
      </svg>
    </Box>
  );
}

export default SparklezInstance;
