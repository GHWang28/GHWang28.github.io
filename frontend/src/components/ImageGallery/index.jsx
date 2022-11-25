import React, { Fragment, useState } from 'react';
import { Box, Grid, IconButton, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { getYouTubeThumbnailImg, isYouTubeURL } from '../../helpers';
import VideoPlayer from '../VideoPlayer';
import { animated, useSpring } from 'react-spring';
import PropTypes from 'prop-types';

/**
 * A gallery/carousel that is responsive and can be navigated with
 * the image strip at the bottom or via the side arrows.
 * Not providing a mainImgSrc will display a default image.
 */
function ImageGallery ({ imgArray = [] }) {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [imgIndexState, setImgIndexState] = useState(0);
  // const [imgViewerVisible, setImgViewerVisible] = useState(false);

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

  const getImgTitle = () => {
    return (imgIndexState === 0) ? 'Thumbnail' : `Property Image #${imgIndexState}`;
  };

  const galleryHeight = () => {
    if (largeMq) return '500px';
    if (mediumMq) return '400px';
    return '300px';
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
    <Fragment>

      <AnimatedBox
        style={animationProps}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid whitesmoke',
          borderRadius: '8px',
          overflow: 'hidden',
          marginX: (mediumMq) ? '50px' : '10px'
        }}
      >
        <Grid container sx={{ height: galleryHeight(), overflow: 'hidden' }}>
          {/* < */}
          <Grid
            item
            xs={2}
            sm={1}
            sx={{ ...gallerySX, ...arrowSx }}
            zIndex={5}
          >
            <IconButton
              aria-label='Previous Image'
              name='prev-img-btn'
              title='Previous Image'
              sx={{ border: '2px solid whitesmoke' }}
              size='large'
              onClick={() => {
                cycleImg(imgIndexState - 1);
              }}
            >
              <ArrowLeftIcon/>
            </IconButton>
          </Grid>
          {/* Image viewer */}
          <Grid name='image-viewer' item xs={8} sm={10} sx={gallerySX}>
            {(isYouTubeURL(imgArray[imgIndexState])) && (
              <VideoPlayer
                url={imgArray[imgIndexState]}
                height={'calc(100% - 20px)'}
                width='100%'
              />
            )}
            {(!isYouTubeURL(imgArray[imgIndexState])) && (
              <Box
                style={animationProps}
                component='img'
                sx={{ height: 'calc(100% - 20px)', cursor: 'pointer' }}
                alt={getImgTitle()}
                title={getImgTitle()}
                src={imgArray[imgIndexState]}
              />
            )}
          </Grid>
          {/* > */}
          <Grid
            item
            xs={2}
            sm={1}
            sx={{ ...gallerySX, ...arrowSx }}
            zIndex={5}
          >
            <IconButton
              aria-label='Next Image'
              name='next-img-btn'
              title='Next Image'
              sx={{ border: '2px solid whitesmoke' }}
              size='large'
              onClick={() => {
                cycleImg(imgIndexState + 1);
              }}
            >
              <ArrowRightIcon/>
            </IconButton>
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
    </Fragment>
  );
}

ImageGallery.propTypes = {
  imgArray: PropTypes.arrayOf(PropTypes.string)
};

export default ImageGallery;
