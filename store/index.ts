import { combineReducers, configureStore, createSelector, Store } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import counterReducer from './slices/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

const reducer = (state, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.counter.value) nextState.counter.value = state.counter.value;
    return nextState;
  }
  return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  });

export const wrapper = createWrapper(makeStore);
