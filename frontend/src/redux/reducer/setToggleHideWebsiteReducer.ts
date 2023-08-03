import { Action } from '../../types';

const setToggleHideWebsite = (
  state: boolean = false,
  action: Action<boolean>
): boolean => {
  switch (action.type) {
    case 'TOGGLE_HIDE_WEBSITE':
      return action.value;
    default:
      return state;
  }
}

export default setToggleHideWebsite;
