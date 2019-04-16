import React from 'react';
import PropTypes from 'prop-types';
import DelegationContactCard from "../components/DelegationContactCard";

class DelegationInfoContainer extends React.Component {    
    makeDelegation(firstName, lastName, email) {
        return (<DelegationContactCard
            firstName={firstName}
            lastName={lastName}
            email={email}
            handleClickChangeContact={() => {}}
            handleClickRemoveContact={() => {}}
            showHeader={false}
            showChangeBtn={false}
            showRemoveContactBtn={false}
          />)
    }
    
    lastActive() {
        let lastActive = this.props.delegation.lastActive;

        if (lastActive) {
            return "Last opened on " + String(lastActive)
        }
        return "Not opened yet"
    }

    render() {
        let delegation = this.props.delegation;
        return (<div>
                    {this.makeDelegation(delegation.firstName, delegation.lastName, delegation.email)}
                    {this.lastActive()}
                    <button>Remind</button>
                </div>);
    }
}

DelegationInfoContainer.propTypes = {
    delegation: PropTypes.object.isRequired 
};

export default DelegationInfoContainer;
