import React from 'react';
import { Typography, SxProps, keyframes } from '@mui/material';
import { useAppSelector } from '../../hooks';

type ComponentProps = {
  message: string,
  position: SxProps,
  fontSize: string, 
  rotate?: string,
  style: object
}

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

const SplashText = ({ message, position, fontSize, rotate = '15deg', style }: ComponentProps) => {
  const splashState = useAppSelector(state => state.splash);
  if (!splashState) return null;

  return (
    <Typography
      fontFamily='my-handwriting'
      align='center'
      lineHeight='1.0em'
      style={style}
      sx={{
        translate: '-50% 50%',
        width: 'min(25vw, 250px)',
        fontSize,
        fontWeight: 'bold',
        color: '#f7d800',
        animation: `${splashAnimation} ease-in-out 1.5s infinite`,
        position: 'absolute',
        textShadow: '2px 2px 0 black',
        rotate,
        zIndex: 3,
        ...position
      }}
    >
      {message}
    </Typography>
  )
}

export default SplashText;
