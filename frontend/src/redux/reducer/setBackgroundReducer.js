import config from '../../config.json'
import { mod } from '../../helpers';

const setBackgroundReducer = (
  state = Number(localStorage.getItem('background') || 0),
  action
) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      const value = mod(action.value, config.TOTAL_BGS);
      localStorage.setItem('background', value)
      return value;
    default:
      return state;
  }
}

export default setBackgroundReducer;
