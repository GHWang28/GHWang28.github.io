import { combineReducers } from '@reduxjs/toolkit';
import setBackgroundReducer from './setBackgroundReducer';
import setNavButtonReducer from './setNavButtonReducer';
import setToggleSplashReducer from './setToggleSplashReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  navButton: setNavButtonReducer,
  background: setBackgroundReducer,
  splash: setToggleSplashReducer,
})

export default combinedReducer;
