import { Action } from '../../types';

const setThemeModeReducer = (
  state: 'light' | 'dark' = (localStorage.getItem('theme') === '1') ? 'light' : 'dark',
  action: Action<'light' | 'dark'>
): 'light' | 'dark' => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', (action.value === 'light') ? '1' : '0')
      return action.value;
    default:
      return state || 'dark';
  }
}

export default setThemeModeReducer;
