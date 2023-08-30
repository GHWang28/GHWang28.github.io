import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { setImageZoom } from '../../redux/actions';
import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '../../hooks';

const ImageZoomer = () => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const src = useAppSelector(state => state.imgZoom);
  const transitions = useTransition(src, {
    from: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '-50%', opacity: 0 },
    enter: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', y : '0%', opacity: 1 },
    leave: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', y: '25%', opacity: 0  },
  });
  const AnimatedBox = animated(Box);
  const AnimatedIconButton = animated(IconButton);

  // Adds pressing esc button functionality to close iamge
  useEffect(() => {
    if (!src) return;

    const escButtonClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setImageZoom(''));
      }
    }

    window.addEventListener('keyup', escButtonClose);

    return () => {
      window.removeEventListener('keyup', escButtonClose);
    }
  }, [dispatch, src]);

  const onClose = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setImageZoom(''));
  }

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
        onClick={(event: React.MouseEvent<HTMLDivElement>) => { onClose(event) }}
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
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => { onClose(event) }}
        >
          <HighlightOffIcon fontSize='inherit' />
        </AnimatedIconButton>
        <AnimatedBox
          component='img'
          draggable={false}
          // @ts-ignore
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

export default ImageZoomer;
