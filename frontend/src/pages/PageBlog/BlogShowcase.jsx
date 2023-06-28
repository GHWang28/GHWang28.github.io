
import React, { Fragment } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import PageError from '../PageError';
import ImageZoomable from '../../components/ImageZoomable';
import BootstrapTooltip from '../../components/BootstrapTooltip';
import { ISOToDateStr } from '../../helpers';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import blogs from './blogs';

export default function BlogShowcase () {
  const blogID = Number(useParams().blogID);

  const blogData = blogs.find((blogEntry) => ( blogEntry.id === blogID ));

  if (blogData == null) {
    return (
      <PageError />
    )
  }

  return (
    <Fragment>
      <ButtonGoBack destination={'/blog'} />

      <AnimatedTitle title={blogData.title} mt={0} subtitle={blogData.subtitle}>
        <Box sx={{ display: 'flex' }}>
          <BootstrapTooltip  title='Creation Date' placement={'top'}>
            <Chip sx={{ flex: 1, mx: 1 }} icon={<CalendarTodayIcon />} label={ISOToDateStr(blogData.created)} variant='outlined' />
          </BootstrapTooltip>
          <BootstrapTooltip title='Estimated Time to Read' placement={'top'}>
            <Chip sx={{ flex: 1, mx: 1 }} icon={<AvTimerIcon />} label={`~${blogData.estimatedReadingTime} minutes`} variant='outlined' />
          </BootstrapTooltip>
        </Box>
      </AnimatedTitle>

        <Box display='flex' justifyContent='center'>
          <ImageZoomable
            src={blogData.thumbnail}
            sx={{
              width: '90%',
              maxWidth: '500px',
              borderRadius: '15px'
            }}
          />
        </Box>

        <Box
          mx='auto'
          p={2}
          sx={{
            maxWidth: '750px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {blogData.elements.map((elementData) => {
            switch(elementData.type) {
              default: return (
                <Typography fontSize={20} my={2}>{elementData.children}</Typography>
              );
              case 'h1':
              case 'h2':
              case 'h3': return (
                <Typography fontWeight='bold' my={2} variant={elementData.type}>{elementData.children}</Typography>
              )
            }
          })}
        </Box>
      
    </Fragment>
  )
}

