import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

import PortfolioListContainer from "../containers/PortfolioListContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import QuestionnaireRoutes from "../containers/QuestionnaireRoutes";
import QuestionnaireFormContainer from "../containers/QuestionnaireForm/QuestionnaireFormContainer";
import NavigationBarContainer from "../containers/NavigationBar/NavigationBarContainer";
import CategoryRerouter from "../containers/CategoryRerouter";

class RMIUserRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route
          path="/:entity?/:id?/:mode?/:cId?"
          component={NavigationBarContainer}
        />
        <Switch>
          <Route path="/portfolios/:pId" component={PortfolioContainer} />
          <Route path="/portfolios" component={PortfolioListContainer} />
          <Route
            path="/building_types/:id/"
            component={QuestionnaireFormContainer}
          />
          <Route exact path="/buildings/:bId" component={CategoryRerouter} />
          <Route path="/buildings/:bId" component={QuestionnaireRoutes} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(RMIUserRoutes);
