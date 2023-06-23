import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { isMobileOrTablet } from '../../helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function SwipeTutorial () {
  const [hide, setHide] = useState(localStorage.getItem('hideSwipeTut') === 'true');
  const transitions = useTransition(hide, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0  },
  });
  const AnimatedBox = animated(Box);
  const theme = useTheme();
  const lightMode = (theme.palette.mode === 'light');

  const onHide = () => {
    setHide(true);
    localStorage.setItem('hideSwipeTut', true);
  }

  if (!isMobileOrTablet()) return null;

  return transitions((style, hideTransition) => (
    (hideTransition) ? (
      null
    ) : (
      <AnimatedBox
        style={style}
        p={2}
        onClick={onHide}
        sx={{
          display: 'flex',
          gap: 4,
          width: '100vw',
          height: '100vh',
          boxSizing: 'border-box',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          backdropFilter: 'blur(5px)',
          bgcolor: (lightMode) ? 'rgb(255,255,255,0.5)' : 'rgb(0,0,0,0.5)',
          color: (lightMode) ? 'black' : 'whitesmoke',
          WebkitTapHighlightColor: 'transparent',
          zIndex: 99999
        }}
      >
        <Box
          component={LazyLoadImage}
          effect='opacity'
          src='/images/swipe.svg'
          alt='Swipe icon'
          sx={{
            width: 'min(70vw, 200px)',
            filter: lightMode ? '' : 'invert(100%)'
          }}
        />
        <Typography align='center' fontSize='25px' fontWeight='bold'>
          {'Navigate by swiping or using the above navigation bar.'}
        </Typography>
        <Typography align='center' fontSize='15px' sx={{ opacity: 0.75 }}>
          {'(Tap anywhere to continue)'}
        </Typography>
      </AnimatedBox>
    )
  ))
}