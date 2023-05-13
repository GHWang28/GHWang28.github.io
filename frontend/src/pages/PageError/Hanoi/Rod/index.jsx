import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";

export default function Rod () {
  const themeMode = useTheme().palette.mode === 'light';

  return (
    <Box sx={{ opacity: 0.5, zIndex: -1, pointerEvents: 'none' }}>
      {/* Middle stick */}
      <Box
        sx={{
          height: '90%',
          width: '2%',
          minHeight: '50px',
          bgcolor: (themeMode) ? 'rgb(0,0,0)' : 'rgb(245,245,245)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
        }}
      />
      {/* Base stick */}
      <Box
        sx={{
          height: '2%',
          width: '90%',
          bgcolor: (themeMode) ? 'rgb(0,0,0)' : 'rgb(245,245,245)',
          position: 'absolute',
          left: '50%',
          bottom: '2%',
          translate: '-50% -50%'
        }}
      />
    </Box>
  )
}
