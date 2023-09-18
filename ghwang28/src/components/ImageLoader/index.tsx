import React, { useState } from 'react';
import { Box, CircularProgress, BoxProps, SxProps } from '@mui/material'
import { SpringValue } from '@react-spring/web';

type ComponentProps = BoxProps<'img'> & {
  springStyle?: { rotateY: SpringValue<string>; position: SpringValue<string>; },
  imageSx?: SxProps
}

const ImageLoader = ({ style, sx, springStyle, imageSx = { width: '100%', height: '100%' }, ...props }: ComponentProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  return (
    <Box
      sx={{
        ...sx,
        position: 'relative',
        color: 'contrastColor.main',
        overflow: 'clip'
      }}
    >
      {!isLoaded && (
        <CircularProgress sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
        }} color='inherit' />
      )}
      <Box
        onLoad={() => { setIsLoaded(true) }}
        component='img'
        loading='lazy'
        draggable={false}
        visibility={(isLoaded) ? 'visible' : 'hidden'}
        sx={{ ...imageSx, objectFit: 'contain' }}
        {...props}
        style={{ ...style, ...springStyle }}
      />
    </Box>
  )
}

export default ImageLoader;
