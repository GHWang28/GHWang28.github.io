import React, { Fragment } from 'react';
import CardContainer from '../../components/CardContainer';
import CardBlog from '../../components/CardBlog';
import blogs from './blogs';
import GradientTitle from '../../components/GradientTitle';

const BlogHub = () => (
  <Fragment>
    <GradientTitle title='Blog Posts' subtitle='Resources for students (and other shenanigans)'/>

    <CardContainer cardData={[...blogs, { id: -999 }]} component={CardBlog} />
  </Fragment>
)

export default BlogHub;
