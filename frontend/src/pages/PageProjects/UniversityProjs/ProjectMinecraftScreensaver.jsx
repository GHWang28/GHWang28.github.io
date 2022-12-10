import React, { Fragment } from 'react';
import { Box, Link } from '@mui/material';
import ButtonGoBack from '../../../components/ButtonGoBack';
import ImageGallery from '../../../components/ImageGallery';
import AnimatedTitle from '../AnimatedTitle';
import BoxInfo from '../../../components/BoxInfo';

export default function ProjectMinecraftScreensaver () {

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <AnimatedTitle title={'Minecraft Screensaver'} />
      <ImageGallery
        imgArray={[
          'https://youtu.be/dCYTLbNl_to',
        ]}
      />
      <BoxInfo
        title='Project Description'
      >
        {'A small interactable screensaver based on the game '} 
        <Link href='https://www.minecraft.net/' target='_blank'>{'Minecraft'}</Link>
        {
          `. All textures used in the projects belong to `
        }
        <Box component='span' sx={{ color: 'red.main' }}>{'Mojang Studios'}</Box>
        {'.'}
      </BoxInfo>
      <BoxInfo>
        {'To prevent plagiarism, the source code for this project can not be '}
        <Box component='span' sx={{ color: 'red.main' }}>{'publicly'}</Box>
        {' shared.'} 
      </BoxInfo>
      {/*
      <Typography mt={5} mb={4} variant='h3' fontWeight='bold' align='center'>
        {'Download'}
      </Typography>
      <BoxInfo
        footer={
          <ButtonDownload
            title={'Download MinecraftRecreation.exe'}
            downloadLink={'https://drive.google.com/u/0/uc?id=1q4tB-9zCkvce8WCnNo_TBP7hWTyT8aqa&export=download&confirm=t'}
            fileName={'MinecraftRecreation.zip'}
          />
        }
      >
        {`As per `}
        <Box component='span' sx={{ color: 'yellow.main' }}>{'UNSW'}</Box>
        {
          ` Policy, the source code for this project can not be publicly shared.
          However, you may download the production build of the project here. `
        } 
        <Box component='span' sx={{ color: 'red.main' }}>{'(.exe file is not certified nor signed)'}</Box>
      </BoxInfo>
      */}
    </Fragment>
  )
}