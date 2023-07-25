import React from 'react';
import { Box } from '@mui/material';
import { setImageZoom } from '../../redux/actions';
import { BoxProps } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { SpringValue } from 'react-spring';

type ComponentProps = BoxProps<'img'> & {
  alternateSrc?: string,
  springStyle?: { rotateY: SpringValue<string>; position: SpringValue<string>; }
}

const ImageZoomable = ({ src = '', sx, alternateSrc = '', springStyle, style, ...props }: ComponentProps) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      component='img'
      src={src}
      {...props}
      style={{ ...style, ...springStyle }}
      sx={{
        ...sx,
        cursor: 'pointer'
      }}
      onClick={() => { dispatch(setImageZoom(alternateSrc || src)) }}
    />
  )
}

export default ImageZoomable;
