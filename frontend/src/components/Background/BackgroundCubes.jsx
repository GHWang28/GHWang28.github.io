import React, { useEffect, useState } from 'react';
import { Box, Grid, keyframes } from '@mui/material';
import { shuffle } from '../../helpers';

const flashAnimation = keyframes`
  0% {
    background-color: rgba(255,255,255,0)
  }
  50% {
    background-color: rgba(255,255,255,1)
  }
  100% {
    background-color: rgba(255,255,255,0)
  }
`

const dim = 10;

function BackgroundCubes () {
  const [squares, setSquares] = useState([...Array(dim * dim)].map(() => false));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (order.length === 0) {
        const newOrder = shuffle([...Array(dim * dim).keys()]);
        console.log(newOrder);
        setOrder([...newOrder]);
        setSquares([...Array(dim * dim)].map(() => false));
        console.log('hey')
        return;
      }

      const newSquares = [...squares];
      const newIndex = order.shift();
      newSquares[newIndex] = true;
      setOrder([...order]);
      setSquares(newSquares);
    }, 500);
    return () => { clearTimeout(timeout) };
  })

  return (
    <Box sx={{ opacity: 0.2, position: 'fixed', width: 'max(100vw, 100vh)', height: 'max(100vw, 100vh)', bottom: 0, zIndex: -999 }}>
      <Grid container sx={{ width: '100%', height: '100%' }}>
        {squares.map((block, index) => (
          <Grid
            key={`block-${index}`}
            item
            xs={12 / dim}
            sx={{

              animation: (block) ? `${flashAnimation} 0.5s linear 1` : ''
            }}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default BackgroundCubes;
