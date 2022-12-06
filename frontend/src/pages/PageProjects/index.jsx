import React from 'react';
import { Routes, Route } from 'react-router';
import ProjectEarthEphemeris from './ProjectEarthEphemeris';
import ProjectHub from './ProjectHub';
import ProjectIFrameShowCase from './ProjectIFrameShowCase';
import ProjectMinecraft from './ProjectMinecraft';

function PageProjects () {

  return (
    <Routes>
      <Route path='' element={<ProjectHub />}/>
      <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
      <Route path='minecraft-recreation/' element={<ProjectMinecraft />}/>
      <Route path='showcase/:project' element={<ProjectIFrameShowCase />}/>
    </Routes>
  )
}

export default PageProjects;
