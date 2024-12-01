import { combineReducers, configureStore, createSelector, Store, AnyAction, Reducer } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import counterReducer from './slices/counterSlice';
import postsReducer, { PostsState } from './slices/postSlice';

// Define the state type for the counter slice
type CounterState = {
  value: number;
};

// Define the root state type
type RootState = {
  counter: CounterState;
  posts: PostsState;
};

// Combine reducers
const combinedReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

// Handle HYDRATE at the root level
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (state.counter) nextState.counter = state.counter;
    if (state.posts) nextState.posts = state.posts;

    return nextState;
  }
  return combinedReducer(state, action);
};

// Configure store
const makeStore: MakeStore<Store<RootState>> = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  });

// Create wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);
