import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import PortfolioContainer from './PortfolioContainer';
import BuildingContainer from './BuildingContainer';

class App extends React.Component {
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

export default App;