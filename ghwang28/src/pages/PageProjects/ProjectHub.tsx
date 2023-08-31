import React, { Fragment, Suspense, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import generateProjects from './projects';
import ButtonDropDown from '../../components/ButtonDropDown';
import QuestionBlock from '../../components/QuestionBlock';
import TagIcon from '../../icons/TagIcon';
import CardContainer from '../../components/CardContainer';
import GradientTitle from '../../components/GradientTitle';
import CardLoading from '../../components/CardLoading';
import { IconTypes } from '../../types';
import { isSetOverlapping } from '../../utils';
const CardProject = React.lazy(() => import('../../components/CardProject'));

const allFilters: IconTypes[] = [
  'Artwork',
  'C++',
  'Firebase',
  'Frontend',
  'Game',
  'High School Project',
  'JavaScript',
  'OpenGL',
  'Personal Project',
  'React',
  'University Project'
]

const ProjectHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filterSet, setFilterSet] = useState<Set<IconTypes>>(new Set<IconTypes>());

  const allProjs = generateProjects(navigate, location);
  const projects = allProjs.filter((proj) => !isSetOverlapping(proj.type, filterSet));
  const allFiltersSelected = filterSet.size === allFilters.length;

  const toggleFilter = (filterName: IconTypes) => (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setFilterSet((oldSet) => {
      const newSet = new Set<IconTypes>(oldSet);
      if (newSet.has(filterName)) {
        newSet.delete(filterName);
      } else {
        newSet.add(filterName);
      }
      return newSet;
    })
  }

  const onSelectAll = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setFilterSet(new Set<IconTypes>((allFiltersSelected) ? (
      undefined
    ) : (
      allFilters
    )));
  }
  
  return (
    <Fragment>
      <GradientTitle title='Projects' subtitle={'My proud creations, big and small'}/>
      {/* Filter Button */}
      <Box my={1.5} px={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <Typography sx={{ opacity: 0.5 }}>
          {`Showing ${projects.length}/${allProjs.length} projects.`}
        </Typography>
        <ButtonDropDown sx={{ ml: 'auto' }} title='Filter' icon={<FilterAltIcon />}>
          <Typography align='center' m={1} sx={{ width: '250px' }}>
            {'Show projects that are...'}
          </Typography>
          <hr />
          {allFilters.map((filterName) => (
            <MenuItem key={`filter-${filterName}`} onClick={toggleFilter(filterName)} sx={{ color: (!filterSet.has(filterName)) ? 'green.main' : 'red.main' }}>
              <ListItemIcon>
                {(!filterSet.has(filterName)) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </ListItemIcon>
              <ListItemIcon>
                <TagIcon label={filterName} />
              </ListItemIcon>
              <Typography color='inherit'>
                {filterName}
              </Typography>
            </MenuItem>
          ))}
          <hr />
          <MenuItem onClick={onSelectAll} sx={{ color: (allFiltersSelected) ? 'green.main' : 'red.main' }}>
            <ListItemIcon>
              {(allFiltersSelected) ? <DoneAllIcon /> : <DeleteIcon /> }
            </ListItemIcon>
            <Typography color='inherit'>
              {(allFiltersSelected) ? 'Select All' : 'Unselect All'}
            </Typography>
          </MenuItem>
        </ButtonDropDown>
      </Box>
      {(projects.length === 0) ? (
        <QuestionBlockContainer />
      ) : (
        <CardContainer>
          {projects.map((projData, index) => (
            <Suspense key={`proj-${index}`} fallback={<CardLoading />}>
              <CardProject
                index={index}
                data={projData}
              />
            </Suspense>
          ))}
        </CardContainer>
      )}
    </Fragment>
  )
}

const QuestionBlockContainer = () => (
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
      sx={{ opacity: 0.75 }}
    >
      {'There\'s nothing here...'}
      <br/>
      {'...except for a mysterious block!'}
      <br/>
      <Box component='span' sx={{ opacity: 0.5 }}>{'(Try changing the filters to get some results.)'}</Box>
    </Typography>
  </Box>
)

export default ProjectHub;
