import React from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { ClickAwayListener, Collapse, Typography } from '@mui/material';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TimelineData } from '../../../types';
import ImageAvatar from '../../../components/ImageAvatar';

type ComponentProps = {
  data: TimelineData,
  index: number,
  end?: boolean
}

const TimelineSectionItem = ({ data, index, end = false }: ComponentProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  const onClick = () => {
    setShow(!show);
  }

  const onClickAway = () => {
    setShow(false);
  }

  return (
    <TimelineItem
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <TimelineOppositeContent color='text.secondary' fontWeight='bold'>
        {data.oppContent}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <ClickAwayListener onClickAway={onClickAway}>
          <TimelineDot sx={{ border: '0px', p: 0 }}>
            <ImageAvatar
              sx={{ rotate: (show) ? '360deg' : '0deg' }}
              alt='timeline-icon'
              src={data.timelineDotImg}
              bgcolor={data.timelineDotColor}
              onClick={onClick}
            />
          </TimelineDot>
        </ClickAwayListener>
        {(!end) && (
          // Only show a connector if this item is not the end
          <TimelineConnector />
        )}
      </TimelineSeparator>

      <TimelineContent mb={5}>
        {/* Title */}
        <Typography color='primary.main' mb={1.5} fontWeight='bold'>
          {data.timelineTitle}
        </Typography>
        {/* Body */}
        <Collapse in={show}>
          {data.timelineContent.map((dotpoint, dotpointIndex) => (
            <Typography
              key={`dotpoint-key-${index}-${dotpointIndex}`}
              p={1}
              fontSize={'min(1rem,2.5vw)'}
              bgcolor={!(dotpointIndex % 2) ? 'rgb(0,0,0,0.4)' : ''}
              borderRadius={'15px'}
            >
              {dotpoint}
            </Typography>
          ))}
        </Collapse>
      </TimelineContent>
    </TimelineItem>
  )
}

export default TimelineSectionItem;
