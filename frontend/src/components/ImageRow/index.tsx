import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import ImageZoomable from '../ImageZoomable';

type ComponentProps = {
  src: string,
  title: string,
  body: string,
  rowNo: number
}

const ImageRow = ({ src, title, body, rowNo }: ComponentProps) => {
  const [ref, inView] = useInView();
  const theme = useTheme();
  const mediumMq = useMediaQuery(theme.breakpoints.up('md'));
  const isOdd = (rowNo % 2);

  const imgCol = (
    <Grid item xs={12} md={8.7}>
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
          borderColor: 'borderColor.main',
          width: '100%'
        }}
      />
    </Grid>
  )
  const textCol = (
    <Grid item xs={12} md={3.3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box
        p={(mediumMq) ? 2 : 0}
        m={1}
        sx={{
          bgcolor: 'bgColor.main',
          borderRadius: '15px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'borderColor.main'
        }}
      >
        <Typography variant={'h5'} align='center'>
          <u>{title}</u>
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
      {row.map((col, index) => (
        <Fragment key={`row-${rowNo}-col-${index}`}>
          {col}
        </Fragment>
      ))}
    </Grid>
  )
}

export default ImageRow;
