/**
 * Mode that allows user to delegate any remaining unanswered questions.
 * ROUTE - /buildings/:bId/delegate
 */

import React from 'react';

class DelegateModeContainer extends React.Component {

  render() {
    return (
      <div>
        {this.props.questions.map((question) => {
          // It's left to DelegationContainer to decide whether this question
          // needs delegation, i.e. is unanswered

          // Only display non-dependent questions initially
          if (!question.parent_option_id) {
            return (<QuestionContainer mode="delegation"
                            key={question.id}
                            building_id={this.props.building.id}
                            {...question} />);
          }
        })
        }
      </div>
    );
  }
}

export default DelegateModeContainer;
