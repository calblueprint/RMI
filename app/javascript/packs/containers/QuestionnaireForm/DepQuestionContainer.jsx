import React from 'react';
import { connect } from 'react-redux';
import QuestionContainer  from './QuestionContainer';
import { getDependentQuestionsForOptionIds } from '../../selectors/questionsSelector';
import PropTypes from 'prop-types'
import {generateTempId} from '../../utils/TempIdUtil';
import {beforeCreateNewQuestion} from '../../actions/questions';

class DepQuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newDepQuestion: false}
  }

  /**
   * Handles creating a new temp question with selected parent_option_id.
   * Triggered by onChange in onNewDepQuestion select.
   * @param {string} optionId - parent_option_id for pending new dep. question
   */
  selectParentOption(optionId) {
    const newDepQuestion = {
      id: generateTempId(),
      text: "",
      building_type_id: this.props.question.building_type_id,
      category_id: 1,
      options: {},
      question_type: null,
      parameter: "default",
      parent_option_type: this.props.question.question_type,
      parent_option_id: optionId
    };
    this.props.beforeCreateNewQuestion(newDepQuestion);
    this.optionSelect.remove();
  }

  /**
   * Returns a select box that is called in render when choosing parent_option for new
   * dependent question creation.
   * @returns {html} a select box with options corresponding to parent option choices
   */
  onNewDepQuestion() {
    if (!this.state.newDepQuestion) {
      return null;
    }
    const parentOptionType = this.props.question.question_type;
    const parentOptions = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      if (parentOptionType === 'dropdown') {
        return(
          <option
            value={optionId}
            key={optionId}
          >
            {option.text}
          </option>
        );
      } else if (parentOptionType === 'range') {
        return(
          <option
            value={optionId}
            key={optionId}
          >
            min: {option.min} max: {option.max}
          </option>
        )
      } else {return null}

    });
    return(
      <div>
        <select
          value={'default'}
          onChange={e => this.selectParentOption(e.target.value)}
          ref={(select) => { this.optionSelect = select; }}
        >
          { parentOptions }
          <option disabled value={'default'}>Select a Parent Option</option>
        </select>
      </div>
    );
  }


  render() {
    if (Object.keys(this.props.options_to_questions).length === 0) {
      return(
        <div></div>
      )
    }
    const all_dependent_questions = Object.keys(this.props.options_to_questions).map((optionId) => {
      const displayOption = () => {
        const option = this.props.question.options[optionId];
        switch (this.props.question.question_type) {
          case "range": {
            return(
              <p>
                min: {option.min} max:{option.max}
              </p>
            )
          }
          case "dropdown": {
            return(
              <p>
                {option.text}
              </p>
            )
          }
          default:
        }
      }

      const dependent_questions_list = this.props.options_to_questions[optionId];

      const dependent_questions_display = dependent_questions_list.map((dependent_question) => {
        return (
          <div key={dependent_question.id}>
            <QuestionContainer
              question={dependent_question}
            />
          </div>
        )}
      );

      return(
        <div key={optionId}>
          {displayOption.apply(this)}
          <div>
            {dependent_questions_display}
          </div>
        </div>

      )}
    );

    return (
      <div style={{marginLeft: 50, border:"1px solid black"}}>
        <p>Dependent Questions</p>
        {all_dependent_questions}
        { this.onNewDepQuestion() }
        <button
          onClick={e => this.setState({newDepQuestion: true})}
        >
          Add Dependent Question
        </button>
      </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    options_to_questions: getDependentQuestionsForOptionIds(ownProps.optionsList, ownProps.question.question_type, state)
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
)(DepQuestionContainer);

DepQuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
  optionsList: PropTypes.array.isRequired
};
