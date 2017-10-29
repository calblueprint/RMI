import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

import rootReducer from '../reducers/AssetManagerReducer';
import AssetManagerApp from '../components/AssetManagerApp';

const store = initializeStore(rootReducer, window.INITIAL_STATE);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AssetManagerApp />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
