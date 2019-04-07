import React from 'react';

import PropTypes from 'prop-types';

class CategoryContainer extends React.Component { 
    categoryProgress(answered, total) {
        if (answered < total) {
          return (<td><span className="dot yellow"></span>Waiting for Handoff</td>);
        }
        return (<td><span className="dot green"></span>Handed Off</td>);
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

        return (
            <tr className='category_data'>
                <td>{categoryData.name}</td>
                {this.categoryProgress(categoryData.answered, categoryData.total)}
                <td class='delegation_info'>{this.categoryDelegations()}</td>  
            </tr>
        );
    }
}

CategoryContainer.propTypes = {
    id: PropTypes.string.isRequired,
    categoryData: PropTypes.object.isRequired,
};

export default CategoryContainer;
  
