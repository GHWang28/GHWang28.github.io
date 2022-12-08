import './fonts/font.css';
import './ImageZoom.css';
import './App.css';
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageLanding from './pages/PageLanding';
import Background from './components/Background';
import PageProjects from './pages/PageProjects';

function App() {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const location = useLocation();

  const calcMarginX = () => {
    if (largeMq) return 24;
    if (mediumMq) return 16;
    if (smallMq) return 8;
    return 0;
  }

  return (
    <Box>
      <Navbar />
      <Box
        name='sd'
        sx={{
          color: 'whitesmoke',
          px: calcMarginX(),
          pb: (location.pathname.includes('/projects/showcase') || location.pathname === '/') ? 0 : 5,
          overflowX: 'clip',
        }}
      >
        <Routes>
          <Route path='/' element={<PageLanding />}/>
          <Route path='/projects/*' element={<PageProjects />}/>
          <Route path='/about' element={<></>}/>
        </Routes>
      </Box>
      <Background />
    </Box>
    
  );
}

export default App;
