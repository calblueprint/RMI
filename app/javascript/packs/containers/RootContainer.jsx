import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import { PersistGate } from 'redux-persist/es/integration/react'
import {
  BrowserRouter as Router
} from 'react-router-dom';

import withInitialState from '../reducers/initialState';
import { loadInitialState } from '../actions/initialState';

const { userType } = window.INITIAL_STATE;
const rootReducer = require(`../reducers/roots/${userType}Reducer`).default;
const Routes = require(`../routes/${userType}Routes`).default;

const reducer = withInitialState(rootReducer);
const { store, persistor } = initializeStore(reducer);

if (window.INITIAL_STATE) {
  store.dispatch(loadInitialState(window.INITIAL_STATE));
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Routes />
      </Router>
    </PersistGate>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
