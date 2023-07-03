import React from 'react';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import ImageScroller from '../../../components/ImageScroller';

export default function SkillsSection () {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      ref={ref}
      sx={{
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : '50px',
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {'Skills'}
      </Typography>

      <Link component={RouterLink} variant='subtitle1' fontWeight='bold' to={'skills'} align='center' mb={(smallMq) ? 1 : 3}>
        {'✨ Click here to see the full list ✨'}
      </Link>
      
      <ImageScroller
        height='75px'
        onClick={() => { navigate('skills') }}
        images={[
          '/images/about/skills/c++.svg',
          '/images/about/skills/css.svg',
          '/images/about/skills/firebase.svg',
          '/images/about/skills/html.svg',
          '/images/about/skills/java.svg',
          '/images/about/skills/js.svg',
          '/images/about/skills/opengl.svg',
          '/images/about/skills/psql.svg',
          '/images/about/skills/python.svg',
          '/images/about/skills/react.svg',
          '/images/about/skills/ts.svg',
        ]}
        tooltips={[
          'C++',
          'CSS',
          'Firebase',
          'HTML',
          'Java',
          'Javascript',
          'OpenGL',
          'PSQL',
          'Python',
          'React',
          'Typescript'
        ]}
      />
    </Box>
  )
}