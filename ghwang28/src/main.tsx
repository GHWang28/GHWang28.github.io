import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './wrappers/ScrollToTop';
import Background from './components/Background';
import EasterEggConsole from './wrappers/EasterEggConsole';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'overlayscrollbars/overlayscrollbars.css';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import ReduxProvider from './wrappers/ReduxProvider';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <HashRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
        <Background />
      </HashRouter>
    </ReduxProvider>
    <EasterEggConsole />
  </React.StrictMode>,
)
