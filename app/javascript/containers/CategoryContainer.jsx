import React from 'react';

import PropTypes from 'prop-types';

class CategoryContainer extends React.Component { 
    categoryProgress(answered, total) {
        if (answered < total) {
          return "Waiting for Handoff";
        }
        return "Handed Off"
    }

    categoryDelegations() {
        let delegations = this.props.categoryData.delegations;
        let delegationInfo = "";
        for (let i = 0; i < delegations.length; i++) {
            let delegation = delegations[i];
            delegationInfo += delegation.name + " " + delegation.email;
        }
        return delegationInfo;
    }
        
    render() {
        let categoryData = this.props.categoryData

        return (<div className='category_data'>
                    <div>{categoryData.name}</div>
                    <div>{this.categoryProgress(categoryData.answered, categoryData.total)}</div> 
                    <div class='delegation_info'>{this.categoryDelegations()}</div>
                </div>);
    }
}

CategoryContainer.propTypes = {
    id: PropTypes.string.isRequired,
    categoryData: PropTypes.object.isRequired,
};

export default CategoryContainer;
  
