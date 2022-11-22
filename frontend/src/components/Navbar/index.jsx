import { AppBar, Box, Button, Collapse, Divider, Toolbar, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import LogoBox from '../LogoBox';
import Settings from './Settings'
import { useSelector } from 'react-redux';

function Navbar () {
  const [logoHover, setLogoHover] = useState(false);
  // Animation
  const animationProps = useSpring({
    from: { y: -50 },
    to: { y: 0 }
  })
  const AnimatedAppBar = animated(AppBar);
  const navigate = useNavigate();
  const buttonSelected = useSelector(state => state.navButton);

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
        <Box
          m={1}
          onMouseEnter={() => { setLogoHover(true) }}
          onMouseLeave={() => { setLogoHover(false) }}
        >
          <LogoBox />
        </Box>
        <Collapse orientation='horizontal' in={logoHover}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}>
            <Typography fontFamily='my-handwriting' fontSize={20} lineHeight='15px' noWrap>
              {'Gordon Wang\'s'}
            </Typography>
            <Typography fontFamily='my-handwriting' fontSize={20} lineHeight='15px' noWrap>
              <span className='gradient-text' style={{ fontWeight: 'bold' }}>
                {'Portfolio'}
              </span>
              {' Website'}
            </Typography>
          </Box>
        </Collapse>
        <Divider orientation='vertical' variant='middle' flexItem />
        {navigationOptions.map((nav, index) => (
          <Fragment key={`navigation-btn-${index}`}>
            <Button onClick={nav.func} disabled={buttonSelected === index}>
              {nav.label}
            </Button>
            <Divider orientation='vertical' variant='middle' flexItem />
          </Fragment>
        ))}
        <Box ml='auto'>
          <Settings />
        </Box>
      </Toolbar>
    </AnimatedAppBar>
  )
}

export default Navbar;
