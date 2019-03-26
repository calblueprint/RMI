import React from 'react';
import { connect } from 'react-redux';
import { getDependentQuestionsForOptionIds } from '../../selectors/questionsSelector';
import PropTypes from 'prop-types'
import {newDefaultQuestion} from '../../utils/TemporaryObjectUtil';
import {
  questionFetchInProgress,
  questionFetchSuccess,
  questionSetNew,
  questionFetchFailure,
} from '../../actions/questions';
import DepQuestionDisplay from '../../components/QuestionnaireForm/DepQuestionDisplay';


class DepQuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDepQuestion: false,
    }
  }

  displayDependentQuestions() {
    const DependentQuestionsDisplay = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      if (option['deleted']) {
        return (<div></div>)
      } else {
        return(
          <div key={optionId}>
            <DepQuestionDisplay
              option={option}
              question={this.props.question}
              depQuestionsForOptions={this.props.depQuestionsForOptions}
              questionFetchSuccess={this.props.questionFetchSuccess}
              questionFetchFailure={this.props.questionFetchFailure}
              questionSetNew={this.props.questionSetNew}
              questionFetchInProgress={this.props.questionFetchInProgress}
            />
          </div>
        )
      }
    }, this);
    return DependentQuestionsDisplay;
  }

  render() {
    if (this.props.optionIdList.length == 0){
      return (<div></div>)
    } else {
      return (
        <div
          className={'dep-q-block'}
        >
          {this.displayDependentQuestions()}
        </div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    depQuestionsForOptions: getDependentQuestionsForOptionIds(ownProps.optionIdList, ownProps.question.question_type, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    questionFetchSuccess: (question) => {dispatch(questionFetchSuccess(question))},
    questionFetchFailure: (error, question) => { dispatch(questionFetchFailure(error, question)) },
    questionSetNew: (question) => { dispatch(questionSetNew(question))},
    questionFetchInProgress: (question) => { dispatch(questionFetchInProgress(question)) }

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepQuestionContainer);

DepQuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
  optionIdList: PropTypes.array.isRequired,
  depQuestionsForOptions: PropTypes.object.isRequired
};
