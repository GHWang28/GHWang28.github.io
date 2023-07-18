import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ComponentProps = {
  children: React.ReactNode,
  title?: string,
  bgcolor?: string
}

const AccordionWrapper = ({ children, title, bgcolor } : ComponentProps) => {

  const preventSwipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    }
  })

  return (
    <Accordion {...preventSwipeHandler} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor }}
      >
        <Typography fontWeight='bold'>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionWrapper;
