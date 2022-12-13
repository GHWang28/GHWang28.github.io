import React from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { Box, Collapse, keyframes, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useState } from 'react';

const rotateAnimation = keyframes`
  0% {
    rotate: 0deg
  }
  100% {
    rotate: 360deg
  }
`

const rotateAnimationReverse = keyframes`
  0% {
    rotate: 360deg
  }
  100% {
    rotate: 0deg
  }
`

export default function TimelineEmploymentItem ({ data, index }) {
  const [hide, setHide] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <TimelineItem>
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
            transition: 'scale 0.2s ease-in-out',
            animation: (hide) ? `${rotateAnimation} 0.5s ease-in-out 1` : `${rotateAnimationReverse} 0.5s ease-in-out 1`
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
          <TimelineConnector />
        )}
      </TimelineSeparator>
      <TimelineContent mb={5}>
        <Typography color='primary.main' mb={1.5} fontWeight='bold'>
          {data.timelineTitle}
        </Typography>
        <Collapse in={hide}>
          <Box component='ul' sx={{ direction: (index % 2) ? 'rtl' : '' }}>
            <Typography>
              {data.timelineContent && data.timelineContent.map((dotpoint, dotpointIndex) => (
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
            </Typography>
          </Box>
        </Collapse>
      </TimelineContent>
    </TimelineItem>
  )
}