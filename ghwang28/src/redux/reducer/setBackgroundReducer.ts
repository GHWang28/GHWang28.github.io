import config from '../../config.json'
import { mod } from '../../helpers';
import { Action } from '../../types';

const setBackgroundReducer = (
  state: number = Number(localStorage.getItem('background') || 0),
  action: Action<number>
): number => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      const value = mod(Number(action.value), config.TOTAL_BGS);
      localStorage.setItem('background', String(value))
      return value;
    default:
      return state;
  }
}

export default setBackgroundReducer;
