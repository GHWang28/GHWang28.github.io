import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import ButtonGoBack from "../../components/ButtonGoBack";
import ImageGallery from "../../components/ImageGallery";
import Sparklez from "../../components/Sparklez";
import { animated, useSpring } from "react-spring";

export default function ProjectMinecraft () {
  const AnimatedBox = animated(Box);
  return (
    <Fragment>
      <ButtonGoBack />
      <AnimatedBox
        component='section'
        mt={1}
        mb={4}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        style={useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 },
        })}
      >
        <Sparklez frequency={2} sizeRange={[20, 35]}>
          <Typography className={'gradient-text'} variant='h2' fontWeight='bold' align='center'>
            {'Minecraft Recreation'}
          </Typography>
        </Sparklez>
      </AnimatedBox>
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
    </Fragment>
  )
}