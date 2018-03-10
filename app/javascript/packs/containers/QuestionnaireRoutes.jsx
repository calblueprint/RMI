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
      building: this.props.building
    };

    return (
      <div>
        <button onClick={() => this.props.history.goBack()}>Back</button>
        <h1>{this.props.building.name}</h1>

        <QuestionnaireControls currentPath={currentPath} />

        <hr />

        <Switch>
          <Route path={`${currentPath}/edit`}
                 render={renderWithProps(AnswerModeContainer, propsToPass)} />
          <Route path={`${currentPath}/delegate`}
                 render={renderWithProps(DelegateModeContainer, propsToPass)} />
          <Route path={`${currentPath}/review`}
                 render={renderWithProps(ReviewModeContainer, propsToPass)} />
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
  return () => (
    <ComponentName {...props} />
  );
}

function mapStateToProps(state, ownProps) {
  return {
    building: state.buildings[ownProps.match.params.bId]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireRoutes);
