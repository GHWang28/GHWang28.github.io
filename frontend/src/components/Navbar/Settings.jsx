import React from 'react';
import { ListItemIcon, MenuItem, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AbcIcon from '@mui/icons-material/Abc';
import WavesIcon from '@mui/icons-material/Waves';
import CancelIcon from '@mui/icons-material/Cancel';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MemoryIcon from '@mui/icons-material/Memory';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SquareIcon from '@mui/icons-material/Square';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { setBackground, setNavbarLock, setThemeMode, setToggleSplash } from '../../redux/actions';
import ButtonDropDown from '../ButtonDropDown';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Settings () {
  const dispatch = useDispatch();
  const backgroundIndex = useSelector(state => state.background);
  const splashState = useSelector(state => state.splash);
  const navbarLockState = useSelector(state => state.navbarLock);
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
      icon: <AcUnitIcon />,
      label: 'Snow'
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
