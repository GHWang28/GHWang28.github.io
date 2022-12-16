import React from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import generateHobbies from './hobbies';

export default function HobbiesSection () {
  const [ref, inView] = useInView();
  const listOfHobbies = generateHobbies();
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '200px',
        transition: 'translate 0.2s ease-in-out, opacity 0.2s ease-in-out',
      }}
    >
      <Typography mt={5} variant='h4' fontWeight='bold' align='center'>
        {'Hobbies & Interests'}
      </Typography>
      <Typography mb={(smallMq) ? 0 : 3} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'My areas of interest'}
      </Typography>
      {listOfHobbies.map((hobby, index) => (
        <Grid
          container
          key={`hobby-${index}`}
          pt={(smallMq) ? 0 : 2}
          sx={{
            bgcolor: (index % 2) ? 'rgba(0,0,0,0.25)' : '',
            borderRadius: '15px'
          }}
        >
          <Grid
            item
            sm={1}
            xs={12}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            {hobby.icon}
          </Grid>
          <Grid
            item
            sm={11}
            xs={12}
          >
            <Typography p={2}>
              {hobby.text}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}