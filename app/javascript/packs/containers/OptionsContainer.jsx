import React from 'react';
import PropTypes from 'prop-types';
import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';
import Question from '../components/Question';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getDependentQuestionsForOptions } from '../selectors/questionsSelector';
import { addAnswer } from '../actions/answers';

class OptionsContainer extends React.Component {
  handleSelect(option_id, text) {
    console.log("Triggered id - " + option_id);
    console.log("Text - " + text);

    // TODO: dispatch an action to update answer in the database and in state tree
    const answer = {
      building_id: this.props.building_id,
      question_id: this.props.question_id
    };

    if (option_id) {
      answer.selected_option_id = option_id;
    }

    if (this.props.question_type == "dropdown") {
      answer.text = this.props.options[option_id].text;
    }
    else {
      answer.text = text;
    }

    console.log("ANSWER:");
    console.log(answer);

    this.props.addAnswer(answer.building_id, answer);
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
              <Question building_id={this.props.building_id} {...question} />
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

function mapDispatchToProps(dispatch) {
  return {
    addAnswer: function (buildingId, answer) {
      return addAnswer(buildingId, answer, dispatch);
    }
  }
}

OptionsContainer.propTypes = {
  question_id: PropTypes.number.isRequired,
  building_id: PropTypes.number.isRequired,
  question_type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  dependentQuestions: PropTypes.object.isRequired,
  answer: PropTypes.object  // Optional - new questions can have no answer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);
