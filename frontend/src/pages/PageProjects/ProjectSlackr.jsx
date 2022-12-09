import React, { Fragment } from 'react';
import { Box } from '@mui/material';
import ButtonGoBack from '../../components/ButtonGoBack';
import ImageGallery from '../../components/ImageGallery';
import AnimatedTitle from './AnimatedTitle';
import BoxInfo from '../../components/BoxInfo';

export default function ProjectSlackr () {

  return (
    <Fragment>
      <ButtonGoBack />
      <AnimatedTitle title={'Slackr'} />
      <ImageGallery
        imgArray={[
          'https://youtu.be/7aiWjkj7hHA',
        ]}
      />
      <BoxInfo
        title='Project Description'
      >
        {
          `This University Assignment created by Gordon Wang for `
        }
        <Box component='span' sx={{ color: 'yellow.main' }}>{'UNSW'}</Box>
        {
          `'s COMP6080 is a simple messaging platform with a plethora of features such as but not limited to:`
        }
        <Box component='li'>{'Logging in'}</Box>
        <Box component='li'>{'Registration'}</Box>
        <Box component='li'>{'Error Popups'}</Box>
        <Box component='li'>{'Public and Private Channels'}</Box>
        <Box component='li'>{'Messaging Editing Options'}</Box>
        <Box component='li'>{'Message React'}</Box>
        <Box component='li'>{'Message Pinning'}</Box>
        <Box component='li'>{'Hybrid Messages with Images'}</Box>
        <Box component='li'>{'Infinite Message Scrolling'}</Box>
        <Box component='li'>{'User Profile'}</Box>
        <Box component='li'>{'Toggleable Push Notifications'}</Box>
        <Box component='li'>{'Offline Access to recently accessed Channel'}</Box>
        <Box component='li'>{'Fragment based URL routing'}</Box>
        <br/>
        {
          `This Assignment introduced my to `
        }
          <Box component='span' sx={{ color: 'green.main' }}>{'JavaScript'}</Box>
        {
          ` and gave me experience in working with the HTML Document Object Model and Service Workers.`
        }
      </BoxInfo>
      <BoxInfo>
        {'Due to '}
        <Box component='span' sx={{ color: 'yellow.main' }}>{'University'}</Box>
        {' Policies, the source code for this project can not be '}
        <Box component='span' sx={{ color: 'red.main' }}>{'publicly'}</Box>
        {' shared.'} 
        <br/>
        <Box component='span' sx={{ opacity: 0.5 }}>
          {'(However, may be requested for by contacting me).'} 
        </Box>
      </BoxInfo>
    </Fragment>
  )
}