import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getQuestionsByCategoryId} from '../../selectors/questionsSelector';
import {generateTempId} from '../../utils/TemporaryObjectUtil';
import QuestionContainer from './QuestionContainer';
import CategoryDisplay from '../../components/QuestionnaireForm/CategoryDisplay';
import {
  categoryFetchFailure, categoryFetchInProgress, categoryFetchSuccess, categoryPreFetchSave,
  removeCategory
} from '../../actions/categories';
import {
  beforeCreateNewQuestion
} from '../../actions/questions';
import { patch } from '../../fetch/requester';
class CategoryQuestionsContainer extends React.Component {

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
      parameter: null,
      helper_text: null
    };
    this.props.beforeCreateNewQuestion(newQuestion)
  }

  /**
   * Handles fetch request to update a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async updateCategory(id, args) {
    const updatedCategory = {...this.state.currentCategory, ...args};
    this.props.categoryFetchInProgress(updatedCategory);
    try {
      let response = await patch('/api/categories/' + updatedCategory.id, {'category': updatedCategory});
      this.props.categoryFetchSuccess(response.data);
    } catch (error) {
      this.props.categoryFetchFailure(error, updatedCategory);
    }
  }

  /**
   * Calls async fetch function during onBlur to create or update question object.
   * @param {string} id - questionId to update
   * @param {object} args - any question parameters
   */
  handleOnBlur(id, args) {
    this.updateCategory(id, args)
  }

  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new question, create a temp question in question store.
   * @param { string } id - questionId that is updating
   * @param { string } args - any question parameters
   */
  handleOnChange(id, args) {
    const updatedCategory = {...this.state.currentCategory, ...args};
    this.props.categoryPreFetchSave(updatedCategory)
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

    return (
    <div>
      {/*<div>*/}
        {/*<CategoryDisplay*/}
          {/*category={this.props.category}*/}
          {/*errors={this.props.category.error}*/}
          {/*select={this.props.select}*/}
          {/*handleOnBlur={this.handleOnBlur.bind(this)}*/}
          {/*handleOnChange={this.handleOnChange.bind(this)}*/}
          {/*key={this.props.category.id}*/}
        {/*/>*/}
      {/*</div>*/}
      <h2>QUESTIONS FOR {this.props.category.name}</h2>
      <div>
        {questions_display}
        <button
          onClick={e => this.onNewQuestion()}
        >
          Add Question
        </button>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByCategoryId(ownProps.category.id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeCreateNewQuestion: (question) => {dispatch(beforeCreateNewQuestion(question))},

    categoryFetchInProgress: (category) => { dispatch(categoryFetchInProgress(category)) },
    categoryPreFetchSave: (category) => { dispatch(categoryPreFetchSave(category)) },
    categoryFetchSuccess: (category) => {dispatch(categoryFetchSuccess(category))},
    categoryFetchFailure: (error, category) => { dispatch(categoryFetchFailure(error, category)) },
    removeCategory: (category) => { dispatch(removeCategory(category))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryQuestionsContainer);

CategoryQuestionsContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  buildingType: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  select: PropTypes.bool.isRequired
};
