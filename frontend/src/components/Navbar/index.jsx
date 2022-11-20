import { AppBar, Button, Divider, Toolbar } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router';
import LogoBox from '../LogoBox';

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
        <LogoBox />
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
