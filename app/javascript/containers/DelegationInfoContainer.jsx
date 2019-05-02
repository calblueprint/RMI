import React from "react";
import PropTypes from "prop-types";
import DelegationContactCard from "../components/DelegationContactCard";
import Moment from "react-moment";

class DelegationInfoContainer extends React.Component {
  render() {
    let {
      building_operator: {
        email,
        first_name: firstName,
        last_name: lastName,
        last_sign_in_at: lastActive
      }
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
          {lastActive ? (
            <span>
              <Moment fromNow>{lastActive}</Moment>
            </span>
          ) : (
            <span>Unopened</span>
          )}
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
