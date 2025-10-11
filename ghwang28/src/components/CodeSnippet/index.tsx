import React from 'react';
import { useTheme } from '@mui/material';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import AccordionWrapper from '../AccordionWrapper';

type ComponentProps = {
  snippet: string,
  title?: string,
  [key: string]: any
}

const CodeSnippet = ({ snippet, title, ...props }: ComponentProps) => {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const codeBlock = (
    // @ts-expect-error
    <SyntaxHighlighter customStyle={{ margin: '0px' }} {...props} style={lightMode ? light : dark}>
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

export default CodeSnippet;
