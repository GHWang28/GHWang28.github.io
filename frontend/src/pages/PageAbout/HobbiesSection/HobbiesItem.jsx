import React from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

export default function HobbiesItem ({ odd, data }) {
  const [ref, inView] = useInView();
  const theme = useTheme();
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <Grid
      ref={ref}
      container
      p={2}
      sx={{
        bgcolor: (odd) ? '' : 'rgba(0,0,0,0.25)',
        borderRadius: '15px',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((odd) ? '200px' : '-200px'),
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <Grid
        item
        sm={1}
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.mode === 'light' ? 'black' : 'whitesmoke'
        }}
      >
        {data.icon}
      </Grid>
      <Grid item sm={11} xs={12}>
        <Typography p={2} align={(smallMq) ? 'left' : 'center'}>
          {data.text}
        </Typography>
      </Grid>
    </Grid>
  )
}

HobbiesItem.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.element,
    text: PropTypes.string,
  }),
  odd: PropTypes.bool,
};

