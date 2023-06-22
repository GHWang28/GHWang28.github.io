import React, { Fragment } from 'react'
import { useMediaQuery } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router';
import { useTransition } from 'react-spring';
import ContactDetails from '../components/ContactDetails';
import VersionNumber from '../components/VersionNumber';
import AnimatedAbsoluteWrapper from '../wrappers/AnimatedAbsoluteWrapper';
import PageAbout from './PageAbout';
import PageLanding from './PageLanding';
import PageProjects from './PageProjects';
import PageError from './PageError';
import PageBlog from './PageBlog';

export default function PageRouter () {
  const location = useLocation();
  const transitions = useTransition(location, getTransitionEffect(location.pathname, location?.state?.prevLocation));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const px = () => {
    if (largeMq) return 22;
    if (mediumMq) return 14;
    if (smallMq) return 6;
    return 0;
  }
  const pb = (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5;
  const pt = 8;

  return (
    <Fragment>
      {transitions((styles, item) => (
        <AnimatedAbsoluteWrapper style={styles} pb={pb} px={px()} pt={pt}>
          <Routes location={item}>
            <Route path='*' element={<PageError />}/>
            <Route path='/' element={<PageLanding />}/>
            <Route path='/projects/*' element={<PageProjects />}/>
            <Route path='/blog/*' element={<PageBlog />}/>
            <Route path='/about' element={<PageAbout />}/>
          </Routes>
        </AnimatedAbsoluteWrapper>
      ))}
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
    (currLoc === '/' && ['/projects', '/about', '/blog'].includes(prevLoc))
    || (currLoc === '/projects' &&  ['/about', '/blog'].includes(prevLoc))
    || (currLoc === '/blog' && '/about' === prevLoc)
  ) {
    // left to right
    console.log('okie')
    return {
      from: { opacity: 0, x: '-50%', y: '0px' },
      enter: { opacity: 1, x: '0%', y: '0px' },
      leave: { opacity: 0,  x: '25%', y: '0px' },
    }
  } else if (
    (currLoc === '/about' && ['/projects', '/', '/blog'].includes(prevLoc))
    || (currLoc === '/projects' && '/' === prevLoc)
    || (currLoc === '/blog' && ['/', '/projects'].includes(prevLoc))
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
