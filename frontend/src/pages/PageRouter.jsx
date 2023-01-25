import React, { Fragment } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router';
import { animated, useTransition } from 'react-spring';
import ContactDetails from '../components/ContactDetails';
import VersionNumber from '../components/VersionNumber';
import AbsoluteWrapper from '../wrappers/AbsoluteWrapper';
import PageAbout from './PageAbout';
import PageLanding from './PageLanding';
import PageProjects from './PageProjects';

export default function PageRouter () {
  const theme = useTheme();
  const location = useLocation();
  const transitions = useTransition(location, getTransitionEffect(location.pathname, location?.state?.prevLocation));
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery(theme.breakpoints.up('md'));
  const largeMq = useMediaQuery(theme.breakpoints.up('lg'));

  const px = () => {
    if (largeMq) return 22;
    if (mediumMq) return 14;
    if (smallMq) return 6;
    return 0;
  }
  const pb = (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5;
  const pt = '64px';

  return (
    <Fragment>
      <Box
        sx={{
          color: (theme.palette.mode === 'light') ? 'rgb(36,36,36)' : 'whitesmoke',
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
    </Fragment>
  )
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
