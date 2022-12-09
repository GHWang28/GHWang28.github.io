
import { Box } from '@mui/material';
import { useState } from 'react';
import { getLowResImg } from '../../helpers';
import Zoom from 'react-medium-image-zoom';

function ImageLoader ({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Zoom>
        <Box
          onContextMenu={(event) => { event.preventDefault() }}
          onLoad={() => { setLoaded(true) }}
          component={'img'}
          sx={{
            borderRadius: '1em',
            border: '3px solid whitesmoke',
            pointerEvents: (loaded) ? 'auto' : 'none',
            opacity: (loaded) ? 1 : 0
          }}
          width='100%'
          src={src}
          alt={alt}
        />
      </Zoom>
      {(!loaded) && (
        <Zoom>
          <Box
            sx={{
              zIndex: 20,
              borderRadius: '2%',
              border: '3px solid whitesmoke',
            }}
            component='img'
            width='100%'
            src={getLowResImg(src)}
            alt={alt + 'Low Resolution'}
          />
        </Zoom>
      )}
    </Box>
  )
}

export default ImageLoader