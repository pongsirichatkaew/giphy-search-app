import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { CounterProvider } from '../contexts/CounterContext';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <CounterProvider>
        <Component {...props.pageProps} />
      </CounterProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
