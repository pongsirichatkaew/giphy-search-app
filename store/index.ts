import {
  Action, combineReducers,
  configureStore, Store, ThunkAction
} from '@reduxjs/toolkit';
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
    console.log('state', state);
    console.log('action', action.payload);

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

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore: MakeStore<Store<RootState>> = () => store;

// Create wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
