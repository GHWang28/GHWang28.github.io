import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

export default function AccordionWrapper ({ children, title }) {

  const preventSwipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    }
  })

  return (
    <Accordion {...preventSwipeHandler} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography fontWeight='bold'>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

AccordionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
}
