import './styles/App.css';
import './styles/CoinBlock.css';
import './styles/Gradient.css';
import './styles/Sparklez.css';
import React, { Fragment } from 'react';
import { Box, createTheme, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageLanding from './pages/PageLanding';
import PageProjects from './pages/PageProjects';
import { useTransition, animated } from 'react-spring';
import AbsoluteWrapper from './wrappers/AbsoluteWrapper';
import VersionNumber from './components/VersionNumber';
import ContactDetails from './components/ContactDetails';
import { useEffect } from 'react';
import { preloadImgs } from './helpers';
import { useSelector } from 'react-redux';
import ImageZoomer from './components/ImageZoomer';
import PageAbout from './pages/PageAbout';

export default function App() {
  const location = useLocation();
  const transitions = useTransition(location, getTransitionEffect(location.pathname, location?.state?.prevLocation));
  const imgZoom = useSelector(state => state.imgZoom);
  const themeMode = useSelector(state => state.themeMode);

  const theme = useTheme();
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery(theme.breakpoints.up('md'));
  const largeMq = useMediaQuery(theme.breakpoints.up('lg'));

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: (themeMode === 'light') ? 'rgb(25,43,83)' : 'rgb(150,246,246)'
      },
      purple: {
        main: 'rgb(230,169,254)',
        transparent: 'rgba(230,169,254,0.15)'
      },
      green: {
        main: (themeMode === 'light') ? 'rgb(73,122,21)' : 'rgb(185,239,164)',
        transparent: 'rgba(185,239,164,0.15)'
      },
      red: {
        main: 'rgb(240,128,128)',
        transparent: 'rgba(240,128,128,0.15)'
      },
      blue: {
        main: 'rgb(150,246,246)',
        transparent: 'rgba(150,246,246,0.15)'
      },
      darkblue: {
        main: 'rgb(22,34,56)',
        transparent: 'rgba(22,34,56,0.15)'
      },
      yellow: {
        main: (themeMode === 'light') ? 'rgb(238,183,40)' : 'rgb(255,255,92)',
        transparent: 'rgba(255,255,92,0.15)'
      },
      white: {
        main: 'rgb(245,245,245)',
        transparent: 'rgba(245,245,245,0.15)',
        translucent: 'rgba(245,245,245,0.6)'
      },
      black: {
        main: 'rgb(28,28,28)',
        translucent: 'rgba(28,28,28,0.5)',
        transparent: 'rgba(28,28,28,0.2)'
      },
      darkgray: {
        main: (themeMode === 'light') ? 'rgb(215,215,215)' : 'rgb(40,40,40)',
        translucent: 'rgba(40,40,40,0.7)',
        transparent: 'rgba(40,40,40,0.2)'
      },
      gray: {
        main: (themeMode === 'light') ? 'rgb(190,185,175)' : 'rgb(65,70,80)',
        transparent: 'rgba(65,70,80,0.2)'
      },
      orange: {
        main: 'rgb(255,146,72)',
        transparent: 'rgba(255,146,72,0.15)'
      },
      mode: themeMode,
    },
    typography: {
      'fontFamily': '"Inter", "my-handwriting"'
    }
  });

  useEffect(() => {
    window.history.replaceState({}, document.title);
    preloadImgs([
      '/images/hscbow/homesweethome.jpg',
      '/images/hscbow/leaving.jpg',
      '/images/hscbow/bonvoyage.jpg',
      '/images/hscbow/rabureta.jpg',
      '/images/hscbow/ruiji.jpg',
      '/images/hscbow/homecoming.jpg',
      '/images/about/profile-pic.jpg'
    ]);
  }, []);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.className = 'dark-mode-bg'
    } else {
      document.body.className = 'light-mode-bg'
    }
  }, [themeMode])

  const px = () => {
    if (largeMq) return 22;
    if (mediumMq) return 14;
    if (smallMq) return 6;
    return 0;
  }
  const pb = (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5;
  const pt = '64px';

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Box
        sx={{
          color: (themeMode === 'light') ? 'rgb(36,36,36)' : 'whitesmoke',
          overflowX: 'clip',
          height: 'fit-content'
        }}
      >
        {transitions((styles, item) => (
          <animated.div style={styles}>
            <Routes location={item}>
              <Route path='/' element={
                <AbsoluteWrapper pb={pb} px={px()} pt={pt}><PageLanding /></AbsoluteWrapper>
              }/>
              <Route path='/projects/*' element={
                <AbsoluteWrapper pb={pb} px={px()} pt={pt}><PageProjects /></AbsoluteWrapper>
              }/>
              <Route path='/about' element={
                <AbsoluteWrapper pb={pb} px={px()} pt={pt}><PageAbout /></AbsoluteWrapper>
              }/>
            </Routes>
          </animated.div>
        ))}
      </Box>
      {(location.pathname === '/') && (
        <Fragment>
          <VersionNumber />
          <ContactDetails />
        </Fragment>
      )}
      <ImageZoomer {...imgZoom} />
    </ThemeProvider>
  );
}

/**
   * Manages how to transition between each page
   */
const getTransitionEffect = (currLoc, prevLoc) => {
  if (
    (currLoc === '/' && (prevLoc === '/projects' || prevLoc === '/about'))
    || (currLoc === '/projects' && prevLoc === '/about')
  ) {
    // left to right
    return {
      from: { opacity: 0, x: '-50%', y: '0px' },
      enter: { opacity: 1, x: '0%', y: '0px' },
      leave: { opacity: 0,  x: '25%', y: '0px' },
    }
  } else if (
    (currLoc === '/about' && (prevLoc === '/projects' || prevLoc === '/'))
    || (currLoc === '/projects' && prevLoc === '/')
  ) {
    // right to left
    return {
      from: { opacity: 0, x: '50%', y: '0px' },
      enter: { opacity: 1, x: '0%', y: '0px' },
      leave: { opacity: 0, x: '-25%', y: '0px' },
    };
  } else if (prevLoc && prevLoc.startsWith('/projects/')) {
    // bottom to top
    return {
      from: { opacity: 0, x: '0%', y: '200px' },
      enter: { opacity: 1,  x: '0%', y: '0px' },
      leave: { opacity: 0,  x: '0%', y: '-100px' },
    };
  }
  // top to bottom
  return {
    from: { opacity: 0, x: '0%', y: '-200px' },
    enter: { opacity: 1,  x: '0%', y: '0px' },
    leave: { opacity: 0,  x: '0%', y: '100px' },
  };
}
