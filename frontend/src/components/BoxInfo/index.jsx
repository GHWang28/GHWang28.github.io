import React from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function BoxInfo ({ children, title, footer }) {
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const AnimatedBox = animated(Box);
  return (
    <AnimatedBox
      style={useSpring({
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1.0 },
      })}
      p={3}
      my={3}
      mx={(mediumMq) ? 10 : 0}
      sx={{
        borderRadius: '15px',
        border: '3px solid whitesmoke',
        bgcolor: 'darkgray.main',
      }}
    >
      {(title) && (
        <Typography pb={2} fontWeight='bold' sx={{ opacity: '0.5' }}>
          {title}
        </Typography>
      )}
      <Typography fontWeight='bold' fontSize={19}>
        {children}
      </Typography>
      {(footer) && (
        <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          {footer}
        </Box>
      )}
    </AnimatedBox>
  )
}

BoxInfo.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default BoxInfo;
