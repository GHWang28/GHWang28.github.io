import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setImageZoom } from '../../redux/actions';
import { animated, useTransition } from 'react-spring';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useRef } from 'react';
import PropTypes from 'prop-types';

function ImageZoomer ({ src, show }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const transitions = useTransition(show, {
    from: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '-50%', opacity: 0 },
    enter: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', y : '0%', opacity: 1 },
    leave: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '25%', opacity: 0  },
  });
  const AnimatedBox = animated(Box);

  return transitions((style, item) => (
    item ?
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
          cursor: 'pointer',
          zIndex: 1100,
        }}
        onLoad={() => {
          // Disable body scroll
          disableBodyScroll(ref.current);
        }}
        onClick={() => {
          // Enable body scroll
          enableBodyScroll(ref.current);
          dispatch(setImageZoom(src, false));
        }}
      >
        <AnimatedBox
          component='img'
          alt='zoomed-in-image'
          onContextMenu={(event) => { event.preventDefault() }}
          src={src}
          style={{
            y: style.y,
            opacity: style.opacity
          }}
          sx={{
            userSelect: 'none',
            maxHeight: '98%',
            maxWidth: '98%'
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

export default ImageZoomer;
