import { createSlice } from '@reduxjs/toolkit';

// Define the state type for the counter slice
type CounterState = {
  value: number;
};

// Initial state
const initialState: CounterState = {
  value: 0,
};

// Create the counter slice with HYDRATE handling
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
//   extraReducers: (builder) => {
//     builder.addCase(HYDRATE, (state, action: any) => {
//       const nextState = {
//         ...state,
//         ...action.payload.counter,
//       };
//       if (state.value) nextState.value = state.value;
//       return nextState;
//     });
//   },
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Typed selector
export const selectCounterData = (state: { counter: CounterState }) => state.counter.value;

// Export reducer
export default counterSlice.reducer;
