import React from 'react';

import PortfolioContainer from '../containers/PortfolioContainer';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import QuestionnaireRoutes from '../containers/QuestionnaireRoutes';
import NavigationBarContainer from '../containers/NavigationBarContainer';

import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class AssetManagerRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route path="/:entity?/:id?/:mode?/:cId" component={NavigationBarContainer}/>
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

export default hot(module)(AssetManagerRoutes);
