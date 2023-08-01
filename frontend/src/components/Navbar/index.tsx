import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Box, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router';
import LogoBox from '../LogoBox';
import Settings from './Settings'
import NavbarButton from './NavbarButton'; 
import config from '../../config.json';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useAppSelector } from '../../hooks';

const Navbar = () => {
  const navbarLockState = useAppSelector(state => state.navbarLock);
  const [selectedDim, setSelectedDim] = useState({});
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navOptionRefArray = useRef<HTMLButtonElement[]>([]);

  const theme = useTheme();
  const lightMode = useTheme().palette.mode === 'light';
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));

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

  // Moving the selected border around with each click
  useEffect(() => {
    // Find which tab to highlight by getting the correct ref
    // rootPath is here to ensure that the highlight fades if not on one of the root pages
    let rootPath = false;
    const currPathIndex = config.PAGES.slice(1).map((navigationOption) => (
      navigationOption.slice(1)
    )).findIndex((option) => {
      const currPath = location.pathname.substring(1);
      rootPath = option === currPath;
      return currPath.startsWith(option);
    });

    const element = navOptionRefArray.current[Math.max(currPathIndex, 0)];

    const divData = element?.getBoundingClientRect();
    setSelectedDim({
      bottom: element?.offsetTop + 3,
      left: element?.offsetLeft,
      width: divData?.width,
      height: 0,
      opacity: (currPathIndex < 0 || !rootPath) ? '0' : '1'
    });
  }, [location]);

  // Manages hiding the navbar when scrolling
  useEffect(() => {  
    // Don't hide toolbar if not on mobile
    if (navbarLockState || window == null) {
      setShowNavbar(true);
      return;
    };
  
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
  }, [lastScrollY, navbarLockState]);


  // Contains the settings button
  const settingsComponent = (
    <Box ml='auto' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Settings />
    </Box>
  )

  // Adds a divider at the start and between each navigation option
  const navigationElements = navigationOptions.map((navOption: string, index: number) => (
    <NavbarButton
      key={`nav-btn-${navOption}`}
      ref={(e: HTMLButtonElement) => { navOptionRefArray.current[index] = e }}
      onClick={() => {
        navigate(`/${navOption}`, { state: { prevLocation: location.pathname } })
      }}
      disabled={location.pathname === `/${navOption}`}
      label={navOption}
      startIcon={iconArray[index]}
    />
  )).flatMap((element: React.ReactNode, index: number) => ((index === 0) ? (
    // Insert the dividers
    [
      <Divider orientation='vertical' flexItem key={`divider-${index}`} />,
      element,
      <Divider orientation='vertical' flexItem key={`divider-${index + 1}`} />
    ]
  ) : (
    [element, <Divider orientation='vertical' flexItem key={`divider-${index + 1}`} />]
  )));

  return (
    <AnimatedAppBar
      style={animationProps}
      sx={{
        backgroundColor: (lightMode) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
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
        transition: 'translate 0.4s ease-in-out',
        translate: `0% ${showNavbar ? '0%' : '-150%'}`,
        top: 0,
        left: 0,
        position: 'fixed'
      }}
    >
      <Grid container sx={{ pb: 0, px: (smallMq) ? 5 : 1 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoBox />
        </Grid>

        {/* Display settings button here if the screen becomes tiny */}
        {!smallMq && settingsComponent}
        {!smallMq && <Divider orientation="horizontal" flexItem sx={{ width: '100%', bgcolor: 'whitesmoke' }}/>}
  
        <Grid
          item
          id='nav-btn-group'
          xs={12}
          sm={7}
          md={5}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: smallMq ? 'left' : 'space-between',
            ml: smallMq ? 2 : 0,
            minHeight: '50px'
          }}
        >
          {/* Border around selector */}
          <Box
            className='border-gradient marker'
            sx={{
              position: 'absolute',
              display: 'flex',
              pointerEvents: 'none',
              transition: 'all 0.5s ease-in-out',
              zIndex: 2,
              ...selectedDim
            }}
          />
          {navigationElements}
        </Grid>

        {/* Display settings button here if the screen becomes large enough */}
        {smallMq && settingsComponent}
      </Grid>
    </AnimatedAppBar>
  )
}

export default Navbar;
