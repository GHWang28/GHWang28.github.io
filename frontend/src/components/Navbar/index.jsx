import React, { Fragment, useState } from 'react';
import { AppBar, Box, Collapse, Divider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router';
import LogoBox from '../LogoBox';
import Settings from './Settings'
import NavbarButton from './NavbarButton';

function Navbar () {
  const [logoHover, setLogoHover] = useState(false);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  // Animation
  const animationProps = useSpring({
    from: { y: -50 },
    to: { y: 0 }
  })
  const AnimatedAppBar = animated(AppBar);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationOptions =  [
    {
      label: 'Projects',
      loc: '/projects',
    },
    {
      label: 'About',
      loc: '/about',
    }
  ]
  return (
    <AnimatedAppBar style={animationProps} position='fixed'>
      <Toolbar>
        <Box
          m={1}
          onMouseEnter={() => { setLogoHover(true) }}
          onMouseLeave={() => { setLogoHover(false) }}
        >
          <LogoBox doNavigate={(location.pathname !== '/')} />
        </Box>
        <Collapse orientation='horizontal' in={logoHover && smallMq}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mx: 1 }}>
            <Typography fontFamily='my-handwriting' fontSize={16} lineHeight='15px' noWrap>
              {'Gordon Wang\'s'}
            </Typography>
            <Typography fontFamily='my-handwriting' fontSize={16} lineHeight='15px' noWrap>
              <Box component='span' className='gradient-text' sx={{ fontWeight: 'bold' }}>
                {'Portfolio'}
              </Box>
              {' Website'}
            </Typography>
          </Box>
        </Collapse>
        <Divider orientation='vertical' variant='middle' flexItem />
        {navigationOptions.map((nav, index) => (
          <Fragment key={`navigation-btn-${index}`}>
            <NavbarButton
              onClick={() => {
                navigate(nav.loc, { state: { prevLocation: location.pathname } })
              }}
              disabled={location.pathname === nav.loc}
              label={nav.label}
            />
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
