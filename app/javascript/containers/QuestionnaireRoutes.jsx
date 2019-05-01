import React from "react";
import AnswerModeContainer from "./AnswerModeContainer";
import DelegateModeContainer from "./DelegateModeContainer";
import ReviewModeContainer from "./ReviewModeContainer";

import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";

class QuestionnaireRoutes extends React.Component {
  render() {
    const currentPath = this.props.match.url;
    const propsToPass = {
      building: this.props.building,
      editableMap: this.props.building.editable
    };

    return (
      <div>
        <Switch>
          <Route
            path={`${currentPath}/edit/:cId?`}
            render={renderWithProps(AnswerModeContainer, propsToPass)}
          />
          <Route
            path={`${currentPath}/delegate`}
            render={renderWithProps(DelegateModeContainer, propsToPass)}
          />
          <Route
            path={`${currentPath}/review`}
            render={renderWithProps(ReviewModeContainer, propsToPass)}
          />
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
  return navProps => <ComponentName {...navProps} {...props} />;
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
