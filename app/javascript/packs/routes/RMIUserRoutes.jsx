import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import PortfolioContainer from '../containers/PortfolioContainer';
import BuildingContainer from '../containers/BuildingContainer';
import BuildingEditorContainer from '../containers/BuildingEditorContainer';

class RMIUserRoutes extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <Switch>
          <Route path="/portfolios" component={PortfolioListContainer} />
          <Route path="/portfolios/:pId" component={PortfolioContainer} />
          <Route path="/buildings/:bId" component={BuildingEditorContainer} />
        </Switch>
      </div>
    )
  }
}

export default RMIUserRoutes;
