import React from 'react';
import { connect } from 'react-redux';
import { getDependentQuestionsForOptionIds } from '../../selectors/questionsSelector';
import PropTypes from 'prop-types'
import {generateTempId} from '../../utils/TemporaryObjectUtil';
import {beforeCreateNewQuestion} from '../../actions/questions';
import DepQuestionDisplay from '../../components/QuestionnaireForm/DepQuestionDisplay';


class DepQuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newDepQuestion: false}
  }

  /**
   * Handles creating a new temp question with selected parent_option_id.
   * Triggered by onChange in renderNewDepQuestion() select.
   * @param {string} optionId - parent_option_id for pending new dep. question
   */
  selectParentOption(optionId) {
    const newDepQuestion = {
      id: generateTempId(),
      text: "",
      building_type_id: this.props.question.building_type_id,
      category_id: this.props.question.category_id,
      options: {},
      question_type: null,
      parameter: "default",
      parent_option_type: this.props.question.question_type,
      parent_option_id: optionId
    };
    this.props.beforeCreateNewQuestion(newDepQuestion);
    this.setState({newDepQuestion: false})
  }

  /**
   * Returns a select box that is called in render when choosing parent_option for new
   * dependent question creation.
   * @returns {html} a select box with options corresponding to parent option choices
   */
  renderNewDepQuestion() {
    if (!this.state.newDepQuestion) {
      return null;
    }
    const parentOptionType = this.props.question.question_type;
    const parentOptions = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      if (parentOptionType === 'DropdownOption') {
        return(
          <option
            value={optionId}
            key={optionId}
          >
            {option.text}
          </option>
        );
      } else if (parentOptionType === 'RangeOption') {
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
    if (Object.keys(this.props.question.options).length === 0) {
      return(
        <div></div>
      )
    }
    const DependentQuestionsDisplay = Object.keys(this.props.depQuestionsForOptions).map((optionId) => {
      return(
        <div key={optionId}>
          <DepQuestionDisplay
            option={this.props.question.options[optionId]}
            question={this.props.question}
            depQuestionsForOptions={this.props.depQuestionsForOptions}
          />
        </div>
      )
    });

    return (
      <div style={{marginLeft: 50, border:"1px solid black"}}>
        <p>Dependent Questions</p>
        {DependentQuestionsDisplay}
        { this.renderNewDepQuestion() }
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
    depQuestionsForOptions: getDependentQuestionsForOptionIds(ownProps.optionsList, ownProps.question.question_type, state)
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
  optionsList: PropTypes.array.isRequired,
  depQuestionsForOptions: PropTypes.object.isRequired
};
