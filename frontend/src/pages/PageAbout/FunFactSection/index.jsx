import React, { Fragment, useState } from 'react';
import { Box, IconButton, keyframes, Typography } from '@mui/material';
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
  'I used to play the piano frequently.',
  'There\'s a mole with a raidus of 6cm on my arm.',
  'I enjoy binging anime/manga in my spare time.',
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
  <Fragment>
    {'I own a collection of '}
    <Sparklez>
      <Box component='span' className='gradient-text'>
        {'Amiibos'}
      </Box>
    </Sparklez>
    {'.'}
  </Fragment>,
  'I have a tiny piece of led stuck in my index finger since first grade.'
]

export default function FunFactSection () {
  const [ref, inView] = useInView();
  const [lastClicked, setLastClicked] = useState(Date.now());
  const [playRefreshAnim, setPlayRefreshAnim] = useState(false);
  const [funfact, setFunfact] = useState(funfactPool[rng(0, funfactPool.length - 1)]);

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
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
      }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {'Fun Facts'}
      </Typography>
      <Typography mb={1} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'Mildly interesting tidbits about me'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <BootstrapTooltip placement='right' title='Re-roll a different fact'>
          <IconButton
            sx={{
              border: '2px solid whitesmoke',
              animation: (playRefreshAnim) ? `${rotateAnim} 0.2s ease-in-out 1` : ''
            }}
            onAnimationEnd={() => { setPlayRefreshAnim(false) }}
            onClick={(event) => {
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
        <Box
          mt={1.0}
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
                backfaceVisibility: 'hidden',
                bgcolor: 'black.main',
                border: '2px solid whitesmoke',
                borderRadius: '15px'
              }}
              fontSize={15}
              align='center'
              height='fit-content'
            >
              {item}
            </AnimatedTypography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}