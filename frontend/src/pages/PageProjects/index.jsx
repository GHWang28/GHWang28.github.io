import React from 'react';
import { Routes, Route } from 'react-router';
import ProjectEarthEphemeris from './ProjectEarthEphemeris';
import ProjectHub from './ProjectHub';

function PageProjects () {
  return (
    <Routes>
      <Route path='' element={<ProjectHub />}/>
      <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
    </Routes>
  )
}

export default PageProjects;
