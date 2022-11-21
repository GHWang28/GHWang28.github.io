import React from 'react';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import WavesIcon from '@mui/icons-material/Waves';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { setBackground } from '../../redux/actions';
import DropDownButton from '../ButtonDropDown';

function BackgroundItem () {
  const dispatch = useDispatch();
  const backgroundIndex = useSelector(state => state.background);
  const backgroundOptions = [
    {
      icon: <CancelIcon />,
      label: 'None'
    },
    {
      icon: <WavesIcon />,
      label: 'Waves'
    },
  ]
  return (
    <DropDownButton icon={<SettingsIcon />}>
      <Typography align='center' m={1}>
        Settings
      </Typography>
      <hr />
      <MenuItem
        name='logout-btn'
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setBackground(backgroundIndex + 1))
        }}
      >
        <ListItemIcon>{backgroundOptions[backgroundIndex].icon}</ListItemIcon>
        <Typography>{`Background: ${backgroundOptions[backgroundIndex].label}`}</Typography>
      </MenuItem>
    </DropDownButton>
  )
}

export default BackgroundItem;
