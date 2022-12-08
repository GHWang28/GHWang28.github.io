import React from 'react';
import { Box, Grid, keyframes } from '@mui/material';
import Block from './Block';
import config from '../../../config.json';

const flashAnimation = keyframes`
  0% {
    opacity: 0.0
  }
  50% {
    opacity: 1.0
  }
  100% {
    opacity: 0.0
  }
`

function BackgroundBox () {
  return (
    <Box sx={{ opacity: 0.07, position: 'fixed', width: 'max(100vw, 100vh)', height: 'max(100vw, 100vh)', bottom: 0, zIndex: -999 }}>
      <Grid container sx={{ width: '100%', height: '100%' }}>
        {[...Array(config.BLOCK_BG_DIM * config.BLOCK_BG_DIM)].map((_, index) => (
          <Block
            key={`block-${index}`}
            animation = {flashAnimation}
            dim={config.BLOCK_BG_DIM}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default BackgroundBox;
