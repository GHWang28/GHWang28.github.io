import { Box, Collapse, MenuItem, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CardProjectContainer from '../../components/CardProjectContainer';
import { setNavButtonPress } from '../../redux/actions';
import generateProjects from './projects';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ButtonDropDown from '../../components/ButtonDropDown';

function ProjectHub () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [useFilter, setUseFilter] = useState(false);
  const [filter, setFilter] = useState([
    { type: 'Game', enabled: true },
    { type: 'Artwork', enabled: false },
    { type: 'University Project', enabled: false },
    { type: 'Personal Project', enabled: false },
    { type: 'High School Project', enabled: false },
  ])
  const filterTypes = filter.map((filterObj) => (filterObj.type));
  const filterEnabled = filter.filter((filterObj) => (filterObj.enabled));
  const projects = (useFilter)
    ? (
      generateProjects(navigate).filter((project) => {
        for (const filterObj of filterEnabled) {
          if (project.type.includes(filterObj.type)) return true;
        }
        return false;
      })
    )
    : (
      generateProjects(navigate)
    )


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
      <Box component='hr' mb={1}/>
      {/*Filter Button*/}
      <Box sx={{ width: '100%', display: 'flex' }}>
      <ButtonDropDown sx={{ ml: 'auto' }} title='Filter' icon={<FilterAltIcon />}>
        <MenuItem onClick={(event) => { event.stopPropagation(); setUseFilter(!useFilter); }}>
          <Typography align='center' sx={{ width: '220px' }}>
            {(useFilter) ? 'Disable Filters' : 'Enable Filters'}
          </Typography>
        </MenuItem>
        <Collapse in={useFilter}>
          <hr />
          {filterTypes.map((item, index) => (
            <MenuItem
              key={`filter-${index}`}
              onClick={(event) => {
                event.stopPropagation();
                const newFilter = [...filter];
                newFilter[index].enabled = !newFilter[index].enabled
                console.log(index)
                setFilter([...newFilter]);
              }}
            >
              <Typography
                sx={{
                  color: (filter[index].enabled) ? 'green.main' : 'red.main'
                }}
              >
                {item}
              </Typography>
            </MenuItem>
          ))}
        </Collapse>
      </ButtonDropDown>
      </Box>
      <CardProjectContainer projects={projects} />
    </Fragment>
  )
}

export default ProjectHub;
