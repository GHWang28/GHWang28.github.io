import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import { setImageZoom } from '../../redux/actions';

export default function AnimatedProfilePic () {
  const AnimatedBox = animated(Box);
  const dispatch = useDispatch();
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [hover, setHover] = useState(false);

  return (
    <AnimatedBox
      className='border-gradient'
      sx={{
        height: 'fit-content',
        maxWidth: (largeMq) ? '100%' : '50%',
        maxHeight: (largeMq) ? 'none' : '350px',
        scale: (hover) ? '1.05' : '1.0',
        overflow: 'hidden',
        borderRadius: '15px',
        transition: 'scale 0.2s ease-in-out'
      }}
      style={useSpring({
        from: { y: '-25%', x: '-50%', opacity: 0, rotate: '-22.5deg', filter: 'blur(5px)' },
        to: { y: '0%', x: '0%', opacity: 1, rotate: '-2.5deg', filter: 'blur(0px)' },
        delay: 500
      })}
    >
      <Box
        onContextMenu={(event) => { event.preventDefault() }}
        onClick={() => {
          dispatch(setImageZoom('images/about/profile-pic.jpg'));
        }}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        component='img'
        alt={'Profile Shot of Gordon Wang'}
        src={'images/about/profile-pic.jpg'}
        sx={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent'
        }}
      />
    </AnimatedBox>
  )
}