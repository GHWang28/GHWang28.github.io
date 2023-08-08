import React from 'react';
import { Box, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TimelineData } from '../../../types';
import ImageAvatar from '../../../components/ImageAvatar';

type ComponentProps = {
  data: TimelineData,
  index: number,
}

const TimelineSectionItemSmall = ({ data, index }: ComponentProps) => {
  const [show, setShow] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  const onClick = () => {
    setShow(!show);
  }

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <Grid container mb={1.5} sx={{ flexDirection: (index % 2) ? 'row-reverse' : 'row' }}>
        <Grid item xs={5}>
          {/* Opp content */}
          <Typography color='text.secondary' align={(index % 2) ? 'left' : 'right'} fontWeight='bold'>
            {data.oppContent}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <ImageAvatar
            sx={{ rotate: (show) ? '360deg' : '0deg' }}
            alt='timeline-icon'
            src={data.timelineDotImg}
            bgcolor={data.timelineDotColor}
            onClick={onClick}
          />
        </Grid>
        <Grid item xs={5}>
          {/* Title of timeline */}
          <Typography color='primary.main' align={(index % 2) ? 'right' : 'left'} fontWeight='bold'>
            {data.timelineTitle}
          </Typography>
        </Grid>
      </Grid>
      
      <Collapse in={show} sx={{ border: '2px solid whitesmoke', mb: 1.5, mx: 3, borderRadius: '15px' }}>
        {data.timelineContent.map((dotpoint, dotpointIndex) => (
          <Typography
            key={`dotpoint-key-${index}-${dotpointIndex}`}
            p={3}
            fontSize='1.1rem'
            align='center'
            bgcolor={!(dotpointIndex % 2) ? 'rgb(0,0,0,0.4)' : ''}
            borderRadius={'15px'}
          >
            {dotpoint}
          </Typography>
        ))}
      </Collapse>
    </Box>
  )
}

export default TimelineSectionItemSmall;
