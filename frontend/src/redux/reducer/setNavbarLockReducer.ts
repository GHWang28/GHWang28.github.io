import { Action } from '../../types';

const setNavbarLockReducer = (
  state: boolean = (localStorage.getItem('navbarLock')) ? localStorage.getItem('navbarLock') === 'true' : false,
  action: Action<boolean>
): boolean => {
  switch (action.type) {
    case 'TOGGLE_NAVBAR_LOCK':
      localStorage.setItem('navbarLock', String(action.value))
      return action.value;
    default:
      return state;
  }
}

export default setNavbarLockReducer;
