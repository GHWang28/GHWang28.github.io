import './App.css';
import React, { Fragment } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
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

function App() {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const location = useLocation();
  const imgZoom = useSelector(state => state.imgZoom);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    preloadImgs([
      '/images/hscbow/homesweethome.jpg',
      '/images/hscbow/leaving.jpg',
      '/images/hscbow/bonvoyage.jpg',
      '/images/hscbow/rabureta.jpg',
      '/images/hscbow/ruiji.jpg',
      '/images/hscbow/homecoming.jpg'
    ]);
  }, []);

  const px = () => {
    if (largeMq) return 24;
    if (mediumMq) return 16;
    if (smallMq) return 8;
    return 0;
  }
  const pb = (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5;
  const pt = '64px';

  /**
   * Manages how to transition between each page
   */
  const getTransitionEffect = () => {
    const currLoc = location.pathname;
    const prevLoc = location?.state?.prevLocation;

    if (
      (currLoc === '/' && (prevLoc === '/projects' || prevLoc === '/about'))
      || (currLoc === '/projects' && prevLoc === '/about')
    ) {
      // left to right
      return {
        from: { opacity: 0, x: '-50%', y: '0%' },
        enter: { opacity: 1, x: '0%', y: '0%' },
        leave: { opacity: 0,  x: '25%', y: '0%' },
      }
    } else if (
      (currLoc === '/about' && (prevLoc === '/projects' || prevLoc === '/'))
      || (currLoc === '/projects' && prevLoc === '/')
    ) {
      // right to left
      return {
        from: { opacity: 0, x: '50%', y: '0%' },
        enter: { opacity: 1, x: '0%', y: '0%' },
        leave: { opacity: 0, x: '-25%', y: '0%' },
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

  const transitions = useTransition(location, getTransitionEffect());

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Box
        sx={{
          color: 'whitesmoke',
          overflowX: 'clip',
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
                <AbsoluteWrapper pb={pb} px={px()} pt={pt}><Typography align='center'> W.I.P.</Typography></AbsoluteWrapper>
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
    </Box>
  );
}

export default App;
