import { combineReducers } from '@reduxjs/toolkit';
import setBackgroundReducer from './setBackgroundReducer';
import setImageZoomReducer from './setImageZoomReducer';
import setThemeModeReducer from './setThemeModeReducer';
import setToggleSplashReducer from './setToggleSplashReducer';
import setNavbarLockReducer from './setNavbarLockReducer';
import setToggleHideWebsite from './setToggleHideWebsiteReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  background: setBackgroundReducer,
  splash: setToggleSplashReducer,
  imgZoom: setImageZoomReducer,
  themeMode: setThemeModeReducer,
  navbarLock: setNavbarLockReducer,
  hideWebsite: setToggleHideWebsite
})

export default combinedReducer;
