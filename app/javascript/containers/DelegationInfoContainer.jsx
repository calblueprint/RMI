import React from "react";
import PropTypes from "prop-types";
import DelegationContactCard from "../components/DelegationContactCard";
import Moment from "react-moment";

class DelegationInfoContainer extends React.Component {
  lastActive() {
    let lastActive = this.props.delegation.lastActive;

    if (lastActive === undefined) {
      return <span>Unopened</span>;
    }
    return (
      <span>
        <Moment fromNow>{lastActive}</Moment>
      </span>
    );
  }

  render() {
    let {
      building_operator: { email, first_name: firstName, last_name: lastName }
    } = this.props.delegation;
    return (
      <div>
        <DelegationContactCard
          firstName={firstName}
          lastName={lastName}
          email={email}
          handleClickChangeContact={() => {}}
          handleClickRemoveContact={() => {}}
          showHeader={false}
          showChangeBtn={false}
          showRemoveContactBtn={false}
        />
        <div className="delegation_status">
          {this.lastActive()}
          <button>Remind</button>
        </div>
      </div>
    );
  }
}

DelegationInfoContainer.propTypes = {
  delegation: PropTypes.object.isRequired
};

export default DelegationInfoContainer;
