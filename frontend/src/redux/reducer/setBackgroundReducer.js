import config from '../../config.json'
import { mod } from '../../helpers';

const setBackgroundReducer = (
  state = Number(localStorage.getItem('background') || 0),
  action
) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      localStorage.setItem('background', mod(action.value, config.TOTAL_BGS))
      return value;
    default:
      return state;
  }
}

export default setBackgroundReducer;
