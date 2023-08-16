import React from 'react';
import { Box, BoxProps } from '@mui/material';
import Footer from '../../components/Footer';
import { AnimationProps } from '@react-spring/web';

type ComponentProps = BoxProps & AnimationProps<BoxProps> & {
  children: React.ReactNode,
}

const AbsWrapper = ({ children, style, pb, pt, px }: ComponentProps) => (
  <Box style={style} sx={{ width: '100vw', left: '0px', top: '0px', overflow: 'clip' }}>
    <Box pt={pt} pb={pb} px={px}>
      {children}
    </Box>
    <Footer />
  </Box>
)


export default AbsWrapper;
