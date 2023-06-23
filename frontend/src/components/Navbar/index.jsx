import React, { useState, useEffect } from 'react';
import { AppBar, Box, Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router';
import LogoBox from '../LogoBox';
import Settings from './Settings'
import NavbarButton from './NavbarButton'; 
import config from '../../config.json';
import { isMobileOrTablet } from '../../helpers';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

function Navbar () {
  const [selectedDim, setSelectedDim] = useState({});
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const navigationOptions = config.PAGES.slice(1).map((navigationOption) => (
    navigationOption.slice(1)
  ));

  const iconArray = [
    <SmartToyIcon />,
    <LightbulbIcon />,
    <EmojiPeopleIcon />
  ]

  // Moving the border around
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


  useEffect(() => {
    // Don't hide toolbar if not on mobile
    if (!isMobileOrTablet() || window == null) return;
  
    const hideOrShowNav = () => {
      if (window == null) return;

      // Show navbar if the scroll has gone up
      setShowNavbar(window.scrollY < lastScrollY); 

      // take note of where the previous scroll was
      setLastScrollY(window.scrollY); 
    };

    window.addEventListener('scroll', hideOrShowNav);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', hideOrShowNav);
    };
  }, [lastScrollY]);


  const settingsComponent = (
    <Box ml='auto'>
      <Settings />
    </Box>
  )

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
        `,
        width: '100vw',
        transition: 'translate 0.2s ease-in-out',
        translate: `0% ${showNavbar ? '0%' : '-100%'}`,
        top: 0,
        left: 0,
        pb: 0.5
      }}
    >
      <Grid container component={Toolbar}>
        <Grid
          item
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <LogoBox doNavigate={(location.pathname !== '/')} />
        </Grid>

        {/* Display settings button here if the screen becomes tiny */}
        {!smallMq && settingsComponent}
  
        <Grid item xs={12} sm={5} id='nav-btn-group' sx={{ position: 'relative', display: 'flex', justifyContent: smallMq ? 'left' : 'space-between' }}>
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
          {navigationOptions.map((navOption, index) => (
            <NavbarButton
              key={`nav-btn-${navOption}`}
              id={`nav-btn-${navOption}`}
              onClick={() => {
                navigate(`/${navOption}`, { state: { prevLocation: location.pathname } })
              }}
              disabled={location.pathname === `/${navOption}`}
              label={navOption}
              startIcon={iconArray[index]}
            />
          ))}
        </Grid>

        {/* Display settings button here if the screen becomes large enough */}
        {smallMq && settingsComponent}
      </Grid>
    </AnimatedAppBar>
  )
}

export default Navbar;
