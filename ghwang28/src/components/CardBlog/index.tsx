import React from 'react';
import { useTheme, Box, Typography, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import BootstrapTooltip from '../BootstrapTooltip';
import { useNavigate } from 'react-router';
import BlogTags from '../BlogTags';
import { BlogData } from '../../types';
import CardDashed from '../CardDashed';
import ImageLoader from '../ImageLoader';

type ComponentProps = {
  data: BlogData,
  index?: number
}

const CardBlog = ({ data, index = 0 }: ComponentProps) => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });
  const navigate = useNavigate();
  
  const theme =  useTheme();
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
    <CardDashed
      ref={ref}
      sx={{
        opacity: (inView) ? '0.8' : '0',
        translate: (inView) ? '0px' : ((index % 2) ? '100px' : '-100px'),
      }}
    >
      <Typography fontSize={18}>
        {' More posts coming soon...'}
      </Typography>
    </CardDashed>
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
      onClick={() => { navigate(`${id}`) }}
    >
      {(thumbnail != null) && (
        <ImageLoader
          src={thumbnail}
          alt={title}
          sx={{
            width: '100%',
            height: '350px',
            pb: 1.5
          }}
          imageSx={{
            borderRadius: '15px',
            bgcolor: 'rgb(200,200,200)',
            height: '100%'
          }}
        />
      )}
      <BootstrapTooltip title='Title' placement={(smallMq) ? 'left' : 'top-start'}>
        <Typography variant='h4' px={1}>
          {title}
        </Typography>
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
