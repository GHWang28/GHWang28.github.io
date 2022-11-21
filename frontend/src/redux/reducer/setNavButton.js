const setNavButtonReducer = (state = -1, action) => {
  switch (action.type) {
    case 'NAV_BUTTON_SET':
      return action.button;
    default:
      return state;
  }
}

export default setNavButtonReducer;
