import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { animated, useSpring } from 'react-spring';

const TransluscentTypography = styled(Typography)(() => {
  const theme = useTheme();
  return {
    borderRadius: '15px',
    margin: '5px 0px',
    padding: '0px 10px',
    backgroundColor: theme.palette.darkgray.main
  }
});

function CardProject ({
  title,
  date,
  type,
  body,
  imgs,
  index = 0,
  onClick,
  buttonTxt = 'View',
  buttonIcon
}) {
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const bgColor = theme.palette.gray.main;

  // Spring Animation
  const AnimatedBox = animated(Box);

  useEffect(() => {
    if (imgs.length <= 1) return;

    const timeout = setTimeout(() => {
      setImageIndex((imageIndex + 1) % imgs.length)
    }, 8000);

    return () => { clearTimeout(timeout) }
  }, [imageIndex, imgs.length]);

  return (
    <AnimatedBox
      style={useSpring({
        from: { x: 50, y: -50, scale: 1.2, rotate: '5deg', opacity: 0 },
        to: { x: 0, y: 0, scale: 1, rotate: '0deg', opacity: 1 },
        delay: (index + 1) * 200
      })}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      sx={{
        position: 'relative',
        border: '2px solid whitesmoke',
        scale: (hover) ? '1' : '0.975',
        boxShadow: (hover) ? '0 4px 32px 0 rgba(0, 0, 0, 0.8)' : '0 4px 16px 0 rgba(0, 0, 0, 0.8)',
        transition: 'scale 0.2s ease-in-out, boxShadow 0.1s ease-in-out',
        borderRadius: '15px',
        height: 'fit-content',
        overflow: 'hidden',
        mx: (largeMq) ? 10 : ((mediumMq) ? 5 : 0)
      }}
    >
      <Box
        sx={{
          p: 2,
          width: 'inherit',
          height: 'inherit',
          backgroundImage: `linear-gradient(90deg, ${bgColor} 40%, rgba(255,255,255,0) 100%)` 
        }}
      >
        <Box sx={{ width: (smallMq) ? '60%' : '100%' }}>
          <TransluscentTypography variant='h4'>
            {title}
          </TransluscentTypography>
          {(date) && (
            <TransluscentTypography
              variant='subtitle1'
              sx={{ opacity: '0.75', width: 'fit-content' }}
            >
              {date}
            </TransluscentTypography>
          )}
          {(type) && (
            <TransluscentTypography
              variant='subtitle2'
              sx={{ opacity: '0.75', width: 'fit-content' }}
            >
              {`Type: ${type}`}
            </TransluscentTypography>
          )}
          <Box component='hr' />
          {(body) && (
            <Box
              component='ul'
              sx={{
                py: 3,
                borderRadius: '15px',
                backgroundColor: theme.palette.darkgray.main
              }}
            >
              {body.map((dotpoint, index) => (
                <Box key={`dotpoint-${index}`} component='li'>
                  <Typography pr={1}>
                    {dotpoint}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Button startIcon={buttonIcon} variant='outlined' onClick={onClick}>
          {buttonTxt}
        </Button>
      </Box>
      {/* Background Image */}
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
            translate: '0% -9%',
            position: 'absolute',
            top: '0%',
            right: '0%',
            objectFit: 'cover',
            zIndex: -1
          }}
        />
      ))}
    </AnimatedBox>
  )
}

CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  imgs: PropTypes.array.isRequired,
  index: PropTypes.number,
  date: PropTypes.string,
  type: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick: PropTypes.func,
  buttonIcon: PropTypes.node,
  buttonTxt: PropTypes.string,
};

export default CardProject;
