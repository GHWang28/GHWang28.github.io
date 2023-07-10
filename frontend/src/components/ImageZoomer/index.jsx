import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setImageZoom } from '../../redux/actions';
import { animated, useTransition } from 'react-spring';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ImageZoomer () {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const src = useSelector(state => state.imgZoom);
  const transitions = useTransition(src, {
    from: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '-50%', opacity: 0 },
    enter: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', y : '0%', opacity: 1 },
    leave: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '25%', opacity: 0  },
  });
  const AnimatedBox = animated(Box);
  const AnimatedIconButton = animated(IconButton);

  const onClose = (event) => {
    event.stopPropagation();
    // Enable body scroll
    enableBodyScroll(ref.current);
    dispatch(setImageZoom(null));
  }

  // Adds pressing esc button functionality to close iamge
  useEffect(() => {
    if (!src) return;

    const escButtonClose = (event) => {
      if (event.key === 'Escape') {
        enableBodyScroll(ref.current);
        dispatch(setImageZoom(null));
      }
    }

    window.addEventListener('keyup', escButtonClose);

    return () => {
      window.removeEventListener('keyup', escButtonClose);
    }
  }, [dispatch, src])

  return transitions((style, itemSrc) => (
    itemSrc ?
      <AnimatedBox
        ref={ref}
        id='img-zoom'
        style={{
          backgroundColor: style.backgroundColor,
          backdropFilter: style.backdropFilter
        }}
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh', 
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1100,
          WebkitTapHighlightColor: 'transparent'
        }}
        onLoad={() => {
          // Disable body scroll
          disableBodyScroll(ref.current);
        }}
        onClick={(event) => { onClose(event) }}
      >
        <AnimatedIconButton
          sx={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            zIndex: 99
          }}
          style={{
            y: style.y,
            opacity: style.opacity
          }}
          size='large'
          onClick={(event) => { onClose(event) }}
        >
          <HighlightOffIcon fontSize='inherit' />
        </AnimatedIconButton>
        <AnimatedBox
          component='img'
          alt='Zoomed in Image'
          onContextMenu={(event) => { event.preventDefault() }}
          src={itemSrc}
          style={{
            y: style.y,
            opacity: style.opacity
          }}
          sx={{
            userSelect: 'none',
            maxHeight: '98%',
            maxWidth: '98%',
            bgcolor: 'rgb(200,200,200)'
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </AnimatedBox>
    : null
  ))
}

ImageZoomer.propTypes = {
  src: PropTypes.string,
  show: PropTypes.bool
};
