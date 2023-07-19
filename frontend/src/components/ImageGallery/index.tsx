import React, { useState } from 'react';
import { Box, Button, Grid, useMediaQuery, Theme } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { getYouTubeThumbnailImg, isYouTubeURL, mod } from '../../helpers';
import VideoPlayer from '../VideoPlayer';
import { animated, useSpring, useTransition } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';
import { useSwipeable } from 'react-swipeable';
import ImageZoomable from '../ImageZoomable';

type ComponentProps = {
  imgArray: string[]
}

/**
 * A gallery/carousel that is responsive and can be navigated with
 * the image strip at the bottom or via the side arrows.
 * Not providing a mainImgSrc will display a default image.
 */
const ImageGallery = ({ imgArray = [] }: ComponentProps) => {
  const largeMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [imgIndex, setImgIndex] = useState(0);
  const [prevImgIndex, setPrevImgIndex] = useState(0);

  // Handles swiping for mobile
  const swipeHandler = useSwipeable({
    delta: 50,
    onSwipedLeft: ({ event }) => {
      event.stopPropagation();
      cycleImg(imgIndex + 1);
    },
    onSwipedRight: ({ event }) => {
      event.stopPropagation();
      cycleImg(imgIndex - 1);
    }
  });

  const preventSwipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    }
  })

  // Spring Animation
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const transitions = useTransition(imgIndex, {
    from: { x: (prevImgIndex > imgIndex) ? '-50%' : '50%', opacity: 0 },
    enter: { x : '0%', opacity: 1 },
    leave: { x: (prevImgIndex <= imgIndex) ? '-25%' : '25%', opacity: 0  },
  });
  const AnimatedBox = animated(Box);

  /**
   * Cycles to the next image. If it is out of bounds, it will wrap around
   * @param {number} newIndex
   */
  const cycleImg = (newIndex: number) => {
    switchImg(mod(newIndex, imgArray.length));
  };
  const switchImg = (img: number) => {
    setPrevImgIndex(imgIndex);
    setImgIndex(img);
  }

  const galleryHeight = () => {
    if (largeMq) return '500px';
    if (mediumMq) return '400px';
    return '200px';
  }

  const gallerySX = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'black.translucent'
  }

  const arrowSx = {
    bgcolor: (mediumMq) ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)'
  }

  return (
    <AnimatedBox
      style={animationProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'borderColor.main',
        borderRadius: '8px',
        overflow: 'hidden',
        mx: (mediumMq) ? 10 : 0
      }}
    >
      <Grid {...swipeHandler} container sx={{ height: galleryHeight(), overflow: 'hidden' }}>
        {/* < */}
        <Grid
          item
          xs={1}
          sm={1}
          sx={{ ...gallerySX, ...arrowSx }}
          zIndex={5}
        >
          <Button
            aria-label='Previous Image'
            title='Previous Image'
            sx={{
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'borderColor.main',
              width: '100%',
              height: '100%'
            }}
            onClick={() => {
              cycleImg(imgIndex - 1);
            }}
            disableRipple
          >
            <ArrowLeftIcon sx={{ scale: '3' }}/>
          </Button>
        </Grid>
        {/* Image viewer */}
        <Grid item xs={10} sm={10} sx={{...gallerySX, position: 'relative'}}>
          {transitions((style, imgIndex) => (
            <AnimatedBox
              style={style}
              sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {(isYouTubeURL(imgArray[imgIndex]) ? (
                <VideoPlayer
                  key={uuidv4()}
                  url={imgArray[imgIndex]}
                  height={'calc(100% - 20px)'}
                  width='100%'
                />
              ) : (
                <ImageZoomable
                  alt={`Gallery Item #${imgIndex}`}
                  sx={{ height: galleryHeight(), WebkitTapHighlightColor: 'transparent', }}
                  onContextMenu={(event) => { event.preventDefault() }}
                  title={`Gallery Item #${imgIndex}`}
                  src={imgArray[imgIndex]}
                />
              ))}
            </AnimatedBox>
          ))}
        </Grid>
        {/* > */}
        <Grid
          item
          xs={1}
          sm={1}
          sx={{ ...gallerySX, ...arrowSx }}
          zIndex={5}
        >
          <Button
            aria-label='Next Image'
            title='Next Image'
            sx={{
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'borderColor.main',
              width: '100%',
              height: '100%'
            }}
            onClick={() => {
              cycleImg(imgIndex + 1);
            }}
            disableRipple
          >
            <ArrowRightIcon sx={{ scale: '3' }}/>
          </Button>
        </Grid>
      </Grid>
      {/* Display other images on the bottom */}
      <Box
        {...preventSwipeHandler}
        sx={{
          display: 'flex',
          justifyContent: 'left',
          height: '100px',
          width: '100%',
          bgcolor: 'bgColor.darker',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        {imgArray.map((imgSrc, imgSrcNo) => (
          <Box key={`img-${imgSrcNo}`} sx={{ position: 'relative' }}>
            {(isYouTubeURL(imgSrc)) && (
              <Box
                component='img'
                sx={{
                  position: 'absolute',
                  width: '50%',
                  top: '50%',
                  left: '50%',
                  translate: '-50% -50%',
                  pointerEvents: 'none',
                  transition: 'scale 0.2s ease-in-out',
                  scale: (imgIndex === imgSrcNo) ? '1.0' : '0.9',
                  zIndex: 2
                }}
                src='/images/youtube.svg'
              />
            )}
            <Box
              component='img'
              sx={{
                cursor: 'pointer',
                height: '100px',
                transition: 'scale 0.2s ease-in-out, opacity 0.2s ease-in-out',
                scale: (imgIndex === imgSrcNo) ? '1.0' : '0.9',
                opacity: (imgIndex === imgSrcNo) ? '1.0' : '0.5',
                WebkitTapHighlightColor: 'transparent',
              }}
              onClick={() => { switchImg(imgSrcNo) }}
              src={getYouTubeThumbnailImg(imgSrc)}
              title={
                (imgSrcNo === 0) ? 'Thumbnail' : `Additional image #${imgSrcNo}`
              }
            />
          </Box>
        ))}
      </Box>
    </AnimatedBox>
  );
}

export default ImageGallery;
