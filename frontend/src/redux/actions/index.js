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

export const setImageZoom = (src, show = true) => {
  return {
    type: 'SET_IMAGE_ZOOM',
    value: {
      src,
      show
    }
  };
}
