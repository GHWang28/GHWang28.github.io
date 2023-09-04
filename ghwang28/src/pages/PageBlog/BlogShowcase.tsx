
import React, { Fragment } from 'react';
import { Box, Link, Typography, useTheme, Divider } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';
import GradientTitle from '../../components/GradientTitle';
import PageError from '../PageError';
import ImageZoomable from '../../components/ImageZoomable';
import CardQuiz from '../../components/CardQuiz';
import CodeSnippet from '../../components/CodeSnippet';
import BlogTags from '../../components/BlogTags';
import { ISOToDateStr } from '../../utils';
import { BlogData } from '../../types';
import BlogElement from '../../types/blogElementTypes';
import blogs from './blogs';

const BlogShowcase = () => {
  const blogID = Number(useParams().blogID);
  const lightMode = useTheme().palette.mode === 'light';

  const blogData = blogs.find((blogEntry: BlogData) => ( blogEntry.id === blogID ));

  if (blogData == null) {
    return (
      <PageError />
    )
  }

  return (
    <Fragment>
      <ButtonGoBack destination={'/blog'} />

      <GradientTitle title={blogData.title} mt={0} subtitle={blogData.subtitle}>
        <BlogTags created={blogData?.created} estimatedReadingTime={blogData?.estimatedReadingTime} quizIncluded={blogData?.quizIncluded} />
      </GradientTitle>
  
      <Box
        mx='auto'
        component='section'
        p={2}
        sx={{
          maxWidth: '800px',
          aspectRatio: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: (lightMode) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          borderRadius: '15px',
        }}
      >
        <ImageZoomable
          src={blogData.thumbnail}
          sx={{
            width: '90%',
            maxWidth: '500px',
            borderRadius: '15px',
            border: '2px solid black',
            mx: 'auto',
            bgcolor: 'rgb(200,200,200)',
          }}
        />
        <Box component='section' sx={{ 'img': { my: 3 } }}>
          {blogData?.elements && blogData.elements.map((elementData: BlogElement, index: number) => {
            // Convert type to React components
            switch(elementData.type) {
              case 'h6':
              case 'h5':
              case 'h4':
              case 'h3':
              case 'h2':
              case 'h1': return (
                <Fragment key={`page-item-${elementData.type}-${index}`}>
                  <Typography
                    textAlign={{ sm: 'left', xs: 'center' }}
                    fontWeight='bold'
                    sx={{ mt: (elementData.type === 'h6') ? 2 : 4, mb: 1 }}
                    variant={elementData.type}
                  >
                    {`${blogData.emoji} ${elementData.children}`}
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                </Fragment>
              )
              case 'code': return (
                <CodeSnippet
                  key={`page-item-${elementData.type}-${index}`}
                  language={elementData.language}
                  snippet={elementData.children}
                  title={elementData.title}
                />
              )
              case 'quiz': return (
                <CardQuiz
                  key={`page-item-${elementData.type}-${index}`}
                  question={elementData.question}
                  options={elementData.options}
                />
              )
              case 'feedback': return (
                <Fragment key={`page-item-${elementData.type}-${index}`}>
                  <Box component='hr' width='100%' mt={4} />
                  <Typography
                    textAlign={{ sm: 'left', xs: 'center' }}
                    fontWeight='bold'
                    sx={{ mt: 6, mb: 1 }}
                    variant='h4'
                  >
                    {`${blogData.emoji} Feedback`}
                  </Typography>
                  <Divider />
                  <Typography textAlign='justify' fontSize={20} my={2}>
                    {'Find something wrong with one of my blog posts? Want to provide general feedback? Let me know '}
                    <Link target='_blank' href='https://forms.gle/bEsuMMEHmtViWxmY7'>
                      {'here'}
                    </Link>
                    {'!'}
                  </Typography>
                </Fragment>
              )
              case 'signoff': return (
                <Typography key={`page-item-${elementData.type}-${index}`} align='right' mt={3}>
                  {'Last updated: '}
                  {ISOToDateStr(blogData?.created)}
                </Typography>
              )
              case 'p': return (
                <Typography key={`page-item-${elementData.type}-${index}`} textAlign={{ md: 'justify' }} fontSize={20} my={6}>{elementData.children}</Typography>
              )
              default: return (
                <Fragment key={`frag-${index}`}>
                  {elementData.children}
                </Fragment>
              )
            }
          })}
        </Box>
        
      </Box>
    </Fragment>
  )
}

export default BlogShowcase;
