import { combineReducers } from '@reduxjs/toolkit';
import setBackgroundReducer from './setBackground';
import setNavButtonReducer from './setNavButton';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  navButton: setNavButtonReducer,
  background: setBackgroundReducer,
})

export default combinedReducer;
