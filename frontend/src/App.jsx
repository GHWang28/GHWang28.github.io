import './App.css';
import React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import PageXnY from './pages/PageXnY.jsx';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(150, 246, 246)'
    },
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ color: 'whitesmoke' }}>
        <Navbar />
        <PageXnY />
      </Box>
    </ThemeProvider>
  );
}

export default App;
