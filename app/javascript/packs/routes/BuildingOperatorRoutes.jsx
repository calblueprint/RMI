import React from 'react';

import QuestionnaireRoutes from '../containers/QuestionnaireRoutes';
import NavigationBarContainer from "../containers/NavigationBarContainer"
import BuildingListContainer from "../containers/BuildingListContainer";

import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class BuildingOperatorRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route path="/:entity?/:id?/:mode?/:cId?" component={NavigationBarContainer}/>
        <Switch>
          <Route exact path="/buildings" component={BuildingListContainer} />

          {/* If no questionnaire mode is specified, the default should be /edit */}
          <Route exact path="/buildings/:bId" render={({match}) => (<Redirect to={`${match.url}/edit`} />)} />
          <Route path="/buildings/:bId" component={QuestionnaireRoutes} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(BuildingOperatorRoutes);
