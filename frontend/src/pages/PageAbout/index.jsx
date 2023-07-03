import React, { Fragment } from 'react';
import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
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
// import ButtonDownload from '../../components/ButtonDownload';
import EducationSection from './EducationSection';
import InlineCode from '../../components/InlineCode';
import GradientTitle from '../../components/GradientTitle';

export default function PageAbout () {
  const lightMode = useTheme().palette.mode === 'light';
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const xLargeMq = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const AnimatedTypography = animated(Typography);

  const skillAndFunFactSection = (
    <Grid container>
      <Grid item md={5.9} xs={12} my={3}>
        <FunFactSection />
      </Grid>
      {(mediumMq) ? (
        <Grid item md={0.2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider orientation='vertical' flexItem sx={{ bgcolor: 'whitesmoke' }}/>
        </Grid>
      ) : (
        <Box component='hr' width='100%' sx={{ my: 0 }}/>
      )}
      <Grid item md={5.9} xs={12} my={3}>
        <SkillsSection />
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      <GradientTitle title='About Me' subtitle='My README.md'/>

      <Grid
        container
        sx={{
          bgcolor: (lightMode) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          borderRadius: '15px'
        }}
        px={2}
      >
        <Grid my={2.5} item md={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatedProfilePic />
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          pt={(mediumMq) ? 5 : 0}
          pb={(mediumMq) ? 5 : 3}
          px={(mediumMq) ? 5 : 2}
        >
          {/* Section containing introduction */}
          <AnimatedTypography
            style={useSpring({
              from: { x: '50%', opacity: 0 },
              to: { x: '0%', opacity: 1 },
              delay: 550
            })}
            align='center'
            variant='h4'
            fontWeight='bold'
            mb={(largeMq) ? 4 : 2}
          >
            Hi, I&#39;m Gordon&nbsp;Wang.
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
            color='text.secondary'
            mb={3}
          >
            {'I am a  '}
            <InlineCode>
              Computer&nbsp;Science
            </InlineCode>
            {' graduate from '}
            <Box component='span' color='yellow.main'>{'UNSW '}</Box>
            <Box component='span' className='ozzie-text'>{'Australia'}</Box>
            {' and currently am a Frontend Programming Tutor at '}
            <Box component='span' color='yellow.main'>{'UNSW'}</Box>
            {'.'}
          </AnimatedTypography>
          <AnimatedTypography
            style={useSpring({
              from: { x: '50%', opacity: 0 },
              to: { x: '0%', opacity: 1 },
              delay: 750
            })}
            align='center'
            fontSize={16}
            fontWeight='bold'
            color='text.secondary'
            mb={(xLargeMq) ? 3 : 0}
          >
            {'I am a highly motivated individual who is passionate about design and always looking to learn new skills.'}
          </AnimatedTypography>
          {(xLargeMq) && (skillAndFunFactSection)}
        </Grid>
        {(!xLargeMq) && (
          <Grid item xs={12}>
            <Box component='hr' width='100%' sx={{ my: 0 }}/>
            {skillAndFunFactSection}
          </Grid>
        )}
        <Box component='hr' width='100%' sx={{ my: 0 }}/>
        <Grid item xs={12} >
          <EducationSection />
        </Grid>
        {/* Timeline */}
        <Box component='hr' width='100%' sx={{ my: 0 }}/>
        <Grid item lg={6} xs={12} >
          <TimelineSection
            timelineItems={generateExtraCurricularTimeline(useNavigate(), useLocation())}
            title={'Extra-Curricular History'}
            subtitle={'Notable activities outside of academics that I have participated in'}
            odd
          />
        </Grid>
        {(largeMq)
          ? <Divider orientation="vertical" flexItem sx={{ mr: -1, bgcolor: 'whitesmoke' }}/>
          : <Box component='hr' width='100%' my={0}/>
        }
        <Grid item lg={6} xs={12} >
          <TimelineSection
            timelineItems={generateEmploymentTimeline()}
            title={'Employment History'}
            subtitle={'Positions I have held in the workforce'}
          />
        </Grid>
        <Box component='hr' width='100%' my={0}/>
        <Grid item xs={12} >
          <HobbiesSection />
        </Grid>
        <Box component='hr' width='100%' my={0}/>
        <Grid item xs={12} mb={2}>
          <ContactMeSection />
        </Grid>
        {/*
        <Box component='hr' width='100%' my={0}/>
        <Grid item xs={12} >
          <Typography mt={5} variant='h4' fontWeight='bold' align='center'>
            {'Download Curriculum Vitae'}
          </Typography>
          <Typography mb={2} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
            {'The .PDF version of this website'}
          </Typography>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ButtonDownload
              downloadLink='https://drive.google.com/u/1/uc?id=1Z2aTNAyOGgdrdTAvrThoSaRD48OtatcV&export=download'
              fileName={'Gordon Wang\'s CV'}
              title='Download CV'
            />
          </Box>
        </Grid>
        */}
      </Grid>
    </Fragment>
  )
}
