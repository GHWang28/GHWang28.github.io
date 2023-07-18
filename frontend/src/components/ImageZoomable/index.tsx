import React from 'react';
import { Box } from '@mui/material';
import { setImageZoom } from '../../redux/actions';
import { BoxProps } from '@mui/material';
import { useAppDispatch } from '../../hooks';

type ComponentProps = BoxProps<'img'> & {
  alternateSrc?: string
}

const ImageZoomable = ({ src = '', sx, alternateSrc = '', ...props }: ComponentProps) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      component='img'
      src={src}
      {...props}
      sx={{
        ...sx,
        cursor: 'pointer'
      }}
      onClick={() => { dispatch(setImageZoom(alternateSrc || src)) }}
    />
  )
}

export default ImageZoomable;
