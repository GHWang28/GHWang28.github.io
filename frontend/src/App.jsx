import './App.css';
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import PageXnY from './pages/PageXnY.jsx';
import { Route, Routes } from 'react-router-dom';
import PageLanding from './pages/PageLanding';

function App() {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }} >
      <Box sx={{ flexGrow: 0 }}>
        <Navbar />
      </Box>
      <Box sx={{ color: 'whitesmoke', mx: (smallMq) ? 7 : 0, flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<PageLanding />}/>
            <Route path='/projects' element={<PageXnY />}/>
            <Route path='/about' element={<></>}/>
          </Routes>
      </Box>
    </Box>
  );
}

export default App;
