import React, { useState } from 'react';
import { getYouTubeThumbnailImg, convertToEmbedYoutubeVid } from '../../helpers';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * A video player that is customised to be different
 * to YouTube's default player.
 * Features a custom play button/initial state
 */
function VideoPlayer (props) {
  // Hooks
  const [hoverButtonState, setHoverButtonState] = useState(false);
  const [showVidState, setShowVidState] = useState(false);

  // Prop trimming
  const trimmedProps = { ...props };
  delete trimmedProps.url;
  const width = props.width;
  const height = props.height;

  if (showVidState) {
    return (
      <Box
        sx={{
          display: 'flex',
          width,
          height
        }}
      >
        <iframe
          width={width}
          height={height}
          src={convertToEmbedYoutubeVid(props.url) + '?start=1&autoplay=1&enablejsapi=1'}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    )
  }

  const thumbnailImg = getYouTubeThumbnailImg(props.url);
  const centerSX = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height
      }}
    >
      <Box
        component='img'
        role='button'
        title='Play Video'
        name='play-video-btn'
        alt='Play Button'
        onMouseEnter={() => { setHoverButtonState(true) }}
        onMouseLeave={() => { setHoverButtonState(false) }}
        onClick={(event) => {
          event.stopPropagation();
          setShowVidState(true);
          setHoverButtonState(false);
        }}
        src={'/images/youtube.svg'}
        sx={{
          ...centerSX,
          cursor: 'pointer',
          opacity: (hoverButtonState) ? '100%' : '80%',
          width: '25%',
          WebkitTapHighlightColor: 'transparent',
          zIndex: 2
        }}
      />
      <Box
        component='img'
        name='video-thumbnail'
        alt='Video Thumbnail'
        src={thumbnailImg}
        sx={{
          ...centerSX,
          transition: 'filter 0.25s ease-in-out',
          filter: (hoverButtonState) ? 'blur(5px)' : ''
        }}
      />
    </Box>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
};

export default VideoPlayer;
