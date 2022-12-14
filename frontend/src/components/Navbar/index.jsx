import React, { Fragment, useState } from 'react';
import { AppBar, Box, Collapse, Toolbar, Typography, useMediaQuery } from '@mui/material';
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
    <AnimatedAppBar
      style={animationProps}
      position='fixed'
      sx={{
        backgroundColor: 'rgba(0,0,0,0.7) ',
        backdropFilter: `blur(1px)
          url('data:image/svg+xml,\
          <svg xmlns="http://www.w3.org/2000/svg">\
            <filter id="turbulence" x="0" y="0">\
              <feTurbulence numOctaves="3" seed="2" baseFrequency="0.02 0.05"></feTurbulence>\
              <feDisplacementMap scale="12" in="SourceGraphic"></feDisplacementMap>\
            </filter>\
          </svg>#turbulence')
        `
      }}
    >
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
        {navigationOptions.map((nav, index) => (
          <Fragment key={`navigation-btn-${index}`}>
            <NavbarButton
              onClick={() => {
                navigate(nav.loc, { state: { prevLocation: location.pathname } })
              }}
              disabled={location.pathname === nav.loc}
              label={nav.label}
            />
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
