import React from 'react';
import { Timeline } from "@mui/lab";
import generateEmploymentTimeline from './employment';
import TimelineEmploymentItem from './TimelineEmploymentItem';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

export default function TimelineEmploymentSection () {
  const [ref, inView] = useInView();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '-200px',
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
        bgcolor: 'rgba(0,0,0,0.25)'
      }}
    >
      <Box component='hr' width='100%'/>
      <Typography mt={5} variant='h3' fontWeight='bold' align='center'>
        {'Employment Timeline'}
      </Typography>
      <Typography mb={4} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'(Click on the icons to learn more)'}
      </Typography>
      <Timeline position='alternate' sx={{ mb: 0 }}>
        {/* AIE */}
        {generateEmploymentTimeline().map((entry, index) => (
          <TimelineEmploymentItem key={`timeline-entry-${index}`} data={entry} index={index} />
        ))}
      </Timeline>
    </Box>
  )
}