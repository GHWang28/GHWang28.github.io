import React, { Fragment, useState } from 'react';
import { Box } from '@mui/material';
import ButtonGoBack from '../../../components/ButtonGoBack';
import ImageGallery from '../../../components/ImageGallery';
import BoxInfo from '../../../components/BoxInfo';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ProjectAirBnB () {

  const [hover, setHover] = useState(false);

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false) }}
          sx={{
            scale: (hover) ? '1.05' : '1.0',
            transition: 'scale 0.5s ease-in-out'
          }}
          component={LazyLoadImage}
          effect='opacity'
          src='/images/comp6080/airbnb-logo.png'
          width='min(75%, 600px)'
        />
      </Box>
      <ImageGallery
        imgArray={[
          'https://youtu.be/USkb7SA7QiQ',
          '/images/comp6080/airbnb-1.jpg',
          '/images/comp6080/airbnb-2.jpg',
          '/images/comp6080/airbnb-3.jpg',
          '/images/comp6080/airbnb-4.jpg',
          '/images/comp6080/airbnb-5.jpg',
          '/images/comp6080/airbnb-mobile-responsive-1.jpg',
          '/images/comp6080/airbnb-mobile-responsive-2.jpg',
          '/images/comp6080/airbnb-mobile-responsive-3.jpg',
          '/images/comp6080/airbnb-mobile-responsive-4.jpg',
        ]}
      />
      <BoxInfo title='Project Description'>
        {
          'This University Assignment created by Gordon Wang for '
        }
        <Box component='span' sx={{ color: 'yellow.main' }}>{'UNSW'}</Box>
        {
          '\'s COMP6080 is a recreation of '
        }
        <Box component='span' sx={{ color: 'red.main' }}>{'AirBnB'}</Box>
        {
          '. It includes but are not limited to the following features:'
        }
        <Box component='li'>{'Property Listing management'}</Box>
        <Box component='li'>{'Booking management'}</Box>
        <Box component='li'>{'Search Filters'}</Box>
        <Box component='li'>{'Responsive Pages'}</Box>
        <Box component='li'>{'Animated Transitions'}</Box>
        <br/>
        {
          'This Assignment introduced me to the '
        }
        <Box component='span' sx={{ color: 'green.main' }}>{'React'}</Box>
        {
          ' library and helped me develop good '
        }
        <Box component='span' sx={{ color: 'green.main' }}>{'React'}</Box>
        {
          ' practices such as Component and UI Testing, propType usage, reusable components etc.'
        }
      </BoxInfo>
      <BoxInfo plagiarism/>
    </Fragment>
  )
}