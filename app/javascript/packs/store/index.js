import React from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import { createLogger } from 'redux-logger';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import rootReducer from '../reducers';

const logger = createLogger();

const DevToolsContainer = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
  >
    <LogMonitor />
  </DockMonitor>
);

let composition = [];

if (process.env.NODE_ENV === 'production') {
  // Any production-specific reducers
} else {
  composition.push(applyMiddleware(logger));
  // composition.push(DevToolsContainer.instrument());
  composition.push(
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

function initializeStore(initialState) {
  return createStore(rootReducer, initialState, compose(...composition));
}

export { DevToolsContainer, initializeStore }; 
