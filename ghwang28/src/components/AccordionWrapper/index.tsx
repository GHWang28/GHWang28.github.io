import React from 'react';
import { Typography, styled } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type ComponentProps = {
  children: React.ReactNode,
  title?: string,
  bgcolor?: string
}

const StyledSummary = styled('summary')(({ theme }) => ({
  listStyleType: 'none',
  padding: '16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.contrastColor.main,
  '::webkit-details-marker': {
    display: 'none'
  }
}))

const StyledDetails = styled('details')(({ theme }) => ({
  backgroundColor: theme.palette.bgColor.main,
  '& > summary > svg': {
    color: 'inherit',
    rotate: '180deg',
    transition: 'rotate 0.2s ease-in-out'
  },
  '&[open] > summary > svg': {
    rotate: '0deg',
  }
}))

const AccordionWrapper = ({ children, title } : ComponentProps) => {

  const preventSwipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    }
  })

  const onClick = () => {
    window.getSelection()?.removeAllRanges();
  }

  return (
    <StyledDetails {...preventSwipeHandler}>
      <StyledSummary onClick={onClick}>
        <Typography fontWeight='bold'>{title}</Typography>
        <ExpandMoreIcon />
      </StyledSummary>
      <section>
        {children}
      </section>
    </StyledDetails>
  )
}

export default AccordionWrapper;
