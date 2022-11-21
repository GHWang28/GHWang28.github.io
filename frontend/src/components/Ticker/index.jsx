import React from 'react';
import PropTypes from 'prop-types';
import { Box, keyframes } from '@mui/system';

const moveAnimation = keyframes`
  from {
    transform: translate(100%);
  }
  to {
    transform: translate(-100%);
  }
`;

function Ticker ({ children }) {
  return (
    <Box sx={{ overflow: 'hidden', width: '40vw', bgcolor: 'black', border: '1px solid whitesmoke', borderRadius: '5px', }}>
      <Box
        p={1}
        sx={{
          animation: `${moveAnimation} linear 15s infinite`,
          width: 'fit-content',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

Ticker.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default Ticker;

