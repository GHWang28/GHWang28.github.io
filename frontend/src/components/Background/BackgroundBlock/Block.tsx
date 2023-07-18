import React, { useEffect } from 'react';
import { Grid,  } from '@mui/material';
import { rng } from '../../../helpers';
import { useState } from 'react';
import { Keyframes } from '@emotion/react';

type ComponentProps = {
  animation: Keyframes,
  dim: number
}

const Block = ({ animation, dim } : ComponentProps) => {

  const [pulsate, setPulsate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPulsate(!pulsate);
    }, rng(2000, 10000));

    return () => { clearTimeout(timeout) }
  })

  return (
    <Grid
      item
      xs={12 / dim}
      sx={{
        bgcolor: 'whitesmoke',
        opacity: 0,
        animation: (pulsate) ? `${animation} 2.0s ease-in-out 1` : ''
      }}
    />
  )
}

export default Block;
