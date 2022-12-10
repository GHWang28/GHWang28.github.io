import React from 'react';
import { Routes, Route } from 'react-router';
import ProjectAirBnB from './UniversityProjs/ProjectAirBnB';
import ProjectEarthEphemeris from './ProjectEarthEphemeris';
import ProjectHub from './ProjectHub';
import ProjectIFrameShowCase from './ProjectIFrameShowCase';
import ProjectMinecraft from './UniversityProjs/ProjectMinecraft';
import ProjectSlackr from './UniversityProjs/ProjectSlackr';
import ProjectMinecraftScreensaver from './UniversityProjs/ProjectMinecraftScreensaver';

function PageProjects () {

  return (
    <Routes>
      <Route path='' element={<ProjectHub />}/>
      <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
      <Route path='minecraft-recreation/' element={<ProjectMinecraft />}/>
      <Route path='minecraft-screensaver/' element={<ProjectMinecraftScreensaver />}/>
      <Route path='slackr/' element={<ProjectSlackr />}/>
      <Route path='airbnb/' element={<ProjectAirBnB />}/>
      <Route path='showcase/:project' element={<ProjectIFrameShowCase />}/>
    </Routes> 
  )
}

export default PageProjects;
