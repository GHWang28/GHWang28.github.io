import React from 'react';
import { Timeline } from "@mui/lab";
import TimelineSectionItem from './TimelineSectionItem';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import TimelineSectionItemSmall from './TimelineSectionItemSmall';
import { TimelineData } from '../../../types';

type ComponentProps = {
  timelineItems: TimelineData[],
  title: string,
  subtitle: string,
  odd?: boolean
}

const TimelineSection = ({ timelineItems, title, subtitle, odd }: ComponentProps) => {
  const smallMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm')); 
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((odd) ? '-200px' : '200px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        position: 'sticky',
        top: '94px'
      }}
    >
      <Typography mt={5} variant='h4' fontWeight='bold' align='center'>
        {title}
      </Typography>
      <Typography variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {subtitle}
      </Typography>
      <Typography mb={4} variant='subtitle2' fontWeight='bold' align='center' color='text.secondary' sx={{ opacity: 0.55 }}>
        {'(Click on the icons to learn more)'}
      </Typography>
      {(smallMq) ? (
        <Timeline position='alternate' sx={{ mb: 0 }}>
          {timelineItems.map((entry, index) => (
            <TimelineSectionItem key={`timeline-entry-${index}`} data={entry} index={index} end={index === timelineItems.length - 1} />
          ))}
        </Timeline>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          {timelineItems.map((entry, index) => (
            <TimelineSectionItemSmall key={`timeline-entry-${index}`} data={entry} index={index} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default TimelineSection;
