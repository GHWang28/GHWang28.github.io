import React from 'react';
import { ListItemIcon, MenuItem, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AbcIcon from '@mui/icons-material/Abc';
import WavesIcon from '@mui/icons-material/Waves';
import CancelIcon from '@mui/icons-material/Cancel';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MemoryIcon from '@mui/icons-material/Memory';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SquareIcon from '@mui/icons-material/Square';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { setBackground, setThemeMode, setToggleSplash } from '../../redux/actions';
import ButtonDropDown from '../ButtonDropDown';

function Settings () {
  const dispatch = useDispatch();
  const backgroundIndex = useSelector(state => state.background);
  const splashState = useSelector(state => state.splash);
  const themeMode = useTheme().palette.mode;

  const backgroundOptions = [
    {
      icon: <CancelIcon />,
      label: 'None'
    },
    {
      icon: <MemoryIcon />,
      label: 'Circuitry'
    },
    {
      icon: <WavesIcon />,
      label: 'Waves'
    },
    {
      icon: <PlayArrowOutlinedIcon />,
      label: 'Links'
    },
    {
      icon: <AcUnitIcon />,
      label: 'Snow'
    },
    {
      icon: <PlayArrowIcon />,
      label: 'Triangles'
    },
    {
      icon: <StarOutlineIcon />,
      label: 'Stars'
    },
    {
      icon: <SquareIcon sx={{ scale: '1.0' }}/>,
      label: 'Blocks x16'
    },
    {
      icon: <SquareIcon sx={{ scale: '0.66' }}/>,
      label: 'Blocks x32'
    }
  ];
  return (
    <ButtonDropDown title='Settings' icon={<SettingsIcon />}>
      <Typography align='center' m={1} sx={{ width: '250px' }}>
        {'Settings'}
      </Typography>
      <hr />
      <MenuItem
        name='change-background-btn'
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setBackground(backgroundIndex + 1));
        }}
      >
        <ListItemIcon>{backgroundOptions[backgroundIndex].icon}</ListItemIcon>
        <Typography>{`Background: ${backgroundOptions[backgroundIndex].label}`}</Typography>
      </MenuItem>
      <MenuItem
        name='change-splash-btn'
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setToggleSplash(!splashState))
        }}
      >
        <ListItemIcon><AbcIcon /></ListItemIcon>
        <Typography>{`Splash Text ${(splashState) ? 'enabled': 'disabled'}`}</Typography>
      </MenuItem>
      <MenuItem
        name='change-theme-btn'
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setThemeMode((themeMode === 'dark') ? 'light' : 'dark'))
        }}
      >
        <ListItemIcon>{(themeMode === 'dark') ? <DarkModeIcon/> : <LightModeIcon/>}</ListItemIcon>
        <Typography>{`${themeMode[0].toUpperCase() + themeMode.slice(1).toLowerCase()}`}</Typography>
      </MenuItem>
    </ButtonDropDown>
  )
}

export default Settings;
