import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import PortfolioContainer from '../containers/PortfolioContainer';
import BuildingContainer from '../containers/BuildingContainer';

class AssetManagerRoutes extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <Switch>
          <Route path="/portfolios/:pId" component={PortfolioContainer} />
          <Route path="/buildings/:bId" component={BuildingContainer} />
        </Switch>
      </div>
    )
  }
}

export default AssetManagerRoutes;
