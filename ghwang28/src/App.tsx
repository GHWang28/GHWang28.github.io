import './styles/App.css';
import './styles/CoinBlock.css';
import './styles/Gradient.css';
import React, { useEffect, Suspense } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageZoomer from './components/ImageZoomer';
import config from './config.json';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useAppSelector } from './hooks';
import PageLoading from './pages/PageLoading';
import { PageGlobalError } from './pages/PageGlobalError';
const PageRouter = React.lazy(() => import('./pages/PageRouter'));
const Navbar = React.lazy(() => import('./components/Navbar'));

declare module '@mui/material/styles' {
  interface PaletteColor {
    transparent?: string,
    translucent?: string,
    bgColor?: string,
    darker?: string
  }
  interface SimplePaletteColorOptions  {
    transparent?: string,
    translucent?: string,
    bgColor?: string,
    darker?: string
  }

  interface Palette {
    purple: Palette['primary'],
    green: Palette['primary'],
    red: Palette['primary'],
    blue: Palette['primary'],
    yellow: Palette['primary'],
    white: Palette['primary'],
    black: Palette['primary'],
    darkgray: Palette['primary'],
    gray: Palette['primary'],
    orange: Palette['primary'],
    contrastColor: Palette['primary'],
    tooltipColor: Palette['primary'],
    bgColor: Palette['primary'],
  }
  interface PaletteOptions {
    purple: PaletteOptions['primary'],
    green: PaletteOptions['primary'],
    red: PaletteOptions['primary'],
    blue: PaletteOptions['primary'],
    yellow: PaletteOptions['primary'],
    white: PaletteOptions['primary'],
    black: PaletteOptions['primary'],
    darkgray: PaletteOptions['primary'],
    gray: PaletteOptions['primary'],
    orange: PaletteOptions['primary'],
    contrastColor: PaletteOptions['primary'],
    tooltipColor: PaletteOptions['primary'],
    bgColor: PaletteOptions['primary'],
  }
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const themeMode = useAppSelector(state => state.themeMode) === 'light';
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: (themeMode) ? 'rgb(15,182,182)' : 'rgb(150,246,246)'
      },
      purple: {
        main: (themeMode) ? 'rgb(150,2,209)' : 'rgb(230,169,254)',
        transparent: 'rgba(230,169,254,0.15)'
      },
      green: {
        main: (themeMode) ? 'rgb(73,122,21)' : 'rgb(185,239,164)',
        transparent: 'rgba(185,239,164,0.15)'
      },
      red: {
        main: (themeMode) ? 'rgb(150,0,0)' : 'rgb(240,128,128)',
        transparent: 'rgba(240,128,128,0.15)'
      },
      blue: {
        main: (themeMode) ? 'rgb(22,34,56)' : 'rgb(150,246,246)',
        transparent: (themeMode) ? 'rgba(22,34,56,0.15)' : 'rgba(150,246,246,0.15)'
      },
      yellow: {
        main: (themeMode) ? '#483800' : 'rgb(255,255,92)',
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
        main: (themeMode) ? 'rgb(40,40,40)' : 'rgb(65,70,80)',
        translucent: (themeMode) ? 'rgba(40,40,40,0.7)' : 'rgba(65,70,80,0.7)',
        transparent: (themeMode) ? 'rgba(40,40,40,0.2)' : 'rgba(65,70,80,0.2)'
      },
      orange: {
        main: 'rgb(255,146,72)',
        transparent: 'rgba(255,146,72,0.15)'
      },
      contrastColor: {
        main: (themeMode) ? 'black' : 'whitesmoke',
      },
      tooltipColor: {
        main: (themeMode) ? 'whitesmoke' : 'black',
        bgColor: (themeMode) ? 'black' : 'whitesmoke'
      },
      bgColor: {
        main: (themeMode) ? 'rgb(225,225,225)' : 'rgb(40,40,40)',
        darker: (themeMode) ? 'rgb(205,205,205)' : 'rgb(0,0,0)',
        transparent: (themeMode) ? 'rgb(205,205,205,0.2)' : 'rgb(0,0,0,0.2)'
      },
      mode: (themeMode) ? 'light' : 'dark',
    },
    typography: {
      'fontFamily': '"Inter", "my-handwriting"',
      allVariants: {
        color: (themeMode) ? 'black' : 'whitesmoke'
      },
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true
        },
      },
    }
  });

  // Changes background color based on light or dark
  useEffect(() => {
    document.body.className = (themeMode) ? 'light-mode-bg' : 'dark-mode-bg'
  }, [themeMode]);

  // Handling swiping effect
  const { ref: documentRef } = useSwipeable({
    delta: 50,
    preventScrollOnSwipe: true,
    onSwipedRight: () => {
      const currIndex = config.PAGES.findIndex((element) => ( element.startsWith(location.pathname) ))
      const newIndex = currIndex - 1;

      if (newIndex >= 0) {
        navigate(config.PAGES[newIndex], { state: { prevLocation: location.pathname } });
      }
    },
    onSwipedLeft: () => {
      const currIndex = config.PAGES.findIndex((element) => ( element.startsWith(location.pathname) ))
      const newIndex = currIndex + 1;

      if (newIndex < config.PAGES.length) {
        navigate(config.PAGES[newIndex], { state: { prevLocation: location.pathname } });
      }
    }
  });

  // Adds swipeable to the document
  useEffect(() => {
    documentRef(document as unknown as HTMLElement);
  }, [documentRef]);

  // Handles the overlay scrollbar
  const [initialize] = useOverlayScrollbars({
    options: { scrollbars: { autoHide: 'scroll', theme: (themeMode) ? 'os-theme-dark' : 'os-theme-light' }, overflow: { x: 'hidden' } },
    defer: true
  })
  useEffect(() => {
    initialize(document.body);
  }, [initialize])

  return (
    <ThemeProvider theme={darkTheme}>
      <PageGlobalError>
        <ImageZoomer />
        <Suspense fallback={<PageLoading />}>
          <Navbar />
          {(useAppSelector(state => state.hideWebsite)) ? (
            <Box width='100vw' height='105vh' />
          ) : (
            <PageRouter />
          )}
        </Suspense>
      </PageGlobalError>
    </ThemeProvider>
  );
}
