import React from 'react';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AbcIcon from '@mui/icons-material/Abc';
import WavesIcon from '@mui/icons-material/Waves';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { setBackground, setToggleSplash } from '../../redux/actions';
import DropDownButton from '../ButtonDropDown';

function Settings () {
  const dispatch = useDispatch();
  const backgroundIndex = useSelector(state => state.background);
  const splashState = useSelector(state => state.splash);
  const backgroundOptions = [
    {
      icon: <CancelIcon />,
      label: 'None'
    },
    {
      icon: <WavesIcon />,
      label: 'Waves'
    },
  ];
  return (
    <DropDownButton icon={<SettingsIcon />}>
      <Typography align='center' m={1} sx={{ width: '220px' }}>
        Settings
      </Typography>
      <hr />
      <MenuItem
        name='change-background-btn'
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setBackground(backgroundIndex + 1))
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
    </DropDownButton>
  )
}

export default Settings;
