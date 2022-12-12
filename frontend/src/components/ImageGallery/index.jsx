import React, { useState } from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { getYouTubeThumbnailImg, isYouTubeURL } from '../../helpers';
import VideoPlayer from '../VideoPlayer';
import { animated, useSpring } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux';
import { setImageZoom } from '../../redux/actions';

/**
 * A gallery/carousel that is responsive and can be navigated with
 * the image strip at the bottom or via the side arrows.
 * Not providing a mainImgSrc will display a default image.
 */
function ImageGallery ({ imgArray = [] }) {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => cycleImg(imgIndexState + 1),
    onSwipedRight: () => cycleImg(imgIndexState - 1),
    trackMouse: true
  });

  const [imgIndexState, setImgIndexState] = useState(0);

  // Spring Animation
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const AnimatedBox = animated(Box);

  /**
   * Cycles to the next image. If it is out of bounds, it will wrap around
   * @param {number} newIndex
   */
  const cycleImg = (newIndex) => {
    if (newIndex < 0) newIndex = imgArray.length - 1;
    if (newIndex >= imgArray.length) newIndex = 0;

    setImgIndexState(newIndex);
  };

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
        border: '2px solid whitesmoke',
        borderRadius: '8px',
        overflow: 'hidden',
        mx: (mediumMq) ? 10 : 0
      }}
      onKeyDown={(event) => {
        console.log(event.button);
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
            name='prev-img-btn'
            title='Previous Image'
            sx={{ border: '2px solid whitesmoke', width: '100%', height: '100%' }}
            onClick={() => {
              cycleImg(imgIndexState - 1);
            }}
            disableRipple
          >
            <ArrowLeftIcon/>
          </Button>
        </Grid>
        {/* Image viewer */}
        <Grid name='image-viewer' item xs={10} sm={10} sx={gallerySX}>
          {(isYouTubeURL(imgArray[imgIndexState])) && (
            <VideoPlayer
              key={uuidv4()}
              url={imgArray[imgIndexState]}
              height={'calc(100% - 20px)'}
              width='100%'
            />
          )}
          {(!isYouTubeURL(imgArray[imgIndexState])) && (
            <Box
              component={'img'}
              alt={`Gallery Item #${imgIndexState}`}
              sx={{ height: galleryHeight(), cursor: 'pointer' }}
              onContextMenu={(event) => { event.preventDefault() }}
              title={`Gallery Item #${imgIndexState}`}
              src={imgArray[imgIndexState]}
              onClick={() => { dispatch(setImageZoom(imgArray[imgIndexState])) }}
            />
          )}
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
            name='next-img-btn'
            title='Next Image'
            sx={{ border: '2px solid whitesmoke', width: '100%', height: '100%' }}
            onClick={() => {
              cycleImg(imgIndexState + 1);
            }}
            disableRipple
          >
            <ArrowRightIcon/>
          </Button>
        </Grid>
      </Grid>
      {/* Display other images on the bottom */}
      <Box
        name='image-container'
        sx={{
          display: 'flex',
          justifyContent: 'left',
          height: '100px',
          width: '100%',
          backgroundColor: 'rgb(28,28,28)',
          overflowX: 'auto'
        }}
      >
        {imgArray.map((imgSrc, imgSrcNo) => (
          <Box
            key={`img-${imgSrcNo}`}
            component='img'
            name={(imgIndexState === imgSrcNo) ? 'img-selected' : 'img-unselected'}
            sx={{
              cursor: 'pointer',
              height: '100%',
              transition: 'scale 0.2s ease-in-out, opacity 0.2s ease-in-out',
              scale: (imgIndexState === imgSrcNo) ? '1.0' : '0.9',
              opacity: (imgIndexState === imgSrcNo) ? '1.0' : '0.5',
            }}
            onClick={() => { setImgIndexState(imgSrcNo) }}
            src={getYouTubeThumbnailImg(imgSrc)}
            title={
              (imgSrcNo === 0) ? 'Thumbnail' : `Additional image #${imgSrcNo}`
            }
          />
        ))}
      </Box>
    </AnimatedBox>
  );
}

ImageGallery.propTypes = {
  imgArray: PropTypes.arrayOf(PropTypes.string)
};

export default ImageGallery;
