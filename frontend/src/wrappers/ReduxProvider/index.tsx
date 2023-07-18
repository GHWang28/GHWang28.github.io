import React from 'react';
import { Provider } from 'react-redux';
import combinedReducer from '../../redux/reducer/combinedReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: combinedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type ComponentProps = {
  children: React.ReactNode
}

const ReduxProvider = ({ children } : ComponentProps) => (
  <Provider store={store}>
    {children}
  </Provider>
)

export default ReduxProvider;
