/**
 * Mode that allows user to review all answers and delegations before submitting.
 * ROUTE - /buildings/:bId/review
 */

import React from 'react';

class ReviewModeContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.questions.map((question) => {
          // Only display non-dependent questions initially
          if (!question.parent_option_id) {
            return (<QuestionContainer mode="review"
                              key={question.id}
                              building_id={this.props.building.id}
                              {...question} />);
          }
        })}
      </div>
    );
  }
}

export default ReviewModeContainer;
