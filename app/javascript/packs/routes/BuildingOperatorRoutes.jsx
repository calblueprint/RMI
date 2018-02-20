import React from 'react';
import BuildingContainer from '../containers/BuildingContainer';
import BuildingListContainer from "../containers/BuildingListContainer";

import { Route, Switch, Redirect } from 'react-router-dom';

class BuildingOperatorRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/buildings" component={BuildingListContainer} />

          {/* If no questionnaire mode is specified, the default should be /edit */}
          <Route exact path="/buildings/:bId" render={({match}) => (<Redirect to={`${match.url}/edit`} />)} />
          <Route path="/buildings/:bId" component={BuildingContainer} />
        </Switch>
      </div>
    )
  }
}

export default BuildingOperatorRoutes;
