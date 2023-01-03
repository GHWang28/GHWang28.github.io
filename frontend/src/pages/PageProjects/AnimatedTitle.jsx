import React from 'react';
import { Box, Typography } from '@mui/material';
import { animated, useSpring } from 'react-spring';
import Sparklez from '../../components/Sparklez';
import PropTypes from 'prop-types';

function AnimatedTitle ({ title, subtitle }) {
  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox
      component='section'
      mt={1}
      mb={3}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      style={useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
      })}
    >
      <Sparklez frequency={2} sizeRange={[20, 35]}>
        <Box className='gradient-text'>
          <Typography variant='h2' fontWeight='bold' align='center'>
            {title}
          </Typography>
          {(subtitle) && (
            <Typography variant='h5' fontWeight='bold' align='center'>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Sparklez>
    </AnimatedBox>
  )
}

AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default AnimatedTitle;
