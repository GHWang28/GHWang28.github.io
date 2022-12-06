import React from 'react';
import { Box, Typography } from '@mui/material';
import { animated, useSpring } from 'react-spring';
import Sparklez from '../../components/Sparklez';
import PropTypes from 'prop-types';

function AnimatedTitle ({ title }) {
  const AnimatedBox = animated(Box);
  return (
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
          {title}
        </Typography>
      </Sparklez>
    </AnimatedBox>
  )
}

AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default AnimatedTitle;
