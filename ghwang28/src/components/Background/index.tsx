import React, { useEffect, useState, Fragment } from 'react';
import { Box } from '@mui/material';
import BackgroundWave from './BackgroundWave';
import { useAppSelector } from '../../hooks';
import Canvas from './Canvas';
import blockPulsateAnim from './Canvas/Animators/blockPulsateAnim';
import rippleAnim from './Canvas/Animators/rippleAnim';
import mountainAnim from './Canvas/Animators/mountainAnim';
import rainAnim from './Canvas/Animators/rainAnim';
import { animated, useTransition } from '@react-spring/web';

const Background = () => {
  const themeMode = useAppSelector(state => state.themeMode);
  const backgroundIndex = useAppSelector(state => state.background);

  const transitions = useTransition(backgroundIndex, {
    from: { opacity: 0, filter: 'blur(10px)' },
    enter: { opacity: 1, filter: 'blur(0px)' },
    leave: { opacity: 0, filter: 'blur(10px)'  },
  });

  const AnimatedBox = animated(Box);

  return (
    <Fragment>
      {transitions((style, index) => (
        <AnimatedBox
          style={style}
          sx={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            filter: (themeMode === 'light') ? 'invert(100%)' : '',
            width: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            zIndex: -999
          }}
        >
          <BackgroundInner backgroundIndex={index}/>
        </AnimatedBox>
      ))}
    </Fragment>
  )
}

const BackgroundInner = ({ backgroundIndex }: { backgroundIndex: number }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  // Handling when the document can be visible or not
  useEffect(() => {
    const handleVisibilityChange = () => {
      setHidden(document.hidden);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, []);

  // If the page is hidden, then return null as background
  if (hidden) {
    return null;
  }

  switch (backgroundIndex) {
    case 0: return <Canvas anim={mountainAnim} />;
    case 1: return <Canvas anim={rainAnim}/>;
    case 2: return <BackgroundWave />;
    case 3: return <Canvas anim={rippleAnim} />;
    case 4: return <Canvas anim={blockPulsateAnim} />;
    case 5: return (
      <Box
        sx={{
          position: 'relative',
          opacity: 0.25,
          width: '100%',
          height: '100%',
          bottom: '0px',
          maskImage: 'url(/images/background/circuitry.svg)',
          maskSize: 'cover',
          maskRepeat: 'no-repeat',
          zIndex: -32
        }}
      >
        <Box
          className={'gradient-background-transparent'}
          sx={{ height: '100%', width: '100%' }}
        />
      </Box>
    );
    default: return null;
  }
}

export default Background;
