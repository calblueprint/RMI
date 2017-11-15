// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import { DevToolsContainer } from './store';
import rootReducer from './reducers';
import TestComponent from './TestComponent';

const Hello = props => (
  <div>Hello {props.name}!</div>
)

const store = initializeStore();

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
} 

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <TestComponent />
        <DevToolsContainer />
      </div>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
