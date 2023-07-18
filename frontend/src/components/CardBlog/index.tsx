import React from 'react';
import { useTheme, Box, Typography, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import TypographyBorder from '../TypographyBorder';
import BootstrapTooltip from '../BootstrapTooltip';
import { useNavigate } from 'react-router';
import BlogTags from '../BlogTags';
import { BlogData } from '../../types';

type ComponentProps = {
  data: BlogData,
  index?: number
}

const CardBlog = ({ data, index = 0 }: ComponentProps) => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  
  const theme =  useTheme();
  const lightMode = theme.palette.mode === 'light';
  const smallMq = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    id,
    title,
    subtitle,
    thumbnail,
    created,
    estimatedReadingTime,
    quizIncluded
  } = data;

  return (id < 0) ? (
    <Box
      ref={ref}
      p={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: (inView) ? '0.8' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: { lg: 0, md: 5, xs: 0 },
        mb: { md: 5, xs: 2 },
        bgcolor: 'bgColor.main',
        height: '300px',
        scale: '0.975',
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='${lightMode ? 'black' : 'whitesmoke'}' stroke-width='10' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
      }}
    >
      <Typography fontSize={18}>
        {' More posts coming soon...'}
      </Typography>
    </Box>
  ) : (
    <Box
      ref={ref}
      className='border-gradient'
      p={2}
      sx={{
        position: 'relative',
        opacity: (inView) ? '1' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
        transition: 'scale 0.5s ease-in-out, box-shadow 0.5s ease-in-out, translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
        borderRadius: '15px',
        overflow: 'hidden',
        mx: { lg: 0, md: 5, xs: 0 },
        mb: { md: 5, xs: 2 },
        bgcolor: 'bgColor.main',
        scale: '0.975',
        boxShadow: '0 4px 8px 0 rgba(255,255,255,0.2)',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(255,255,255,0.2)',
          scale: '1'
        },
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer'
      }}
      onClick={() => {
        navigate(`${id}`);
      }}
    >
      {(thumbnail != null) && (
        <Box
          component='img'
          src={thumbnail}
          alt={title}
          sx={{
            width: '100%',
            maxHeight: '250px',
            borderRadius: '15px',
            objectFit: 'cover',
            objectPosition: 'bottom',
            bgcolor: 'rgb(200,200,200)'
          }}
        />
      )}
      <BootstrapTooltip title='Title' placement={(smallMq) ? 'left' : 'top-start'}>
        <TypographyBorder variant='h4'>
          {title}
        </TypographyBorder>
      </BootstrapTooltip>
      <Typography align='center' my={2}>
        {subtitle}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <BlogTags {...{ created, estimatedReadingTime, quizIncluded }} />
      </Box>
    </Box>
  )
}

export default CardBlog;
