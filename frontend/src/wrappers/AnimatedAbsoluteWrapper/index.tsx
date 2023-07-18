import React from 'react';
import { Box } from '@mui/material';
import { animated } from 'react-spring';
import Footer from '../../components/Footer';

type ComponentProps = {
  children: React.ReactNode,
  style: object,
  pb: number,
  pt: number,
  px: number
}

const AnimatedAbsoluteWrapper = ({ children, style, pb, pt, px }: ComponentProps) => {
  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox style={style} sx={{ width: '100vw', left: '0px', top: '0px', overflow: 'clip' }}>
      <Box pt={pt} pb={pb} px={px}>
        {children}
      </Box>
      <Footer />
    </AnimatedBox>
  )
}

export default AnimatedAbsoluteWrapper;
