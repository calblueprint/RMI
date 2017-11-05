import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { wrapReducer } from '../reducers';
import { rootReducer } from '../reducers/AssetManagerReducer';
import PortfolioContainer from '../containers/PortfolioContainer';

const reducer = wrapReducer(rootReducer);

const store = initializeStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <hr />
          <PortfolioContainer />
        </div>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
