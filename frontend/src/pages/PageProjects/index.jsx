import React from 'react';
import { Routes, Route } from 'react-router';
import ProjectEarthEphemeris from './ProjectEarthEphemeris';
import ProjectHub from './ProjectHub';
import ProjectIFrameShowCase from './ProjectIFrameShowCase';

function PageProjects () {
  return (
    <Routes>
      <Route path='' element={<ProjectHub />}/>
      <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
      <Route path='showcase/:project' element={<ProjectIFrameShowCase />}/>
    </Routes>
  )
}

export default PageProjects;
