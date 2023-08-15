import React from 'react';
import { Box, keyframes } from '@mui/system';
import { Typography, useTheme } from '@mui/material';

type ComponentProps = {
  width: string,
  children: React.ReactNode
}

const moveAnimation = keyframes`
  from {
    left: 100%;
  }
  to {
    left: -100%;
  }
`;

const Ticker = ({ width, children }: ComponentProps) => {
  const themeMode = useTheme().palette.mode;

  return (
    <Box py={1} sx={{ position: 'relative', overflow: 'hidden', width, height: '25px', bgcolor: 'black', border: `1px solid ${(themeMode === 'light') ? 'rgb(79,89,91)' : 'whitesmoke'}`, borderRadius: '5px' }}>
      <Typography
        fontWeight='bold'
        sx={{
          position: 'absolute',
          animation: `${moveAnimation} linear 12s infinite`,
          width: 'fit-content'
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default Ticker;

