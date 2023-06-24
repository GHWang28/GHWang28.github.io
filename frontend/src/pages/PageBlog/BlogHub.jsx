import React, { Fragment } from 'react';
import { Box } from '@mui/material';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import blogs from './blogs.json';
import CardContainer from '../../components/CardContainer';
import CardBlog from '../../components/CardBlog';

export default function BlogHub () {
  return (
    <Fragment>
      <AnimatedTitle title='Blog Posts' subtitle='Resources for students (and other shenanigans)'/>
      <Box component='hr' mb={1}/>

      <CardContainer cardData={blogs} component={CardBlog} />
    </Fragment>
  )
}
