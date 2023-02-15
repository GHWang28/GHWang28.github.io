import React, { Fragment, useState } from 'react';
import { Box, Grid, IconButton, keyframes, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import Sparklez from '../../../components/Sparklez';
import { rng } from '../../../helpers';
import RefreshIcon from '@mui/icons-material/Refresh';
import { animated, useTransition } from 'react-spring';
import BootstrapTooltip from '../../../components/BootstrapTooltip';

const rotateAnim = keyframes`
  0% {
    rotate: -360deg
  }
  100% {
    rotate: 0deg
  }
`

const funfactPool = [
  'I can play the piano!',
  // 'There\'s a mole with a raidus of 6cm on my arm.',
  // 'I enjoy binging anime/manga in my spare time.',
  'I\'ve been taking care of a potted bamboo since starting my University degree.',
  'Penguins are my favourite animals 🐧.',
  'I can speak English and Mandarin. 你好!',
  <Fragment>
    {'I enjoy going on walks around the local park with my pet dog '}
    <Sparklez>
      <Box component='span' className='gradient-text'>
        {'Roxy'}
      </Box>
    </Sparklez>
    {'.'}
  </Fragment>,
  // 'I have a tiny piece of led stuck in my index finger since first grade.'
]

export default function FunFactSection () {
  const [ref, inView] = useInView();
  const themeMode = useTheme().palette.mode;
  const [lastClicked, setLastClicked] = useState(Date.now());
  const [playRefreshAnim, setPlayRefreshAnim] = useState(false);
  const [funfact, setFunfact] = useState(funfactPool[rng(0, funfactPool.length - 1)]);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const transitions = useTransition(funfact, {
    from: { rotateY: '-180deg', position: 'static' },
    enter: { rotateY: '0deg', position: 'static' },
    leave: { rotateY: '180deg', position: 'absolute' },
  });
  const AnimatedTypography = animated(Typography);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '-50px',
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {'Fun Facts'}
      </Typography>
      <Typography mb={(smallMq) ? 1 : 3} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'Mildly interesting facts about me'}
      </Typography>
      <Grid container>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
          <BootstrapTooltip placement='left' title='Re-roll a different fact'>
            <IconButton
              sx={{
                border: '2px solid whitesmoke',
                animation: (playRefreshAnim) ? `${rotateAnim} 0.2s ease-in-out 1` : ''
              }}
              onAnimationEnd={() => { setPlayRefreshAnim(false) }}
              onClick={() => {
                // Prevent spam clicking
                if (Date.now() - lastClicked <= 550) return;
                // Avoid randomising into the same fact
                let randomIndex = rng(0, funfactPool.length - 1);
                while (funfact === funfactPool[randomIndex]) {
                  randomIndex = rng(0, funfactPool.length - 1);
                }

                // Setting states
                setFunfact(funfactPool[randomIndex]);
                setLastClicked(Date.now());
                setPlayRefreshAnim(true);
              }}
            >
              <RefreshIcon fontSize='small' />
            </IconButton>
          </BootstrapTooltip>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {transitions((style, item) => (
            <AnimatedTypography
              style={style}
              p={1}
              sx={{
                width: '100%',
                backfaceVisibility: 'hidden',
                bgcolor: (themeMode === 'dark') ? 'black.main' : 'white.main',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'borderColor.main',
                borderRadius: '15px'
              }}
              fontSize={16}
              align='center'
              height='fit-content'
            >
              {item}
            </AnimatedTypography>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}