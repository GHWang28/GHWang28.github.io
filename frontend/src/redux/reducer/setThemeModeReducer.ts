import { Action } from '../../types';

const setThemeModeReducer = (
  state: string | null = (localStorage.getItem('theme')) ? localStorage.getItem('theme') : 'dark',
  action: Action<string>
): string => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.value)
      return action.value;
    default:
      return state || 'dark';
  }
}

export default setThemeModeReducer;
