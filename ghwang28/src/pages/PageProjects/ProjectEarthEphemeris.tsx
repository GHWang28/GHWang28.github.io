import { Box, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from '@react-spring/web';
import ImageGallery from '../../components/ImageGallery';
import ImageRow from '../../components/ImageRow';
import ButtonGoBack from '../../components/ButtonGoBack';
import GradientTitle from '../../components/GradientTitle';
import { ArtworkData } from '../../types';

const ProjectEarthEphemeris = () => {
  const [ref, inView] = useInView();
  const AnimatedBox = animated(Box);

  const images: ArtworkData[] = [
    {
      src: '/images/hscbow/homesweethome.webp',
      title: 'Home Sweet Home',
      body: 'Artwork #1',
      aspectRatio: 71 / 50
    },
    {
      src: '/images/hscbow/leaving.webp',
      title: 'Leaving',
      body: 'Artwork #2',
      aspectRatio: 1
    },
    {
      src: '/images/hscbow/bonvoyage.webp',
      title: 'Bon Voyage',
      body: 'Artwork #3',
      aspectRatio: 71 / 50
    },
    {
      src: '/images/hscbow/rabureta.webp',
      title: 'Rabureta',
      body: 'Artwork #4',
      aspectRatio: 71 / 50
    },
    {
      src: '/images/hscbow/ruiji.webp',
      title: 'Ruiji',
      body: 'Artwork #5',
      aspectRatio: 71 / 50
    },
    {
      src: '/images/hscbow/homecoming.webp',
      title: 'Homecoming',
      body: 'Artwork #6',
      aspectRatio: 71 / 50
    },
  ]

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <GradientTitle title={'Earth\'s Ephemeris'} />

      <Grid container p={{ xs: 1, sm: 3 }} rowSpacing={1} rowGap={{ xs: 4 }} sx={{ flexDirection: { xs: 'column-reverse', lg: 'row' } }}>

        {/* Cotaining the images */}
        <Grid item xs={12} lg={8} xl={9}>
          <Grid container p={{ xs: 0, sm: 3 }} rowSpacing={1} rowGap={{ xs: 8 }} >
            {images.map((data: ArtworkData, index: number) => (
              <ImageRow key={data.src} src={data.src} title={data.title || ''} body={data.body || ''} rowNo={index + 1} aspectRatio={data.aspectRatio} />
            ))}
          </Grid>
        </Grid>
        
        {/* Containing the side message */}
        <Grid item xs={12} lg={4} xl={3}>
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
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'contrastColor.main',
              bgcolor: 'bgColor.main',
              zIndex: 2
            }}
          >
            <Typography pb={2} fontWeight='bold' sx={{ opacity: '0.5' }}>
              {'Body of Work Description'}
            </Typography>
            <Typography fontWeight='bold' fontSize={20}>
              {'Earth\'s Ephemeris shows an alternative reality where depicting where Earth has become uninhabitable. The narrative revolves around CT-320, a rover designed with the purpose of surveying planets as an Earth\'s replacement.'}
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
          transition: 'opacity 0.5s ease-in-out',
          transitionDelay: '0.2s'
        }}
      >
        <Typography mt={5} mb={4} variant='h3' fontWeight='bold' align='center'>
          {'Extra Content'}
        </Typography>
        <ImageGallery
          imgArray={[
            '/images/newsletter/nsw-art-gallery.webp',
            '/images/newsletter/cabramatta-article.webp',
            '/images/sketch/artexpress-artgallery.webp',
            '/images/sketch/robot-conception.webp',
            '/images/sketch/ryoko.jpg',
            '/images/sketch/ct320.jpg',
          ]}
        />
      </Box>
      
    </Fragment>
  )
}

export default ProjectEarthEphemeris;
