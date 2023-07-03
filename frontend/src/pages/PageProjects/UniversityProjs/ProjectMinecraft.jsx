import React, { Fragment } from 'react';
import { Box, Link } from '@mui/material';
import ButtonGoBack from '../../../components/ButtonGoBack';
import ImageGallery from '../../../components/ImageGallery';
import BoxInfo from '../../../components/BoxInfo';
import GradientTitle from '../../../components/GradientTitle';

export default function ProjectMinecraft () {

  return (
    <Fragment>
      <ButtonGoBack destination={'/projects'} />
      <GradientTitle title={'Minecraft Recreation'} />
      <ImageGallery
        imgArray={[
          'https://youtu.be/xIFnil_tP2s',
          'https://youtu.be/PsKbE1M6UJg',
          '/images/minecraft-recreation/1.png',
          '/images/minecraft-recreation/2.png',
          '/images/minecraft-recreation/3.png',
          '/images/minecraft-recreation/4.png',
          '/images/minecraft-recreation/5.png'
        ]}
      />
      <BoxInfo
        title='Project Description'
      >
        <Link href='https://www.minecraft.net/' target='_blank'>{'Minecraft'}</Link>
        {
          ` is a game developed by `
        }
        <Box component='span' sx={{ color: 'red.main' }}>{'Mojang Studios'}</Box>
        {
          `. This University project created by Gordon Wang for `
        }
        <Box component='span' sx={{ color: 'yellow.main' }}>{'UNSW'}</Box>
        {
          `'s COMP3421 aims to recreate the basic gameplay mechanics of Minecraft's
          creative mode. It aims to retain the game's original charm while adding on other features
          such as Shadow mapping. This project was written in C++ and uses the `
        }
        <Link href='https://www.opengl.org/' target='_blank'>
          {'Open Graphics Library'}
        </Link>
        {
          `. All textures used in the projects, aside from the "Mirror Block"
          and "Marccoin Block" rightfully belongs to `
        }
        <Box component='span' sx={{ color: 'red.main' }}>{'Mojang Studios'}</Box>
        {'.'}
      </BoxInfo>
      <BoxInfo plagiarism/>
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