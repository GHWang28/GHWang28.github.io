import React, { Fragment, Suspense } from 'react';
import CardContainer from '../../components/CardContainer';
import blogs from './blogs';
import GradientTitle from '../../components/GradientTitle';
import TrailingCard from '../../components/CardBlog/TrailingCard';
import CardLoading from '../../components/CardLoading';
const CardBlog = React.lazy(() => import('../../components/CardBlog'));

const BlogHub = () => {

  const arrayOfReactNodes = blogs.map((blogData, index) => (
    <Suspense key={`blog-${index}`} fallback={<CardLoading />}>
      <CardBlog
        index={index}
        data={blogData}
      />
    </Suspense>
  ));

  arrayOfReactNodes.push(<TrailingCard key='trailing-card' index={blogs.length}/>)

  return (
    <Fragment>
      <GradientTitle title='Blog Posts' subtitle='Resources for students (and other shenanigans)'/>
      <CardContainer>
        {arrayOfReactNodes}
      </CardContainer>
    </Fragment>
  )
}

export default BlogHub;
