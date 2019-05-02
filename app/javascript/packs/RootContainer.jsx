import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { initializeStore } from "../store";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import withInitialState from "../reducers/initialState";
import { loadInitialState } from "../actions/initialState";

import "../stylesheets";

const { userType } = window.INITIAL_STATE;

const rootReducer = require(`../reducers/roots/${userType}Reducer`).default;
const Routes = require(`../routes/${userType}Routes`).default;

const reducer = withInitialState(rootReducer);
const { store, persistor } = initializeStore(reducer);

if (window.INITIAL_STATE) {
  store.dispatch(loadInitialState(window.INITIAL_STATE));
}

if (module.hot) {
  module.hot.accept();
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            {/* Remove trailing slash so we don't have to deal with it when appending nested routes */}
            <Route
              exact
              strict
              path="*/"
              render={({ match }) => <Redirect to={match.url.slice(0, -1)} />}
            />
            <Routes />
          </Switch>
        </Router>
      </Provider>
    </div>,
    document.body.appendChild(document.createElement("div"))
  );
});
