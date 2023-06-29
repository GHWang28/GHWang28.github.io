
import React, { Fragment } from 'react';
import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import PageError from '../PageError';
import ImageZoomable from '../../components/ImageZoomable';
import BootstrapTooltip from '../../components/BootstrapTooltip';
import { ISOToDateStr } from '../../helpers';
import blogs from './blogs';
import TransluscentTypography from '../../components/TranslucentTypography';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import CardQuiz from '../../components/CardQuiz';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QuizIcon from '@mui/icons-material/Quiz';

export default function BlogShowcase () {
  const lightMode = useTheme().palette.mode === 'light';
  const blogID = Number(useParams().blogID);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const theme = useTheme();

  const blogData = blogs.find((blogEntry) => ( blogEntry.id === blogID ));

  if (blogData == null) {
    return (
      <PageError />
    )
  }

  return (
    <Fragment>
      <ButtonGoBack destination={'/blog'} />

      <AnimatedTitle title={blogData.title} mt={0} subtitle={blogData.subtitle}>
        <Box sx={{ display: 'flex' }}>
          <BootstrapTooltip  title='Creation Date' placement={'top'}>
            <Chip sx={{ flex: 1, mx: 1 }} icon={<CalendarTodayIcon />} label={ISOToDateStr(blogData.created)} variant='outlined' />
          </BootstrapTooltip>
          <BootstrapTooltip title='Estimated Time to Read' placement={'top'}>
            <Chip sx={{ flex: 1, mx: 1 }} icon={<AvTimerIcon />} label={`~${blogData.estimatedReadingTime} minutes`} variant='outlined' />
          </BootstrapTooltip>
          <BootstrapTooltip title={(blogData.quizIncluded) ? 'This blog contains quizzes' : 'This blog does not contain quizzes'} placement={'top'}>
            <Chip
              sx={{ flex: 1, mx: 1, color: (blogData.quizIncluded) ? 'green.main' : 'red.main' }}
              icon={<QuizIcon style={{ color: (blogData.quizIncluded) ? theme.palette.green.main : theme.palette.red.main }} />}
              label={(blogData.quizIncluded) ? `Quiz Included` : 'Quiz Not Included'} variant='outlined' 
            />
          </BootstrapTooltip>
        </Box>
      </AnimatedTitle>

        <Box display='flex' justifyContent='center'>
          <ImageZoomable
            src={blogData.thumbnail}
            sx={{
              width: '90%',
              maxWidth: '500px',
              borderRadius: '15px'
            }}
          />
        </Box>

        <Box
          mx='auto'
          p={2}
          sx={{
            maxWidth: '750px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {blogData?.elements && blogData.elements.map((elementData) => {
            switch(elementData.type) {
              default: return (
                <Typography textAlign='justify' sx={{ textIndent: '50px' }} fontSize={20} my={2}>{elementData.children}</Typography>
              );
              case 'h4':
              case 'h3':
              case 'h2':
              case 'h1': return (
                <TransluscentTypography
                  textAlign={(smallMq) ? 'left' : 'center'}
                  fontWeight='bold'
                  my={2}
                  variant={elementData.type}
                >
                  {elementData.children}
                </TransluscentTypography>
              )
              case 'code': return (
                <SyntaxHighlighter showLineNumbers language={elementData.language} style={lightMode ? light : dark}>
                  {elementData.children}
                </SyntaxHighlighter>
              )
              case 'quiz': return (
                <CardQuiz
                  question={elementData.question}
                  options={elementData.options}
                  explanation={elementData.children}
                />
              )
            }
          })}
        </Box>
    </Fragment>
  )
}

