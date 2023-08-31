import React, { Fragment, useMemo, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import { animated, easings, useSpring, useTransition } from '@react-spring/web';
import { throttle } from '../../utils';
import ImageZoomable from '../../components/ImageZoomable';

const AnimatedProfilePic = () => {
  const AnimatedBox = animated(Box);
  const AnimatedAvatar = animated(Avatar);
  const [currImg, setCurrImg] = useState<number>(0);

  // Available images to choose from
  const imgs = [
    '/images/about/profile-pic-zoom.webp',
    '/images/about/tutor-pic.webp'
  ]

  const switchImg = useMemo(() => throttle((imgIndex) => { setCurrImg(imgIndex) }, 500), []);

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
          maxWidth: { xs: '75%', md: '100%' },
          width: { xs: '300px', md: '400px' },
          aspectRatio: 1,
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
              alternateSrc={(currImg === 0) ? '/images/about/profile-pic.webp' : imgs[currImg]}
              sx={{
                width: '100%',
                aspectRatio: 1,
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
