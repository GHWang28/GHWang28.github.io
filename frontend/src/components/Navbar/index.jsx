import React, { useState, useEffect } from 'react';
import { AppBar, Box, Collapse, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router';
import LogoBox from '../LogoBox';
import Settings from './Settings'
import NavbarButton from './NavbarButton'; 
import { capitaliseString } from '../../helpers';

function Navbar () {
  const [logoHover, setLogoHover] = useState(false);
  const [selectedDim, setSelectedDim] = useState({});
  const themeMode = useTheme().palette.mode;
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  // Animation
  const animationProps = useSpring({
    from: { y: -50 },
    to: { y: 0 }
  })
  const AnimatedAppBar = animated(AppBar);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationOptions =  ['projects', 'blog', 'about'];

  useEffect(() => {
    const element = document.getElementById(`nav-btn-${location.pathname.substring(1)}`);
    if (!element) {
      const prevElement = document.getElementById('nav-btn-projects');
      const prevDivData = prevElement.getBoundingClientRect();
      setSelectedDim({
        top: prevElement.offsetTop,
        left: prevElement.offsetLeft,
        width: prevDivData.width,
        height: prevDivData.height,
        opacity: '0'
      });
      return;
    }

    const divData = element.getBoundingClientRect();
    setSelectedDim({
      top: element.offsetTop,
      left: element.offsetLeft,
      width: divData.width,
      height: divData.height,
      opacity: '1'
    });
  }, [location]);

  return (
    <AnimatedAppBar
      style={animationProps}
      position='fixed'
      sx={{
        backgroundColor: (themeMode === 'dark') ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
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
        <Box id='nav-btn-group' sx={{ position: 'relative' }}>
          {/* Border around selector */}
          <Box
            className='border-gradient'
            sx={{
              position: 'absolute',
              display: 'flex',
              pointerEvents: 'none',
              transition: 'all 0.5s ease-in-out',
              zIndex: 2,
              ...selectedDim
            }}
          />
          {navigationOptions.map((navOption) => (
            <NavbarButton
              key={`nav-btn-${navOption}`}
              id={`nav-btn-${navOption}`}
              onClick={() => {
                navigate(`/${navOption}`, { state: { prevLocation: location.pathname } })
              }}
              disabled={location.pathname === `/${navOption}`}
              label={capitaliseString(navOption)}
            />
          ))}
        </Box>
        <Box ml='auto'>
          <Settings />
        </Box>
      </Toolbar>
    </AnimatedAppBar>
  )
}

export default Navbar;
