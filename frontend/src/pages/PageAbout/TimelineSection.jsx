import React from 'react';
import { Timeline } from "@mui/lab";
import TimelineEmploymentItem from './TimelineSectionItem';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

export default function TimelineSection ({ timelineItems, title, subtitle, odd}) {
  const [ref, inView] = useInView();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((odd) ? '-200px' : '200px'),
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
        position: 'sticky',
        top: '64px'
      }}
    >
      <Typography mt={5} variant='h3' fontWeight='bold' align='center'>
        {title}
      </Typography>
      <Typography variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {subtitle}
      </Typography>
      <Typography mb={4} variant='subtitle2' fontWeight='bold' align='center' color='text.secondary' sx={{ opacity: 0.55 }}>
        {'(Click on the icons to learn more)'}
      </Typography>
      <Timeline position='alternate' sx={{ mb: 0 }}>
        {timelineItems.map((entry, index) => (
          <TimelineEmploymentItem key={`timeline-entry-${index}`} data={entry} index={index} end={index === timelineItems.length - 1} />
        ))}
      </Timeline>
    </Box>
  )
}