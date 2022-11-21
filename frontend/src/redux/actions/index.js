export const setBackground = (backgroundIndex) => {
  return {
    type: 'CHANGE_BACKGROUND',
    value: backgroundIndex
  }
}

export const setNavButtonPress = (buttonIndex) => {
  return {
    type: 'NAV_BUTTON_SET',
    button: buttonIndex
  };
}
