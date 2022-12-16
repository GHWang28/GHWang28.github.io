import React from 'react';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import AnimatedProfilePic from './AnimatedProfilePic';
import TimelineSection from './TimelineSection';
import ContactMeSection from './ContactMeSection';
import HobbiesSection from './HobbiesSection/HobbiesSection';
import { animated, useSpring } from 'react-spring';
import generateEmploymentTimeline from './employment';
import generateExtraCurricularTimeline from './extracurricular';
import { useLocation, useNavigate } from 'react-router';
import SkillsSection from './SkillsSection';
import FunFactSection from './FunFactSection';

export default function PageAbout () {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const AnimatedTypography = animated(Typography);

  const skillAndFunFactSection = (
    <Grid container sx={{ border: (xLargeMq) ? '1px solid whitesmoke' : '', borderRadius: (xLargeMq) ? '15px' : '0px' }}>
      <Grid item xs={5.95} my={3} pl={0.5}>
        <FunFactSection />
      </Grid>
      <Grid item xs={0.1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Divider orientation='vertical' flexItem sx={{ bgcolor: 'whitesmoke' }}/>
      </Grid>
      <Grid item xs={5.95} my={3} pr={0.5}>
        <SkillsSection />
      </Grid>
    </Grid>
  )

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
          mb={(largeMq) ? 4 : 2}
        >
          Hi, my name is Gordon&nbsp;Wang.
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
          fontSize={18}
          fontWeight='bold'
          color='#a9a9a9'
          mb={(xLargeMq) ? 3 : 0}
        >
          {'I completed my primary and secondary education at '}
          <Box component='span' color='yellow.main'>
            {'Saint Joachim\'s Primary School'}
          </Box>
          {' and '}
          <Box component='span' color='yellow.main'>
            {'Sefton High School'}
          </Box>
          {' respectively. I aim a highly motivated individual and I aim to push my creative limits with every project I work on, and I am constantly seeking out new skills and knowledge to help me do so.'}
        </AnimatedTypography>
        {(xLargeMq) && (skillAndFunFactSection)}
      </Grid>
      {(!xLargeMq) && (
        <Grid item xs={12}>
          <Box component='hr' width='100%' sx={{ my: 0 }}/>
          {skillAndFunFactSection}
        </Grid>
      )}
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
          subtitle={'Notable activities outside of academics that I have participated in'}
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
