import React from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import AnimatedProfilePic from './AnimatedProfilePic';
import TimelineEmployment from './TimelineEmployment';
import { animated, useSpring } from 'react-spring';

export default function PageAbout () {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const AnimatedTypography = animated(Typography);

  return (
    <Grid container rowGap={3} columnSpacing={3}>
      <Grid item xs={12}>
        <AnimatedTitle title={'About Me'} />
        <hr />
      </Grid>
      <Grid item lg={3.5} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatedProfilePic />
      </Grid>
      <Grid
        item
        lg={8.5}
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Section containing introduction */}
        <AnimatedTypography
          style={useSpring({
            from: { x: '50%', opacity: 0 },
            to: { x: '0%', opacity: 1 },
            delay: 550
          })}
          align='center'
          variant='h3'
          fontWeight='bold'
          mb={(largeMq) ? 8 : 4}
        >
          {'Hey, my name is Gordon Wang.'}
        </AnimatedTypography>
        <AnimatedTypography
          style={useSpring({
            from: { x: '50%', opacity: 0 },
            to: { x: '0%', opacity: 1 },
            delay: 650
          })}
          align='center'
          fontSize={28}
          fontWeight='bold'
          color='#a9a9a9'
          mb={3}
        >
          {'Currently, I\'m a Final Year Student studying '}
          <Box
            component='code'
            px={1}
            sx={{ bgcolor: 'rgba(10,10,10,0.5)', borderRadius: '10px' }}
          >
            Computer&nbsp;Science
          </Box>
          {' at '}
          <Box component='span' color='yellow.main'>{'UNSW '}</Box>
          <Box component='span' className='ozzie-text'>{'Australia'}</Box>
          {'.'}
        </AnimatedTypography>
        <AnimatedTypography
          style={useSpring({
            from: { x: '50%', opacity: 0 },
            to: { x: '0%', opacity: 1 },
            delay: 750
          })}
          align='center'
          fontSize={22}
          fontWeight='bold'
          color='#a9a9a9'
        >
          {'I love pushing my creative limits with every project I work on and am eager to acquire new skills to do so.'}
        </AnimatedTypography>
      </Grid>
      {/* Timeline */}
      <Grid item xs={12} >
        <Box component='hr' width='100%'/>
        <Typography mt={5} variant='h3' fontWeight='bold' align='center'>
          {'Employment Timeline'}
        </Typography>
        <Typography mb={4} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
          {'(Click on the icons to expand)'}
        </Typography>
        <TimelineEmployment />
        <Box component='hr' width='100%'/>
      </Grid>
    </Grid>
  )
}
