import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography, useTheme } from '@mui/material';

const TransluscentTypography = styled(Typography)(() => {
  const theme = useTheme();
  return {
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    width: 'fit-content',
    backgroundColor: theme.palette.darkgray.main
  }
});

function CardProject ({ title, date, type, body, imgs }) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const bgColor = theme.palette.gray.main;

  useEffect(() => {
    if (imgs.length <= 1) return;

    const timeout = setTimeout(() => {
      setImageIndex((imageIndex + 1) % imgs.length)
    }, 5500);

    return () => { clearTimeout(timeout) }
  }, [imageIndex, imgs.length]);

  return (
    <Box
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      sx={{
        position: 'relative',
        border: '2px solid whitesmoke',
        scale: (hover) ? '1.02' : '1.0',
        transition: 'scale 0.1s ease-in-out, background 1.0s ease-in-out',
        borderRadius: '15px',
        height: 'fit-content',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 5,
          width: 'inherit',
          height: 'inherit',
          backgroundImage: `linear-gradient(90deg, ${bgColor} 40%, rgba(255,255,255,0) 100%)` 
        }}
      >
        <TransluscentTypography variant='h4'>
          {title}
        </TransluscentTypography>
        {(date) && (
          <TransluscentTypography
            variant='subtitle1'
            sx={{ opacity: '0.75' }}
          >
            {date}
          </TransluscentTypography>
        )}
        {(type) && (
          <TransluscentTypography
            variant='subtitle2'
            sx={{ opacity: '0.75' }}
          >
            {`Type: ${type}`}
          </TransluscentTypography>
        )}
      </Box>

      {imgs.map((img, index) => (
        <Box
          key={`card-bg-${index}`}
          component='img'
          alt={`image-background-${index}`}
          title={`Background Image #${index}`}
          src={img}
          sx={{
            opacity: (imageIndex === index) ? '1.0' : '0.0',
            transition: 'opacity 0.5s ease-in-out',
            position: 'absolute',
            top: '0%',
            right: '0%',
            width: '100%',
            zIndex: -1
          }}
        />
      ))}
    </Box>
  )
}

CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  imgs: PropTypes.array.isRequired,
  date: PropTypes.string,
  type: PropTypes.string,
};

export default CardProject;
