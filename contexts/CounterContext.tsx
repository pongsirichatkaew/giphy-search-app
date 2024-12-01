import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
type CounterContextType = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

// Create the context
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Provider component
export function CounterProvider({ children }: { children: ReactNode }) {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);

  return <CounterContext.Provider value={{ counter, increment, decrement }}>{children}</CounterContext.Provider>;
}

// Custom hook for accessing the context
export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
