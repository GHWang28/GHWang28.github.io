import React from 'react';
import PropTypes from 'prop-types';
import { Box, keyframes } from '@mui/system';
import { Typography } from '@mui/material';

const moveAnimation = keyframes`
  from {
    transform: translate(100%);
  }
  to {
    transform: translate(-100%);
  }
`;

function Ticker ({ width, children }) {
  return (
    <Box sx={{ overflow: 'hidden', width, bgcolor: 'black', border: '1px solid whitesmoke', borderRadius: '5px', }}>
      <Typography
        fontWeight='bold'
        p={1}
        sx={{
          animation: `${moveAnimation} linear 15s infinite`,
          width: 'fit-content'
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

Ticker.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.string.isRequired
};

export default Ticker;

