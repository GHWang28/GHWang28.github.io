import React, { Fragment, useState } from 'react';
import { Box } from '@mui/material';
import ButtonGoBack from '../../../components/ButtonGoBack';
import ImageGallery from '../../../components/ImageGallery';
import BoxInfo from '../../../components/BoxInfo';

export default function ProjectSlackr () {

  const [hover, setHover] = useState(false);

  return (
    <Fragment>
      <ButtonGoBack />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: -5, mt: -15 }}>
        <Box
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false) }}
          sx={{
            scale: (hover) ? '1.05' : '1.0',
            transition: 'scale 0.5s ease-in-out'
          }}
          component='img'
          src='/images/comp6080/slackr-logo.png'
          width='min(75%, 600px)'
        />
      </Box>
      <ImageGallery
        imgArray={[
          'https://youtu.be/7aiWjkj7hHA',
          'images/comp6080/slackr-mobile-responsive-1.png',
          'images/comp6080/slackr-mobile-responsive-2.png',
          'images/comp6080/slackr-mobile-responsive-3.png',
          'images/comp6080/slackr-mobile-responsive-4.png',
        ]}
      />
      <BoxInfo title='Project Description'>
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
        {'To prevent plagiarism, the source code for this project can not be '}
        <Box component='span' sx={{ color: 'red.main' }}>{'publicly'}</Box>
        {' shared.'} 
      </BoxInfo>
    </Fragment>
  )
}