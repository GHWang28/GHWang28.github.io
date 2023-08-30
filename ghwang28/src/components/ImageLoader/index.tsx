import React, { useState } from 'react';
import { Box, CircularProgress, BoxProps, SxProps } from '@mui/material'
import { InView } from 'react-intersection-observer';
import { SpringValue } from '@react-spring/web';

type ComponentProps = BoxProps<'img'> & {
  springStyle?: { rotateY: SpringValue<string>; position: SpringValue<string>; },
  imageSx?: SxProps
}

const ImageLoader = ({ style, sx, springStyle, imageSx = { width: '100%', height: '100%' }, ...props }: ComponentProps) => {
  const [inView, setInView] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  return (
    <Box
      component={InView}
      rootMargin='9999999px 0px 0px 0px'
      onChange={(inView: boolean) => { setInView(inView) }}
      sx={{
        ...sx,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'contrastColor.main',
        overflow: 'clip'
      }}
    >
      {!isLoaded && (
        <CircularProgress color='inherit' />
      )}
      {(inView) && (
        <Box
          onLoad={() => { setIsLoaded(true) }}
          component='img'
          draggable={false}
          display={(isLoaded) ? 'block' : 'none'}
          sx={imageSx}
          {...props}
          style={{ ...style, ...springStyle }}
        />
      )}
    </Box>
  )
}

export default ImageLoader;
