import React from 'react';
import { ListItemIcon, MenuItem, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AbcIcon from '@mui/icons-material/Abc';
import WavesIcon from '@mui/icons-material/Waves';
import CancelIcon from '@mui/icons-material/Cancel';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import MemoryIcon from '@mui/icons-material/Memory';
import SquareIcon from '@mui/icons-material/Square';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { setBackground, setNavbarLock, setThemeMode, setToggleSplash } from '../../redux/actions';
import ButtonDropDown from '../ButtonDropDown';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../hooks';

function Settings () {
  const dispatch = useAppDispatch();
  const backgroundIndex = useAppSelector(state => state.background);
  const splashState = useAppSelector(state => state.splash);
  const navbarLockState = useAppSelector(state => state.navbarLock);
  const themeMode = useTheme().palette.mode;

  const backgroundOptions = [
    {
      icon: <LandscapeIcon />,
      label: 'Mountains'
    },
    {
      icon: <WavesIcon />,
      label: 'Waves'
    },    
    {
      icon: <ModeStandbyIcon />,
      label: 'Ripples'
    },
    {
      icon: <SquareIcon sx={{ scale: '1.0' }}/>,
      label: 'Blocks LG'
    },
    {
      icon: <SquareIcon sx={{ scale: '0.66' }}/>,
      label: 'Blocks SM'
    },
    {
      icon: <MemoryIcon />,
      label: 'Circuitry'
    },
    {
      icon: <CancelIcon />,
      label: 'None'
    }
  ];

  const settingOptions = [
    {
      key: 'background',
      icon: backgroundOptions[backgroundIndex].icon,
      text: `Background: ${backgroundOptions[backgroundIndex].label}`,
      onClick: () => { dispatch(setBackground(backgroundIndex + 1)) }
    },
    {
      key: 'splash',
      icon: <AbcIcon />,
      text: `Splash Text ${(splashState) ? 'enabled': 'disabled'}`,
      onClick: () => { dispatch(setToggleSplash(!splashState)) }
    },
    {
      key: 'theme',
      icon: (themeMode === 'dark') ? <DarkModeIcon/> : <LightModeIcon/>,
      text: `${themeMode[0].toUpperCase() + themeMode.slice(1).toLowerCase()} mode`,
      onClick: () => { dispatch(setThemeMode((themeMode === 'dark') ? 'light' : 'dark')) }
    },
    {
      key: 'lock',
      icon: (navbarLockState) ? <LockIcon/> : <LockOpenIcon/>,
      text: `Navbar ${navbarLockState ? 'locked' : 'unlocked'}`,
      onClick: () => { dispatch(setNavbarLock(!navbarLockState)) }
    }
  ];

  return (
    <ButtonDropDown title='Settings' icon={<SettingsIcon />}>
      <Typography align='center' m={1} sx={{ width: '250px' }}>
        {'Settings'}
      </Typography>
      <hr />
      {settingOptions.map((settingOption) => (
        <MenuItem
          key={settingOption.key}
          onClick={(event) => {
            event.stopPropagation();
            settingOption.onClick();
          }}
        >
          <ListItemIcon>{settingOption.icon}</ListItemIcon>
          <Typography>{settingOption.text}</Typography>
        </MenuItem>
      ))}
    </ButtonDropDown>
  )
}

export default Settings;
