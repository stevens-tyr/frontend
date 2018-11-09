import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './style/index.scss';
import createStore from './store/createStore';

export const store = createStore(); // eslint-disable-line import/prefer-default-export

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
