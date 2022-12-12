import React from 'react';
import { Box, Grid, keyframes } from '@mui/material';
import Block from './Block';
import PropTypes from 'prop-types';

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

function BackgroundBox ({ dim }) {
  return (
    <Box sx={{ opacity: 0.09, position: 'fixed', width: 'max(100vw, 100vh)', height: 'max(100vw, 100vh)', bottom: 0, zIndex: -999 }}>
      <Grid container sx={{ width: '100%', height: '100%' }}>
        {[...Array(dim * dim)].map((_, index) => (
          <Block
            key={`block-${index}`}
            animation = {flashAnimation}
            dim={dim}
          />
        ))}
      </Grid>
    </Box>
  )
}

BackgroundBox.propTypes = {
  dim: PropTypes.number
};

export default BackgroundBox;
