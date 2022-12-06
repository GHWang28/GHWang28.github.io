
import { Box } from "@mui/material";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
import { getLowResImg } from "../../helpers"

function ImageLoader ({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component={LazyLoadImage}
        sx={{
          position: (loaded) ? '' : 'absolute',
          display: (loaded) ? '' : 'none',
          pointerEvents: 'none',
          borderRadius: '15px',
          border: '3px solid whitesmoke',
        }}
        afterLoad={() => { setLoaded(true) }}
        width='100%'
        src={src}
        alt={alt}
      />
      {(!loaded) && (
        <Box
          sx={{
            zIndex: -1,
            borderRadius: '15px',
            border: '3px solid whitesmoke',
          }}
          component='img'
          width='100%'
          src={getLowResImg(src)}
          alt={alt}
        />
      )}
    </Box>
  )
}

export default ImageLoader