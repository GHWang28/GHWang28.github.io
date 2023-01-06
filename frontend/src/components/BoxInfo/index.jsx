import React, { Fragment } from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function BoxInfo ({ children, title, footer, plagiarism = false }) {
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
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'borderColor.main',
        bgcolor: 'bgColor.darker',
      }}
    >
      {(title) && (
        <Typography pb={2} fontWeight='bold' sx={{ opacity: '0.5' }}>
          {title}
        </Typography>
      )}
      <Typography fontWeight='bold' fontSize={19}>
        {children}
        {(plagiarism) && (
          <Fragment>
            {'As per '}
            <Box component='span' sx={{ color: 'yellow.main' }}>{'University'}</Box>
            {' policies, the source code for this project '}
            <Box component='span' sx={{ color: 'rgb(255,0,0)' }}>{'can not'}</Box>
            {' be '}
            <em>{'publicly'}</em>
            {' shared.'}
          </Fragment>
        )}
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
  plagiarism: PropTypes.bool
};

export default BoxInfo;
