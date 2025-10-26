import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useMount } from 'ahooks';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

type ComponentProps = {
  error?: Error
}

export const Fallback: React.FC<ComponentProps> = ({ error }) => {
  const themeMode = useTheme().palette.mode;
  const [visible, setVisible] = useState<boolean>(false)

  useMount(() => {
    // For animation
    setVisible(true)
  })

  const isDark = themeMode === 'dark';

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        opacity: visible ? '1' : '0',
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          alignItems: 'center',
          padding: 4,
          borderRadius: '15px',
          backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(245,245,245,0.5)'
        }}
      >
        <Box sx={{ color: isDark ? 'whitesmoke' : 'black', fontSize: 96 }}>
          <ErrorIcon fontSize="inherit" color="inherit" />
        </Box>
        <Typography variant="h4">
          {'An Error Occured'}
        </Typography>
        <Typography variant='h6'>
          {error?.message || 'Unknown Error'}
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<RefreshIcon />}
          // @ts-expect-error
          onClick={() => window.location.reload(true)} // Hard refresh
          sx={{ marginTop: 4 }}
        >
          {'Retry'}
        </Button>
      </Box>
    </Box>
  );
};
