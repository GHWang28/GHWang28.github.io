import { Box, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from 'react-spring';
import ImageGallery from '../../components/ImageGallery';
import ImageRow from '../../components/ImageRow';
import Sparklez from '../../components/Sparklez';

function ProjectEarthEphemeris () {
  const [ref, inView] = useInView();
  const AnimatedBox = animated(Box);

  return (
    <Fragment>
      <AnimatedBox
        component='section'
        mt={5}
        mb={4}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
        })}
      >
        <Sparklez sizeRange={[30, 40]}>
          <Typography className={'gradient-text'} variant='h1' fontWeight='bold'>
            {'Earth\'s Ephemeris'}
          </Typography>
        </Sparklez>
      </AnimatedBox>

      <Box component='hr' m={4} />
      <Box component='hr' m={4} />

      <Grid container p={4} rowSpacing={1} rowGap={{ xs: 4 }} >
        <ImageRow src='/images/hscbow-hq/homesweethome.jpg' title='Home Sweet Home' rowNo={1} />
        <ImageRow src='/images/hscbow-hq/leaving.jpg' title='Exiting W/O Leaving' rowNo={2} />
        <ImageRow src='/images/hscbow-hq/bonvoyage.jpg' title='Bon Voyage' rowNo={3} />
        <ImageRow src='/images/hscbow-hq/rabureta.jpg' title='Rabureta' rowNo={4} />
        <ImageRow src='/images/hscbow-hq/ruiji.jpg' title='Ruijii' rowNo={5} />
        <ImageRow src='/images/hscbow-hq/homecoming.jpg' title='Homecoming' rowNo={6} />
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
          ]}
        />
      </Box>
      
    </Fragment>
  )
}

export default ProjectEarthEphemeris;
