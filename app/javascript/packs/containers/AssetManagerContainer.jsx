import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import { wrapReducer } from '../reducers';
import { rootReducer } from '../reducers/AssetManagerReducer';
import AssetManagerApp from '../components/AssetManagerApp';

const reducer = wrapReducer(rootReducer);

const store = initializeStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AssetManagerApp />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
