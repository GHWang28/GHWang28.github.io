import React, { Fragment, useState } from 'react';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { animated, useSpring, useTransition } from 'react-spring';
import { setImageZoom } from '../../redux/actions';
import { executeWithCooldown } from '../../helpers';

export default function AnimatedProfilePic () {
  const AnimatedBox = animated(Box);
  const dispatch = useDispatch();
  const [lastClicked, setLastClicked] = useState(Date.now());
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [currImg, setCurrImg] = useState(0);
  const imgs = [
    'images/about/profile-pic-zoom.jpg',
    'images/about/tutor-pic.jpg'
  ]

  const switchImg = (imgIndex) => {
    executeWithCooldown(() => { 
      setCurrImg(imgIndex);
      setLastClicked(Date.now());
    }, lastClicked);
  }

  const onZoom = () => {
    if (currImg === 0) {
      dispatch(setImageZoom('images/about/profile-pic.jpg'));
    } else {
      dispatch(setImageZoom(imgs[currImg]));
    }
  }

  const avatarSX = {
    cursor: 'pointer',
    transition: 'scale 0.2s ease-in-out',
    '&:hover': {
      scale: '1.05'
    }
  }

  const transitions = useTransition(currImg, {
    from: { opacity: '0%', position: 'static' },
    enter: { opacity: '100%', position: 'static' },
    leave: { opacity: '0%', position: 'absolute' },
  });

  const sprintStyle = useSpring({
    from: { y: '-25%', x: '-50%', opacity: 0, rotate: '-22.5deg', filter: 'blur(5px)' },
    to: { y: '0%', x: '0%', opacity: 1, rotate: '0deg', filter: 'blur(0px)' },
    delay: 500
  })

  return (
    <Fragment>
      <Box
        sx={{
          maxWidth: (mediumMq) ? '100%' : '50%',
          maxHeight: (mediumMq) ? 'none' : '350px',
          position: 'relative'
        }}
      >
        {transitions((style, imgIndex) => (
          <AnimatedBox
            className='border-gradient round'
            sx={{
              height: 'fit-content',
              overflow: 'hidden',
              borderRadius: '50%',
              transition: 'scale 0.2s ease-in-out',
              '&:hover': {
                scale: '1.05'
              }
            }}
            style={{...sprintStyle, ...style}}
          >
            <Box
              onContextMenu={(event) => { event.preventDefault() }}
              style={style}
              onClick={onZoom}
              component='img'
              alt={'Profile Shot of Gordon Wang'}
              src={imgs[imgIndex]}
              sx={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </AnimatedBox>
        ))}
      </Box>
      <Box
        mt={2}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <Avatar
          src={imgs[0]}
          onClick={() => { switchImg(0) }}
          sx={avatarSX}
        />
        <Avatar
          src={imgs[1]}
          onClick={() => { switchImg(1) }}
          sx={avatarSX}
        />
      </Box>
    </Fragment>
  )
}
