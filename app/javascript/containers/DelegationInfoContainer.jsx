import React from 'react';
import PropTypes from 'prop-types';
import DelegationContactCard from "../components/DelegationContactCard";
import Moment from 'react-moment';

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
        
        if (lastActive === undefined) {
            return "Not opened yet"
        }
        return (<Moment fromNow>{lastActive}</Moment>);
    }

    render() {
        let delegation = this.props.delegation;
        return (<div>
                    {this.makeDelegation(delegation.firstName, delegation.lastName, delegation.email)}
                    <div className='delegation_status'>
                        {this.lastActive()}
                        <button>Remind</button>
                    </div>
                </div>);
    }
}

DelegationInfoContainer.propTypes = {
    delegation: PropTypes.object.isRequired 
};

export default DelegationInfoContainer;
