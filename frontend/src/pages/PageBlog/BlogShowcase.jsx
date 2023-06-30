
import React, { Fragment } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import PageError from '../PageError';
import ImageZoomable from '../../components/ImageZoomable';
import blogs from './blogs';
import TypographyBorder from '../../components/TypographyBorder';
import CardQuiz from '../../components/CardQuiz';
import CodeSnippet from '../../components/CodeSnippet';
import BlogTags from '../../components/BlogTags';
import { ISOToDateStr } from '../../helpers';

export default function BlogShowcase () {
  const blogID = Number(useParams().blogID);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const lightMode = useTheme().palette.mode === 'light';

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
        <BlogTags created={blogData?.created} estimatedReadingTime={blogData?.estimatedReadingTime} quizIncluded={blogData?.quizIncluded} />
      </AnimatedTitle>
  
      <Box
        mx='auto'
        p={2}
        sx={{
          maxWidth: '750px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: (lightMode) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          borderRadius: '15px'
        }}
      >
        <ImageZoomable
          src={blogData.thumbnail}
          sx={{
            width: '90%',
            maxWidth: '500px',
            borderRadius: '15px',
            border: '2px solid black',
            mx: 'auto'
          }}
        />
        {blogData?.elements && blogData.elements.map((elementData, index) => {
          // Convert type to React components
          switch(elementData.type) {
            case 'h4':
            case 'h3':
            case 'h2':
            case 'h1': return (
              <TypographyBorder
                key={`page-item-${index}`}
                textAlign={(smallMq) ? 'left' : 'center'}
                fontWeight='bold'
                sx={{ my: 5 }}
                variant={elementData.type}
              >
                {`${blogData.emoji} ${elementData.children}`}
              </TypographyBorder>
            )
            case 'code': return (
              <CodeSnippet
                key={`page-item-${index}`}
                language={elementData.language}
                snippet={elementData.children}
                title={elementData.title}
              />
            )
            case 'quiz': return (
              <CardQuiz
                key={`page-item-${index}`}
                question={elementData.question}
                options={elementData.options}
              />
            )
            case 'signoff': return (
              <Typography key={`page-item-${index}`} align='right'>
                {'- '}
                <Box component='span' fontWeight='bold' color={'blue.main'}>{'Gordon Wang'}</Box>
                <br />
                {'Casual Academic @ '}
                <Box component='span' fontWeight='bold' color={'yellow.main'}>{'UNSW'}</Box>
                <br />
                {ISOToDateStr(blogData?.created)}
              </Typography>
            )
            default: return (
              <Typography key={`page-item-${index}`} textAlign='justify' sx={{ textIndent: '25px' }} fontSize={20} my={2}>{elementData.children}</Typography>
            );
          }
        })}
      </Box>
    </Fragment>
  )
}

