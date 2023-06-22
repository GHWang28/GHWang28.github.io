import React from 'react';
import { Route, Routes } from 'react-router';
import BlogHub from './BlogHub';
import BlogShowcase from './BlogShowcase';

export default function PageBlog () {
  return (
    <Routes>
      <Route path='' element={<BlogHub />}/>
      <Route path='/:blogID' element={<BlogShowcase />}/>
    </Routes> 
  )
}
