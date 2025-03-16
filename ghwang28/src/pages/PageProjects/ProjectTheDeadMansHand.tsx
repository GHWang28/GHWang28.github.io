import { Box, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
// import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from '@react-spring/web';
// import ImageGallery from '../../components/ImageGallery';
import ImageRow from '../../components/ImageRow';
import ButtonGoBack from '../../components/ButtonGoBack';
import GradientTitle from '../../components/GradientTitle';
import { ArtworkData } from '../../types';

const imageFilePaths = '/images/the-dead-mans-hand'

const ProjectTheDeadMansHand: React.FC = () => {
  // const [ref, inView] = useInView();
  const AnimatedBox = animated(Box);

  const images: ArtworkData[] = [
    {
      src: `${imageFilePaths}/ClubComplete.jpg`,
      title: 'Club',
      body: 'All-rounder',
      aspectRatio: 1700 / 1300
    },
    {
      src: `${imageFilePaths}/DiamondComplete.jpg`,
      title: 'Diamond',
      body: 'Long-range',
      aspectRatio: 1700 / 1300
    },
    {
      src: `${imageFilePaths}/Heart.jpg`,
      title: 'Heart',
      body: 'Healer',
      aspectRatio: 1000 / 1300
    },
    {
      src: `${imageFilePaths}/Spade.jpg`,
      title: 'Spade',
      body: 'Glass-cannon',
      aspectRatio: 1000 / 1300
    },
    {
      src: `${imageFilePaths}/GroupPhoto.webp`,
      title: 'The Dead Man\'s Gang',
      body: 'Group Photo',
      aspectRatio: 3000 / 1300
    },
  ]

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <GradientTitle title={'The Dead Man\'s Hand'} />

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
              {'The Dead Man\'s Hand'}
            </Typography>
            <Typography fontWeight='bold' fontSize={20}>
              {'A top-down bullet hell game featuring 4 "highly" skilled assassins themed after playing cards. Their only task - take out their target. Currently, only concept arts exists.'}
            </Typography>
          </AnimatedBox>
        </Grid>
      </Grid>
      <Box component='hr' m={4} />

      {/* <Box
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
      </Box> */}
      
    </Fragment>
  )
}

export default ProjectTheDeadMansHand;
