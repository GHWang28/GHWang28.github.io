import { Box, Typography } from '@mui/material';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import Sparklez from '../../components/Sparklez';

function PageLanding () {
  const delay = 200;
  const animationSlideRight = useSpring({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
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
    to: { x: 0, opacity: 1 },
    delay: 1 * delay
  })
  const AnimatedTypography = animated(Typography);

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
      <Box
        component='img'
        src='images/title-bg.png'
        sx={{ position: 'absolute', opacity: 0.5 }}
      />
      <Box sx={{ position: 'relative' }} >
        <AnimatedTypography
          style={animationSlideRight}
          fontSize={'min(8vw, 50px)'}
          align='left'
          lineHeight={0.2}
        >
          {'Gordon Wang\'s'}
        </AnimatedTypography>
        <Sparklez frequency={2} sizeRange={[10, 45]}>
          <AnimatedTypography
            style={animationAppear}
            lineHeight={1}
            className={'gradient-text'}
            fontSize={'min(23vw, 180px)'}
            sx={{ height: 'fit-content' }}
            align='center'
            fontWeight='bold'
            m={0}
          >
            {'Portfolio'}
          </AnimatedTypography>
        </Sparklez>
        <AnimatedTypography
          style={animationSlideLeft}
          fontSize={'min(8vw, 50px)'}
          lineHeight={0.2}
          align='right'
        >
          {'Website'}
        </AnimatedTypography>
      </Box>
    </Box>
  )
}

export default PageLanding;
