import './styles/App.css';
import './styles/CoinBlock.css';
import './styles/Gradient.css';
import './styles/Sparklez.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { createTheme, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { preloadImgs } from './helpers';
import Navbar from './components/Navbar';
import ImageZoomer from './components/ImageZoomer';
import PageRouter from './pages/PageRouter';
import SwipeTutorial from './components/SwipeTutorial';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const themeMode = useSelector(state => state.themeMode);
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: (themeMode === 'light') ? 'rgb(15,182,182)' : 'rgb(150,246,246)'
      },
      purple: {
        main: (themeMode === 'light') ? 'rgb(150,2,209)' : 'rgb(230,169,254)',
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
        main: 'rgb(40,40,40)',
        translucent: 'rgba(40,40,40,0.7)',
        transparent: 'rgba(40,40,40,0.2)'
      },
      gray: {
        main: 'rgb(65,70,80)',
        transparent: 'rgba(65,70,80,0.2)'
      },
      orange: {
        main: 'rgb(255,146,72)',
        transparent: 'rgba(255,146,72,0.15)'
      },
      borderColor: {
        main: (themeMode === 'light') ? 'black' : 'whitesmoke',
      },
      tooltipColor: {
        bgColor: (themeMode === 'light') ? 'black' : 'whitesmoke',
        textColor: (themeMode === 'light') ? 'whitesmoke' : 'black'
      },
      bgColor: {
        main: (themeMode === 'light') ? 'rgba(245,245,245,0.6)' : 'rgba(40,40,40,0.7)',
        darker: (themeMode === 'light') ? 'rgba(205,205,205,0.6)' : 'rgba(0,0,0,0.7)',
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
  }, [themeMode]);

  const { ref: documentRef } = useSwipeable({
    delta: 50,
    preventScrollOnSwipe: true,
    onSwipedLeft: () => {
      if (location.pathname === '/') {
        navigate('/projects', { state: { prevLocation: location.pathname } });
      } else if (location.pathname.startsWith('/projects')) {
        navigate('/about', { state: { prevLocation: location.pathname } });
      }
    },
    onSwipedRight: () => {
      if (location.pathname === '/about') {
        navigate('/projects', { state: { prevLocation: location.pathname } });
      } else if (location.pathname.startsWith('/projects')) {
        navigate('/', { state: { prevLocation: location.pathname } });
      }
    }
  });

  useEffect(() => {
    // Adds swipeable to the document
    documentRef(document);
  }, [documentRef]);

  return (
    <ThemeProvider theme={darkTheme}>
      <SwipeTutorial />
      <Navbar />
      <PageRouter />
      <ImageZoomer />
    </ThemeProvider>
  );
}
