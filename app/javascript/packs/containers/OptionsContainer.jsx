import React from 'react';
import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";

import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FreeOption from '../components/FreeOption';

class OptionsContainer extends React.Component {
  handleSelect(option_id) {
    console.log("Answer selected! Option id: " + option_id)
  }

  render() {
    const optionProps = {
      options: Object.values(this.props.options),
      onSelect: this.handleSelect
    };
    const optionsComponent = (() => {
      switch (this.props.question_type) {
        case "dropdown":
          return <DropdownOption {...optionProps} />;
        case "range":
          return <RangeOption {...optionProps} />;
        default:
          return <FreeOption {...optionProps} />
      }
    })();

    return (<div>
       {optionsComponent}
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, state)
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
