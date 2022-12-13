import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import { setImageZoom } from '../../redux/actions';

export default function AnimatedProfilePic () {
  const AnimatedBox = animated(Box);
  const dispatch = useDispatch();
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [hover, setHover] = useState(false);

  return (
    <AnimatedBox
      style={useSpring({
        from: { y: '-25%', x: '-50%', opacity: 0, rotate: '-22.5deg', filter: 'blur(5px)' },
        to: { y: '0%', x: '0%', opacity: 1, rotate: '-5deg', filter: 'blur(0px)' },
        delay: 750
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
        width: (mediumMq) ? '100%' : '50%',
        border: '2px solid whitesmoke',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'scale 0.2s ease-in-out',
        scale: (hover) ? '1.05' : '1.0'
      }}
    />
  )
}