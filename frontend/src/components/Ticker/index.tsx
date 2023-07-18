import React from 'react';
import { Box, keyframes } from '@mui/system';
import { Typography, useTheme } from '@mui/material';

type ComponentProps = {
  width: string,
  children: React.ReactNode
}

const moveAnimation = keyframes`
  from {
    transform: translate(100%);
  }
  to {
    transform: translate(-100%);
  }
`;

const Ticker = ({ width, children }: ComponentProps) => {
  const themeMode = useTheme().palette.mode;

  return (
    <Box sx={{ overflow: 'hidden', width, bgcolor: 'black', border: `1px solid ${(themeMode === 'light') ? 'rgb(79,89,91)' : 'whitesmoke'}`, borderRadius: '5px', }}>
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

export default Ticker;

