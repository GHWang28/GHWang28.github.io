import { Box, keyframes } from "@mui/material";
import PropTypes from 'prop-types';

const tickScroll = keyframes`
  0% {
    translate: 0% 0%;
  }
  100% {
    translate: -50% 0%;
  }
`;

export default function ImageScroller ({ images, height, itemGap }) {
  return (
    <Box sx={{ overflowX: 'hidden', bgcolor: 'rgba(245,245,245,0.75)', border: '2px solid whitesmoke', borderRadius: '15px' }}>
      <Box sx={{
          width: 'fit-content',
          height,
          display: 'flex',
          animation: `${tickScroll} 15s linear infinite`
        }}
      >
        {([...images, ...images].map((src, index) => (
          <Box
            key={`img-scroll-${index}`}
            sx={{
              height,
              minWidth: height,
              display: 'flex',
              overflow: 'clip',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              sx={{ height: '90%' }}
              alt={`character-${index}-portrait`}
              src={process.env.PUBLIC_URL + src}
            />
          </Box>
        )))}
      </Box>
    </Box>
  )
}

ImageScroller.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemGap: PropTypes.string
};
