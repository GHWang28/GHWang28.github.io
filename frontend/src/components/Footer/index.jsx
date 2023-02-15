import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';

export default function Footer () {
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <Box
      component='footer'
      mt={5}
      sx={{
        height: '100px',
        width: '100vw',
        boxShadow: 'inset 0 50px 50px -6px rgba(0,0,0,0.5)'
      }}
    >
      <Box component='hr' sx={{ width: '95%' }} />
    </Box>
  )
}

