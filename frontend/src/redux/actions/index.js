export const setBackground = (backgroundIndex) => {
  return {
    type: 'CHANGE_BACKGROUND',
    value: backgroundIndex
  }
}

export const setToggleSplash = (boolean) => {
  return {
    type: 'TOGGLE_SPLASH',
    value: boolean
  }
}

export const setImageZoom = (src) => {
  return {
    type: 'SET_IMAGE_ZOOM',
    value: src
  };
}

export const setThemeMode = (theme) => {
  return {
    type: 'SET_THEME',
    value: theme
  };
}

export const setNavbarLock = (lock) => {
  return {
    type: 'TOGGLE_NAVBAR_LOCK',
    value: lock
  }
}
