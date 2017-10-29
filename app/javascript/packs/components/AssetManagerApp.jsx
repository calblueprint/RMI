import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AssetManagerApp extends React.Component {
  render() {

  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BuildingActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
