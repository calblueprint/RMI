import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { numAnswered, numUnanswered } from '../selectors/answersSelector';

class ContinueButtonContainer extends React.Component {
    continueOrStart() {
        if (this.props.numAnswered === 0) {
            return "Start"
        } else if (this.props.numUnanswered === 0) {
            return "Review and Submit"
        }
        return "Continue"
    }
  render() {
    return (<div className="continue-button">
            <Link to={`/buildings/${this.props.building_id}`} className="continue-link">{this.continueOrStart()}</Link>
            </div>);
  }
}

ContinueButtonContainer.propTypes = {
  building_id: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      numAnswered: numAnswered(ownProps.building_id, state),
      numUnanswered: numUnanswered(ownProps.building_id, state)
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContinueButtonContainer);
  