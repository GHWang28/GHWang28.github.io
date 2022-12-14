import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from 'react-spring';
import ImageGallery from '../../components/ImageGallery';
import ImageRow from '../../components/ImageRow';
import ButtonGoBack from '../../components/ButtonGoBack';
import AnimatedTitle from './AnimatedTitle';

function ProjectEarthEphemeris () {
  const [ref, inView] = useInView();
  const AnimatedBox = animated(Box);
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <AnimatedTitle title={'Earth\'s Ephemeris'} />

      <Grid container p={4} rowSpacing={1} rowGap={{ xs: 4 }} sx={{ flexDirection: (!xLargeMq) ? 'column-reverse' : '' }}>

        {/* Cotaining the images */}
        <Grid item xs={12} xl={9.5}>
          <Grid container p={4} rowSpacing={1} rowGap={{ xs: 8 }} >
            <ImageRow src='/images/hscbow/homesweethome.jpg' title='Home Sweet Home' body='Artwork #1' rowNo={1} />
            <ImageRow src='/images/hscbow/leaving.jpg' title='Exiting W/O Leaving' body='Artwork #2' rowNo={2} />
            <ImageRow src='/images/hscbow/bonvoyage.jpg' title='Bon Voyage' body='Artwork #3' rowNo={3} />
            <ImageRow src='/images/hscbow/rabureta.jpg' title='Rabureta' body='Artwork #4' rowNo={4} />
            <ImageRow src='/images/hscbow/ruiji.jpg' title='Ruiji' body='Artwork #5' rowNo={5} />
            <ImageRow src='/images/hscbow/homecoming.jpg' title='Homecoming' body='Artwork #6' rowNo={6} />
          </Grid>
        </Grid>
        
        {/* Containing the side message */}
        <Grid item xs={12} xl={2.5} >
          <AnimatedBox
            style={useSpring({
              from: { opacity: 0, y: '-100%' },
              to: {  opacity: 1, y: '0%' },
              delay: 250
            })}
            p={3}
            sx={{
              position: 'sticky',
              top: '94px',
              borderRadius: '15px',
              border: '3px solid whitesmoke',
              bgcolor: 'darkgray.main',
              zIndex: 2
            }}
          >
            <Typography pb={2} fontWeight='bold' sx={{ opacity: '0.5' }}>
              {'Body of Work Description'}
            </Typography>
            <Typography fontWeight='bold' fontSize={20}>
              {`
                Earth's Ephemeris represents an alternate reality where
                abandoning Earth was essential. The narrative follows a rover
                named CT-320 which was created to survey various planets.
              `}
            </Typography>
          </AnimatedBox>
        </Grid>
      </Grid>
      <Box component='hr' m={4} />

      <Box
        mb={10}
        ref={ref}
        sx={{
          opacity: (inView) ? '1' : '0',
          transition: 'opacity 0.3s ease-in-out',
          transitionDelay: '0.2s'
        }}
      >
        <Typography mt={5} mb={4} variant='h3' fontWeight='bold' align='center'>
          {'Extra Content'}
        </Typography>
        <ImageGallery
          imgArray={[
            '/images/newsletter/nsw-art-gallery.jpg',
            '/images/newsletter/cabramatta-article.jpg',
            '/images/sketch/ryoko.jpg',
            '/images/sketch/ct320.jpg',
          ]}
        />
      </Box>
      
    </Fragment>
  )
}

export default ProjectEarthEphemeris;
