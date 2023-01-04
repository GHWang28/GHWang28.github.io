import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import combinedReducer from './redux/reducer/combinedReducer';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import ScrollToTop from './wrappers/ScrollToTop';
import Background from './components/Background';
import EasterEggConsole from './wrappers/EasterEggConsole';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(150, 246, 246)'
    },
    purple: {
      main: "rgb(230,169,254)",
      transparent: "rgba(230,169,254,0.15)"
    },
    green: {
      main: "rgb(185,239,164)",
      transparent: "rgba(185,239,164,0.15)"
    },
    red: {
      main: "rgb(240,128,128)",
      transparent: "rgba(240,128,128,0.15)"
    },
    blue: {
      main: "rgb(150,246,246)",
      transparent: "rgba(150,246,246,0.15)"
    },
    darkblue: {
      main: "rgb(22,34,56)",
      transparent: "rgba(22,34,56,0.15)"
    },
    yellow: {
      main: "rgb(255,255,92)",
      transparent: "rgba(255,255,92,0.15)"
    },
    white: {
      main: "rgb(245,245,245)",
      transparent: "rgba(245,245,245,0.15)",
      translucent: "rgba(245,245,245,0.6)"
    },
    black: {
      main: "rgb(28,28,28)",
      translucent: "rgba(28,28,28,0.5)",
      transparent: "rgba(28,28,28,0.2)"
    },
    darkgray: {
      main: "rgb(40,40,40)",
      translucent: "rgba(40,40,40,0.7)",
      transparent: "rgba(40,40,40,0.2)"
    },
    gray: {
      main: "rgb(65,70,80)",
      transparent: "rgba(65,70,80,0.2)"
    },
    orange: {
      main: "rgb(255,146,72)",
      transparent: "rgba(255,146,72,0.15)"
    },
    mode: 'dark',
  },
  typography: {
    'fontFamily': '"Inter", "my-handwriting"'
  }
});

const store = configureStore({
  reducer: combinedReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={darkTheme}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
          <Background />
        </ThemeProvider>
      </HashRouter>
    </Provider>
    <EasterEggConsole />
  </React.StrictMode>
);

// reportWebVitals();
