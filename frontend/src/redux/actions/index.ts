import { Action } from '../../types'

export const setBackground = (value: number): Action<number> => {
  return {
    type: 'CHANGE_BACKGROUND',
    value
  }
}

export const setToggleSplash = (value: boolean): Action<boolean> => {
  return {
    type: 'TOGGLE_SPLASH',
    value
  }
}

export const setImageZoom = (value: string): Action<string> => {
  return {
    type: 'SET_IMAGE_ZOOM',
    value
  };
}

export const setThemeMode = (value: 'light' | 'dark'): Action<'light' | 'dark'> => {
  return {
    type: 'SET_THEME',
    value
  };
}

export const setNavbarLock = (value: boolean): Action<boolean> => {
  return {
    type: 'TOGGLE_NAVBAR_LOCK',
    value
  }
}

export const setHideWebsite = (value: boolean): Action<boolean> => {
  return {
    type: 'TOGGLE_HIDE_WEBSITE',
    value
  }
}
