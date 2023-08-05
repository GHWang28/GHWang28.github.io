import React, { useState } from 'react';
import { Box, CircularProgress, BoxProps } from '@mui/material'
import { InView } from 'react-intersection-observer';
import { SpringValue } from 'react-spring';

type ComponentProps = BoxProps<'img'> & {
  springStyle?: { rotateY: SpringValue<string>; position: SpringValue<string>; },
}

const ImageLoader = ({ style, springStyle, ...props }: ComponentProps) => {
  const [inView, setInView] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  return (
    <InView rootMargin='9999999px 0px 0px 0px' onChange={(inView) => { setInView(inView) }}>
      {!isLoaded && (
        <Box sx={{ ...props?.sx, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'bgColor.transparent', color: 'contrastColor.main' }}>
          <CircularProgress color='inherit' />
        </Box>
      )}
      {(inView) && (
        <Box
          onLoad={() => { setIsLoaded(true) }}
          component='img'
          style={{ ...style, ...springStyle }}
          display={(isLoaded) ? 'block' : 'none'}
          {...props}
        />
      )}
    </InView>
  )
}

export default ImageLoader;
