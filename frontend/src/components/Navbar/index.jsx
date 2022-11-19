import { AppBar, Button, Divider, Toolbar, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router';

function Navbar () {
  // Animation
  const animationProps = useSpring({
    from: { y: -50 },
    to: { y: 0 }
  })
  const AnimatedAppBar = animated(AppBar);
  const navigate = useNavigate();
  const navigationOptions =  [
    {
      label: 'Projects',
      func: () => { navigate('/projects') }
    },
    {
      label: 'About',
      func: () => { navigate('/about') }
    }
  ]
  return (
    <AnimatedAppBar style={animationProps} position='static'>
      <Toolbar>
        <Typography
          className={'gradient-text'}
          mx={2}
          fontWeight='bold'
          sx={{ cursor: 'pointer' }}
          onClick={() => { navigate('/') }}
        >
          Placeholder Text for Logo
        </Typography>
        <Divider orientation='vertical' variant='middle' flexItem />
        {navigationOptions.map((nav, index) => (
          <Fragment key={`navigation-btn-${index}`}>
            <Button onClick={nav.func} >
              {nav.label}
            </Button>
            <Divider orientation='vertical' variant='middle' flexItem />
          </Fragment>
        ))}
      </Toolbar>
    </AnimatedAppBar>
  )
}

export default Navbar;
