import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import PropTypes from 'prop-types';
import { Fragment } from "react";
import { useInView } from 'react-intersection-observer';

function ImageRow ({ src, title, body, rowNo }) {
  const [ref, inView] = useInView();
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isOdd = (rowNo % 2);

  const imgCol = (
    <Grid item xs={12} md={8.5}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component='img'
          width='100%'
          maxWidth='1500px'
          src={src}
          alt={`${title}-artwork`}
          sx={{ pointerEvents: 'none', borderRadius: '15px', border: '3px solid whitesmoke' }}
        />
      </Box>
    </Grid>
  )
  const textCol = (
    <Grid item xs={12} md={3.5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant={'h3'} align='center'>
        <u>{title}</u>
      </Typography>
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
        filter: (inView) ? '' : 'blur(5px)',
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out, filter 0.2s ease-in-out',
        transitionDelay: '0.5s'
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

ImageRow.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  rowNo: PropTypes.number
};

export default ImageRow;
