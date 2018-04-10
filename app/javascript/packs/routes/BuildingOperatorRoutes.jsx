import React from 'react';

import QuestionnaireRoutes from '../containers/QuestionnaireRoutes';
import BuildingListContainer from "../containers/BuildingListContainer";
import NavigationBarContainer from '../containers/NavigationBar/NavigationBarContainer';
import CategoryRerouter from "../containers/CategoryRerouter";

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
          <Route exact path="/buildings/:bId" component={CategoryRerouter} />
          <Route path="/buildings/:bId" component={QuestionnaireRoutes} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(BuildingOperatorRoutes);
