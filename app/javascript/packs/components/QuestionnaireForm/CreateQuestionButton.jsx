import React from 'react'
import {post} from '../../fetch/requester';
import PropTypes from 'prop-types';
import {generateTempId} from '../../utils/TemporaryObjectUtil';


class CreateQuestionButton extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      selectQType: false,
    }
  }

  /**
   * Handles fetch request to post a question and redux update
   * @param { string } question - new question to create
   */
  async createQuestion(question) {
    this.props.questionFetchInProgress(question);
    try {
      let response = await post('/api/questions', {'question': question});
      this.props.questionFetchSuccess(response.data);
      this.props.questionSetNew(response.data);
    } catch (error) {
      this.props.questionFetchFailure(error, question);
    }
  }

  /**
   * Handles onChange even for selecting new question type by creating
   * temporary question in store.
   * @param {string} qType - question_type
   */
  selectQtype(qType) {
    const newQ = {...this.props.tempQuestion, question_type: qType};
    this.createQuestion(newQ);
    this.setState({selectQType: false});
  }


  newQuestionTypeSelector() {
    const qTypesDisplay = {
      'RangeOption': 'numeric',
      'DropdownOption': 'dropdown',
      'FreeOption': 'free response'};
    const options = Object.keys(qTypesDisplay).map((qType, index) => {
      return (
        <option
          value={qType}
          key={index}
        >
          {qTypesDisplay[qType]}
        </option>
      )
    });
    return (
      <select
        onChange={ e => this.selectQtype(e.target.value) }
        value={1}
      >
        { options }
        <option disabled value={1}>Select an Option</option>
      </select>
    )
  }

  addQuestionButton() {
    return (
      <button
        className={'new-question-button'}
        onClick={e => this.setState({selectQType: true})}
      >
        Add Question
      </button>
    )
  }

  render() {
    return(
      <div>
        {this.state.selectQType ? this.newQuestionTypeSelector() : this.addQuestionButton()}
      </div>
    )
  }
}

export default CreateQuestionButton

CreateQuestionButton.propTypes = {
  tempQuestion: PropTypes.object.isRequired,
  questionFetchSuccess: PropTypes.func.isRequired,
  questionFetchFailure: PropTypes.func.isRequired,
  questionSetNew: PropTypes.func.isRequired,
  questionFetchInProgress: PropTypes.func.isRequired,
};
