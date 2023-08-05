import React from 'react';
import { setImageZoom } from '../../redux/actions';
import { BoxProps } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { SpringValue } from 'react-spring';
import ImageLoader from '../ImageLoader';

type ComponentProps = BoxProps<'img'> & {
  alternateSrc?: string,
  springStyle?: { rotateY: SpringValue<string>; position: SpringValue<string>; }
}

const ImageZoomable = ({ src = '', sx, alternateSrc = '', springStyle, style, ...props }: ComponentProps) => {
  const dispatch = useAppDispatch();
/* 
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
  ) */

  return (
    <ImageLoader
      src={src}
      style={style}
      springStyle={springStyle}
      sx={{
        ...sx,
        cursor: 'pointer'
      }}
      onClick={() => { dispatch(setImageZoom(alternateSrc || src)) }}
      {...props}
    />
  )
}

export default ImageZoomable;
