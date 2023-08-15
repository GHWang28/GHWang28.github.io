import React from 'react';
import { Box, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type ComponentProps = {
  fullscreen?: boolean
}

const PageLoading = ({ fullscreen = false }: ComponentProps) => {
  const lightMode = useTheme().palette.mode === 'light';

  return ((fullscreen) ? (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: (lightMode) ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
        color: (lightMode) ? 'black' : 'whitesmoke',
        zIndex: 99
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  ) : (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: (lightMode) ? 'black' : 'whitesmoke'
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  ))
}

export default PageLoading;
