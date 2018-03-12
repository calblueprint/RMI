import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

/**
 * Displays the save status of an answer, and allows the user
 * to resubmit if saving failed.
 */
class Status extends React.Component {
  render() {
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
    const updatedAt = this.props.fetchObject.updated_at;
    return (<div>
      <p>Saved <Moment fromNow>{updatedAt}</Moment></p>
      <hr />
    </div>);
  }
}

Status.propTypes = {
  onRetry: PropTypes.func.isRequired,
  fetchObject: PropTypes.object.isRequired
};

export default Status;
