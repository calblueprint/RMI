import React from 'react';
import { connect } from 'react-redux';
import { getQuestionsByBuildingType } from '../../selectors/questionsSelector';
import { getBuildingType } from '../../selectors/buildingTypesSelector';
import QuestionContainer from './QuestionContainer';

class QuestionnaireFormContainer extends React.Component {
  render() {
    const questions_display = Object.keys(this.props.questions).map((id)=>{
      const question = this.props.questions[id];
      if (!question.parent_option_id) {
        return(
          <div key={id}>
            <QuestionContainer
              question={question}
            />
          </div>
        )
      }
    });

    return (<div>
      <h2>QUESTIONS FOR #{this.props.building_type.name}</h2>
      <div>
        {questions_display}
      </div>
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

