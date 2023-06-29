import React from 'react';
import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import TransluscentTypography from '../TranslucentTypography';
import BootstrapTooltip from '../BootstrapTooltip';
import { ISOToDateStr } from '../../helpers';
import { useNavigate } from 'react-router';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QuizIcon from '@mui/icons-material/Quiz';

export default function CardBlog ({ data, index = 0 }) {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const theme = useTheme();
  const largeMq = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const {
    id,
    title,
    subtitle,
    thumbnail,
    created,
    estimatedReadingTime,
    quizIncluded
  } = data;

  return (
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
        mx: (largeMq) ? 0 : (mediumMq) ? 5 : 0,
        mb: (mediumMq) ? 5 : 2,
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
            objectPosition: 'bottom'
          }}
        />
      )}
      <BootstrapTooltip title='Title' placement={(smallMq) ? 'left' : 'top-start'}>
        <TransluscentTypography variant='h4'>
          {title}
        </TransluscentTypography>
      </BootstrapTooltip>
      <Typography align='center' my={2}>
        {subtitle}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <BootstrapTooltip  title='Creation Date' placement={(smallMq) ? 'left' : 'top-start'}>
          <Chip sx={{ flex: 1, mx: 1 }} icon={<CalendarTodayIcon />} label={ISOToDateStr(created)} variant='outlined' />
        </BootstrapTooltip>
        <BootstrapTooltip title='Estimated Time to Read' placement={(smallMq) ? 'left' : 'top-start'}>
          <Chip sx={{ flex: 1, mx: 1 }} icon={<AvTimerIcon />} label={`~${estimatedReadingTime} minutes`} variant='outlined' />
        </BootstrapTooltip>
        <BootstrapTooltip title={(quizIncluded) ? 'This blog contains quizzes' : 'This blog does not contain quizzes'} placement={(smallMq) ? 'left' : 'top-start'}>
          <Chip
            sx={{ flex: 1, mx: 1, color: (quizIncluded) ? 'green.main' : 'red.main' }}
            icon={<QuizIcon style={{ color: (quizIncluded) ? theme.palette.green.main : theme.palette.red.main }} />}
            label={(quizIncluded) ? `Quiz Included` : 'Quiz Not Included'} variant='outlined' 
          />
        </BootstrapTooltip>
      </Box>
    </Box>
  )
}