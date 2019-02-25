import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import {
  FETCH_IN_PROGRESS,
  FETCH_FAILURE
} from '../constants/index';

import fontawesome from '@fortawesome/fontawesome';
import faRedo from '@fortawesome/fontawesome-free-solid/faRedo';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

/**
 * Displays the save status of an answer, and allows the user
 * to resubmit if saving failed.
 */
class Status extends React.Component {
  render() {
    // (Default) Unanswered question
    if (!this.props.fetchObject) {
      return (<div className="status__container">
        <p>Answers will be automatically saved.</p>
      </div>);
    }

    const fetchStatus = this.props.fetchObject.fetchStatus;

    // Currently saving
    if (fetchStatus === FETCH_IN_PROGRESS) {
      return (<div className="status__container">
        <p>Saving answer...</p>
      </div>);
    }

    // Failed to save answer
    if (fetchStatus === FETCH_FAILURE) {
      return (<div className="status__container status__container--error">
        <p>
          <i
            style={{ marginRight: '5px' }}
            dangerouslySetInnerHTML={{
              __html: fontawesome.icon(faExclamationCircle).html[0]
            }}
          />
          There was an error saving your answer.&nbsp;
          <span
            className="status__retry"
            onClick={this.props.onRetry}
          >
             Retry
             <i
              style={{ marginLeft: '5px' }}
              dangerouslySetInnerHTML={{
                __html: fontawesome.icon(faRedo).html[0]
              }}
             />
          </span>
        </p>
      </div>);
    }

    // Answer successfully saved
    const updatedAt = this.props.fetchObject.updated_at;
    return (<div className="status__container">
      <p>Saved <Moment fromNow>{updatedAt}</Moment></p>
    </div>);
  }
}

Status.propTypes = {
  onRetry: PropTypes.func.isRequired,
  fetchObject: PropTypes.object.isRequired
};

export default Status;
