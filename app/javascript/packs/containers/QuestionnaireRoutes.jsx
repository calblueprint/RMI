import React from 'react';
import AnswerModeContainer from './AnswerModeContainer';
import DelegateModeContainer from './DelegateModeContainer';
import ReviewModeContainer from "./ReviewModeContainer";
import QuestionnaireControls from "../components/QuestionnaireControls";

import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

class QuestionnaireRoutes extends React.Component {
  render() {
    const currentPath = this.props.match.url;
    const propsToPass = {
      building: this.props.building,



    };

    return (
      <div>
        <h1>{this.props.building.name}</h1>

        <QuestionnaireControls currentPath={currentPath} />

        <Switch>
          <Route path={`${currentPath}/edit/:cId?`}
                 component={renderWithProps(AnswerModeContainer, propsToPass)} />
          <Route path={`${currentPath}/delegate`}
                 component={renderWithProps(DelegateModeContainer, propsToPass)} />
          <Route path={`${currentPath}/review`}
                 component={renderWithProps(ReviewModeContainer, propsToPass)} />
        </Switch>
      </div>
    );
  }
}

/**
 * Helper method - returns a render function that renders the component with the given props passed down to it.
 * Used by Routes.
 */
function renderWithProps(ComponentName, props) {
  return (navProps) => (
    <ComponentName {...navProps} {...props} />
  );
}

function mapStateToProps(state, ownProps) {
  return {
    building: state.buildings[ownProps.match.params.bId],
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireRoutes);
