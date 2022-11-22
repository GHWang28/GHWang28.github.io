import { Box, Typography } from '@mui/material';
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
  // Setting up splash message through state so that it does
  // not change messages with every state refresh.
  const [splashMsg, setSplashMsg] = useState('');
  useEffect(() => {
    setSplashMsg(config.SPLASH_TEXT[rng(0, config.SPLASH_TEXT.length - 1)]);
  }, []);

  // Defining animations
  const delay = 200;
  const animationSlideRight = useSpring({
    from: { x: -200, opacity: 0 },
    to: async (next) => {
      await next({ x: 10, opacity: 1 });
      await next({ x: 0 });
    },
    delay: 0 * delay,
  })
  const animationAppear = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2 * delay,
    config: { duration: 1000 },
  })
  const animationSlideLeft = useSpring({
    from: { x: 200, opacity: 0 },
    to: async (next) => {
      await next({ x: -10, opacity: 1 });
      await next({ x: 0 });
    },
    delay: 1 * delay
  })
  const animatedImage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 0.5 * delay
  })
  const animationSplashAppear = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2 * delay,
  })
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
        height: '100%',
        overflow: 'visible'
      }}
    >
      <Box sx={{ position: 'relative' }} >
        {/* Splash Text */}
        <AnimatedSplash
          style={animationSplashAppear}
          message={splashMsg}
          fontSize={'min(5vw, 40px)'}
          position={{
            left: '90%',
            bottom: '85%'
          }}
        />
        {/* Background image */}
        <AnimatedBox
          style={animatedImage}
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
          fontFamily='my-handwriting'
          style={animationSlideRight}
          sx={{ userSelect: 'none' }}
          fontSize={'min(10vw, 50px)'}
          align='left'
          lineHeight={0.6}
          fontWeight='bold'
        >
          {'Gordon Wang\'s'}
        </AnimatedTypography>
        <Sparklez frequency={2} sizeRange={[10, 20]}>
          <AnimatedTypography
            style={animationAppear}
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
          style={animationSlideLeft}
          sx={{ userSelect: 'none' }}
          fontFamily='my-handwriting'
          fontSize={'min(10vw, 50px)'}
          lineHeight={0}
          align='right'
          fontWeight='bold'
        >
          {'Website'}
        </AnimatedTypography>
      </Box>
      <VersionNumber />
      <ContactDetails />
    </Box>
  )
}

export default PageLanding;
