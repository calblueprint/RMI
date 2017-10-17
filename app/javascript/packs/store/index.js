import { createStore, compose, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import createLogger from 'redux-logger';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

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
  composition.push(DevToolsContainer.instrument());
}

export default function initializeStore(initialState) {
  return createStore(
    initialState,
    compose(composition)
  );
}
