import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numAnswered } from '../selectors/answersSelector';

class NotificationBarContainer extends React.Component {
    needNotification() {
        if (this.props.numAnswered !== 0) {
            return {'display': 'none'};
        }
    }
  render() {
    return (<div className='notification-bar' style={this.needNotification()}>
              You've been invited to fill out this form</div>);
  }
}

NotificationBarContainer.propTypes = {
  building_id: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      numAnswered: numAnswered(ownProps.building_id, state),
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationBarContainer);
  