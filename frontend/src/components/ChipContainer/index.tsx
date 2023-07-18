import React from 'react';
import { Box, Typography } from '@mui/material';

type ComponentProps = {
  children: React.ReactNode[],
}

/**
 * A div that contains Material UI chips
 */
const ChipContainer = ({ children }: ComponentProps) => {
  const chipContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'center',
    minHeight: '32px',
    overflowY: 'auto',
    m: '5px 0px',
    rowGap: '8px',
  }

  return (
    <Box sx={chipContainerStyle}>
      {(children.length === 0) && (
        <Typography fontSize={18} sx={{ width: '100%', opacity: '0.7' }} align='center'>
          {'Empty'}
        </Typography>
      )}
      {children}
    </Box>
  )
}


export default ChipContainer;
