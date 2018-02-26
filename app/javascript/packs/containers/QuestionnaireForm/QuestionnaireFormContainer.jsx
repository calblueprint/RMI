import React from 'react';
import { connect } from 'react-redux';
import { getQuestionsByBuildingType } from '../../selectors/questionsSelector';
import { getBuildingType } from '../../selectors/buildingTypesSelector';

class QuestionnaireFormContainer extends React.Component {
  render() {
    return (<div>
      <h2>QUESTIONS FOR #{this.props.building_type.name}</h2>

    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuildingType(ownProps.match.params.id, state),
    building_type: getBuildingType(ownProps.match.params.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireFormContainer);

