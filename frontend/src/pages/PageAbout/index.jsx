import React from 'react';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import AnimatedProfilePic from './AnimatedProfilePic';
import TimelineSection from './TimelineSection';
import ContactMeSection from './ContactMeSection';
import HobbiesSection from './HobbiesSection';
import { animated, useSpring } from 'react-spring';
import generateEmploymentTimeline from './employment';
import generateExtraCurricularTimeline from './extracurricular';
import { useLocation, useNavigate } from 'react-router';

export default function PageAbout () {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const AnimatedTypography = animated(Typography);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AnimatedTitle title={'About Me'} />
        <hr />
      </Grid>
      <Grid my={2.5} item lg={3.5} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
        pt={(smallMq) ? 5 : 0}
        pb={(smallMq) ? 5 : 3}
        px={(smallMq) ? 5 : 2}
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
          {'Hi, my name is Gordon Wang.'}
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
          {'I am currently in the final year of my '}
          <Box
            component='code'
            px={1}
            sx={{ bgcolor: 'rgba(10,10,10,0.5)', borderRadius: '10px' }}
          >
            Computer&nbsp;Science
          </Box>
          {' degree at '}
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
          fontSize={24}
          fontWeight='bold'
          color='#a9a9a9'
          mb={3}
        >
          {'I completed my primary and secondary education at '}
          <Box component='span' color='yellow.main'>
            {'Saint Joachim\'s Primary School'}
          </Box>
          {' and '}
          <Box component='span' color='yellow.main'>
            {'Sefton High School'}
          </Box>
          {' respectively.'}
        </AnimatedTypography>
        <AnimatedTypography
          style={useSpring({
            from: { x: '50%', opacity: 0 },
            to: { x: '0%', opacity: 1 },
            delay: 1000
          })}
          align='center'
          fontSize={20}
          fontWeight='bold'
          color='#a9a9a9'
        >
          {'I aim to push my creative limits with every project I work on, and I am constantly seeking out new skills and knowledge to help me do so.'}
        </AnimatedTypography>
      </Grid>
      {/* Timeline */}
      <Box component='hr' width='100%' sx={{ my: 0 }}/>
      <Grid item xl={6} xs={12} >
        <TimelineSection
          timelineItems={generateEmploymentTimeline()}
          title={'Employment History'}
          subtitle={'Positions I have held in the workforce'}
          odd
        />
      </Grid>
      {(xLargeMq)
        ? <Divider orientation="vertical" flexItem sx={{ mr: -1, bgcolor: 'whitesmoke' }}/>
        : <Box component='hr' width='100%' my={0}/>
      }
      <Grid item xl={6} xs={12} >
        <TimelineSection
          timelineItems={generateExtraCurricularTimeline(useNavigate(), useLocation())}
          title={'Extra-Curricular History'}
          subtitle={'Activities outside of academics that I have participated in'}
        />
      </Grid>
      <Box component='hr' width='100%' my={0}/>
      <Grid item xs={12} >
        <HobbiesSection />
      </Grid>
      <Box component='hr' width='100%' my={0}/>
      <Grid item xs={12} >
        <ContactMeSection />
      </Grid>
    </Grid>
  )
}
