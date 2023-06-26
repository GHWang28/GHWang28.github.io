const setNavbarLockReducer = (
  state = (localStorage.getItem('navbarLock')) ? localStorage.getItem('navbarLock') === 'true' : false,
  action
) => {
  switch (action.type) {
    case 'TOGGLE_NAVBAR_LOCK':
      localStorage.setItem('navbarLock', action.value)
      return action.value;
    default:
      return state;
  }
}

export default setNavbarLockReducer;
