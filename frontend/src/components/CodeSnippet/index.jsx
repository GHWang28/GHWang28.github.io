import React from 'react';
import { useTheme } from '@mui/material';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import PropTypes from 'prop-types';
import AccordionWrapper from '../AccordionWrapper';

export default function CodeSnippet ({ snippet, title, ...props }) {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const codeBlock = (
    <SyntaxHighlighter {...props} style={lightMode ? light : dark}>
      {snippet}
    </SyntaxHighlighter>
  )

  return (title != null) ? (
    <AccordionWrapper title={`💡 Code Snippet - ${title}`}>
      {codeBlock}
    </AccordionWrapper>
  ) : (
    codeBlock
  )
}

CodeSnippet.propTypes = {
  snippet: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  showLineNumbers: PropTypes.bool,
  accordionMode: PropTypes.bool
};

