import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import ImageGallery from '../../components/ImageGallery';

function ProjectEarthEphemeris () {
  return (
    <Fragment>
      <Typography mt={5} mb={2} variant='h2' fontWeight='bold' align='center'>
        {'Earth\'s Ephemeris ★彡'}
      </Typography>
      <ImageGallery
        imgArray={[
          '/images/newsletter/nsw-art-gallery.jpg',
          '/images/newsletter/cabramatta-article.jpg',
        ]}
      />
    </Fragment>
  )
}

export default ProjectEarthEphemeris;
