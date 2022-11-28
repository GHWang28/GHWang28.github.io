import { Box, Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CardProject from '../../components/CardProject';
import { setNavButtonPress } from '../../redux/actions';
import generateProjects from './projects';

function ProjectHub () {
  const dispatch = useDispatch();
  const projects = generateProjects(useNavigate());

  // Set the navbar button to none
  useEffect(() => {
    dispatch(setNavButtonPress(0))
  }, [dispatch]);

  return (
    <Fragment>
      <Typography mt={5} variant='h2' fontWeight='bold' align='center'>
        {'Projects'}
      </Typography>
      <Typography mb={2} variant='h4' fontWeight='bold' align='center'>
        {' I\'ve worked on'}
      </Typography>
      <Box component='hr' mb={3}/>
      {projects.map((proj, index) => (
        <CardProject
          key={`proj-${index}`}
          index={index}
          {...proj}
        />
      ))}
    </Fragment>
  )
}

export default ProjectHub;
