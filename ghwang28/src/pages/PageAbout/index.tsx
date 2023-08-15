import React, { Fragment, useRef } from 'react';
import { Box, Divider, Grid, Link, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import AnimatedProfilePic from './AnimatedProfilePic';
import TimelineSection from './TimelineSection';
import ContactMeSection from './ContactMeSection';
import HobbiesSection from './HobbiesSection/HobbiesSection';
import { animated, useSpring } from '@react-spring/web';
import generateEmploymentTimeline from './employment';
import generateExtraCurricularTimeline from './extracurricular';
import { useLocation, useNavigate } from 'react-router';
import SkillsSection from './SkillsSection';
import FunFactSection from './FunFactSection';
import EducationSection from './EducationSection';
import InlineCode from '../../components/InlineCode';
import GradientTitle from '../../components/GradientTitle';
import SparklezText from '../../components/Sparklez/SparklezText';

const PageAbout = () => {
  const lightMode = useTheme().palette.mode === 'light';
  const mediumMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const xLargeMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const AnimatedTypography = animated(Typography);
  const contactRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // This is called when user clicks on link underneath the introduction
  const getInContactHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    (contactRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Fragment>
      <GradientTitle title='About Me' subtitle='My README.md'/>

      <Grid
        container
        sx={{
          bgcolor: (lightMode) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          borderRadius: '15px'
        }}
        px={{ xs: 0.5, sm: 2 }}
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
            fontSize={24}
            fontWeight='bold'
            color='text.secondary'
            mb={3}
          >
            {'I\'m a'}
            <InlineCode>Computer&nbsp;Science</InlineCode>
            {'Graduate with a great passion in crafting '}
            <SparklezText gradient='rainbow'>{'visual'}</SparklezText>
            {' experiences - whether it be through'}
            <InlineCode>{'<programming/>'}</InlineCode>
            {'or '}
            <SparklezText noSparklez gradient='graphic'>{'graphic design'}</SparklezText>
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
            {'Thanks for checking out my portfolio website! Currently, I\'m based in Sydney '}
            <SparklezText noSparklez gradient='ozzie'>{'Australia'}</SparklezText>
            {'.'}
            <br/>
            {'Want to get in contact? '}
            <Link href='#' onClick={getInContactHandler}>
              {'Click here.'}
            </Link>
          </AnimatedTypography>
          {(xLargeMq) && <SkillAndFunFactSection />}
        </Grid>
        {(!xLargeMq) && (
          <Grid item xs={12}>
            <Box component='hr' width='100%' sx={{ my: 0 }}/>
            <SkillAndFunFactSection />
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
          <ContactMeSection ref={contactRef} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

const SkillAndFunFactSection = () => {
  const mediumMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
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
}

export default PageAbout;
