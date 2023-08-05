import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import PageLoading from '../PageLoading';

const ProjectAirBnB = React.lazy(() => import('./UniversityProjs/ProjectAirBnB'));
const ProjectEarthEphemeris = React.lazy(() => import('./ProjectEarthEphemeris'));
const ProjectHub = React.lazy(() => import('./ProjectHub'));
const ProjectIFrameShowCase = React.lazy(() => import('./ProjectIFrameShowCase'));
const ProjectSlackr = React.lazy(() => import('./UniversityProjs/ProjectSlackr'));
const ProjectMinecraftRecreation = React.lazy(() => import('./UniversityProjs/ProjectMinecraftRecreation'));
const ProjectMinecraftScreensaver = React.lazy(() => import('./UniversityProjs/ProjectMinecraftScreensaver'));


const PageProjects = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path='' element={<ProjectHub />}/>
        <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
        <Route path='minecraft-recreation/' element={<ProjectMinecraftRecreation />}/>
        <Route path='minecraft-screensaver/' element={<ProjectMinecraftScreensaver />}/>
        <Route path='slackr/' element={<ProjectSlackr />}/>
        <Route path='airbnb/' element={<ProjectAirBnB />}/>
        <Route path='showcase/:project' element={<ProjectIFrameShowCase />}/>
      </Routes>
    </Suspense>
  )
}

export default PageProjects;
