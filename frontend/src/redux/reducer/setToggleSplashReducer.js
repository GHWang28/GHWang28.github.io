const setToggleSplashReducer = (
  state = Boolean(localStorage.getItem('splash') || true),
  action
) => {
  switch (action.type) {
    case 'TOGGLE_SPLASH':
      localStorage.setItem('splash', action.value)
      return action.value;
    default:
      return state;
  }
}

export default setToggleSplashReducer;
