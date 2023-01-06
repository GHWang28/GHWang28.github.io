import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * A div that contains Material UI chips
 */
function ChipContainer ({ children, width, maxHeight, style }) {
  const theme = useTheme();
  const chipContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'center',
    width,
    minHeight: '32px',
    maxHeight,
    overflowY: (maxHeight) ? 'auto' : '',
    m: '5px 0px',
    p: '5px',
    borderRadius: '20px',
    rowGap: '8px',
    border: `1px solid ${theme.palette.borderColor.main}`,
    bgcolor: 'bgColor.main'
  }

  return (
    <Box style={style} sx={chipContainerStyle}>
      {(children.length === 0) && (
        <Typography fontSize={18} sx={{ width: '100%', opacity: '0.7' }} align='center'>
          {'Empty'}
        </Typography>
      )}
      {children}
    </Box>
  )
}

ChipContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.string,
  maxHeight: PropTypes.string,
  style: PropTypes.object
};

export default ChipContainer;
