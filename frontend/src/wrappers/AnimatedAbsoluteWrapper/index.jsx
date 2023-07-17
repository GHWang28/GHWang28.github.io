import React from 'react';
import { Box } from '@mui/material';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';

function AnimatedAbsoluteWrapper ({ children, style, pb, pt, px }) {
  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox style={style} name='abs-wrapper' sx={{ width: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'clip' }}>
      <Box pt={pt} pb={pb} px={px}>
        {children}
      </Box>
      <Footer />
    </AnimatedBox>
  )
}

AnimatedAbsoluteWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.object.isRequired,
  pb: PropTypes.number.isRequired,
  pt: PropTypes.number.isRequired,
  px: PropTypes.number.isRequired
}

export default AnimatedAbsoluteWrapper;
