import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import {
  BrowserRouter as Router
} from 'react-router-dom'

import { wrapReducer } from '../reducers';
import { rootReducer } from '../reducers/AssetManagerReducer';
import App from './App';

const reducer = wrapReducer(rootReducer);

const store = initializeStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
