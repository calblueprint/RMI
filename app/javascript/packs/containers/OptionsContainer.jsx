import React from 'react';

import QuestionContainer from './QuestionContainer';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";

import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';

class OptionsContainer extends React.Component {
  handleSelect(option_id) {
    console.log("Triggered id - " + option_id);
    // TODO: dispatch an action to update answer in the database and in state tree
  }

  render() {
    const optionProps = {
      options: this.props.options,
      answer: this.props.answer,
      onSelect: this.handleSelect.bind(this)
    };
    const optionsComponent = (() => {
      switch (this.props.question_type) {
        case "dropdown":
          return <DropdownOption {...optionProps} />;
        case "range":
          return <RangeOption {...optionProps} />;
        case "file":
          return <FileOption {...optionProps} />;
        default:
          return <FreeOption {...optionProps} />;
      }
    })();
    const dependentQuestions = (() => {
      if (this.props.answer) {
        const dependents = this.props.dependentQuestions[this.props.answer.selected_option_id];
        if (dependents) {
          return dependents.map(question => {
            return (<div key={question.id}>
              <QuestionContainer mode="answer"
                   building_id={this.props.building_id} {...question} />
            </div>);
          });
        }
      }
    })();

    return (<div>
      {optionsComponent}
      {dependentQuestions}
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, ownProps.question_type, state)
  }
}

function mapDispatchToProps(state, ownProps) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);
