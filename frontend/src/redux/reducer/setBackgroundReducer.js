import config from '../../config.json'

const setBackgroundReducer = (
  state = Number(localStorage.getItem('background') || 1),
  action
) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      localStorage.setItem('background', action.value % config.TOTAL_BGS)
      return action.value % config.TOTAL_BGS;
    default:
      return state;
  }
}

export default setBackgroundReducer;
