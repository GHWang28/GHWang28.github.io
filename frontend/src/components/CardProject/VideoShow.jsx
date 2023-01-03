import { Box } from "@mui/material";
import PropTypes from 'prop-types';

function VideoShow ({ src }) {
  return (
    <Box
      component='video'
      muted
      loop
      autoPlay
      sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        width: '100%',
        height: '100%',
        transition: 'opacity 0.5s ease-in-out',
        objectFit: 'cover',
        zIndex: -2,
      }}
    >
      <source src={src} type='video/mp4'/>
    </Box>
  )
}

VideoShow.propTypes = {
  src: PropTypes.string,
};

export default VideoShow;
