import React from 'react';
import { Routes, Route } from 'react-router';
import ProjectEarthEphemeris from './ProjectEarthEphemeris';
import ProjectHub from './ProjectHub';
import ProjectTicTacToeCapture from './ProjectTicTacToeCapture';

function PageProjects () {
  return (
    <Routes>
      <Route path='' element={<ProjectHub />}/>
      <Route path='earth-ephemeris/' element={<ProjectEarthEphemeris />}/>
      <Route path='tic-tac-toe-capture/' element={<ProjectTicTacToeCapture />}/>
    </Routes>
  )
}

export default PageProjects;
