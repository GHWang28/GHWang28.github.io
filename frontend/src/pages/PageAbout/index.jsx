import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import AnimatedProfilePic from './AnimatedProfilePic';

export default function PageAbout () {

  return (
    <Grid container rowGap={3} columnSpacing={3}>
      <Grid item xs={12}>
        <AnimatedTitle title={'About Me'} />
        <hr />
      </Grid>
      <Grid item lg={4} md={5} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <AnimatedProfilePic />
      </Grid>
      <Grid item lg={8} md={7} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align='center' variant='h3' fontWeight='bold' color='#a9a9a9' mb={8}>
          {'Hey, my name is '}
          <Box component='span' color='whitesmoke'>
            {'Gordon Wang'}
          </Box>
          {'.'}
        </Typography>
        <Typography align='center' fontSize={28} fontWeight='bold' mb={3}>
          {'Currently, I\'m a Final Year Student at '}
          <Box component='span' color='yellow.main'>{'UNSW'}</Box>
          {' studying Computer Science in Australia.'}
        </Typography>

        <Typography align='center' fontSize={24} fontWeight='bold'>
          {'I love to push my creative limits with every project I work on and am eager to acquire new skills to do so.'}
        </Typography>
      </Grid>
    </Grid>
  )
}
