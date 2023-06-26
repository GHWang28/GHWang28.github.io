import React, { Fragment } from 'react';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import blogs from './blogs.json';
import CardContainer from '../../components/CardContainer';
import CardBlog from '../../components/CardBlog';

export default function BlogHub () {
  return (
    <Fragment>
      <AnimatedTitle title='Blog Posts' subtitle='Resources for students (and other shenanigans)'/>

      <CardContainer cardData={blogs} component={CardBlog} />
    </Fragment>
  )
}
