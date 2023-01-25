import { Box } from "@mui/system"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { animated, easings, useSpring } from "react-spring";

function LogoBox () {
  const navigate = useNavigate();
  const location = useLocation();
  const doNavigate = location.pathname !== '/';

  const [hover, setHover] = useState(false);
  const [src, setSrc] = useState('url(/images/transparent-img.png)');

  const AnimatedBox = animated(Box);
  const animationProps = useSpring({
    from: { scale: 0.75 },
    to: { scale: 1.0 },
    config: {
      duration: 500,
      easing: easings.easeOutBounce
    },
    reset: true
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc('url(/images/gw-logo-anim-2.gif)');
    }, 10);

    return () => { clearTimeout(timeout) };
  }, []);

  return (
    <AnimatedBox
      style={(location.pathname === '/' && Boolean(location.state?.prevLocation)) ? animationProps : null}
      role='button'
      title='Home Page'
      sx={{
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'scale 0.3s ease-in-out',
        scale: (hover) ? '1.1' : '1',
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      onClick={() => { if (doNavigate) navigate('/', { state: { prevLocation: location.pathname } }) }}
    >
      <Box
        name='mask'
        sx={{
          height: '100%',
          width: '100%',
          maskImage: src,
          maskSize: '100%',
          maskRepeat: 'no-repeat'
        }}
      >
        <Box
          className={'gradient-background'}
          sx={{ height: '100%', width: '100%' }}
        />
      </Box>
    </AnimatedBox>
  )
}

export default LogoBox
