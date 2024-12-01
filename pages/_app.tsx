import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(App);
