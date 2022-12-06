import React, { Fragment } from 'react';
import { Box, Link, Typography } from '@mui/material';
import ButtonDownload from '../../components/ButtonDownload';
import ButtonGoBack from '../../components/ButtonGoBack';
import ImageGallery from '../../components/ImageGallery';
import AnimatedTitle from './AnimatedTitle';
import BoxInfo from '../../components/BoxInfo';

export default function ProjectMinecraft () {

  return (
    <Fragment>
      <ButtonGoBack />
      <AnimatedTitle title={'Minecraft Recreation'} />
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
      <Typography mt={5} mb={4} variant='h3' fontWeight='bold' align='center'>
        {'Download'}
      </Typography>
      <BoxInfo
        footer={
          <ButtonDownload
            title={'Download MinecraftRecreation.exe'}
            downloadLink={'https://doc-14-80-docs.googleusercontent.com/docs/securesc/jqsbbjl9smnh64i2chnp9rgk1bhrl706/gcntl48bk3nfsubbauulvfund71j5bre/1670300925000/05440603545508964043/05440603545508964043/1q4tB-9zCkvce8WCnNo_TBP7hWTyT8aqa?e=download&ax=AEKYgyRelnxNjgFV2tPqKS4RB6aUmBVeA8OHlEVzyL4PnoE8xI33zxmIwATohKZ0eUewKB4GBDvLvCDoKQwx2vCeEb7vXGxhW3_JqtPoJ5dBofKVR9bOIgqw5af9XFdurUZi1y8AQO5ADHNX9bFkmXukK1koUY38dtFXCUBkyQvOcBM6fjuivS5a7UFkXpmFSdYCXeJOs4-iNOO7cYTtwIBPe649bqbteIL4QDJeKzAYESmwVhqK8aVlDSksVUcXkIrxSjfV842EZhjqncWSH_bX6fIFcsPoIXtv7umk29sWVP9VLns99G_fIbQN6l0ohz0shw0K1EVm6LiMsE6z9eIGRl4MQp-mBpbmvG-6vae4QBLJFU8MqXKX30DIdHjKFD9k2Q9bQ-w2HGXu2BFjVWedExoK5RqtLu7x_nteo9n6jUOeZXfUC9wZgEiytCfogruGoKH9WYwVnKS9dz22IG15uZ7TP-cdgoUcpO_0SSoWSkJz8_stO8RXCzL3CO64jfgqCSZpRlLmv8eaDwK_a0Y6L7K-d2_0k6oZgBmydvaK4L_jRHqp5RwMc1_EoxxQ-I-Ad8CL_bE4V9hEx2Re4j1d_Fv8G9-jHunBIAUWKPMdrlI7Ek31zrdbxCmRu_kOnerNfm-eGsdtvSgRDqITIRLyRlT2yHziVeFCRFQPiNLwvN-3VU_Mu_eMRyT07akyE-sI2Q7h-fhPKMnnqhflnB-m0q0xlfS-io5TQmc0673i7K8u2_5tftWvf9kLJ9TVSJnDoGWHkRua0jwMFlc-Mskpcc-c7kkcJM-0T0a1qTsZ-GV8EqRjWBRCbCHlZ5pv-6n1VjYi6deaDCxFgNUHRu1P244o0rRH98RIL_4oHW7_n9wruHwELpLNGstokzLGZxS41N1Ymwc1Fed_fYPwJX1EG7RzEW_VFDE&uuid=4c73c4b9-dc2f-4d77-b041-33fec23ee664&authuser=0&nonce=qnbq9g19qtiag&user=05440603545508964043&hash=8vfq4mqra019vm8cn40n4a8k9qkq6i2k'}
            fileName={'MinecraftRecreation.zip'}
          />
        }
      >
        {`As per `}
        <Box component='span' sx={{ color: 'yellow.main' }}>{'UNSW'}</Box>
        {
          ` Policy, the source code for this project can not be publicly shared.
          However, you may download the production build of the project here.`
        } 
      </BoxInfo>
    </Fragment>
  )
}