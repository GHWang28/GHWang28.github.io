import React, { Fragment, Suspense } from 'react'
import Box from '@mui/material/Box';
import { Route, Routes, useLocation } from 'react-router';
import { animated, useTransition } from '@react-spring/web';
import ContactDetails from '../components/ContactDetails';
import VersionNumber from '../components/VersionNumber';
import PageLanding from './PageLanding';
import PageProjects from './PageProjects';
import PageError from './PageError';
import PageBlog from './PageBlog';
import PageSkills from './PageSkills';
import PageLoading from './PageLoading';
const PageAbout = React.lazy(() => import('./PageAbout'));

const PageRouter = () => {
  const location = useLocation();
  const transitions = useTransition(location, getTransitionEffect(location.pathname, location?.state?.prevLocation));
  const AnimatedBox = animated(Box);

  return (
    <Fragment>
      {transitions(({ position, ...styles }, item) => (
        <AnimatedBox style={{ ...styles, position: position as any }} sx={{ width: '100vw', left: '0px', top: '0px', overflow: 'clip' }}>
          <Box
            pb={(location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5}
            px={{ xs: 0, sm: 6, md: 15, lg: 22 }}
            pt={{ xs: 12, sm: 8 }}
          >
            <Routes location={item}>
              <Route path='*' element={<PageError />}/>
              <Route path='/' element={<PageLanding />}/>
              <Route path='/projects/*' element={<PageProjects />}/>
              <Route path='/blog/*' element={<PageBlog />}/>
              <Route path='/about' element={<Suspense fallback={<PageLoading />}><PageAbout /></Suspense>}/>
              <Route path='/about/skills' element={<PageSkills />}/>
            </Routes>
          </Box>
        </AnimatedBox>
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
const getTransitionEffect = (currLoc: string, prevLoc: string) => {
  if (
    (currLoc === '/' && ['/projects', '/about', '/blog'].includes(prevLoc))
    || (currLoc === '/projects' &&  ['/about', '/blog'].includes(prevLoc))
    || (currLoc === '/blog' && '/about' === prevLoc)
  ) {
    // left to right
    return {
      from: { opacity: 0, x: '-25%', y: '0px', position: 'absolute' },
      enter: { opacity: 1, x: '0%', y: '0px', position: 'absolute' },
      leave: { opacity: 0,  x: '12.5%', y: '0px', position: 'static' },
    }
  } else if (
    (currLoc === '/about' && ['/projects', '/', '/blog'].includes(prevLoc))
    || (currLoc === '/projects' && '/' === prevLoc)
    || (currLoc === '/blog' && ['/', '/projects'].includes(prevLoc))
  ) {
    // right to left
    return {
      from: { opacity: 0, x: '25%', y: '0px', position: 'static' },
      enter: { opacity: 1, x: '0%', y: '0px', position: 'static' },
      leave: { opacity: 0, x: '-12.5%', y: '0px', position: 'absolute' },
    };
  } else if (prevLoc && prevLoc.startsWith('/projects/')) {
    // bottom to top
    return {
      from: { opacity: 0, x: '0%', y: '200px', position: 'absolute' },
      enter: { opacity: 1,  x: '0%', y: '0px', position: 'absolute' },
      leave: { opacity: 0,  x: '0%', y: '-100px', position: 'static' },
    };
  }
  // top to bottom
  return {
    from: { opacity: 0, x: '0%', y: '-200px', position: 'static' },
    enter: { opacity: 1,  x: '0%', y: '0px', position: 'static' },
    leave: { opacity: 0,  x: '0%', y: '100px', position: 'absolute' },
  };
}

export default PageRouter;
