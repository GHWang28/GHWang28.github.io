import { AppBar, Button, Divider, Toolbar, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import React from 'react';

function Navbar () {
  // Animation
  const animationProps = useSpring({
    from: { y: -50 },
    to: { y: 0 }
  })
  const AnimatedAppBar = animated(AppBar);
  return (
    <AnimatedAppBar style={animationProps} position='static'>
      <Toolbar>
        <Typography mx={2}>
          Placeholder Text for Logo
        </Typography>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Button>
          Thing
        </Button>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Button>
          About
        </Button>
        <Divider orientation='vertical' variant='middle' flexItem />
      </Toolbar>
    </AnimatedAppBar>
  )
}

export default Navbar;
