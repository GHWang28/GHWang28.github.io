import React, { useState } from 'react';
import { Avatar, Box, Collapse, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default function EducationCard ({title, subtitle, color, src, date = ['', ''], description = [], odd}) {
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [show, setShow] = useState(false);
  const [ref, inView] = useInView();
  const theme = useTheme();
  
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'rgba(0,0,0,0.25)',
        borderColor: `${color}.main`,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '15px',
        width: (smallMq) ? '45%' : '80%',
        py: (smallMq) ? 2 : 1,
        px: 4,
        boxSizing: 'border-box',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((odd) ? '100px' : '-100px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        position: 'sticky',
        height: 'fit-content',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent'
      }}
      onClick={() => {
        setShow(!show)
      }}
    >
      <Avatar
        src={src}
        sx={{
          width: '50px',
          height: '50px',
          my: 1,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'borderColor.main',
          '&:hover': {
            scale: '1.25'
          },
          transition: 'scale 0.2s ease-in-out',
        }}
      />
      <Typography variant='h5' color={`${color}.main`} align={'center'}>
        {title}
      </Typography>
      <Typography variant='subtitle1' color={`${color}.main`} sx={{ opacity: 0.75 }} align={'center'}>
        {subtitle}
      </Typography>
      <Typography variant='subtitle2' color={`${color}.main`} sx={{ opacity: 0.5 }} align={'center'}>
        {`${date[0]} → ${date[1]}`}
      </Typography>
      <Collapse in={show} component='ul' sx={{ width: '100%' }}>
        {description.map((dotpoint) => (
          <Box
            key={`education-dotpoint-${dotpoint}`}
            component='li'
            sx={{
              color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke',
              '&::marker': {
                color: `${color}.main`
              }
            }}
          >
            <Typography pr={1}>
              {dotpoint}
            </Typography>
          </Box>
        ))}
      </Collapse>
      <Collapse in={!show} component={Typography} variant='subtitle2' sx={{ opacity: 0.25 }} color={`${color}.main`} align={'center'}>
        {'Click to show more information.'}
      </Collapse>
    </Box>
  )
}

EducationCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  date: PropTypes.arrayOf(PropTypes.number).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  odd: PropTypes.bool
};
