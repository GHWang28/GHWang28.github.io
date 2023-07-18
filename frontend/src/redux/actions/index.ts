import { Action } from '../../types'

export const setBackground = (backgroundIndex: number): Action<number> => {
  return {
    type: 'CHANGE_BACKGROUND',
    value: backgroundIndex
  }
}

export const setToggleSplash = (boolean: boolean): Action<boolean> => {
  return {
    type: 'TOGGLE_SPLASH',
    value: boolean
  }
}

export const setImageZoom = (src: string): Action<string> => {
  return {
    type: 'SET_IMAGE_ZOOM',
    value: src
  };
}

export const setThemeMode = (theme: string): Action<string> => {
  return {
    type: 'SET_THEME',
    value: theme
  };
}

export const setNavbarLock = (lock: boolean): Action<boolean> => {
  return {
    type: 'TOGGLE_NAVBAR_LOCK',
    value: lock
  }
}
