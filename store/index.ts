import { combineReducers, configureStore, createSelector, Store, AnyAction, Reducer } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import counterReducer from './slices/counterSlice';

// Define the state type for the counter slice
type CounterState = {
  value: number;
};

// Define the root state type
type RootState = {
  counter: CounterState;
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Reducer handling the HYDRATE action
const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  //   if (action.type === HYDRATE) {
  //     const nextState: RootState = {
  //       ...state, // use previous state
  //       ...action.payload, // apply delta from hydration
  //     };
  //     if (state?.counter?.value) nextState.counter.value = state.counter.value;
  //     return nextState;
  //   }
  return rootReducer(state, action);
};

// Configure store
const makeStore: MakeStore<Store<RootState>> = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  });

// Create wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);
