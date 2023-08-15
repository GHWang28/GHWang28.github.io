import React from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { HobbyData } from '../../../types';

type ComponentProps = {
  odd?: boolean,
  data: HobbyData
}

const HobbiesItem = ({ odd = false, data }: ComponentProps) => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
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

export default HobbiesItem;
