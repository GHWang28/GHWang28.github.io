import React, { Fragment, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import Sparklez from '../../../components/Sparklez';
import { executeWithCooldown, rng } from '../../../helpers';
import { animated, easings, useTransition } from '@react-spring/web';

const funfactPool = [
  'I can play the piano!',
  'Can\'t go wrong with the inter font.',
  'My favourite colour is blue 🔵.',
  'Penguins are very cute animals! 🐧.',
  'I can speak English and Mandarin. 你好!',
  <Fragment>
    {'I have a pomeranian dog named '}
    <Sparklez>
      <Box component='span' className='gradient-text'>
        {'Roxy'}
      </Box>
    </Sparklez>
    {'!'}
  </Fragment>,
]

export default function FunFactSection () {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const themeMode = useTheme().palette.mode;
  const [lastClicked, setLastClicked] = useState(Date.now());
  const [funfact, setFunfact] = useState(funfactPool[rng(0, funfactPool.length - 1)]);

  const transitions = useTransition(funfact, {
    from: { rotateY: '-180deg', position: 'static' },
    enter: { rotateY: '0deg', position: 'static' },
    leave: { rotateY: '180deg', position: 'absolute' },
    config: {
      duration: 1000,
      easing: easings.easeOutBounce
    }
  });
  const AnimatedBox = animated(Box);

  const onClick = () => {
    // Prevent spam clicking
    executeWithCooldown(() => {
      let randomIndex = rng(0, funfactPool.length - 1);
      while (funfact === funfactPool[randomIndex]) {
        randomIndex = rng(0, funfactPool.length - 1);
      }

      // Setting states
      setFunfact(funfactPool[randomIndex]);
      setLastClicked(Date.now());
    }, lastClicked);
  }

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '-50px',
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out'
      }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {'Fun Facts'}
      </Typography>
      <Typography mb={{ sm: 1, xs: 3 }} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'Mildly interesting facts about me'}
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {transitions((style, funfactItem) => (
            <AnimatedBox
              // @ts-ignore
              style={style}
              sx={{
                p: 1,
                width: '100%',
                backfaceVisibility: 'hidden',
                bgcolor: (themeMode === 'dark') ? 'black.main' : 'white.main',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'contrastColor.main',
                borderRadius: '15px',
                cursor: 'pointer'
              }}
              onClick={onClick}
            >
              <Typography align='center' sx={{ userSelect: 'none' }}>
                {funfactItem}
              </Typography>
              <Typography align='center' variant='subtitle2' sx={{ userSelect: 'none', opacity: '50%' }}>
                {'(Click to refresh)'}
              </Typography>
            </AnimatedBox>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}