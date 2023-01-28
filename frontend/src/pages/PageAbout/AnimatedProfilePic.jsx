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
      style={useSpring({
        from: { y: '-25%', x: '-50%', opacity: 0, rotate: '-22.5deg', filter: 'blur(5px)' },
        to: { y: '0%', x: '0%', opacity: 1, rotate: '-2.5deg', filter: 'blur(0px)' },
        delay: 500
      })}
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
        height: 'fit-content',
        maxWidth: (largeMq) ? '100%' : '50%',
        maxHeight: (largeMq) ? 'none' : '350px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'borderColor.main',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'scale 0.2s ease-in-out',
        scale: (hover) ? '1.05' : '1.0',
        WebkitTapHighlightColor: 'transparent'
      }}
    />
  )
}