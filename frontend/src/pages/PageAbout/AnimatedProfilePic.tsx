import React, { Fragment, useState } from 'react';
import { Avatar, Box, useMediaQuery, Theme } from '@mui/material';
import { animated, easings, useSpring, useTransition } from 'react-spring';
import { executeWithCooldown } from '../../helpers';
import ImageZoomable from '../../components/ImageZoomable';

const AnimatedProfilePic = () => {
  const mediumMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const AnimatedBox = animated(Box);
  const AnimatedAvatar = animated(Avatar);

  const [lastClicked, setLastClicked] = useState(Date.now());
  const [currImg, setCurrImg] = useState(0);

  // Available images to choose from
  const imgs = [
    '/images/about/profile-pic-zoom.jpg',
    '/images/about/tutor-pic.jpg'
  ]

  const switchImg = (imgIndex: number) => {
    executeWithCooldown(() => { 
      setCurrImg(imgIndex);
      setLastClicked(Date.now());
    }, lastClicked);
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

  // Flipping animation
  const transitions = useTransition(currImg, {
    from: { rotateY: '180deg', position: 'static' },
    enter: { rotateY: '0deg', position: 'static' },
    leave: { rotateY: '-180deg', position: 'absolute' },
    config: {
      duration: 1000,
      easing: easings.easeOutBounce
    }
  });

  const profilePicSpring = useSpring({
    from: { rotateY: '90deg' },
    to: { rotateY: '0deg' },
    delay: 500
  })

  return (
    <Fragment>
      <Box
        sx={{
          maxWidth: (mediumMq) ? '100%' : '75%',
          width: (mediumMq) ? '400px' : '300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
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
              },
              backfaceVisibility: 'hidden'
            }}
            // @ts-ignore
            style={{...profilePicSpring, ...style}}
          >
            <ImageZoomable
              springStyle={style}
              alt={'Profile Shot of Gordon Wang'}
              src={imgs[imgIndex]}
              alternateSrc={(currImg === 0) ? '/images/about/profile-pic.jpg' : imgs[currImg]}
              sx={{
                width: '100%',
                height: '100%',
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

export default AnimatedProfilePic;
