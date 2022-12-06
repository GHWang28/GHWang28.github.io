import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ModalImage from '../ModalImage';
import PropTypes from 'prop-types';
import { getLowResImg } from '../../helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageLoader from '../ImageLoader';

function ImageRow ({ src, title, body, rowNo }) {
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isOdd = (rowNo % 2);

  const imgCol = (
    <Grid item xs={12} md={9}>
      <Box
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
        onClick={() => { setOpenModal(true) }}
        sx={{
          cursor: 'pointer',
          transition: 'scale 0.2s ease-in-out',
          scale: (hover) ? '1.025' : '1',
        }}
      >
        <ImageLoader
          src={src}
          alt={`${title}-artwork`}
        />
      </Box>
    </Grid>
  )
  const textCol = (
    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box p={(mediumMq) ? 2 : 0} m={1} sx={{ bgcolor: 'darkgray.main', borderRadius: '15px', border: '3px solid whitesmoke' }}>
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
    <Fragment>
      <ModalImage open={openModal} setOpen={setOpenModal} src={src} title={title}/>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        ref={ref}
        sx={{
          opacity: (inView) ? '1' : '0',
          translate: (inView) ? '0%' : ((isOdd) ? '-100%' : '100%'),
          transition: 'translate 0.4s ease-in-out, opacity 0.4s ease-in-out',
        }}
      >
        {row.map((col, index) => (
          <Fragment key={`row-${rowNo}-col-${index}`}>
            {col}
          </Fragment>
        ))}
      </Grid>
    </Fragment>
  )
}

ImageRow.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  rowNo: PropTypes.number
};

export default ImageRow;
