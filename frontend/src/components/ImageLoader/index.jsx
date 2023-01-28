
import { Box } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLowResImg } from '../../helpers';
import { setImageZoom } from '../../redux/actions';

function ImageLoader ({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onContextMenu={(event) => { event.preventDefault() }}
        onLoad={() => { setLoaded(true) }}
        component={'img'}
        sx={{
          borderRadius: '1em',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'borderColor.main',
          pointerEvents: (loaded) ? 'auto' : 'none',
          opacity: (loaded) ? 1 : 0,
          WebkitTapHighlightColor: 'transparent',
        }}
        onClick={() => {
          dispatch(setImageZoom(src));
        }}
        width='100%'
        src={src}
        alt={alt}
      />
      {(!loaded) && (
        <Box
          sx={{
            zIndex: 20,
            borderRadius: '2%',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'borderColor.main',
          }}
          component='img'
          width='100%'
          src={getLowResImg(src)}
          alt={alt + 'Low Resolution'}
        />
      )}
    </Box>
  )
}

export default ImageLoader