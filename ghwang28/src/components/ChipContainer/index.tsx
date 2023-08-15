import React from 'react';
import { Box, Typography } from '@mui/material';

type ComponentProps = {
  children: React.ReactNode[],
}

/**
 * A div that contains Material UI chips
 */
const ChipContainer = ({ children }: ComponentProps) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        width: '100%',
        gap: '3px',
        alignItems: 'center',
        minHeight: '32px',
        overflowY: 'hidden',
        m: '5px 0px',
        rowGap: '8px',
      }}
    >
      {(children.length === 0) ? (
        <Typography fontSize={18} sx={{ width: '100%', opacity: '0.7' }} align='center'>
          {'Empty'}
        </Typography>
      ) : ( children )}
    </Box>
  )
}


export default ChipContainer;
