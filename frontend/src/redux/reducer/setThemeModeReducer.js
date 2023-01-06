const setThemeModeReducer = (
  state = (localStorage.getItem('theme')) ? localStorage.getItem('theme') : 'dark',
  action
) => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.value)
      return action.value;
    default:
      return state;
  }
}

export default setThemeModeReducer;
