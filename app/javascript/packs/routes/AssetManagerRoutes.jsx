import React from 'react';
import PortfolioContainer from '../containers/PortfolioContainer';
import QuestionnaireRoutes from '../containers/QuestionnaireRoutes';

import { Route, Switch, Redirect } from 'react-router-dom';

class AssetManagerRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/portfolios/:pId" component={PortfolioContainer} />

          {/* If no questionnaire mode is specified, the default should be /edit */}
          <Route exact path="/buildings/:bId" render={({match}) => (<Redirect to={`${match.url}/edit`} />)} />
          <Route path="/buildings/:bId" component={QuestionnaireRoutes} />
        </Switch>
      </div>
    )
  }
}

export default AssetManagerRoutes;
