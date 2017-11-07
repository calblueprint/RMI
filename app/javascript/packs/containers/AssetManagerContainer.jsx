import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { wrapReducer } from '../reducers';
import { rootReducer } from '../reducers/AssetManagerReducer';
import PortfolioContainer from './PortfolioContainer';
import BuildingContainer from './BuildingContainer';

const reducer = wrapReducer(rootReducer);

const store = initializeStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <hr />
          <Switch>
            <Route path="/portfolios/:id" component={PortfolioContainer} />
            <Route path="/buildings/:bId" component={BuildingContainer} />
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
