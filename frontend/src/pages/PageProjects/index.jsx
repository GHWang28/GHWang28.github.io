import { Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CardProject from '../../components/CardProject';
import { setNavButtonPress } from '../../redux/actions';

function PageProjects () {
  const dispatch = useDispatch();

  // Set the navbar button to none
  useEffect(() => {
    dispatch(setNavButtonPress(0))
  }, [dispatch]);

  return (
    <Fragment>
      <Typography my={5} variant='h2' fontWeight='bold' align='center'>
        {'Projects I\'ve worked on'}
      </Typography>
      <CardProject
        title={'Earth\'s Ephemeris'}
        date={'(25/12/2018) → (28/08/2019)'}
        type={'Artwork'}
        imgs={[
          '/images/hscbow/homesweethome.png',
          '/images/hscbow/leaving.png',
          '/images/hscbow/bonvoyage.png',
          '/images/hscbow/rabureta.jpg',
          '/images/hscbow/ruiji.png',
          '/images/hscbow/homecoming.png',
        ]}
      />
    </Fragment>
  )
}

export default PageProjects;
