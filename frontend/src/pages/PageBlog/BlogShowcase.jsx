
import React, { Fragment, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router';
import ButtonGoBack from '../../components/ButtonGoBack';
import AnimatedTitle from '../PageProjects/AnimatedTitle';
import blogs from './blogs.json';
import PageError from '../PageError';

export default function BlogShowcase () {
  const blogID = Number(useParams().blogID);
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const blogData = blogs.find((blogEntry) => ( blogEntry.id === blogID ));

  if (blogData == null) {
    return (
      <PageError />
    )
  }

  return (
    <Fragment>
      <ButtonGoBack destination={'/blog'} />
      <AnimatedTitle title={blogData.title} />
    </Fragment>
  )
}

