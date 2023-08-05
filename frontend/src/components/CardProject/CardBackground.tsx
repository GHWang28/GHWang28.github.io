import React, { Fragment, useEffect, useState } from 'react';
import { useTheme, CircularProgress, Box } from '@mui/material'
import WavyBackdrop from './WavyBackdrop'
import ImageSlideShow from './ImageSlideShow';
import VideoShow from './VideoShow';

type ComponentProps = {
  inView: boolean,
  odd: boolean,
  imgs: string[]
}

const CardBackground = ({ inView, odd, imgs }: ComponentProps) => {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const [loaded, setLoaded] = useState<boolean>(false);

  const onLoad = () => { setLoaded(true) };

  useEffect(() => {
    if (!inView) setLoaded(false);
  }, [inView])

  if (!inView) return null;

  return (
    <Fragment>
      <WavyBackdrop
        bgColor={(lightMode) ? 'white' : theme.palette.gray.main}
        speed={7}
        yPos='-37.5%'
        direction={(odd) ? 'up' : 'down'}
        inView={loaded}
      />
      <WavyBackdrop
        bgColor={(lightMode) ? 'gray' : 'rgba(20,20,20,0.6)'}
        speed={7}
        yPos='-67%'
        direction={(odd) ? 'down' : 'up'}
        inView={loaded}
      />
      {/* Background to show image slideshow or video */}
      {imgs[0].endsWith('.webm') || (imgs[0].endsWith('.mp4')) ? (
        <VideoShow src={imgs[0]} onCanPlayThrough={onLoad} />
      ) : (
        <ImageSlideShow imgs={imgs} onLoad={onLoad} />
      )}
      {(!loaded) && (
        <Box sx={{ color: 'contrastColor.main', position: 'absolute', right: '15px', bottom: '15px' }} >
          <CircularProgress color='inherit' />
        </Box>
      )}
    </Fragment>
  )
}

export default CardBackground;
