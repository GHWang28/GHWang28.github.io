import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { animated, useSpring, easings } from '@react-spring/web'
import Blob from '../../components/Blob';
import Sparklez from '../../components/Sparklez';
import SplashText from '../../components/SplashText';
import config from '../../config.json';
import { rng } from '../../helpers';
import { BlobData } from '../../types';

const PageLanding = () => {
  const lightMode = useTheme().palette.mode === 'light';

  // Setting up splash message and blob through state so that it does not change with every state refresh.
  const [splashMsg, setSplashMsg] = useState<string>('');
  const [blobColors, setBlobColors] = useState<[ BlobData, BlobData, BlobData ] | null>(null);
  useEffect(() => {
    setSplashMsg(config.SPLASH_TEXT[rng(0, config.SPLASH_TEXT.length - 1)]);
    setBlobColors([
      {
        scale: '3.8 1.6',
        color: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
        width: 2,
        speed: 300
      },
      {
        scale: '3.6 1.8',
        color: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
        width: 2,
        speed: 400
      },
      {
        scale: '3.4 2.2',
        color: config.POSSIBLE_COLORS[rng(0, config.POSSIBLE_COLORS.length - 1)],
        width: 3,
        speed: 500
      }
    ]);
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
            left: { md: '12%', xs: '17%' },
            bottom: '5%'
          }}
        />
        {/* Background image */}
        <AnimatedBox
          component='img'
          draggable={false}
          style={useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: 0.5 * delay
          })}
          // @ts-ignore
          alt='Landing page background'
          src='images/title-bg.webp'
          sx={{
            position: 'absolute',
            opacity: 0.8,
            width: '100%',
            translate: '0px -10%',
            zIndex: -1,
            userSelect: 'none',
          }}
        />
        {
          /* Blobs */
          blobColors?.map(({ color, speed, scale, width }: BlobData, index: number) => (
            <Blob
              key={`blob-${index}`}
              color={color}
              fill='none'
              strokeWidth={width}
              speed={speed}
              sx={{
                position: 'absolute',
                opacity: 0.25,
                zIndex: -2,
                translate: '0px -22.5%',
                scale
              }}
            />
          ))
        }
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
        mt={{ md: 15, xs: 7 }}
        fontWeight='bold'
        fontSize={35}
        lineHeight={1.0}
      >
        Welcome to my GitHub&nbsp;Page!
      </AnimatedTypography>
      <AnimatedTypography
        mt={4}
        align='center'
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
          delay: 6 * delay,
        })}
        color={(lightMode) ? '#5A5A5A' : '#D3D3D3' }
        fontWeight='bold'
        fontSize={24}
        lineHeight={1.0}
      >
        {'Feel free to look around using the navigation at the top.'}
      </AnimatedTypography>
    </Box>
  )
}

export default PageLanding;
