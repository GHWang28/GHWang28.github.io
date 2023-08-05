import React from 'react';
import { Box, Grid, Typography, useMediaQuery, Theme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ImageZoomable from '../ImageZoomable';
import { useResizeObserver } from '../../hooks';

type ComponentProps = {
  src: string,
  title: string,
  body: string,
  rowNo: number,
  aspectRatio?: number,
}

const ImageRow = ({ src, title, body, aspectRatio = 1, rowNo }: ComponentProps) => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const [imageRef, dim] = useResizeObserver<HTMLDivElement>();
  const mediumMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isOdd = (rowNo % 2);

  const imgCol = (
    <Grid ref={imageRef} key={`${title}-img`} item xs={12} md={8.7}>
      <ImageZoomable
        src={src}
        alt={'Artwork'}
        sx={{
          transition: 'scale 0.2s ease-in-out',
          '&:hover': {
            scale: '1.025'
          },
          borderRadius: '2%',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'contrastColor.main',
          width: `${dim.width}px`,
          height: `${dim.width / aspectRatio}px`,
        }}
      />
    </Grid>
  )
  const textCol = (
    <Grid key={`${title}-txt`} item xs={12} md={3.3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box
        p={{ md: 2, xs: 0 }}
        m={1}
        sx={{
          bgcolor: 'bgColor.main',
          borderRadius: '15px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'contrastColor.main'
        }}
      >
        <Typography variant={'h5'} align='center' sx={{ textDecoration: 'underline' }}>
          {title}
        </Typography>
        <Typography variant={'h6'} align='center' sx={{ opacity: '0.75' }}>
          {body}
        </Typography>
      </Box>
    </Grid>
  )

  const row = (isOdd && mediumMq) ? [imgCol, textCol] : [textCol, imgCol];
  
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0%' : ((isOdd) ? '-100%' : '100%'),
        transition: 'translate 1.0s ease-in-out, opacity 1.0s ease-in-out',
      }}
    >
      {row}
    </Grid>
  )
}

export default ImageRow;
