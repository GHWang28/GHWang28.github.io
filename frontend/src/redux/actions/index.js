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

export const setNavButtonPress = (buttonIndex) => {
  return {
    type: 'NAV_BUTTON_SET',
    value: buttonIndex
  };
}
