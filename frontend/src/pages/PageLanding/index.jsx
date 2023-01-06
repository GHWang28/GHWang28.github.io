import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { animated, useSpring } from 'react-spring';
import { easings } from '@react-spring/web'
import Blob from '../../components/Blob';
import Sparklez from '../../components/Sparklez';
import SplashText from '../../components/SplashText';
import config from '../../config.json';
import { rng } from '../../helpers';
import { useSelector } from 'react-redux';

export default function PageLanding () {
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const themeMode = useSelector(state => state.themeMode);
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
            delay: 14 * delay,
          })}
          message={splashMsg}
          fontSize={'min(4.5vw, 30px)'}
          position={{
            left: (mediumMq) ? '12%' : '17%',
            bottom: '5%'
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
            userSelect: 'none',

          }}
        />
        {/* Blobs */}
        <Blob
          color={(themeMode === 'light') ? 'rgba(30,30,30,0.1)' : 'rgba(150,246,246,0.1)'}
          fill='none'
          strokeWidth={2}
          speed={300}
          sx={{
            position: 'absolute',
            scale: '4.2 1.6',
            zIndex: -2,
            translate: '0px -22.5%'
          }}
        />
        <Blob
          color={(themeMode === 'light') ? 'rgba(30,30,30,0.1)' : 'rgba(150,246,246,0.1)'}
          fill='none'
          strokeWidth={2}
          speed={400}
          sx={{
            position: 'absolute',
            scale: '3.8 2.0',
            zIndex: -2,
            translate: '0px -22.5%'
          }}
        />
        <Blob
          color={(themeMode === 'light') ? 'rgba(30,30,30,0.1)' : 'rgba(150,246,246,0.1)'}
          fill='none'
          strokeWidth={3}
          speed={500}
          sx={{
            position: 'absolute',
            scale: '3.4 2.4',
            zIndex: -2,
            translate: '0px -22.5%'
          }}
        />
        {/* Top text */}
        <AnimatedTypography
          style={useSpring({
            from: { x: -200, opacity: 0 },
            to: { x: 0, opacity: 1 },
            delay: 2 * delay,
            config: {
              duration: 1000,
              easing: easings.easeOutBounce
            }
          })}
          sx={{ userSelect: 'none' }}
          fontSize={'min(10vw, 50px)'}
          align='left'
          lineHeight={0.6}
          fontWeight='bold'
          fontFamily='my-handwriting'
        >
          {'Gordon Wang\'s'}
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
            sx={{ fontFamily: 'hey_august', userSelect: 'none' }}
            align='center'
            fontWeight='bold'
            m={0}
          >
            {'Portfolio'}
          </AnimatedTypography>
        </Sparklez>
        {/* Bottom text */}
        <AnimatedTypography
          style={useSpring({
            from: { x: 200, opacity: 0 },
            to: { x: 0, opacity: 1 },
            delay: 4 * delay,
            config: {
              duration: 1000,
              easing: easings.easeOutBounce
            }
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
        sx={{
          color: (themeMode === 'light') ? 'rgb(86,86,86)' : ''
        }}
        mt={(mediumMq) ? 15 : 7}
        color='#a9a9a9'
        fontWeight='bold'
        fontSize={35}
        lineHeight={1.0}
      >
        {'Hi, my name is '}
        <Box component='span' color={(themeMode === 'light') ? 'black.main' : ''}>
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
    </Box>
  )
}
