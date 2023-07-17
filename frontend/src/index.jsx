import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import combinedReducer from './redux/reducer/combinedReducer';
import { configureStore } from '@reduxjs/toolkit';
import ScrollToTop from './wrappers/ScrollToTop';
import Background from './components/Background';
import EasterEggConsole from './wrappers/EasterEggConsole';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'overlayscrollbars/overlayscrollbars.css';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

// import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: combinedReducer,
});

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
        <Background />
      </HashRouter>
    </Provider>
    <EasterEggConsole />
  </React.StrictMode>
);

// reportWebVitals();
