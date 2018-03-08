import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the save status of an answer, and allows the user
 * to resubmit if saving failed.
 */
class Status extends React.Component {
  render() {
    console.log("fetch object:");
    console.log(this.props.fetchObject);

    // (Default) Unanswered question
    if (!this.props.fetchObject) {
      return (<div>
        <p>Answers will be automatically saved.</p>
        <hr />
      </div>);
    }

    // Currently saving
    if (this.props.fetchObject.fetching) {
      return (<div>
        <p>Saving answer...</p>
        <hr />
      </div>);
    }

    // Failed to save answer
    if (this.props.fetchObject.error) {
      return (<div>
        <p>There was an error saving your answer.</p>
        <button onClick={this.props.onRetry}>Retry</button>
        <hr />
      </div>);
    }

    // Answer successfully saved
    return (<div>
      <p>Last updated: {this.props.fetchObject.updated_at}</p>
      <hr />
    </div>);
  }
}

Status.propTypes = {
  onRetry: PropTypes.func.isRequired,
  fetchObject: PropTypes.object.isRequired
};

export default Status;
