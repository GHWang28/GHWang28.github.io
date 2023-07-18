import { Action } from '../../types';

const setToggleSplashReducer = (
  state: boolean = (localStorage.getItem('splash')) ? localStorage.getItem('splash') === 'true' : true,
  action: Action<boolean>
): boolean => {
  switch (action.type) {
    case 'TOGGLE_SPLASH':
      localStorage.setItem('splash', String(action.value))
      return action.value;
    default:
      return state;
  }
}

export default setToggleSplashReducer;
