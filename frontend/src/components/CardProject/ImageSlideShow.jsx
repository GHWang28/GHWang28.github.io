import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';


function ImageSlideShow ({ imgs }) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    if (imgs.length <= 1) return;

    const timeout = setTimeout(() => {
      setImageIndex((imageIndex + 1) % imgs.length)
    }, 8000);

    return () => { clearTimeout(timeout) }
  }, [imageIndex, imgs.length]);

  return (
    <Fragment>
      {imgs.map((img, index) => (
        <Box
          key={`card-bg-${index}`}
          component='img'
          alt={`image-background-${index}`}
          title={`Background Image #${index}`}
          src={img}
          sx={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            width: '100%',
            height: '100%',
            opacity: (imageIndex === index) ? '1.0' : '0.0',
            transition: 'opacity 0.5s ease-in-out',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      ))}
    </Fragment>
  )
}

ImageSlideShow.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlideShow;
