import React from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { Box, ClickAwayListener, Collapse, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function TimelineSectionItem ({ data, index, end }) {
  const [show, setShow] = useState(false);
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
          <TimelineDot
            sx={{
              overflow: 'clip',
              WebkitTapHighlightColor: 'transparent',
              bgcolor: data.timelineDotColor,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'borderColor.main',
              cursor: 'pointer',
              '&:hover': {
                scale: '1.25'
              },
              transition: 'scale 0.2s ease-in-out, rotate 0.5s ease-in-out',
              rotate: (show) ? '360deg' : '0deg'
            }}
            onClick={onClick}
          >
            {(data.timelineDotImg) ? (
              <Box
                alt='Employment Timeline Icon'
                component={LazyLoadImage}
                effect='opacity'
                sx={{ width: '45px', height: '45px' }}
                src={data.timelineDotImg}
              />
            ) : (
              <WorkHistoryIcon sx={{ width: '45px', height: '45px' }} />
            )}
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

TimelineSectionItem.propTypes = {
  data: PropTypes.shape({
    oppContent: PropTypes.string,
    timelineDotColor: PropTypes.string,
    timelineDotImg: PropTypes.string,
    timelineTitle: PropTypes.string,
    timelineContent: PropTypes.array
  }),
  index: PropTypes.number,
  end: PropTypes.bool,
};
