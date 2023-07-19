import React from 'react';
import { Box, Chip, Theme, useMediaQuery, useTheme } from '@mui/material';
import BootstrapTooltip from '../BootstrapTooltip';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QuizIcon from '@mui/icons-material/Quiz';
import { ISOToDateStr } from '../../helpers';

type ComponentProps = {
  created: string,
  estimatedReadingTime: number,
  quizIncluded: boolean
}

const BlogTags = ({ created, estimatedReadingTime, quizIncluded }: ComponentProps) => {
  const theme = useTheme();
  const smallMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <BootstrapTooltip title='Creation Date' placement={(smallMq) ? 'left' : 'top-start'}>
        <Chip sx={{ flex: 1, mx: { xs: 0, sm: 0.5 } }} icon={<CalendarTodayIcon />} label={ISOToDateStr(created, !smallMq)} variant='outlined' />
      </BootstrapTooltip>
      <BootstrapTooltip title='Estimated Time to Read' placement={(smallMq) ? 'left' : 'top-start'}>
        <Chip sx={{ flex: 1, mx: { xs: 0, sm: 0.5 } }} icon={<AvTimerIcon />} label={`~${estimatedReadingTime} ${(smallMq) ? 'minutes' : 'min'}`} variant='outlined' />
      </BootstrapTooltip>
      <BootstrapTooltip title={(quizIncluded) ? 'This blog contains quizzes' : 'This blog does not contain quizzes'} placement={(smallMq) ? 'left' : 'top-start'}>
        <Chip
          sx={{ flex: 1, mx: { xs: 0, sm: 0.5 }, color: (quizIncluded) ? 'green.main' : 'red.main' }}
          icon={<QuizIcon style={{ color: (quizIncluded) ? theme.palette.green.main : theme.palette.red.main }} />}
          label={(smallMq) ? (
            `Quiz ${(quizIncluded) ? `Included` : 'Not Included'}`
          ) : (
            `${(quizIncluded) ? `` : 'No'} Quiz`
          )} variant='outlined' 
        />
      </BootstrapTooltip>
    </Box>
  )
}

export default BlogTags;
