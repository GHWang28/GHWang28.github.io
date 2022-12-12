import { combineReducers } from '@reduxjs/toolkit';
import setBackgroundReducer from './setBackgroundReducer';
import setImageZoomReducer from './setImageZoomReducer';
import setToggleSplashReducer from './setToggleSplashReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  background: setBackgroundReducer,
  splash: setToggleSplashReducer,
  imgZoom: setImageZoomReducer
})

export default combinedReducer;
