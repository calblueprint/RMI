import React from 'react';

class QuestionContainer extends React.Component {

  // this.props.mode can be
  // "answer": answering mode
  // "review": reviewing mode
  // "delegation": delegation mode

  renderAnswerMode() {
    return (
        <div>
          <p>{props.text}</p>
          <OptionsContainer
            question_id={props.id}
            building_id={props.building_id}
            question_type={props.question_type}
            options={props.options} />
        </div>);
  }

  renderReviewMode() {

  }

  renderDelegationMode() {
    return (
      <div>
        <p>{props.text}</p>
        <DelegationContainer
          question_id={props.id}
          building_id={props.building_id} />
      </div>);
  }

  render() {
    if (this.props.mode == "answer") {
      return this.renderAnswerMode();
    } else if (this.props.mode == "review") {

    } else if (this.props.mode == "delegation") {
      return renderDelegationMode();
    } else {
      // Shouldn't reach here
    }
  };

export default QuestionContainer;
