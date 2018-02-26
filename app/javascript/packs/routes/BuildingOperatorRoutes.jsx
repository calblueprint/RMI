import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import BuildingContainer from '../containers/BuildingContainer';
import BuildingListContainer from "../containers/BuildingListContainer";

class BuildingOperatorRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/buildings" component={BuildingListContainer} />
          <Route path="/buildings/:bId" component={BuildingContainer} />
        </Switch>
      </div>
    )
  }
}

export default BuildingOperatorRoutes;