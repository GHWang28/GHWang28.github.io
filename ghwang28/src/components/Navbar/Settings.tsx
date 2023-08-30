import React from 'react';
import { ListItemIcon, MenuItem, Typography, useTheme } from '@mui/material';
import { setBackground, setHideWebsite, setNavbarLock, setThemeMode, setToggleSplash } from '../../redux/actions';
import ButtonDropDown from '../ButtonDropDown';
import { useAppDispatch, useAppSelector } from '../../hooks';

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
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Settings () {
  const dispatch = useAppDispatch();
  const backgroundIndex = useAppSelector(state => state.background);
  const splashState = useAppSelector(state => state.splash);
  const navbarLockState = useAppSelector(state => state.navbarLock);
  const websiteHiddenState = useAppSelector(state => state.hideWebsite);
  const themeMode = useTheme().palette.mode;

  const backgroundOptions = [
    {
      icon: <LandscapeIcon />,
      label: 'Mountains'
    },
    {
      icon: <WaterDropIcon />,
      label: 'Rain'
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
      label: 'Squares'
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
      key: 'lock',
      icon: (navbarLockState) ? <LockIcon/> : <LockOpenIcon/>,
      text: `Navbar ${navbarLockState ? 'locked' : 'unlocked'}`,
      onClick: () => { dispatch(setNavbarLock(!navbarLockState)) }
    },
    {
      key: 'hide-website',
      icon: (websiteHiddenState) ? <VisibilityOffIcon/> : <VisibilityIcon/>,
      text: `Elements ${websiteHiddenState ? 'hidden' : 'showing'}`,
      onClick: () => { dispatch(setHideWebsite(!websiteHiddenState)) }
    },
    {
      key: 'theme',
      icon: (themeMode === 'dark') ? <DarkModeIcon/> : <LightModeIcon/>,
      text: `${themeMode[0].toUpperCase() + themeMode.slice(1).toLowerCase()} mode`,
      onClick: () => { dispatch(setThemeMode((themeMode === 'dark') ? 'light' : 'dark')) }
    },
  ];

  return (
    <ButtonDropDown title='Settings' icon={<SettingsIcon />}>
      <Typography align='center' m={1} sx={{ width: '250px' }}>
        {'Website Settings'}
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
