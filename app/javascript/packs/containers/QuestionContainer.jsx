import React from 'react';

import OptionsContainer from './OptionsContainer';
import QuestionResultContainer from './QuestionResultContainer';
import DelegationContainer from './DelegationContainer';
import PropTypes from 'prop-types';

class QuestionContainer extends React.Component {

  // this.props.mode can be
  // "answer": answering mode
  // "review": reviewing mode
  // "delegation": delegation mode

  renderAnswerMode() {
    return (
      <OptionsContainer
        question_id={this.props.id}
        building_id={this.props.building_id}
        question_type={this.props.question_type}
        options={this.props.options}
        text={this.props.text}
        setFocusFunc={this.props.setFocusFunc}
        unit={this.props.unit}
      />
    );
  }

  renderReviewMode() {
    return (
      <div>
        <p>{this.props.text}</p>
        <QuestionResultContainer
          question_id={this.props.id}
          building_id={this.props.building_id}
          question_type={this.props.question_type}
          options={this.props.options}
        />
      </div>
    );
  }

  renderDelegationMode() {
    return (
      <div>
        <DelegationContainer
          text={this.props.text}
          question_id={this.props.id}
          question_type={this.props.question_type}
          options={this.props.options}
          building_id={this.props.building_id}
        />
      </div>
    );
  }

  render() {
    if (this.props.mode == "answer") {
      return this.renderAnswerMode();
    } else if (this.props.mode == "review") {
      return this.renderReviewMode();
    } else if (this.props.mode == "delegation") {
      return this.renderDelegationMode();
    } else {
      console.log("Unknown mode! ");
      console.log(this.props.mode);
      return (<p>Error</p>);
    }
  }

}

export default QuestionContainer;

QuestionContainer.propTypes = {
  id: PropTypes.number.isRequired,
  building_id: PropTypes.number.isRequired,
  question_type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  unit: PropTypes.string
};
