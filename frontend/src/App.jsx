import './ImageZoom.css';
import './App.css';
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageLanding from './pages/PageLanding';
import Background from './components/Background';
import PageProjects from './pages/PageProjects';
import { useTransition, animated } from 'react-spring';
import AbsoluteWrapper from './pages/AbsoluteWrapper';
import { useEffect } from 'react';

function App() {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const location = useLocation();

  const px = () => {
    if (largeMq) return 24;
    if (mediumMq) return 16;
    if (smallMq) return 8;
    return 0;
  }
  const pb = (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5;
  const pt = '64px';
  useEffect(() => {})

  const getTransitionEffect = () => {
    const defaultTransition = {
      from: { opacity: 0, transform: 'translate3d(0,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(0,0,0)' },
    }
    const currLoc = location.pathname;
    const prevLoc = location.state.prevLocation;
    if (currLoc === '/' && prevLoc === '/projects') {
      return {
        from: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0%,0,0)' },
      }
    } else if (currLoc === '/about' && prevLoc === '/projects') {
      return {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0%,0,0)' },
      }
    } else if (currLoc === '/projects' && prevLoc === '/') {
      return {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0%,0,0)' },
      }
    }
    console.log('Got here 3')
    return defaultTransition;
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
                <></>
              }/>
            </Routes>
          </animated.div>
        ))}
      </Box>
      <Background />
    </Box>
    
  );
}

export default App;
