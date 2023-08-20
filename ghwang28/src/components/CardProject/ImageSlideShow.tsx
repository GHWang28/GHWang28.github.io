import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';

type ComponentProps = {
  imgs: string[],
  onLoad: () => void
}

const ImageSlideShow = ({ imgs, onLoad }: ComponentProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [totalLoaded, setTotalLoaded] = useState<number>(0);

  useEffect(() => {
    if (imgs.length <= 1) return;

    const timeout = setTimeout(() => {
      setImageIndex((imageIndex + 1) % imgs.length)
    }, 8000);

    return () => { clearTimeout(timeout) }
  }, [imageIndex, imgs.length]);

  useEffect(() => {
    if (totalLoaded < imgs.length) return;

    onLoad();
  }, [totalLoaded, imgs, onLoad]);

  return (
    <Fragment>
      {imgs.map((src, index) => (
        <Box
          component='img'
          key={`card-bg-${index}`}
          alt={`image-background-${index}`}
          title={`Background Image #${index}`}
          src={src}
          onLoad={() => {
            setTotalLoaded((i) => i + 1);
          }}
          sx={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            width: '100%',
            height: '100%',
            opacity: (imageIndex === index) ? '1.0' : '0.0',
            transition: 'opacity 0.5s ease-in-out',
            objectFit: 'cover',
            zIndex: -2,
          }}
        />
      ))}
    </Fragment>
  )
}

export default ImageSlideShow;
