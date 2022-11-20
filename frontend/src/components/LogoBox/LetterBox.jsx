import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function LetterBox ({ letter }) {
  // Animation
  const animationProps = useSpring({
    from: { rotate: '720deg' },
    to: { rotate: '0deg' }
  })
  const AnimatedBox = animated(Box);
  return (
    <AnimatedBox
      style={animationProps}
      sx={{
        borderRadius: '15px',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(9,9,121,1) 5%, rgba(0,212,255,1) 100%)'
      }}
    >
      <Typography
        fontSize={20}
        fontWeight='bold'
        align='center'
        sx={{ lineHeight: '50px', verticalAlign: 'middle', userSelect: 'none'  }}
      >
        {letter}
      </Typography>
    </AnimatedBox>
  )
}

LetterBox.propTypes = {
  letter: PropTypes.string.isRequired
};

export default LetterBox;
