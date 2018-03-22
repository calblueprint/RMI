import React from 'react';
import { connect } from 'react-redux';
import { getQuestionsByBuildingType } from '../../selectors/questionsSelector';
import { getBuildingType } from '../../selectors/buildingTypesSelector';
import QuestionContainer from './QuestionContainer';
import { beforeCreateNewQuestion } from '../../actions/questions';
import { generateTempId } from '../../utils/TemporaryObjectUtil';
import PropTypes from 'prop-types';

class QuestionnaireFormContainer extends React.Component {

  /**
   * Handles creating a new temp question when Add Question button is clicked.
   */
  onNewQuestion() {
    const newQuestion = {
      id: generateTempId(),
      text: "",
      building_type_id: this.props.buildingType.id,
      category_id: 1,
      options: {},
      question_type: null,
      parameter: "default"
    };
    this.props.beforeCreateNewQuestion(newQuestion)
  }

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
      <h2>QUESTIONS FOR #{this.props.buildingType.name}</h2>
      <div>
        {questions_display}
        <button
          onClick={e => this.onNewQuestion()}
        >
          Add Question
        </button>
      </div>
    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuildingType(ownProps.match.params.id, state),
    buildingType: getBuildingType(ownProps.match.params.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeCreateNewQuestion: (question) => {dispatch(beforeCreateNewQuestion(question))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireFormContainer);

QuestionnaireFormContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  buildingType: PropTypes.object.isRequired
};
