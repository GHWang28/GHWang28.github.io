import React from 'react';
import { keyframes } from '@mui/system';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const splashAnimation = keyframes`
  0% {
    scale: 0.9;
  }
  50% {
    scale: 1.0;
  }
  100% {
    scale: 0.9;
  }
`;

function SplashText ({ message, position, fontSize, rotate = '15deg', style }) {
  const splashState = useSelector(state => state.splash);
  if (!splashState) return null;

  return (
    <Typography
      align='center'
      lineHeight='0.6em'
      style={style}
      sx={{
        translate: '-50% 50%',
        width: 'min(25vw, 250px)',
        fontSize,
        fontFamily: 'my-handwriting',
        fontWeight: 'bold',
        color: 'yellow',
        animation: `${splashAnimation} ease-in-out 1.5s infinite`,
        position: 'absolute',
        textShadow: '4px 3px 0 black',
        rotate,
        zIndex: 3,
        ...position
      }}
    >
      {message}
    </Typography>
  )
}

SplashText.propTypes = {
  message: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  fontSize: PropTypes.string,
  rotate: PropTypes.string,
  style: PropTypes.object
};

export default SplashText;
