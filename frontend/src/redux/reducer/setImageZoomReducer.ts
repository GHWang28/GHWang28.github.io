import { Action } from '../../types';

const setImageZoomReducer = (state: string | null = null, action : Action<string>): string | null => {
  switch (action.type) {
    case 'SET_IMAGE_ZOOM':
      return action.value;
    default:
      return state;
  }
}

export default setImageZoomReducer;
