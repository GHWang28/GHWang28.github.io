import React, { Fragment, useState } from 'react';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { animated, useSpring, useTransition } from 'react-spring';
import { setImageZoom } from '../../redux/actions';
import { executeWithCooldown } from '../../helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AnimatedProfilePic () {
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const AnimatedBox = animated(Box);
  const AnimatedAvatar = animated(Avatar);

  const dispatch = useDispatch();
  const [lastClicked, setLastClicked] = useState(Date.now());
  const [currImg, setCurrImg] = useState(0);

  // Available images to choose from
  const imgs = [
    '/images/about/profile-pic-zoom.jpg',
    '/images/about/tutor-pic.jpg'
  ]

  const switchImg = (imgIndex) => {
    executeWithCooldown(() => { 
      setCurrImg(imgIndex);
      setLastClicked(Date.now());
    }, lastClicked);
  }

  const onZoom = () => {
    if (currImg === 0) {
      dispatch(setImageZoom('/images/about/profile-pic.jpg'));
    } else {
      dispatch(setImageZoom(imgs[currImg]));
    }
  }

  const avatarSX = {
    cursor: 'pointer',
    transition: 'scale 0.2s ease-in-out',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    '&:hover': {
      scale: '1.1'
    }
  }

  const transitions = useTransition(currImg, {
    from: { opacity: '0%', position: 'static' },
    enter: { opacity: '100%', position: 'static' },
    leave: { opacity: '0%', position: 'absolute' },
  });

  const profilePicSpring = useSpring({
    from: { rotateY: '90deg', filter: 'blur(5px)' },
    to: { rotateY: '0deg', filter: 'blur(0px)' },
    delay: 1000
  })

  return (
    <Fragment>
      <Box
        sx={{
          maxWidth: (mediumMq) ? '100%' : '75%',
          width: (mediumMq) ? '400px' : '300px',
          height: (mediumMq) ? '400px' : '300px',
          position: 'relative'
        }}
      >
        {transitions((style, imgIndex) => (
          <AnimatedBox
            className='border-gradient round'
            sx={{
              overflow: 'hidden',
              borderRadius: '50%',
              transition: 'scale 0.2s ease-in-out',
              '&:hover': {
                scale: '1.05'
              }
            }}
            style={{...profilePicSpring, ...style}}
          >
            <Box
              onContextMenu={(event) => { event.preventDefault() }}
              style={style}
              onClick={onZoom}
              component={LazyLoadImage}
              effect='opacity'
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
        mt={1}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        {imgs.map((src, index) => (
          <AnimatedAvatar
            style={profilePicSpring}
            key={src}
            src={src}
            onClick={() => { switchImg(index) }}
            sx={avatarSX}
            alt={(index === 0) ? 'Work Alternate' : 'Tutor Alternate'}
          />
        ))}
      </Box>
    </Fragment>
  )
}
