import React, { Fragment, useEffect, useState } from 'react';
import { Box, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import CardProjectContainer from '../../components/CardProjectContainer';
import { setNavButtonPress } from '../../redux/actions';
import generateProjects from './projects';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ButtonDropDown from '../../components/ButtonDropDown';
import QuestionBlock from '../../components/QuestionBlock';

function ProjectHub () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState([
    { type: 'Artwork', enabled: false },
    { type: 'Frontend', enabled: false },
    { type: 'Game', enabled: false },
    { type: 'High School Project', enabled: false },
    { type: 'Personal Project', enabled: false },
    { type: 'University Project', enabled: false },
    { type: 'C++', enabled: false },
    { type: 'OpenGL', enabled: false },
    { type: 'JavaScript', enabled: false },
    { type: 'React', enabled: false },
  ]);

  const filterEnabled = filter.filter((filterObj) => (filterObj.enabled));
  const projects = generateProjects(navigate, location).filter((project) => {
    for (const filterObj of filterEnabled) {
      if (!project.type.includes(filterObj.type)) return false;
    }
    return true;
  });

  // Set the navbar button to none
  useEffect(() => {
    dispatch(setNavButtonPress(0))
  }, [dispatch]);

  return (
    <Fragment>
      <Box className='gradient-text'>
        <Typography mt={5} variant='h2' fontWeight='bold' align='center'>
          {'Projects'}
        </Typography>
        <Typography mb={2} variant='h4' fontWeight='bold' align='center'>
          {' I\'ve worked on'}
        </Typography>
      </Box>
      <Box component='hr' mb={1}/>
  
      {/* Filter Button */}
      <Box sx={{ width: '100%', display: 'flex' }}>
        <ButtonDropDown sx={{ ml: 'auto', mb: 2 }} title='Filter' icon={<FilterAltIcon />}>
          <Typography align='center' m={1} sx={{ width: '250px' }}>
            Filters
          </Typography>
          <hr />
          {filter.map((item, index) => (
            <MenuItem
              key={`filter-${index}`}
              onClick={(event) => {
                event.stopPropagation();
                const newFilter = [...filter];
                newFilter[index].enabled = !item.enabled;
                setFilter([...newFilter]);
              }}
            >
              <ListItemIcon>
                {(item.enabled) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </ListItemIcon>
              <Typography sx={{ color: (item.enabled) ? 'green.main' : 'red.main' }}>
                {item.type}
              </Typography>
            </MenuItem>
          ))}
        </ButtonDropDown>
      </Box>
      {(projects.length === 0) ? (
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 350px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <QuestionBlock />
          <Typography
            align='center'
            my={2}
            fontSize={20}
            fontWeight='bold'
            sx={{
              opacity: 0.75
            }}
          >
            There's nothing here...
            <br/>
            ...except for a mysterious block!
            <br/>
            <Box component='span' sx={{ opacity: 0.5 }}>{'(Try changing the filters to get some results.)'}</Box>
          </Typography>
        </Box>
      ) : (
        <CardProjectContainer projects={projects} />
      )}
    </Fragment>
  )
}

export default ProjectHub;
