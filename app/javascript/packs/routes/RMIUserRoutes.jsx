import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import PortfolioListContainer from '../containers/PortfolioListContainer';
import PortfolioContainer from '../containers/PortfolioContainer';
import QuestionnaireRoutes from '../containers/QuestionnaireRoutes';
import BuildingEditorContainer from '../containers/BuildingEditorContainer';
import QuestionnaireFormContainer from '../containers/QuestionnaireForm/QuestionnaireFormContainer';

class RMIUserRoutes extends React.Component {
  render() {
    return (
      <div>
        <hr/>
        <Switch>
          <Route path="/portfolios/:pId" component={PortfolioContainer} />
          <Route path="/portfolios" component={PortfolioListContainer} />
          <Route path="/buildings/:bId" component={BuildingEditorContainer} />
          <Route path="/building_types/:id/" component={QuestionnaireFormContainer} />
        </Switch>
      </div>
    )
  }
}

export default RMIUserRoutes;
