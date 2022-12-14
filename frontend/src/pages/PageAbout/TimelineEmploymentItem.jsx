import React, { Fragment } from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { Box, Collapse, Typography, useMediaQuery } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function TimelineEmploymentItem ({ data, index }) {
  const [hide, setHide] = useState(false);
  const [hover, setHover] = useState(false);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [ref, inView] = useInView();

  return (
    <TimelineItem
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
      }}
    >
      <TimelineOppositeContent color='text.secondary' fontWeight='bold'>
        {data.oppContent}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            overflow: 'clip',
            bgcolor: data.timlineDotColor,
            cursor: 'pointer',
            scale: (hover) ? '1.25' : '1.0',
            transition: 'scale 0.2s ease-in-out, rotate 0.5s ease-in-out',
            rotate: (hide) ? '360deg' : '0deg'
          }}
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false) }}
          onClick={() => { setHide(!hide) }}
        >
          {(data.timelineDotImg) ? (
            <Box alt='employment-timeline-icon' component='img' sx={{ width: '45px', height: '45px' }} src={data.timelineDotImg}/>
          ) : (
            <WorkHistoryIcon sx={{ width: '45px', height: '45px' }} />
          )}
        </TimelineDot>
        {(data.timelineTitle !== 'Present Time') && (
          //  Show a connection to the next timeline item if it is not the last one
          <TimelineConnector />
        )}
      </TimelineSeparator>

      <TimelineContent mb={5}>
        {/* Title */}
        <Typography color='primary.main' mb={1.5} fontWeight='bold'>
          {data.timelineTitle}
        </Typography>
        {/* Body */}
        <Collapse in={hide}>
          {(mediumMq) ? (
            // Show dotpoints if the screensize is wide enough
            <Box component='ul' sx={{ direction: (index % 2) ? 'rtl' : '' }}>
              {data.timelineContent.map((dotpoint, dotpointIndex) => (
                <Box
                  key={`dotpoint-key-${index}-${dotpointIndex}`}
                  component='li'
                  p={1}
                  bgcolor={!(dotpointIndex % 2) ? 'rgb(0,0,0,0.4)' : ''}
                  borderRadius={'15px'}
                >
                  {dotpoint}
                </Box>
              ))}
            </Box>
          ) : (
            // Do not show dotpoints if the screen width is too low
            <Fragment>
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
            </Fragment>
          )}
          
        </Collapse>
      </TimelineContent>
    </TimelineItem>
  )
}