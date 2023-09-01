import React, { Fragment } from 'react';
import InlineCode from '../../../components/InlineCode';
import SparklezText from '../../../components/Sparklez/SparklezText';
import { Box } from '@mui/material';
import { BlogData } from '../../../types';

const promisePoolBlog: BlogData = {
  id: 3,
  title: 'What are Promise pools?',
  subtitle: 'A guide on running all asynchronous functions, \'x\' at a time.',
  thumbnail: '/images/blog/thumbnail_pool.webp',
  created: '2023-09-02T00:00:00.000Z',
  estimatedReadingTime: 3,
  quizIncluded: false,
  emoji: '🏊‍♀️',
  elements: [
    {
      type: 'p',
      children: 'Coming soon!'
    },
    /* { type: 'signoff' },
    { type: 'feedback' } */
  ]
}

export default promisePoolBlog;
