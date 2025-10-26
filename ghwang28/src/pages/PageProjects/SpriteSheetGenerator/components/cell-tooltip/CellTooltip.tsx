import React from 'react';
import { styled } from '@mui/material';
import BootstrapTooltip from '../../../../../components/BootstrapTooltip';

type ComponentProps = {
  content: React.ReactNode[] | React.ReactNode
  children: React.ReactElement
}

const TooltipContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export const CellTooltip: React.FC<ComponentProps> = ({ content, children }) => {
  const arrayOfContent = Array.isArray(content) ? content : [content];

  return (
    <BootstrapTooltip
      title={
        <TooltipContent>
          {arrayOfContent.map((item, i) => <span key={`tooltip-content-${i}`}>{item}</span>)}
        </TooltipContent>
      }
      arrow
      disableInteractive
    >
      {children}
    </BootstrapTooltip>
  );
};

