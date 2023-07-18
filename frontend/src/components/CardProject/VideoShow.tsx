import React from 'react';
import { Box } from '@mui/material';

type ComponentProps = {
  src: string
}

const VideoShow = ({ src }: ComponentProps) => {
  return (
    <Box
      component='video'
      muted
      loop
      autoPlay
      sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        width: '100%',
        height: '100%',
        transition: 'opacity 0.5s ease-in-out',
        objectFit: 'cover',
        zIndex: -2,
      }}
    >
      <source src={src} type='video/mp4'/>
    </Box>
  )
}

export default VideoShow;
