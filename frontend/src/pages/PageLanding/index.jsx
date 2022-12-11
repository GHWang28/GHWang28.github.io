import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import ContactDetails from '../../components/ContactDetails';
import Sparklez from '../../components/Sparklez';
import SplashText from '../../components/SplashText';
import VersionNumber from '../../components/VersionNumber';
import { setNavButtonPress } from '../../redux/actions';
import config from '../../config.json';
import { rng } from '../../helpers';

function PageLanding () {
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  // Setting up splash message through state so that it does
  // not change messages with every state refresh.
  const [splashMsg, setSplashMsg] = useState('');
  useEffect(() => {
    setSplashMsg(config.SPLASH_TEXT[rng(0, config.SPLASH_TEXT.length - 1)]);
  }, []);

  // Defining animations
  const delay = 200;
  const AnimatedSplash = animated(SplashText);
  const AnimatedBox = animated(Box);
  const AnimatedTypography = animated(Typography);
  const dispatch = useDispatch();

  // Set the navbar button to none
  useEffect(() => {
    dispatch(setNavButtonPress(-1))
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        width: '100%'
      }}
    >
      <Box sx={{ position: 'relative' }} >
        {/* Splash Text */}
        <AnimatedSplash
          style={useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: 2 * delay,
          })}
          message={splashMsg}
          fontSize={'min(4.5vw, 30px)'}
          position={{
            left: (mediumMq) ? '90%' : '85%',
            bottom: '85%'
          }}
        />
        {/* Background image */}
        <AnimatedBox
          style={useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: 0.5 * delay
          })}
          component='img'
          alt='Landing page background'
          title='Landing page background'
          src='images/title-bg.png'
          sx={{
            position: 'absolute',
            opacity: 0.8,
            width: '100%',
            translate: '0px -10%',
            zIndex: -1,
            userSelect: 'none'
          }}
        />
        <AnimatedTypography
          style={useSpring({
            from: { x: -200, opacity: 0 },
            to: { x: 0, opacity: 1 },
            delay: 2 * delay,
          })}
          sx={{ userSelect: 'none' }}
          fontSize={'min(10vw, 50px)'}
          align='left'
          lineHeight={0.6}
          fontWeight='bold'
          fontFamily='my-handwriting'
        >
          Gordon&nbsp;Wang&#39;s
        </AnimatedTypography>
        <Sparklez frequency={2} sizeRange={[10, 20]}>
          <AnimatedTypography
            style={useSpring({
              from: { opacity: 0 },
              to: { opacity: 1 },
              delay: 3 * delay,
              config: { duration: 1000 },
            })}
            lineHeight={1}
            className={'gradient-text'}
            fontSize={'min(30vw, 180px)'}
            sx={{ height: 'fit-content', fontFamily: 'hey_august', userSelect: 'none' }}
            align='center'
            fontWeight='bold'
            m={0}
          >
            {'Portfolio'}
          </AnimatedTypography>
        </Sparklez>
        <AnimatedTypography
          style={useSpring({
            from: { x: 200, opacity: 0 },
            to: { x: 0, opacity: 1 },
            delay: 4 * delay
          })}
          sx={{ userSelect: 'none' }}
          fontSize={'min(10vw, 50px)'}
          lineHeight={0}
          align='right'
          fontWeight='bold'
          fontFamily='my-handwriting'
        >
          {'Website'}
        </AnimatedTypography>
      </Box>
      {/* Body */}
      <AnimatedTypography
        align='center'
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
          delay: 5 * delay,
        })}
        mt={(mediumMq) ? 15 : 7}
        color='#a9a9a9'
        fontWeight='bold'
        fontSize={35}
        lineHeight={1.0}
      >
        {'Hi, my name is '}
        <Box component='span' color='whitesmoke'>
          {'Gordon Wang'}
        </Box>
        {' and welcome to my GitHub page!'}
      </AnimatedTypography>
      <AnimatedTypography
        mt={4}
        align='center'
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
          delay: 6 * delay,
        })}
        color='#808080'
        fontWeight='bold'
        fontSize={28}
        lineHeight={1.0}
      >
        {'Feel free to look around using the navigation at the top.'}
      </AnimatedTypography>
      <VersionNumber />
      <ContactDetails />
    </Box>
  )
}

export default PageLanding;
